import { useEffect, useLayoutEffect } from "react"
import { Platform } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { Header, HeaderProps } from "@/components/Header"

/**
 * 在页面组件内设置 React Navigation 的 `Header`。
 * @see {@link https://docs.infinite.red/ignite-cli/boilerplate/app/utils/useHeader.tsx/}
 * @param headerProps 传给 `Header` 的 props
 * @param deps 依赖变化时重新设置顶栏
 */
export function useHeader(
  headerProps: HeaderProps,
  deps: Parameters<typeof useLayoutEffect>[1] = [],
) {
  const navigation = useNavigation()

  /**
   * Web 使用 `useEffect` 避免渲染循环；
   * 原生使用 `useLayoutEffect`，在绘制前应用配置，减少切页时顶栏跳动。
   */
  const usePlatformEffect = Platform.OS === "web" ? useEffect : useLayoutEffect

  usePlatformEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header {...headerProps} />,
    })
    // 由调用方通过 deps 决定何时刷新顶栏
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, navigation])
}
