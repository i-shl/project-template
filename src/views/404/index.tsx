import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Button, Result } from 'antd'
import './index.scss'

const NotFound = () => {
  // 接收上一个页面传来的参数
  const location = useLocation()
  console.log('location', location)

  // 接收URL携带的查询参数
  const [searchParams, setSearchParams] = useSearchParams()
  const from = searchParams.get('from')
  console.log('from', from)

  const navigate = useNavigate()
  const onBack = () => {
    navigate('/')
  }
  return (
    <div className="not-found">
      <Button onClick={() => setSearchParams({ from: 'aaaaaaa', ssssss: 'ddddddddddddd' })}>修改URL携带的查询参数</Button>
      <Result
        status="404"
        title="404"
        subTitle="页面未找到"
        extra={
          <Button type="primary" onClick={onBack}>
            返回首页
          </Button>
        }
      />
    </div>
  )
}
export default NotFound
