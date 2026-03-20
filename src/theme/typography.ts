// TODO：补充字体与排版说明文档，以及自定义字体步骤，并在此处添加链接

import { Platform } from "react-native"
import {
  SpaceGrotesk_300Light as spaceGroteskLight,
  SpaceGrotesk_400Regular as spaceGroteskRegular,
  SpaceGrotesk_500Medium as spaceGroteskMedium,
  SpaceGrotesk_600SemiBold as spaceGroteskSemiBold,
  SpaceGrotesk_700Bold as spaceGroteskBold,
} from "@expo-google-fonts/space-grotesk"

export const customFontsToLoad = {
  spaceGroteskLight,
  spaceGroteskRegular,
  spaceGroteskMedium,
  spaceGroteskSemiBold,
  spaceGroteskBold,
}

const fonts = {
  spaceGrotesk: {
    // 跨平台 Google 字体
    light: "spaceGroteskLight",
    normal: "spaceGroteskRegular",
    medium: "spaceGroteskMedium",
    semiBold: "spaceGroteskSemiBold",
    bold: "spaceGroteskBold",
  },
  helveticaNeue: {
    // 仅 iOS
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // 仅 iOS
    normal: "Courier",
  },
  sansSerif: {
    // 仅 Android
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // 仅 Android
    normal: "monospace",
  },
}

export const typography = {
  /**
   * 原始字体表；优先使用下方语义化别名。
   */
  fonts,
  /**
   * 主字体，大多数场景使用。
   */
  primary: fonts.spaceGrotesk,
  /**
   * 备用字体，常用于标题等。
   */
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * 等宽字体。
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
