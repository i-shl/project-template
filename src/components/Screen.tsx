import { ReactNode, useRef, useState } from "react"
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  LayoutChangeEvent,
  Platform,
  ScrollViewProps,
  StyleProp,
  View,
  ViewStyle,
} from "react-native"
import { useScrollToTop } from "@react-navigation/native"
import { SystemBars, SystemBarsProps, SystemBarStyle } from "react-native-edge-to-edge"
import {
  KeyboardAwareScrollView,
  type KeyboardAwareScrollViewRef,
} from "react-native-keyboard-controller"

import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { ExtendedEdge, useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"

export const DEFAULT_BOTTOM_OFFSET = 50

interface BaseScreenProps {
  /**
   * 子组件。
   */
  children?: ReactNode
  /**
   * 外层内容容器样式，常用于 padding / margin。
   */
  style?: StyleProp<ViewStyle>
  /**
   * 内层内容容器样式，常用于 padding / margin。
   */
  contentContainerStyle?: StyleProp<ViewStyle>
  /**
   * 覆盖安全区默认边。
   */
  safeAreaEdges?: ExtendedEdge[]
  /**
   * 背景色
   */
  backgroundColor?: string
  /**
   * 系统栏样式，默认深色。
   */
  systemBarStyle?: SystemBarStyle
  /**
   * 键盘避让偏移量，默认 0。
   */
  keyboardOffset?: number
  /**
   * 键盘弹出时向上滚动的距离，默认 50。
   */
  keyboardBottomOffset?: number
  /**
   * 透传给 SystemBars 的额外属性。
   */
  SystemBarsProps?: SystemBarsProps
  /**
   * 透传给 KeyboardAvoidingView 的额外属性。
   */
  KeyboardAvoidingViewProps?: KeyboardAvoidingViewProps
}

interface FixedScreenProps extends BaseScreenProps {
  preset?: "fixed"
}
interface ScrollScreenProps extends BaseScreenProps {
  preset?: "scroll"
  /**
   * 点击屏幕时键盘是否保持；默认 handled。仅 scroll 预设有效。
   */
  keyboardShouldPersistTaps?: "handled" | "always" | "never"
  /**
   * 透传给 ScrollView（此处为 KeyboardAwareScrollView）的额外属性。
   */
  ScrollViewProps?: ScrollViewProps
}

interface AutoScreenProps extends Omit<ScrollScreenProps, "preset"> {
  preset?: "auto"
  /**
   * 自动开/关滚动的阈值，默认 `{ percent: 0.92 }`。
   */
  scrollEnabledToggleThreshold?: { percent?: number; point?: number }
}

export type ScreenProps = ScrollScreenProps | FixedScreenProps | AutoScreenProps

const isIos = Platform.OS === "ios"

type ScreenPreset = "fixed" | "scroll" | "auto"

/**
 * @param preset - 要检查的预设类型。
 * @returns 是否为非滚动预设。
 */
function isNonScrolling(preset?: ScreenPreset) {
  return !preset || preset === "fixed"
}

/**
 * 根据内容与屏幕尺寸自动启用/禁用滚动。
 * @param props - `useAutoPreset` 的参数。
 * @returns 是否可滚动，以及 `onContentSizeChange`、`onLayout`。
 */
function useAutoPreset(props: AutoScreenProps): {
  scrollEnabled: boolean
  onContentSizeChange: (w: number, h: number) => void
  onLayout: (e: LayoutChangeEvent) => void
} {
  const { preset, scrollEnabledToggleThreshold } = props
  const { percent = 0.92, point = 0 } = scrollEnabledToggleThreshold || {}

  const scrollViewHeight = useRef<null | number>(null)
  const scrollViewContentHeight = useRef<null | number>(null)
  const [scrollEnabled, setScrollEnabled] = useState(true)

  function updateScrollState() {
    if (scrollViewHeight.current === null || scrollViewContentHeight.current === null) return

    // 判断内容是否一屏放得下，并据此切换滚动状态
    const contentFitsScreen = (function () {
      if (point) {
        return scrollViewContentHeight.current < scrollViewHeight.current - point
      } else {
        return scrollViewContentHeight.current < scrollViewHeight.current * percent
      }
    })()

    // 内容不足一屏，可关闭滚动
    if (scrollEnabled && contentFitsScreen) setScrollEnabled(false)

    // 内容超出一屏，需要启用滚动
    if (!scrollEnabled && !contentFitsScreen) setScrollEnabled(true)
  }

  /**
   * @param w - 内容宽度。
   * @param h - 内容高度。
   */
  function onContentSizeChange(w: number, h: number) {
    // 更新滚动区域内容高度
    scrollViewContentHeight.current = h
    updateScrollState()
  }

  /**
   * @param e - 布局变化事件。
   */
  function onLayout(e: LayoutChangeEvent) {
    const { height } = e.nativeEvent.layout
    // 更新滚动视图高度
    scrollViewHeight.current = height
    updateScrollState()
  }

  // 每次渲染时更新滚动状态（auto 预设）
  if (preset === "auto") updateScrollState()

  return {
    scrollEnabled: preset === "auto" ? scrollEnabled : true,
    onContentSizeChange,
    onLayout,
  }
}

/**
 * @param props - `ScreenWithoutScrolling` 的 props。
 */
function ScreenWithoutScrolling(props: ScreenProps) {
  const { style, contentContainerStyle, children, preset } = props
  return (
    <View style={[$outerStyle, style]}>
      <View style={[$innerStyle, preset === "fixed" && $justifyFlexEnd, contentContainerStyle]}>
        {children}
      </View>
    </View>
  )
}

/**
 * @param props - `ScreenWithScrolling` 的 props。
 */
function ScreenWithScrolling(props: ScreenProps) {
  const {
    children,
    keyboardShouldPersistTaps = "handled",
    keyboardBottomOffset = DEFAULT_BOTTOM_OFFSET,
    contentContainerStyle,
    ScrollViewProps,
    style,
  } = props as ScrollScreenProps

  const ref = useRef<KeyboardAwareScrollViewRef>(null)

  const { scrollEnabled, onContentSizeChange, onLayout } = useAutoPreset(props as AutoScreenProps)

  // 点击当前选中的 Tab 时滚动到内容顶部（React Navigation 约定行为）
  // 见 https://reactnavigation.org/docs/use-scroll-to-top/
  useScrollToTop(ref)

  return (
    <KeyboardAwareScrollView
      bottomOffset={keyboardBottomOffset}
      {...{ keyboardShouldPersistTaps, scrollEnabled, ref }}
      {...ScrollViewProps}
      onLayout={(e) => {
        onLayout(e)
        ScrollViewProps?.onLayout?.(e)
      }}
      onContentSizeChange={(w: number, h: number) => {
        onContentSizeChange(w, h)
        ScrollViewProps?.onContentSizeChange?.(w, h)
      }}
      style={[$outerStyle, ScrollViewProps?.style, style]}
      contentContainerStyle={[
        $innerStyle,
        ScrollViewProps?.contentContainerStyle,
        contentContainerStyle,
      ]}
    >
      {children}
    </KeyboardAwareScrollView>
  )
}

/**
 * 统一页面布局：支持 `fixed` / `scroll` / `auto` 等预设，
 * 处理安全区、状态栏、键盘避让及滚动行为。
 * @see {@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Screen/}
 */
export function Screen(props: ScreenProps) {
  const {
    theme: { colors },
    themeContext,
  } = useAppTheme()
  const {
    backgroundColor,
    KeyboardAvoidingViewProps,
    keyboardOffset = 0,
    safeAreaEdges,
    SystemBarsProps,
    systemBarStyle,
  } = props

  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges)

  return (
    <View
      style={[
        $containerStyle,
        { backgroundColor: backgroundColor || colors.background },
        $containerInsets,
      ]}
    >
      <SystemBars
        style={systemBarStyle || (themeContext === "dark" ? "light" : "dark")}
        {...SystemBarsProps}
      />

      <KeyboardAvoidingView
        behavior={isIos ? "padding" : "height"}
        keyboardVerticalOffset={keyboardOffset}
        {...KeyboardAvoidingViewProps}
        style={[$styles.flex1, KeyboardAvoidingViewProps?.style]}
      >
        {isNonScrolling(props.preset) ? (
          <ScreenWithoutScrolling {...props} />
        ) : (
          <ScreenWithScrolling {...props} />
        )}
      </KeyboardAvoidingView>
    </View>
  )
}

const $containerStyle: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
}

const $outerStyle: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
}

const $justifyFlexEnd: ViewStyle = {
  justifyContent: "flex-end",
}

const $innerStyle: ViewStyle = {
  justifyContent: "flex-start",
  alignItems: "stretch",
}
