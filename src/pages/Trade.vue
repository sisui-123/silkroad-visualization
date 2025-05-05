<template>
  <div class="port-dashboard">
    <!-- 顶部导航 -->
    <div class="top-nav">
      <div class="nav-tabs">
        <div class="tab active">丝绸之路贸易分析</div>
      </div>
      <div class="year-display">
        唐朝贞观年间 <span class="dot"></span> 
        <div class="city-select-container">
          <select 
            v-model="selectedCity" 
            @change="handleCityChange"
            class="city-select"
          >
            <option value="">选择丝路城市</option>
            <option v-for="city in cityOptions" :key="city.value" :value="city.value">
              {{ city.label }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- 主体内容 -->
    <div class="dashboard-content">
      <!-- 左侧面板 -->
      <div class="left-panel">
        <!-- 数据总览卡片 -->
        <div class="data-card overview-card">
          <div class="card-header">
            <i class="icon-stats"></i>
            <span>
              <span class="city-label">{{ selectedCity || '全域' }}</span>
              丝路贸易总览
            </span>
          </div>
          <div class="total-value">
            <span class="value-label">年贸易总量（万匹绢帛）</span>
            <div class="value-digits">
              <span
                v-for="(digit, idx) in totalVolumeDigits"
                :key="idx"
                :class="digit === '.' ? 'dot' : 'digit'"
              >{{ digit }}</span>
            </div>
          </div>
          <div class="value-progress">
            <div class="progress-bar" :style="{ width: '75%' }"></div>
          </div>
        </div>

        <!-- 贸易伙伴分布 -->
        <div class="data-card partners-card">
          <div class="card-header">
            <i class="icon-globe"></i>
            <span>{{ selectedCity || '全域' }}丝路贸易物品分布</span>
            <div class="more-link" @click="openModal('partners')">更多 <i class="icon-arrow"></i></div>
          </div>
          <div class="bubble-chart">
            <v-chart class="chart" :option="bubbleChartOption" autoresize />
          </div>
        </div>

        <!-- 进出口排行榜 -->
        <div class="data-card ranking-card">
          <div class="card-header">
            <i class="icon-ranking"></i>
            <span>{{ selectedCity || '全域' }}丝路商品排行 TOP10</span>
            <div class="more-link" @click="openModal('ranking')">更多 <i class="icon-arrow"></i></div>
          </div>
          <div class="ranking-list">
            <div v-for="(item, index) in importRankings" :key="index" class="ranking-item">
              <div class="ranking-index">{{ index + 1 }}</div>
              <div class="ranking-name">{{ item.name }}</div>
              <div class="ranking-bar-container">
                <div class="ranking-bar" :style="{ width: `${item.percentage}%`, backgroundColor: rankingColors[index % rankingColors.length] }"></div>
              </div>
              <div class="ranking-value">{{ item.value }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 中央面板 -->
      <div class="center-panel">
        <!-- 横向统计卡片 -->
        <div class="top-stats-row">
          <div class="top-stat-card" v-for="(card, index) in dataCards" :key="index">
            <div class="stat-title">{{ selectedCity || '全域' }}{{ card.title }}</div>
            <div class="stat-value">{{ card.value }}</div>
            <div class="stat-footer">
              <span>较前期</span>
              <span :class="card.trend">{{ card.compare }}</span>
            </div>
          </div>
        </div>
        <!-- 丝绸之路地图 -->
        <div class="map-container">
          <v-chart v-if="mapReady" class="chart" :option="mapOption" autoresize />
          <div class="map-overlay">
          </div>
        </div>
      </div>

      <!-- 右侧面板 -->
      <div class="right-panel">
        <!-- 贸易额占比 -->
        <div class="data-card pie-card">
          <div class="card-header">
            <i class="icon-pie"></i>
            <span>{{ selectedCity || '全域' }}丝路贸易品类占比</span>
          </div>
          <div class="pie-chart" style="display: flex; align-items: center; justify-content: flex-start;">
            <v-chart
              class="chart"
              :option="pie3dOption"
              autoresize
              style="width: 80%; min-width: 180px;"
            />
            <div class="pie-legend" style="min-width: 90px; margin-left: 8px; align-items: flex-end;">
              <div
                class="legend-item"
                v-for="(item, idx) in pieData"
                :key="item.name"
                style="cursor:pointer;"
              >
                <span
                  class="dot"
                  :style="{ background: pieColors[idx % pieColors.length] }"
                ></span>
                {{ item.name }}
                <span class="value">{{ item.value }}</span>
              </div>
              <div
                v-if="legendSourceVisible"
                class="legend-tooltip"
                :style="{ left: legendSourcePos.x + 'px', top: legendSourcePos.y + 'px' }"
              >
                <div v-for="line in legendSourceLines" :key="line" style="white-space: pre-line;">{{ line }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 月度趋势 -->
        <div class="data-card trend-card">
          <div class="card-header">
            <i class="icon-trend"></i>
            <span>{{ selectedCity || '全域' }}季节贸易趋势</span>
          </div>
          <div class="trend-chart">
            <v-chart class="chart" :option="trendChartOption" autoresize />
          </div>
        </div>

        <!-- 驿站排行 -->
        <div class="data-card company-card">
          <div class="card-header">
            <i class="icon-company"></i>
            <span>重要驿站排行</span>
            <div class="more-link" @click="openModal('station')">更多 <i class="icon-arrow"></i></div>
          </div>
          <div class="company-list">
            <div v-for="(company, index) in topCompanies" :key="index" class="company-item" @click="openSourceModal(company.name + '数据来源', company.datasource)" style="cursor:pointer;">
              <div class="company-rank">{{ index + 1 }}</div>
              <div class="company-info">
                <div class="company-name">{{ company.name }}</div>
                <div class="company-value">{{ company.value }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹窗组件 -->
    <div class="modal-overlay" v-if="showModal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ modalTitle }}</h3>
          <i class="icon-close" @click="closeModal">×</i>
        </div>
        <div class="modal-body">
          <div v-if="currentModalType === 'overview'">
            <div class="modal-section">
              <h4>贸易总量详情</h4>
              <div class="detail-grid">
                <div class="detail-item">
                  <span class="label">年贸易总量</span>
                  <span class="value">567.825万匹绢帛</span>
                </div>
                <div class="detail-item">
                  <span class="label">同比增长</span>
                  <span class="value up">+15%</span>
                </div>
                <div class="detail-item">
                  <span class="label">季度最高</span>
                  <span class="value">189.275万匹绢帛</span>
                </div>
                <div class="detail-item">
                  <span class="label">季度最低</span>
                  <span class="value">95.412万匹绢帛</span>
                </div>
              </div>
            </div>
            <div class="modal-section">
              <h4>进出口商品结构</h4>
              <div class="chart-container">
                <v-chart class="chart" :option="modalPieOption" autoresize />
              </div>
            </div>
          </div>
          
          <div v-else-if="currentModalType === 'partners'">
            <div class="modal-section">
              <h4>丝路贸易物品分布详情</h4>
              <div class="detail-grid">
                <div class="detail-item" v-for="item in piePercentData" :key="item.name">
                  <span class="label">{{ item.name }}占比</span>
                  <span class="value">{{ item.percent }}%</span>
                </div>
              </div>
            </div>
            <div class="modal-section">
              <h4>贸易物品分布图</h4>
              <div class="chart-container">
                <v-chart class="chart" :option="modalBubbleOption" autoresize />
              </div>
            </div>
          </div>
          
          <div v-else-if="currentModalType === 'ranking'">
            <div class="modal-section">
              <h4>丝路商品排行详情</h4>
              <div class="ranking-table">
                <div class="table-header">
                  <div class="col-rank">排名</div>
                  <div class="col-name">商品名称</div>
                  <div class="col-value">贸易量</div>
                  <div class="col-percent">占比</div>
                </div>
                <div class="table-body">
                  <div v-for="(item, index) in rankingPercentData" :key="index" class="table-row">
                    <div class="col-rank">{{ index + 1 }}</div>
                    <div class="col-name">{{ item.name }}</div>
                    <div class="col-value">{{ item.value }}</div>
                    <div class="col-percent">{{ item.percent }}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else-if="currentModalType === 'station'">
            <div class="modal-section">
              <h4>全部驿站排行</h4>
              <div class="ranking-table">
                <div class="table-header">
                  <div class="col-rank">排名</div>
                  <div class="col-name">驿站名称</div>
                  <div class="col-value">重要性</div>
                </div>
                <div class="table-body">
                  <div v-for="(company, index) in SILKROAD_FULL_DATA.postSystem.stationRanking" :key="index" class="table-row">
                    <div class="col-rank">{{ index + 1 }}</div>
                    <div class="col-name">{{ company.name }}</div>
                    <div class="col-value">{{ company.value }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 全局数据来源弹窗 -->
    <div v-if="showSourceModal" class="source-modal-mask" @click="closeSourceModal">
      <div class="source-modal" @click.stop>
        <div class="source-modal-title">{{ sourceModalTitle }}</div>
        <div class="source-modal-content">
          <div v-if="sourceModalIsTable">
            <table>
              <thead>
                <tr>
                  <th v-for="header in sourceModalTableHeaders" :key="header.key">{{ header.label }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in sourceModalTableRows" :key="index">
                  <td v-for="cell in row" :key="cell">{{ cell }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <div v-for="line in sourceModalLines" :key="line">{{ line }}</div>
          </div>
        </div>
        <div class="source-modal-close" @click="closeSourceModal">关闭</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart, PieChart, ScatterChart } from 'echarts/charts';
import { 
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  GeoComponent,
  VisualMapComponent,
  GraphicComponent
} from 'echarts/components';
import VChart from 'vue-echarts';
import * as echarts from 'echarts/core';
import 'echarts-gl';
import { CITY_DATA, SILKROAD_FULL_DATA } from '../data/silkRoadData';

// 注册ECharts组件
use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  GeoComponent,
  VisualMapComponent,
  GraphicComponent
]);

// 当前年份
const currentYear = ref('贞观年间 (627-649)');

// 数据卡片
const dataCards = ref([
  { 
    title: '丝路总长度', 
    value: SILKROAD_FULL_DATA.economy.silkRoadStats.totalLength.value,
    compare: SILKROAD_FULL_DATA.economy.silkRoadStats.totalLength.compare,
    trend: SILKROAD_FULL_DATA.economy.silkRoadStats.totalLength.trend
  },
  { 
    title: '驿站数量', 
    value: SILKROAD_FULL_DATA.economy.silkRoadStats.stationCount.value,
    compare: SILKROAD_FULL_DATA.economy.silkRoadStats.stationCount.compare,
    trend: SILKROAD_FULL_DATA.economy.silkRoadStats.stationCount.trend
  },
  { 
    title: '商队规模', 
    value: SILKROAD_FULL_DATA.economy.silkRoadStats.caravanSize.value,
    compare: SILKROAD_FULL_DATA.economy.silkRoadStats.caravanSize.compare,
    trend: SILKROAD_FULL_DATA.economy.silkRoadStats.caravanSize.trend
  },
  { 
    title: '年通行量', 
    value: SILKROAD_FULL_DATA.economy.silkRoadStats.annualPassage.value,
    compare: SILKROAD_FULL_DATA.economy.silkRoadStats.annualPassage.compare,
    trend: SILKROAD_FULL_DATA.economy.silkRoadStats.annualPassage.trend
  },
  { 
    title: '官方使团', 
    value: SILKROAD_FULL_DATA.economy.silkRoadStats.officialMissions.value,
    compare: SILKROAD_FULL_DATA.economy.silkRoadStats.officialMissions.compare,
    trend: SILKROAD_FULL_DATA.economy.silkRoadStats.officialMissions.trend
  }
]);

// 进口商品排行
const importRankings = ref(SILKROAD_FULL_DATA.economy.annualTrade.importRankings);

// 排行榜颜色
const rankingColors = ref(['#4ecdc4', '#45b7cd', '#3e95cd', '#3c89ce', '#3a7dce', '#366bce', '#3359ce', '#3047ce', '#2d35ce', '#2a23ce']);

// 驿站排行
const topCompanies = ref(SILKROAD_FULL_DATA.postSystem.stationRanking);

// 贸易物品类型列表
const tradeItemTypes = Object.values(SILKROAD_FULL_DATA.economy.annualTrade.tradeCategories).map(item => item.name);

// 丝绸之路主要城市及贸易物品数据
const silkRoadCitiesTrade = SILKROAD_FULL_DATA.commodities.tradeDistribution;

// 饼图数据
const pieData = ref([]);

const pieColors = ['#4ecdc4', '#ff6384', '#ffcd56', '#36a2eb', '#9966ff'];

// 悬浮提示相关
const legendSourceVisible = ref(false);
const legendSourceLines = ref([]);
const legendSourcePos = ref({ x: 0, y: 0 });

const showSourceModal = ref(false);
const sourceModalTitle = ref('');
const sourceModalLines = ref([]);
const sourceModalIsTable = ref(false);
const sourceModalTableHeaders = ref([]);
const sourceModalTableRows = ref([]);

function formatDatasource(ds) {
  if (Array.isArray(ds)) {
    return ds.map((d) => {
      if (typeof d === 'string') return `• ${d}`;
      if (typeof d === 'object') {
        if ('estimate' in d && 'reference' in d) {
          return `• 依据${d.reference}，${d.estimate}`;
        }
        return '• ' + Object.entries(d).map(([k, v]) => `${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`).join('；');
      }
      return `• ${String(d)}`;
    });
  } else if (typeof ds === 'object') {
    if ('estimate' in ds && 'reference' in ds) {
      return [`• 依据${ds.reference}，${ds.estimate}`];
    }
    return Object.entries(ds).map(([k, v]) => `• ${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`);
  } else {
    return [`• ${String(ds)}`];
  }
}

function showLegendSource(idx, event) {
  // 获取 tradeCategories 的原始数据
  const tradeCategories = SILKROAD_FULL_DATA.economy.annualTrade.tradeCategories;
  const keys = Object.keys(tradeCategories);
  const raw = tradeCategories[keys[idx]];
  // 处理 datasource 字段
  let ds = raw.datasource;
  legendSourceLines.value = formatDatasource(ds);
  // 定位
  let x = event.clientX + 16;
  let y = event.clientY + 8;
  // 防止超出右侧和底部
  const tooltipWidth = 380, tooltipHeight = 200;
  if (x + tooltipWidth > window.innerWidth) x = window.innerWidth - tooltipWidth - 16;
  if (y + tooltipHeight > window.innerHeight) y = window.innerHeight - tooltipHeight - 16;
  legendSourcePos.value = { x, y };
  legendSourceVisible.value = true;
}
function hideLegendSource() {
  legendSourceVisible.value = false;
}

function openSourceModal(title, datasource) {
  sourceModalTitle.value = title;
  // 判断是否为表格型
  if (Array.isArray(datasource) && datasource.length > 0 && typeof datasource[0] === 'object' && !Array.isArray(datasource[0])) {
    sourceModalIsTable.value = true;
    // 收集所有可能的key
    const allKeys = Array.from(new Set(datasource.flatMap(obj => Object.keys(obj))));
    // 中英文对照
    const keyMap = { type: '类型', source: '来源', detail: '详情', location: '地点', method: '方法', dateRange: '年代', basis: '依据', parameter: '参数', reference: '参考', content: '内容', artifact: '器物', sample: '样本', record: '记录', name: '名称', value: '数值', description: '描述', model: '模型', researcher: '研究者', department: '部门', document: '文书', findings: '发现', feature: '特征', conclusion: '结论', sampleSize: '样本量', result: '结果', event: '事件', period: '时期', excerpt: '摘录', items: '条目', statistic: '统计', preservation: '保存状况', output: '产量', scale: '规模', survivalRate: '遗存率', countedStations: '统计驿站数', countedMissions: '统计使团数', annualAverage: '年均次数', frequency: '频率', regulation: '规章', element: '要素', scene: '场景', attire: '服饰', dating: '年代测定', sampleSize: '样本量', capacity: '容量', conversion: '换算', area: '面积', report: '报告', monument: '碑刻', author: '作者', scholar: '学者', parameter: '参数', coefficients: '系数', temperature: '温度', compound: '化合物', concentration: '浓度', technique: '技术', species: '物种', component: '成分', isotope: '同位素', stratigraphy: '地层', survivalRate: '遗存率', etc: '其他' };
    sourceModalTableHeaders.value = allKeys.map(k => ({ key: k, label: keyMap[k] || k }));
    sourceModalTableRows.value = datasource.map(obj => allKeys.map(k => obj[k] ?? ''));
    showSourceModal.value = true;
    return;
  }
  // 否则用原有格式化
  sourceModalIsTable.value = false;
  sourceModalLines.value = formatDatasource(datasource);
  showSourceModal.value = true;
}
function closeSourceModal() {
  showSourceModal.value = false;
}

// 气泡图数据转换
function convertBubbleData(raw) {
  const arr = (raw || []).filter(item => item && item.name && item.item && typeof item.importance === 'number');
  if (arr.length === 0) return [];
  // 按重要性降序排列
  arr.sort((a, b) => b.importance - a.importance);

  const result = [];
  const center = 50;
  const baseR = 8;
  const scaleR = 6;
  const layerStep = 26; // 每一层的半径步进（更大）
  const perLayer = 3; // 每层气泡数（更少，分层更多）

  arr.forEach((item, idx) => {
    // 重要性越大，越靠近中心
    const layer = Math.floor(idx / perLayer); // 每perLayer个一层
    const radius = layer * layerStep + 12 + Math.random() * 10; // 半径更大，扰动更大
    const angleBase = (idx % perLayer) * (2 * Math.PI / perLayer) + Math.random() * Math.PI / perLayer;
    const angle = angleBase + Math.random() * Math.PI / 2; // 角度扰动更大
    const x = center + Math.cos(angle) * radius;
    const y = center + Math.sin(angle) * radius;
    result.push([x, y, item.importance, item.name, item.item]);
  });
  return result;
}

const bubbleChartData = ref(convertBubbleData(SILKROAD_FULL_DATA.commodities.tradeDistribution));

// 动态生成x/y轴数据
const bubbleXAxis = computed(() => {
  if (
    selectedCity.value &&
    CITY_DATA[selectedCity.value] &&
    CITY_DATA[selectedCity.value].commodities &&
    Array.isArray(CITY_DATA[selectedCity.value].commodities.tradeDistribution) &&
    CITY_DATA[selectedCity.value].commodities.tradeDistribution.length > 0
  ) {
    return [selectedCity.value];
  }
  return Array.from(
    new Set(
      (SILKROAD_FULL_DATA.commodities.tradeDistribution || [])
        .filter(item => item && item.name)
        .map(item => item.name)
    )
  );
});

const bubbleYAxis = computed(() => {
  if (
    selectedCity.value &&
    CITY_DATA[selectedCity.value] &&
    CITY_DATA[selectedCity.value].commodities &&
    Array.isArray(CITY_DATA[selectedCity.value].commodities.tradeDistribution) &&
    CITY_DATA[selectedCity.value].commodities.tradeDistribution.length > 0
  ) {
    return Array.from(
      new Set(
        CITY_DATA[selectedCity.value].commodities.tradeDistribution
          .filter(item => item && item.item)
          .map(item => item.item)
      )
    );
  }
  return Array.from(
    new Set(
      (SILKROAD_FULL_DATA.commodities.tradeDistribution || [])
        .filter(item => item && item.item)
        .map(item => item.item)
    )
  );
});

// 气泡图配置
const bubbleChartOption = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: params => {
      if (!Array.isArray(params.data)) return '';
      return `${params.data[3]}<br/>贸易物品：${params.data[4]}<br/>重要性：${params.data[2]}`;
    }
  },
  grid: { left: '6%', right: '6%', top: '12%', bottom: '10%', containLabel: true },
  xAxis: { type: 'value', show: false, min: 0, max: 100 },
  yAxis: { type: 'value', show: false, min: 0, max: 100 },
  series: [{
    type: 'scatter',
    symbolSize: function(data) {
      if (!Array.isArray(data) || typeof data[2] !== 'number') return 18;
      return 18 + data[2] * 8;
    },
    itemStyle: {
      color: function(params) {
        return bubbleColors[params.dataIndex % bubbleColors.length];
      },
      shadowBlur: 30,
      shadowColor: 'rgba(61,160,255,0.3)',
      opacity: 0.85
    },
    data: bubbleChartData.value,
    label: {
      show: true,
      formatter: params => {
        if (Array.isArray(params.data)) {
          return `${params.data[3]}\n${params.data[2]}`;
        }
        return '';
      },
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
      align: 'center',
      verticalAlign: 'middle',
      shadowColor: '#3da0ff',
      shadowBlur: 6
    },
    emphasis: {
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 3,
        opacity: 1
      }
    }
  }]
}));

// 省份信息表
const provinceInfo = SILKROAD_FULL_DATA.provinces;

// 地图配置
const mapOption = ref({});
const mapReady = ref(false);

onMounted(() => {
  import('echarts').then(module => {
    const echarts = module.default || module;
    fetch('/china.json')  // 修改为直接使用根路径
      .then(response => {
        if (!response.ok) {
          throw new Error('地图数据加载失败');
        }
        return response.json();
      })
      .then(chinaJson => {
        echarts.registerMap('china', chinaJson);
        mapOption.value = {
          tooltip: {
            trigger: 'item',
            alwaysShowContent: false,
            enterable: true,
            formatter: function(params) {
              const key = params.name.replace('省', '').replace('市', '');
              const info = provinceInfo[key];
              if (info) {
                return `
                  <div style='min-width:180px;'>
                    <strong style='font-size:15px;color:#1890ff;'>${params.name}</strong><br/>
                    经度：${info.lng}°E<br/>
                    纬度：${info.lat}°N<br/>
                    气候：${info.climate}<br/>
                    特色植被：${info.plants}<br/>
                    代表动物：${info.animals}
                  </div>
                `;
              } else {
                return `${params.name}`;
              }
            }
          },
          visualMap: {
            min: 0,
            max: 100,
            text: ['繁忙', '稀少'],
            realtime: false,
            calculable: true,
            inRange: {
              color: ['#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695']
            },
            show: false
          },
          geo: {
            map: 'china',
            roam: true,
            center: [105, 35],
            zoom: 1.2,
            itemStyle: {
              areaColor: '#e6f7ff',
              borderColor: '#3da0ff',
              borderWidth: 2,
              shadowColor: '#1890ff55',
              shadowBlur: 20
            },
            emphasis: {
              areaColor: '#3da0ff',
              shadowColor: '#1890ff99',
              shadowBlur: 30
            }
          },
          series: [
            {
              name: '丝路通行量',
              type: 'map',
              map: 'china',
              geoIndex: 0,
              data: Object.entries(provinceInfo).map(([name, info]) => ({
                name,
                value: Math.floor(Math.random() * 100) // 这里可以根据实际数据替换
              }))
            },
            {
              name: '丝绸之路路线',
              type: 'lines',
              coordinateSystem: 'geo',
              zlevel: 2,
              effect: {
                show: true,
                period: 6,
                trailLength: 0.7,
                color: '#fff',
                symbolSize: 3
              },
              lineStyle: {
                color: '#ffa022',
                width: 2,
                curveness: 0.2
              },
              data: SILKROAD_FULL_DATA.tradeRoutes
            }
          ]
        };
        mapReady.value = true;
      })
      .catch(error => {
        console.error('加载中国地图数据失败:', error);
      });
  });
  totalVolume.value = SILKROAD_FULL_DATA.economy.annualTrade.totalVolume.value;
  console.log('全局气泡数据', SILKROAD_FULL_DATA.commodities.tradeDistribution);
  updateDashboardData(SILKROAD_FULL_DATA);
});

// 饼图配置
const pie3dOption = computed(() => ({
  title: { show: false },
  tooltip: { trigger: 'item', formatter: '{b}：{c} ({d}%)' },
  legend: { show: false },
  series: [
    // 外环高光
    {
      type: 'pie',
      radius: ['92%', '100%'],
      center: ['45%', '50%'],
      silent: true,
      label: { show: false },
      data: [
        { value: 1, itemStyle: { color: 'rgba(24,144,255,0.12)' } }
      ],
      z: 1
    },
    // 主环
    {
      type: 'pie',
      radius: ['70%', '90%'],
      center: ['45%', '50%'],
      avoidLabelOverlap: false,
      startAngle: 220,
      label: { show: false },
      labelLine: { show: false },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 4,
        shadowBlur: 18,
        shadowColor: 'rgba(24,144,255,0.18)'
      },
      data: pieData.value,
      z: 2
    },
    // 内环阴影
    {
      type: 'pie',
      radius: ['62%', '70%'],
      center: ['45%', '50%'],
      silent: true,
      label: { show: false },
      data: [
        { value: 1, itemStyle: { color: 'rgba(24,144,255,0.10)' } }
      ],
      z: 1
    }
  ]
}));

// 趋势图配置
const trendChartOption = ref({
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: function(value) {
      return value.max ? Math.ceil(value.max * 1.3) : 100;
    },
    splitNumber: 6
  },
  grid: {
    left: 40,
    right: 20,
    top: 30,
    bottom: 30,
    containLabel: true
  },
  series: [
    {
      name: '贸易量',
      data: [],
      type: 'line',
      smooth: true,
      symbol: 'circle',
      lineStyle: { width: 3, color: '#3da0ff' },
      itemStyle: { color: '#3da0ff' },
      emphasis: { focus: 'series' }
    },
    {
      name: '商队数量',
      data: [],
      type: 'line',
      smooth: true,
      symbol: 'circle',
      lineStyle: { width: 3, color: '#ffcd56' },
      itemStyle: { color: '#ffcd56' },
      emphasis: { focus: 'series' }
    }
  ]
});

// 弹窗相关数据
const showModal = ref(false);
const currentModalType = ref('');
const modalTitle = ref('');

// 弹窗饼图配置
const modalPieOption = computed(() => ({
  tooltip: { trigger: 'item' },
  legend: { orient: 'vertical', right: 10, top: 'center' },
  series: [{
    type: 'pie',
    radius: ['40%', '70%'],
    center: ['40%', '50%'],
    avoidLabelOverlap: false,
    itemStyle: {
      borderRadius: 10,
      borderColor: '#fff',
      borderWidth: 2
    },
    label: { show: false },
    emphasis: {
      label: { show: true, fontSize: 20, fontWeight: 'bold' }
          },
          data: [
      { value: 4287, name: '丝绸' },
      { value: 2464, name: '瓷器' },
      { value: 1256, name: '茶叶' },
      { value: 876, name: '铜器' },
      { value: 543, name: '漆器' }
    ]
  }]
}));

// 弹窗气泡图配置
const modalBubbleOption = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: params => {
      if (!Array.isArray(params.data)) return '';
      return `${params.data[3]}<br/>贸易物品：${params.data[4]}<br/>重要性：${params.data[2]}`;
    }
  },
  grid: { left: '6%', right: '6%', top: '12%', bottom: '10%', containLabel: true },
  xAxis: { type: 'value', show: false, min: 0, max: 100 },
  yAxis: { type: 'value', show: false, min: 0, max: 100 },
  series: [{
    type: 'scatter',
    symbolSize: function(data) {
      if (!Array.isArray(data) || typeof data[2] !== 'number') return 18;
      return 18 + data[2] * 8;
    },
    itemStyle: {
      color: function(params) {
        return bubbleColors[params.dataIndex % bubbleColors.length];
      },
      shadowBlur: 30,
      shadowColor: 'rgba(61,160,255,0.3)',
      opacity: 0.85
    },
    data: bubbleChartData.value,
    label: {
      show: true,
      formatter: params => {
        if (Array.isArray(params.data)) {
          return `${params.data[3]}\n${params.data[2]}`;
        }
        return '';
      },
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
      align: 'center',
      verticalAlign: 'middle',
      shadowColor: '#3da0ff',
      shadowBlur: 6
    },
    emphasis: {
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 3,
        opacity: 1
      }
    }
  }]
}));

// 打开弹窗方法
const openModal = (type) => {
  currentModalType.value = type;
  switch(type) {
    case 'overview':
      modalTitle.value = '长安丝路贸易总览';
      break;
    case 'partners':
      modalTitle.value = '丝路贸易物品分布';
      break;
    case 'ranking':
      modalTitle.value = '丝路商品排行';
      break;
    case 'station':
      modalTitle.value = '驿站排行';
      break;
  }
  showModal.value = true;
};

// 关闭弹窗方法
const closeModal = () => {
  showModal.value = false;
  currentModalType.value = '';
  modalTitle.value = '';
};

// 搜索相关数据
const searchQuery = ref('');
const searchResults = ref([]);
const showSearchResults = ref(false);
const isSearchFocused = ref(false);

// 搜索处理方法
const handleSearch = () => {
  if (searchQuery.value.trim() === '') {
    searchResults.value = [];
    showSearchResults.value = false;
    return;
  }

  const query = searchQuery.value.toLowerCase();
  searchResults.value = silkRoadCitiesTrade.filter(city => {
    const nameMatch = city.name?.toLowerCase().includes(query) || false;
    const terrainMatch = city.terrain?.toLowerCase().includes(query) || false;
    return nameMatch || terrainMatch;
  });
  showSearchResults.value = searchResults.value.length > 0;
};

// 处理搜索框焦点
const handleSearchFocus = () => {
  isSearchFocused.value = true;
  if (searchQuery.value.trim() !== '') {
    showSearchResults.value = true;
  }
};

const handleSearchBlur = () => {
  isSearchFocused.value = false;
  // 延迟关闭搜索结果，以便点击结果
  setTimeout(() => {
    showSearchResults.value = false;
  }, 200);
};

// 选择城市方法
const selectCity = (city) => {
  searchQuery.value = city.name;
  showSearchResults.value = false;
  
  // 触发地图高亮
  if (mapReady.value) {
    const option = mapOption.value;
    option.series[0].data = option.series[0].data.map(item => ({
      ...item,
      selected: item.name === city.name
    }));
    mapOption.value = { ...option };
  }
};

function onPieMouseOver(params) {
  // 只处理扇区（seriesName为"丝路贸易品类占比"）
  if (params && params.seriesName === '丝路贸易品类占比' && typeof params.dataIndex === 'number') {
    showLegendSource(params.dataIndex, { clientX: params.event.event.clientX, clientY: params.event.event.clientY });
  }
}
function onPieMouseOut() {
  hideLegendSource();
}

// 地图高亮相关
const highlightCityOnMap = (city) => {
  if (mapReady.value) {
    const option = mapOption.value;
    option.series[0].data = option.series[0].data.map(item => ({
      ...item,
      selected: item.name === city.name,
      itemStyle: {
        areaColor: item.name === city.name ? '#3da0ff' : '#e6f7ff',
        shadowColor: item.name === city.name ? '#1890ff99' : 'transparent',
        shadowBlur: item.name === city.name ? 30 : 0
      }
    }));
    mapOption.value = { ...option };
  }
};

const resetMapHighlight = () => {
  if (mapReady.value) {
    const option = mapOption.value;
    option.series[0].data = option.series[0].data.map(item => ({
      ...item,
      selected: false,
      itemStyle: {
        areaColor: '#e6f7ff',
        shadowColor: 'transparent',
        shadowBlur: 0
      }
    }));
    mapOption.value = { ...option };
  }
};

// 新增的 selectedCity 和 cityOptions
const selectedCity = ref('');
const cityOptions = ref([
  { value: '西安', label: '西安' },
  { value: '敦煌', label: '敦煌' },
  { value: '喀什', label: '喀什' },
  { value: '撒马尔罕', label: '撒马尔罕' },
  { value: '布拉哈', label: '布拉哈' },
  { value: '梅尔夫', label: '梅尔夫' },
  { value: '巴格达', label: '巴格达' },
  { value: '君士坦丁堡', label: '君士坦丁堡' }  
]);

// 更新仪表盘数据
const updateDashboardData = (cityData) => {
  if (!cityData) return;
  
  // 更新总览数据
  const totalValue = cityData.economy?.annualTrade?.totalVolume?.value || '0';
  const digits = totalValue.replace(/[^\d.]/g, '').split('');
  
  // 更新进口排行榜
  importRankings.value = cityData.economy?.annualTrade?.importRankings || [];
  
  // 更新贸易品类占比
  const tradeCategories = cityData.economy?.annualTrade?.tradeCategories || {};
  pieData.value = Object.entries(tradeCategories).map(([key, value]) => ({
    name: value.name,
    value: value.value
  }));

  // 更新月度趋势
  const monthlyTrends = cityData.monthlyTrends || cityData.economy?.monthlyTrends || { tradeVolume: [] };
  let tradeData = Array.isArray(monthlyTrends.tradeVolume) ? monthlyTrends.tradeVolume.map(Number) : [];
  let caravanData = Array.isArray(monthlyTrends.caravanCount) ? monthlyTrends.caravanCount.map(Number) : [];
  if (tradeData.length < 12) tradeData = [...tradeData, ...Array(12 - tradeData.length).fill(0)];
  else if (tradeData.length > 12) tradeData = tradeData.slice(0, 12);
  if (caravanData.length < 12) caravanData = [...caravanData, ...Array(12 - caravanData.length).fill(0)];
  else if (caravanData.length > 12) caravanData = caravanData.slice(0, 12);
  trendChartOption.value.series[0].data = tradeData;
  trendChartOption.value.series[1].data = caravanData;
  console.log('当前趋势数据：', tradeData, caravanData);
  console.log('cityData:', cityData);
  console.log('cityData.monthlyTrends:', cityData.monthlyTrends);
  console.log('cityData.economy?.monthlyTrends:', cityData.economy?.monthlyTrends);

  // 更新驿站排行
  topCompanies.value = cityData.postSystem?.stationRanking || [];

  // 更新统计卡片
  const stats = cityData.silkRoadStats || cityData.economy?.silkRoadStats || {};
  dataCards.value = [
    {
      title: '丝路总长度',
      value: stats.totalLength?.value || '0公里',
      compare: stats.totalLength?.compare || '0%',
      trend: stats.totalLength?.trend || 'up'
    },
    {
      title: '驿站数量',
      value: stats.stationCount?.value || '0座',
      compare: stats.stationCount?.compare || '0%',
      trend: stats.stationCount?.trend || 'up'
    },
    {
      title: '商队规模',
      value: stats.caravanSize?.value || '0人',
      compare: stats.caravanSize?.compare || '0%',
      trend: stats.caravanSize?.trend || 'up'
    },
    {
      title: '年通行量',
      value: stats.annualPassage?.value || '0支',
      compare: stats.annualPassage?.compare || '0%',
      trend: stats.annualPassage?.trend || 'up'
    },
    {
      title: '官方使团',
      value: stats.officialMissions?.value || '0次',
      compare: stats.officialMissions?.compare || '0%',
      trend: stats.officialMissions?.trend || 'up'
    }
  ];
};

// 处理城市选择变化
const handleCityChange = () => {
  if (
    selectedCity.value &&
    CITY_DATA[selectedCity.value] &&
    CITY_DATA[selectedCity.value].commodities &&
    Array.isArray(CITY_DATA[selectedCity.value].commodities.tradeDistribution) &&
    CITY_DATA[selectedCity.value].commodities.tradeDistribution.length > 0
  ) {
    bubbleChartData.value = convertBubbleData(CITY_DATA[selectedCity.value].commodities.tradeDistribution);
    totalVolume.value = CITY_DATA[selectedCity.value].economy.annualTrade.totalVolume.value;
    updateDashboardData(CITY_DATA[selectedCity.value]);
    // 获取城市对应的省份信息
    const cityInfo = CITY_DATA[selectedCity.value];
    if (cityInfo && cityInfo.province) {
      highlightCityOnMap({ name: cityInfo.province });
    }
  } else {
    bubbleChartData.value = convertBubbleData(SILKROAD_FULL_DATA.commodities.tradeDistribution);
    totalVolume.value = SILKROAD_FULL_DATA.economy.annualTrade.totalVolume.value;
    updateDashboardData(SILKROAD_FULL_DATA);
    resetMapHighlight();
  }
};

const totalVolume = ref('');

const totalVolumeDigits = computed(() => {
  // 只保留数字和小数点
  return (totalVolume.value || '').replace(/[^\d.]/g, '').split('');
});

const bubbleColors = [
  '#4ecdc4', '#36a2eb', '#ffcd56', '#9966ff', '#ff6384',
  '#f67280', '#c06c84', '#6c5b7b', '#355c7d', '#f8b195'
];

const piePercentData = computed(() => {
  const total = pieData.value.reduce((sum, item) => sum + Number(item.value), 0);
  if (total === 0) return [];
  return pieData.value.map(item => ({
    name: item.name,
    percent: ((Number(item.value) / total) * 100).toFixed(1) // 保留1位小数
  }));
});

// 计算商品排行TOP10的百分比
const rankingPercentData = computed(() => {
  const total = importRankings.value.reduce((sum, item) => sum + Number(item.value.toString().replace(/[^\d.]/g, '')), 0);
  if (total === 0) return [];
  return importRankings.value.map(item => ({
    name: item.name,
    value: item.value,
    percent: ((Number(item.value.toString().replace(/[^\d.]/g, '')) / total) * 100).toFixed(1)
  }));
});
</script>

<style lang="scss" scoped>
body, #app {
  margin: 0 !important;
  padding: 0 !important;
  height: 100%;
}
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 32px;
  background: #fff;
  color: #1890ff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  .nav-title {
    font-size: 28px;
    font-weight: bold;
    letter-spacing: 2px;
    text-shadow: 0 2px 8px #3da0ff44;
    margin-right: 32px;
    white-space: nowrap;
  }
  .nav-tabs {
    display: flex;
    flex: 1;
    .tab {
      padding: 0 32px;
      font-size: 20px;
      font-weight: 500;
      border-radius: 12px 12px 0 0;
      margin: 0 2px;
      cursor: pointer;
      color: #1890ff;
      background: transparent;
      position: relative;
      transition: color 0.2s, background 0.2s;
      &.active {
        color: #1890ff;
        background: rgba(24, 144, 255, 0.1);
        text-shadow: none;
        &:after {
          content: '';
          position: absolute;
          left: 20%;
          right: 20%;
          bottom: 0;
          height: 4px;
          background: linear-gradient(90deg, #1890ff 0%, #3da0ff 100%);
          border-radius: 2px;
        }
      }
      &:hover {
        color: #1890ff;
        background: rgba(24, 144, 255, 0.08);
      }
    }
  }
  .nav-right, .year-display {
    .year, .year-display, .search-input {
      font-size: 18px;
    }
    .search-input {
      font-size: 18px;
    }
  }
}
.dashboard-content {
  margin-top: 0 !important;
  padding-top: 0 !important;
  display: grid;
  grid-template-columns: 320px 1fr 320px;
  grid-template-rows: auto 1fr auto;
  gap: 10px;
  height: calc(100vh - 90px);
  min-height: 0;
  background: none;
}
.left-panel, .right-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
}
.center-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  .top-stats-row {
    display: flex;
    gap: 10px;
    margin-bottom: 0;
    margin-top: 18px;
  }
  .map-container {
    flex: 1 1 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    .chart {
      flex: 1 1 0;
      width: 100% !important;
      height: 100% !important;
      min-height: 0;
      min-width: 0;
      margin: 0;
      padding: 0;
    }
  }
  .bottom-row {
    display: flex;
    gap: 10px;
    margin-top: 0;
    .data-card {
      flex: 1 1 0;
      min-width: 0;
      min-height: 180px;
    }
  }
}
.data-card {
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: linear-gradient(120deg, #fff 80%, #e6f7ff 100%);
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.1), 0 1.5px 0 0 #3da0ff inset;
  border: 1.5px solid #e6f7ff;
  padding: 10px 16px;
  margin-bottom: 0;
}

// 卡片通用样式
.data-card, .mini-data-card, .map-container {
  background: linear-gradient(120deg, #fff 80%, #e6f7ff 100%);
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 #3da0ff22, 0 1.5px 0 0 #3da0ff inset;
  border: 1.5px solid #e6f7ff;
  margin-bottom: 12px;
  transition: box-shadow 0.3s;
  padding: 10px 12px;
  &:hover { box-shadow: 0 0 32px 2px #3da0ff55; }
}

    .card-header {
  font-size: 16px;
  font-weight: bold;
  color: #1890ff;
  border-bottom: 1px solid #e6f7ff;
  background: linear-gradient(90deg, #e6f7ff 0%, #fff 100%);
  padding: 10px 16px;
      display: flex;
      align-items: center;
  .dot {
    width: 8px; height: 8px; background: #3da0ff; border-radius: 50%; margin-right: 10px;
  }
      .more-link {
    margin-left: auto; color: #3da0ff; font-size: 13px; cursor: pointer;
    &:hover { color: #1890ff; text-shadow: 0 0 8px #3da0ff44; }
  }
        }
        
        .value-digits {
          display: flex;
          align-items: center;
  margin-top: 8px;
          .digit {
    background: linear-gradient(180deg, #3da0ff 0%, #1890ff 100%);
    color: #fff;
    font-size: 22px;
    border-radius: 6px;
    margin: 0 2px;
            font-weight: bold;
    box-shadow: 0 2px 8px #3da0ff33;
    width: 26px;
    height: 36px;
    line-height: 36px;
    text-align: center;
          }
          .dot {
            margin: 0 2px;
    color: #3da0ff;
            font-weight: bold;
    font-size: 22px;
  }
}

// 地图美化
.map-container {
  min-height: 420px;
  background: rgba(255,255,255,0.95);
  border-radius: 18px;
  box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.1), 0 1.5px 0 0 #3da0ff inset;
  border: 1.5px solid #e6f7ff;
  position: relative;
  overflow: visible;
}

// 图表色彩建议（ECharts option 里设置）
// geo/itemStyle/areaColor: #e6f7ff
// geo/itemStyle/borderColor: #3da0ff
// geo/emphasis/areaColor: #3da0ff
// geo/emphasis/shadowColor: #1890ff99
// geo/emphasis/shadowBlur: 30

// 按钮美化
button, .zoom-button, .action-button, .search-input {
  border-radius: 12px !important;
  background: linear-gradient(90deg, #3da0ff 0%, #1890ff 100%) !important;
  color: #fff !important;
  border: none;
  box-shadow: 0 2px 8px #3da0ff33;
  font-size: 15px;
  padding: 6px 16px;
  cursor: pointer;
  transition: box-shadow 0.2s, background 0.2s;
  &:hover {
    background: linear-gradient(90deg, #1890ff 0%, #3da0ff 100%) !important;
    box-shadow: 0 0 12px #3da0ff88;
  }
}

// 卡片内容字体
.total-value {
  padding: 18px 18px 0 18px;
  .value-label {
    font-size: 14px;
    color: #666;
  }
}
.value-progress {
  padding: 0 18px 12px 18px;
  .progress-bar {
    height: 6px;
    background: linear-gradient(90deg, #3da0ff 0%, #1890ff 100%);
    border-radius: 3px;
  }
}
      .value-details {
        display: flex;
  padding: 12px 18px;
  border-top: 1px solid #e6f7ff;
        .detail-item {
          flex: 1;
          display: flex;
          align-items: center;
          .detail-icon {
      width: 32px;
      height: 32px;
            border-radius: 50%;
      margin-right: 12px;
      &.import { background: #4ecdc4; }
      &.export { background: #ff6384; }
    }
          .detail-info {
            .detail-label {
        font-size: 13px;
        color: #888;
            }
            .detail-value {
        font-size: 15px;
              font-weight: bold;
        color: #222;
      }
    }
  }
}

// 气泡图、排行、公司等卡片内容可参考上面风格，略

// 响应式
@media (max-width: 1200px) {
  .dashboard-content {
    grid-template-columns: 1fr 1fr;
  }
  .left-panel, .right-panel {
    min-width: 0;
    max-width: none;
    flex: 1 1 0;
  }
}
@media (max-width: 900px) {
  .dashboard-content {
    grid-template-columns: 1fr;
  }
  .center-panel .top-stats-row {
    flex-direction: column;
    gap: 10px;
  }
  .center-panel .bottom-row {
    flex-direction: column;
    gap: 10px;
  }
}

.big-number {
  font-size: 32px; font-weight: bold; color: #3da0ff; text-align: center; margin-bottom: 12px;
}

.chart {
  width: 100%;
  height: 420px;
  min-height: 300px;
}

.top-stats-row {
  display: flex;
  flex-direction: row;
  gap: 18px;
  margin-bottom: 18px;
  justify-content: space-between;
  align-items: stretch;
}
.top-stat-card {
  flex: 1 1 0;
  min-width: 120px;
  background: linear-gradient(120deg, #fff 80%, #e6f7ff 100%);
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border: 1.5px solid #e6f7ff;
    display: flex;
    flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  .stat-title {
    font-size: 14px;
    color: #1890ff;
    margin-bottom: 6px;
    font-weight: bold;
  }
  .stat-value {
    font-size: 22px;
          font-weight: bold;
    color: #3da0ff;
        }
  .stat-footer {
          font-size: 12px;
    color: #888;
    margin-top: 4px;
    display: flex;
    gap: 6px;
    .up { color: #4ecdc4; }
    .down { color: #ff6384; }
  }
}
@media (max-width: 900px) {
  .top-stats-row {
    flex-wrap: wrap;
    gap: 12px;
  }
  .top-stat-card {
    min-width: 120px;
    font-size: 13px;
    padding: 12px 0;
        }
      }
      
      .ranking-list {
  padding: 4px 0;
        .ranking-item {
          display: flex;
          align-items: center;
    margin-bottom: 4px;
    font-size: 14px;
    line-height: 1.2;
    background: none;
    border-radius: 8px;
    transition: background 0.2s;
            &:hover {
      background: #e6f7ff;
    }
          .ranking-index {
      width: 22px;
      height: 22px;
      line-height: 22px;
            text-align: center;
      color: #fff;
      background: #3da0ff;
      border-radius: 50%;
      font-weight: bold;
            margin-right: 8px;
      font-size: 13px;
      flex-shrink: 0;
    }
          .ranking-name {
      flex: 1;
      color: #1890ff;
      font-weight: 500;
      margin-right: 8px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
      font-size: 14px;
    }
          .ranking-value {
            width: 70px;
            text-align: right;
      color: #888;
      font-size: 13px;
      flex-shrink: 0;
    }
    .ranking-bar-container { display: none; }
  }
}
      .company-list {
        .company-item {
    display: flex;
          align-items: center;
    padding: 6px 0;
    border-bottom: 1px solid #e6f7ff;
    font-size: 13px;
    line-height: 1.2;
    &:last-child { border-bottom: none; }
          .company-rank {
            width: 20px;
            text-align: center;
      color: #fff;
      background: #3da0ff;
      border-radius: 10px;
      font-weight: bold;
      margin-right: 8px;
          font-size: 12px;
      flex-shrink: 0;
            }
          .company-info {
            flex: 1;
            .company-name {
              font-size: 13px;
        color: #1890ff;
        font-weight: 500;
        margin-bottom: 0;
            }
            .company-value {
          font-size: 12px;
        color: #888;
        margin-top: 0;
      }
    }
  }
}

// 缩小"丝路贸易物品分布"卡片
.partners-card {
  .bubble-chart {
    height: 180px;
    min-height: 180px;
    padding: 4px;
    overflow: visible;
    .chart {
      height: 220px !important;
      min-height: 200px;
      overflow: visible;
    }
  }
}
// 缩小"丝路贸易品类占比"卡片
.pie-card {
  height: 250px;
  .pie-chart {
    height: 200px;
    padding: 4px;
    .chart {
      height: 180px !important;
      min-height: 80px;
    }
  }
}
// 缩小"季节贸易趋势"卡片
.trend-card {
  height: 240px;
  .trend-chart {
    height: 200px;
    min-height: 180px;
    padding: 4px;
    .chart {
      height: 180px !important;
      min-height: 160px;
      width: 100% !important;
      min-width: 100px;
      overflow: visible;
    }
  }
}

.pie-legend {
          display: flex;
          flex-direction: column;
  justify-content: center;
  margin-left: 12px;
  .legend-item {
            display: flex;
            align-items: center;
    font-size: 15px;
    margin-bottom: 8px;
    .dot {
      width: 12px; height: 12px; border-radius: 50%; margin-right: 8px;
    }
    .value {
      margin-left: 8px; color: #1890ff; font-weight: bold;
    }
  }
}

// 弹窗样式
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
            justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 16px;
  width: 80%;
  max-width: 900px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 16px 24px;
  border-bottom: 1px solid #e6f7ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h3 {
    margin: 0;
    color: #1890ff;
    font-size: 20px;
  }
  
  .icon-close {
    font-size: 24px;
    color: #999;
    cursor: pointer;
    &:hover {
      color: #1890ff;
    }
  }
}

.modal-body {
  padding: 24px;
}

.modal-section {
  margin-bottom: 24px;
  
  h4 {
    color: #1890ff;
    margin: 0 0 16px 0;
    font-size: 16px;
  }
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.detail-item {
  background: #f5f7fa;
  padding: 16px;
  border-radius: 8px;
  
  .label {
    display: block;
    color: #666;
    font-size: 14px;
    margin-bottom: 8px;
  }
  
  .value {
    display: block;
    color: #1890ff;
    font-size: 18px;
    font-weight: bold;
    
    &.up { color: #4ecdc4; }
    &.down { color: #ff6384; }
  }
}

.chart-container {
  height: 300px;
  margin-top: 16px;
}

.ranking-table {
  .table-header {
    display: grid;
    grid-template-columns: 60px 1fr 120px 80px;
    padding: 12px;
    background: #f5f7fa;
    border-radius: 8px;
    margin-bottom: 8px;
    font-weight: bold;
    color: #1890ff;
  }
  
  .table-body {
    .table-row {
      display: grid;
      grid-template-columns: 60px 1fr 120px 80px;
      padding: 12px;
      border-bottom: 1px solid #e6f7ff;
          
          &:last-child {
            border-bottom: none;
          }
          
      .col-rank {
        color: #1890ff;
        font-weight: bold;
      }
      
      .col-name {
        color: #333;
      }
      
      .col-value {
              color: #666;
            }
      
      .col-percent {
        color: #1890ff;
        font-weight: bold;
      }
    }
  }
}

// 修改卡片中的更多按钮样式
.more-link {
  cursor: pointer;
  &:hover {
    color: #1890ff;
    text-decoration: underline;
  }
}

// 搜索框样式
.search-container {
  position: relative;
  margin-left: 16px;
  transition: all 0.3s ease;
}

.search-input {
  width: 200px;
  height: 32px;
  padding: 0 12px;
  border: none;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.3);
    width: 240px;
  }
  
  &.search-input-focused {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
  }
}

.search-results {
  position: absolute;
  top: 40px;
  left: 0;
  width: 240px;
  max-height: 300px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow-y: auto;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  
  &.search-results-visible {
    opacity: 1;
    transform: translateY(0);
  }
}

.search-result-item {
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #e6f7ff;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #e6f7ff;
    transform: translateX(4px);
  }
  
  .city-name {
    font-size: 14px;
    color: #1890ff;
    font-weight: 500;
    margin-bottom: 4px;
  }
  
  .city-info {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #666;
    
    .terrain {
      background: #e6f7ff;
      color: #1890ff;
      padding: 2px 6px;
      border-radius: 4px;
    }
    
    .importance {
      color: #999;
    }
  }
  
  .city-preview {
    margin-top: 8px;
    border-radius: 4px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 80px;
      object-fit: cover;
    }
  }
}

// 修改年份显示样式
.year-display {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #1890ff;
  
  .dot {
    width: 4px;
    height: 4px;
    background: #1890ff;
    border-radius: 50%;
    margin: 0 12px;
    opacity: 0.6;
  }
}

.legend-tooltip {
  position: fixed;
  z-index: 9999;
  background: linear-gradient(135deg, #f8fbff 60%, #e3f0ff 100%);
  color: #222;
  border: 1.5px solid #3da0ff;
  border-radius: 12px;
  box-shadow: 0 6px 32px #3da0ff33;
  padding: 16px 20px;
  font-size: 15px;
  min-width: 220px;
  max-width: 380px;
  pointer-events: none;
  white-space: pre-line;
  line-height: 1.7;
  font-family: 'HarmonyOS Sans', 'Microsoft YaHei', Arial, sans-serif;
  transition: box-shadow 0.2s;
}
.legend-tooltip div {
  margin-bottom: 6px;
}

// 全局数据来源弹窗
.source-modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.source-modal {
  background: #fff;
  border-radius: 16px;
  width: 80%;
  max-width: 900px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  padding: 24px;
}

.source-modal-title {
  font-size: 20px;
  font-weight: bold;
  color: #1890ff;
  margin-bottom: 16px;
}

.source-modal-content {
  max-height: 500px;
  overflow-y: auto;
}

.source-modal-close {
  margin-top: 16px;
  padding: 8px 16px;
  background: linear-gradient(90deg, #3da0ff 0%, #1890ff 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: linear-gradient(90deg, #1890ff 0%, #3da0ff 100%);
  }
}

.city-select-container {
  position: relative;
  margin-left: 20px;
}

.city-select {
  width: 200px;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #fff;
  font-size: 14px;
  color: #1890ff;
  cursor: pointer;
  transition: all 0.3s;
}

.city-select:focus {
  outline: none;
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.city-select:hover {
  border-color: #40a9ff;
}

.city-label {
  color: #1890ff;
  font-weight: bold;
  margin-right: 6px;
}

.port-dashboard {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  min-width: 0;
  min-height: 0;
  background: #fff;
  font-family: 'HarmonyOS Sans', 'Microsoft YaHei', Arial, sans-serif;
  color: #222;
  overflow: hidden;
}

.left-panel, .right-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
}

.center-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  .top-stats-row {
    display: flex;
    gap: 10px;
    margin-bottom: 0;
    margin-top: 18px;
  }
  .map-container {
    flex: 1 1 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    .chart {
      flex: 1 1 0;
      width: 100% !important;
      height: 100% !important;
      min-height: 0;
      min-width: 0;
      margin: 0;
      padding: 0;
    }
  }
  .bottom-row {
    display: flex;
    gap: 10px;
    margin-top: 0;
    .data-card {
      flex: 1 1 0;
      min-width: 0;
      min-height: 180px;
    }
  }
}
</style>