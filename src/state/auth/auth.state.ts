import {
  getProfile,
  KakaoOAuthToken,
  KakaoProfile,
  login as kakaoLogin,
} from "@react-native-seoul/kakao-login";
import { BehaviorSubject } from "rxjs";
import { login } from "@/network/api";
import DeviceInfo from "react-native-device-info";
import type { LocalAuthState } from "@/typing";
import appleAuth, {
  appleAuthAndroid,
  AppleRequestResponse,
} from "@invertase/react-native-apple-authentication";
import { Platform } from "react-native";

const localAuthStateSubject = new BehaviorSubject<LocalAuthState>({
  isLoggedIn: false,
  whichLoginType: undefined,
});
export const getLocalAuthState = () => localAuthStateSubject.getValue();
export const localAuthState$ = localAuthStateSubject.asObservable();

// kakao oauth token
let kakaoOAuthTokenSubject = new BehaviorSubject<KakaoOAuthToken | null>(null);
export const getKakaoOAuthToken = () => kakaoOAuthTokenSubject.getValue();
export const kakaoOAuthToken$ = kakaoOAuthTokenSubject.asObservable();

// kakao profile
let kakaoProfileSubject = new BehaviorSubject<KakaoProfile | null>(null);
export const getKakaoProfile = () => kakaoProfileSubject.getValue();
export const kakaoProfile$ = kakaoProfileSubject.asObservable();

// apple response
const isSupportAppleLogin = new BehaviorSubject<boolean>(
  (() => {
    if (Platform.OS === "android") {
      return false;
      // return appleAuthAndroid.isSupported;
    }

    if (Platform.OS === "ios") {
      return Platform.Version >= "13";
    }

    return false;
  })(),
);
export const isSupportAppleLogin$ = isSupportAppleLogin.asObservable();

const loginKakao = async (): Promise<void> => {
  try {
    kakaoOAuthTokenSubject = new BehaviorSubject<KakaoOAuthToken | null>(null);

    const oAuthToken: KakaoOAuthToken = await kakaoLogin();
    console.log("Login Success", JSON.stringify(oAuthToken, null, 2));
    kakaoOAuthTokenSubject.next(oAuthToken);
  } catch (error: any) {
    if (error.code === "E_CANCELLED_OPERATION") {
      console.log("Login Cancel", error.message);
      return;
    }

    console.log(`Login Fail(code:${error.code})`, error.message);
  } finally {
    kakaoOAuthTokenSubject.complete();
  }
};

const fetchKakaoProfile = async (
  navigateToMain: () => void,
): Promise<KakaoProfile | null> => {
  kakaoProfileSubject = new BehaviorSubject<KakaoProfile | null>(null);

  let profile: KakaoProfile | null = null;

  try {
    profile = await getProfile();

    console.log("GetProfile Success", JSON.stringify(profile, null, 2));

    kakaoProfileSubject.next(profile);

    navigateToMain();
  } catch (error) {
    console.error(error);
  } finally {
    kakaoProfileSubject.complete();
    return profile;
  }
};

const localLogin = (whichLoginType: LocalAuthState["whichLoginType"]) => {
  localAuthStateSubject.next({
    isLoggedIn: true,
    whichLoginType,
  });
};

const localLogout = () => {
  localAuthStateSubject.next({
    isLoggedIn: false,
    whichLoginType: undefined,
  });
};

const updateLoginInfo = async () => {
  const { isLoggedIn, whichLoginType } = getLocalAuthState();
  if (!isLoggedIn) {
    console.log("Failed to updateLoginInfo. the user has not logged in yet.");
    return;
  }

  let email = "";
  let name = "";
  let snsId = "";
  let snsType = "0";

  console.log("login as ", whichLoginType);
  if (whichLoginType === "kakao") {
    const kakaoProfile = getKakaoProfile();
    if (kakaoProfile) {
      snsId = kakaoProfile.id;
      email = kakaoProfile.email;
      name = kakaoProfile.name;
    }
    snsType = "1"; // 1: kakao, 2: apple
  } else if (whichLoginType === "apple") {
    // const appleProfile= getAppleProfile();
    // if (appleProfile) {
    //   snsId = appleProfile.id;
    //   email = appleProfile.email;
    //   name =  appleProfile.name;
    // }
    snsType = "2";
  } else {
    snsType = "0";
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      snsId = deviceId;
    } catch (error) {
      console.error("error: ", error);
    }
  }

  try {
    const params = {
      email,
      name,
      snsId,
      snsType,
    };
    console.log("update login to server: ", JSON.stringify(params, null, 2));
    const response = await login(params);
    console.log("login response: ", JSON.stringify(response, null, 2));
  } catch (error) {
    console.error(error);
  }
};

const loginApple_ios = async (navigateToMain: () => void) => {
  try {
    // performs login request
    const appleAuthRequestResponse: AppleRequestResponse =
      await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        // Note: it appears putting FULL_NAME first is important, see issue #293
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      console.log(
        "sign in with apple success: ",
        credentialState.toString(),
        JSON.stringify(appleAuthRequestResponse, null, 2),
      );

      behaviours.local.login("apple");
      navigateToMain();
    } else {
      console.log(
        "sign in with apple failed: ",
        credentialState.toString(),
        JSON.stringify(appleAuthRequestResponse, null, 2),
      );
    }
  } catch (error) {
    console.error(error);
  }
};
const loginApple_android = async () => {
  try {
    const { v4: uuid } = await import("uuid");

    // Generate secure, random values for state and nonce;
    const rawNonce = uuid();
    const state = uuid();

    // Configure the request
    appleAuthAndroid.configure({
      // The Service ID you registered with Apple
      clientId: "com.jagiya.readyUmbrella",

      // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
      // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
      // redirectUri: "https://example.com/auth/callback",
      redirectUri: "",

      // The type of response requested - code, id_token, or both.
      responseType: appleAuthAndroid.ResponseType.ALL,

      // The amount of user information requested from Apple.
      scope: appleAuthAndroid.Scope.EMAIL,

      // Random nonce value that will be SHA256 hashed before sending to Apple.
      nonce: rawNonce,

      // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
      state,
    });

    // Open the browser window for user sign in
    const response = await appleAuthAndroid.signIn();

    // Send the authorization code to your backend for verification
    console.log(
      "sign in with Apple success!",
      JSON.stringify(response, null, 2),
    );
  } catch (error) {
    console.error(error);
  }
};

const logoutApple = () => {};

export const behaviours = {
  kakao: {
    login: loginKakao,
    getProfile: fetchKakaoProfile,
  },
  apple: {
    login: Platform.OS === "ios" ? loginApple_ios : loginApple_android,
    logout: logoutApple,
  },
  local: {
    login: localLogin,
    logout: localLogout,
    update: updateLoginInfo,
  },
};
