/**
 * Generated by orval v6.18.1 🍺
 * Do not edit manually.
 * Springdoc
 * Springdoc을 사용한 Swagger UI
 * OpenAPI spec version: 1.0.0
 */

/**
 * 알람지역날씨목록
 */
export interface AlarmLocationWeatherDataResponse {
  /** 비오는여부 */
  rain?: boolean;
  /** AM, PM */
  timeOfDay?: string;
  /** 지역설정시간 */
  locationTime?: string;
}