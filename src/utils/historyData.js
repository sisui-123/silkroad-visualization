// 历史时期数据结构定义
export const historicalPeriods = {
  WESTERN_ZHOU: {
    id: 'western_zhou',
    name: '西周',
    timeRange: {
      start: -1046,
      end: -771
    },
    silkRoadRelevance: 30,
    economicIndicators: {
      tradeVolume: 100000,
      urbanization: 15,
      population: 5000000
    },
    culturalIndicators: {
      culturalExchange: 40,
      technologicalAdvancement: 30,
      artisticDevelopment: 35
    },
    majorEvents: [
      { year: -1046, event: '周武王建立周朝' },
      { year: -1020, event: '周公制礼作乐' },
      { year: -771, event: '犬戎攻破镐京' }
    ]
  },
  QIN: {
    id: 'qin',
    name: '秦朝',
    timeRange: {
      start: -221,
      end: -206
    },
    silkRoadRelevance: 60,
    economicIndicators: {
      tradeVolume: 300000,
      urbanization: 25,
      population: 20000000
    },
    culturalIndicators: {
      culturalExchange: 50,
      technologicalAdvancement: 60,
      artisticDevelopment: 45
    },
    majorEvents: [
      { year: -221, event: '秦始皇统一中国' },
      { year: -214, event: '修建长城' },
      { year: -210, event: '秦始皇东巡' }
    ]
  },
  HAN_TANG: {
    id: 'han_tang',
    name: '汉唐',
    timeRange: {
      start: -202,
      end: 907
    },
    silkRoadRelevance: 90,
    economicIndicators: {
      tradeVolume: 1000000,
      urbanization: 40,
      population: 50000000
    },
    culturalIndicators: {
      culturalExchange: 85,
      technologicalAdvancement: 75,
      artisticDevelopment: 80
    },
    majorEvents: [
      { year: -138, event: '张骞出使西域' },
      { year: 73, event: '班超经营西域' },
      { year: 618, event: '唐朝建立' },
      { year: 629, event: '玄奘西行' }
    ]
  },
  SONG_YUAN: {
    id: 'song_yuan',
    name: '宋元',
    timeRange: {
      start: 960,
      end: 1368
    },
    silkRoadRelevance: 85,
    economicIndicators: {
      tradeVolume: 2000000,
      urbanization: 50,
      population: 80000000
    },
    culturalIndicators: {
      culturalExchange: 80,
      technologicalAdvancement: 85,
      artisticDevelopment: 90
    },
    majorEvents: [
      { year: 960, event: '宋朝建立' },
      { year: 1271, event: '元朝建立' },
      { year: 1275, event: '马可·波罗到达中国' }
    ]
  },
  MODERN: {
    id: 'modern',
    name: '现代',
    timeRange: {
      start: 1949,
      end: 2024
    },
    silkRoadRelevance: 95,
    economicIndicators: {
      tradeVolume: 5000000,
      urbanization: 70,
      population: 1400000000
    },
    culturalIndicators: {
      culturalExchange: 90,
      technologicalAdvancement: 95,
      artisticDevelopment: 85
    },
    majorEvents: [
      { year: 1949, event: '中华人民共和国成立' },
      { year: 2013, event: '一带一路倡议提出' },
      { year: 2020, event: '中欧班列开通' }
    ]
  }
}

// IndexedDB 数据库配置
const DB_NAME = 'historyDB'
const DB_VERSION = 1
const STORE_NAME = 'historicalPeriods'

// 初始化数据库
export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' })
        store.createIndex('timeRange', 'timeRange', { unique: false })
      }
    }
  })
}

// 保存数据到IndexedDB
export const saveToDB = async (data) => {
  const db = await initDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.put(data)

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// 从IndexedDB读取数据
export const loadFromDB = async () => {
  const db = await initDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.getAll()

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// 时期对比算法
export const comparePeriods = (period1, period2) => {
  const weights = {
    silkRoadRelevance: 0.3,
    economicIndicators: 0.4,
    culturalIndicators: 0.3
  }

  // 计算经济指标得分
  const economicScore = calculateEconomicScore(period1, period2)
  
  // 计算文化指标得分
  const culturalScore = calculateCulturalScore(period1, period2)
  
  // 计算丝绸之路相关度得分
  const relevanceScore = Math.abs(period1.silkRoadRelevance - period2.silkRoadRelevance) / 100

  // 计算总分
  const totalScore = 
    economicScore * weights.economicIndicators +
    culturalScore * weights.culturalIndicators +
    relevanceScore * weights.silkRoadRelevance

  return {
    totalScore,
    details: {
      economicScore,
      culturalScore,
      relevanceScore
    }
  }
}

// 计算经济指标得分
const calculateEconomicScore = (period1, period2) => {
  const indicators = ['tradeVolume', 'urbanization', 'population']
  let totalScore = 0

  indicators.forEach(indicator => {
    const value1 = period1.economicIndicators[indicator]
    const value2 = period2.economicIndicators[indicator]
    const maxValue = Math.max(value1, value2)
    const minValue = Math.min(value1, value2)
    
    if (maxValue !== 0) {
      totalScore += (maxValue - minValue) / maxValue
    }
  })

  return totalScore / indicators.length
}

// 计算文化指标得分
const calculateCulturalScore = (period1, period2) => {
  const indicators = ['culturalExchange', 'technologicalAdvancement', 'artisticDevelopment']
  let totalScore = 0

  indicators.forEach(indicator => {
    const value1 = period1.culturalIndicators[indicator]
    const value2 = period2.culturalIndicators[indicator]
    const maxValue = Math.max(value1, value2)
    const minValue = Math.min(value1, value2)
    
    if (maxValue !== 0) {
      totalScore += (maxValue - minValue) / maxValue
    }
  })

  return totalScore / indicators.length
}

// 获取时间重叠的时期
export const getOverlappingPeriods = (period1, period2) => {
  const range1 = period1.timeRange
  const range2 = period2.timeRange
  
  const overlapStart = Math.max(range1.start, range2.start)
  const overlapEnd = Math.min(range1.end, range2.end)
  
  if (overlapStart <= overlapEnd) {
    return {
      start: overlapStart,
      end: overlapEnd,
      duration: overlapEnd - overlapStart
    }
  }
  
  return null
}

// 获取重大事件时间线
export const getTimelineEvents = (periods) => {
  return periods
    .flatMap(period => period.majorEvents)
    .sort((a, b) => a.year - b.year)
    .map(event => ({
      ...event,
      period: periods.find(p => 
        event.year >= p.timeRange.start && 
        event.year <= p.timeRange.end
      )?.name
    }))
} 