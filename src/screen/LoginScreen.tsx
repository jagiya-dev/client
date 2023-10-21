import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import Text from "@/components/Text";
import { Button } from "@/components/button";
import {
  behaviours as AuthBehaviours,
  isSupportAppleLogin$,
} from "@/state/auth/auth.state";
import { font } from "@/styles/font";
import { AppleLogo, KakaoLogo } from "@/components/Icon";
import { color } from "@/styles/color";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "@/typing";
import appleAuth from "@invertase/react-native-apple-authentication";
import { useEffect } from "react";
import { useObservableState } from "@/hook/useObservableState";

type Props = NativeStackScreenProps<StackParamList, "Login">;

const LoginScreen = ({ route, navigation }: Props) => {
  const isSupportAppleLogin = useObservableState({
    observable: isSupportAppleLogin$,
  });

  const navigateToMain = () => navigation.navigate("Main");

  useEffect(() => {
    if (Platform.OS !== "ios") return;
    if (!isSupportAppleLogin) return;

    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn(
        "If this function executes, User Credentials have been Revoked",
      );
    });
  }, []); // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.

  const onPress_KakaoLoginButton = async () => {
    try {
      await AuthBehaviours.kakao.login();
      await AuthBehaviours.kakao.getProfile(navigateToMain);

      AuthBehaviours.local.login("kakao");
      await AuthBehaviours.local.update();
    } catch (error) {
      console.error(error);
    }
  };

  const onPressAppleLoginButton = async () => {
    if (!isSupportAppleLogin) {
      console.log(
        "This device doesn't support Sign in with Apple because API is",
        Platform.Version,
      );
      return;
    }

    try {
      if (Platform.OS === "ios") {
        await AuthBehaviours.apple.login(navigateToMain);
      }

      if (Platform.OS === "android") {
        await AuthBehaviours.apple.login(navigateToMain);
      }

      AuthBehaviours.local.login("apple");
      await AuthBehaviours.local.update();
    } catch (error) {
      console.error(error);
    }
  };

  const onPress_useAndCondition = () => {
    console.log("use and condition button pressed");
  };

  const onPress_privacyPolicy = () => {
    console.log("privacy policy button pressed");
  };

  return (
    <SafeAreaView style={s.root}>
      {/* Image Section */}
      <Image style={s.image} source={require("#/images/umbrella.png")} />

      {/* 설명 텍스트 */}
      <View style={s.descView}>
        <View style={s.descTextView}>
          <Text style={s.descText}>레디우산에 로그인하시고</Text>
          <Text style={s.descText}>더 많은 기능을 이용해 보세요!</Text>
        </View>
      </View>

      {/* Login Section */}
      <View style={s.loginView}>
        <Button
          style={[s.loginButton, s.loginButtonKakao]}
          onPress={onPress_KakaoLoginButton}
        >
          <KakaoLogo style={s.loginButtonLogo} />
          <Text style={[s.loginButtonText, s.loginButtonTextKakao]}>
            카카오 로그인
          </Text>
        </Button>

        {isSupportAppleLogin && (
          <Button
            style={[s.loginButton, s.loginButtonApple]}
            onPress={onPressAppleLoginButton}
          >
            <AppleLogo style={s.loginButtonLogo} />
            <Text style={[s.loginButtonText, s.loginButtonTextApple]}>
              애플 로그인
            </Text>
          </Button>
        )}
      </View>

      {/* 이용약관 & 개인정보처리방침 */}
      <View style={s.privacyView}>
        <View style={s.privacyViewTextView}>
          <Text style={s.privacyText}>로그인을 진행하시면</Text>
        </View>

        <View style={s.privacyViewTextView}>
          <TouchableWithoutFeedback onPress={onPress_useAndCondition}>
            <Text style={[s.privacyTextInside, s.privacyText]}>이용약관</Text>
          </TouchableWithoutFeedback>
          <Text>과 </Text>
          <TouchableWithoutFeedback onPress={onPress_privacyPolicy}>
            <Text style={[s.privacyTextInside, s.privacyText]}>
              개인정보처리방침
            </Text>
          </TouchableWithoutFeedback>
          <Text style={s.privacyText}>에 동의한 것으로 간주힙니다.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const s = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    zIndex: 0,
  },
  image: {
    width: 200,
    height: 200,
    paddingTop: 49.78,
  },
  descView: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
  },
  descTextView: {
    alignItems: "center",
  },
  descText: {
    color: "black",
    fontSize: font.title["2"].size,
    fontWeight: font.title["2"].weight,
    lineHeight: font.title["2"].height,
  },
  loginView: {
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 128,
    marginBottom: 32,
  },
  loginButton: {
    width: 300,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 6,

    zIndex: 10,

    height: 45,
    // ...Platform.select({
    //   android: {
    //     minHeight: 45,
    //   },
    //   ios: {
    //     height: 45,
    //   },
    // }),
  },
  loginButtonLogo: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  loginButtonText: {
    fontSize: font.button.login.size,
    fontWeight: font.button.login.weight,
  },
  loginButtonTextKakao: {
    color: "black",
  },
  loginButtonKakao: {
    backgroundColor: "yellow",
    marginBottom: 16,
  },
  loginButtonTextApple: {
    color: "white",
  },
  loginButtonApple: {
    backgroundColor: color.black["1"],
  },
  privacyView: {
    alignItems: "center",
    height: "10%",
  },
  privacyText: {
    color: "black",
    fontSize: font.caption["2"].size,
    fontWeight: font.caption["2"].weight,
    lineHeight: font.caption["2"].height,
  },
  privacyTextInside: {
    textDecorationLine: "underline",
  },
  privacyViewTextView: {
    flexDirection: "row",
  },
});
