<template>
  <div class="map-container">
    <div ref="mapContainer" class="map"></div>
    <div v-if="loading" class="map-loading">
      加载中...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const props = defineProps({
  mapData: {
    type: Object,
    default: () => null
  },
  center: {
    type: Array,
    default: () => [38, 85] // 默认中心点，覆盖丝绸之路主要区域
  },
  zoom: {
    type: Number,
    default: 4
  }
})

const emits = defineEmits(['locationSelect'])

const mapContainer = ref(null)
const map = ref(null)
const loading = ref(false)
const markers = ref([])
const pathLines = ref([])
const popup = ref(null)
// 初始化地图
onMounted(() => {
  if (!mapContainer.value) return
  
  // 创建地图实例
  map.value = L.map(mapContainer.value).setView(props.center, props.zoom)
  
  // 添加地图图层
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map.value)
  
  // 如果数据可用，渲染地图
  if (props.mapData) {
    renderMapData(props.mapData)
  }
})

// 组件卸载时清理
onUnmounted(() => {
  if (map.value) {
    map.value.remove()
  }
})

// 监听数据变化
watch(() => props.mapData, (newData) => {
  if (newData && map.value) {
    renderMapData(newData)
  }
}, { deep: true })

// 渲染地图数据
function renderMapData(data) {
  loading.value = true
  
  // 清除现有标记和路径
  clearMap()
  
  // 添加路线
  if (data.routes && data.routes.length) {
    data.routes.forEach(route => {
      const path = L.polyline(route.coordinates, {
        color: route.color || '#8e6f47',
        weight: route.weight || 3,
        opacity: route.opacity || 0.7
      }).addTo(map.value)
      
      if (route.name) {
        path.bindTooltip(route.name)
      }
      
      pathLines.value.push(path)
    })
  }
  
  // 添加城市标记
  if (data.cities && data.cities.length) {
    data.cities.forEach(city => {
      // 创建自定义图标
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div class="marker-content">${city.name}</div>`,
        iconSize: [100, 30],
        iconAnchor: [50, 15]
      })
      
      // 创建标记
      const marker = L.marker([city.lat, city.lng], { icon })
        .addTo(map.value)
      
      // 创建弹出窗口内容
      const popupContent = `
        <div class="city-popup">
          <h3>${city.name}</h3>
          <p>${city.period}</p>
          <p>${city.tradeItems}</p>
        </div>
      `
      
      // 绑定弹出窗口
      marker.bindPopup(popupContent)
      
      // 添加点击事件
      marker.on('click', () => {
        emits('locationSelect', city)
        // 确保弹出窗口显示
        marker.openPopup()
      })
      
      markers.value.push(marker)
    })
  }
  
  loading.value = false
}

// 清除地图上的所有标记和路径
function clearMap() {
  markers.value.forEach(marker => {
    marker.remove()
  })
  markers.value = []
  
  pathLines.value.forEach(path => {
    path.remove()
  })
  pathLines.value = []
}
</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.map {
  width: 100%;
  height: 100%;
  min-height: 500px;
  z-index: 1;
}

.map-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.8);
  padding: 1rem;
  border-radius: 4px;
  z-index: 2;
}

:deep(.custom-marker) {
  background: none;
  border: none;
}

:deep(.marker-content) {
  background: var(--primary-color);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 16px;
  font-size: 0.9rem;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

:deep(.city-popup) {
  padding: 0.5rem;
}

:deep(.city-popup h3) {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

:deep(.city-popup p) {
  margin: 0.3rem 0;
  color: #666;
}
</style> 