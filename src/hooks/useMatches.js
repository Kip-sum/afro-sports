import { useState, useEffect } from 'react'
import matchService from '../services/matchService'

const useMatches = (params = {}) => {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const paramsKey = JSON.stringify(params)

  useEffect(() => {
    let isCancelled = false
    let intervalId

    const fetchMatches = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await matchService.getMatches(params)
        if (!isCancelled) {
          setMatches(data || [])
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message || 'Failed to fetch matches')
        }
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    fetchMatches()

    if (params.sport) {
      intervalId = setInterval(fetchMatches, 60000)
    }

    return () => {
      isCancelled = true
      if (intervalId) clearInterval(intervalId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsKey])

  return { matches, loading, error }
}

export default useMatches
