import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'

export function AdminRoute() {
  const isAdmin = useAuthStore(s => s.isAdmin)
  return isAdmin ? <Outlet /> : <Navigate to="/dashboard" replace />
}
