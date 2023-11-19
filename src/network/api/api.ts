/**
 * Generated by orval v6.18.1 🍺
 * Do not edit manually.
 * Springdoc
 * Springdoc을 사용한 Swagger UI
 * OpenAPI spec version: 1.0.0
 */
import type {
  AlarmAuthorityInsert1200,
  AlarmAuthorityInsert1Params,
  AlarmAuthorityInsert200,
  AlarmAuthorityInsertParams,
  AlarmDeleteRequest,
  AlarmEnabledRequest,
  AlarmInsertRequest,
  AlarmUpdateRequest,
  DeleteAlarm200,
  GetAlarmDetail200,
  GetAlarmDetailParams,
  GetAlarmList200,
  GetAlarmListParams,
  GetAlarmLocationTimeList200,
  GetAlarmLocationTimeListParams,
  GetAlarmLocationWeather200,
  GetAlarmLocationWeatherDetail200,
  GetAlarmLocationWeatherDetailParams,
  GetAlarmLocationWeatherParams,
  GetLocation200,
  GetLocationForWeather200,
  GetLocationForWeatherParams,
  GetLocationParams,
  GetPrivacyPolicy200,
  GetRecentDeleteLocationParams,
  GetRecentLocation200,
  GetRecentLocationParams,
  GetRecentSelectLocation200,
  GetRecentSelectLocationParams,
  GetTermsOfUse200,
  GetUserDetail200,
  GetUserDetailParams,
  InsertAlarm200,
  Login200,
  LoginAndUserTransform200,
  LoginAndUserTransformParams,
  LoginParams,
  Logout200,
  LogoutParams,
  MemberDelete200,
  MemberDeleteParams,
  RefreshLocationForWeather200,
  RefreshLocationForWeatherParams,
  UpdateAlarm200,
  UpdateAlarmEnabled200,
  UpdateUserName200,
  UserDetailUpdateRequest,
} from "./model";
import type { BodyType } from "./api.mutator";
import { getInstance, getInstanceWithHeaders } from "./api.mutator";
import { local } from "@/state/auth/auth.state.local";

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P,
) => any
  ? P
  : never;

/**
 * 이름 변경
 * @summary 이름 변경
 */
export const updateUserName = (
  userDetailUpdateRequest: BodyType<UserDetailUpdateRequest>,
  options?: SecondParameter<typeof getInstance>,
) => {
  return getInstance<UpdateUserName200>(
    {
      url: `/user/updateUserName`,
      method: "put",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        AccessToken: local.localAuthState.accessToken,
        RefreshToken: local.localAuthState.refreshToken,
      },
      data: userDetailUpdateRequest,
    },
    options,
  );
};

/**
 * 알람 수정
 * @summary 알람 수정
 */
export const updateAlarm = (
  alarmUpdateRequest: BodyType<AlarmUpdateRequest>,
  options?: SecondParameter<typeof getInstance>,
) => {
  return getInstance<UpdateAlarm200>(
    {
      url: `/alarm/updateAlarm`,
      method: "put",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        AccessToken: local.localAuthState.accessToken,
        RefreshToken: local.localAuthState.refreshToken,
      },
      data: alarmUpdateRequest,
    },
    options,
  );
};

/**
 * 알람 사용여부 변경
 * @summary 알람 사용여부 변경
 */
export const updateAlarmEnabled = (
  alarmEnabledRequest: BodyType<AlarmEnabledRequest>,
  options?: SecondParameter<typeof getInstance>,
) => {
  return getInstance<UpdateAlarmEnabled200>(
    {
      url: `/alarm/updateAlarmEnabled`,
      method: "put",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      data: alarmEnabledRequest,
    },
    options,
  );
};

/**
 * 알람 등록
 * @summary 알람 등록
 */
export const insertAlarm = (
  alarmInsertRequest: BodyType<AlarmInsertRequest>,
  options?: SecondParameter<typeof getInstance>,
) => {
  return getInstance<InsertAlarm200>(
    {
      url: `/alarm/insertAlarm`,
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        AccessToken: local.localAuthState.accessToken,
        RefreshToken: local.localAuthState.refreshToken,
      },
      data: alarmInsertRequest,
    },
    options,
  );
};

/**
 * 지역코드와 갱신타입을 입력하면 해당 지역의 날씨를 갱신하여 DB를 저장하고 조회 테스트용 실제 사용 X
 * @summary 지역별 날씨갱신
 */
export const refreshLocationForWeather = (
  params: RefreshLocationForWeatherParams,
  options?: SecondParameter<typeof getInstance>,
) => {
  return getInstance<RefreshLocationForWeather200>(
    {
      url: `/weather/refreshLocationForWeather`,
      method: "get",
      params,
      headers: {
        AccessToken: local.localAuthState.accessToken,
        RefreshToken: local.localAuthState.refreshToken,
      },
    },
    options,
  );
};

/**
 * 지역코드와 기준날짜를 입력하면 날씨DB를 조회(지역코드는 /location/getLocation에서 조회가능하다.) 테스트용 실제 사용 X
 * @summary 지역별 날씨
 */
export const getLocationForWeather = (
  params: GetLocationForWeatherParams,
  options?: SecondParameter<typeof getInstance>,
) => {
  return getInstance<GetLocationForWeather200>(
    {
      url: `/weather/getLocationForWeather`,
      method: "get",
      params,
      headers: {
        AccessToken: local.localAuthState.accessToken,
        RefreshToken: local.localAuthState.refreshToken,
      },
    },
    options,
  );
};

/**
 * 로그아웃
 * @summary 로그아웃
 */
export const logout = (
  params: LogoutParams,
  options?: SecondParameter<typeof getInstance>,
) => {
  return getInstance<Logout200>(
    {
      url: `/user/logout`,
      method: "get",
      params,
      headers: {
        AccessToken: local.localAuthState.accessToken,
        RefreshToken: local.localAuthState.refreshToken,
      },
    },
    options,
  );
};

/**
 * 로그인
 * @summary 로그인
 */
export const login = (
  params: LoginParams,
  options?: SecondParameter<typeof getInstance>,
) => {
  return getInstanceWithHeaders<Login200>(
    { url: `/user/login`, method: "get", params },
    options,
  );
};

/**
 * 회원전환 로그인
 * @summary 회원전환 로그인
 */
export const loginAndUserTransform = (
  params: LoginAndUserTransformParams,
  options?: SecondParameter<typeof getInstance>,
) => {
  return getInstance<LoginAndUserTransform200>(
    {
      url: `/user/loginAndUserTransform `,
      method: "get",
      params,
      headers: {
        AccessToken: local.localAuthState.accessToken,
        RefreshToken: local.localAuthState.refreshToken,
      },
    },
    options,
  );
};

/**
 * 회원조회
 * @summary 회원조회
 */
export const getUserDetail = (
  params: GetUserDetailParams,
  options?: SecondParameter<typeof getInstance>,
) => {
  return getInstance<GetUserDetail200>(
    {
      url: `/user/getUserDetail`,
      method: "get",
      params,
      headers: {
        AccessToken: local.localAuthState.accessToken,
        RefreshToken: local.localAuthState.refreshToken,
      },
    },
    options,
  );
};

/**
 * 이용약관 조회
 * @summary 이용약관 조회
 */
export const getTermsOfUse = (
  options?: SecondParameter<typeof getInstance>,
) => {
  return getInstance<GetTermsOfUse200>(
    {
      url: `/user/getTermsOfUse`,
      method: "get",
      headers: {
        AccessToken: local.localAuthState.accessToken,
        RefreshToken: local.localAuthState.refreshToken,
      },
    },
    options,
  );
};

/**
 * 개인정보처리방침 조회
 * @summary 개인정보처리방침 조회
 */
export const getPrivacyPolicy = (
  options?: SecondParameter<typeof getInstance>,
) => {
  return getInstance<GetPrivacyPolicy200>(
    {
      url: `/user/getPrivacyPolicy`,
      method: "get",
      headers: {
        AccessToken: local.localAuthState.accessToken,
        RefreshToken: local.localAuthState.refreshToken,
      },
    },
    options,
  );
};

/**
 * 탈퇴
 * @summary 탈퇴
 */
export const memberDelete = (
  params: MemberDeleteParams,
  options?: SecondParameter<typeof getInstance>,
) => {
  return getInstance<MemberDelete200>(
    {
      url: `/memberInfo/delete`,
      method: "get",
      params,
      headers: {
        AccessToken: local.localAuthState.accessToken,
        RefreshToken: local.localAuthState.refreshToken,
      },
    },
    options,
  );
};

/**
 * 최근 검색한 주소목록
 * @summary 최근검색 주소목록
 */
export const getRecentSelectLocation = (
  params: GetRecentSelectLocationParams,
  options?: SecondParameter<typeof getInstance>,
) => {
  return getInstance<GetRecentSelectLocation200>(
    {
      url: `/location/getRecentSelectLocation`,
      method: "get",
      params,
      headers: {
        AccessToken: local.localAuthState.accessToken,
        RefreshToken: local.localAuthState.refreshToken,
      },
    },
    options,
  );
};

/**
 * 검색한 주소를 저장한다
 * @summary 검색 주소 저장
 */
export const getRecentLocation = (
  params: GetRecentLocationParams,
  options?: SecondParameter<typeof getInstance>,
) => {
  return getInstance<GetRecentLocation200>(
    {
      url: `/location/getRecentLocation`,
      method: "get",
      params,
      headers: {
        AccessToken: local.localAuthState.accessToken,
        RefreshToken: local.localAuthState.refreshToken,
      },
    },
    options,
  );
};

/**
 * 최근 검색한 주소삭제
 * @summary 최근검색 주소삭제
 */
export const getRecentDeleteLocation = (
  params: GetRecentDeleteLocationParams,
  options?: SecondParameter<typeof getInstance>,
) => {
  return getInstance<void>(
    {
      url: `/location/getRecentDeleteLocation`,
      method: "get",
      params,
      headers: {
        AccessToken: local.localAuthState.accessToken,
        RefreshToken: local.localAuthState.refreshToken,
      },
    },
    options,
  );
};

/**
 * 주소를 입력하여 해당 주소의 법정동코드를 조회 (읍면동까지만 표시) 임시로 500개의 주소를 읍면동으로 그룹화 하기 때문에 그 이상의 결과는 제외한다.
 * @summary 주소 조회
 */
export const getLocation = (
  params: GetLocationParams,
  options?: SecondParameter<typeof getInstance>,
) => {
  return getInstance<GetLocation200>(
    {
      url: `/location/getLocation`,
      method: "get",
      params,
      headers: {
        AccessToken: local.localAuthState.accessToken,
        RefreshToken: local.localAuthState.refreshToken,
      },
    },
    options,
  );
};

/**
 * 알람지역별날씨 조회
 * @summary 알람지역별날씨 조회
 */
export const getAlarmLocationWeather = (
  params: GetAlarmLocationWeatherParams,
  options?: SecondParameter<typeof getInstance>,
) => {
  return getInstance<GetAlarmLocationWeather200>(
    {
      url: `/alarm/getAlarmLocationWeather`,
      method: "get",
      params,
      headers: {
        AccessToken: local.localAuthState.accessToken,
        RefreshToken: local.localAuthState.refreshToken,
      },
    },
    options,
  );
};

/**
 * 알람지역별날씨 상세보기
 * @summary 알람지역별날씨 상세보기
 */
export const getAlarmLocationWeatherDetail = (
  params: GetAlarmLocationWeatherDetailParams,
  options?: SecondParameter<typeof getInstance>,
) => {
  return getInstance<GetAlarmLocationWeatherDetail200>(
    {
      url: `/alarm/getAlarmLocationWeatherDetail`,
      method: "get",
      params,
      headers: {
        AccessToken: local.localAuthState.accessToken,
        RefreshToken: local.localAuthState.refreshToken,
      },
    },
    options,
  );
};

/**
 * 알람지역시간목록 조회
 * @summary 알람지역시간목록 조회
 */
export const getAlarmLocationTimeList = (
  params: GetAlarmLocationTimeListParams,
  options?: SecondParameter<typeof getInstance>,
) => {
  return getInstance<GetAlarmLocationTimeList200>(
    {
      url: `/alarm/getAlarmLocationTimeList`,
      method: "get",
      params,
      headers: {
        AccessToken: local.localAuthState.accessToken,
        RefreshToken: local.localAuthState.refreshToken,
      },
    },
    options,
  );
};

/**
 * 알람리스트 조회
 * @summary 알람리스트 조회
 */
export const getAlarmList = (
  params: GetAlarmListParams,
  options?: SecondParameter<typeof getInstance>,
) => {
  return getInstance<GetAlarmList200>(
    {
      url: `/alarm/getAlarmList`,
      method: "get",
      params,
      headers: {
        AccessToken: local.localAuthState.accessToken,
        RefreshToken: local.localAuthState.refreshToken,
      },
    },
    options,
  );
};

/**
 * 알람 조회
 * @summary 알람 조회
 */
export const getAlarmDetail = (
  params: GetAlarmDetailParams,
  options?: SecondParameter<typeof getInstance>,
) => {
  return getInstance<GetAlarmDetail200>(
    {
      url: `/alarm/getAlarmDetail`,
      method: "get",
      params,
      headers: {
        AccessToken: local.localAuthState.accessToken,
        RefreshToken: local.localAuthState.refreshToken,
      },
    },
    options,
  );
};

/**
 * 알림권한조회
 * @summary 알림권한조회
 */
export const alarmAuthorityInsert = (
  params: AlarmAuthorityInsertParams,
  options?: SecondParameter<typeof getInstance>,
) => {
  return getInstance<AlarmAuthorityInsert200>(
    {
      url: `/AuthorityInfo/alarmAuthoritySelect`,
      method: "get",
      params,
      headers: {
        AccessToken: local.localAuthState.accessToken,
        RefreshToken: local.localAuthState.refreshToken,
      },
    },
    options,
  );
};

/**
 * 알림권한등록
 * @summary 알림권한등록
 */
export const alarmAuthorityInsert1 = (
  params: AlarmAuthorityInsert1Params,
  options?: SecondParameter<typeof getInstance>,
) => {
  return getInstance<AlarmAuthorityInsert1200>(
    {
      url: `/AuthorityInfo/alarmAuthorityInsert`,
      method: "get",
      params,
      headers: {
        AccessToken: local.localAuthState.accessToken,
        RefreshToken: local.localAuthState.refreshToken,
      },
    },
    options,
  );
};

/**
 * 알람삭제
 * @summary 알람삭제
 */
export const deleteAlarm = (
  alarmDeleteRequest: BodyType<AlarmDeleteRequest>,
  options?: SecondParameter<typeof getInstance>,
) => {
  return getInstance<DeleteAlarm200>(
    {
      url: `/alarm/deleteAlarm`,
      method: "delete",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        AccessToken: local.localAuthState.accessToken,
        RefreshToken: local.localAuthState.refreshToken,
      },
      data: alarmDeleteRequest,
    },
    options,
  );
};

export type UpdateUserNameResult = NonNullable<
  Awaited<ReturnType<typeof updateUserName>>
>;
export type UpdateAlarmResult = NonNullable<
  Awaited<ReturnType<typeof updateAlarm>>
>;
export type UpdateAlarmEnabledResult = NonNullable<
  Awaited<ReturnType<typeof updateAlarmEnabled>>
>;
export type InsertAlarmResult = NonNullable<
  Awaited<ReturnType<typeof insertAlarm>>
>;
export type RefreshLocationForWeatherResult = NonNullable<
  Awaited<ReturnType<typeof refreshLocationForWeather>>
>;
export type GetLocationForWeatherResult = NonNullable<
  Awaited<ReturnType<typeof getLocationForWeather>>
>;
export type LogoutResult = NonNullable<Awaited<ReturnType<typeof logout>>>;
export type LoginResult = NonNullable<Awaited<ReturnType<typeof login>>>;
export type LoginAndUserTransformResult = NonNullable<
  Awaited<ReturnType<typeof loginAndUserTransform>>
>;
export type GetUserDetailResult = NonNullable<
  Awaited<ReturnType<typeof getUserDetail>>
>;
export type GetTermsOfUseResult = NonNullable<
  Awaited<ReturnType<typeof getTermsOfUse>>
>;

export type GetPrivacyPolicyResult = NonNullable<
  Awaited<ReturnType<typeof getPrivacyPolicy>>
>;
export type MemberDeleteResult = NonNullable<
  Awaited<ReturnType<typeof memberDelete>>
>;
export type GetRecentSelectLocationResult = NonNullable<
  Awaited<ReturnType<typeof getRecentSelectLocation>>
>;
export type GetRecentLocationResult = NonNullable<
  Awaited<ReturnType<typeof getRecentLocation>>
>;
export type GetRecentDeleteLocationResult = NonNullable<
  Awaited<ReturnType<typeof getRecentDeleteLocation>>
>;
export type GetLocationResult = NonNullable<
  Awaited<ReturnType<typeof getLocation>>
>;
export type GetAlarmLocationWeatherResult = NonNullable<
  Awaited<ReturnType<typeof getAlarmLocationWeather>>
>;
export type GetAlarmLocationWeatherDetailResult = NonNullable<
  Awaited<ReturnType<typeof getAlarmLocationWeatherDetail>>
>;
export type GetAlarmLocationTimeListResult = NonNullable<
  Awaited<ReturnType<typeof getAlarmLocationTimeList>>
>;
export type GetAlarmListResult = NonNullable<
  Awaited<ReturnType<typeof getAlarmList>>
>;
export type GetAlarmDetailResult = NonNullable<
  Awaited<ReturnType<typeof getAlarmDetail>>
>;
export type AlarmAuthorityInsertResult = NonNullable<
  Awaited<ReturnType<typeof alarmAuthorityInsert>>
>;
export type AlarmAuthorityInsert1Result = NonNullable<
  Awaited<ReturnType<typeof alarmAuthorityInsert1>>
>;
export type DeleteAlarmResult = NonNullable<
  Awaited<ReturnType<typeof deleteAlarm>>
>;
