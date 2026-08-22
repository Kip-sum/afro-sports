import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'

const LiveMatchCard = ({ match }) => {
  const statusColors = {
    live: 'bg-red-500',
    'half-time': 'bg-yellow-500',
    finished: 'bg-gray-500',
    upcoming: 'bg-gray-400',
  }

  const statusColor = statusColors[match.status] || 'bg-gray-400'

  return (
    <Link
      to={`/matches/${match.id}`}
      className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-xs font-medium text-white px-2 py-0.5 rounded ${statusColor}`}
        >
          {match.status === 'live'
            ? `LIVE ${match.minute ?? ''}`
            : match.status?.toUpperCase()?.replace('-', ' ') || 'MATCH'}
        </span>
        {match.league?.name && (
          <span className="text-xs text-gray-500">{match.league.name}</span>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={match.homeTeam?.logo || '/placeholder-logo.svg'}
              alt={match.homeTeam?.name}
              className="w-6 h-6 object-contain"
              onError={(e) => {
                e.target.src = '/placeholder-logo.svg'
              }}
            />
            <span className="text-sm font-medium">
              {match.homeTeam?.shortName || match.homeTeam?.name || 'Home'}
            </span>
          </div>
          <span className="text-sm font-bold w-8 text-right">
            {match.homeScore ?? '-'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={match.awayTeam?.logo || '/placeholder-logo.svg'}
              alt={match.awayTeam?.name}
              className="w-6 h-6 object-contain"
              onError={(e) => {
                e.target.src = '/placeholder-logo.svg'
              }}
            />
            <span className="text-sm font-medium">
              {match.awayTeam?.shortName || match.awayTeam?.name || 'Away'}
            </span>
          </div>
          <span className="text-sm font-bold w-8 text-right">
            {match.awayScore ?? '-'}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <Clock size={12} />
          <span>{match.startTime ? new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
        </div>
        <div className="text-xs text-gray-400">{match.venue || ''}</div>
      </div>
    </Link>
  )
}

export default LiveMatchCard
