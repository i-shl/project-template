import React from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import 'antd/dist/reset.css'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import RouterView from '@/router'

dayjs.locale('zh-cn')

const App: React.FC = () => (
  <ConfigProvider locale={zhCN}>
    <RouterView />
  </ConfigProvider>
)

export default App
