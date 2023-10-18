import {
  getProfile,
  KakaoOAuthToken,
  KakaoProfile,
  login,
} from "@react-native-seoul/kakao-login";
import { BehaviorSubject } from "rxjs";

let kakaoOAuthTokenSubject = new BehaviorSubject<KakaoOAuthToken | null>(null);
export const getKakaoOAuthToken = () => kakaoOAuthTokenSubject.getValue();
export const kakaoOAuthToken$ = kakaoOAuthTokenSubject.asObservable();

let kakaoProfileSubject = new BehaviorSubject<KakaoProfile | null>(null);
export const getKakaoProfile = () => kakaoProfileSubject.getValue();
export const kakaoProfile$ = kakaoProfileSubject.asObservable();

const loginToKakao = async () => {
  try {
    kakaoOAuthTokenSubject = new BehaviorSubject<KakaoOAuthToken | null>(null);

    const oAuthToken: KakaoOAuthToken = await login();
    console.log("Login Success", JSON.stringify(oAuthToken, null, 2));
    kakaoOAuthTokenSubject.next(oAuthToken);

    await getKakaoProfile();
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

const fetchKakaoProfile = async () => {
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

export const behaviours = {
  loginToKakao,
  getKakaoProfile: fetchKakaoProfile,
};
