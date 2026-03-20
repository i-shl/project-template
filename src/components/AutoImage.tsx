import { useLayoutEffect, useState } from "react"
import { Image, ImageProps, ImageURISource, Platform, PixelRatio } from "react-native"

export interface AutoImageProps extends ImageProps {
  /**
   * 最大宽度
   */
  maxWidth?: number
  /**
   * 最大高度
   */
  maxHeight?: number
  headers?: {
    [key: string]: string
  }
}

/**
 * 根据目标宽高比计算远程/ data-uri 图片缩放后的尺寸；未传目标尺寸则返回原图尺寸。
 *
 * 与 `resizeMode: 'contain'` 的区别：可只约束单边；会按目标尺寸缩放而非仅在容器内「包含」显示。
 * @param remoteUri 图片 URI
 * @param dimensions 可选 `[maxWidth, maxHeight]`
 */
export function useAutoImage(
  remoteUri: string,
  headers?: {
    [key: string]: string
  },
  dimensions?: [maxWidth?: number, maxHeight?: number],
): [width: number, height: number] {
  const [[remoteWidth, remoteHeight], setRemoteImageDimensions] = useState([0, 0])
  const remoteAspectRatio = remoteWidth / remoteHeight
  const [maxWidth, maxHeight] = dimensions ?? []

  useLayoutEffect(() => {
    if (!remoteUri) return

    if (!headers) {
      Image.getSize(remoteUri, (w, h) => setRemoteImageDimensions([w, h]))
    } else {
      Image.getSizeWithHeaders(remoteUri, headers, (w, h) => setRemoteImageDimensions([w, h]))
    }
  }, [remoteUri, headers])

  if (Number.isNaN(remoteAspectRatio)) return [0, 0]

  if (maxWidth && maxHeight) {
    const aspectRatio = Math.min(maxWidth / remoteWidth, maxHeight / remoteHeight)
    return [
      PixelRatio.roundToNearestPixel(remoteWidth * aspectRatio),
      PixelRatio.roundToNearestPixel(remoteHeight * aspectRatio),
    ]
  } else if (maxWidth) {
    return [maxWidth, PixelRatio.roundToNearestPixel(maxWidth / remoteAspectRatio)]
  } else if (maxHeight) {
    return [PixelRatio.roundToNearestPixel(maxHeight * remoteAspectRatio), maxHeight]
  } else {
    return [remoteWidth, remoteHeight]
  }
}

/**
 * 自动计算远程或 data-uri 图片尺寸的 Image 封装。
 * @see {@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/AutoImage/}
 */
export function AutoImage(props: AutoImageProps) {
  const { maxWidth, maxHeight, ...ImageProps } = props
  const source = props.source as ImageURISource
  const headers = source?.headers

  const [width, height] = useAutoImage(
    Platform.select({
      web: (source?.uri as string) ?? (source as string),
      default: source?.uri as string,
    }),
    headers,
    [maxWidth, maxHeight],
  )

  return <Image {...ImageProps} style={[{ width, height }, props.style]} />
}
