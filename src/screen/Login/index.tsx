import { View, Image, StyleSheet, SafeAreaView } from "react-native";
import Text from "@/components/Text";
import { Button } from "@/components/button";

const LoginScreen = () => {
  const onPressKakaoLoginButton = () => {
    console.log("kakao login button pressed");
  };

  const onPressAppleLoginButton = () => {
    console.log("apple login button pressed");
  };

  return (
    <SafeAreaView style={s.root}>
      {/* Image Section */}
      <Image
        style={s.image}
        source={{ uri: "https://example.com/image.jpg" }}
      />

      <View style={s.descView}>
        <Text style={s.descText}>레디우산에 로그인하시고</Text>
        <Text style={s.descText}>더 많은 기능을 이용해 보세요!</Text>
      </View>

      {/* Login Section */}
      <View style={s.loginView}>
        <Button
          style={{ ...s.loginButton, ...s.loginButtonKakao }}
          onPress={onPressKakaoLoginButton}
        >
          <Text style={s.loginButtonText}>카카오 로그인</Text>
        </Button>

        <Button
          style={{ ...s.loginButton, ...s.loginButtonApple }}
          onPress={onPressAppleLoginButton}
        >
          <Text style={s.loginButtonText}>애플 로그인</Text>
        </Button>
      </View>

      <View style={s.privacyView}>
        <Text style={s.privacyText}>로그인을 진행하시면 이용약관과</Text>
        <Text style={s.privacyText}>
          개인정보처리방침에 동의한 것으로 간주힙니다.
        </Text>
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
    backgroundColor: "black",
  },
  descView: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 3,
  },
  descText: {
    color: "black",
    fontSize: 20,
  },
  loginView: {
    justifyContent: "center",
    alignItems: "center",
    height: "20%",
    width: "100%",
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    marginVertical: 5,
    width: "50%",
    borderRadius: 7,
    zIndex: 10,
  },
  loginButtonText: {
    color: "black",
    fontSize: 15,
  },
  loginButtonKakao: {
    backgroundColor: "yellow",
  },
  loginButtonApple: {
    backgroundColor: "lightgray",
  },
  privacyView: {
    alignItems: "center",
    height: "10%",
  },
  privacyText: {
    color: "black",
    fontSize: 10,
  },
});
