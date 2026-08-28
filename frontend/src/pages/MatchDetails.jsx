import { useParams } from 'react-router-dom'
import { Calendar, MapPin, Clock, Users } from 'lucide-react'
import matchService from '../services/matchService'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

const MatchDetails = () => {
  const { id } = useParams()
  const [match, setMatch] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isCancelled = false

    const fetchMatch = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await matchService.getMatchById(id)
        if (!isCancelled) setMatch(data)
      } catch (err) {
        if (!isCancelled) setError(err.message || 'Failed to fetch match')
      } finally {
        if (!isCancelled) setLoading(false)
      }
    }

    fetchMatch()
  }, [id])

  if (loading) return <Loading text="Loading match details..." size="lg" />
  if (error) return <ErrorMessage message={error} />
  if (!match) return <ErrorMessage message="Match not found" />

  const homeScore = match.homeScore ?? 0
  const awayScore = match.awayScore ?? 0

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">{match.league?.name}</h1>
        <span
          className={`px-3 py-1 rounded text-xs font-bold text-white ${
            match.status === 'live'
              ? 'bg-red-500'
              : match.status === 'finished'
                ? 'bg-gray-500'
                : 'bg-gray-400'
          }`}
        >
          {match.status === 'live'
            ? `LIVE ${match.minute ?? ''}`
            : match.status?.toUpperCase() || 'UPCOMING'}
        </span>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img
              src={match.homeTeam?.logo || '/placeholder-logo.svg'}
              alt={match.homeTeam?.name}
              className="w-16 h-16 object-contain"
              onError={(e) => (e.target.src = '/placeholder-logo.svg')}
            />
            <div className="text-right">
              <h2 className="font-bold text-xl">
                {match.homeTeam?.shortName || match.homeTeam?.name || 'Home'}
              </h2>
              {match.homeTeam?.name && (
                <p className="text-sm text-gray-500">{match.homeTeam.name}</p>
              )}
            </div>
          </div>

          <div className="text-5xl font-bold">
            {homeScore} - {awayScore}
          </div>

          <div className="flex items-center gap-4">
            <div className="text-left">
              <h2 className="font-bold text-xl">
                {match.awayTeam?.shortName || match.awayTeam?.name || 'Away'}
              </h2>
              {match.awayTeam?.name && (
                <p className="text-sm text-gray-500">{match.awayTeam.name}</p>
              )}
            </div>
            <img
              src={match.awayTeam?.logo || '/placeholder-logo.svg'}
              alt={match.awayTeam?.name}
              className="w-16 h-16 object-contain"
              onError={(e) => (e.target.src = '/placeholder-logo.svg')}
            />
          </div>
        </div>

        {match.minute && (
          <div className="text-center mb-4">
            <span className="text-sm font-medium bg-red-100 text-red-800 px-3 py-1 rounded-full">
              {match.minute}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar size={16} />
          <span>
            {match.startTime
              ? new Date(match.startTime).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'TBD'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock size={16} />
          <span>
            {match.startTime
              ? new Date(match.startTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'TBD'}
          </span>
        </div>
        {match.venue && (
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={16} />
            <span>{match.venue}</span>
          </div>
        )}
        {match.league?.logo && (
          <div className="flex items-center gap-2 text-gray-600">
            <img
              src={match.league.logo}
              alt={match.league.name}
              className="w-5 h-5 object-contain"
            />
            <span>{match.league.name}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-gray-600">
          <Users size={16} />
          <span>Referee: {match.referee || 'TBD'}</span>
        </div>
      </div>

      {match.events && match.events.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Match Events</h3>
          <div className="space-y-2">
            {match.events.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg"
              >
                <span className="text-sm font-medium w-12">
                  {event.minute}
                  {event.extraMinute ? `+${event.extraMinute}` : ''}'
                </span>
                <span className="text-sm">{event.type}</span>
                <span className="text-sm">
                  {event.team} - {event.player}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {match.lineups && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Lineups</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">
                {match.homeTeam?.shortName || 'Home'} XI
              </h4>
              <div className="space-y-1">
                {match.lineups.home?.startingXI?.map((player) => (
                  <div key={player.id} className="text-sm p-2 border-b">
                    {player.position && (
                      <span className="text-gray-400 mr-2">
                        {player.position}
                      </span>
                    )}
                    {player.name}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">
                {match.awayTeam?.shortName || 'Away'} XI
              </h4>
              <div className="space-y-1">
                {match.lineups.away?.startingXI?.map((player) => (
                  <div key={player.id} className="text-sm p-2 border-b">
                    {player.position && (
                      <span className="text-gray-400 mr-2">
                        {player.position}
                      </span>
                    )}
                    {player.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MatchDetails
