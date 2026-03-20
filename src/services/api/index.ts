/**
 * Api 类用于定义 API 端点及请求、处理数据的封装方法。
 *
 * 详见 [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/#backend-api-integration)。
 */
import { ApisauceInstance, create } from "apisauce"

import Config from "@/config"

import type { ApiConfig } from "./types"

/**
 * apisauce 实例的默认配置。
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * 统一管理对后端 API 的请求；可在此类上扩展各类接口方法。
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * 构造 API 实例，保持构造函数轻量。
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }
}

// 便于使用的 API 单例
export const api = new Api()
