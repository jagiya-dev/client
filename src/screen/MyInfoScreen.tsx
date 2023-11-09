import { Button } from "@/components/button";
import {
  AppleIdLoginOffIcon,
  AppleIdLoginOnIcon,
  KakaoIdLoginOffIcon,
  KakaoIdLoginOnIcon,
} from "@/components/Icon";
import { color } from "@/styles/color";
import { font } from "@/styles/font";
import {
  Image,
  Platform,
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
import { useFocusEffect } from "@react-navigation/native";
import {
  getUserDetail,
  loginAndUserTransform,
  updateUserName,
  UserDetailResponse,
} from "@/network/api";
import { useCallback, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LocalAuthState, StackParamList } from "@/typing";
import { kakao } from "@/state/auth/auth.state.kakao";
import { local } from "@/state/auth/auth.state.local";
import { apple } from "@/state/auth/auth.state.apple";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useObservableState } from "@/hook/useObservableState";

type Props = NativeStackScreenProps<StackParamList, "MyInfo">;
const MyInfoScreen = ({ route, navigation }: Props) => {
  const { params } = route;
  const userId = params?.userId;

  const [userDetail, setUserDetail] = useState<UserDetailResponse>();
  const [isNameEditMode, setNameEditMode] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");

  let accountInfo = "guest";
  if (userDetail?.email && userDetail.email !== "") {
    accountInfo = userDetail.email;
  }

  const onChange_updateNewName = (text: string) => {
    setNewName(text);
  };

  const { setItem } = useAsyncStorage("localAuthState");

  const isSupportAppleLogin = useObservableState({
    observable: apple.isSupportAppleLogin$,
  });

  const [loginStatus, setLoginStatus] =
    useState<LocalAuthState["whichLoginType"]>("guest");

  useFocusEffect(
    useCallback(() => {
      setLoginStatus(local.localAuthState.whichLoginType);
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchUserDetail = async () => {
        try {
          if (!userId) return;

          const { data } = await getUserDetail({
            userId: userId.toString(),
          });

          if (isActive && data) {
            setUserDetail(data);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchUserDetail();

      return () => {
        isActive = false;
      };
    }, [userId]),
  );

  const onPressButton_enableNameEditMode = () => {
    setNameEditMode(true);
  };

  const onPressButton_submitNewName = async () => {
    setNameEditMode(false);

    try {
      const { data } = await updateUserName({
        userId: Number(userId),
        name: newName,
      });

      if (!data) return;
      console.log("update user name succeed!", JSON.stringify(data, null, 2));

      setUserDetail((prev) => ({
        ...prev,
        name: newName,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const onPressButton_loginAndTransformToKakao = async () => {
    try {
      await kakao.login();

      local.logout();
      local.login("kakao");
      await local.update();

      await setItem("{}");
      const persistentLocalAuthState = JSON.stringify(local.localAuthState);
      await setItem(persistentLocalAuthState);

      const profile = kakao.kakaoProfile;
      if (!profile) return;

      const { data } = await loginAndUserTransform({
        userId: userId,
        name: profile.name,
        email: profile.email,
        snsType: "1",
        tobeSnsId: profile.id,
      });
      setLoginStatus("kakao");

      if (!data) return;
    } catch (err) {
      console.error(err);
    }
  };

  const onPressButton_loginAndTransformToApple = async () => {
    try {
      if (!isSupportAppleLogin) {
        console.log(
          "This device doesn't support Sign in with Apple because API is",
          Platform.Version,
        );
        return;
      }

      await apple.login();

      local.logout();
      local.login("apple");
      await local.update();

      await setItem("{}");
      const persistentLocalAuthState = JSON.stringify(local.localAuthState);
      await setItem(persistentLocalAuthState);

      const info = apple.appleInfo;
      if (!info) return;

      const { data } = await loginAndUserTransform({
        userId,
        name: info.fullName?.nickname ?? "",
        email: info.email ?? "",
        snsType: "2",
        tobeSnsId: info.user,
      });
      setLoginStatus("apple");
    } catch (err) {
      console.error(err);
    }
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
        {!isNameEditMode && (
          <View style={s.contentLabelContainer}>
            <View style={s.contentTitleLabelContainer}>
              <Text style={s.contentTitleLabel}>이름</Text>
            </View>

            <View style={s.contentModeText}>
              <Text style={s.contentLabel}>{userDetail?.name ?? "비회원"}</Text>

              <Button
                onPress={onPressButton_enableNameEditMode}
                style={s.contentToggleBtn}
              >
                <Text style={s.contentBtnLabel}>변경</Text>
              </Button>
            </View>
          </View>
        )}

        {/*이름수정*/}
        {isNameEditMode && (
          <View style={s.contentLabelContainer}>
            <View style={s.contentTitleLabelContainer}>
              <Text style={s.contentTitleLabel}>이름</Text>
            </View>

            <View style={s.contentModeTextNameBox}>
              <View style={s.contentModeTextNameInputBox}>
                <TextInput
                  style={s.contentInput}
                  placeholder="닉네임 입력"
                  value={newName}
                  onChangeText={onChange_updateNewName}
                />
              </View>

              <Text style={s.contentBtnNameAlertLabel}>
                닉네임을 입력하세요.
              </Text>

              <Button
                onPress={onPressButton_submitNewName}
                style={s.contentToggleBtnSave}
              >
                <Text style={s.contentBtnSaveLabel}>저장하기</Text>
              </Button>
            </View>
          </View>
        )}

        <View style={s.contentLabelContainer}>
          <View style={s.contentTitleLabelContainer}>
            <Text style={s.contentTitleLabel}>계정 정보</Text>
          </View>

          <View style={s.contentModeTextUser}>
            <Text style={s.contentLabel}>{accountInfo}</Text>
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
            disabled={loginStatus !== "guest"}
            onPress={onPressButton_loginAndTransformToKakao}
            style={s.contentToggleBottomBtn}
          >
            {loginStatus === "kakao" ? (
              <KakaoIdLoginOnIcon />
            ) : (
              <KakaoIdLoginOffIcon />
            )}
          </Button>

          {Platform.OS === "ios" && (
            <Button
              disabled={loginStatus !== "guest"}
              onPress={onPressButton_loginAndTransformToApple}
              style={s.contentToggleBottomBtn}
            >
              {loginStatus === "apple" ? (
                <AppleIdLoginOnIcon />
              ) : (
                <AppleIdLoginOffIcon />
              )}
            </Button>
          )}
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
    lineHeight: font.body["3"].height,
    color: color.gray["700"],
  },

  contentBtnLabel: {
    fontSize: font.button["2"].size,
    fontWeight: font.button["2"].weight,
    lineHeight: font.button["2"].height,
  },

  contentBtnSaveLabel: {
    fontSize: font.button["2"].size,
    fontWeight: font.button["2"].weight,
    lineHeight: font.button["2"].height,
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
