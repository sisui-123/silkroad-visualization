import { defineStore } from 'pinia'

// Main store for culture data
export const useCultureStore = defineStore('culture', {
  state: () => ({
    cultureList: [],
    selectedCulture: null,
    loading: false,
    error: null,
  }),
  
  actions: {
    async fetchCultureList() {
      this.loading = true
      try {
        // Simulate API call - replace with actual API when available
        const response = await fetch('/api/cultures')
        const data = await response.json()
        this.cultureList = data
        this.error = null
      } catch (err) {
        this.error = err.message || 'Failed to fetch culture list'
        console.error('Error fetching culture list:', err)
      } finally {
        this.loading = false
      }
    },
    
    async fetchCultureDetail(id) {
      this.loading = true
      try {
        // Simulate API call - replace with actual API when available
        const response = await fetch(`/api/culture/${id}`)
        const data = await response.json()
        this.selectedCulture = data
        this.error = null
      } catch (err) {
        this.error = err.message || 'Failed to fetch culture details'
        console.error('Error fetching culture details:', err)
      } finally {
        this.loading = false
      }
    },
    
    setSelectedCulture(culture) {
      this.selectedCulture = culture
    }
  },
  
  getters: {
    getSelectedCulture: (state) => state.selectedCulture,
    getCultureList: (state) => state.cultureList,
    isLoading: (state) => state.loading,
    hasError: (state) => !!state.error
  }
})

// Additional stores can be added here as needed 