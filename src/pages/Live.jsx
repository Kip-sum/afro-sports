import { useState } from 'react'
import useLiveScores from '../hooks/useLiveScores'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import LiveMatchCard from '../components/LiveMatchCard'

const Live = () => {
  const [pollingInterval, setPollingInterval] = useState(30000)
  const { liveScores, loading, error, refetch } = useLiveScores(pollingInterval)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-red-600 font-bold text-2xl">●</span>
          <h1 className="text-3xl font-bold">Live Scores</h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Auto-refresh:</span>
          <select
            value={pollingInterval}
            onChange={(e) => setPollingInterval(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value={30000}>30s</option>
            <option value={60000}>1m</option>
            <option value={120000}>2m</option>
          </select>
          <button
            onClick={refetch}
            className="text-xs px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark"
          >
            Refresh now
          </button>
        </div>
      </div>

      {loading && <Loading text="Loading live scores..." size="lg" />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}

      {!loading && !error && liveScores.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveScores.map((match) => (
            <LiveMatchCard key={match.id} match={match} />
          ))}
        </div>
      )}

      {!loading && !error && liveScores.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No live matches at the moment.</p>
          <p className="text-gray-400 text-sm mt-2">
            Check back soon for live action!
          </p>
        </div>
      )}
    </div>
  )
}

export default Live
