/**
 * 使用 Sentry 时参考：
 *   Expo https://docs.expo.dev/guides/using-sentry/
 */
// import * as Sentry from "@sentry/react-native"

/**
 * 使用 Crashlytics：https://rnfirebase.io/crashlytics/usage
 */
// import crashlytics from "@react-native-firebase/crashlytics"

/**
 * 使用 Bugsnag：
 *   RN   https://docs.bugsnag.com/platforms/react-native/)
 *   Expo https://docs.bugsnag.com/platforms/react-native/expo/
 */
// import Bugsnag from "@bugsnag/react-native"
// import Bugsnag from "@bugsnag/expo"

/**
 * 在此初始化崩溃上报，并在应用入口（如 `./app/app.tsx`）调用。
 */
export const initCrashReporting = () => {
  // Sentry.init({
  //   dsn: "YOUR DSN HERE",
  //   // debug 为 true 时，发送失败会输出调试信息；生产环境请设为 false
  //   debug: true,
  // })
  // Bugsnag.start("YOUR API KEY")
}

/**
 * 错误分类，便于在第三方平台中筛选。
 */
export enum ErrorType {
  /**
   * 开发环境通常红屏、生产环境可能需用户重启的严重错误。
   */
  FATAL = "Fatal",
  /**
   * 在 try/catch 中捕获并通过 Reactotron 等记录的错误。
   */
  HANDLED = "Handled",
}

/**
 * 手动上报已处理的错误。
 */
export const reportCrash = (error: Error, type: ErrorType = ErrorType.FATAL) => {
  if (__DEV__) {
    // 开发环境：输出到控制台与 Reactotron
    const message = error.message || "Unknown"
    console.error(error)
    console.log(message, type)
  } else {
    // 生产环境：接入任选一种服务，例如：
    // Sentry.captureException(error)
    // crashlytics().recordError(error)
    // Bugsnag.notify(error)
  }
}
