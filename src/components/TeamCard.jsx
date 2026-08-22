import { Link } from 'react-router-dom'

const TeamCard = ({ team, compact = false }) => {
  return (
    <Link
      to={`/teams/${team.id}`}
      className={`block bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow ${
        compact ? 'p-3' : 'p-4'
      }`}
    >
      {team.logo && (
        <img
          src={team.logo}
          alt={team.name}
          className={`${compact ? 'w-10 h-10' : 'w-16 h-16'} object-contain mx-auto mb-2`}
          onError={(e) => {
            e.target.src = '/placeholder-logo.svg'
          }}
        />
      )}
      <h3 className={`font-bold ${compact ? 'text-sm' : 'text-lg'}`}>
        {team.shortName || team.name}
      </h3>
      {!compact && (
        <p className="text-sm text-gray-500 mt-1">{team.name}</p>
      )}
      {team.league && (
        <p className="text-xs text-gray-400 mt-1">{team.league}</p>
      )}
    </Link>
  )
}

export default TeamCard
