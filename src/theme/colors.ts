const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#191015",
  neutral900: "#000000",

  primary100: "#F4E0D9",
  primary200: "#E8C1B4",
  primary300: "#DDA28E",
  primary400: "#D28468",
  primary500: "#C76542",
  primary600: "#A54F31",

  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const

export const colors = {
  /**
   * 色板可直接使用，但优先用语义化名称；
   * 仅建议在少数一次性场景直接使用 palette。
   */
  palette,
  /**
   * 全透明占位。
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * 多数组件的默认文字色。
   */
  text: palette.neutral800,
  /**
   * 次要说明文字。
   */
  textDim: palette.neutral600,
  /**
   * 页面默认背景色。
   */
  background: palette.neutral200,
  /**
   * 默认描边色。
   */
  border: palette.neutral400,
  /**
   * 主强调色（Tint）。
   */
  tint: palette.primary500,
  /**
   * 非激活态强调色。
   */
  tintInactive: palette.neutral300,
  /**
   * 分割线等弱对比线条。
   */
  separator: palette.neutral300,
  /**
   * 错误提示文字。
   */
  error: palette.angry500,
  /**
   * 错误背景。
   */
  errorBackground: palette.angry100,
} as const
