import {
    GestureResponderEvent, Image,
    StyleSheet, TouchableOpacity,
    TouchableOpacityProps,
    View,
} from "react-native";
import {color} from "@/styles/color";
import {Shadow} from "react-native-shadow-2";

type Props = {
    onPress?: (e: GestureResponderEvent) => void;
} & TouchableOpacityProps;

const AddNewAlarmItemButton = (props: Props) => (
    <View style={[props.style, {zIndex: 10}]}>
        <Shadow distance={16} offset={[6, 6]} startColor="rgba(0, 0, 0, 0.1)">
            <TouchableOpacity style={s.button} onPress={props.onPress}>
                <Image source={require("#/icons/icon-plus.png")} style={s.plusIcon}/>
            </TouchableOpacity>
        </Shadow>
    </View>
);

export default AddNewAlarmItemButton;

const s = StyleSheet.create({
    button: {
        width: 62,
        height: 62,
        borderRadius: 50,
        backgroundColor: color.primary["600"],
        justifyContent: "center",
        alignItems: "center",
    },
    plusIcon: {
        tintColor: "white",
    },
});
