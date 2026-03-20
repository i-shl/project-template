import { forwardRef, ReactElement } from "react"
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native"

import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"

import { Icon, IconTypes } from "./Icon"
import { Text, TextProps } from "./Text"

export interface ListItemProps extends TouchableOpacityProps {
  /**
   * 列表行高度，默认 56。
   */
  height?: number
  /**
   * 是否显示顶部分割线，默认 false。
   */
  topSeparator?: boolean
  /**
   * 是否显示底部分割线，默认 false。
   */
  bottomSeparator?: boolean
  /**
   * 未使用 `tx` 或子节点时的纯文本。
   */
  text?: TextProps["text"]
  /**
   * i18n 文案键。
   */
  tx?: TextProps["tx"]
  /**
   * 子节点。
   */
  children?: TextProps["children"]
  /**
   * i18n 可选参数。
   */
  txOptions?: TextProps["txOptions"]
  /**
   * 主文字样式覆盖。
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * 透传给内部 Text 的额外属性。
   */
  TextProps?: TextProps
  /**
   * 外层 View 容器样式覆盖。
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * TouchableOpacity / 行容器样式覆盖。
   */
  style?: StyleProp<ViewStyle>
  /**
   * 左侧图标。
   */
  leftIcon?: IconTypes
  /**
   * 左侧图标着色。
   */
  leftIconColor?: string
  /**
   * 右侧图标。
   */
  rightIcon?: IconTypes
  /**
   * 右侧图标着色。
   */
  rightIconColor?: string
  /**
   * 右侧自定义节点；覆盖 `rightIcon`。
   */
  RightComponent?: ReactElement
  /**
   * 左侧自定义节点；覆盖 `leftIcon`。
   */
  LeftComponent?: ReactElement
}

interface ListItemActionProps {
  icon?: IconTypes
  iconColor?: string
  Component?: ReactElement
  size: number
  side: "left" | "right"
}

/**
 * 列表行样式组件，可用于 FlatList、SectionList 或单独使用。
 * @see {@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/ListItem/}
 */
export const ListItem = forwardRef<View, ListItemProps>(function ListItem(
  props: ListItemProps,
  ref,
) {
  const {
    bottomSeparator,
    children,
    height = 56,
    LeftComponent,
    leftIcon,
    leftIconColor,
    RightComponent,
    rightIcon,
    rightIconColor,
    style,
    text,
    TextProps,
    topSeparator,
    tx,
    txOptions,
    textStyle: $textStyleOverride,
    containerStyle: $containerStyleOverride,
    ...TouchableOpacityProps
  } = props
  const { themed } = useAppTheme()

  const isTouchable =
    TouchableOpacityProps.onPress !== undefined ||
    TouchableOpacityProps.onPressIn !== undefined ||
    TouchableOpacityProps.onPressOut !== undefined ||
    TouchableOpacityProps.onLongPress !== undefined

  const $textStyles = [$textStyle, $textStyleOverride, TextProps?.style]

  const $containerStyles = [
    topSeparator && $separatorTop,
    bottomSeparator && $separatorBottom,
    $containerStyleOverride,
  ]

  const $touchableStyles = [$styles.row, $touchableStyle, { minHeight: height }, style]

  const Wrapper = isTouchable ? TouchableOpacity : View

  return (
    <View ref={ref} style={themed($containerStyles)}>
      <Wrapper {...TouchableOpacityProps} style={$touchableStyles}>
        <ListItemAction
          side="left"
          size={height}
          icon={leftIcon}
          iconColor={leftIconColor}
          Component={LeftComponent}
        />

        <Text {...TextProps} tx={tx} text={text} txOptions={txOptions} style={themed($textStyles)}>
          {children}
        </Text>

        <ListItemAction
          side="right"
          size={height}
          icon={rightIcon}
          iconColor={rightIconColor}
          Component={RightComponent}
        />
      </Wrapper>
    </View>
  )
})

/** 列表行左/右侧图标或自定义内容 */
function ListItemAction(props: ListItemActionProps) {
  const { icon, Component, iconColor, size, side } = props
  const { themed } = useAppTheme()

  const $iconContainerStyles = [$iconContainer]

  if (Component) return Component

  if (icon !== undefined) {
    return (
      <Icon
        size={24}
        icon={icon}
        color={iconColor}
        containerStyle={themed([
          $iconContainerStyles,
          side === "left" && $iconContainerLeft,
          side === "right" && $iconContainerRight,
          { height: size },
        ])}
      />
    )
  }

  return null
}

const $separatorTop: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderTopWidth: 1,
  borderTopColor: colors.separator,
})

const $separatorBottom: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderBottomWidth: 1,
  borderBottomColor: colors.separator,
})

const $textStyle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xs,
  alignSelf: "center",
  flexGrow: 1,
  flexShrink: 1,
})

const $touchableStyle: ViewStyle = {
  alignItems: "flex-start",
}

const $iconContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  flexGrow: 0,
}
const $iconContainerLeft: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginEnd: spacing.md,
})

const $iconContainerRight: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginStart: spacing.md,
})
