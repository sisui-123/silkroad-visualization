<template>
  <div class="trade-analysis">
    <div class="dashboard-header">
      <h1 class="dashboard-title">丝绸之路贸易分析</h1>
      
      <!-- 添加城市选择器 -->
      <div class="city-selector">
        <span class="selector-label">选择城市:</span>
        <select v-model="selectedCity" class="city-select" @change="changeCity">
          <option v-for="city in availableCities" :key="city.id" :value="city.id">
            {{ city.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="analysis-container">
      <!-- 环形图部分 -->
      <div class="chart-card">
        <div class="card-header">
          <h2 class="card-title">{{ currentCityData.name }}贸易商品占比</h2>
          <div class="card-subtitle">主要出口商品类别分布</div>
        </div>
        <!-- 其余部分保持不变 -->
        
    <div class="pie-chart" ref="pieChart"></div>
    <div class="legend">
      <div v-for="(item, index) in pieData" 
               :key="index" 
               class="legend-item"
               @mouseover="() => handlePieHover(item)"
               @mouseout="handlePieLeave">
        <div class="color-box" :style="{ backgroundColor: item.color }"></div>
        <span class="legend-label">{{ item.name }}</span>
        <span class="legend-value">{{ item.value }}%</span>
      </div>
    </div>
  </div>  

  <!-- 矩阵图部分 -->
  <div class="chart-card">
    <div class="card-header">
      <h2 class="card-title">贸易流向矩阵</h2>
      <div class="card-subtitle">各城市贸易强度分布</div>
    </div>
    <div class="matrix-chart" ref="matrixChart"></div>
    <div class="matrix-legend">
      <div class="legend-scale">
        <span>贸易强度</span>
        <div class="scale-gradient"></div>
        <div class="scale-labels">
          <span>低</span>
          <span>中</span>
          <span>高</span>
        </div>
      </div>
    </div>
  </div>
</div>

     <!-- 商队动画部分 -->
     <div class="chart-card caravan-card">
        <div class="card-header">
          <h2 class="card-title">商队运输动画</h2>
          <div class="card-subtitle">实时模拟贸易路线</div>
        </div>
        
        <div class="caravan-container" ref="caravanContainer">
          <div class="route-background">
            <div class="route-path"></div>
            <div class="route-markers">
              <div v-for="(marker, index) in routeMarkers" 
                   :key="index"
                   class="route-marker"
                   :style="marker.style">
                <div class="marker-dot"></div>
                <span class="marker-label">{{ marker.name }}</span>
              </div>
            </div>
          </div>
          
          <div class="caravan" :style="caravanStyle">
            <div class="caravan-icon">🐪</div>
            <div class="caravan-info">
              <div class="goods-tag">
                <span class="goods-icon">📦</span>
                {{ currentGoods }}
              </div>
              <div class="status-tag">{{ caravanStatus }}</div>
            </div>
          </div>
        </div>

        <div class="caravan-controls">
          <button @click="toggleCaravanAnimation" 
                  class="control-btn"
                  :class="{ 'active': isCaravanMoving }">
            {{ isCaravanMoving ? '暂停' : '开始' }}
          </button>
          
          <div class="route-selector">
            <select v-model="selectedRoute" class="control-select">
              <option value="">选择路线</option>
              <option v-for="route in routes" 
                      :key="route.id" 
                      :value="route.id">
                {{ route.name }}
              </option>
            </select>
          </div>
          
          <div class="speed-control">
            <span>速度</span>
            <input type="range" 
                   v-model="animationSpeed" 
                   min="1" 
                   max="5" 
                   step="1"
                   class="speed-slider">
            <span class="speed-value">{{ animationSpeed }}x</span>
          </div>
        </div>
     </div>

     <!-- 详细信息弹窗 -->
    <transition name="fade">
      <div v-if="showDetail" 
           class="detail-modal"
           :style="detailModalStyle">
        <div class="detail-content">
          <div class="detail-header">
            <h3>{{ detailData.title }}</h3>
            <button class="close-btn" @click="closeDetail">
              <span class="close-icon">×</span>
            </button>
          </div>
          <div class="detail-body">
            <div v-for="(value, key) in detailData.info" 
                 :key="key" 
                 class="detail-item">
              <span class="detail-label">{{ key }}</span>
              <span class="detail-value">{{ value }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 加载遮罩 -->
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <div class="loading-text">{{ loadingText }}</div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'
import { 
  select, 
  arc, 
  pie, 
  scaleOrdinal, 
  scaleBand, 
  scaleLinear,
  schemeCategory10
} from 'd3'

// 容器引用
const pieChart = ref(null)
const matrixChart = ref(null)
const caravanContainer = ref(null)

// 添加缺失的变量定义
const pieData = ref([])
const matrixData = ref([])
const caravanStyle = ref({})
const routes = ref([])
const resizeObserver = ref(null)
const goodsList = ['丝绸', '瓷器', '香料', '茶叶', '玉石', '宝石']

// 状态管理
const loading = ref(true)
const loadingText = ref('加载数据中...')
const showDetail = ref(false)
const detailData = ref({})
const detailModalStyle = ref({})
const isCaravanMoving = ref(false)
const selectedRoute = ref('')
const currentGoods = ref('')
const caravanStatus = ref('准备出发')
const animationSpeed = ref(1)
const routeMarkers = ref([])

// 添加城市相关数据
const selectedCity = ref('xian')
const availableCities = ref([
  { id: 'xian', name: '西安' },
  { id: 'dunhuang', name: '敦煌' },
  { id: 'kashi', name: '喀什' }
])

// 各城市的数据集
const cityData = ref({
  xian: {
    name: '西安',
    pieData: [
      { name: '丝绸', value: 35, color: '#FFD700' },
      { name: '瓷器', value: 25, color: '#4CAF50' },
      { name: '香料', value: 20, color: '#FF9800' },
      { name: '茶叶', value: 15, color: '#2196F3' },
      { name: '其他', value: 5, color: '#9C27B0' }
    ],
    matrixData: [
      { from: '西安', to: '敦煌', value: 80 },
      { from: '西安', to: '吐鲁番', value: 60 },
      { from: '西安', to: '喀什', value: 40 },
      { from: '西安', to: '撒马尔罕', value: 30 },
      { from: '西安', to: '巴格达', value: 20 }
    ]
  },
  dunhuang: {
    name: '敦煌',
    pieData: [
      { name: '丝绸', value: 30, color: '#FFD700' },
      { name: '瓷器', value: 15, color: '#4CAF50' },
      { name: '香料', value: 25, color: '#FF9800' },
      { name: '玉石', value: 20, color: '#2196F3' },
      { name: '其他', value: 10, color: '#9C27B0' }
    ],
    matrixData: [
      { from: '敦煌', to: '西安', value: 75 },
      { from: '敦煌', to: '吐鲁番', value: 65 },
      { from: '敦煌', to: '喀什', value: 45 },
      { from: '敦煌', to: '撒马尔罕', value: 35 },
      { from: '敦煌', to: '巴格达', value: 25 }
    ]
  },
  kashi: {
    name: '喀什',
    pieData: [
      { name: '丝绸', value: 20, color: '#FFD700' },
      { name: '瓷器', value: 10, color: '#4CAF50' },
      { name: '香料', value: 35, color: '#FF9800' },
      { name: '宝石', value: 25, color: '#2196F3' },
      { name: '其他', value: 10, color: '#9C27B0' }
    ],
    matrixData: [
      { from: '喀什', to: '西安', value: 50 },
      { from: '喀什', to: '敦煌', value: 60 },
      { from: '喀什', to: '吐鲁番', value: 70 },
      { from: '喀什', to: '撒马尔罕', value: 80 },
      { from: '喀什', to: '巴格达', value: 40 }
    ]
  }
})

// 计算当前选中城市的数据
const currentCityData = computed(() => {
  return cityData.value[selectedCity.value] || cityData.value.xian
})

// 城市切换函数
const changeCity = () => {
  // 更新数据
  pieData.value = currentCityData.value.pieData
  matrixData.value = currentCityData.value.matrixData
  
  // 更新路线数据
  updateRoutes()
  
  // 重新渲染图表
  nextTick(() => {
    initPieChart()
    initMatrixChart()
  })
}

// 更新路线数据
const updateRoutes = () => {
  const cityName = currentCityData.value.name
  routes.value = [
    { 
      id: 'route1', 
      name: `${cityName}-敦煌`,
      distance: 1000,
      markers: [
        { name: cityName, position: 0 },
        { name: '兰州', position: 30 },
        { name: '武威', position: 60 },
        { name: '敦煌', position: 100 }
      ]
    },
    { 
      id: 'route2', 
      name: `${cityName}-吐鲁番`,
      distance: 1500,
      markers: [
        { name: cityName, position: 0 },
        { name: '兰州', position: 25 },
        { name: '张掖', position: 50 },
        { name: '哈密', position: 75 },
        { name: '吐鲁番', position: 100 }
      ]
    },
    { 
      id: 'route3', 
      name: `${cityName}-喀什`,
      distance: 2000,
      markers: [
        { name: cityName, position: 0 },
        { name: '兰州', position: 20 },
        { name: '张掖', position: 40 },
        { name: '哈密', position: 60 },
        { name: '吐鲁番', position: 75 },
        { name: '喀什', position: 100 }
      ]
    }
  ]
  
  // 重置路线选择
  selectedRoute.value = ''
  routeMarkers.value = []
  resetCaravan()
}

// 修改生命周期钩子
onMounted(() => {
  console.log('组件开始挂载')
  
  // 初始化数据
  initData()
  
  // 使用 nextTick 等待 DOM 更新
  nextTick(() => {
    console.log('DOM 已更新，开始检查图表容器')
    
    const initCharts = () => {
      if (!pieChart.value || !matrixChart.value) {
        console.error('图表容器未找到')
        return false
      }

      const pieWidth = pieChart.value.clientWidth
      const pieHeight = pieChart.value.clientHeight
      const matrixWidth = matrixChart.value.clientWidth
      const matrixHeight = matrixChart.value.clientHeight

      console.log('容器尺寸:', {
        pie: { width: pieWidth, height: pieHeight },
        matrix: { width: matrixWidth, height: matrixHeight }
      })

      if (!pieWidth || !pieHeight || !matrixWidth || !matrixHeight) {
        console.warn('容器尺寸异常')
        return false
      }

      try {
        initPieChart()
        initMatrixChart()
        resizeObserver.value = initResizeObserver()
        console.log('图表初始化完成')
        return true
      } catch (error) {
        console.error('图表初始化出错:', error)
        return false
      }
    }

    // 首次尝试初始化
    if (!initCharts()) {
      console.log('首次初始化失败，500ms后重试')
      // 延迟重试
      setTimeout(() => {
        initCharts()
        loading.value = false
      }, 500)
    } else {
      loading.value = false
    }
  })
})

// 单独处理组件卸载
onUnmounted(() => {
  if (resizeObserver.value) {
    resizeObserver.value.disconnect()
  }
  stopCaravanAnimation()
})

// 修改初始化环形图函数
const initPieChart = () => {
  console.log('初始化饼图')
  if (!pieChart.value) {
    console.error('饼图容器不存在')
    return
  }

  try {
    const container = pieChart.value
    const width = container.clientWidth || 400
    const height = container.clientHeight || 400

    console.log('饼图容器尺寸:', { width, height })

    // 如果容器尺寸为0，不进行渲染
    if (!width || !height) {
      console.warn('饼图容器尺寸为0')
      return
    }

    // 清除现有内容
    select(container).selectAll('*').remove()

    const svg = select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width/2},${height/2})`)

    // 添加发光效果
    const defs = svg.append('defs')
    const filter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%')

    filter.append('feGaussianBlur')
      .attr('stdDeviation', '3')
      .attr('result', 'coloredBlur')

    const feMerge = filter.append('feMerge')
    feMerge.append('feMergeNode')
      .attr('in', 'coloredBlur')
    feMerge.append('feMergeNode')
      .attr('in', 'SourceGraphic')

    // 创建渐变
    pieData.value.forEach((d, i) => {
      const gradient = defs.append('radialGradient')
        .attr('id', `gradient-${i}`)
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', Math.min(width, height) / 2 * 0.7)

      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', d.color)
        .attr('stop-opacity', 0.9)

      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', d.color)
        .attr('stop-opacity', 0.5)
    })

    const pieGenerator = pie()
      .value(d => d.value)
      .sort(null)
      .padAngle(0.03)

    const arcGenerator = arc()
      .innerRadius(Math.min(width, height) / 2 * 0.6)
      .outerRadius(Math.min(width, height) / 2)
      .cornerRadius(4)

    // 添加路径
    const paths = svg.selectAll('path')
      .data(pieGenerator(pieData.value))
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', (d, i) => `url(#gradient-${i})`)
      .attr('stroke', d => d.data.color)
      .attr('stroke-width', 2)
      .style('filter', 'url(#glow)')
      .style('cursor', 'pointer')
      .on('mouseover', (event, d) => handlePieHover(event, d))
      .on('mouseout', handlePieLeave)

    // 添加标签
    svg.selectAll('text')
      .data(pieGenerator(pieData.value))
      .enter()
      .append('text')
      .attr('transform', d => `translate(${arcGenerator.centroid(d)})`)
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .text(d => `${d.data.value}%`)
  } catch (error) {
    console.error('初始化饼图时出错:', error)
  }
}

// 修改初始化矩阵图函数
const initMatrixChart = () => {
  console.log('初始化矩阵图')
  if (!matrixChart.value) {
    console.error('矩阵图容器不存在')
    return
  }

  try {
    const container = matrixChart.value
    const width = container.clientWidth || 400
    const height = container.clientHeight || 400

    console.log('矩阵图容器尺寸:', { width, height })

    // 如果容器尺寸为0，不进行渲染
    if (!width || !height) {
      console.warn('矩阵图容器尺寸为0')
      return
    }

    // 清除现有内容
    select(container).selectAll('*').remove()

    const margin = { top: 40, right: 40, bottom: 60, left: 60 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const svg = select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    const cities = [...new Set(matrixData.value.map(d => d.to))]
    
    const x = scaleBand()
      .domain(cities)
      .range([0, innerWidth])
      .padding(0.2)

    const y = scaleBand()
      .domain(['西安'])
      .range([0, 60])
      .padding(0.1)

    const colorScale = scaleLinear()
      .domain([0, 100])
      .range(['rgba(255, 215, 0, 0.1)', 'rgba(255, 215, 0, 1)'])

    // 添加单元格
    const cells = svg.selectAll('rect')
      .data(matrixData.value)
      .enter()
      .append('rect')
      .attr('x', d => x(d.to))
      .attr('y', d => y(d.from))
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .attr('fill', d => colorScale(d.value))
      .attr('stroke', 'rgba(255, 215, 0, 0.3)')
      .attr('rx', 4)
      .attr('ry', 4)
      .style('cursor', 'pointer')

    // 添加悬停效果
    cells.on('mouseover', function(event, d) {
      select(this)
        .transition()
        .duration(200)
        .attr('fill', 'rgba(255, 215, 0, 0.8)')
        .attr('stroke', 'rgba(255, 215, 0, 1)')
        .attr('stroke-width', 2)
    })
    .on('mouseout', function(event, d) {
      select(this)
        .transition()
        .duration(200)
        .attr('fill', d => colorScale(d.value))
        .attr('stroke', 'rgba(255, 215, 0, 0.3)')
        .attr('stroke-width', 1)
    })
    .on('click', handleMatrixClick)

    // 添加城市标签
    svg.append('g')
      .attr('transform', `translate(0,${y.bandwidth() + 20})`)
      .selectAll('text')
      .data(cities)
      .enter()
      .append('text')
      .attr('x', d => x(d) + x.bandwidth()/2)
      .attr('y', 0)
      .attr('text-anchor', 'middle')
      .attr('fill', '#000000')  // 修改文字颜色为黑色
      .attr('font-size', '12px')
      .text(d => d)

    // 添加数值标签
    svg.selectAll('.value')
      .data(matrixData.value)
      .enter()
      .append('text')
      .attr('class', 'value')
      .attr('x', d => x(d.to) + x.bandwidth()/2)
      .attr('y', d => y(d.from) + y.bandwidth()/2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', '#fff')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .text(d => `${d.value}%`)
  } catch (error) {
    console.error('初始化矩阵图时出错:', error)
  }
}

// 事件处理函数
const handlePieHover = (event, d) => {
  const item = d.data
  showDetail.value = true
  detailData.value = {
    title: item.name,
    info: {
      '占比': `${item.value}%`,
      '产地': '西安',
      '特点': getGoodsInfo(item.name).特点,
      '历史': getGoodsInfo(item.name).历史
    }
  }
  const updatePosition = (event) => {
    detailModalStyle.value = {
      left: `${event.clientX + 10}px`,
      top: `${event.clientY + 10}px`
    }
  }
  window.addEventListener('mousemove', updatePosition, { once: true })
}

const handlePieLeave = () => {
  showDetail.value = false
}

const handleMatrixClick = (event, d) => {
  showDetail.value = true
  detailData.value = {
    title: `${d.from} → ${d.to}`,
    info: {
      '贸易规模': `${d.value}%`,
      '主要商品': getRouteGoods(d.to),
      '运输时间': getTransportTime(d.to),
      '历史故事': getRouteStory(d.to)
    }
  }
  const updatePosition = (event) => {
    detailModalStyle.value = {
      left: `${event.clientX + 10}px`,
      top: `${event.clientY + 10}px`
    }
  }
  window.addEventListener('mousemove', updatePosition, { once: true })
}

// 监听路线变化
watch(selectedRoute, (newRoute) => {
  if (newRoute) {
    const route = routes.value.find(r => r.id === newRoute)
    if (route) {
      updateRouteMarkers(route)
      stopCaravanAnimation()
    }
  }
})

// 更新路线标记
const updateRouteMarkers = (route) => {
  routeMarkers.value = route.markers.map(marker => ({
    ...marker,
    style: {
      left: `${marker.position}%`
    }
  }))
}

// 开始商队动画
const startCaravanAnimation = () => {
  const route = routes.value.find(r => r.id === selectedRoute.value)
  if (!route) return

  if (!isCaravanMoving.value) {
    // 如果是从暂停状态开始，保持当前位置
    return
  }

  currentGoods.value = goodsList[Math.floor(Math.random() * goodsList.length)]
  caravanStatus.value = '运输中...'
  
  const duration = 5000 / animationSpeed.value
  caravanStyle.value = {
    left: '100%',
    transition: `left ${duration}ms linear`
  }

  // 动画结束后的处理
  setTimeout(() => {
    if (isCaravanMoving.value) {
      caravanStatus.value = '到达目的地'
      setTimeout(() => {
        resetCaravan()
      }, 1000)
    }
  }, duration)
}

// 停止商队动画
const stopCaravanAnimation = () => {
  isCaravanMoving.value = false
  // 获取当前位置
  const caravan = document.querySelector('.caravan')
  if (caravan) {
    const currentLeft = getComputedStyle(caravan).left
    caravanStyle.value = {
      left: currentLeft,
      transition: 'none'
    }
  }
  caravanStatus.value = '已暂停'
}

// 重置商队位置
const resetCaravan = () => {
  isCaravanMoving.value = false
  caravanStyle.value = {
    left: '0%',
    transition: 'none'
  }
  caravanStatus.value = '准备出发'
}

// 切换动画状态
const toggleCaravanAnimation = () => {
  if (!selectedRoute.value) {
    alert('请先选择路线')
    return
  }
  
  isCaravanMoving.value = !isCaravanMoving.value
  if (isCaravanMoving.value) {
    startCaravanAnimation()
  } else {
    stopCaravanAnimation()
  }
}

// 辅助函数
const getGoodsInfo = (name) => {
  const info = {
    '丝绸': {
      特点: '质地轻盈，色彩艳丽',
      历史: '最早可追溯至商周时期'
    },
    '瓷器': {
      特点: '质地细腻，釉色温润',
      历史: '唐代开始大规模生产'
    },
    '香料': {
      特点: '香气浓郁，保存期长',
      历史: '从西域传入，深受欢迎'
    },
    '茶叶': {
      特点: '清香持久，提神醒脑',
      历史: '唐代开始成为重要贸易品'
    }
  }
  return info[name] || { 特点: '未知', 历史: '未知' }
}

const getRouteGoods = (city) => {
  const goods = {
    '敦煌': '丝绸、瓷器',
    '吐鲁番': '香料、茶叶',
    '喀什': '丝绸、瓷器、香料',
    '撒马尔罕': '丝绸、瓷器、茶叶',
    '巴格达': '丝绸、香料'
  }
  return goods[city] || '未知'
}

const getTransportTime = (city) => {
  const times = {
    '敦煌': '15天',
    '吐鲁番': '25天',
    '喀什': '40天',
    '撒马尔罕': '60天',
    '巴格达': '90天'
  }
  return times[city] || '未知'
}

const getRouteStory = (city) => {
  const stories = {
    '敦煌': '敦煌是丝绸之路上的重要中转站，商队在此补充物资',
    '吐鲁番': '吐鲁番的葡萄和瓜果闻名遐迩，是重要的贸易商品',
    '喀什': '喀什是通往中亚的重要门户，商队在此进行大规模交易',
    '撒马尔罕': '撒马尔罕是古代丝绸之路上最繁华的城市之一',
    '巴格达': '巴格达是阿拉伯帝国的首都，是丝绸之路的终点站'
  }
  return stories[city] || '暂无相关历史记录'
}

const closeDetail = () => {
  showDetail.value = false
}

// 添加ResizeObserver来监听容器尺寸变化
const initResizeObserver = () => {
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.target === pieChart.value) {
        initPieChart()
      } else if (entry.target === matrixChart.value) {
        initMatrixChart()
      }
    }
  })

  if (pieChart.value) {
    resizeObserver.observe(pieChart.value)
  }
  if (matrixChart.value) {
    resizeObserver.observe(matrixChart.value)
  }

  return resizeObserver
}

// 初始化数据
const initData = () => {
  // 使用当前选中城市的数据初始化
  pieData.value = currentCityData.value.pieData
  matrixData.value = currentCityData.value.matrixData
  
  // 初始化路线数据
  updateRoutes()
}
</script>

<style lang="scss" scoped>
@import '../styles/trade-analysis.scss';

/* 添加城市选择器样式 */
.city-selector {
  margin-top: 0.5rem;  /* 进一步减小上边距 */
  display: flex;
  align-items: center;
  gap: 0.8rem;  /* 进一步减小间距 */
  
  .selector-label {
    color: #64748b;
    font-size: 0.9rem;  /* 进一步减小字体 */
  }
  
  .city-select {
    padding: 0.4rem;  /* 减小内边距 */
    border-radius: 0.3rem;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: #1e293b;
    outline: none;
    font-size: 0.9rem;  /* 减小字体 */
    
    &:focus {
      border-color: #3b82f6;
    }
  }
}

/* 添加全局缩放样式 */
.trade-analysis {
  overflow: hidden;
  font-size: 1rem;  /* 进一步减小全局字体 */
  padding: 1.5rem;  /* 减小整体内边距 */
  
  .dashboard-header {
    margin-bottom: 0.8rem;  /* 减小底部边距 */
    padding: 0.5rem 0;  /* 减小上下内边距 */
  }
  
  .dashboard-title {
    font-size: 1.5rem;  /* 进一步减小标题字体 */
    margin-bottom: 0.3rem;
  }
  
  .analysis-container {
    gap: 1.5rem;  /* 减小网格间距 */
  }
  
  .card-title {
    font-size: 1.5rem;  /* 进一步减小卡片标题字体 */
  }
  
  .card-subtitle {
    font-size: 0.7rem;  /* 进一步减小副标题字体 */
  }
  
  .chart-card {
    padding: 0.9rem;  /* 进一步减小卡片内边距 */
    margin-bottom: 0.9rem;  /* 减小卡片间距 */
    
    .card-header {
      margin-bottom: 0.9rem;  /* 减小卡片头部底部边距 */
    }
  }
  
  .pie-chart, .matrix-chart {
    height: 190px;  /* 进一步减小图表高度 */
    margin: 0.5rem 0;  /* 减小图表上下边距 */
  }
  
  .legend {
    padding: 0.5rem;  /* 减小图例内边距 */
    gap: 0.5rem;  /* 减小图例项目间距 */
    
    .legend-item {
      font-size: 0.7rem;  /* 进一步减小图例字体 */
      padding: 0.15rem 0.3rem;  /* 减小图例内边距 */
    }
  }
  
  .caravan-container {
    height: 110px;  /* 进一步减小商队容器高度 */
  }
  
  .caravan {
    padding: 0.5rem 0.7rem;  /* 减小商队内边距 */
    
    .caravan-icon {
      font-size: 1.2rem;  /* 减小商队图标 */
    }
    
    .caravan-info {
      .goods-tag {
        font-size: 0.7rem;  /* 进一步减小商品标签字体 */
      }
      
      .status-tag {
        font-size: 0.65rem;  /* 进一步减小状态标签字体 */
      }
    }
  }
  
  .caravan-controls {
    padding: 0.4rem;  /* 进一步减小控制区内边距 */
    margin-top: 0.8rem;  /* 减小控制区上边距 */
    gap: 1rem;  /* 减小控制区元素间距 */
    
    .control-btn {
      padding: 0.25rem 0.5rem;  /* 进一步减小按钮内边距 */
      font-size: 0.7rem;  /* 进一步减小按钮字体 */
    }
    
    .control-select {
      padding: 0.25rem;  /* 进一步减小选择器内边距 */
      font-size: 0.7rem;  /* 进一步减小选择器字体 */
    }
    
    .speed-control {
      gap: 0.5rem;  /* 进一步减小速度控制元素间距 */
      font-size: 0.7rem;  /* 进一步减小速度控制字体 */
      
      .speed-slider {
        width: 80px;  /* 进一步减小滑块宽度 */
      }
    }
  }
  
  .detail-modal {
    .detail-content {
      padding: 0.5rem;  /* 进一步减小弹窗内边距 */
      max-width: 220px;  /* 进一步减小弹窗宽度 */
    }
    
    .detail-header {
      padding: 0.5rem;  /* 进一步减小弹窗头部内边距 */
      
      h3 {
        font-size: 0.9rem;  /* 进一步减小弹窗标题字体 */
      }
      
      .close-btn {
        font-size: 1.2rem;  /* 进一步减小关闭按钮字体 */
      }
    }
    
    .detail-body {
      padding: 0.5rem;  /* 进一步减小弹窗内容内边距 */
      
      .detail-item {
        font-size: 0.7rem;  /* 进一步减小弹窗内容字体 */
        padding: 0.25rem 0;  /* 进一步减小弹窗项目内边距 */
        margin-bottom: 0.5rem;  /* 进一步减小弹窗项目间距 */
      }
    }
  }
}
</style>