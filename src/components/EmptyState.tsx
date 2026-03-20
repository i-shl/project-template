import { Image, ImageProps, ImageStyle, StyleProp, TextStyle, View, ViewStyle } from "react-native"

import { translate } from "@/i18n/translate"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Button, ButtonProps } from "./Button"
import { Text, TextProps } from "./Text"

const sadFace = require("@assets/images/sad-face.png")

interface EmptyStateProps {
  /**
   * 预设空状态文案/配图组合。
   */
  preset?: "generic"
  /**
   * 外层容器样式覆盖。
   */
  style?: StyleProp<ViewStyle>
  /**
   * 标题上方的图片资源。
   */
  imageSource?: ImageProps["source"]
  /**
   * 图片样式覆盖。
   */
  imageStyle?: StyleProp<ImageStyle>
  /**
   * 透传给 Image 的额外属性（不含 source）。
   */
  ImageProps?: Omit<ImageProps, "source">
  /**
   * 未使用 `headingTx` 时的标题纯文本。
   */
  heading?: TextProps["text"]
  /**
   * 标题 i18n 键。
   */
  headingTx?: TextProps["tx"]
  /**
   * 标题 i18n 可选参数。
   */
  headingTxOptions?: TextProps["txOptions"]
  /**
   * 标题文字样式覆盖。
   */
  headingStyle?: StyleProp<TextStyle>
  /**
   * 透传给标题 Text 的额外属性。
   */
  HeadingTextProps?: TextProps
  /**
   * 未使用 `contentTx` 时的正文纯文本。
   */
  content?: TextProps["text"]
  /**
   * 正文 i18n 键。
   */
  contentTx?: TextProps["tx"]
  /**
   * 正文 i18n 可选参数。
   */
  contentTxOptions?: TextProps["txOptions"]
  /**
   * 正文样式覆盖。
   */
  contentStyle?: StyleProp<TextStyle>
  /**
   * 透传给正文 Text 的额外属性。
   */
  ContentTextProps?: TextProps
  /**
   * 未使用 `buttonTx` 时的按钮纯文本。
   */
  button?: TextProps["text"]
  /**
   * 按钮文案 i18n 键。
   */
  buttonTx?: TextProps["tx"]
  /**
   * 按钮文案 i18n 可选参数。
   */
  buttonTxOptions?: TextProps["txOptions"]
  /**
   * 按钮容器样式覆盖。
   */
  buttonStyle?: ButtonProps["style"]
  /**
   * 按钮文字样式覆盖。
   */
  buttonTextStyle?: ButtonProps["textStyle"]
  /**
   * 按钮 `onPress`。
   */
  buttonOnPress?: ButtonProps["onPress"]
  /**
   * 透传给 Button 的额外属性。
   */
  ButtonProps?: ButtonProps
}

interface EmptyStatePresetItem {
  imageSource: ImageProps["source"]
  heading: TextProps["text"]
  content: TextProps["text"]
  button: TextProps["text"]
}

/**
 * 无数据时的占位视图，可引导用户下一步操作。
 * @see {@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/EmptyState/}
 */
export function EmptyState(props: EmptyStateProps) {
  const {
    theme,
    themed,
    theme: { spacing },
  } = useAppTheme()

  const EmptyStatePresets = {
    generic: {
      imageSource: sadFace,
      heading: translate("emptyStateComponent:generic.heading"),
      content: translate("emptyStateComponent:generic.content"),
      button: translate("emptyStateComponent:generic.button"),
    } as EmptyStatePresetItem,
  } as const

  const preset = EmptyStatePresets[props.preset ?? "generic"]

  const {
    button = preset.button,
    buttonTx,
    buttonOnPress,
    buttonTxOptions,
    content = preset.content,
    contentTx,
    contentTxOptions,
    heading = preset.heading,
    headingTx,
    headingTxOptions,
    imageSource = preset.imageSource,
    style: $containerStyleOverride,
    buttonStyle: $buttonStyleOverride,
    buttonTextStyle: $buttonTextStyleOverride,
    contentStyle: $contentStyleOverride,
    headingStyle: $headingStyleOverride,
    imageStyle: $imageStyleOverride,
    ButtonProps,
    ContentTextProps,
    HeadingTextProps,
    ImageProps,
  } = props

  const isImagePresent = !!imageSource
  const isHeadingPresent = !!(heading || headingTx)
  const isContentPresent = !!(content || contentTx)
  const isButtonPresent = !!(button || buttonTx)

  const $containerStyles = [$containerStyleOverride]
  const $imageStyles = [
    $image,
    (isHeadingPresent || isContentPresent || isButtonPresent) && { marginBottom: spacing.xxxs },
    $imageStyleOverride,
    ImageProps?.style,
  ]
  const $headingStyles = [
    themed($heading),
    isImagePresent && { marginTop: spacing.xxxs },
    (isContentPresent || isButtonPresent) && { marginBottom: spacing.xxxs },
    $headingStyleOverride,
    HeadingTextProps?.style,
  ]
  const $contentStyles = [
    themed($content),
    (isImagePresent || isHeadingPresent) && { marginTop: spacing.xxxs },
    isButtonPresent && { marginBottom: spacing.xxxs },
    $contentStyleOverride,
    ContentTextProps?.style,
  ]
  const $buttonStyles = [
    (isImagePresent || isHeadingPresent || isContentPresent) && { marginTop: spacing.xl },
    $buttonStyleOverride,
    ButtonProps?.style,
  ]

  return (
    <View style={$containerStyles}>
      {isImagePresent && (
        <Image
          source={imageSource}
          {...ImageProps}
          style={$imageStyles}
          tintColor={theme.colors.palette.neutral900}
        />
      )}

      {isHeadingPresent && (
        <Text
          preset="subheading"
          text={heading}
          tx={headingTx}
          txOptions={headingTxOptions}
          {...HeadingTextProps}
          style={$headingStyles}
        />
      )}

      {isContentPresent && (
        <Text
          text={content}
          tx={contentTx}
          txOptions={contentTxOptions}
          {...ContentTextProps}
          style={$contentStyles}
        />
      )}

      {isButtonPresent && (
        <Button
          onPress={buttonOnPress}
          text={button}
          tx={buttonTx}
          txOptions={buttonTxOptions}
          textStyle={$buttonTextStyleOverride}
          {...ButtonProps}
          style={$buttonStyles}
        />
      )}
    </View>
  )
}

const $image: ImageStyle = { alignSelf: "center" }
const $heading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  textAlign: "center",
  paddingHorizontal: spacing.lg,
})
const $content: ThemedStyle<TextStyle> = ({ spacing }) => ({
  textAlign: "center",
  paddingHorizontal: spacing.lg,
})
