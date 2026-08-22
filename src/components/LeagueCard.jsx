import { Link } from 'react-router-dom'

const LeagueCard = ({ league }) => {
  return (
    <Link
      to={`/leagues/${league.id}`}
      className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow group"
    >
      {league.logo && (
        <img
          src={league.logo}
          alt={league.name}
          className="w-12 h-12 object-contain mx-auto mb-3 group-hover:scale-105 transition-transform"
          onError={(e) => {
            e.target.src = '/placeholder-logo.svg'
          }}
        />
      )}
      <h3 className="font-bold text-center text-lg group-hover:text-primary transition-colors">
        {league.name}
      </h3>
      {league.country && (
        <p className="text-sm text-gray-500 text-center mt-1">{league.country}</p>
      )}
      {league.sport && (
        <p className="text-xs text-gray-400 text-center mt-1 uppercase">
          {league.sport}
        </p>
      )}
    </Link>
  )
}

export default LeagueCard
