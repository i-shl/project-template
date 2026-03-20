import i18n from "i18next"
import type { TOptions } from "i18next"

import { TxKeyPath } from "."

/**
 * 翻译文案。
 * @param key i18n 键
 * @param options i18n 插值等选项
 * @returns 翻译后的字符串
 * @example
 * 文案定义示例：
 *
 * ```en.ts
 * {
 *  "hello": "Hello, {{name}}!"
 * }
 * ```
 *
 * 使用：
 * ```ts
 * import { translate } from "./i18n"
 *
 * translate("hello", { name: "world" })
 * // => "Hello world!"
 * ```
 */
export function translate(key: TxKeyPath, options?: TOptions): string {
  if (i18n.isInitialized) {
    return i18n.t(key, options)
  }
  return key
}
