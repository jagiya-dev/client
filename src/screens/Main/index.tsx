import { Text, View } from "react-native"

const MainScreen = () => {
  return (
    <View tw="w-screen h-screen bg-neutral-300 dark:bg-slate-900 dark:text-white light:text-black">
      <Text className="text-xl">Ik heet yoonsang uit Zuit-Korea.</Text>
    </View>
  );
};

export default MainScreen;