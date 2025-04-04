<template>
  <div class="trade-volume-chart-container" v-if="visible">
    <div class="chart-header">
      <h3>{{ city?.name || '地区' }}人口变化</h3><br>
      <button class="close-btn" @click="closeChart">&times;</button>
    </div>
    <div class="chart-content">
      <div ref="chartRef" class="chart-area"></div>
    </div>
    <p style="color: rgba(255, 255, 255, 0.3); font-size: 12px; text-align: center;">人口数据基于估算以及部分史料</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  city: {
    type: Object,
    default: null
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const chartRef = ref(null)
let chart = null

// 人口数据 
const getTradeVolumeData = (cityName) => {
  const data = {
    '西安': [30, 25, 45, 100, 90, 75, 55, 40],
    '敦煌': [5, 10, 20, 40, 50, 45, 35, 25],
    '撒马尔罕': [10, 15, 25, 40, 60, 50, 35, 20],
    '巴格达': [12, 25, 40, 100, 120, 90, 60, 45],
    '君士坦丁堡': [20, 30, 50, 80, 90, 85, 70, 55],
    '喀什': [7, 15, 30, 50, 65, 55, 40, 30],
    '布哈拉': [9, 18, 35, 55, 75, 65, 50, 35],
    '梅尔夫': [6, 12, 30, 50, 70, 60, 45, 30]
  }
  
  // 如果没有城市数据，返回西安的数据作为默认值
  return data[cityName] || data['西安']
}

// 初始化图表
const initChart = () => {
  if (chart) {
    chart.dispose()
  }
  
  nextTick(() => {
    if (chartRef.value) {
      chart = echarts.init(chartRef.value)
      updateChart()
    }
  })
}

// 更新图表数据
const updateChart = () => {
  if (!chart) return
  
  const cityName = props.city?.name || '西安'
  const tradeData = getTradeVolumeData(cityName)
  
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: {c}万人'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['西汉', '东汉', '魏晋', '隋唐', '宋', '元', '明', '清'],
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.7)'
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '人口 (百万)',
      nameTextStyle: {
        color: 'rgba(255, 255, 255, 0.7)'
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.7)'
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    series: [
      {
        name: '人口数',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#8e6f47'
        },
        lineStyle: {
          width: 3,
          color: '#8e6f47'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(142, 111, 71, 0.5)'
            },
            {
              offset: 1,
              color: 'rgba(142, 111, 71, 0.1)'
            }
          ])
        },
        data: tradeData
      }
    ]
  }
  
  chart.setOption(option)
}

// 关闭图表
const closeChart = () => {
  emit('close')
}

// 监听城市变化，更新图表
watch(() => props.city, () => {
  if (props.visible) {
    nextTick(() => {
      updateChart()
    })
  }
}, { deep: true })

// 监听可见性变化，初始化或更新图表
watch(() => props.visible, (newVal) => {
  if (newVal) {
    nextTick(() => {
      initChart()
    })
  }
}, { immediate: true })

onMounted(() => {
  if (props.visible) {
    initChart()
  }
  
  // 添加窗口大小变化监听器，以确保图表自适应大小
  window.addEventListener('resize', () => {
    if (chart) {
      chart.resize()
    }
  })
})
</script>

<style scoped>
.trade-volume-chart-container {
  width: 100%;
  height: 300px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.chart-header h3 {
  color: #ffffff;
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.close-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 1);
}

.chart-content {
  flex: 1;
  overflow: hidden;
}

.chart-area {
  width: 100%;
  height: 100%;
}
</style> 