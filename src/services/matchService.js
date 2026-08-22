import { apiRequest } from './api'

const matchService = {
  getLiveScores: async () => {
    return apiRequest('/live')
  },

  getMatches: async (params = {}) => {
    const query = new URLSearchParams(params).toString()
    const endpoint = query ? `/matches?${query}` : '/matches'
    return apiRequest(endpoint)
  },

  getMatchById: async (id) => {
    return apiRequest(`/matches/${id}`)
  },

  getTodayMatches: async () => {
    return apiRequest('/matches/today')
  },

  getUpcomingMatches: async () => {
    return apiRequest('/matches/upcoming')
  },

  getRecentMatches: async () => {
    return apiRequest('/matches/recent')
  },

  getMatchesByTeam: async (teamId, params = {}) => {
    const query = new URLSearchParams(params).toString()
    const endpoint = query
      ? `/matches/team/${teamId}?${query}`
      : `/matches/team/${teamId}`
    return apiRequest(endpoint)
  },
}

export default matchService
