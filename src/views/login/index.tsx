import React from 'react'
import { Button, Card, Form, Input, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import { store } from '@/stores'
import { login } from '@/stores/user'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onReset = () => {
    form.resetFields()
  }
  const onFinish = () => {
    store.dispatch(login({ name: 'admin', token: '123456' }))
    navigate('/')
    onReset()
  }

  const formProps = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
    onFinish,
    form
  }

  const tailLayout = {
    wrapperCol: { offset: 4, span: 20 }
  }

  return (
    <div className="login-box">
      <Card title="登录" style={{ width: 500 }}>
        <Form {...formProps}>
          <Form.Item label="账号" name="username" rules={[{ required: true, message: '请输入账号' }]}>
            <Input placeholder="请输入账号" allowClear />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password placeholder="请输入密码" allowClear />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Button htmlType="button" onClick={onReset}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
