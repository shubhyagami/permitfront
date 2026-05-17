import { useNavigate, useLocation } from 'react-router-dom'
import { LogOut, LayoutDashboard, Upload, AlertTriangle, Crown, User, Shield } from 'lucide-react'
import { useAuthStore } from '../../store/auth.store'
import { AvatarCircle } from '../ui/AvatarCircle'

export function AppNavbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout, isAdmin } = useAuthStore()
  const path = location.pathname

  const isActive = (p: string) => path === p || path.startsWith(p + '/')

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-navy-dark flex-col z-40">
        <div className="p-6 border-b border-br-cyan/20">
          <h1 className="font-orbitron text-xl font-bold text-white tracking-wider">
            PERMIT<span className="text-br-cyan">IQ</span>
          </h1>
          <div className="w-12 h-0.5 bg-br-cyan mt-2 blade-glow" />
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
            { icon: Upload, label: 'Upload', path: '/upload' },
            { icon: AlertTriangle, label: 'Expiring', path: '/expiring' },
            { icon: Crown, label: 'Premium', path: '/subscription' },
            { icon: User, label: 'Profile', path: '/profile' },
            ...(isAdmin ? [{ icon: Shield, label: 'Admin', path: '/admin' }] : []),
          ].map(item => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-space text-xs uppercase tracking-wider transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-teal/20 text-teal border border-teal/30'
                  : 'text-olive hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-br-cyan/20">
          {user && (
            <div className="flex items-center gap-3 mb-3">
              <AvatarCircle name={user.name} size={32} />
              <div className="flex-1 min-w-0">
                <p className="font-worksans text-sm text-white truncate">{user.name}</p>
                <p className="font-space text-[10px] text-olive uppercase tracking-wider">
                  {isAdmin ? 'Admin' : 'User'}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={() => { logout(); navigate('/login') }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-space text-xs uppercase tracking-wider text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-navy-dark border-b border-br-cyan/20 z-30 flex items-center justify-between px-4">
        <h1 className="font-orbitron text-lg font-bold text-white">
          PERMIT<span className="text-br-cyan">IQ</span>
        </h1>
        {user && (
          <div className="flex items-center gap-3">
            <span className="font-worksans text-sm text-white/70 hidden sm:block">{user.name}</span>
            <AvatarCircle name={user.name} size={30} />
          </div>
        )}
      </div>
    </>
  )
}
