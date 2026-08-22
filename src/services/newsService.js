import { apiRequest } from './api'

const newsService = {
  getAllNews: async (params = {}) => {
    const query = new URLSearchParams(params).toString()
    const endpoint = query ? `/news?${query}` : '/news'
    return apiRequest(endpoint)
  },

  getNewsBySlug: async (slug) => {
    return apiRequest(`/news/${slug}`)
  },

  getNewsByCategory: async (category, params = {}) => {
    const query = new URLSearchParams(params).toString()
    const endpoint = query ? `/news/category/${category}?${query}` : `/news/category/${category}`
    return apiRequest(endpoint)
  },

  getFeaturedNews: async () => {
    return apiRequest('/news/featured')
  },

  getBreakingNews: async () => {
    return apiRequest('/news/breaking')
  },
}

export default newsService
