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
          <Link to="/" className="flex items-center gap-3 group">
            <svg width="42" height="42" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Background circle */}
              <circle cx="25" cy="25" r="24" fill="#d9a31a" stroke="#0f7b3f" strokeWidth="2"/>
              {/* Football/Soccer ball */}
              <circle cx="25" cy="22" r="10" fill="white" stroke="#0f7b3f" strokeWidth="1.5"/>
              {/* Pentagon pattern on ball */}
              <path d="M25 16L28 19L27 23L23 23L22 19Z" fill="#0f7b3f"/>
              <path d="M25 16L22 19H28Z" fill="none" stroke="#0f7b3f" strokeWidth="0.5"/>
              <path d="M28 19L27 23L29.5 26" fill="none" stroke="#0f7b3f" strokeWidth="0.5"/>
              <path d="M22 19L23 23L20.5 26" fill="none" stroke="#0f7b3f" strokeWidth="0.5"/>
              {/* Sportsman silhouette */}
              <circle cx="25" cy="36" r="3" fill="#0f7b3f"/>
              <path d="M25 39V43M22 41H28M25 39L22 43M25 39L28 43" stroke="#0f7b3f" strokeWidth="1.5" strokeLinecap="round"/>
              {/* Basketball arc */}
              <path d="M14 18C16 12 20 9 25 9" stroke="#0f7b3f" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              <path d="M36 18C34 12 30 9 25 9" stroke="#0f7b3f" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            </svg>
            <span className="text-xl font-bold tracking-wide text-white" style={{ fontFamily: "'Z003', cursive" }}>AFRO SPORTS</span>
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
                style={{ fontFamily: "'Z003', cursive" }}
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
                style={{ fontFamily: "'Z003', cursive" }}
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
