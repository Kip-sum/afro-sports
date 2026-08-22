import { Link } from 'react-router-dom'
import { TrendingUp, Clock, Globe } from 'lucide-react'
import useLiveScores from '../hooks/useLiveScores'
import useMatches from '../hooks/useMatches'
import useNews from '../hooks/useNews'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import LiveMatchCard from '../components/LiveMatchCard'
import NewsCard from '../components/NewsCard'
import TeamCard from '../components/TeamCard'
import LeagueCard from '../components/LeagueCard'

const Home = () => {
  const { liveScores, loading: liveLoading, error: liveError } = useLiveScores()
  const {
    matches: todayMatches,
    loading: matchesLoading,
    error: matchesError,
  } = useMatches({ date: 'today' })
  const { news, loading: newsLoading, error: newsError } = useNews({ featured: true })

  const featuredNews = news.find((n) => n.isFeatured)
  const latestNews = news.filter((n) => !n.isFeatured)

  const popularLeagues = [
    { id: 1, name: 'Premier League', country: 'England' },
    { id: 2, name: 'Kenya Premier League', country: 'Kenya' },
    { id: 3, name: 'Champions League', country: 'Europe' },
    { id: 4, name: 'NBA', country: 'USA' },
  ]

  const africanTeams = [
    { id: 1, name: 'Gor Mahia', shortName: 'Gor Mahia', country: 'Kenya', league: 'Kenya Premier League' },
    { id: 2, name: 'AFC Leopards', shortName: 'AFC Leop', country: 'Kenya', league: 'Kenya Premier League' },
    { id: 3, name: 'Al Ahly', shortName: 'Al Ahly', country: 'Egypt', league: 'Egyptian Premier League' },
    { id: 4, name: 'TP Mazembe', shortName: 'TP Maz', country: 'DR Congo', league: 'Linafoot' },
  ]

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">AFRO SPORTS</h1>
        <p className="text-gray-600 text-lg">Your premier destination for African and international sports coverage.</p>
      </section>

      <section>
        {newsLoading && <Loading text="Loading news..." />}
        {newsError && <ErrorMessage message={newsError} />}
        {!newsLoading && !newsError && featuredNews && (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="flex items-center gap-2 p-4 border-b">
              <TrendingUp size={20} className="text-gold" />
              <span className="font-bold text-sm">FEATURED STORY</span>
            </div>
            <NewsCard news={featuredNews} featured={true} />
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-red-600 font-bold text-lg">● LIVE</span>
              <span className="text-sm text-gray-600">NOW</span>
            </div>

            {liveLoading && <Loading text="Loading live scores..." />}
            {liveError && <ErrorMessage message={liveError} />}
            {!liveLoading && !liveError && liveScores.length > 0 && (
              <div className="space-y-3">
                {liveScores.slice(0, 5).map((match) => (
                  <LiveMatchCard key={match.id} match={match} />
                ))}
              </div>
            )}
            {!liveLoading && !liveError && liveScores.length === 0 && (
              <p className="text-gray-500 text-center py-8">No live matches at the moment</p>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm h-full">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={20} className="text-primary" />
              <span className="font-bold">BREAKING NEWS</span>
            </div>
            {!newsLoading && !newsError && (
              <>
                {news.filter((n) => n.isBreaking).map((item) => (
                  <Link
                    key={item.slug || item.id}
                    to={`/news/${item.slug || item.id}`}
                    className="block text-sm font-medium text-red-700 hover:text-red-900 py-2 border-b last:border-0"
                  >
                    {item.title}
                  </Link>
                ))}
                {news.filter((n) => n.isBreaking).length === 0 && (
                  <p className="text-gray-500 text-sm">No breaking news</p>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Today's Matches</h2>
          <Link
            to="/matches"
            className="text-sm text-primary hover:underline font-medium"
          >
            View all
          </Link>
        </div>

        {matchesLoading && <Loading text="Loading matches..." />}
        {matchesError && <ErrorMessage message={matchesError} />}
        {!matchesLoading && !matchesError && todayMatches.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todayMatches.map((match) => (
              <LiveMatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
        {!matchesLoading && !matchesError && todayMatches.length === 0 && (
          <p className="text-gray-500">No matches scheduled for today</p>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Latest News</h2>
          <Link
            to="/news"
            className="text-sm text-primary hover:underline font-medium"
          >
            View all
          </Link>
        </div>

        {newsLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        )}
        {newsError && <ErrorMessage message={newsError} />}
        {!newsLoading && !newsError && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestNews.map((item) => (
              <NewsCard key={item.slug || item.id} news={item} />
            ))}
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Globe size={20} className="text-primary" />
            <h2 className="text-2xl font-bold">Popular Leagues</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularLeagues.map((league) => (
              <LeagueCard key={league.id} league={league} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-gold" />
            <h2 className="text-2xl font-bold">African Teams</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {africanTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
