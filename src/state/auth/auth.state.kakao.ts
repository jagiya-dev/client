import { BehaviorSubject } from "rxjs";
import {
  getProfile as kakaoGetProfile,
  KakaoOAuthToken,
  KakaoProfile,
  login as kakaoLogin,
} from "@react-native-seoul/kakao-login";

export class Kakao {
  //#region fields

  //#region kakao oauth token
  // let kakaoOAuthTokenSubject = new BehaviorSubject<KakaoOAuthToken | null>(null);
  // export const getKakaoOAuthToken = () => kakaoOAuthTokenSubject.getValue();
  // export const kakaoOAuthToken$ = kakaoOAuthTokenSubject.asObservable();
  //#endregion kakao oauth token

  //#region kakao profile
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

  //#region behaviours

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