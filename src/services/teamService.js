import { apiRequest } from './api'

const teamService = {
  getAllTeams: async (params = {}) => {
    const query = new URLSearchParams(params).toString()
    const endpoint = query ? `/teams?${query}` : '/teams'
    const data = await apiRequest(endpoint)
    return data.teams || []
  },

  getTeamById: async (id) => {
    const data = await apiRequest(`/teams/${id}`)
    return data.team || data
  },

  getTeamsByLeague: async (leagueId, params = {}) => {
    const query = new URLSearchParams(params).toString()
    const endpoint = query
      ? `/teams/league/${leagueId}?${query}`
      : `/teams/league/${leagueId}`
    const data = await apiRequest(endpoint)
    return data.teams || []
  },

  getPlayers: async (teamId) => {
    const data = await apiRequest(`/teams/${teamId}/players`)
    return data.players || []
  },
}

export default teamService
