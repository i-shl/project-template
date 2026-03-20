import type { Theme } from "./types"

const systemui = require("expo-system-ui")

/**
 * 设置系统 UI 背景色（需已安装 expo-system-ui）。
 *
 * @param color 目标颜色
 */
export const setSystemUIBackgroundColor = (color: string) => {
  if (systemui) {
    systemui.setBackgroundColorAsync(color)
  }
}

/**
 * 根据主题设置原生根背景色（需已安装 expo-system-ui）。
 *
 * @param theme 主题对象
 */
export const setImperativeTheming = (theme: Theme) => {
  setSystemUIBackgroundColor(theme.colors.background)
}
