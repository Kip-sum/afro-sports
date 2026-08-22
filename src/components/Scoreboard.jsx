
const Scoreboard = ({ matches = [], isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-gray-200 rounded animate-pulse" />
        ))}
      </div>
    )
  }

  if (!matches.length) {
    return (
      <p className="text-gray-500 text-center py-4">No live matches at the moment</p>
    )
  }

  return (
    <div className="space-y-3">
      {matches.map((match) => (
        <div
          key={match.id}
          className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <span className="text-red-600 font-bold text-xs">LIVE</span>
          </div>

          <div className="flex-1 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src={match.homeTeam?.logo || '/placeholder-logo.svg'}
                alt={match.homeTeam?.name}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.target.src = '/placeholder-logo.svg'
                }}
              />
              <span className="font-medium">{match.homeTeam?.shortName || match.homeTeam?.name || 'Home'}</span>
            </div>

            <div className="flex items-center space-x-2 font-bold">
              <span>{match.homeScore ?? 0}</span>
              <span className="text-gray-400">-</span>
              <span>{match.awayScore ?? 0}</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="font-medium">{match.awayTeam?.shortName || match.awayTeam?.name || 'Away'}</span>
              <img
                src={match.awayTeam?.logo || '/placeholder-logo.svg'}
                alt={match.awayTeam?.name}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.target.src = '/placeholder-logo.svg'
                }}
              />
            </div>
          </div>

          <div className="ml-4 text-xs text-gray-600">
            {match.minute ?? 'LIVE'}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Scoreboard
