const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `HTTP error! status: ${response.status}`)
  }
  return response.json()
}

const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  const token = localStorage.getItem('token')

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const config = {
    ...options,
    headers,
  }

  try {
    const response = await fetch(url, config)
    return await handleResponse(response)
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('Network error: Unable to reach the server')
    }
    throw error
  }
}

export { apiRequest, API_BASE_URL }
