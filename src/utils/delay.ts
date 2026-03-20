/**
 * Promise 版 `sleep`。
 *
 * @param ms 等待毫秒数
 */
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
