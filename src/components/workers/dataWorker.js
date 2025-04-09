// 数据处理函数
function processData(data) {
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
    normalizedValue: (item.value - stats.minValue) / (stats.maxValue - stats.minValue),
    category: getCategory(item.value, stats)
  }))
}

// 根据值获取类别
function getCategory(value, stats) {
  const range = stats.maxValue - stats.minValue
  const normalizedValue = (value - stats.minValue) / range
  
  if (normalizedValue >= 0.8) return 'high'
  if (normalizedValue >= 0.6) return 'medium-high'
  if (normalizedValue >= 0.4) return 'medium'
  if (normalizedValue >= 0.2) return 'medium-low'
  return 'low'
}

// 监听消息
self.onmessage = function(e) {
  const { data } = e.data
  
  // 模拟处理延迟
  setTimeout(() => {
    const processedData = processData(data)
    self.postMessage(processedData)
  }, 100)
} 