// apple response
import { BehaviorSubject } from "rxjs";
import appleAuth, {
  AppleRequestResponse,
} from "@invertase/react-native-apple-authentication";
import { Platform } from "react-native";

export class Apple {
  //#region fields

  // #region isSupportApple
  private readonly _isSupportAppleLogin: BehaviorSubject<boolean>;

  public get isSupportAppleLogin$() {
    return this._isSupportAppleLogin.asObservable();
  }

  // #endregion isSupportApple

  //#region apple info
  private readonly _appleInfoSubject: BehaviorSubject<AppleRequestResponse | null>;

  public get appleInfo$() {
    return this._appleInfoSubject.asObservable();
  }

  public get appleInfo() {
    return this._appleInfoSubject.getValue();
  }

  //#endregion apple info

  //#endregion fields

  public constructor() {
    this._isSupportAppleLogin = new BehaviorSubject<boolean>(
      this.init_isSupportAppleLogin(),
    );

    this._appleInfoSubject = new BehaviorSubject<AppleRequestResponse | null>(
      null,
    );
  }

  public async login(): Promise<() => Promise<void>> {
    return Platform.OS === "ios" ? this.login_ios : this.login_android;
  }

  public async logout(): Promise<void> {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGOUT,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
    } catch (error) {
      console.error(error);
    }
  }

  //#region impl

  private init_isSupportAppleLogin(): boolean {
    if (Platform.OS === "android") {
      return false;
      // return appleAuthAndroid.isSupported;
    }

    if (Platform.OS === "ios") {
      return Platform.Version >= "13";
    }

    return false;
  }

  private async login_ios(): Promise<void> {
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
      let statusPrintStr = "sign in with apple";
      if (credentialState === appleAuth.State.AUTHORIZED) {
        this._appleInfoSubject.next(appleAuthRequestResponse);
        statusPrintStr = "[success] " + statusPrintStr;
      } else {
        statusPrintStr = "[failed] " + statusPrintStr;
      }

      console.log(
        statusPrintStr,
        JSON.stringify(appleAuthRequestResponse, null, 2),
      );
    } catch (error) {
      console.error(error);
    }
  }

  private async login_android(): Promise<void> {
    // try {
    //   const { v4: uuid } = await import("uuid");
    //
    //   // Generate secure, random values for state and nonce;
    //   const rawNonce = uuid();
    //   const state = uuid();
    //
    //   // Configure the request
    //   appleAuthAndroid.configure({
    //     // The Service ID you registered with Apple
    //     clientId: "com.jagiya.readyUmbrella",
    //
    //     // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
    //     // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
    //     // redirectUri: "https://example.com/auth/callback",
    //     redirectUri: "",
    //
    //     // The type of response requested - code, id_token, or both.
    //     responseType: appleAuthAndroid.ResponseType.ALL,
    //
    //     // The amount of user information requested from Apple.
    //     scope: appleAuthAndroid.Scope.EMAIL,
    //
    //     // Random nonce value that will be SHA256 hashed before sending to Apple.
    //     nonce: rawNonce,
    //
    //     // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
    //     state,
    //   });
    //
    //   // Open the browser window for user sign in
    //   const response = await appleAuthAndroid.signIn();
    //
    //   // Send the authorization code to your backend for verification
    //   console.log(
    //     "sign in with Apple",
    //     JSON.stringify(response, null, 2),
    //   );
    // } catch (error) {
    //   console.error(error);
    // }
  }

  //#endregion impl
}

export const apple = new Apple();
