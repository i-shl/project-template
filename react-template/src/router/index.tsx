import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import NotFound from '@/views/404'
import Home from '@/views/home'
import Login from '@/views/login'
import { useNavigate } from 'react-router-dom'
import { store } from '@/stores'

// AuthGuard 组件，用于保护其子组件，确保只有在用户已认证的情况下才会渲染子组件
const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate() // 获取 navigate 函数，用于编程式导航
  const location = useLocation() // 获取当前路径
  const isAuthenticated = !!store.getState().user.token // 检查用户是否已认证

  useEffect(() => {
    // 如果用户未认证且当前路径不是 /login，则重定向到登录页面
    if (!isAuthenticated && location.pathname !== '/login') {
      navigate('/login')
    }
  }, [isAuthenticated, navigate, location.pathname]) // 依赖项：isAuthenticated, navigate, location.pathname

  // 如果用户未认证且当前路径不是 /login，则返回 <Navigate /> 组件进行重定向
  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" />
  }

  // 如果用户已认证，则渲染子组件
  return <>{children}</>
}

const routes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '*', element: <NotFound /> }
]

const router = () => (
  <BrowserRouter>
    <Routes>
      {routes.map(route => (
        <Route key={route.path} path={route.path} element={route.path === '/login' ? route.element : <AuthGuard>{route.element}</AuthGuard>} />
      ))}
    </Routes>
  </BrowserRouter>
)

export default router
