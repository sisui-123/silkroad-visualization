// 处理数据解析
self.onmessage = function(e) {
  const { data } = e.data
  
  // 模拟大数据处理
  const processedData = {
    exports: data.exports.map(item => ({
      ...item,
      value: item.value * 1000, // 转换为更详细的数值
      timestamp: new Date().getTime()
    })),
    imports: data.imports.map(item => ({
      ...item,
      value: item.value * 1000,
      timestamp: new Date().getTime()
    })),
    routes: data.routes.map(item => ({
      ...item,
      value: item.value * 1000,
      timestamp: new Date().getTime()
    }))
  }

  // 模拟处理延迟
  setTimeout(() => {
    self.postMessage(processedData)
  }, 500)
} 