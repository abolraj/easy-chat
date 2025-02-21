import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import MainLayout from './components/layout/MainLayout'
import AuthLayout from './components/layout/AuthLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import ChatHome from './pages/Chat/ChatHome'
import ConversationPage from './pages/Chat/ConversationPage'
import { ChatProvider } from './contexts/ChatContext'

export default function App() {
  const { user, loading } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {!user ?
          <Route element={<AuthLayout />}>
            <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} />
          </Route>
          :
          <Route element={<MainLayout />}>
            <Route path="/chat" element={<ChatHome />} />
            <Route path="/chat/:conversationId" element={
              <ChatProvider>
                <ConversationPage />
              </ChatProvider>
            } />
          </Route>
        }

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
