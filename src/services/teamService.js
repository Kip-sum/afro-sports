import { apiRequest } from './api'

const teamService = {
  getAllTeams: async (params = {}) => {
    const query = new URLSearchParams(params).toString()
    const endpoint = query ? `/teams?${query}` : '/teams'
    return apiRequest(endpoint)
  },

  getTeamById: async (id) => {
    return apiRequest(`/teams/${id}`)
  },

  getTeamsByLeague: async (leagueId, params = {}) => {
    const query = new URLSearchParams(params).toString()
    const endpoint = query
      ? `/teams/league/${leagueId}?${query}`
      : `/teams/league/${leagueId}`
    return apiRequest(endpoint)
  },

  getPlayers: async (teamId) => {
    return apiRequest(`/teams/${teamId}/players`)
  },
}

export default teamService
