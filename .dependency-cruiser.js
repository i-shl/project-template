const metroConfig = require("./metro.config.js")

const platforms = ["ios", "android", "web", "native"]
const extensions = metroConfig?.resolver?.sourceExts.flatMap((pExt) =>
  platforms.map((platform) => `.${platform}.${pExt}`).concat(`.${pExt}`),
)

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "no-circular",
      severity: "warn",
      comment:
        "该依赖处于循环引用中。可考虑依赖倒置、拆分职责等方式重构。",
      from: {},
      to: {
        circular: true,
      },
    },
    {
      name: "no-orphans",
      comment:
        "疑似孤立模块（未被引用）。请使用或删除。若为配置文件等「理应孤立」的模块，" +
        "在 dependency-cruiser 配置中加例外。默认不检查点文件、.d.ts、tsconfig 及部分 babel/webpack 配置。",
      severity: "warn",
      from: {
        orphan: true,
        pathNot: [
          "(^|/)\\.[^/]+\\.(js|cjs|mjs|ts|json)$",
          "\\.d\\.ts$",
          "(^|/)tsconfig\\.json$",
          "(^|/)(babel|webpack)\\.config\\.(js|cjs|mjs|ts|json)$",
          "crashReporting\\.ts$", // 崩溃上报占位，后续接入
          "utils/delay\\.ts$", // 延迟工具，可能被脚本/测试引用
        ],
      },
      to: {},
    },
    {
      name: "no-deprecated-core",
      comment:
        "依赖了已弃用的 Node 内置模块，请改用替代方案。",
      severity: "warn",
      from: {},
      to: {
        dependencyTypes: ["core"],
        path: ["^(punycode)$", "^(domain)$", "^(constants)$", "^(sys)$"],
      },
    },
    {
      name: "not-to-deprecated",
      comment:
        "依赖了标记为 deprecated 的 npm 包版本，请升级或替换，以降低安全风险。",
      severity: "warn",
      from: {},
      to: {
        dependencyTypes: ["deprecated"],
      },
    },
    {
      name: "no-non-package-json",
      severity: "error",
      comment:
        "依赖了未写入 package.json `dependencies` 的包，线上可能无法安装或版本不确定。请补充依赖声明。",
      from: {},
      to: {
        dependencyTypes: ["npm-no-pkg", "npm-unknown"],
      },
    },
    {
      name: "not-to-unresolvable",
      comment:
        "依赖无法解析到磁盘路径。若是 npm 包请加入 package.json；其他情况请检查路径别名等。",
      severity: "error",
      from: {},
      to: {
        couldNotResolve: true,
      },
    },
    {
      name: "no-duplicate-dep-types",
      comment:
        "同一 npm 包可能同时出现在 dependencies 与 devDependencies 中，后续维护易出问题。",
      severity: "warn",
      from: {},
      to: {
        moreThanOneDependencyType: true,
        dependencyTypesNot: ["type-only"],
      },
    },
    {
      name: "not-to-spec",
      comment:
        "生产代码不应依赖测试文件。若测试中有可复用逻辑，请抽到 util 或 mock 模块。",
      severity: "error",
      from: {
        pathNot: "\\.(spec|test)\\.(js|mjs|cjs|ts|tsx)$",
      },
      to: {
        path: "\\.(spec|test)\\.(js|mjs|cjs|ts|tsx)$",
      },
    },
    {
      name: "not-to-dev-dep",
      severity: "error",
      comment:
        "应用代码依赖了仅存在于 devDependencies 的包，生产环境可能缺失。请移到 dependencies，" +
        "或确认为纯开发用途并在 not-to-dev-dep 规则中排除。",
      from: {
        path: "^(app|src)",
        pathNot: "\\.(spec|test)\\.(js|mjs|cjs|ts|tsx)$",
      },
      to: {
        dependencyTypes: ["npm-dev"],
        pathNot: ["node_modules/@types/"],
        exoticRequireNot: [
          "react-native/Libraries/Utilities/codegenNativeComponent",
          "react-native/Libraries/Utilities/codegenNativeCommands",
        ],
      },
    },
    {
      name: "optional-deps-used",
      severity: "info",
      comment:
        "依赖了 package.json 中的 optionalDependency，仅在少数场景合理；若为有意使用请在配置中加例外。",
      from: {},
      to: {
        dependencyTypes: ["npm-optional"],
      },
    },
    {
      name: "peer-deps-used",
      comment:
        "依赖了 peerDependency，常见于插件场景；若并非插件式用法，请检查是否合理，必要时加例外。",
      severity: "warn",
      from: {},
      to: {
        dependencyTypes: ["npm-peer"],
      },
    },
  ],
  options: {
    doNotFollow: {
      path: "node_modules",
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: "tsconfig.json",
    },
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default"],
      // React Native / Metro 平台后缀解析
      // https://reactnative.dev/docs/platform-specific-code
      // https://github.com/sverweij/dependency-cruiser/issues/511
      extensions,
    },
    reporterOptions: {
      dot: {
        collapsePattern: "node_modules/(@[^/]+/[^/]+|[^/]+)",
      },
      archi: {
        collapsePattern: "^(app|src|test)/[^/]+",
      },
      text: {
        highlightFocused: true,
      },
    },
  },
}
