export interface ConfigBaseProps {
  persistNavigation: "always" | "dev" | "prod" | "never"
  catchErrors: "always" | "dev" | "prod" | "never"
  exitRoutes: string[]
}

export type PersistNavigationConfig = ConfigBaseProps["persistNavigation"]

const BaseConfig: ConfigBaseProps = {
  // 该选项在开发模式特别有用，若需要也可用于生产。
  persistNavigation: "dev",

  /**
   * 仅在合适的环境下启用错误捕获
   */
  catchErrors: "always",

  /**
   * 在这些路由名对应的界面按返回键时将退出应用（仅影响 Android）。
   */
  exitRoutes: ["Welcome"],
}

export default BaseConfig
