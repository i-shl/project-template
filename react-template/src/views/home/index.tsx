import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from 'antd'
import { store } from '@/stores'
import { logout } from '@/stores/user'
import { Link } from 'react-router-dom'
import { formatTime } from '@/utils'
import config from '@/config'
import { test } from '@/api'

const { TextArea } = Input

const Home: React.FC = () => {
  const navigate = useNavigate()

  const onLogout = () => {
    store.dispatch(logout())
    navigate('/login')
  }

  const onLogin = () => {
    navigate('/login')
  }

  const routerTo404 = () => {
    navigate('/404?from=home')
  }

  const [value, setValue] = useState('')

  const testApi = async () => {
    try {
      const res = await test({})
      console.log('test接口', res)
      setValue(JSON.stringify(res.data))
    } catch (error) {
      console.error('API 调用失败', error)
    }
  }

  return (
    <div>
      <h1>Home</h1>
      <div>
        {store.getState().user.token ? (
          <Button type="primary" danger onClick={onLogout}>
            退出登录
          </Button>
        ) : (
          <Button type="primary" onClick={onLogin}>
            去登录
          </Button>
        )}
        <p>当前环境：{config.env}</p>
        <p>baseURL：{config.baseURL}</p>
        <p>当前时间：{formatTime(Date.now())}</p>
        <Button onClick={testApi}>测试接口</Button>
        <TextArea placeholder="Controlled autosize" autoSize={{ minRows: 3, maxRows: 5 }} value={value} />
        <Button onClick={() => navigate('/404', { state: { from: 'home' } })}>跳转到404页面</Button>
        <Button onClick={routerTo404}>跳转到404页面</Button>
        <Link to="/404" state={{ from: 'home' }}>
          跳转到404页面
        </Link>
      </div>
    </div>
  )
}

export default Home
