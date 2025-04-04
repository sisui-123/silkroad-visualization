<template>
    <div class="map-wrapper">
        <div ref="mapContainer" class="fullscreen-map"></div>
        <div class="map-controls">
            <div class="control-group">
                <label>地形夸张度</label>
                <input type="range" v-model="terrainExaggeration" min="1" max="5" step="0.1" @input="updateTerrain">
            </div>
            <button @click="toggle3D">{{ is3D ? '切换2D' : '切换3D' }}</button>
        </div>
        <div class="layer-controls">
            <div v-for="(visible, name) in layerVisibility" :key="name">
                <input type="checkbox" v-model="layerVisibility[name]" :id="name" @change="toggleLayer(name)">
                <label :for="name">{{ 
                    name === 'mountain' ? '山脉' : 
                    name === 'river' ? '河流' : '城墙'
                }}</label>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Scene, PointLayer } from '@antv/l7'
import { RasterLayer, PolygonLayer } from '@antv/l7-layers'
import { GaodeMap } from '@antv/l7-maps'
import { LayerSwitch } from '@antv/l7-component'
import qinlingData from '@/assets/geojson/qinling.json'

const loading = ref(true)
const mapContainer = ref(null)
const terrainExaggeration = ref(1.5)
const is3D = ref(true)

// 西安坐标
const XI_AN_POSITION = [108.948024, 34.263161]
let scene = null


// 修改地理数据定义，使用导入的qinlingData
const qinlingGeoJSON = qinlingData

// 统一图层引用和可见性状态命名
const layerRefs = {
  mountain: null,
  river: null,
  cityWall: null
}

const layerVisibility = ref({
  mountain: true,  // 统一为单数形式
  river: true,     // 统一为单数形式 
  cityWall: true
})

// 添加河流和城墙的示例数据
const riverGeoJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { 
        "name": "渭河",
        "length": "818公里",
        "description": "黄河最大支流"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [107.5, 34.5], [108.0, 34.3], [108.8, 34.2], [109.5, 34.3]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "灞河",
        "length": "109公里",
        "description": "渭河支流"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [109.1, 34.4], [109.0, 34.3], [108.9, 34.2]
        ]
      }
    }
  ]
}

const cityWallGeoJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { 
        "name": "西安城墙",
        "description": "中国现存规模最大、保存最完整的古代城垣"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [108.94, 34.26], [108.95, 34.26], 
          [108.95, 34.27], [108.94, 34.27], 
          [108.94, 34.26]
        ]
      }
    }
  ]
}

// 工具提示方法
const showTooltip = (html) => {
  const tooltip = document.getElementById('map-tooltip') || 
    document.createElement('div')
  tooltip.id = 'map-tooltip'
  tooltip.innerHTML = html
  tooltip.style.cssText = `
    position: absolute;
    background: rgba(0,0,0,0.7);
    color: white;
    padding: 8px;
    border-radius: 4px;
    pointer-events: none;
    z-index: 1000;
  `
  document.body.appendChild(tooltip)
  
  const moveHandler = (e) => {
    tooltip.style.left = `${e.clientX + 15}px`
    tooltip.style.top = `${e.clientY + 15}px`
  }
  
  document.addEventListener('mousemove', moveHandler)
  tooltip._moveHandler = moveHandler
}

const hideTooltip = () => {
  const tooltip = document.getElementById('map-tooltip')
  if (tooltip) {
    document.removeEventListener('mousemove', tooltip._moveHandler)
    document.body.removeChild(tooltip)
  }
}

// 切换图层显示/隐藏
const toggleLayer = (name) => {
  if (layerRefs[name]) {
    if (layerVisibility.value[name]) {
      layerRefs[name].show()
    } else {
      layerRefs[name].hide()
    }
  }
}

// 更新地形夸张度
const updateTerrain = () => {
    if (scene) {
        scene.setTerrainExaggeration(terrainExaggeration.value)
    }
}

// 切换2D/3D视图
const toggle3D = () => {
    is3D.value = !is3D.value
    if (scene) {
        scene.setPitch(is3D.value ? 60 : 0)
        scene.setZoom(is3D.value ? 9 : 10)
    }
}

// 添加特殊图层
const addSpecialLayers = () => {
  // 秦岭山脉图层
  layerRefs.mountain = new PolygonLayer()
    .source(qinlingGeoJSON)
    .color('#8B4513')
    .style({
      opacity: 0.7,
      raisingHeight: 2000
    })
    .on('mousemove', (e) => {
      const feature = e.feature
      scene.setCursor('pointer')
      showTooltip(`${feature.properties.name}<br/>海拔: ${feature.properties.elevation}米`)
    })
    .on('mouseout', () => {
      scene.setCursor('default')
      hideTooltip()
    })

  // 河流图层（补全动画配置）
  layerRefs.river = new PolygonLayer()
    .source(riverGeoJSON)
    .color('#1E90FF')
    .size(3)
    .animate({
      interval: 1,
      trailLength: 2,
      duration: 1000
    })
    .on('mousemove', (e) => {
      const feature = e.feature
      scene.setCursor('pointer')
      showTooltip(`${feature.properties.name}<br/>长度: ${feature.properties.length}`)
    })
    .on('mouseout', () => {
      scene.setCursor('default')
      hideTooltip()
    })

  // 城墙图层
  layerRefs.cityWall = new PolygonLayer()
    .source(cityWallGeoJSON)
    .color('#FFD700')
    .size(5)
    .style({ 
      opacity: 0.9,
      blur: 0.5
    })
    .on('mousemove', (e) => {
      const feature = e.feature
      scene.setCursor('pointer')
      showTooltip(feature.properties.name)
    })
    .on('mouseout', () => {
      scene.setCursor('default')
      hideTooltip()
    })

  // 添加到场景
  scene.addLayer(layerRefs.mountain)
  scene.addLayer(layerRefs.river) 
  scene.addLayer(layerRefs.cityWall)
}

onMounted(async () => {
    if (!mapContainer.value) return

    // 初始化3D场景
    scene = new Scene({
        id: mapContainer.value,
        map: new GaodeMap({
            pitch: 60,
            style: 'dark',
            center: XI_AN_POSITION,
            zoom: 9,
            token: '546570dc4305d0dd190907a49307a8cb',
            plugin: ['AMap.ElasticMarker', 'AMap.InfoWindow']
        })
    })

    try {
        // 加载地形数据
        const terrainLayer = new RasterLayer({
            zIndex: 1
        })
        terrainLayer.source(
            'https://tiles{1-3}.geovisearth.com/base/v1/terrain_rgb/{z}/{x}/{y}?format=png&token=您的TerrainRGB服务token',
            {
                parser: {
                    type: 'rasterTile',
                    tileSize: 256,
                    zoomOffset: 0
                }
            }
        )
        
        // 添加西安标记点
        const markerLayer = new PointLayer({ zIndex: 10 })
            .source([{
                lng: XI_AN_POSITION[0],
                lat: XI_AN_POSITION[1],
                name: '丝绸之路起点'
            }])
            .shape('marker')
            .size(20)
            .color('#ff0000')
            .style({
                text: {
                    field: 'name',
                    style: {
                        fill: '#fff',
                        fontSize: 12,
                        textAnchor: 'top',
                        textOffset: [0, 20]
                    }
                }
            })

        scene.on('loaded', () => {
            // 设置地形参数
            scene.setTerrain('https://tiles{1-3}.geovisearth.com/base/v1/terrain/{z}/{x}/{y}?format=terrain&token=您的Terrain服务token', {
                requestVertexNormals: true,
                requestWaterMask: true,
                exaggeration: terrainExaggeration.value
            })

            // 添加等高线图层
            const contourLayer = new RasterLayer({ zIndex: 2 })
                .source('https://tiles{1-3}.geovisearth.com/base/v1/contour/{z}/{x}/{y}?format=png&token=您的Contour服务token', {
                    parser: {
                        type: 'rasterTile',
                        tileSize: 256,
                        zoomOffset: 0
                    }
                })
                .style({
                    opacity: 0.6
                })

            scene.addLayer(terrainLayer)
            scene.addLayer(contourLayer)
            scene.addLayer(markerLayer)
            
            // 添加特殊图层
            addSpecialLayers()
            
            // 添加控制组件
            scene.addControl(new LayerSwitch({
                layers: [
                    { name: '山脉', layer: 'mountain' },
                    { name: '河流', layer: 'river' },
                    { name: '城墙', layer: 'cityWall' }
                ]
            }))

            // 添加点击事件
            markerLayer.on('click', () => {
                const infoWindow = new window.AMap.InfoWindow({
                    content: `<div class="info-window">
                        <h3>丝绸之路起点 - 西安</h3>
                        <p>西安是古代丝绸之路的起点，历史上称为长安...</p>
                    </div>`,
                    offset: new window.AMap.Pixel(0, -30)
                })
                infoWindow.open(scene.getMap(), XI_AN_POSITION)
            })

            loading.value = false
        })
    } catch (error) {
        console.error('地图初始化失败:', error)
        loading.value = false
    }
})

onUnmounted(() => {
    if (scene) {
        scene.destroy()
    }
})
</script>

<style scoped>
.map-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    background: transparent;
}

.fullscreen-map {
    width: 100% !important;
    height: 100% !important;
    min-height: 100vh !important;
    overflow: hidden;
}

.map-controls {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 100;
    background: rgba(255, 255, 255, 0.8);
    padding: 10px;
    border-radius: 4px;
}

.control-group {
    margin-bottom: 10px;
}

.control-group label {
    display: block;
    margin-bottom: 5px;
    font-size: 12px;
}

.layer-controls {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(255,255,255,0.8);
  padding: 10px;
  border-radius: 4px;
  z-index: 100;
}

.layer-controls div {
  margin: 5px 0;
}

/* 移动端适配 */
@media (max-width: 768px) {
    .map-controls {
        top: 10px;
        right: 10px;
        padding: 5px;
    }
    
    button {
        font-size: 12px;
        padding: 4px 8px;
    }
}

/* 信息窗口样式 */
:deep(.info-window) {
    max-width: 200px;
    padding: 10px;
}

:deep(.info-window h3) {
    margin: 0 0 5px 0;
    font-size: 16px;
}

:deep(.info-window p) {
    margin: 0;
    font-size: 14px;
}

/* 添加山脉标签样式 */
:deep(.l7-point-text) {
  font-size: 12px;
  font-weight: bold;
  text-shadow: 1px 1px 2px #000;
}

/* 山脉悬停效果 */
:deep(.l7-polygon-layer:hover) {
  opacity: 0.9 !important;
  transition: opacity 0.3s;
}
</style>