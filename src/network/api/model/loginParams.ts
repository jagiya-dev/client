/**
 * Generated by orval v6.18.1 🍺
 * Do not edit manually.
 * Springdoc
 * Springdoc을 사용한 Swagger UI
 * OpenAPI spec version: 1.0.0
 */

export type LoginParams = {
  /**
   * 소셜 계정 ID (비회원은 디바이스 ID)
   */
  snsId: string;
  /**
   * 이름
   */
  name: string;
  /**
   * 이메일 (선택 동의했을 경우)
   */
  email?: string;
  /**
   * 소셜 타입(0 비회원, 1 카카오, 2 애플)
   */
  snsType: string;
};
