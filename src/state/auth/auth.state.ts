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
import { P } from "react-native-shadow-2/lib/utils";

const localAuthStateSubject = new BehaviorSubject<LocalAuthState>({
  isLoggedIn: false,
});
export const getLocalAuthState = () => localAuthStateSubject.getValue();
export const localAuthState$ = localAuthStateSubject.asObservable();

let kakaoOAuthTokenSubject = new BehaviorSubject<KakaoOAuthToken | null>(null);
export const getKakaoOAuthToken = () => kakaoOAuthTokenSubject.getValue();
export const kakaoOAuthToken$ = kakaoOAuthTokenSubject.asObservable();

let kakaoProfileSubject = new BehaviorSubject<KakaoProfile | null>(null);
export const getKakaoProfile = () => kakaoProfileSubject.getValue();
export const kakaoProfile$ = kakaoProfileSubject.asObservable();

const loginToKakao = async (): Promise<void> => {
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

export const fetchKakaoProfile = async (
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

export const behaviours = {
  loginToKakao,
  fetchKakaoProfile,
  localLogin,
  localLogout,
  updateLoginInfo,
};
