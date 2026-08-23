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
          <Link to="/" className="flex items-center gap-2.5">
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="19" fill="#d9a31a" stroke="#0f7b3f" strokeWidth="2"/>
              <path d="M12 20C12 15.58 15.58 12 20 12C24.42 12 28 15.58 28 20" stroke="#0f7b3f" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M20 12V28" stroke="#0f7b3f" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M14 26C16 24 18 23 20 23C22 23 24 24 26 26" stroke="#0f7b3f" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="20" cy="20" r="4" fill="#0f7b3f"/>
            </svg>
            <span className="text-xl font-bold tracking-wide">AFRO SPORTS</span>
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
