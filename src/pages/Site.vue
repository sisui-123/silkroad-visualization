<template>
  <div class="quadrant-dashboard">
    <!-- 顶部区域：标题+筛选控件 -->
    <div class="dashboard-header">
      <div class="filter-controls">
        <div class="filter-group">
          <div class="filter-label">时间范围：</div>
          <div class="filter-options">
            <div 
              class="filter-option" 
              :class="{ active: filters.timeRange === 'all' }"
              @click="filters.timeRange = 'all'; applyFilters()"
            >全部</div>
            <div 
              class="filter-option" 
              :class="{ active: filters.timeRange === 'ancient' }"
              @click="filters.timeRange = 'ancient'; applyFilters()"
            >古代 (公元前200-公元600)</div>
            <div 
              class="filter-option" 
              :class="{ active: filters.timeRange === 'medieval' }"
              @click="filters.timeRange = 'medieval'; applyFilters()"
            >中世纪 (公元600-1500)</div>
            <div 
              class="filter-option" 
              :class="{ active: filters.timeRange === 'modern' }"
              @click="filters.timeRange = 'modern'; applyFilters()"
            >近现代 (公元1500-至今)</div>
        </div>
        </div>
        
        <div class="filter-group">
          <div class="filter-label">文化类型：</div>
          <div class="filter-options">
            <div 
              class="filter-option" 
              :class="{ active: filters.cultureType === 'all' }"
              @click="filters.cultureType = 'all'; applyFilters()"
            >全部</div>
            <div 
              class="filter-option" 
              :class="{ active: filters.cultureType === 'architecture' }"
              @click="filters.cultureType = 'architecture'; applyFilters()"
            >建筑</div>
            <div 
              class="filter-option" 
              :class="{ active: filters.cultureType === 'art' }"
              @click="filters.cultureType = 'art'; applyFilters()"
            >艺术</div>
            <div 
              class="filter-option" 
              :class="{ active: filters.cultureType === 'religion' }"
              @click="filters.cultureType = 'religion'; applyFilters()"
            >宗教</div>
            <div 
              class="filter-option" 
              :class="{ active: filters.cultureType === 'trade' }"
              @click="filters.cultureType = 'trade'; applyFilters()"
            >贸易</div>
        </div>
        </div>
        
        <div class="filter-group">
          <div class="filter-label">地区：</div>
          <div class="filter-options">
            <div 
              class="filter-option" 
              :class="{ active: filters.region === 'all' }"
              @click="filters.region = 'all'; applyFilters()"
            >全部</div>
            <div 
              class="filter-option" 
              :class="{ active: filters.region === 'east' }"
              @click="filters.region = 'east'; applyFilters()"
            >东亚</div>
            <div 
              class="filter-option" 
              :class="{ active: filters.region === 'central' }"
              @click="filters.region = 'central'; applyFilters()"
            >中亚</div>
            <div 
              class="filter-option" 
              :class="{ active: filters.region === 'south' }"
              @click="filters.region = 'south'; applyFilters()"
            >南亚</div>
            <div 
              class="filter-option" 
              :class="{ active: filters.region === 'west' }"
              @click="filters.region = 'west'; applyFilters()"
            >西亚</div>
            <div 
              class="filter-option" 
              :class="{ active: filters.region === 'europe' }"
              @click="filters.region = 'europe'; applyFilters()"
            >欧洲</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="dashboard-content">
      <!-- 左侧：堆叠柱状图 -->
        <div class="chart-container left-chart">
            <div class="chart-header">
                <h2>遗址类型分布</h2>
                <div class="chart-actions">
                <button class="action-button" @click="downloadChart('stackedBarChart')" title="下载图表">
                    <i class="mdi mdi-download"></i>
                    <span>下载</span>
                </button>
                <button class="action-button" @click="refreshChart('stackedBarChart')" title="刷新数据">
                    <i class="mdi mdi-refresh"></i>
                    <span>刷新</span>
                </button>
                </div>
            </div>
            <div class="chart-content" id="stackedBarChart">
          <v-chart class="chart" :option="stackedBarOption" autoresize />
            </div>
        </div>

      <!-- 中央：环形图组 -->
        <div class="chart-container center-chart">
            <div class="chart-header">
                <h2>保护状态与开放情况</h2>
                <div class="chart-actions">
                    <button class="action-button" @click="downloadChart('doughnutChart')" title="下载图表">
                        <i class="mdi mdi-download"></i>
                        <span>下载</span>
                    </button>
                    <button class="action-button" @click="refreshChart('doughnutChart')" title="刷新数据">
                        <i class="mdi mdi-refresh"></i>
                        <span>刷新</span>
                    </button>
                </div>
            </div>
            <div class="chart-content" id="doughnutChart">
          <v-chart class="chart" :option="doughnutOption" autoresize @click="handleDoughnutClick" />
            </div>
        </div>

      <!-- 右侧：折线图 -->
        <div class="chart-container right-chart">
            <div class="chart-header">
                <h2>近5年游客增长趋势</h2>
                <div class="chart-actions">
            <button class="action-button" @click="toggleDisplayMode" :title="displayMode === 'linear' ? '切换为百分比显示' : '切换为线性显示'">
              <i class="mdi" :class="displayMode === 'linear' ? 'mdi-chart-line' : 'mdi-chart-percent'"></i>
              <span>{{ displayMode === 'linear' ? '线性' : '百分比' }}</span>
            </button>
                    <button class="action-button" @click="downloadChart('lineChart')" title="下载图表">
                        <i class="mdi mdi-download"></i>
                        <span>下载</span>
                    </button>
                    <button class="action-button" @click="refreshChart('lineChart')" title="刷新数据">
                        <i class="mdi mdi-refresh"></i>
                        <span>刷新</span>
                    </button>
                </div>
            </div>
            <div class="chart-content" id="lineChart">
          <v-chart class="chart" :option="lineOption" autoresize />
            </div>
        </div>

      <!-- 底部：双饼图 -->
        <div class="chart-container bottom-chart">
            <div class="chart-header">
                <h2>东西方遗址类型对比</h2>
                <div class="chart-actions">
                    <button class="action-button" @click="downloadChart('piePairChart')" title="下载图表">
                        <i class="mdi mdi-download"></i>
                        <span>下载</span>
                    </button>
                    <button class="action-button" @click="refreshChart('piePairChart')" title="刷新数据">
                        <i class="mdi mdi-refresh"></i>
                        <span>刷新</span>
                    </button>
                </div>
            </div>
            <div class="chart-content pie-pair-container" id="piePairChart">
                <div class="pie-chart-wrapper">
                  <h3>东方遗址类型分布</h3>
                  <v-chart class="chart" :option="eastPieOption" autoresize />
                </div>
                <div class="pie-chart-wrapper">
                <h3>西方遗址类型分布</h3>
            <v-chart class="chart" :option="westPieOption" autoresize />
                </div>
            </div>
      </div>
    </div>

    <!-- 年代明细弹窗 -->
    <div v-if="showTimeDetail" class="time-detail-modal">
      <div class="modal-content">
        <h3>{{ timeDetailData.name }} 年代明细</h3>
        <div class="detail-item">
          <span>建城年代：</span>
          <span>{{ timeDetailData.founded < 0 ? `${Math.abs(timeDetailData.founded)}BC` : `${timeDetailData.founded}AD` }}</span>
        </div>
        <div class="detail-item">
          <span>修复年代：</span>
          <span>{{ timeDetailData.restored }}年</span>
        </div>
        <div class="detail-item">
          <span>所属朝代：</span>
          <span>{{ timeDetailData.dynasty }}</span>
        </div>
        <button @click="showTimeDetail = false" class="close-button">关闭</button>
        </div>
    </div>

    <!-- 城市详情弹窗 -->
    <div v-if="showSiteDetail" class="site-detail-modal">
      <div class="modal-content">
        <img :src="siteDetailData.img" alt="遗址图片" style="width:100%;border-radius:8px;margin-bottom:12px;">
        <h3>{{ siteDetailData.name }}</h3>
        <p>{{ siteDetailData.desc }}</p>
        <button @click="showSiteDetail = false" class="close-button">关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import { 
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent
} from 'echarts/components';
import VChart from 'vue-echarts';
import { debounce } from 'lodash';
import sitesData from '../data/silkroad/sites.json';

// 注册ECharts组件
use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent
]);

// 状态管理
const selectedCity = ref(null);
const showTimeDetail = ref(false);
const timeDetailData = ref(null);
const displayMode = ref('linear');
const lastFilters = ref({
  timeRange: 'all',
  cultureType: 'all',
  region: 'all'
});

// 筛选条件
const filters = reactive({
  timeRange: 'all',
  cultureType: 'all',
  region: 'all'
});

// 城市详情数据
const cityDetails = computed(() => {
  return silkRoadCities.value.reduce((acc, city) => {
    acc[city.modernName] = {
      desc: `${city.modernName}（${city.ancientName}）是${city.dynasty}时期的重要城市，${city.category.map(type => {
        switch(type) {
          case 'architecture': return '建筑';
          case 'art': return '艺术';
          case 'religion': return '宗教';
          case 'trade': return '贸易';
          default: return type;
        }
      }).join('、')}遗址保存完好。`,
      img: city.image
    };
    return acc;
  }, {});
});

const showSiteDetail = ref(false);
const siteDetailData = ref({});

// 使用实际数据
const silkRoadCities = ref(sitesData);

// 在 generateMockData 函数后添加
const filteredCities = computed(() => {
  return silkRoadCities.value.filter(city => {
    // 时间范围筛选
    if (filters.timeRange !== 'all') {
      const foundedYear = city.timeline.founded;
      if (filters.timeRange === 'ancient' && (foundedYear > 600 || foundedYear < -200)) return false;
      if (filters.timeRange === 'medieval' && (foundedYear < 600 || foundedYear > 1500)) return false;
      if (filters.timeRange === 'modern' && foundedYear < 1500) return false;
    }
    
    // 文化类型筛选
    if (filters.cultureType !== 'all') {
      if (!city.category.includes(filters.cultureType)) return false;
    }
    
    // 地区筛选
    if (filters.region !== 'all' && city.region !== filters.region) return false;
    
    return true;
  });
});

// 图表配置
const stackedBarOption = computed(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    formatter: (params) => {
      const city = filteredCities.value.find(c => c.modernName === params[0].name);
      if (city) {
        return [
          `${city.modernName} (${city.ancientName})`,
          `建城年代: ${city.timeline.founded < 0 ? `${Math.abs(city.timeline.founded)}BC` : `${city.timeline.founded}AD`}`,
          `修复年代: ${city.timeline.restored}年`,
          `所属朝代: ${city.dynasty}`
        ].join('<br/>');
      }
      return params[0].name;
    }
  },
  legend: { data: ['遗址总数', '受保护遗址'] },
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  xAxis: { type: 'value' },
  yAxis: {
    type: 'category',
    data: filteredCities.value.map(city => city.modernName),
    axisLabel: { interval: 0, rotate: 45 }
  },
  series: [
    {
      name: '遗址总数',
      type: 'bar',
      stack: 'total',
      data: filteredCities.value.map(city => city.sites.total),
      itemStyle: {
        color: (params) => params.name === selectedCity.value ? '#ff6384' : '#4bc0c0'
      }
    },
    {
      name: '受保护遗址',
      type: 'bar',
      stack: 'total',
      data: filteredCities.value.map(city => city.sites.protected),
      itemStyle: {
        color: (params) => params.name === selectedCity.value ? '#ff6384' : '#36a2eb'
      }
    }
  ]
}));

const doughnutOption = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: (params) => {
      const city = filteredCities.value.find(c => c.modernName === params.name);
      if (city) {
        return [
          `${city.modernName} (${city.ancientName})`,
          `建城年代: ${city.timeline.founded < 0 ? `${Math.abs(city.timeline.founded)}BC` : `${city.timeline.founded}AD`}`,
          `修复年代: ${city.timeline.restored}年`,
          `所属朝代: ${city.dynasty}`
        ].join('<br/>');
      }
      return `${params.name}: ${params.value} (${params.percent}%)`;
    }
  },
  series: [
    {
      name: '城市遗址占比',
      type: 'pie',
      radius: ['40%', '60%'],
      data: filteredCities.value.map(city => ({
        name: city.modernName,
        value: city.sites.total,
        itemStyle: {
          color: city.modernName === selectedCity.value ? '#ff6384' : null
        }
      }))
    }
  ]
}));

const lineOption = computed(() => {
  const years = ['2019', '2020', '2021', '2022', '2023'];
  const series = filteredCities.value.map(city => ({
    name: city.modernName,
    type: 'line',
    data: displayMode.value === 'linear' 
      ? city.tourists.growthRate.map((rate, i) => city.tourists.total2019 * Math.pow(1 + rate/100, i+1))
      : city.tourists.growthRate,
    smooth: true,
    lineStyle: {
      color: city.modernName === selectedCity.value ? '#ff6384' : null
    }
  }));
    
    return {
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const city = filteredCities.value.find(c => c.modernName === params[0].seriesName);
        if (city) {
          return [
            `${city.modernName} (${city.ancientName})`,
            `建城年代: ${city.timeline.founded < 0 ? `${Math.abs(city.timeline.founded)}BC` : `${city.timeline.founded}AD`}`,
            `修复年代: ${city.timeline.restored}年`,
            `所属朝代: ${city.dynasty}`
          ].join('<br/>');
        }
        return params[0].seriesName;
      }
    },
    legend: { data: filteredCities.value.map(city => city.modernName) },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', data: years },
    yAxis: {
      type: 'value',
      name: displayMode.value === 'linear' ? '游客数量 (人)' : '增长率 (%)'
    },
    series
  };
});

const eastPieOption = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)'
  },
  series: [{
    name: '遗址类型',
    type: 'pie',
    radius: '50%',
    data: [
      { 
        value: filteredCities.value.reduce((sum, city) => sum + city.siteTypes.religious, 0), 
        name: '宗教类' 
      },
      { 
        value: filteredCities.value.reduce((sum, city) => sum + city.siteTypes.commercial, 0), 
        name: '商贸类' 
      },
      { 
        value: filteredCities.value.reduce((sum, city) => sum + city.siteTypes.postStation, 0), 
        name: '驿站类' 
      },
      { 
        value: filteredCities.value.reduce((sum, city) => sum + city.siteTypes.military, 0), 
        name: '军事类' 
      }
    ]
  }]
}));

const westPieOption = computed(() => {
  const totalProtected = filteredCities.value.reduce((sum, city) => sum + city.sites.protected, 0);
  const totalClosed = filteredCities.value.reduce((sum, city) => sum + city.sites.closed, 0);
  const totalOpen = totalProtected - totalClosed;
  const totalUnprotected = filteredCities.value.reduce((sum, city) => sum + city.sites.total, 0) - totalProtected;
    
    return {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    series: [{
      name: '开放状态',
      type: 'pie',
      radius: '50%',
      data: [
        { value: totalOpen, name: '已开放' },
        { value: totalClosed, name: '半开放' },
        { value: totalUnprotected, name: '未开放' }
      ]
    }]
  };
});

// 事件处理
const toggleDisplayMode = () => {
  displayMode.value = displayMode.value === 'linear' ? 'percentage' : 'linear';
};

const resetFilters = () => {
  filters.timeRange = 'all';
  filters.cultureType = 'all';
  filters.region = 'all';
  selectedCity.value = null;
  applyFilters();
};

const applyFilters = () => {
  // 保存筛选状态到 localStorage
  localStorage.setItem('silkRoadFilters', JSON.stringify(filters));
  lastFilters.value = { ...filters };
  
  // 重置选中的城市
  selectedCity.value = null;
};

// 图表事件处理
const handleChartClick = (params) => {
  if (params.componentType === 'series') {
    selectedCity.value = params.name;
  }
};

// 添加下载和刷新功能
const downloadChart = (chartId) => {
  const chart = document.getElementById(chartId);
  if (!chart) return;
  
  const canvas = chart.querySelector('canvas');
  if (!canvas) return;
  
  // 创建下载链接
  const link = document.createElement('a');
  link.download = `${chartId}_${new Date().toISOString().slice(0,10)}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
};

const refreshChart = (chartId) => {
  // 重新生成模拟数据
  silkRoadCities.value = sitesData;
  
  // 触发图表更新
  const chart = document.getElementById(chartId);
  if (chart) {
    const instance = chart.querySelector('.chart').__vue__;
    if (instance) {
      instance.setOption(instance.getOption());
    }
  }
};

// 环形图点击事件
const handleDoughnutClick = (params) => {
  const city = filteredCities.value.find(c => c.modernName === params.name);
  if (city) {
    siteDetailData.value = {
      name: city.modernName,
      desc: `${city.modernName}（${city.ancientName}）是${city.dynasty}时期的重要城市，${city.category.map(type => {
        switch(type) {
          case 'architecture': return '建筑';
          case 'art': return '艺术';
          case 'religion': return '宗教';
          case 'trade': return '贸易';
          default: return type;
        }
      }).join('、')}遗址保存完好。`,
      img: city.image
    };
    showSiteDetail.value = true;
  }
};

// 组件挂载
onMounted(() => {
  const savedFilters = localStorage.getItem('silkRoadFilters');
  if (savedFilters) {
    const parsed = JSON.parse(savedFilters);
    filters.timeRange = parsed.timeRange;
    filters.cultureType = parsed.cultureType;
    filters.region = parsed.region;
    lastFilters.value = parsed;
  }
});
</script>

<style lang="scss" scoped>
.quadrant-dashboard {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
  padding: 0;
  background-color: #f5f7fa;
  font-family: 'Arial', sans-serif;
  color: #333;
  box-sizing: border-box;
  gap: 8px;
  overflow: hidden;

  .dashboard-header {
    background-color: #fff;
    border-radius: 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    padding: 8px;

    .trapezoid-card {
      position: relative;
      background-color: #e3f2fd; /* 浅蓝色 */
      color: #1565c0; /* 你可以根据实际需要替换为其它颜色 */
      padding: 15px 20px;
      clip-path: polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%);
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 10px;
    }

    .filter-controls {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .filter-group {
        display: flex;
        align-items: center;
        gap: 8px;

        .filter-label {
          font-size: 13px;
          color: #666;
          white-space: nowrap;
          min-width: 70px;
        }

        .filter-options {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;

          .filter-option {
            padding: 4px 8px;
            border-radius: 4px;
            background-color: #f5f7fa;
            color: #666;
            cursor: pointer;
            font-size: 13px;
            transition: all 0.3s ease;
            border: 1px solid transparent;

            &:hover {
              background-color: #e9ecef;
            }

            &.active {
              background-color: #fff;
              border-color: #1890ff;
              color: #1890ff;
            }
          }
        }
      }

      .reset-button {
        align-self: flex-end;
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 8px;
        background-color: #f0f0f0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;

        &:hover {
          background-color: #e0e0e0;
        }

        i {
          font-size: 14px;
        }
      }
    }
  }

  .dashboard-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 60% 40%;
    gap: 8px;
    min-height: 0;
    height: calc(100vh - 60px);

    .chart-container {
      background-color: #fff;
      border-radius: 0;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      display: grid;
      grid-template-rows: auto 1fr;
      overflow: hidden;
      min-height: 0;

      &.left-chart {
        grid-column: 1;
        grid-row: 1;
      }

      &.center-chart {
        grid-column: 2;
        grid-row: 1;
      }

      &.right-chart {
        grid-column: 3;
        grid-row: 1;
      }

      &.bottom-chart {
        grid-column: 1 / span 3;
        grid-row: 2;
      }

      .chart-header {
        padding: 6px 8px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h2 {
          margin: 0;
          font-size: 14px;
          color: #333;
        }

        .chart-actions {
          display: flex;
          gap: 8px;

          .action-button {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 4px 8px;
            height: 28px;
            border: none;
            border-radius: 4px;
            background-color: #f5f5f5;
            cursor: pointer;
            font-size: 13px;
            color: #666;
            transition: all 0.3s ease;
            white-space: nowrap;

            &:hover {
              background-color: #e0e0e0;
              color: #1890ff;
            }

            i {
              font-size: 16px;
            }

            span {
              font-size: 12px;
            }
          }
        }
      }

      .chart-content {
        padding: 8px;
        height: 100%;
        min-height: 0;
        
        .chart {
          width: 100%;
          height: 100%;
        }
      }

      .pie-pair-container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: flex-start;
        gap: 12px;
        height: 100%;

        .pie-chart-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          flex: 1 1 0;
          min-height: 260px;
          height: 100%;

          h3 {
            margin: 0 0 4px 0;
            text-align: center;
            font-size: 13px;
            color: #666;
          }

          .chart {
            width: 100%;
            height: 220px;
            min-height: 180px;
            max-height: 260px;
          }
        }
      }
    }
  }
}

// 响应式布局调整
@media (max-width: 1400px) {
  .quadrant-dashboard {
    .dashboard-content {
      height: calc(100vh - 60px);
    }
  }
}

@media (max-width: 768px) {
  .quadrant-dashboard {
    height: 100vh;
    min-height: 100vh;
  
    .dashboard-content {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(4, minmax(300px, 1fr));
      height: calc(100vh - 60px);

      .chart-container {
        &.left-chart,
        &.center-chart,
        &.right-chart,
        &.bottom-chart {
          grid-column: 1;
        }
        
        &.left-chart { grid-row: 1; }
        &.center-chart { grid-row: 2; }
        &.right-chart { grid-row: 3; }
        &.bottom-chart { grid-row: 4; }
      }
    }
  }
}

.time-detail-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  z-index: 1000;

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    min-width: 300px;

    .detail-item {
      margin: 10px 0;
      display: grid;
      grid-template-columns: 100px 1fr;
      gap: 10px;
    }

    .close-button {
      margin-top: 20px;
      padding: 8px 16px;
      background-color: #f0f0f0;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #e0e0e0;
      }
    }
  }
}

.site-detail-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 2000;
}

.modal-content {
  background: #fff;
  padding: 24px;
  border-radius: 10px;
  min-width: 320px;
  max-width: 90vw;
  box-shadow: 0 4px 24px rgba(0,0,0,0.15);
  
  img {
    width: 100%;
    height: 240px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 16px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  }
  
  h3 {
    font-size: 20px;
    color: #1890ff;
    margin: 0 0 16px 0;
  }
  
  p {
    font-size: 14px;
    line-height: 1.6;
    color: #666;
    margin: 0;
  }
}

.close-button {
  margin-top: 16px;
  padding: 8px 20px;
  background: #1890ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>