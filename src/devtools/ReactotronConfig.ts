/**
 * 本文件完成与 Reactotron 的集成配置。Reactotron 是一款用于检查、调试 React Native 应用的免费桌面端工具。
 * @see https://github.com/infinitered/reactotron
 */
import { Platform, NativeModules } from "react-native"
import { router } from "expo-router"
import { ArgType } from "reactotron-core-client"
import { ReactotronReactNative } from "reactotron-react-native"
import mmkvPlugin from "reactotron-react-native-mmkv"

import { storage } from "@/utils/storage"

import { Reactotron } from "./ReactotronClient"

const reactotron = Reactotron.configure({
  name: require("../../package.json").name,
  onConnect: () => {
    /** 此文件会热重载，每次连接时清空历史日志 */
    Reactotron.clear()
  },
})

reactotron.use(mmkvPlugin<ReactotronReactNative>({ storage }))

if (Platform.OS !== "web") {
  reactotron.useReactNative({
    networking: {
      ignoreUrls: /symbolicate/,
    },
  })
}

/**
 * Reactotron 支持自定义命令：在 Reactotron 桌面端触发，在应用内执行。
 *
 * 在下方通过 `onCustomCommand` 定义。开发时可用它快速把应用切到所需状态。
 *
 * 注意：若运行应用时编辑本文件，需完全刷新应用，否则自定义命令可能注册不正确。
 */
reactotron.onCustomCommand({
  title: "Show Dev Menu",
  description: "Opens the React Native dev menu",
  command: "showDevMenu",
  handler: () => {
    Reactotron.log("Showing React Native dev menu")
    NativeModules.DevMenu.show()
  },
})

reactotron.onCustomCommand<[{ name: "route"; type: ArgType.String }]>({
  command: "navigateTo",
  handler: (args) => {
    const { route } = args ?? {}
    if (route) {
      Reactotron.log(`Navigating to: ${route}`)
      // @ts-ignore
      router.push(route)
    } else {
      Reactotron.log("Could not navigate. No route provided.")
    }
  },
  title: "Navigate To Screen",
  description: "Navigates to a screen by name.",
  args: [{ name: "route", type: ArgType.String }],
})

reactotron.onCustomCommand({
  title: "Go Back",
  description: "Goes back",
  command: "goBack",
  handler: () => {
    Reactotron.log("Going back")
    router.back()
  },
})

/**
 * 将 `console.tron` 挂到 Reactotron 对象上。
 * 开发环境下可在应用任意处这样使用：
 *
 * ```
 * if (__DEV__) {
 *  console.tron.display({
 *    name: 'JOKE',
 *    preview: 'What's the best thing about Switzerland?',
 *    value: 'I don't know, but the flag is a big plus!',
 *    important: true
 *  })
 * }
 * ```
 *
 * 请合理使用 :)
 */
console.tron = reactotron

/**
 * 向 TypeScript 声明上述扩展
 *
 * 也可从 ./ReactotronClient 自行 import Reactotron，直接调用如 Reactotron.log('hello world')
 */
declare global {
  interface Console {
    /**
     * Reactotron 客户端：日志、展示、性能测量等。
     * @see https://github.com/infinitered/reactotron
     * @example
     * if (__DEV__) {
     *  console.tron.display({
     *    name: 'JOKE',
     *    preview: 'What's the best thing about Switzerland?',
     *    value: 'I don't know, but the flag is a big plus!',
     *    important: true
     *  })
     * }
     */
    tron: typeof reactotron
  }
}

/**
 * Reactotron 配置完成后连接
 */
reactotron.connect()
