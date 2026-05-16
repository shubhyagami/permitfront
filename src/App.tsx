import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { RetroLayout } from './components/layout/RetroLayout'
import { ProtectedRoute } from './components/layout/ProtectedRoute'
import { AdminRoute } from './components/layout/AdminRoute'
import { SplashPage } from './pages/SplashPage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { DashboardPage } from './pages/DashboardPage'
import { UploadPage } from './pages/UploadPage'
import { ExpiringPage } from './pages/ExpiringPage'
import { ProfilePage } from './pages/ProfilePage'
import { EditProfilePage } from './pages/EditProfilePage'
import { EditDocumentPage } from './pages/EditDocumentPage'
import { AdminDashboardPage } from './pages/AdminDashboardPage'
import { AdminUserDetailPage } from './pages/AdminUserDetailPage'
import { AdminDocumentsPage } from './pages/AdminDocumentsPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { AppNavbar } from './components/layout/AppNavbar'

function AnimatedRoutes() {
  const location = useLocation()
  const isAuth = ['/login', '/signup'].includes(location.pathname) || location.pathname === '/'

  return (
    <>
      {!isAuth && <AppNavbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SplashPage />
            </motion.div>
          } />
          <Route path="/login" element={
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.2 }}>
              <RetroLayout showRain><LoginPage /></RetroLayout>
            </motion.div>
          } />
          <Route path="/signup" element={
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.2 }}>
              <RetroLayout><SignupPage /></RetroLayout>
            </motion.div>
          } />

          <Route element={<ProtectedRoute />}>
            {[
              { path: '/dashboard', el: <DashboardPage /> },
              { path: '/upload', el: <UploadPage /> },
              { path: '/expiring', el: <ExpiringPage /> },
              { path: '/profile', el: <ProfilePage /> },
              { path: '/profile/edit', el: <EditProfilePage /> },
              { path: '/documents/:id/edit', el: <EditDocumentPage /> },
            ].map(r => (
              <Route key={r.path} path={r.path} element={
                <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.2 }}>
                  {r.el}
                </motion.div>
              } />
            ))}
          </Route>

          <Route element={<AdminRoute />}>
            {[
              { path: '/admin', el: <AdminDashboardPage /> },
              { path: '/admin/users/:id', el: <AdminUserDetailPage /> },
              { path: '/admin/documents', el: <AdminDocumentsPage /> },
            ].map(r => (
              <Route key={r.path} path={r.path} element={
                <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.2 }}>
                  {r.el}
                </motion.div>
              } />
            ))}
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#121828',
            color: '#fff',
            border: '1px solid rgba(0,229,255,0.2)',
            borderRadius: '12px',
            fontFamily: 'Work Sans, sans-serif',
            fontSize: '14px',
          },
        }}
      />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
