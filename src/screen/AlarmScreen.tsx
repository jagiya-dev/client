import {StyleSheet, Text, View} from "react-native";
import {Button} from "@/components/button";
import {createAlarm} from "react-native-simple-alarm";
import {widthPercentageToDP} from "react-native-responsive-screen";

const AlarmScreen = () => {
    const onPressButton_CreateNewAlarm = async () => {
        try {
            const newAlarm = await createAlarm({
                active: true,
                date: new Date().toISOString(),
                message: "Wake Up!",
                snooze: 1,
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <View style={s.root}>
            <Button onPress={onPressButton_CreateNewAlarm}>
                <Text>Create New Alarm!</Text>
            </Button>
        </View>
    )
};

export default AlarmScreen;

const s = StyleSheet.create({
    root: {
        flex: 1,
        width: widthPercentageToDP("100%"),
        justifyContent: "center",
        alignItems: "center"
    }
});
