import { Text, View, Pressable, Image, TouchableOpacity } from "react-native";

const LoginScreen = () => {
  const onPressKakaoLoginButton = () => {
    console.log("kakao login button pressed");
  }

  const onPressAppleLoginButton = () => {
    console.log("apple login button pressed");
  }

  return (
    <View className="justify-center items-center h-screen z-0">

      {/* Image Section */}
      <Image className="w-[50%] h-[22%] bg-black" source={{ uri: "https://example.com/image.jpg" }} />

      <View className="justify-center items-center pt-3">
        <Text className="text-black">레디우산에 로그인하시고</Text>
        <Text className="text-black">더 많은 기능을 이용해 보세요!</Text>
      </View>

      {/* Login Section */}
      <View className="items-center justify-center gap-y-5 h-[20%] w-full">
        <TouchableOpacity className="items-center justify-center py-3 rounded-lg bg-yellow-300 w-[50%] z-10" onPress={onPressKakaoLoginButton}>
          <Text className="text-md text-black">카카오 로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center justify-center w-[50%] py-3 rounded-lg bg-neutral-300 z-10" onPress={onPressAppleLoginButton}>
          <Text className="text-md text-black">애플 로그인</Text>
        </TouchableOpacity>
      </View>

      <View className="items-center h-[10%]">
        <Text className="text-xs">로그인을 진행하시면 이용약관과 </Text>
        <Text className="text-xs">개인정보처리방침에 동의한 것으로 간주힙니다.</Text>
      </View>
    </View>
  )
};

export default LoginScreen;