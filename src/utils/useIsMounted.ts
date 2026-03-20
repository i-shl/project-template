import { useEffect, useCallback, useRef } from "react"
/**
 * 返回一个函数，用于判断组件是否仍挂载（常见于异步回调中避免 setState 已卸载组件）。
 */
export function useIsMounted() {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return useCallback(() => isMounted.current, [])
}
