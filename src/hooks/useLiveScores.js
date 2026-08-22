import { useState, useEffect, useCallback } from 'react'
import matchService from '../services/matchService'

const useLiveScores = (pollingInterval = 30000) => {
  const [liveScores, setLiveScores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchLiveScores = useCallback(async () => {
    try {
      setError(null)
      const data = await matchService.getLiveScores()
      setLiveScores(data || [])
    } catch (err) {
      setError(err.message || 'Failed to fetch live scores')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let isCancelled = false
    let intervalId

    const load = async () => {
      await fetchLiveScores()
      if (!isCancelled) setLoading(false)
    }

    load()

    intervalId = setInterval(() => {
      if (!isCancelled) fetchLiveScores()
    }, pollingInterval)

    return () => {
      isCancelled = true
      clearInterval(intervalId)
    }
  }, [fetchLiveScores, pollingInterval])

  return { liveScores, loading, error, refetch: fetchLiveScores }
}

export default useLiveScores
