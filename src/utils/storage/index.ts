import { MMKV } from "react-native-mmkv"

export const storage = new MMKV()

/**
 * 读取字符串。
 *
 * @param key 键名
 */
export function loadString(key: string): string | null {
  try {
    return storage.getString(key) ?? null
  } catch {
    // 理论上不应失败，失败时返回 null
    return null
  }
}

/**
 * 写入字符串。
 *
 * @param key 键名
 * @param value 值
 */
export function saveString(key: string, value: string): boolean {
  try {
    storage.set(key, value)
    return true
  } catch {
    return false
  }
}

/**
 * 读取并 `JSON.parse` 为对象。
 *
 * @param key 键名
 */
export function load<T>(key: string): T | null {
  let almostThere: string | null = null
  try {
    almostThere = loadString(key)
    return JSON.parse(almostThere ?? "") as T
  } catch {
    return (almostThere as T) ?? null
  }
}

/**
 * 将对象 `JSON.stringify` 后写入。
 *
 * @param key 键名
 * @param value 值
 */
export function save(key: string, value: unknown): boolean {
  try {
    saveString(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

/**
 * 删除指定键。
 *
 * @param key 键名
 */
export function remove(key: string): void {
  try {
    storage.delete(key)
  } catch {}
}

/**
 * 清空全部存储。
 */
export function clear(): void {
  try {
    storage.clearAll()
  } catch {}
}
