import { Linking } from "react-native"

/**
 * 使用系统浏览器打开 URL。
 */
export function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url))
}
