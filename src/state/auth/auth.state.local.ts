import type { LocalAuthState } from "@/typing";
import DeviceInfo from "react-native-device-info";
import { login, LoginParams } from "@/network/api";
import { BehaviorSubject } from "rxjs";
import { apple, Apple } from "@/state/auth/auth.state.apple";
import { kakao, Kakao } from "@/state/auth/auth.state.kakao";

export class Local {
  //#addRegion fields
  //#addRegion local auth state
  private readonly _localAuthStateSubject: BehaviorSubject<LocalAuthState>;

  public get localAuthState() {
    return this._localAuthStateSubject.getValue();
  }

  public get localAuthState$() {
    return this._localAuthStateSubject.asObservable();
  }

  //#endregion local auth state
  //#endregion fields

  public constructor(
    private readonly _kakao: Kakao,
    private readonly _apple: Apple,
  ) {
    this._localAuthStateSubject = new BehaviorSubject<LocalAuthState>({
      isLoggedIn: false,
      whichLoginType: "guest",
    });
  }

  public getSnsType(): "0" | "1" | "2" {
    switch (this._localAuthStateSubject.getValue().whichLoginType) {
      case "kakao":
        return "1";

      case "apple":
        return "2";

      case "guest":
      default:
        return "0";
    }
  }

  public hydrate(localAuthState: LocalAuthState) {
    const { userId, whichLoginType } = localAuthState;

    this._localAuthStateSubject.next({
      isLoggedIn: true,
      userId: Number(userId),
      whichLoginType,
    });
  }

  //#addRegion behaviours
  public login(whichLoginType: LocalAuthState["whichLoginType"]) {
    this._localAuthStateSubject.next({
      isLoggedIn: true,
      whichLoginType,
    });
  }

  public logout() {
    this._localAuthStateSubject.next({
      isLoggedIn: false,
      whichLoginType: undefined,
      userId: undefined,
    });
  }

  public async getSnsInfo(): Promise<
    { snsId: string; snsType: string } | { snsId: string; snsType: string }
  > {
    let snsId = "";
    let snsType = "";

    switch (local.localAuthState.whichLoginType) {
      case "kakao":
        snsId = kakao.kakaoProfile?.id ?? "";
        snsType = "1";
        break;

      case "apple":
        snsId = apple.appleInfo?.user ?? "";
        snsType = "2";
        break;

      case "guest":
        snsId = await DeviceInfo.getUniqueId();
        snsType = "0";
        break;
    }

    return {
      snsId,
      snsType,
    };
  }

  public async update() {
    const { isLoggedIn, whichLoginType } = this.localAuthState;
    if (!isLoggedIn) {
      console.log("Failed to updateLoginInfo. the user has not logged in yet.");
      return;
    }
    console.log("login as ", whichLoginType);

    let email = "";
    let name = "";
    let snsId = "";
    let snsType = "0";

    switch (whichLoginType) {
      case "kakao":
        {
          snsType = "1"; // 1: kakao, 2: apple

          const kakaoProfile = this._kakao.kakaoProfile;
          if (kakaoProfile) {
            snsId = kakaoProfile.id;
            email = kakaoProfile.email;
            name = kakaoProfile.name;
          }
        }
        break;

      case "apple":
        {
          snsType = "2";

          const appleProfile = this._apple.appleInfo;
          if (appleProfile) {
            snsId = appleProfile.user;
            email = appleProfile.email ?? "";
            name = appleProfile.fullName?.nickname ?? "";
          }
        }
        break;

      case "guest":
        {
          snsType = "0";

          try {
            const deviceId = await DeviceInfo.getUniqueId();
            snsId = deviceId;
          } catch (error) {
            console.error("error: ", error);
          }
        }
        break;
    }

    try {
      const params: LoginParams = {
        email,
        name,
        snsId,
        snsType,
      };
      // console.log("update login to server: ", JSON.stringify(params, null, 2));

      const response = await login(params);
      console.log("login response: ", JSON.stringify(response, null, 2));

      this.localAuthState.userId = response.data?.userId;
    } catch (error) {
      console.error(error);
    }
  }

  //#endregion behaviours
}

export const local = new Local(kakao, apple);
