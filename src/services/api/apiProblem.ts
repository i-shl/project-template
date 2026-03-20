import { ApiResponse } from "apisauce"

export type GeneralApiProblem =
  /**
   * 请求超时。
   */
  | { kind: "timeout"; temporary: true }
  /**
   * 因故无法连接服务器。
   */
  | { kind: "cannot-connect"; temporary: true }
  /**
   * 服务端错误（任意 5xx）。
   */
  | { kind: "server" }
  /**
   * 未通过身份验证（401）。
   */
  | { kind: "unauthorized" }
  /**
   * 无权执行该请求（403）。
   */
  | { kind: "forbidden" }
  /**
   * 资源不存在（404）。
   */
  | { kind: "not-found" }
  /**
   * 其余 4xx 错误。
   */
  | { kind: "rejected" }
  /**
   * 未知异常，通常可重试；兜底类型。
   */
  | { kind: "unknown"; temporary: true }
  /**
   * 返回数据格式不符合预期。
   */
  | { kind: "bad-data" }

/**
 * 根据 API 响应归纳常见问题原因。
 *
 * @param response API 响应对象。
 */
export function getGeneralApiProblem(response: ApiResponse<any>): GeneralApiProblem | null {
  switch (response.problem) {
    case "CONNECTION_ERROR":
      return { kind: "cannot-connect", temporary: true }
    case "NETWORK_ERROR":
      return { kind: "cannot-connect", temporary: true }
    case "TIMEOUT_ERROR":
      return { kind: "timeout", temporary: true }
    case "SERVER_ERROR":
      return { kind: "server" }
    case "UNKNOWN_ERROR":
      return { kind: "unknown", temporary: true }
    case "CLIENT_ERROR":
      switch (response.status) {
        case 401:
          return { kind: "unauthorized" }
        case 403:
          return { kind: "forbidden" }
        case 404:
          return { kind: "not-found" }
        default:
          return { kind: "rejected" }
      }
    case "CANCEL_ERROR":
      return null
  }

  return null
}
