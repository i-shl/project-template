import { ComponentType, FC, useMemo } from "react"
import {
  GestureResponderEvent,
  ImageStyle,
  StyleProp,
  SwitchProps,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native"

import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"

import { Text, TextProps } from "../Text"

export interface ToggleProps<T> extends Omit<TouchableOpacityProps, "style"> {
  /**
   * 不同状态下的样式修饰（错误 / 禁用）。
   */
  status?: "error" | "disabled"
  /**
   * 为 false 时不可编辑，默认 true。
   */
  editable?: TextInputProps["editable"]
  /**
   * 当前值；为 true 表示开启。
   */
  value?: boolean
  /**
   * 值变化时回调，参数为新值。
   */
  onValueChange?: SwitchProps["onValueChange"]
  /**
   * 外层容器样式覆盖。
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * 输入区域包裹层样式覆盖。
   */
  inputWrapperStyle?: StyleProp<ViewStyle>
  /**
   * 可选：控制外框尺寸、形状、关闭态背景色与描边。
   */
  inputOuterStyle?: ViewStyle
  /**
   * 可选：控制内层与开启态背景等。
   */
  inputInnerStyle?: ViewStyle
  /**
   * 可选：细节元素样式（勾选图标、滑块等），详见 Checkbox / Radio / Switch。
   */
  inputDetailStyle?: ViewStyle
  /**
   * 标签相对开关的位置，默认在右侧。
   */
  labelPosition?: "left" | "right"
  /**
   * 未使用 `labelTx` 时的标签纯文本。
   */
  label?: TextProps["text"]
  /**
   * 标签 i18n 键。
   */
  labelTx?: TextProps["tx"]
  /**
   * 标签 i18n 可选参数。
   */
  labelTxOptions?: TextProps["txOptions"]
  /**
   * 标签文字样式覆盖。
   */
  labelStyle?: StyleProp<TextStyle>
  /**
   * 透传给标签 Text 的额外属性。
   */
  LabelTextProps?: TextProps
  /**
   * 未使用 `helperTx` 时的辅助说明纯文本。
   */
  helper?: TextProps["text"]
  /**
   * 辅助说明 i18n 键。
   */
  helperTx?: TextProps["tx"]
  /**
   * 辅助说明 i18n 可选参数。
   */
  helperTxOptions?: TextProps["txOptions"]
  /**
   * 透传给辅助说明 Text 的额外属性。
   */
  HelperTextProps?: TextProps
  /**
   * 具体开关类型的输入子组件（Checkbox / Radio / Switch 等）。
   */
  ToggleInput: FC<BaseToggleInputProps<T>>
}

export interface BaseToggleInputProps<T> {
  on: boolean
  status: ToggleProps<T>["status"]
  disabled: boolean
  outerStyle: ViewStyle
  innerStyle: ViewStyle
  detailStyle: ViewStyle | ImageStyle
}

/**
 * 布尔开关输入；受控组件，需在 `onValueChange` 中同步更新 `value`，否则界面不会反映用户操作。
 */
export function Toggle<T>(props: ToggleProps<T>) {
  const {
    editable = true,
    status,
    value,
    onPress,
    onValueChange,
    labelPosition = "right",
    helper,
    helperTx,
    helperTxOptions,
    HelperTextProps,
    containerStyle: $containerStyleOverride,
    inputWrapperStyle: $inputWrapperStyleOverride,
    ToggleInput,
    accessibilityRole,
    ...WrapperProps
  } = props

  const {
    theme: { colors },
    themed,
  } = useAppTheme()

  const disabled = editable === false || status === "disabled" || props.disabled

  const Wrapper = useMemo(
    () => (disabled ? View : TouchableOpacity) as ComponentType<TouchableOpacityProps | ViewProps>,
    [disabled],
  )

  const $containerStyles = [$containerStyleOverride]
  const $inputWrapperStyles = [$styles.row, $inputWrapper, $inputWrapperStyleOverride]
  const $helperStyles = themed([
    $helper,
    status === "error" && { color: colors.error },
    HelperTextProps?.style,
  ])

  function handlePress(e: GestureResponderEvent) {
    if (disabled) return
    onValueChange?.(!value)
    onPress?.(e)
  }

  return (
    <Wrapper
      activeOpacity={1}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ checked: value, disabled }}
      {...WrapperProps}
      style={$containerStyles}
      onPress={handlePress}
    >
      <View style={$inputWrapperStyles}>
        {labelPosition === "left" && <FieldLabel<T> {...props} labelPosition={labelPosition} />}

        <ToggleInput
          on={!!value}
          disabled={!!disabled}
          status={status}
          outerStyle={props.inputOuterStyle ?? {}}
          innerStyle={props.inputInnerStyle ?? {}}
          detailStyle={props.inputDetailStyle ?? {}}
        />

        {labelPosition === "right" && <FieldLabel<T> {...props} labelPosition={labelPosition} />}
      </View>

      {!!(helper || helperTx) && (
        <Text
          preset="formHelper"
          text={helper}
          tx={helperTx}
          txOptions={helperTxOptions}
          {...HelperTextProps}
          style={$helperStyles}
        />
      )}
    </Wrapper>
  )
}

/** 开关旁字段标签 */
function FieldLabel<T>(props: ToggleProps<T>) {
  const {
    status,
    label,
    labelTx,
    labelTxOptions,
    LabelTextProps,
    labelPosition,
    labelStyle: $labelStyleOverride,
  } = props

  const {
    theme: { colors },
    themed,
  } = useAppTheme()

  if (!label && !labelTx && !LabelTextProps?.children) return null

  const $labelStyle = themed([
    $label,
    status === "error" && { color: colors.error },
    labelPosition === "right" && $labelRight,
    labelPosition === "left" && $labelLeft,
    $labelStyleOverride,
    LabelTextProps?.style,
  ])

  return (
    <Text
      preset="formLabel"
      text={label}
      tx={labelTx}
      txOptions={labelTxOptions}
      {...LabelTextProps}
      style={$labelStyle}
    />
  )
}

const $inputWrapper: ViewStyle = {
  alignItems: "center",
}

export const $inputOuterBase: ViewStyle = {
  height: 24,
  width: 24,
  borderWidth: 2,
  alignItems: "center",
  overflow: "hidden",
  flexGrow: 0,
  flexShrink: 0,
  justifyContent: "space-between",
  flexDirection: "row",
}

const $helper: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
})

const $label: TextStyle = {
  flex: 1,
}

const $labelRight: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginStart: spacing.md,
})

const $labelLeft: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginEnd: spacing.md,
})
