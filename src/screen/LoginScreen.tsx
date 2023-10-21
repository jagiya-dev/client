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
import { behaviours as AuthBehaviours } from "@/state/auth/auth.state";
import { font } from "@/styles/font";
import { AppleLogo, KakaoLogo } from "@/components/Icon";
import { color } from "@/styles/color";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "@/typing";
import appleAuth, {
  appleAuthAndroid,
} from "@invertase/react-native-apple-authentication";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";

type Props = NativeStackScreenProps<StackParamList, "Login">;

const LoginScreen = ({ route, navigation }: Props) => {
  const bSupportAppleLogin = (() => {
    if (Platform.OS === "android") {
      return false;
      // return appleAuthAndroid.isSupported;
    }

    if (Platform.OS === "ios") {
      return Platform.Version >= "13";
    }
  })();

  const navigateToMain = () => navigation.navigate("Main");

  useEffect(() => {
    if (bSupportAppleLogin && Platform.OS === "ios") {
      // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
      return appleAuth.onCredentialRevoked(async () => {
        console.warn(
          "If this function executes, User Credentials have been Revoked",
        );
      });
    }
  }, []); // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.

  const onPress_KakaoLoginButton = async () => {
    try {
      await AuthBehaviours.loginToKakao();
      await AuthBehaviours.fetchKakaoProfile(navigateToMain);

      AuthBehaviours.localLogin("kakao");
      await AuthBehaviours.updateLoginInfo();
    } catch (error) {
      console.error(error);
    }
  };

  const onPressAppleLoginButton = async () => {
    console.log("apple login button pressed");
    if (!bSupportAppleLogin) {
      console.log(
        "This device doesn't support Sign in with Apple because API is",
        Platform.Version,
      );
      return;
    }

    try {
      if (Platform.OS === "ios") {
        // performs login request
        const appleAuthRequestResponse = await appleAuth.performRequest({
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
          AuthBehaviours.localLogin("apple");
          navigateToMain();
        } else {
          console.log(
            "sign in with apple failed: ",
            credentialState.toString(),
            JSON.stringify(appleAuthRequestResponse, null, 2),
          );
        }
        return;
      }

      // if (Platform.OS === "android") {
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
      //     "sign in with Apple success!",
      //     JSON.stringify(response, null, 2),
      //   );
      //
      //   return;
      // }
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

        {bSupportAppleLogin && (
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
