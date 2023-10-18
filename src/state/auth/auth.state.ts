import {
  getProfile,
  KakaoOAuthToken,
  KakaoProfile,
  login,
} from "@react-native-seoul/kakao-login";
import { BehaviorSubject } from "rxjs";

let kakaoOauthTokenSubject = new BehaviorSubject<KakaoOAuthToken | null>(null);
export const kakaoOAuthToken$ = kakaoOauthTokenSubject.asObservable();

let kakaoProfileSubject = new BehaviorSubject<KakaoProfile | null>(null);
export const kakaoProfile$ = kakaoProfileSubject.asObservable();

export const loginToKakao = async () => {
  try {
    kakaoOauthTokenSubject = new BehaviorSubject<KakaoOAuthToken | null>(null);

    const oAuthToken: KakaoOAuthToken = await login();
    console.log("Login Success", JSON.stringify(oAuthToken, null, 2));
    kakaoOauthTokenSubject.next(oAuthToken);

    await getKakaoProfile();
  } catch (error: any) {
    if (error.code === "E_CANCELLED_OPERATION") {
      console.log("Login Cancel", error.message);
      return;
    }

    console.log(`Login Fail(code:${error.code})`, error.message);
  } finally {
    kakaoOauthTokenSubject.complete();
  }
};

export const getKakaoProfile = async () => {
  kakaoProfileSubject = new BehaviorSubject<KakaoProfile | null>(null);

  try {
    const profile: KakaoProfile = await getProfile();
    // profile.
    console.log("GetProfile Success", JSON.stringify(profile, null, 2));
    kakaoProfileSubject.next(profile);
  } catch (error) {
  } finally {
    kakaoProfileSubject.complete();
  }
};
