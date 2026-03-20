import { ReactElement } from "react"
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native"

import { isRTL } from "@/i18n"
import { translate } from "@/i18n/translate"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"
import { ExtendedEdge, useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"

import { IconTypes, PressableIcon } from "./Icon"
import { Text, TextProps } from "./Text"

export interface HeaderProps {
  /**
   * 标题相对两侧操作区的布局方式。
   * - `center`：标题相对整个栏居中；标题或按钮过长时标题可能被裁切。
   * - `flex`：相对两侧按钮区域居中；两侧宽度不一致时相对整栏可能不居中。
   */
  titleMode?: "center" | "flex"
  /**
   * 标题文字样式覆盖。
   */
  titleStyle?: StyleProp<TextStyle>
  /**
   * 标题外层容器样式覆盖。
   */
  titleContainerStyle?: StyleProp<ViewStyle>
  /**
   * 头部内层包裹样式覆盖。
   */
  style?: StyleProp<ViewStyle>
  /**
   * 头部最外层容器样式覆盖。
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * 背景色
   */
  backgroundColor?: string
  /**
   * 未使用 `titleTx` 时的标题纯文本。
   */
  title?: TextProps["text"]
  /**
   * 标题 i18n 键。
   */
  titleTx?: TextProps["tx"]
  /**
   * 标题 i18n 可选参数。
   */
  titleTxOptions?: TextProps["txOptions"]
  /**
   * 左侧图标，可与 `onLeftPress` 配合。
   */
  leftIcon?: IconTypes
  /**
   * 左侧图标着色。
   */
  leftIconColor?: string
  /**
   * 左侧文字动作（未用 `leftTx`）；与 `onLeftPress` 配合；覆盖 `leftIcon`。
   */
  leftText?: TextProps["text"]
  /**
   * 左侧文字 i18n 键；与 `onLeftPress` 配合；覆盖 `leftIcon`。
   */
  leftTx?: TextProps["tx"]
  /**
   * 左侧完全自定义节点；覆盖 `leftIcon`、`leftTx`、`leftText`。
   */
  LeftActionComponent?: ReactElement
  /**
   * 左侧文案 i18n 可选参数。
   */
  leftTxOptions?: TextProps["txOptions"]
  /**
   * 左侧图标或文字被按下时的回调。
   */
  onLeftPress?: TouchableOpacityProps["onPress"]
  /**
   * 右侧图标，可与 `onRightPress` 配合。
   */
  rightIcon?: IconTypes
  /**
   * 右侧图标着色。
   */
  rightIconColor?: string
  /**
   * 右侧文字动作；与 `onRightPress` 配合；覆盖 `rightIcon`。
   */
  rightText?: TextProps["text"]
  /**
   * 右侧文字 i18n 键；与 `onRightPress` 配合；覆盖 `rightIcon`。
   */
  rightTx?: TextProps["tx"]
  /**
   * 右侧完全自定义节点；覆盖 `rightIcon`、`rightTx`、`rightText`。
   */
  RightActionComponent?: ReactElement
  /**
   * 右侧文案 i18n 可选参数。
   */
  rightTxOptions?: TextProps["txOptions"]
  /**
   * 右侧图标或文字被按下时的回调。
   */
  onRightPress?: TouchableOpacityProps["onPress"]
  /**
   * 覆盖安全区默认边。
   */
  safeAreaEdges?: ExtendedEdge[]
}

interface HeaderActionProps {
  backgroundColor?: string
  icon?: IconTypes
  iconColor?: string
  text?: TextProps["text"]
  tx?: TextProps["tx"]
  txOptions?: TextProps["txOptions"]
  onPress?: TouchableOpacityProps["onPress"]
  ActionComponent?: ReactElement
}

/**
 * 常见顶栏：容纳导航按钮与标题。
 * 通常配合导航器的 `screenOptions.header`，或在 `navigation.setOptions({ header })` 中传入。
 * @see {@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Header/}
 */
export function Header(props: HeaderProps) {
  const {
    theme: { colors },
    themed,
  } = useAppTheme()
  const {
    backgroundColor = colors.background,
    LeftActionComponent,
    leftIcon,
    leftIconColor,
    leftText,
    leftTx,
    leftTxOptions,
    onLeftPress,
    onRightPress,
    RightActionComponent,
    rightIcon,
    rightIconColor,
    rightText,
    rightTx,
    rightTxOptions,
    safeAreaEdges = ["top"],
    title,
    titleMode = "center",
    titleTx,
    titleTxOptions,
    titleContainerStyle: $titleContainerStyleOverride,
    style: $styleOverride,
    titleStyle: $titleStyleOverride,
    containerStyle: $containerStyleOverride,
  } = props

  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges)

  const titleContent = titleTx ? translate(titleTx, titleTxOptions) : title

  return (
    <View style={[$container, $containerInsets, { backgroundColor }, $containerStyleOverride]}>
      <View style={[$styles.row, $wrapper, $styleOverride]}>
        <HeaderAction
          tx={leftTx}
          text={leftText}
          icon={leftIcon}
          iconColor={leftIconColor}
          onPress={onLeftPress}
          txOptions={leftTxOptions}
          backgroundColor={backgroundColor}
          ActionComponent={LeftActionComponent}
        />

        {!!titleContent && (
          <View
            style={[
              $titleWrapperPointerEvents,
              titleMode === "center" && themed($titleWrapperCenter),
              titleMode === "flex" && $titleWrapperFlex,
              $titleContainerStyleOverride,
            ]}
          >
            <Text
              weight="medium"
              size="md"
              text={titleContent}
              style={[$title, $titleStyleOverride]}
            />
          </View>
        )}

        <HeaderAction
          tx={rightTx}
          text={rightText}
          icon={rightIcon}
          iconColor={rightIconColor}
          onPress={onRightPress}
          txOptions={rightTxOptions}
          backgroundColor={backgroundColor}
          ActionComponent={RightActionComponent}
        />
      </View>
    </View>
  )
}

/** 顶栏单侧操作区（图标或文字） */
function HeaderAction(props: HeaderActionProps) {
  const { backgroundColor, icon, text, tx, txOptions, onPress, ActionComponent, iconColor } = props
  const { themed } = useAppTheme()

  const content = tx ? translate(tx, txOptions) : text

  if (ActionComponent) return ActionComponent

  if (content) {
    return (
      <TouchableOpacity
        style={themed([$actionTextContainer, { backgroundColor }])}
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={0.8}
      >
        <Text weight="medium" size="md" text={content} style={themed($actionText)} />
      </TouchableOpacity>
    )
  }

  if (icon) {
    return (
      <PressableIcon
        size={24}
        icon={icon}
        color={iconColor}
        onPress={onPress}
        containerStyle={themed([$actionIconContainer, { backgroundColor }])}
        style={isRTL ? { transform: [{ rotate: "180deg" }] } : {}}
      />
    )
  }

  return <View style={[$actionFillerContainer, { backgroundColor }]} />
}

const $wrapper: ViewStyle = {
  height: 56,
  alignItems: "center",
  justifyContent: "space-between",
}

const $container: ViewStyle = {
  width: "100%",
}

const $title: TextStyle = {
  textAlign: "center",
}

const $actionTextContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexGrow: 0,
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  paddingHorizontal: spacing.md,
  zIndex: 2,
})

const $actionText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.tint,
})

const $actionIconContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexGrow: 0,
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  paddingHorizontal: spacing.md,
  zIndex: 2,
})

const $actionFillerContainer: ViewStyle = {
  width: 16,
}

const $titleWrapperPointerEvents: ViewStyle = {
  pointerEvents: "none",
}

const $titleWrapperCenter: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  position: "absolute",
  paddingHorizontal: spacing.xxl,
  zIndex: 1,
})

const $titleWrapperFlex: ViewStyle = {
  justifyContent: "center",
  flexGrow: 1,
}
