import { BehaviorSubject } from "rxjs";
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as kakaoGetProfile,
  login as kakaoLogin,
  logout as kakaoLogout,
  unlink as kakaoUnlink,
} from "@react-native-seoul/kakao-login";

export class Kakao {
  //#addRegion fields

  //#addRegion kakao oauth token
  // let kakaoOAuthTokenSubject = new BehaviorSubject<KakaoOAuthToken | null>(null);
  // export const getKakaoOAuthToken = () => kakaoOAuthTokenSubject.getValue();
  // export const kakaoOAuthToken$ = kakaoOAuthTokenSubject.asObservable();
  //#endregion kakao oauth token

  //#addRegion kakao profile
  private readonly _kakaoProfileSubject: BehaviorSubject<KakaoProfile | null>;

  public get kakaoProfile() {
    return this._kakaoProfileSubject.getValue();
  }

  public get kakaoProfile$() {
    return this._kakaoProfileSubject.asObservable();
  }

  //#endregion kakao profile
  //#endregion fields

  public constructor() {
    this._kakaoProfileSubject = new BehaviorSubject<KakaoProfile | null>(null);
  }

  //#addRegion behaviours

  public async login(): Promise<void> {
    try {
      const oAuthToken: KakaoOAuthToken = await kakaoLogin();
      console.log("Login Success", JSON.stringify(oAuthToken, null, 2));

      await this.getProfile();

      // kakaoOAuthTokenSubject.next(oAuthToken);
    } catch (error: any) {
      if (error.code === "E_CANCELLED_OPERATION") {
        console.log("Login Cancel", error.message);
        return;
      }

      console.log(`Login Fail(code:${error.code})`, error.message);
    }
  }

  public async unlink(): Promise<void> {
    try {
      const message = await kakaoUnlink();
      this._kakaoProfileSubject.next(null);
      console.log("Unlink Success", message);
    } catch (error) {
      console.error(error);
    }
  }

  public async logout(): Promise<void> {
    try {
      const message = await kakaoLogout();
      this._kakaoProfileSubject.next(null);
      console.log("Logout Success", message);
    } catch (error) {
      console.error(error);
    }
  }

  private async getProfile(): Promise<void> {
    try {
      const profile = await kakaoGetProfile();
      console.log("GetProfile Success", JSON.stringify(profile, null, 2));

      this._kakaoProfileSubject.next(profile);
    } catch (error) {
      console.error(error);
    }
  }

  //#endregion behaviours
}

export const kakao = new Kakao();
