<template>
  <div class="home-container">
    <!-- 加载遮罩层 -->
    <transition name="fade">
      <div v-if="showLoader" class="loading-overlay">
        <div class="loader-content">
          <div class="loader-spinner"></div>
          <h3>数据正在加载中</h3>
        </div>
      </div>
    </transition>

    <Globe3D 
      :key="reloadKey"
      :mapData="mapData" 
      @locationSelect="handleLocationSelect"
      @cityHover="handleCityHover"
      @cityLeave="handleCityLeave"
      @emptySpaceClick="handleEmptySpaceClick"
    />
    
    <!-- 左侧信息面板 -->
    <Transition name="slide-fade">
      <div v-if="selectedCity || hoveredCity" class="info-panel left">
        <div class="panel-content" :key="displayCity?.name">
          <router-link to="/historical-period" class="info-box">
            <div class="info-box-inner">
              <h3>历史时期</h3>
              <p>{{ displayCity?.period || '请选择地图上的位置' }}</p>
              <div class="info-box-icon">
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>
          </router-link>

          <router-link to="/trade-items" class="info-box">
            <div class="info-box-inner">
              <h3>主要贸易品</h3>
              <p>{{ displayCity?.tradeItems || '请选择地图上的位置' }}</p>
              <div class="info-box-icon">
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>
          </router-link>

          <router-link to="/cultural-exchange" class="info-box">
            <div class="info-box-inner">
              <h3>文化交流</h3>
              <p>{{ displayCity?.culturalExchange || '请选择地图上的位置' }}</p>
              <div class="info-box-icon">
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>
          </router-link>

          <router-link to="/locatoin" class="info-box">
            <div class="info-box-inner">
              <h3>地理位置</h3>
              <p>{{ displayCity?.geography || '请选择地图上的位置' }}</p>
              <div class="info-box-icon">
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>
          </router-link>

          <router-link to="/historical-events" class="info-box">
            <div class="info-box-inner">
              <h3>历史事件</h3>
              <p>{{ displayCity?.events || '请选择地图上的位置' }}</p>
              <div class="info-box-icon">
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>
          </router-link>

          <router-link to="/silkRoadsites" class="info-box">
            <div class="info-box-inner">
              <h3>现代遗址</h3>
              <p>{{ displayCity?.modernSites || '请选择地图上的位置' }}</p>
              <div class="info-box-icon">
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </Transition>

    <!-- 右侧信息面板 -->
    <Transition name="slide-fade">
      <div v-if="selectedCity || hoveredCity" class="info-panel right">
        <div class="panel-content" :key="displayCity?.name">
          <h2>{{ displayCity?.name }}</h2>
          <p class="city-description">{{ displayCity?.description }}</p>
          
          <!-- 人口变化图表-->
          <div v-if="showTradeVolumeChart" class="trade-chart-wrapper">
            <TradeVolumeChart 
              :city="displayCity" 
              :visible="true"
              @close="closeTradeVolumeChart"
            />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch, onActivated } from 'vue'
import Globe3D from '../components/Globe3D.vue'
import TradeVolumeChart from '../components/TradeVolumeChart.vue'
import { useRoute } from 'vue-router'
import mapDataJson from '../data/mapData.json'

// 定义组件名称以便keep-alive能够识别
defineOptions({
  name: 'Home'
})

// 路由监听
const route = useRoute()

// 新增加载相关状态
const showLoader = ref(true)
const countdown = ref(5)
let countdownInterval = null

// 用于控制Globe3D组件的重载
const reloadKey = ref(0)

// 选中和悬停状态
const selectedCity = ref(null)
const hoveredCity = ref(null)
const mousePosition = ref({ x: 0, y: 0 })

// 使用导入的mapData
const mapData = ref(mapDataJson)

// 贸易量图表显示状态
const showTradeVolumeChart = ref(false)

// 使用onActivated钩子在组件激活时执行操作
onActivated(() => {
  console.log('Home组件被激活')
  
  // 如果是从其他页面返回，触发轻微更新但不重新加载3D地球
  if (route.path === '/') {
    // 仅当组件被缓存并重新激活时轻微更新UI
    selectedCity.value = null
    hoveredCity.value = null
    showTradeVolumeChart.value = false
  }
})

onMounted(() => {
  // 初始加载动画
  countdownInterval = setInterval(() => {
    countdown.value--
  }, 1000)

  setTimeout(() => {
    showLoader.value = false
    clearInterval(countdownInterval)
  }, 5000)
  
  // 监听事件
  window.addEventListener('mousemove', updateMousePosition)
  
  // 添加调试日志
  console.log('Home组件已挂载')
})

onUnmounted(() => {
  // 清除事件监听
  window.removeEventListener('mousemove', updateMousePosition)
  
  // 清除定时器
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
  
  console.log('Home组件已卸载')
})

// 更新鼠标位置
function updateMousePosition(event) {
  if (!event) return
  mousePosition.value = {
    x: event.clientX,
    y: event.clientY
  }
}

// 计算显示的城市信息
const displayCity = computed(() => {
  return hoveredCity.value || selectedCity.value
})

// 处理城市选择
function handleLocationSelect(city) {
  // 如果选择的是同一个城市，不触发更新
  if (selectedCity.value?.name === city.name) return
  
  // 先清除当前选中状态
  selectedCity.value = null
  
  // 使用 nextTick 确保 DOM 更新后再设置新值
  nextTick(() => {
    selectedCity.value = city
    hoveredCity.value = null
    
    // 自动显示贸易量图表
    showTradeVolumeChart.value = true
  })
}

// 处理城市悬停
function handleCityHover(city) {
  if (!selectedCity.value) {
    hoveredCity.value = city
    showTradeVolumeChart.value = true
  }
}

// 处理城市离开
function handleCityLeave() {
  if (!selectedCity.value) {
    hoveredCity.value = null
  }
}

// 处理空白处点击
function handleEmptySpaceClick() {
  selectedCity.value = null
  hoveredCity.value = null
  showTradeVolumeChart.value = false
}

// 显示/隐藏贸易量图表
function toggleTradeVolumeChart() {
  showTradeVolumeChart.value = !showTradeVolumeChart.value
}

// 关闭贸易量图表
function closeTradeVolumeChart() {
  showTradeVolumeChart.value = false
}

// 计算提示框位置
const tooltipStyle = computed(() => {
  if (!mousePosition.value) return {}
  return {
    position: 'absolute',
    left: `${mousePosition.value.x}px`,
    top: `${mousePosition.value.y - 120}px`,
    transform: 'translate(-50%, -100%)'
  }
})
</script>

<style scoped>
/* 新增加载遮罩样式 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.loader-content {
  text-align: center;
  color: white;
}

.loader-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.countdown {
  margin-top: 15px;
  font-size: 24px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8);
}

/* 修改原有淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.home-container {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: #000;
}

.info-panel {
  position: absolute;
  top: 20px;
  width: 380px;
  max-height: calc(100vh - 40px);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow-y: auto;
  pointer-events: auto;
  z-index: 1000;
}

.info-panel.left {
  left: 20px;
}

.info-panel.right {
  right: 20px;
}

.info-panel.show {
  transform: translateX(0);
}

/* 添加选中状态的样式 */
.info-panel.selected {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.2);
}

.panel-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
  animation: contentFade 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes contentFade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.info-box {
  text-decoration: none;
  color: inherit;
}

.info-box-inner {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 15px 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: boxFade 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes boxFade {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.info-box-inner:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.info-box h3 {
  color: rgba(255, 255, 255, 1);
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.info-box p {
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
}

.info-box-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
}

.info-box-inner:hover .info-box-icon {
  color: rgba(255, 255, 255, 0.8);
  transform: translate(3px, -50%);
}

.city-tooltip {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 12px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  pointer-events: none;
  z-index: 1000;
  min-width: 200px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transform: translate(-50%, -100%);
}

.city-tooltip h3 {
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 5px 0;
  font-size: 16px;
  font-weight: 600;
}

.city-tooltip p {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
}

/* 自定义滚动条样式 */
.info-panel::-webkit-scrollbar {
  width: 6px;
}

.info-panel::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.info-panel::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.info-panel::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* 右侧信息面板的特殊样式 */
.info-panel.right h2 {
  color: #ffffff;
  margin: 0 0 15px 0;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.info-panel.right .city-description {
  color: rgba(255, 255, 255, 0.95);
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 15px 0;
}

/* 贸易量图表包装器样式 */
.trade-chart-wrapper {
  margin-top: 10px;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 修改过渡动画 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.slide-fade-enter-from.right {
  transform: translateX(100px);
}

.slide-fade-leave-to.right {
  transform: translateX(100px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 