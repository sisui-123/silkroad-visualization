import * as echarts from 'echarts'

// 地图配置
const mapConfigs = {
  ming: {
    center: [105.0, 35.0],
    zoom: 1.2,
    style: {
      backgroundColor: '#FFF8DC',
      borderColor: '#8B4513',
      areaColor: '#DEB887',
      emphasis: {
        areaColor: '#DAA520',
        borderColor: '#8B4513'
      }
    }
  },
  qing: {
    center: [105.0, 35.0],
    zoom: 1.2,
    style: {
      backgroundColor: '#F5F5F5',
      borderColor: '#4A4A4A',
      areaColor: '#8B8B8B',
      emphasis: {
        areaColor: '#C0C0C0',
        borderColor: '#4A4A4A'
      }
    }
  }
}

// 动态加载地图数据
const loadMapData = async (period) => {
  try {
    // 根据时期加载对应的地图数据
    const mapData = await import(`../assets/map/${period}.json`)
    return mapData.default
  } catch (error) {
    console.error(`加载${period}时期地图数据失败:`, error)
    // 如果加载失败，返回默认的中国地图数据
    const defaultMapData = await import('../assets/map/china.json')
    return defaultMapData.default
  }
}

// 注册地图数据
export const registerMap = async (period) => {
  try {
    const mapData = await loadMapData(period)
    // 将简单JSON转换为GeoJSON格式
    const geoJson = {
      type: 'Feature',
      properties: {
        name: mapData.name
      },
      geometry: {
        type: 'Polygon',
        coordinates: [mapData.coordinates]
      }
    }
    echarts.registerMap(period, geoJson)
    return true
  } catch (error) {
    console.error(`注册${period}时期地图失败:`, error)
    return false
  }
}

// 获取地图配置
export const getMapConfig = (period) => {
  return mapConfigs[period] || mapConfigs.ming
}

// 获取贸易路线配置
export const getTradeRouteConfig = (period) => {
  const configs = {
    HAN_TANG: {
      color: '#DAA520',
      width: 2,
      curveness: 0.2,
      effect: {
        period: 6,
        trailLength: 0.7,
        symbol: 'arrow',
        symbolSize: 5
      }
    },
    SONG_YUAN: {
      color: '#8B4513',
      width: 2,
      curveness: 0.2,
      effect: {
        period: 6,
        trailLength: 0.7,
        symbol: 'arrow',
        symbolSize: 5
      }
    }
  }
  return configs[period] || null
}

// 获取行政区域配置
export const getRegionConfig = (period) => {
  const configs = {
    HAN_TANG: {
      color: '#8B4513',
      size: 12,
      label: {
        show: true,
        position: 'right'
      }
    },
    SONG_YUAN: {
      color: '#4A4A4A',
      size: 12,
      label: {
        show: true,
        position: 'right'
      }
    },
    MODERN: {
      color: '#409EFF',
      size: 12,
      label: {
        show: true,
        position: 'right'
      }
    }
  }
  return configs[period] || configs.MODERN
}

// 获取地图动画配置
export const getAnimationConfig = () => ({
  duration: 1000,
  easing: 'cubicInOut'
})

// 导出地图配置
export { mapConfigs } 