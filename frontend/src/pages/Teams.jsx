import { useState, useEffect, useMemo } from 'react'
import { Search } from 'lucide-react'
import teamService from '../services/teamService'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import TeamCard from '../components/TeamCard'

const Teams = () => {
  const [teams, setTeams] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isCancelled = false

    const fetchTeams = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await teamService.getAllTeams()
        if (!isCancelled) setTeams(data || [])
      } catch (err) {
        if (!isCancelled) setError(err.message || 'Failed to fetch teams')
      } finally {
        if (!isCancelled) setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  const filteredTeams = useMemo(() => {
    if (searchTerm.trim() === '') return teams
    return teams.filter((team) =>
      team.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.shortName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.country?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [teams, searchTerm])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Teams</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {loading && <Loading text="Loading teams..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          {filteredTeams.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredTeams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              {searchTerm ? 'No teams found matching your search' : 'No teams available'}
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default Teams
