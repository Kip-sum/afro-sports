import { useParams } from 'react-router-dom'
import teamService from '../services/teamService'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

const TeamDetails = () => {
  const { id } = useParams()
  const [team, setTeam] = useState(null)
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isCancelled = false

    const fetchTeam = async () => {
      try {
        setLoading(true)
        setError(null)
        const teamData = await teamService.getTeamById(id)
        if (!isCancelled) setTeam(teamData)

        const playersData = await teamService.getPlayers(id)
        if (!isCancelled) setPlayers(playersData || [])
      } catch (err) {
        if (!isCancelled) setError(err.message || 'Failed to fetch team')
      } finally {
        if (!isCancelled) setLoading(false)
      }
    }

    fetchTeam()
  }, [id])

  if (loading) return <Loading text="Loading team..." size="lg" />
  if (error) return <ErrorMessage message={error} />
  if (!team) return <ErrorMessage message="Team not found" />

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        {team.logo && (
          <img
            src={team.logo}
            alt={team.name}
            className="w-24 h-24 object-contain"
            onError={(e) => (e.target.src = '/placeholder-logo.svg')}
          />
        )}
        <div>
          <h1 className="text-3xl font-bold text-primary">{team.name}</h1>
          {team.shortName && (
            <p className="text-gray-500">{team.shortName}</p>
          )}
          {team.country && (
            <p className="text-sm text-gray-600 mt-1">{team.country}</p>
          )}
        </div>
      </div>

      {team.league && (
        <div className="bg-gray-50 rounded-lg p-4">
          <span className="text-sm text-gray-600">League:</span>
          <span className="font-medium ml-2">{team.league}</span>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">Squad ({players.length} players)</h2>
        {players.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {players.map((player) => (
              <div
                key={player.id}
                className="bg-white border border-gray-200 rounded-lg p-4 text-center"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                  {player.photo ? (
                    <img
                      src={player.photo}
                      alt={player.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 text-xs">No photo</span>
                  )}
                </div>
                <h3 className="font-bold">{player.name}</h3>
                {player.position && (
                  <p className="text-sm text-gray-500">{player.position}</p>
                )}
                {player.jersey && (
                  <p className="text-xs text-gray-400">#{player.jersey}</p>
                )}
              </div>
            ))}
          </div>
        )}
        {players.length === 0 && !loading && (
          <p className="text-gray-500">No players data available</p>
        )}
      </div>
    </div>
  )
}

export default TeamDetails
