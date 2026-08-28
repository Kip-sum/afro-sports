import { Link, Outlet } from 'react-router-dom'
import { Newspaper, Users, Trophy, Activity, Home } from 'lucide-react'

const navItems = [
  { to: '/admin', icon: Activity, label: 'Dashboard', end: true },
  { to: '/admin/news', icon: Newspaper, label: 'News' },
  { to: '/admin/teams', icon: Users, label: 'Teams' },
  { to: '/admin/leagues', icon: Trophy, label: 'Leagues' },
]

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-secondary text-white flex flex-col">
        <div className="p-5 border-b border-white/10">
          <Link to="/" className="text-lg font-bold tracking-wide">
            AFRO SPORTS
          </Link>
          <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <Link
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
          >
            <Home size={16} />
            Back to site
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
