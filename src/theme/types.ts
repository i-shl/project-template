import type { StyleProp } from "react-native"

import { colors as colorsLight } from "./colors"
import { colors as colorsDark } from "./colorsDark"
import { spacing as spacingLight } from "./spacing"
import { spacing as spacingDark } from "./spacingDark"
import { timing } from "./timing"
import { typography } from "./typography"

// 默认可为 "light" / "dark"；undefined 表示跟随系统
export type ImmutableThemeContextModeT = "light" | "dark"
export type ThemeContextModeT = ImmutableThemeContextModeT | undefined

// 两套主题的键应对齐，取值可不同
export type Colors = typeof colorsLight | typeof colorsDark
// 间距在明暗主题下可能有不同取值
export type Spacing = typeof spacingLight | typeof spacingDark

// 以下两项在各主题间一致
export type Timing = typeof timing
export type Typography = typeof typography

// Theme 聚合样式所需的全部令牌
export interface Theme {
  colors: Colors
  spacing: Spacing
  typography: Typography
  timing: Timing
  isDark: boolean
}

/**
 * 根据主题返回样式的函数。
 * @template T 样式类型
 * @param theme 主题对象
 *
 * @example
 * const $container: ThemedStyle<ViewStyle> = (theme) => ({
 *   flex: 1,
 *   backgroundColor: theme.colors.background,
 *   justifyContent: "center",
 *   alignItems: "center",
 * })
 * // 在组件中：
 * const Component = () => {
 *   const { themed } = useAppTheme()
 *   return <View style={themed($container)} />
 * }
 */
export type ThemedStyle<T> = (theme: Theme) => T
export type ThemedStyleArray<T> = (
  | ThemedStyle<T>
  | StyleProp<T>
  | (StyleProp<T> | ThemedStyle<T>)[]
)[]

/** 允许的样式入参类型 */
export type AllowedStylesT<T> = ThemedStyle<T> | StyleProp<T> | ThemedStyleArray<T>
/** `themed()` 函数类型 */
export type ThemedFnT = <T>(styleOrStyleFn: AllowedStylesT<T>) => T
