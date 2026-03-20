/**
 * 根据是否为 __DEV__，合并 config.dev 或 config.prod 中的配置。
 *
 * 注意：这些文件通常不应指望靠「不提交到仓库」来保密。与后端不同，客户端会打包进 JS，
 * 配置会以明文出现在包内，安装应用的人都能提取。
 *
 * 若存疑：打包后在 bundle 里搜索某个配置值即可验证。
 *
 * 详见：https://reactnative.dev/docs/security#storing-sensitive-info
 */
import BaseConfig from "./config.base"
import DevConfig from "./config.dev"
import ProdConfig from "./config.prod"

let ExtraConfig = ProdConfig

if (__DEV__) {
  ExtraConfig = DevConfig
}

const Config = { ...BaseConfig, ...ExtraConfig }

export default Config
