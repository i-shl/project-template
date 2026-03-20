/* eslint-env node */
// 自定义 Metro：https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config")

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

config.transformer.getTransformOptions = async () => ({
  transform: {
    // inlineRequires：推迟加载大依赖/组件（例如在 app 中按需加载 Reactotron）。
    // 注意有边界情况，见：
    // https://reactnative.dev/docs/optimizing-javascript-loading
    // https://github.com/expo/expo/issues/27279#issuecomment-1971610698
    inlineRequires: true,
  },
})

// axios/apisauce 与 Metro 条件导出的临时修复，见：
// https://github.com/infinitered/apisauce/issues/331
// https://github.com/axios/axios/issues/6899
// https://github.com/facebook/metro/issues/1272
config.resolver.unstable_conditionNames = ["require", "default", "browser"]

// 支持使用 .cjs 扩展的第三方库（如部分 Firebase 包）
config.resolver.sourceExts.push("cjs")

module.exports = config
