<script setup>
import { ref, provide, computed, watch, onMounted, nextTick } from 'vue';
import DataPanel from '../components/DataPanel.vue';
import TimeAxis from '../components/TimeAxis.vue';
import { usePeriodStore } from '../store/period.store';
import { useChartStore } from '../store/chart.store';
import exportService from '../services/export.service';
import AOS from 'aos';
import 'aos/dist/aos.css';

// 城市名称映射
const cityNameMap = {
  'xian': '西安',
  'dunhuang': '敦煌',
  'kashgar': '喀什',
  'samarkand': '撒马尔罕',
  'balkh': '布拉哈',
  'merv': '梅尔夫',
  'baghdad': '巴格达',
  'constantinople': '君士坦丁堡'
};

// 创建模拟的 route 和 router 对象，以便在安装 vue-router 之前代码能够运行
const route = {
  params: { city: 'xian' },
  query: { mode: 'overview' }
};
const router = {
  push: (options) => {
    console.log('路由导航到:', options);
    // 在这里可以添加一些模拟的路由行为
    if (options.params && options.params.city) {
      selectedCity.value = options.params.city;
    }
    if (options.query && options.query.mode) {
      dataMode.value = options.query.mode;
    }
  }
};

// 添加城市相关状态
const selectedCity = ref(route.params.city || 'xian');
const showCitySelector = ref(!route.params.city);

// 切换城市的方法
const switchCity = (city) => {
  selectedCity.value = city;
  router.push({ 
    name: 'dashboard', 
    params: { city },
    query: route.query
  });
  // 新增：切换时间轴
  if (timelineRef.value && cityNameMap[city]) {
    timelineRef.value.changeCity(cityNameMap[city]);
  }
};

// 返回城市选择页面
const backToCitySelector = () => {
  showCitySelector.value = true;
  router.push({ name: 'city-selector' });
};

// 添加调试日志
onMounted(() => {
  console.log('MainDashboard 组件已挂载');
  console.log('可用朝代列表:', periodStore.availablePeriods);
  console.log('当前城市:', selectedCity.value);
  console.log('当前朝代:', periodStore.currentPeriod);
  console.log('当前数据模式:', dataMode.value);
  
  // 初始化AOS动画
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
});

// 添加备用朝代列表，以防 store 中没有数据
const fallbackPeriods = [
  { id: 'qin', name: '秦朝' },
  { id: 'han', name: '汉朝' },
  { id: 'tang', name: '唐朝' },
  { id: 'song', name: '宋朝' },
  { id: 'yuan', name: '元朝' },
  { id: 'ming', name: '明朝' },
  { id: 'qing', name: '清朝' }
];

// 计算可用的朝代列表
const availablePeriods = computed(() => {
  // 如果 store 中有数据，则使用 store 中的数据
  if (periodStore.periods && periodStore.periods.length > 0) {
    return periodStore.periods;
  } else if (periodStore.availablePeriods && periodStore.availablePeriods.length > 0) {
    return periodStore.availablePeriods;
  }
  // 否则使用备用数据
  return fallbackPeriods;
});

// 切换数据模式的方法
const changeDataMode = (mode) => {
  console.log('切换数据模式:', mode);
  dataMode.value = mode;
  
  // 更新 URL 查询参数
  router.push({
    name: 'dashboard',
    params: { city: selectedCity.value },
    query: { ...route.query, mode }
  });
  
  // 如果不是比较模式，清空比较朝代
  if (mode !== 'comparison') {
    comparisonPeriod.value = null;
  }
  
  // 触发一个事件，通知子组件模式已更改
  nextTick(() => {
    console.log('数据模式已更新为:', dataMode.value);
  });
};

// 使用 Pinia store
const periodStore = usePeriodStore();
const chartStore = useChartStore();

// 数据模式和比较朝代
const dataMode = ref(route.query.mode || 'overview');
const comparisonPeriod = ref(null);

// 添加导出相关的状态变量
const isExporting = ref(false);
const exportError = ref(null);

// 提供给子组件的状态
provide('currentPeriod', computed(() => periodStore.currentPeriodInfo));
provide('dataMode', dataMode);
provide('comparisonPeriod', comparisonPeriod);
provide('selectedCity', selectedCity);

// 组件引用
const timelineRef = ref(null);

// 处理时间轴事件点击
const handleTimelineEvent = (event) => {
  chartStore.setFocusYear(event.year);
  console.log('时间轴事件点击:', event);
};

// 处理时间轴年份变化
const handleYearChange = (year) => {
  chartStore.setFocusYear(year);
  console.log('当前查看年份:', year);
};

// 导出数据方法
const exportData = async (format) => {
  try {
    isExporting.value = true;
    exportError.value = null;
    
    await exportService.exportToFile(format, selectedCity.value);
    
    // 显示成功提示
    alert(`${selectedCity.value}数据已成功导出为${format.toUpperCase()}格式`);
  } catch (error) {
    console.error('导出失败:', error);
    exportError.value = error.message || '导出失败';
    alert(`导出失败: ${exportError.value}`);
  } finally {
    isExporting.value = false;
  }
};

// 监听朝代变化，联动时间轴
watch(() => periodStore.currentPeriod, (newPeriod) => {
  if (timelineRef.value) {
    timelineRef.value.scrollToPeriod(newPeriod);
  }
});

// 监听图表焦点年份变化，联动时间轴
watch(() => chartStore.focusYear, (newYear) => {
  if (timelineRef.value && newYear) {
    timelineRef.value.scrollToYear(newYear, true);
  }
});

// 监听路由参数变化
watch(() => route.params.city, (newCity) => {
  if (newCity) {
    selectedCity.value = newCity;
    showCitySelector.value = false;
  } else {
    showCitySelector.value = true;
  }
});

// 处理城市选择事件
const handleCitySelect = (cityId) => {
  selectedCity.value = cityId;
  showCitySelector.value = false;
  
  // 更新页面抬头
  document.title = `${cityNameMap[cityId]} 历史数据`;
  
  // 更新数据面板和时间轴
  const dataPanel = document.querySelector('data-panel');
  const timeAxis = document.querySelector('time-axis');
  
  if (dataPanel) {
    dataPanel.__vue__.updateData(cityId);
  }
  
  if (timeAxis) {
    timeAxis.__vue__.changeCity(cityNameMap[cityId]);
  }
  
  if (timelineRef.value && cityNameMap[cityId]) {
    timelineRef.value.changeCity(cityNameMap[cityId]);
  }
  
  // 如果需要更新路由，可以在这里处理
  if (router) {
    router.push({ 
      name: 'dashboard', 
      params: { city: cityId },
      query: route.query
    });
  }
};

// 监听城市选择变化
watch(selectedCity, (newCity) => {
  handleCitySelect(newCity);
});

// 监听路由参数变化
watch(() => route.params.city, (newCity) => {
  if (newCity) {
    selectedCity.value = newCity;
    showCitySelector.value = false;
    
    // 更新页面抬头
    document.title = `${cityNameMap[newCity]} 历史数据`;
  } else {
    showCitySelector.value = true;
  }
});
</script>

<template>
  <CitySelector v-if="showCitySelector" @select-city="handleCitySelect" />
  
  <div v-else class="cultural-exchange">
    <div class="glass-container">
      <h1 class="title">{{ cityNameMap[selectedCity] || '未知城市' }} 历史数据</h1>

      <!-- 将城市切换器移到右上角 -->
      <div class="top-right-controls">
        <div class="city-selector">
          <select 
            v-model="selectedCity" 
            class="city-select"
            @change="switchCity(selectedCity)">
            <option 
              v-for="city in [
                { id: 'xian', name: '西安', icon: '🏯' },
                { id: 'dunhuang', name: '敦煌', icon: '🕌' },
                { id: 'kashgar', name: '喀什', icon: '🕍' },
                { id: 'samarkand', name: '撒马尔罕', icon: '🏯' },
                { id: 'balkh', name: '布拉哈', icon: '🕌' },
                { id: 'merv', name: '梅尔夫', icon: '🕍' },
                { id: 'baghdad', name: '巴格达', icon: '🏯' },
                { id: 'constantinople', name: '君士坦丁堡', icon: '⛪' }
              ]" 
              :key="city.id"
              :value="city.id">
              {{ city.icon }} {{ city.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="dashboard-layout">
        <div class="dashboard-container">
          <DataPanel class="data-section chart-section" data-aos="fade-up" data-aos-delay="100" />
          <TimeAxis ref="timelineRef" class="timeline-section chart-section" data-aos="fade-up" data-aos-delay="200" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '../styles/variables' as vars;
@use '../styles/transitions';

.cultural-exchange {
  min-height: 100vh;
  padding: 1rem;
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  background-size: cover;
  position: relative;
  overflow: hidden;
}

.cultural-exchange::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/bg.jpg');
  background-size: cover;
  opacity: 0.15;
  z-index: -1;
}

.glass-container {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 1.25rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.18);
  height: calc(100vh - 2rem);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.glass-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent);
  z-index: -1;
  border-radius: 20px 20px 0 0;
}

.title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 0.75rem;
  font-size: 2rem;
  font-weight: 600;
  position: relative;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.title::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 3px;
  background: linear-gradient(90deg, transparent, rgba(44, 62, 80, 0.5), transparent);
}

.dashboard-layout {
  display: flex;
  flex: 1;
  height: calc(100% - 4rem);
  overflow: hidden;
  margin-top: 1.5rem;
}

.dashboard-container {
  display: grid;
  grid-template-areas:
    "period period"
    "data data"
    "timeline timeline";
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.chart-section {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.25);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.chart-section:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.chart-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent);
  z-index: 0;
  border-radius: 15px 15px 0 0;
}

.period-section {
  grid-area: period;
  padding: 10px;
  margin-bottom: 0;
}

.data-section {
  grid-area: data;
  overflow: auto;
  margin-top: 0;
}

.timeline-section {
  grid-area: timeline;
}

.mode-selector {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 10;
}

.export-controls {
  position: absolute;
  bottom: 40px; /* 将按钮位置上移 */
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 10;
}

.export-button {
  display: flex;
  align-items: center;
  gap: 8px;
  
  .icon {
    font-size: 16px;
  }
}

.export-loading {
  padding: 8px 16px;
  background-color: rgba(233, 236, 239, 0.8);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 8px;
  color: #495057;
}

.export-error {
  padding: 8px 16px;
  background-color: rgba(254, 226, 226, 0.8);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 8px;
  color: #dc2626;
}

/* 响应式布局 */
@media (max-width: 1024px) {
  .dashboard-container {
    grid-template-areas:
      "header"
      "period"
      "data"
      "timeline";
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
    height: auto;
    max-height: none;
    overflow: auto;
  }
  
  .city-header {
    flex-direction: column;
    gap: 15px;
    padding: 5px 0;
  }
  
  .city-switcher {
    width: 100%;
    justify-content: center;
  }
  
  .data-section {
    height: auto;
  }
  
  .export-controls {
    position: static;
    margin-top: 20px;
    justify-content: center;
  }
  
  .mode-selector {
    position: static;
    margin: 20px 0;
    justify-content: center;
  }
}

/* 按钮样式 */
.btn {
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  background-color: rgba(59, 130, 246, 0.85);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-primary:hover {
  background-color: rgba(37, 99, 235, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  background-color: rgba(16, 185, 129, 0.85);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
  background-color: rgba(5, 150, 105, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.btn-outline {
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.5);
  color: #3b82f6;
}

.btn-outline:hover {
  background-color: rgba(59, 130, 246, 0.85);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

/* 比较模式控件样式 */
.comparison-controls {
  margin-left: 10px;
}

.comparison-select {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  background-color: white;
  font-size: 16px;
  min-width: 180px;
  cursor: pointer;
  transition: all 0.2s;
}

.comparison-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

.city-select {
  padding: 10px 18px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #1e293b;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  
  &:hover {
    border-color: rgba(37, 99, 235, 0.5);
    background-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(59, 130, 246, 0.6);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
}

.top-right-controls {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  z-index: 10;
}

.city-selector {
  position: relative;
  min-width: 200px;
}

.city-select {
  padding: 12px 24px 12px 50px;  // 调整内边距以适应图标
  font-size: 18px;
  min-width: 200px;
  border-radius: 12px;
}

// 移除 nav-btn 相关样式
.nav-btn {
  display: none;
}

/* 响应式布局调整 */
@media (max-width: 1024px) {
  .dashboard-container {
    grid-template-areas:
      "period"
      "data"
      "timeline";
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    height: auto;
    max-height: none;
    overflow: auto;
  }
  
  .glass-container {
    height: auto;
    min-height: calc(100vh - 2rem);
  }
  
  .export-controls {
    position: static;
    margin-top: 20px;
    justify-content: center;
  }
  
  .mode-selector {
    position: static;
    margin: 20px 0;
    justify-content: center;
  }
  
  .top-right-controls {
    position: static;
    margin: 10px auto;
    justify-content: center;
  }
  
  .title {
    margin-top: 10px;
    font-size: 1.5rem;
  }
}
</style>