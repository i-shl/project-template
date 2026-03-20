/**
 * 描述从 API 端点期望收到的数据结构（假设为 JSON 对象）。
 */
export interface EpisodeItem {
  title: string
  pubDate: string
  link: string
  guid: string
  author: string
  thumbnail: string
  description: string
  content: string
  enclosure: {
    link: string
    type: string
    length: number
    duration: number
    rating: { scheme: string; value: string }
  }
  categories: string[]
}

export interface ApiFeedResponse {
  status: string
  feed: {
    url: string
    title: string
    link: string
    author: string
    description: string
    image: string
  }
  items: EpisodeItem[]
}

/**
 * 配置 apisauce 的选项。
 */
export interface ApiConfig {
  /**
   * API 根地址。
   */
  url: string

  /**
   * 请求超时时间（毫秒）。
   */
  timeout: number
}
