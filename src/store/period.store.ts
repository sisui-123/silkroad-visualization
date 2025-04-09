import { defineStore } from 'pinia'

// 添加 PeriodId 类型定义并导出
export type PeriodId = 'qin' | 'han' | 'tang' | 'song' | 'yuan' | 'ming' | 'qing';

export const usePeriodStore = defineStore('period', {
  state: () => ({
    currentPeriod: 'tang' as PeriodId,
    periods: [
      { id: 'qin' as PeriodId, name: '秦代', timeRange: '前221-前207年' },
      { id: 'han' as PeriodId, name: '汉代', timeRange: '前202-220年' },
      { id: 'tang' as PeriodId, name: '唐代', timeRange: '618-907年' },
      { id: 'song' as PeriodId, name: '宋代', timeRange: '960-1279年' },
      { id: 'yuan' as PeriodId, name: '元代', timeRange: '1271-1368年' },
      { id: 'ming' as PeriodId, name: '明代', timeRange: '1368-1644年' },
      { id: 'qing' as PeriodId, name: '清代', timeRange: '1644-1912年' }
    ]
  }),
  
  getters: {
    currentPeriodInfo: (state) => {
      return state.periods.find(p => p.id === state.currentPeriod)
    }
  },
  
  actions: {
    setPeriod(periodId) {
      if (this.periods.some(p => p.id === periodId)) {
        this.currentPeriod = periodId
      } else {
        console.error(`未知的朝代ID: ${periodId}`)
      }
    }
  }
})