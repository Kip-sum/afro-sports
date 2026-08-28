import { useParams } from 'react-router-dom'
import { Trophy, Calendar, MapPin } from 'lucide-react'
import teamService from '../services/teamService'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import TeamCard from '../components/TeamCard'

const LeagueDetails = () => {
  const { id } = useParams()
  const [league, setLeague] = useState(null)
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isCancelled = false

    const fetchLeague = async () => {
      try {
        setLoading(true)
        setError(null)
        const leagueData = await teamService.getAllTeams({ leagueId: id })
        if (!isCancelled) setLeague(leagueData.league || leagueData[0]?.league)
        if (!isCancelled) setTeams(leagueData.teams || leagueData || [])
      } catch (err) {
        if (!isCancelled) setError(err.message || 'Failed to fetch league')
      } finally {
        if (!isCancelled) setLoading(false)
      }
    }

    fetchLeague()
  }, [id])

  if (loading) return <Loading text="Loading league..." size="lg" />
  if (error) return <ErrorMessage message={error} />
  if (!league) return <ErrorMessage message="League not found" />

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        {league.logo && (
          <img
            src={league.logo}
            alt={league.name}
            className="w-20 h-20 object-contain"
            onError={(e) => (e.target.src = '/placeholder-logo.svg')}
          />
        )}
        <div>
          <h1 className="text-3xl font-bold text-primary">{league.name}</h1>
          {league.country && (
            <p className="text-gray-600 mt-1">{league.country}</p>
          )}
          {league.sport && (
            <p className="text-sm text-gray-500 uppercase">{league.sport}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600">
        {league.season && (
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>Season: {league.season}</span>
          </div>
        )}
        {league.country && (
          <div className="flex items-center gap-1">
            <MapPin size={16} />
            <span>{league.country}</span>
          </div>
        )}
        {league.teamsCount && (
          <div className="flex items-center gap-1">
            <Trophy size={16} />
            <span>{league.teamsCount} teams</span>
          </div>
        )}
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">Teams</h2>
        {teams.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {teams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        )}
        {teams.length === 0 && !loading && (
          <p className="text-gray-500">No teams found in this league</p>
        )}
      </section>
    </div>
  )
}

export default LeagueDetails
