/**
 * Generated by orval v6.18.1 🍺
 * Do not edit manually.
 * Springdoc
 * Springdoc을 사용한 Swagger UI
 * OpenAPI spec version: 1.0.0
 */
import type { AlarmLocationWeatherDataResponse } from "./alarmLocationWeatherDataResponse";

export interface AlarmLocationWeatherDetailResponse {
  /** 시도 */
  cityDo?: string;
  /** 구군 */
  guGun?: string;
  /** 읍면동 */
  eupMyun?: string;
  /** 법정동코드 */
  regionCd?: string;
  /** AM, PM, ALL */
  timeOfDay?: string;
  /** 비가오는지역여부 */
  locationRain?: boolean;
  /** 알람지역날씨목록 */
  alarmLocationWeatherList?: AlarmLocationWeatherDataResponse[];
}
