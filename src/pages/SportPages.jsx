import useLiveScores from '../hooks/useLiveScores'
import useMatches from '../hooks/useMatches'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import LiveMatchCard from '../components/LiveMatchCard'
import LeagueCard from '../components/LeagueCard'
import { useSearchParams } from 'react-router-dom'

const sportLeagues = {
  football: [
    { id: 1, name: 'Premier League', country: 'England', logo: null },
    { id: 2, name: 'Kenya Premier League', country: 'Kenya', logo: null },
    { id: 3, name: 'Champions League', country: 'Europe', logo: null },
    { id: 4, name: 'La Liga', country: 'Spain', logo: null },
    { id: 5, name: 'Serie A', country: 'Italy', logo: null },
    { id: 6, name: 'Bundesliga', country: 'Germany', logo: null },
    { id: 7, name: 'Ligue 1', country: 'France', logo: null },
  ],
  basketball: [
    { id: 1, name: 'NBA', country: 'USA', logo: null },
    { id: 2, name: 'EuroLeague', country: 'Europe', logo: null },
    { id: 3, name: 'Kenya Basketball League', country: 'Kenya', logo: null },
  ],
  rugby: [
    { id: 1, name: 'Rugby Championship', country: 'International', logo: null },
    { id: 2, name: 'Premiership Rugby', country: 'England', logo: null },
    { id: 3, name: 'Pro14', country: 'Europe', logo: null },
  ],
  athletics: [
    { id: 1, name: 'World Athletics', country: 'International', logo: null },
    { id: 2, name: 'Diamond League', country: 'International', logo: null },
    { id: 3, name: 'Commonwealth Games', country: 'International', logo: null },
  ],
}

const sportLabels = {
  football: 'Football',
  basketball: 'Basketball',
  rugby: 'Rugby',
  athletics: 'Athletics',
}

const SportPage = ({ sportKey }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const leagueFilter = searchParams.get('league')

  const { liveScores, loading: liveLoading } = useLiveScores()
  const {
    matches,
    loading: matchesLoading,
    error: matchesError,
  } = useMatches({ sport: sportKey, league: leagueFilter || undefined })

  const sportLiveMatches = liveScores.filter(
    (m) => !m.sport || m.sport === sportKey
  )

  const leagues = sportLeagues[sportKey] || []

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-primary">
          {sportLabels[sportKey]}
        </h1>
        <div className="flex flex-wrap gap-2">
          {leagues.map((league) => (
            <button
              key={league.id}
              onClick={() =>
                setSearchParams(
                  leagueFilter === league.name
                    ? {}
                    : { league: league.name }
                )
              }
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                leagueFilter === league.name
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {league.name}
            </button>
          ))}
        </div>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">Live Now</h2>
        {liveLoading && <Loading text="Loading live scores..." />}
        {!liveLoading && sportLiveMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sportLiveMatches.map((match) => (
              <LiveMatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          !liveLoading && <p className="text-gray-500">No live matches</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Recent & Upcoming</h2>
        {matchesLoading && <Loading text="Loading matches..." />}
        {matchesError && <ErrorMessage message={matchesError} />}
        {!matchesLoading && !matchesError && matches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.map((match) => (
              <LiveMatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          !matchesLoading && !matchesError && <p className="text-gray-500">No matches found</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Leagues</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {leagues.map((league) => (
            <LeagueCard key={league.id} league={league} />
          ))}
        </div>
      </section>
    </div>
  )
}

const Football = () => <SportPage sportKey="football" />
const Basketball = () => <SportPage sportKey="basketball" />
const Rugby = () => <SportPage sportKey="rugby" />
const Athletics = () => <SportPage sportKey="athletics" />

export { Football, Basketball, Rugby, Athletics }
export default SportPage
