import { ComponentType, Fragment, ReactElement } from "react"
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native"

import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle, ThemedStyleArray } from "@/theme/types"

import { Text, TextProps } from "./Text"

type Presets = "default" | "reversed"

interface CardProps extends TouchableOpacityProps {
  /**
   * 文本样式预设。
   */
  preset?: Presets
  /**
   * 纵向对齐方式；固定高度且内容变化时尤其有用。
   *
   * `top`（默认）- 顶部对齐。
   * `center` - 垂直居中。
   * `space-between` - 均匀分布。
   * `force-footer-bottom` - 主体靠上，页脚贴底。
   */
  verticalAlignment?: "top" | "center" | "space-between" | "force-footer-bottom"
  /**
   * 卡片主体左侧自定义节点。
   */
  LeftComponent?: ReactElement
  /**
   * 卡片主体右侧自定义节点。
   */
  RightComponent?: ReactElement
  /**
   * 未使用 `headingTx` 时的标题纯文本。
   */
  heading?: TextProps["text"]
  /**
   * 标题 i18n 键。
   */
  headingTx?: TextProps["tx"]
  /**
   * 标题 i18n 可选参数（插值、回退语言等）。
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
   * 自定义标题区域；会覆盖所有 `heading*` 相关 props。
   */
  HeadingComponent?: ReactElement
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
   * 自定义正文区域；会覆盖所有 `content*` 相关 props。
   */
  ContentComponent?: ReactElement
  /**
   * 未使用 `footerTx` 时的页脚纯文本。
   */
  footer?: TextProps["text"]
  /**
   * 页脚 i18n 键。
   */
  footerTx?: TextProps["tx"]
  /**
   * 页脚 i18n 可选参数。
   */
  footerTxOptions?: TextProps["txOptions"]
  /**
   * 页脚文字样式覆盖。
   */
  footerStyle?: StyleProp<TextStyle>
  /**
   * 透传给页脚 Text 的额外属性。
   */
  FooterTextProps?: TextProps
  /**
   * 自定义页脚区域；会覆盖所有 `footer*` 相关 props。
   */
  FooterComponent?: ReactElement
}

/**
 * 卡片用于在容器内展示一组相关信息；ListItem 偏横向列表时，Card 更适合纵向排版。
 * @see {@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Card/}
 */
export function Card(props: CardProps) {
  const {
    content,
    contentTx,
    contentTxOptions,
    footer,
    footerTx,
    footerTxOptions,
    heading,
    headingTx,
    headingTxOptions,
    ContentComponent,
    HeadingComponent,
    FooterComponent,
    LeftComponent,
    RightComponent,
    verticalAlignment = "top",
    style: $containerStyleOverride,
    contentStyle: $contentStyleOverride,
    headingStyle: $headingStyleOverride,
    footerStyle: $footerStyleOverride,
    ContentTextProps,
    HeadingTextProps,
    FooterTextProps,
    ...WrapperProps
  } = props

  const {
    themed,
    theme: { spacing },
  } = useAppTheme()

  const preset: Presets = props.preset ?? "default"
  const isPressable = !!WrapperProps.onPress
  const isHeadingPresent = !!(HeadingComponent || heading || headingTx)
  const isContentPresent = !!(ContentComponent || content || contentTx)
  const isFooterPresent = !!(FooterComponent || footer || footerTx)

  const Wrapper = (isPressable ? TouchableOpacity : View) as ComponentType<
    TouchableOpacityProps | ViewProps
  >
  const HeaderContentWrapper = verticalAlignment === "force-footer-bottom" ? View : Fragment

  const $containerStyle: StyleProp<ViewStyle> = [
    themed($containerPresets[preset]),
    $containerStyleOverride,
  ]
  const $headingStyle = [
    themed($headingPresets[preset]),
    (isFooterPresent || isContentPresent) && { marginBottom: spacing.xxxs },
    $headingStyleOverride,
    HeadingTextProps?.style,
  ]
  const $contentStyle = [
    themed($contentPresets[preset]),
    isHeadingPresent && { marginTop: spacing.xxxs },
    isFooterPresent && { marginBottom: spacing.xxxs },
    $contentStyleOverride,
    ContentTextProps?.style,
  ]
  const $footerStyle = [
    themed($footerPresets[preset]),
    (isHeadingPresent || isContentPresent) && { marginTop: spacing.xxxs },
    $footerStyleOverride,
    FooterTextProps?.style,
  ]
  const $alignmentWrapperStyle = [
    $alignmentWrapper,
    { justifyContent: $alignmentWrapperFlexOptions[verticalAlignment] },
    LeftComponent && { marginStart: spacing.md },
    RightComponent && { marginEnd: spacing.md },
  ]

  return (
    <Wrapper
      style={$containerStyle}
      activeOpacity={0.8}
      accessibilityRole={isPressable ? "button" : undefined}
      {...WrapperProps}
    >
      {LeftComponent}

      <View style={$alignmentWrapperStyle}>
        <HeaderContentWrapper>
          {HeadingComponent ||
            (isHeadingPresent && (
              <Text
                weight="bold"
                text={heading}
                tx={headingTx}
                txOptions={headingTxOptions}
                {...HeadingTextProps}
                style={$headingStyle}
              />
            ))}

          {ContentComponent ||
            (isContentPresent && (
              <Text
                weight="normal"
                text={content}
                tx={contentTx}
                txOptions={contentTxOptions}
                {...ContentTextProps}
                style={$contentStyle}
              />
            ))}
        </HeaderContentWrapper>

        {FooterComponent ||
          (isFooterPresent && (
            <Text
              weight="normal"
              size="xs"
              text={footer}
              tx={footerTx}
              txOptions={footerTxOptions}
              {...FooterTextProps}
              style={$footerStyle}
            />
          ))}
      </View>

      {RightComponent}
    </Wrapper>
  )
}

const $containerBase: ThemedStyle<ViewStyle> = (theme) => ({
  borderRadius: theme.spacing.md,
  padding: theme.spacing.xs,
  borderWidth: 1,
  shadowColor: theme.colors.palette.neutral800,
  shadowOffset: { width: 0, height: 12 },
  shadowOpacity: 0.08,
  shadowRadius: 12.81,
  elevation: 16,
  minHeight: 96,
})

const $alignmentWrapper: ViewStyle = {
  flex: 1,
  alignSelf: "stretch",
}

const $alignmentWrapperFlexOptions = {
  "top": "flex-start",
  "center": "center",
  "space-between": "space-between",
  "force-footer-bottom": "space-between",
} as const

const $containerPresets: Record<Presets, ThemedStyleArray<ViewStyle>> = {
  default: [
    $styles.row,
    $containerBase,
    (theme) => ({
      backgroundColor: theme.colors.palette.neutral100,
      borderColor: theme.colors.palette.neutral300,
    }),
  ],
  reversed: [
    $styles.row,
    $containerBase,
    (theme) => ({
      backgroundColor: theme.colors.palette.neutral800,
      borderColor: theme.colors.palette.neutral500,
    }),
  ],
}

const $headingPresets: Record<Presets, ThemedStyleArray<TextStyle>> = {
  default: [],
  reversed: [(theme) => ({ color: theme.colors.palette.neutral100 })],
}

const $contentPresets: Record<Presets, ThemedStyleArray<TextStyle>> = {
  default: [],
  reversed: [(theme) => ({ color: theme.colors.palette.neutral100 })],
}

const $footerPresets: Record<Presets, ThemedStyleArray<TextStyle>> = {
  default: [],
  reversed: [(theme) => ({ color: theme.colors.palette.neutral100 })],
}
