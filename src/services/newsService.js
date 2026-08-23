import { apiRequest } from './api'

const newsService = {
  getAllNews: async (params = {}) => {
    const query = new URLSearchParams(params).toString()
    const endpoint = query ? `/news?${query}` : '/news'
    const data = await apiRequest(endpoint)
    return data.news || []
  },

  getNewsBySlug: async (slug) => {
    const data = await apiRequest(`/news/${slug}`)
    return data.news || data
  },

  getNewsByCategory: async (category, params = {}) => {
    const query = new URLSearchParams(params).toString()
    const endpoint = query ? `/news/category/${category}?${query}` : `/news/category/${category}`
    const data = await apiRequest(endpoint)
    return data.news || []
  },

  getFeaturedNews: async () => {
    const data = await apiRequest('/news/featured')
    return data.news || []
  },

  getBreakingNews: async () => {
    const data = await apiRequest('/news/breaking')
    return data.news || []
  },
}

export default newsService
