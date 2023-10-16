import { Button } from "@/components/button";
import {LeftArrowIcon02, ShareMyPageIcon, InformationMyPageIcon, UserMyPageIcon} from "@/components/Icon";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import {
  GestureResponderEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AddNewAlarmItemButton from "@/components/button/AddNewAlarmItem.button";
import {behaviours as AlarmBehaviours} from "@/state/alarm/alarm.state";
import {genRandomAlarmItem} from "@/state/alarm/alarm.helper";


/** click **/
const onPressButton_Mode01 = () => {
  console.log("onPressButton_Mode01");
};
const onPressButton_Mode02 = () => {
  console.log("onPressButton_Mode02");
};
const onPressButton_Mode03 = () => {
  console.log("onPressButton_Mode03");
};
const onPressButton_Mode04 = () => {
  console.log("onPressButton_Mode04");
};
const onPressButton_Mode05 = () => {
  console.log("onPressButton_Mode05");
};

const onPressButton_AddNewAlarmItem = (_: GestureResponderEvent) => {
  AlarmBehaviours.addNewAlarmItem(genRandomAlarmItem());
};

const onPressButton_DetailButton = (event: GestureResponderEvent) => {
  console.log("onPressButton_DetailButton");
};


type Props = {};

const SettingsScreen = (props: Props) => {
  return (
      <SafeAreaView style={s.root}>
        <View style={s.innerRoot}>
          {/* 1. head */}

          <View style={s.headContainer}>
            <Button style={s.detailButton} onPress={onPressButton_DetailButton}>
              <LeftArrowIcon02/>
            </Button>
            <Text style={s.headText}>설정</Text>
          </View>




          {/* 2. content View */}

          <View style={s.contentLabelContainer}>

            <View style={s.contentTitleLabelContainer}>
              <Text style={s.contentTitleLabel}>일반</Text>
            </View>

            <Button onPress={onPressButton_Mode01} style={s.contentFirstToggleModeText}>
              <UserMyPageIcon/><Text style={s.contentLabel}>내 정보</Text>
            </Button>
            <Button onPress={onPressButton_Mode02} style={s.contentToggleModeText}>
              <ShareMyPageIcon/><Text style={s.contentLabel}>친구에게 공유하기</Text>
            </Button>
          </View>



          <View style={s.contentLabelContainer}>

            <View style={s.contentTitleLabelContainer}>
              <Text style={s.contentTitleLabel}>정보</Text>
            </View>

            <Button onPress={onPressButton_Mode03} style={s.contentToggleModeText}>
              <InformationMyPageIcon style={s.iconStyle}/><Text style={s.contentLabel}>이용약관&개인정보처리방침</Text>
            </Button>
          </View>



          <View style={s.contentLabelContainer}>
            <Button onPress={onPressButton_Mode04} style={s.contentFirstToggleModeText}>
              <Text style={s.contentFirstLabel}>로그아웃</Text>
            </Button>
            <Button onPress={onPressButton_Mode05} style={s.contentTwoToggleDeleteModeText}>
              <Text style={s.contentDeleteLabel}>탈퇴하기</Text>
            </Button>
          </View>



        </View>



        {/* 5. Add New Alarm Item Button and its additive shadow */}
        <View style={s.addNewAlarmItembuttonRoot}>
          <AddNewAlarmItemButton
              style={s.addNewAlarmItemButton}
              onPress={onPressButton_AddNewAlarmItem}
          />
        </View>
      </SafeAreaView>
  );
}

export default SettingsScreen;

const s = StyleSheet.create({

  root: {
    width: wp("100%"),
    flex: 1,
  },
  innerRoot: {
    paddingHorizontal: 20,
  },
  headContainer: {
    height: 68,
    flexDirection: "row", //가로로 배열
    justifyContent: "center", // 요소 사이에 공간 분배
    alignItems: "center"
  },
  headText: {
    flex: 5.3,
    fontSize: font.body["1"].size,
    fontWeight: font.body["1"].weight,
    color: color.gray["700"],
    justifyContent: "center"
  },
  detailButton: {
    width:10,
    flex: 4.7

  },
  detailButtonText: {
    color: "white",
    fontSize: font.button["2"].size,
    fontWeight: font.button["2"].weight,
    marginRight: 4
  },



  contentLabelContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 16,

  },
  contentLabel: {
    fontSize: font.body["3"].size,
    fontWeight: font.body["3"].weight,
    color: color.gray["700"],
    justifyContent: "center",
    paddingLeft:20
  },
  contentDeleteLabel: {
    fontSize: font.body["3"].size,
    fontWeight: font.body["3"].weight,
    // color: color.gray["700"],
    justifyContent: "center",
    paddingLeft:20,
    color: '#9DA0A3'
  },
  contentFirstLabel: {
    fontSize: font.body["3"].size,
    fontWeight: font.body["3"].weight,
    color: color.gray["700"],
    justifyContent: "center"
  },

  contentToggleModeText: {
    flexDirection: "row", //가로로 배열
    justifyContent: "flex-start", // 요소 사이에 공간 분배
    alignItems: "center",
    backgroundColor: color.gray["0"],
    height:54,
    paddingLeft:20,
    borderBottomLeftRadius: 8, // 위 왼쪽 모서리에 radius 적용
    borderBottomRightRadius: 8, // 위 오른쪽 모서리에 radius 적용
  },
  contentFirstToggleModeText: {
    flexDirection: "row", //가로로 배열
    justifyContent: "flex-start", // 요소 사이에 공간 분배
    alignItems: "center",
    backgroundColor: color.gray["0"],
    height:54,
    borderBottomWidth: 1, // 1px의 아래 테두리
    borderBottomColor: '#EDF0F3', // 아래 테두리의 색상
    paddingLeft:20,
    borderTopLeftRadius: 8, // 위 왼쪽 모서리에 radius 적용
    borderTopRightRadius: 8, // 위 오른쪽 모서리에 radius 적용
  },
  contentTwoToggleDeleteModeText: {
    flexDirection: "row", //가로로 배열
    justifyContent: "flex-start", // 요소 사이에 공간 분배
    alignItems: "center",
    backgroundColor: color.gray["0"],
    height:54,
    borderBottomLeftRadius: 8, // 위 왼쪽 모서리에 radius 적용
    borderBottomRightRadius: 8, // 위 오른쪽 모서리에 radius 적용
  },

  contentTitleLabelContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  contentTitleLabel: {
    fontSize: font.body["2"].size,
    fontWeight: font.body["2"].weight,
    color: color.gray["700"],

  },

  iconStyle:{
    paddingRight: 20
  },


  addNewAlarmItembuttonRoot: {
    position: "relative",
  },
  addNewAlarmItemButton: {
    position: "absolute",
    right: 15,
    bottom: 39,
  }

});
