import { Button } from "@/components/button";
import { KakaoIdLoginOffIcon, AppleIdLoginOnIcon } from "@/components/Icon";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { headerStyles } from "@/components/Header";
import navUtils from "@/util/NavigationUtil";

const MyInfoScreen = () => {
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

  return (
    <SafeAreaView style={s.root}>
      <View style={s.innerRoot}>
        {/* 0. header */}
        <View style={[headerStyles.headerContainer, headerStyles.headerCenter]}>
          <TouchableOpacity
            style={[
              headerStyles.headerClickable,
              headerStyles.headerPositional,
              headerStyles.headerIcon,
            ]}
            onPress={navUtils.onPress_goBack}
          >
            <Image
              source={require("#/icons/arrow_left.png")}
              style={headerStyles.headerIcon}
            />
          </TouchableOpacity>

          <Text style={[headerStyles.headerTitle, { flex: 4.1 }]}>내 정보</Text>
        </View>

        {/* 1. content View */}
        <View style={s.contentLabelContainer}>
          <View style={s.contentTitleLabelContainer}>
            <Text style={s.contentTitleLabel}>이름</Text>
          </View>
          <View style={s.contentModeText}>
            <Text style={s.contentLabel}>nickname</Text>
            <Button onPress={onPressButton_Mode01} style={s.contentToggleBtn}>
              <Text style={s.contentBtnLabel}>변경</Text>
            </Button>
          </View>
        </View>

        {/*이름수정*/}
        <View style={s.contentLabelContainer}>
          <View style={s.contentTitleLabelContainer}>
            <Text style={s.contentTitleLabel}>이름</Text>
          </View>
          <View style={s.contentModeTextNameBox}>
            <View style={s.contentModeTextNameInputBox}>
              <TextInput style={s.contentInput} placeholder="닉네임 입력" />
            </View>
            <Text style={s.contentBtnNameAlertLabel}>닉네임을 입력하세요.</Text>
            <Button
              onPress={onPressButton_Mode01}
              style={s.contentToggleBtnSave}
            >
              <Text style={s.contentBtnSaveLabel}>저장하기</Text>
            </Button>
          </View>
        </View>

        <View style={s.contentLabelContainer}>
          <View style={s.contentTitleLabelContainer}>
            <Text style={s.contentTitleLabel}>계정 정보</Text>
          </View>
          <View style={s.contentModeTextUser}>
            <Text style={s.contentLabel}>user_email</Text>
          </View>
        </View>

        <View style={s.contentLabelContainer}>
          <View style={s.contentTitleLabelContainer}>
            <Text style={s.contentTitleLabel}>SNS연결</Text>
          </View>
          <View style={s.contentModeText}>
            <Text style={s.contentLabel}>
              연결된 SNS계정으로 간편하게 로그인할 수 있어요.
            </Text>
          </View>
        </View>

        <View style={s.contentLabelContainerSns}>
          <Button
            onPress={onPressButton_Mode02}
            style={s.contentToggleBottomBtn}
          >
            <KakaoIdLoginOffIcon />
          </Button>
          <Button
            onPress={onPressButton_Mode03}
            style={s.contentToggleBottomBtn}
          >
            <AppleIdLoginOnIcon />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyInfoScreen;

const s = StyleSheet.create({
  root: {
    width: wp("100%"),
    flex: 1,
  },
  innerRoot: {
    paddingHorizontal: 20,
  },
  contentLabelContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  contentLabelContainerSns: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
  },

  contentLabel: {
    fontSize: font.body["3"].size,
    fontWeight: font.body["3"].weight,
    color: color.gray["700"],
  },

  contentBtnLabel: {
    fontSize: font.button["2"].size,
    fontWeight: font.button["2"].weight,
  },

  contentBtnSaveLabel: {
    fontSize: font.button["2"].size,
    fontWeight: font.button["2"].weight,
    color: "#ffffff",
  },

  contentTitleLabelContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  contentTitleLabel: {
    fontSize: font.body["2"].size,
    fontWeight: font.body["2"].weight,
  },
  contentToggleBtn: {
    backgroundColor: color.gray["0"],
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
    height: 52,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#C5C8CB",
  },

  contentToggleBottomBtn: {
    marginRight: 15,
  },

  contentModeText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 52,
  },

  contentModeTextNameBox: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  contentModeTextNameInputBox: {
    backgroundColor: color.gray["0"],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 52,
    width: "100%",
    borderWidth: 1,
    borderColor: "#C5C8CB",
    borderRadius: 4,
  },

  contentBtnNameAlertLabel: {
    color: "#ED7267",
    paddingTop: 10,
    paddingBottom: 10,
  },

  contentModeTextUser: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF0F3",
  },

  contentInput: {
    marginLeft: 10,
  },
  contentToggleBtnSave: {
    backgroundColor: "#0099FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 30,
    paddingRight: 30,
    height: 52,
    borderRadius: 4,
    width: "100%",
  },

  iconStyle: {
    paddingRight: 20,
  },

  addNewAlarmItembuttonRoot: {
    position: "relative",
  },
  addNewAlarmItemButton: {
    position: "absolute",
    right: 15,
    bottom: 39,
  },
});
