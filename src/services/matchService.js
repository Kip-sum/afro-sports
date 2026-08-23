import { apiRequest } from './api'

const matchService = {
  getLiveScores: async () => {
    const data = await apiRequest('/live')
    return data.liveScores || []
  },

  getMatches: async (params = {}) => {
    const query = new URLSearchParams(params).toString()
    const endpoint = query ? `/matches?${query}` : '/matches'
    const data = await apiRequest(endpoint)
    return data.matches || []
  },

  getMatchById: async (id) => {
    const data = await apiRequest(`/matches/${id}`)
    return data.match || data
  },

  getTodayMatches: async () => {
    const data = await apiRequest('/matches/today')
    return data.matches || []
  },

  getUpcomingMatches: async () => {
    const data = await apiRequest('/matches/upcoming')
    return data.matches || []
  },

  getRecentMatches: async () => {
    const data = await apiRequest('/matches/recent')
    return data.matches || []
  },

  getMatchesByTeam: async (teamId, params = {}) => {
    const query = new URLSearchParams(params).toString()
    const endpoint = query
      ? `/matches/team/${teamId}?${query}`
      : `/matches/team/${teamId}`
    const data = await apiRequest(endpoint)
    return data.matches || []
  },
}

export default matchService
