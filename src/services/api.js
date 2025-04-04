import axios from 'axios'

// Create axios instance with default configuration
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Response interceptor for error handling
instance.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response || error)
    return Promise.reject(error)
  }
)

// API endpoints
export default {
  // Culture related endpoints
  culture: {
    getList() {
      return instance.get('/culture/list')
    },
    getDetail(id) {
      return instance.get(`/culture/detail/${id}`)
    }
  },
  
  // Map related endpoints
  map: {
    getSilkRoadData() {
      return instance.get('/map/silkroad')
    },
    getCities() {
      return instance.get('/map/cities')
    },
    getRoutes() {
      return instance.get('/map/routes')
    }
  },
  
  // Timeline related endpoints
  timeline: {
    getEvents() {
      return instance.get('/timeline/events')
    },
    getDynasties() {
      return instance.get('/timeline/dynasties')
    }
  },
  
  // Analysis related endpoints
  analysis: {
    getTradeData() {
      return instance.get('/analysis/trade')
    },
    getCulturalExchangeData() {
      return instance.get('/analysis/cultural-exchange')
    }
  }
} 