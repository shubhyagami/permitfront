import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, Upload, AlertTriangle, User } from 'lucide-react'

interface Props {
  expiringCount: number
  hidden?: boolean
}

export function BottomNav({ expiringCount, hidden }: Props) {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname

  const tabs = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Upload, label: 'Upload', path: '/upload' },
    { icon: AlertTriangle, label: 'Expiring', path: '/expiring', badge: expiringCount > 0 },
    { icon: User, label: 'Profile', path: '/profile' },
  ]

  if (hidden) return null

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-navy-dark border-t border-br-cyan/20 z-30 flex items-center justify-around px-2">
      {tabs.map(tab => (
        <button
          key={tab.path}
          onClick={() => navigate(tab.path)}
          className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1 rounded-lg transition-all duration-200 relative ${
            path === tab.path || (tab.path !== '/' && path.startsWith(tab.path))
              ? 'text-br-cyan'
              : 'text-olive/60 hover:text-br-cyan/70'
          }`}
        >
          {tab.badge && (
            <span className="absolute -top-0.5 right-1 w-2 h-2 rounded-full bg-br-amber blade-glow-amber" />
          )}
          <tab.icon className="w-5 h-5" />
          <span className="font-space text-[9px] uppercase tracking-wider">{tab.label}</span>
          {(path === tab.path || (tab.path !== '/' && path.startsWith(tab.path))) && (
            <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-br-cyan" />
          )}
        </button>
      ))}
    </nav>
  )
}
