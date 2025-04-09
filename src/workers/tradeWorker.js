// 数据缓存
const dataCache = new Map()

// 模拟数据生成
function generateMockData(year, category) {
  const cacheKey = `${year}-${category}`
  if (dataCache.has(cacheKey)) {
    return dataCache.get(cacheKey)
  }

  const baseData = [
    { name: '丝绸', category: '丝绸', value: 85, trend: 'up' },
    { name: '瓷器', category: '瓷器', value: 65, trend: 'stable' },
    { name: '茶叶', category: '茶叶', value: 45, trend: 'down' },
    { name: '香料', category: '香料', value: 75, trend: 'up' },
    { name: '宝石', category: '宝石', value: 55, trend: 'stable' },
    { name: '玻璃', category: '玻璃', value: 35, trend: 'down' }
  ]

  // 根据年份调整数据
  const yearFactor = (year - 2021) * 0.1 + 1
  const data = baseData.map(item => ({
    ...item,
    value: Math.round(item.value * yearFactor),
    trend: getTrend(item.value, yearFactor)
  }))

  dataCache.set(cacheKey, data)
  return data
}

// 获取趋势
function getTrend(value, factor) {
  const normalizedValue = value / 100
  if (normalizedValue > 0.8) return 'up'
  if (normalizedValue < 0.3) return 'down'
  return 'stable'
}

// 数据处理函数
function processData(data, category) {
  // 计算统计数据
  const stats = {
    total: data.length,
    maxValue: Math.max(...data.map(item => item.value)),
    minValue: Math.min(...data.map(item => item.value)),
    avgValue: data.reduce((sum, item) => sum + item.value, 0) / data.length
  }

  // 添加计算属性
  return data.map(item => ({
    ...item,
    percentage: (item.value / stats.maxValue) * 100,
    normalizedValue: (item.value - stats.minValue) / (stats.maxValue - stats.minValue)
  }))
}

// 监听消息
self.onmessage = function(e) {
  const { year, category } = e.data

  // 发送加载状态
  self.postMessage({
    type: 'loading',
    data: '正在处理数据...'
  })

  // 使用 requestAnimationFrame 优化性能
  requestAnimationFrame(() => {
    try {
      // 生成模拟数据
      const rawData = generateMockData(year, category)
      
      // 处理数据
      const processedData = processData(rawData, category)

      // 发送处理完成的数据
      self.postMessage({
        type: 'complete',
        data: processedData
      })
    } catch (error) {
      // 发送错误信息
      self.postMessage({
        type: 'error',
        data: error.message
      })
    }
  })
}