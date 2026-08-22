import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import useTheme from '../hooks/useTheme'

const navigation = [
  { name: 'Home', to: '/', exact: true },
  { name: 'Live', to: '/live' },
  { name: 'Football', to: '/football' },
  { name: 'Basketball', to: '/basketball' },
  { name: 'Rugby', to: '/rugby' },
  { name: 'Athletics', to: '/athletics' },
  { name: 'News', to: '/news' },
  { name: 'Teams', to: '/teams' },
  { name: 'Leagues', to: '/leagues' },
  { name: 'Standings', to: '/standings' },
  { name: 'About', to: '/about' },
]

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold tracking-wide">
            AFRO SPORTS
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navigation.map(({ name, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-gold text-secondary'
                      : 'hover:bg-primary-dark text-gray-200'
                  }`
                }
              >
                {name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-primary-dark"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-md hover:bg-primary-dark"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-1">
            {navigation.map(({ name, to }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-gold text-secondary'
                      : 'hover:bg-primary-dark text-gray-200'
                  }`
                }
              >
                {name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
