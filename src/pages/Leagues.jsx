import { useState, useEffect, useMemo } from 'react'
import { Search } from 'lucide-react'
import teamService from '../services/teamService'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import LeagueCard from '../components/LeagueCard'

const Leagues = () => {
  const [leagues, setLeagues] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isCancelled = false

    const fetchLeagues = async () => {
      try {
        setLoading(true)
        setError(null)
        const teams = await teamService.getAllTeams()
        const uniqueLeagues = []
        const seen = new Set()
        teams.forEach((team) => {
          if (team.league && !seen.has(team.league)) {
            seen.add(team.league)
            uniqueLeagues.push({
              id: team.leagueId || team.league,
              name: team.league,
              country: team.country,
              sport: team.sport || 'football',
            })
          }
        })
        if (!isCancelled) setLeagues(uniqueLeagues)
      } catch (err) {
        if (!isCancelled) setError(err.message || 'Failed to fetch leagues')
      } finally {
        if (!isCancelled) setLoading(false)
      }
    }

    fetchLeagues()
  }, [])

  const filteredLeagues = useMemo(() => {
    if (searchTerm.trim() === '') return leagues
    return leagues.filter(
      (league) =>
        league.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        league.country?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [leagues, searchTerm])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Leagues</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search leagues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {loading && <Loading text="Loading leagues..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          {filteredLeagues.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredLeagues.map((league) => (
                <LeagueCard key={league.id} league={league} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              {searchTerm ? 'No leagues found matching your search' : 'No leagues available'}
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default Leagues
