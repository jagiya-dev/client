import { Button } from "@/components/button";
import {
  InformationMyPageIcon,
  ShareMyPageIcon,
  UserMyPageIcon,
} from "@/components/Icon";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import {
  Image,
  Platform,
  SafeAreaView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "@/typing";
import navUtils from "@/util/NavigationUtil";
import { headerStyles } from "@/components/Header";
import { getPrivacyPolicy, getTermsOfUse, memberDelete } from "@/network/api";
import { local } from "@/state/auth/auth.state.local";
import { kakao } from "@/state/auth/auth.state.kakao";
import { apple } from "@/state/auth/auth.state.apple";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

type Props = NativeStackScreenProps<StackParamList, "Settings">;

const SettingsScreen = ({ route, navigation }: Props) => {
  const { setItem } = useAsyncStorage("localAuthState");
  const onPressButton_openMyInfo = () => {
    navigation.navigate("MyInfo");
  };

  // const onPressButton_share = async () => {
  //   console.log("onPressButton_share");
  //
  //   // TODO: add app store url
  //   const urlToShare = Platform.select({
  //     ios: "https://www.google.com/",
  //     android: "https://www.google.com/",
  //   });
  //
  //   try {
  //     const result = await Share.share({
  //       message: "공유하시겠습니까!",
  //       title: "공유하기!",
  //       url: urlToShare,
  //     });
  //
  //     switch (result.action) {
  //       case "sharedAction":
  //         {
  //           if (result.activityType) {
  //             console.log("sharedAction: ", result.activityType);
  //             // shared with activity type of result.activityType
  //           } else {
  //             console.log("shared!");
  //             // shared
  //           }
  //         }
  //         break;
  //
  //       case "dismissedAction":
  //         {
  //           // dismissed
  //           console.log("dismissedAction");
  //         }
  //         break;
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const onPressButton_logOut = async () => {
    const snsType = local.getSnsType();
    console.log("onPressButton_logOut. snsType: ", snsType);

    try {
      if (snsType === "1") {
        await kakao.unlink();
      } else if (snsType === "2") {
        await apple.logout();
      } else {
        local.logout();
      }
      await setItem("");

      navigation.navigate("Login");
    } catch (err) {
      console.error(err);
    }
  };

  const onPressButton_withdrawAccount = async () => {
    console.log("onPressButton_withdrawAccount");

    const snsType = local.getSnsType();

    try {
      const { snsId } = await local.getSnsInfo();

      if (snsType === "1") {
        await kakao.unlink();
      } else if (snsType === "2") {
        await apple.logout();
      } else {
        local.logout();
      }

      await setItem("");

      const { data } = await memberDelete({
        snsId,
        snsType,
      });

      console.log("Setting Screen: ", JSON.stringify(data, null, 2));

      navigation.navigate("Login");
    } catch (err) {
      console.error(err);
    }
  };

  const onPress_termsOfUse = async () => {
    const response = await getTermsOfUse();

    navigation.navigate("Webview", {
      html: response.data?.html ?? "",
      headerTitle: "이용약관",
    });
  };

  const onPress_privacyPolicy = async () => {
    const response = await getPrivacyPolicy();

    navigation.navigate("Webview", {
      html: response.data?.html ?? "",
      headerTitle: "개인정보처리방침",
    });
  };

  return (
    <SafeAreaView style={s.root}>
      <View style={s.innerRoot}>
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

          <Text
            style={[headerStyles.headerTitle, headerStyles.headerTitleFlex]}
          >
            설정
          </Text>
        </View>

        {/* 2. content View */}
        <View style={s.contentLabelContainer}>
          <View style={s.contentTitleLabelContainer}>
            <Text style={s.contentTitleLabel}>일반</Text>
          </View>

          <Button
            onPress={onPressButton_openMyInfo}
            style={s.contentFirstToggleModeText}
          >
            <UserMyPageIcon />
            <Text style={s.contentLabel}>내 정보</Text>
          </Button>

          {/*<Button onPress={onPressButton_share} style={s.contentToggleModeText}>*/}
          {/*  <ShareMyPageIcon />*/}
          {/*  <Text style={s.contentLabel}>친구에게 공유하기</Text>*/}
          {/*</Button>*/}
        </View>

        <View style={s.contentLabelContainer}>
          <View style={s.contentTitleLabelContainer}>
            <Text style={s.contentTitleLabel}>정보</Text>
          </View>

          <Button
            onPress={onPress_termsOfUse}
            style={s.contentFirstToggleModeText}
          >
            <InformationMyPageIcon style={s.iconStyle} />
            <Text style={s.contentLabel}>이용약관</Text>
          </Button>

          <Button
            onPress={onPress_privacyPolicy}
            style={s.contentToggleModeText}
          >
            <InformationMyPageIcon style={s.iconStyle} />
            <Text style={s.contentLabel}>개인정보 처리방침</Text>
          </Button>
        </View>

        <View style={s.contentLabelContainer}>
          <Button
            onPress={onPressButton_logOut}
            style={s.contentFirstToggleModeText}
          >
            <Text style={s.contentFirstLabel}>로그아웃</Text>
          </Button>
          <Button
            onPress={onPressButton_withdrawAccount}
            style={s.contentTwoToggleDeleteModeText}
          >
            <Text style={s.contentDeleteLabel}>탈퇴하기</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const s = StyleSheet.create({
  root: {
    width: wp("100%"),
    flex: 1,
  },

  innerRoot: {
    paddingHorizontal: 20,
  },

  headerContainer: {
    position: "relative",

    height: 70,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: font.body["1"].size,
    fontWeight: font.body["1"].weight,
    lineHeight: font.body["1"].height,
  },
  headerGoBackIcon: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 140,
  },

  detailButton: {
    width: 10,
    flex: 4.7,
  },
  detailButtonText: {
    color: "white",
    fontSize: font.button["2"].size,
    fontWeight: font.button["2"].weight,
    marginRight: 4,
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
    paddingLeft: 20,
  },
  contentDeleteLabel: {
    fontSize: font.body["3"].size,
    fontWeight: font.body["3"].weight,
    // color: color.gray["700"],
    justifyContent: "center",
    paddingLeft: 20,
    color: "#9DA0A3",
  },
  contentFirstLabel: {
    fontSize: font.body["3"].size,
    fontWeight: font.body["3"].weight,
    color: color.gray["700"],
    justifyContent: "center",
  },

  contentFirstToggleModeText: {
    flexDirection: "row", //가로로 배열
    justifyContent: "flex-start", // 요소 사이에 공간 분배
    alignItems: "center",
    backgroundColor: color.gray["0"],
    height: 54,
    borderBottomWidth: 1, // 1px의 아래 테두리
    borderBottomColor: "#EDF0F3", // 아래 테두리의 색상
    paddingLeft: 20,
    borderTopLeftRadius: 8, // 위 왼쪽 모서리에 radius 적용
    borderTopRightRadius: 8, // 위 오른쪽 모서리에 radius 적용
  },
  contentToggleModeText: {
    flexDirection: "row", //가로로 배열
    justifyContent: "flex-start", // 요소 사이에 공간 분배
    alignItems: "center",
    backgroundColor: color.gray["0"],
    height: 54,
    paddingLeft: 20,
    borderBottomLeftRadius: 8, // 위 왼쪽 모서리에 radius 적용
    borderBottomRightRadius: 8, // 위 오른쪽 모서리에 radius 적용
  },
  contentTwoToggleDeleteModeText: {
    flexDirection: "row", //가로로 배열
    justifyContent: "flex-start", // 요소 사이에 공간 분배
    alignItems: "center",
    backgroundColor: color.gray["0"],
    height: 54,
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

  iconStyle: {
    paddingRight: 20,
  },
});
