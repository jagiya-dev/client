import Text from "@/components/Text";
import { getAlarmDetail } from "@/network/api";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

const RepeatContainer = () => {
  useEffect(() => {
    const fetch = async () => {
      const res = await getAlarmDetail({ alarmId: "1" });
      console.log(res);
    };
    fetch();
  }, []);

  return (
    <View>
      <Text>반복</Text>
    </View>
  );
};

export default RepeatContainer;

const s = StyleSheet.create({
  root: {},
});
