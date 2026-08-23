import { Link } from 'react-router-dom'
import { Clock, Globe, Zap, Trophy, ChevronRight } from 'lucide-react'
import useLiveScores from '../hooks/useLiveScores'
import useMatches from '../hooks/useMatches'
import useNews from '../hooks/useNews'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import LiveMatchCard from '../components/LiveMatchCard'
import NewsCard from '../components/NewsCard'
import TeamCard from '../components/TeamCard'
import LeagueCard from '../components/LeagueCard'

const heroImage = 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1600&q=80'
const footballImage = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80'
const basketballImage = 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80'
const athleticsImage = 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80'
const rugbyImage = 'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=800&q=80'

const sportImages = {
  football: footballImage,
  basketball: basketballImage,
  athletics: athleticsImage,
  rugby: rugbyImage,
}

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
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
        <img
          src={heroImage}
          alt="Stadium atmosphere"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-12 max-w-2xl">
          <span className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">
            <Zap size={12} /> LIVE SPORTS COVERAGE
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
            AFRO <span className="text-gold">SPORTS</span>
          </h1>
          <p className="text-lg text-gray-200 mb-6">
            Your premier destination for African and international sports coverage.
            Live scores, breaking news, and in-depth analysis.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/live"
              className="inline-flex items-center gap-2 bg-gold text-secondary font-bold px-6 py-3 rounded-lg hover:bg-gold-dark"
            >
              Watch Live <ChevronRight size={18} />
            </Link>
            <Link
              to="/football"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white font-medium px-6 py-3 rounded-lg border border-white/30 hover:bg-white/20"
            >
              Explore Football
            </Link>
          </div>
        </div>
      </section>

      {/* Live Scores + Breaking News */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
              <span className="font-bold text-lg">LIVE NOW</span>
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
              <div className="text-center py-12">
                <p className="text-gray-500 mb-2">No live matches at the moment</p>
                <Link to="/matches" className="text-primary text-sm font-medium hover:underline">
                  View upcoming matches
                </Link>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm h-full">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={20} className="text-primary" />
              <span className="font-bold">BREAKING NEWS</span>
            </div>
            {newsLoading && <Loading />}
            {newsError && <ErrorMessage message={newsError} />}
            {!newsLoading && !newsError && (
              <>
                {news.filter((n) => n.isBreaking).map((item) => (
                  <Link
                    key={item.slug || item.id}
                    to={`/news/${item.slug || item.id}`}
                    className="block text-sm font-medium text-red-700 hover:text-red-900 py-2.5 border-b last:border-0"
                  >
                    {item.title}
                  </Link>
                ))}
                {news.filter((n) => n.isBreaking).length === 0 && (
                  <p className="text-gray-500 text-sm">No breaking news at the moment</p>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Featured Story */}
      {featuredNews && (
        <section className="relative rounded-2xl overflow-hidden shadow-lg group">
          <img
            src={featuredNews.image || footballImage}
            alt={featuredNews.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.src = footballImage }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="relative z-10 p-8 md:p-12 min-h-[300px] flex flex-col justify-end">
            <span className="text-gold text-xs font-bold uppercase tracking-wider mb-2">Featured Story</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 max-w-2xl">{featuredNews.title}</h2>
            {featuredNews.excerpt && <p className="text-gray-300 max-w-xl mb-4">{featuredNews.excerpt}</p>}
            <Link
              to={`/news/${featuredNews.slug || featuredNews.id}`}
              className="inline-flex items-center gap-2 text-gold font-medium hover:text-white"
            >
              Read full story <ChevronRight size={16} />
            </Link>
          </div>
        </section>
      )}

      {/* Sports Categories with Images */}
      <section>
        <h2 className="text-2xl font-bold mb-5">Explore Sports</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { key: 'football', name: 'Football', to: '/football' },
            { key: 'basketball', name: 'Basketball', to: '/basketball' },
            { key: 'athletics', name: 'Athletics', to: '/athletics' },
            { key: 'rugby', name: 'Rugby', to: '/rugby' },
          ].map((sport) => (
            <Link
              key={sport.key}
              to={sport.to}
              className="relative h-48 rounded-xl overflow-hidden shadow-md group"
            >
              <img
                src={sportImages[sport.key]}
                alt={sport.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => { e.target.src = footballImage }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:from-primary/80 transition-colors" />
              <div className="relative z-10 h-full flex items-end p-4">
                <span className="text-white font-bold text-lg">{sport.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Today's Matches */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold">Today's Matches</h2>
          <Link to="/matches" className="text-sm text-primary hover:underline font-medium inline-flex items-center gap-1">
            View all <ChevronRight size={14} />
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

      {/* Latest News */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold">Latest News</h2>
          <Link to="/news" className="text-sm text-primary hover:underline font-medium inline-flex items-center gap-1">
            View all <ChevronRight size={14} />
          </Link>
        </div>

        {newsLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-52 bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        )}
        {newsError && <ErrorMessage message={newsError} />}
        {!newsLoading && !newsError && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {latestNews.map((item) => (
              <NewsCard key={item.slug || item.id} news={item} />
            ))}
          </div>
        )}
      </section>

      {/* Popular Leagues & African Teams */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <div className="flex items-center gap-2 mb-5">
            <Globe size={22} className="text-primary" />
            <h2 className="text-2xl font-bold">Popular Leagues</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularLeagues.map((league) => (
              <LeagueCard key={league.id} league={league} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-5">
            <Trophy size={22} className="text-gold" />
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
