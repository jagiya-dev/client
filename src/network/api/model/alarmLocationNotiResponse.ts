/**
 * Generated by orval v6.18.1 🍺
 * Do not edit manually.
 * Springdoc
 * Springdoc을 사용한 Swagger UI
 * OpenAPI spec version: 1.0.0
 */

export interface AlarmLocationNotiResponse {
  /** 시도 */
  cityDo?: string;
  /** 구군 */
  guGun?: string;
  /** 읍면동 */
  eupMyun?: string;
  /** 지역외 개수 */
  locationCnt?: number;
  /** AM, PM, ALL */
  timeOfDay?: string;
  /** 다시울림분 */
  reminder?: string;
}