import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Sports: [
      { name: 'Football', to: '/football' },
      { name: 'Basketball', to: '/basketball' },
      { name: 'Rugby', to: '/rugby' },
      { name: 'Athletics', to: '/athletics' },
    ],
    Pages: [
      { name: 'Live Scores', to: '/live' },
      { name: 'News', to: '/news' },
      { name: 'Teams', to: '/teams' },
      { name: 'Leagues', to: '/leagues' },
      { name: 'Standings', to: '/standings' },
      { name: 'About', to: '/about' },
    ],
    Legal: [
      { name: 'Privacy Policy', to: '/privacy' },
      { name: 'Terms of Service', to: '/terms' },
      { name: 'Contact', to: '/contact' },
    ],
  }

  return (
    <footer className="bg-secondary text-gray-300 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">AFRO SPORTS</h3>
            <p className="text-sm">Your premier destination for African and international sports coverage.</p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-3">{category}</h4>
              <ul className="space-y-2">
                {links.map(({ name, to }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-sm hover:text-gold transition-colors"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-4 text-center text-sm">
          &copy; {currentYear} Afro Sports. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
