import { Component, ErrorInfo, ReactNode } from "react"

import { ErrorDetails } from "./ErrorDetails"

interface Props {
  children: ReactNode
  catchErrors: "always" | "dev" | "prod" | "never"
}

interface State {
  error: Error | null
  errorInfo: ErrorInfo | null
}

/**
 * 捕获子树中的 JS 运行时错误并展示降级 UI（Error Boundary 模式）。
 * 需使用类组件：目前仅类组件可作为错误边界。
 * @see {@link https://docs.infinite.red/ignite-cli/concept/Error-Boundary/}
 * @see {@link https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary}
 */
export class ErrorBoundary extends Component<Props, State> {
  state = { error: null, errorInfo: null }

  // 子组件抛出错误时进入此处
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 仅在配置允许时记录错误状态
    if (!this.isEnabled()) {
      return
    }
    // 捕获下层组件错误并切换到错误 UI
    this.setState({
      error,
      errorInfo,
    })

    // 可在此上报到 BugSnag、Sentry、Crashlytics 等
    // reportCrash(error)
  }

  // 清空错误状态
  resetError = () => {
    this.setState({ error: null, errorInfo: null })
  }

  // 避免无谓重渲染
  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>): boolean {
    return nextState.error !== this.state.error
  }

  // 是否在当前环境启用捕获
  isEnabled(): boolean {
    return (
      this.props.catchErrors === "always" ||
      (this.props.catchErrors === "dev" && __DEV__) ||
      (this.props.catchErrors === "prod" && !__DEV__)
    )
  }

  // 有错误则渲染错误页，否则渲染子节点
  render() {
    return this.isEnabled() && this.state.error ? (
      <ErrorDetails
        onReset={this.resetError}
        error={this.state.error}
        errorInfo={this.state.errorInfo}
      />
    ) : (
      this.props.children
    )
  }
}
