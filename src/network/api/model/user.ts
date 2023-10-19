/**
 * Generated by orval v6.18.1 🍺
 * Do not edit manually.
 * Springdoc
 * Springdoc을 사용한 Swagger UI
 * OpenAPI spec version: 1.0.0
 */

/**
 * 유저 정보 VO
 */
export interface User {
  /** 아이디 */
  userId?: number;
  /** 이름 */
  name?: string;
  /** 이메일 */
  email?: string;
  /** 탈퇴여부(0:유지 / 1:탈퇴) */
  deleteFlag?: number;
  /** 탈퇴 날짜 */
  deleteDate?: string;
  /** 약관동의여부(0:미동의 1:동의) */
  agreeFalg?: number;
  /** 약관동의 날짜 */
  agreeDate?: string;
  /** 가입일 */
  regDate?: string;
  /** 수정일 */
  modifyDate?: string;
  /** 관리자 여부 */
  admin?: number;
  /** 소셜 로그인 플랫폼 (비회원, 카카오, 애플) */
  snsType?: number;
  /** 소셜회원 ID */
  snsId?: string;
}
