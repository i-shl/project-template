import { ExpoConfig, ConfigContext } from "@expo/config"

/**
 * 此处使用 tsx/cjs，以便用 TypeScript 编写 Config Plugin，无需先编译为 JavaScript。
 *
 * 见 https://docs.expo.dev/config-plugins/plugins/#add-typescript-support-and-convert-to-dynamic-app-config
 */
import "tsx/cjs"

/**
 * @param config 若存在静态 app.json，则由此传入 ExpoConfig
 *
 * Expo 配置解析规则见：
 * https://docs.expo.dev/workflow/configuration/#configuration-resolution-rules
 */
module.exports = ({ config }: ConfigContext): Partial<ExpoConfig> => {
  const existingPlugins = config.plugins ?? []

  return {
    ...config,
    ios: {
      ...config.ios,
      // 以下为隐私清单（Privacy Manifests）起步配置。
      // Apple 隐私清单指南：https://docs.expo.dev/guides/apple-privacy/
      // 按应用实际使用的 API 可能需要补充更多声明。
      // 「必选原因」API 列表见 Apple 开发者文档：
      // https://developer.apple.com/documentation/bundleresources/privacy-manifest-files
      privacyManifests: {
        NSPrivacyAccessedAPITypes: [
          {
            NSPrivacyAccessedAPIType: "NSPrivacyAccessedAPICategoryUserDefaults",
            // CA92.1 = 按文档说明，访问同一应用内的信息
            NSPrivacyAccessedAPITypeReasons: ["CA92.1"],
          },
        ],
      },
    },
    plugins: [...existingPlugins],
  }
}
