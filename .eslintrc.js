// https://docs.expo.dev/guides/using-eslint/（Expo ESLint 指南）
module.exports = {
  root: true,
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-native/all",
    // `expo` 须在 standard 之后，否则全局配置会被覆盖
    "expo",
    // `jsx-runtime` 须在 expo 之后
    "plugin:react/jsx-runtime",
    "prettier",
  ],
  plugins: ["reactotron", "prettier"],
  rules: {
    "prettier/prettier": "error",
    // @typescript-eslint 规则
    "@typescript-eslint/array-type": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-require-imports": 0,
    "@typescript-eslint/no-empty-object-type": 0,
    // ESLint 核心
    "no-use-before-define": 0,
    "no-restricted-imports": [
      "error",
      {
        paths: [
          // 优先使用 react 的具名导出，不要默认导入 `React`
          {
            name: "react",
            importNames: ["default"],
            message: "Import named exports from 'react' instead.",
          },
          {
            name: "react-native",
            importNames: ["SafeAreaView"],
            message: "Use the SafeAreaView from 'react-native-safe-area-context' instead.",
          },
          {
            name: "react-native",
            importNames: ["Text", "Button", "TextInput"],
            message: "Use the custom wrapper component from '@/components'.",
          },
        ],
      },
    ],
    // React 规则
    "react/prop-types": 0,
    // React Native
    "react-native/no-raw-text": 0,
    // Reactotron
    "reactotron/no-tron-in-production": "error",
    // eslint-config-standard 覆盖
    "comma-dangle": 0,
    "no-global-assign": 0,
    "quotes": 0,
    "space-before-function-paren": 0,
    // eslint-plugin-import
    "import/order": [
      "error",
      {
        "alphabetize": {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always",
        "groups": [["builtin", "external"], "internal", "unknown", ["parent", "sibling"], "index"],
        "distinctGroup": false,
        "pathGroups": [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
          {
            pattern: "react-native",
            group: "external",
            position: "before",
          },
          {
            pattern: "expo{,-*}",
            group: "external",
            position: "before",
          },
          {
            pattern: "@/**",
            group: "unknown",
            position: "after",
          },
        ],
        "pathGroupsExcludedImportTypes": ["react", "react-native", "expo", "expo-*"],
      },
    ],
    "import/newline-after-import": 1,
  },
}
