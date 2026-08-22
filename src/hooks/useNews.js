import { useState, useEffect } from 'react'
import newsService from '../services/newsService'

const useNews = (params = {}) => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const paramsKey = JSON.stringify(params)

  useEffect(() => {
    let isCancelled = false

    const fetchNews = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await newsService.getAllNews(params)
        if (!isCancelled) {
          setNews(data || [])
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message || 'Failed to fetch news')
        }
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    fetchNews()

    return () => {
      isCancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsKey])

  return { news, loading, error }
}

export default useNews
