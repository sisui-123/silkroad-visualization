<script setup>
import { ref, onMounted, watch, inject, computed, nextTick } from 'vue';
import { usePeriodStore } from '../store/period.store';
import { useChartStore } from '../store/chart.store';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
  ToolboxComponent,
  VisualMapComponent // 添加 VisualMapComponent
} from 'echarts/components';
import { LineChart, BarChart, PieChart, ScatterChart, HeatmapChart } from 'echarts/charts'; // 添加 ScatterChart 和 HeatmapChart
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

// 注册 ECharts 组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
  ToolboxComponent,
  VisualMapComponent, // 添加 VisualMapComponent
  LineChart,
  BarChart,
  PieChart,
  ScatterChart, // 添加 ScatterChart
  HeatmapChart, // 添加 HeatmapChart
  CanvasRenderer,
  UniversalTransition
]);

// 使用 store
const periodStore = usePeriodStore();
const chartStore = useChartStore();

// 从父组件注入数据模式
const dataMode = inject('dataMode', ref('overview'));

// 图表容器引用 - 确保初始化为 null 数组
const chartRefs = ref([null, null, null, null]);

// 图表实例数组 - 确保初始化
const charts = ref([null, null, null, null]);

// 比较模式的对比朝代
const comparisonPeriod = inject('comparisonPeriod', ref(null));


// 当前选中的数据类别
const selectedCategory = ref('economic');

// 从父组件注入当前选中的城市
const selectedCity = inject('selectedCity', ref('xian'));
// 城市名称映射
const cityNameMap = {
  'xian': '西安',
  'dunhuang': '敦煌',
  'kashgar': '喀什'
};

// 计算当前城市的显示名称
const currentCityName = computed(() => {
  return cityNameMap[selectedCity.value];
});


// 图表加载状态
const isLoading = ref(true);
const loadError = ref(null);

// 生成模拟数据
const generateMockData = (category,city=selectedCity.value) => {
  const mockData = {};
  
  if(city==='西安'){
    switch (category) {
        
        case 'economic':
          mockData.tradeRatio = [
            { year: 618, value: 15, name: '唐初丝路贸易' },
            { year: 700, value: 35, name: '盛唐丝路贸易' },
            { year: 800, value: 40, name: '中唐丝路贸易' },
            { year: 900, value: 30, name: '晚唐丝路贸易' },
            { year: 1000, value: 20, name: '宋初丝路贸易' },
            { year: 1100, value: 25, name: '北宋丝路贸易' },
            { year: 1200, value: 30, name: '南宋丝路贸易' },
            { year: 1300, value: 15, name: '元代丝路贸易' }
          ];
          
          mockData.caravans = [
            { year: 618, count: 120, name: '唐初商队' },
            { year: 700, count: 350, name: '盛唐商队' },
            { year: 800, count: 400, name: '中唐商队' },
            { year: 900, count: 280, name: '晚唐商队' },
            { year: 1000, count: 150, name: '宋初商队' },
            { year: 1100, count: 220, name: '北宋商队' },
            { year: 1200, count: 260, name: '南宋商队' },
            { year: 1300, count: 180, name: '元代商队' }
          ];
          
          mockData.agriculture = [
            { name: '粮食作物', value: 60 },
            { name: '经济作物', value: 25 },
            { name: '果蔬种植', value: 10 },
            { name: '其他农产', value: 5 }
          ];
          
          mockData.revenue = convertToPercentage([
            { year: 618, value: 100, name: '唐初财政' },
            { year: 700, value: 450, name: '盛唐财政' },
            { year: 800, value: 380, name: '中唐财政' },
            { year: 900, value: 250, name: '晚唐财政' },
            { year: 1000, value: 180, name: '宋初财政' },
            { year: 1100, value: 320, name: '北宋财政' },
            { year: 1200, value: 280, name: '南宋财政' },
            { year: 1300, value: 150, name: '元代财政' }
          ])
          break;
          
        case 'population':
          mockData.total = [
            { year: 618, value: 80, name: '唐初人口' },
            { year: 700, value: 120, name: '盛唐人口' },
            { year: 800, value: 100, name: '中唐人口' },
            { year: 900, value: 85, name: '晚唐人口' },
            { year: 1000, value: 70, name: '宋初人口' },
            { year: 1100, value: 95, name: '北宋人口' },
            { year: 1200, value: 110, name: '南宋人口' },
            { year: 1300, value: 65, name: '元代人口' }
          ];
          
          mockData.distribution = [
            { name: '城内居民', value: 40 },
            { name: '近郊居民', value: 30 },
            { name: '远郊农民', value: 20 },
            { name: '流动人口', value: 10 }
          ];
          
          mockData.urbanRatio = [
            { year: 618, value: 25, name: '唐初城市化' },
            { year: 700, value: 40, name: '盛唐城市化' },
            { year: 800, value: 35, name: '中唐城市化' },
            { year: 900, value: 30, name: '晚唐城市化' },
            { year: 1000, value: 28, name: '宋初城市化' },
            { year: 1100, value: 38, name: '北宋城市化' },
            { year: 1200, value: 42, name: '南宋城市化' },
            { year: 1300, value: 32, name: '元代城市化' }
          ];
          
          mockData.density = [
            { year: 618, count: 150, name: '唐初密度' },
            { year: 700, count: 280, name: '盛唐密度' },
            { year: 800, count: 250, name: '中唐密度' },
            { year: 900, count: 200, name: '晚唐密度' },
            { year: 1000, count: 180, name: '宋初密度' },
            { year: 1100, count: 240, name: '北宋密度' },
            { year: 1200, count: 260, name: '南宋密度' },
            { year: 1300, count: 170, name: '元代密度' }
          ];
          break;
          
        case 'military':
          mockData.armySize = [
            { year: 618, value: 50, name: '唐初军队' },
            { year: 700, value: 120, name: '盛唐军队' },
            { year: 800, value: 100, name: '中唐军队' },
            { year: 900, value: 80, name: '晚唐军队' },
            { year: 1000, value: 60, name: '宋初军队' },
            { year: 1100, value: 90, name: '北宋军队' },
            { year: 1200, value: 85, name: '南宋军队' },
            { year: 1300, value: 70, name: '元代军队' }
          ];
          
          mockData.composition = [
            { name: '步兵', value: 60 },
            { name: '骑兵', value: 25 },
            { name: '弓箭手', value: 10 },
            { name: '辅助部队', value: 5 }
          ];
          
          mockData.battles = [
            { year: 618, name: '玄武门之变', result: '胜利' },
            { year: 700, name: '安西都护府战役', result: '胜利' },
            { year: 751, name: '怛罗斯战役', result: '失败' },
            { year: 755, name: '安史之乱', result: '失败' },
            { year: 800, name: '西域战役', result: '胜利' },
            { year: 900, name: '黄巢起义', result: '失败' },
            { year: 1000, name: '西夏战役', result: '失败' },
            { year: 1100, name: '靖康之变', result: '失败' }
          ];
          
          mockData.weapons = [
            { year: 618, count: 5000, name: '唐初兵器' },
            { year: 700, count: 12000, name: '盛唐兵器' },
            { year: 800, count: 10000, name: '中唐兵器' },
            { year: 900, count: 8000, name: '晚唐兵器' },
            { year: 1000, count: 6000, name: '宋初兵器' },
            { year: 1100, count: 9000, name: '北宋兵器' },
            { year: 1200, count: 8500, name: '南宋兵器' },
            { year: 1300, count: 7000, name: '元代兵器' }
          ];
          break;
          
        case 'culture':
          mockData.literature = [
            { year: 618, count: 120, name: '唐初文学' },
            { year: 700, count: 350, name: '盛唐文学' },
            { year: 800, count: 300, name: '中唐文学' },
            { year: 900, count: 250, name: '晚唐文学' },
            { year: 1000, count: 180, name: '宋初文学' },
            { year: 1100, count: 320, name: '北宋文学' },
            { year: 1200, count: 280, name: '南宋文学' },
            { year: 1300, count: 150, name: '元代文学' }
          ];
          
          mockData.inventions = [
            { year: 618, impact: 70, name: '印刷术改良' },
            { year: 700, impact: 90, name: '火药发明' },
            { year: 800, impact: 85, name: '指南针应用' },
            { year: 900, impact: 75, name: '瓷器工艺' },
            { year: 1000, impact: 80, name: '活字印刷' },
            { year: 1100, impact: 95, name: '造纸技术' },
            { year: 1200, impact: 88, name: '天文仪器' },
            { year: 1300, impact: 65, name: '航海技术' }
          ];
          
          mockData.education = [
            { year: 618, literacyRate: 15, name: '唐初教育' },
            { year: 700, literacyRate: 25, name: '盛唐教育' },
            { year: 800, literacyRate: 22, name: '中唐教育' },
            { year: 900, literacyRate: 18, name: '晚唐教育' },
            { year: 1000, literacyRate: 20, name: '宋初教育' },
            { year: 1100, literacyRate: 28, name: '北宋教育' },
            { year: 1200, literacyRate: 30, name: '南宋教育' },
            { year: 1300, literacyRate: 22, name: '元代教育' }
          ];
          
          mockData.religion = [
            { name: '佛教', followers: 45 },
            { name: '道教', followers: 30 },
            { name: '儒家', followers: 20 },
            { name: '其他', followers: 5 }
          ];
          break;
      }
    }else if(city==='敦煌'){
      switch (category) {
        
      case 'economic':
        mockData.tradeRatio = [
          { year: 618, value: 25, name: '唐初丝路贸易' },
          { year: 700, value: 45, name: '盛唐丝路贸易' },
          { year: 800, value: 50, name: '中唐丝路贸易' },
          { year: 900, value: 40, name: '晚唐丝路贸易' },
          { year: 1000, value: 30, name: '宋初丝路贸易' },
          { year: 1100, value: 35, name: '北宋丝路贸易' },
          { year: 1200, value: 40, name: '南宋丝路贸易' },
          { year: 1300, value: 25, name: '元代丝路贸易' }
        ];
        
        mockData.caravans = [
          { year: 618, count: 180, name: '唐初商队' },
          { year: 700, count: 420, name: '盛唐商队' },
          { year: 800, count: 480, name: '中唐商队' },
          { year: 900, count: 350, name: '晚唐商队' },
          { year: 1000, count: 220, name: '宋初商队' },
          { year: 1100, count: 280, name: '北宋商队' },
          { year: 1200, count: 320, name: '南宋商队' },
          { year: 1300, count: 240, name: '元代商队' }
        ];
        
        mockData.agriculture = [
          { name: '粮食作物', value: 40 },
          { name: '经济作物', value: 15 },
          { name: '果蔬种植', value: 15 },
          { name: '绿洲农业', value: 30 }
        ];
        
        mockData.revenue = [
          { year: 618, value: 80, name: '唐初财政' },
          { year: 700, value: 350, name: '盛唐财政' },
          { year: 800, value: 300, name: '中唐财政' },
          { year: 900, value: 200, name: '晚唐财政' },
          { year: 1000, value: 150, name: '宋初财政' },
          { year: 1100, value: 250, name: '北宋财政' },
          { year: 1200, value: 220, name: '南宋财政' },
          { year: 1300, value: 120, name: '元代财政' }
        ];
        break;

        case 'population':
        mockData.total = [
          { year: 618, value: 30, name: '唐初人口' },
          { year: 700, value: 60, name: '盛唐人口' },
          { year: 800, value: 50, name: '中唐人口' },
          { year: 900, value: 40, name: '晚唐人口' },
          { year: 1000, value: 35, name: '宋初人口' },
          { year: 1100, value: 45, name: '北宋人口' },
          { year: 1200, value: 55, name: '南宋人口' },
          { year: 1300, value: 30, name: '元代人口' }
        ];
        
        mockData.distribution = [
          { name: '城内居民', value: 35 },
          { name: '近郊居民', value: 25 },
          { name: '绿洲农民', value: 30 },
          { name: '流动人口', value: 10 }
        ];
        
        mockData.urbanRatio = [
          { year: 618, value: 20, name: '唐初城市化' },
          { year: 700, value: 35, name: '盛唐城市化' },
          { year: 800, value: 30, name: '中唐城市化' },
          { year: 900, value: 25, name: '晚唐城市化' },
          { year: 1000, value: 22, name: '宋初城市化' },
          { year: 1100, value: 32, name: '北宋城市化' },
          { year: 1200, value: 36, name: '南宋城市化' },
          { year: 1300, value: 28, name: '元代城市化' }
        ];
        
        mockData.density = [
          { year: 618, count: 80, name: '唐初密度' },
          { year: 700, count: 150, name: '盛唐密度' },
          { year: 800, count: 130, name: '中唐密度' },
          { year: 900, count: 110, name: '晚唐密度' },
          { year: 1000, count: 90, name: '宋初密度' },
          { year: 1100, count: 120, name: '北宋密度' },
          { year: 1200, count: 140, name: '南宋密度' },
          { year: 1300, count: 85, name: '元代密度' }
        ];
        break;

      case 'military':
        mockData.armySize = [
          { year: 618, value: 20, name: '唐初军队' },
          { year: 700, value: 60, name: '盛唐军队' },
          { year: 800, value: 50, name: '中唐军队' },
          { year: 900, value: 40, name: '晚唐军队' },
          { year: 1000, value: 30, name: '宋初军队' },
          { year: 1100, value: 45, name: '北宋军队' },
          { year: 1200, value: 40, name: '南宋军队' },
          { year: 1300, value: 35, name: '元代军队' }
        ];
        
        mockData.composition = [
          { name: '步兵', value: 50 },
          { name: '骑兵', value: 35 },
          { name: '弓箭手', value: 10 },
          { name: '辅助部队', value: 5 }
        ];
        
        mockData.battles = [
          { year: 630, name: '高昌之战', result: '胜利' },
          { year: 715, name: '安西四镇战役', result: '胜利' },
          { year: 751, name: '怛罗斯战役', result: '失败' },
          { year: 755, name: '安史之乱影响', result: '失败' },
          { year: 781, name: '吐蕃入侵', result: '失败' },
          { year: 848, name: '沙州回归', result: '胜利' },
          { year: 1036, name: '西夏入侵', result: '失败' },
          { year: 1227, name: '蒙古征服', result: '失败' }
        ];
        
        mockData.weapons = [
          { year: 618, count: 2000, name: '唐初兵器' },
          { year: 700, count: 6000, name: '盛唐兵器' },
          { year: 800, count: 5000, name: '中唐兵器' },
          { year: 900, count: 4000, name: '晚唐兵器' },
          { year: 1000, count: 3000, name: '宋初兵器' },
          { year: 1100, count: 4500, name: '北宋兵器' },
          { year: 1200, count: 4200, name: '南宋兵器' },
          { year: 1300, count: 3500, name: '元代兵器' }
        ];
        break;

        case 'culture':
        mockData.literature = [
          { year: 618, count: 80, name: '唐初文学' },
          { year: 700, count: 250, name: '盛唐文学' },
          { year: 800, count: 220, name: '中唐文学' },
          { year: 900, count: 180, name: '晚唐文学' },
          { year: 1000, count: 120, name: '宋初文学' },
          { year: 1100, count: 220, name: '北宋文学' },
          { year: 1200, count: 200, name: '南宋文学' },
          { year: 1300, count: 100, name: '元代文学' }
        ];
        
        mockData.inventions = [
          { year: 650, impact: 85, name: '敦煌壁画技术' },
          { year: 700, impact: 80, name: '丝绸染色工艺' },
          { year: 750, impact: 75, name: '佛经装帧技术' },
          { year: 820, impact: 70, name: '石窟建造技术' },
          { year: 900, impact: 65, name: '敦煌乐舞' },
          { year: 1000, impact: 75, name: '藏经洞保存技术' },
          { year: 1100, impact: 70, name: '西域乐器改良' },
          { year: 1200, impact: 60, name: '壁画修复技术' }
        ];
        
        mockData.education = [
          { year: 618, literacyRate: 10, name: '唐初教育' },
          { year: 700, literacyRate: 18, name: '盛唐教育' },
          { year: 800, literacyRate: 16, name: '中唐教育' },
          { year: 900, literacyRate: 12, name: '晚唐教育' },
          { year: 1000, literacyRate: 14, name: '宋初教育' },
          { year: 1100, literacyRate: 20, name: '北宋教育' },
          { year: 1200, literacyRate: 22, name: '南宋教育' },
          { year: 1300, literacyRate: 15, name: '元代教育' }
        ];
        
        mockData.religion = [
          { name: '佛教', followers: 70 },
          { name: '道教', followers: 15 },
          { name: '儒家', followers: 10 },
          { name: '其他', followers: 5 }
        ];
        break;
    }
  }else if(city==='喀什'){
    switch (category) {
      
      case 'economic':
        mockData.tradeRatio = [
          { year: 618, value: 30, name: '唐初丝路贸易' },
          { year: 700, value: 50, name: '盛唐丝路贸易' },
          { year: 800, value: 55, name: '中唐丝路贸易' },
          { year: 900, value: 45, name: '晚唐丝路贸易' },
          { year: 1000, value: 35, name: '宋初丝路贸易' },
          { year: 1100, value: 40, name: '北宋丝路贸易' },
          { year: 1200, value: 45, name: '南宋丝路贸易' },
          { year: 1300, value: 60, name: '元代丝路贸易' }
        ];
        
        mockData.caravans = [
          { year: 618, count: 200, name: '唐初商队' },
          { year: 700, count: 450, name: '盛唐商队' },
          { year: 800, count: 500, name: '中唐商队' },
          { year: 900, count: 380, name: '晚唐商队' },
          { year: 1000, count: 250, name: '宋初商队' },
          { year: 1100, count: 320, name: '北宋商队' },
          { year: 1200, count: 360, name: '南宋商队' },
          { year: 1300, count: 420, name: '元代商队' }
        ];
        
        mockData.agriculture = [
          { name: '粮食作物', value: 35 },
          { name: '经济作物', value: 20 },
          { name: '果蔬种植', value: 25 },
          { name: '绿洲农业', value: 20 }
        ];
        
        mockData.revenue = [
          { year: 618, value: 70, name: '唐初财政' },
          { year: 700, value: 320, name: '盛唐财政' },
          { year: 800, value: 280, name: '中唐财政' },
          { year: 900, value: 180, name: '晚唐财政' },
          { year: 1000, value: 130, name: '宋初财政' },
          { year: 1100, value: 220, name: '北宋财政' },
          { year: 1200, value: 200, name: '南宋财政' },
          { year: 1300, value: 250, name: '元代财政' }
        ];
        break;

        case 'population':
        mockData.total = [
          { year: 618, value: 25, name: '唐初人口' },
          { year: 700, value: 50, name: '盛唐人口' },
          { year: 800, value: 45, name: '中唐人口' },
          { year: 900, value: 35, name: '晚唐人口' },
          { year: 1000, value: 30, name: '宋初人口' },
          { year: 1100, value: 40, name: '北宋人口' },
          { year: 1200, value: 45, name: '南宋人口' },
          { year: 1300, value: 55, name: '元代人口' }
        ];
        
        mockData.distribution = [
          { name: '城内居民', value: 30 },
          { name: '近郊居民', value: 25 },
          { name: '绿洲农民', value: 35 },
          { name: '流动人口', value: 10 }
        ];
        
        mockData.urbanRatio = [
          { year: 618, value: 18, name: '唐初城市化' },
          { year: 700, value: 30, name: '盛唐城市化' },
          { year: 800, value: 28, name: '中唐城市化' },
          { year: 900, value: 22, name: '晚唐城市化' },
          { year: 1000, value: 20, name: '宋初城市化' },
          { year: 1100, value: 28, name: '北宋城市化' },
          { year: 1200, value: 32, name: '南宋城市化' },
          { year: 1300, value: 38, name: '元代城市化' }
        ];
        
        mockData.density = [
          { year: 618, count: 70, name: '唐初密度' },
          { year: 700, count: 130, name: '盛唐密度' },
          { year: 800, count: 120, name: '中唐密度' },
          { year: 900, count: 100, name: '晚唐密度' },
          { year: 1000, count: 80, name: '宋初密度' },
          { year: 1100, count: 110, name: '北宋密度' },
          { year: 1200, count: 125, name: '南宋密度' },
          { year: 1300, count: 150, name: '元代密度' }
        ];
        break;
        
        case 'military':
        mockData.armySize = [
          { year: 618, value: 15, name: '唐初军队' },
          { year: 700, value: 45, name: '盛唐军队' },
          { year: 800, value: 40, name: '中唐军队' },
          { year: 900, value: 30, name: '晚唐军队' },
          { year: 1000, value: 25, name: '宋初军队' },
          { year: 1100, value: 35, name: '北宋军队' },
          { year: 1200, value: 30, name: '南宋军队' },
          { year: 1300, value: 50, name: '元代军队' }
        ];
        
        mockData.composition = [
          { name: '步兵', value: 40 },
          { name: '骑兵', value: 45 },
          { name: '弓箭手', value: 10 },
          { name: '辅助部队', value: 5 }
        ];
        
        mockData.battles = [
          { year: 640, name: '龟兹之战', result: '胜利' },
          { year: 670, name: '天山南北战役', result: '胜利' },
          { year: 751, name: '怛罗斯战役', result: '失败' },
          { year: 755, name: '安史之乱影响', result: '失败' },
          { year: 790, name: '吐蕃入侵', result: '失败' },
          { year: 840, name: '回鹘战争', result: '胜利' },
          { year: 1000, name: '喀喇汗王朝', result: '失败' },
          { year: 1220, name: '蒙古征服', result: '失败' }
        ];
        
        mockData.weapons = [
          { year: 618, count: 1500, name: '唐初兵器' },
          { year: 700, count: 4500, name: '盛唐兵器' },
          { year: 800, count: 4000, name: '中唐兵器' },
          { year: 900, count: 3000, name: '晚唐兵器' },
          { year: 1000, count: 2500, name: '宋初兵器' },
          { year: 1100, count: 3500, name: '北宋兵器' },
          { year: 1200, count: 3000, name: '南宋兵器' },
          { year: 1300, count: 5000, name: '元代兵器' }
        ];
        break;

        case 'culture':
        mockData.literature = [
          { year: 618, count: 60, name: '唐初文学' },
          { year: 700, count: 180, name: '盛唐文学' },
          { year: 800, count: 160, name: '中唐文学' },
          { year: 900, count: 130, name: '晚唐文学' },
          { year: 1000, count: 100, name: '宋初文学' },
          { year: 1100, count: 170, name: '北宋文学' },
          { year: 1200, count: 150, name: '南宋文学' },
          { year: 1300, count: 180, name: '元代文学' }
        ];
        
        mockData.inventions = [
          { year: 630, impact: 75, name: '丝绸之路贸易技术' },
          { year: 710, impact: 85, name: '西域乐器制作' },
          { year: 760, impact: 80, name: '喀什玉器工艺' },
          { year: 820, impact: 70, name: '西域农业灌溉' },
          { year: 880, impact: 65, name: '喀什地毯编织' },
          { year: 980, impact: 75, name: '伊斯兰建筑技术' },
          { year: 1080, impact: 80, name: '西域医学传承' },
          { year: 1180, impact: 85, name: '喀什天文观测' }
        ];
        
        mockData.education = [
          { year: 618, literacyRate: 8, name: '唐初教育' },
          { year: 700, literacyRate: 15, name: '盛唐教育' },
          { year: 800, literacyRate: 13, name: '中唐教育' },
          { year: 900, literacyRate: 10, name: '晚唐教育' },
          { year: 1000, literacyRate: 12, name: '宋初教育' },
          { year: 1100, literacyRate: 18, name: '北宋教育' },
          { year: 1200, literacyRate: 20, name: '南宋教育' },
          { year: 1300, literacyRate: 25, name: '元代教育' }
        ];
        
        mockData.religion = [
          { name: '伊斯兰教', followers: 55 },
          { name: '佛教', followers: 25 },
          { name: '道教', followers: 10 },
          { name: '其他', followers: 10 }
        ];
        break;
    }
  }
  return mockData;
}

// 生成特定图表的模拟数据
const generateMockChartData = (category, dataKey, city = selectedCity.value) => {
  const mockData = generateMockData(category, city);
  return mockData[dataKey] || [];
};

// 修改图表配置，添加城市名称
const updateChartOptions = () => {
  chartOptions.value = {
    economic: {
      title: `${currentCityName.value}经济发展`,
      charts: [
        {
          name: `${currentCityName.value}丝绸之路贸易占比`,
          type: 'line',
          dataKey: 'tradeRatio',
          yAxisName: '%'
        },
        {
          name: `${currentCityName.value}商队数量`,
          type: 'bar',
          dataKey: 'caravans',
          yAxisName: '数量'
        },
        {
          name: `${currentCityName.value}农业产出构成`,
          type: 'pie',
          dataKey: 'agriculture'
        },
        {
          name: `${currentCityName.value}财政收入`,
          type: 'line',
          dataKey: 'revenue',
          yAxisName: '万两'
        }
      ]
    },
    population: {
      title: `${currentCityName.value}人口变迁`,
      charts: [
        {
          name: `${currentCityName.value}总人口`,
          type: 'line',
          dataKey: 'total',
          yAxisName: '万人'
        },
        {
          name: `${currentCityName.value}区域人口分布`,
          type: 'pie',
          dataKey: 'distribution'
        },
        {
          name: `${currentCityName.value}城市化率`,
          type: 'line',
          dataKey: 'urbanRatio',
          yAxisName: '%'
        },
        {
          name: `${currentCityName.value}人口密度`,
          type: 'bar',
          dataKey: 'density',
          yAxisName: '人/平方公里'
        }
      ]
    },
    military: {
      title: `${currentCityName.value}军事历史`,
      charts: [
        {
          name: `驻${currentCityName.value}军队规模`,
          type: 'line',
          dataKey: 'armySize',
          yAxisName: '万人'
        },
        {
          name: `${currentCityName.value}军队组成`,
          type: 'pie',
          dataKey: 'composition'
        },
        {
          name: `${currentCityName.value}重要战役`,
          type: 'custom',
          dataKey: 'battles'
        },
        {
          name: `${currentCityName.value}兵器制造`,
          type: 'bar',
          dataKey: 'weapons',
          yAxisName: '数量'
        }
      ]
    },
    culture: {
      title: `${currentCityName.value}文化遗产`,
      charts: [
        {
          name: `${currentCityName.value}文学作品`,
          type: 'bar',
          dataKey: 'literature',
          yAxisName: '数量'
        },
        {
          name: `${currentCityName.value}重要发明`,
          type: 'scatter',
          dataKey: 'inventions'
        },
        {
          name: `${currentCityName.value}教育水平`,
          type: 'line',
          dataKey: 'education',
          yAxisName: '识字率(%)'
        },
        {
          name: `${currentCityName.value}宗教信仰`,
          type: 'pie',
          dataKey: 'religion'
        }
      ]
    },
  };
};

// 图表配置
const chartOptions = ref({
  economic: {
    title: '西安经济发展',
    charts: [
      {
        name: '丝绸之路贸易占比',
        type: 'line',
        dataKey: 'tradeRatio',
        yAxisName: '%'
      },
      {
        name: '商队数量',
        type: 'bar',
        dataKey: 'caravans',
        yAxisName: '数量'
      },
      {
        name: '农业产出构成',
        type: 'pie',
        dataKey: 'agriculture'
      },
      {
        name: '长安城财政收入',
        type: 'line',
        dataKey: 'revenue',
        yAxisName: '万两'
      }
    ]
  },
  population: {
    title: '西安人口变迁',
    charts: [
      {
        name: '西安总人口',
        type: 'line',
        dataKey: 'total',
        yAxisName: '万人'
      },
      {
        name: '西安区域人口分布',
        type: 'pie',
        dataKey: 'distribution'
      },
      {
        name: '西安城市化率',
        type: 'line',
        dataKey: 'urbanRatio',
        yAxisName: '%'
      },
      {
        name: '西安人口密度',
        type: 'bar',
        dataKey: 'density',
        yAxisName: '人/平方公里'
      }
    ]
  },
  military: {
    title: '西安军事历史',
    charts: [
      {
        name: '驻西安军队规模',
        type: 'line',
        dataKey: 'armySize',
        yAxisName: '万人'
      },
      {
        name: '西安军队组成',
        type: 'pie',
        dataKey: 'composition'
      },
      {
        name: '西安重要战役',
        type: 'custom',
        dataKey: 'battles'
      },
      {
        name: '西安兵器制造',
        type: 'bar',
        dataKey: 'weapons',
        yAxisName: '数量'
      }
    ]
  },
  culture: {
    title: '西安文化遗产',
    charts: [
      {
        name: '西安文学作品',
        type: 'bar',
        dataKey: 'literature',
        yAxisName: '数量'
      },
      {
        name: '西安重要发明',
        type: 'scatter',
        dataKey: 'inventions'
      },
      {
        name: '西安教育水平',
        type: 'line',
        dataKey: 'education',
        yAxisName: '识字率(%)'
      },
      {
        name: '西安宗教信仰',
        type: 'pie',
        dataKey: 'religion'
      }
    ]
  },
});

// 监听城市变化，更新图表
watch(() => selectedCity.value, (newCity) => {
  console.log('城市已切换为:', newCity, currentCityName.value);
  
  // 更新图表配置中的城市名称
  updateChartOptions();
  // 清除现有图表实例
  charts.value.forEach((chart, index) => {
      if (chart) {
        chart.dispose();
        charts.value[index] = null;
      }
    });
    // 延迟一下，确保 DOM 更新后再初始化图表
    setTimeout(() => {
      initCharts();
    }, 100);
});

// 计算当前选中的图表配置
const currentChartConfig = computed(() => {
  return chartOptions.value[selectedCategory.value];
});

// 初始化图表
const initCharts = async () => {
  // 确保DOM已经渲染完成
  await nextTick();

  console.log('尝试初始化图表');
  
  // 使用 getElementById 获取图表容器 - 修改这里使用正确的ID格式
  currentChartConfig.value.charts.forEach((chartConfig, index) => {
    const chartId = `chart-${selectedCategory.value}-${index}`;
    const chartContainer = document.getElementById(chartId);
    
    if (chartContainer && !charts.value[index]) {
      console.log(`初始化图表 ${index}`);
      try {
        charts.value[index] = echarts.init(chartContainer);
      } catch (error) {
        console.error(`初始化图表 ${index} 失败:`, error);
      }
    } else if (!chartContainer) {
      console.warn(`图表容器 ${chartId} 不存在`);
    }
  });

  // 加载数据并更新图表
  loadChartData();
};

// 加载图表数据
const loadChartData = async () => {
  isLoading.value = true;
  loadError.value = null;

  try {
    // 获取当前朝代数据
    const data = await chartStore.fetchData(periodStore.currentPeriod);
    
    if (!data) {
      throw new Error('无法获取数据');
    }

    // 如果是比较模式，还需要获取比较朝代的数据
    let comparisonData = null;
    if (dataMode.value === 'comparison' && comparisonPeriod.value) {
      comparisonData = await chartStore.fetchData(comparisonPeriod.value);
      if (!comparisonData) {
        throw new Error('无法获取比较朝代数据');
      }
    }

    // 更新图表
    updateCharts(data, comparisonData);
    isLoading.value = false;
  } catch (error) {
    console.error('加载图表数据失败:', error);
    loadError.value = error instanceof Error ? error.message : '未知错误';
    isLoading.value = false;
  }
};

// 更新图表
const updateCharts = (data, comparisonData = null) => {
  const categoryData = data[selectedCategory.value];
  
  // 如果没有找到该类别的数据，使用模拟数据
  if (!categoryData) {
    console.warn(`未找到${selectedCategory.value}类别的数据，使用模拟数据`);
    const mockData = generateMockData(selectedCategory.value, selectedCity.value);
    updateChartsWithData(mockData, comparisonData ? generateMockData(selectedCategory.value, selectedCity.value) : null);
    return;
  }
  updateChartsWithData(categoryData, comparisonData ? comparisonData[selectedCategory.value] : null);
};

// 使用实际数据更新图表
const updateChartsWithData = (categoryData, comparisonCategoryData = null) => {
  // 更新每个图表
  currentChartConfig.value.charts.forEach((chartConfig, index) => {
    if (!charts.value[index]) {
      console.warn(`图表${index}尚未初始化`);
      return;
    }

    const chartData = categoryData[chartConfig.dataKey];
    
    if (!chartData) {
      console.warn(`未找到${chartConfig.dataKey}的数据，使用模拟数据`);
      const mockChartData = generateMockChartData(selectedCategory.value, chartConfig.dataKey);
      updateChart(chartConfig, mockChartData, index, comparisonCategoryData);
      return;
    }

    updateChart(chartConfig, chartData, index, comparisonCategoryData);
  });
};

// 更新单个图表
const updateChart = (chartConfig, chartData, index, comparisonCategoryData) => {
  let option = {};
  const comparisonChartData = comparisonCategoryData ? comparisonCategoryData[chartConfig.dataKey] : null;
  
  // 添加防御性检查，确保 chartData 存在
  if (!chartData || (Array.isArray(chartData) && chartData.length === 0)) {
    console.warn(`未找到${chartConfig.dataKey}的数据，使用模拟数据`);
    const mockChartData = generateMockChartData(selectedCategory.value, chartConfig.dataKey, selectedCity.value);
    chartData = mockChartData || []; // 使用模拟数据替换空数据，如果模拟数据也为空则使用空数组
  }

    // 根据数据模式设置不同的图表配置
    if (dataMode.value === 'overview') {
      // 概览模式 - 使用简化的图表
      switch (chartConfig.type) {
        case 'line':
          option = getLineChartOption(chartConfig, chartData, null, true);
          break;
        case 'bar':
          option = getBarChartOption(chartConfig, chartData, null, true);
          break;
        case 'pie':
          option = getPieChartOption(chartConfig, chartData);
          break;
        case 'scatter':
          option = getScatterChartOption(chartConfig, chartData, true);
          break;
        case 'custom':
          option = getCustomChartOption(chartConfig, chartData);
          break;
        default:
          console.warn(`未支持的图表类型: ${chartConfig.type}`);
          return;
      }
    } else if (dataMode.value === 'detailed') {
      // 详情模式 - 使用完整的图表
      switch (chartConfig.type) {
        case 'line':
          option = getLineChartOption(chartConfig, chartData, null, false);
          break;
        case 'bar':
          option = getBarChartOption(chartConfig, chartData, null, false);
          break;
        case 'pie':
          option = getPieChartOption(chartConfig, chartData, false);
          break;
        case 'scatter':
          option = getScatterChartOption(chartConfig, chartData, false);
          break;
        case 'custom':
          option = getCustomChartOption(chartConfig, chartData, false);
          break;
        default:
          console.warn(`未支持的图表类型: ${chartConfig.type}`);
          return;
      }
    } else if (dataMode.value === 'comparison') {
      // 比较模式 - 添加比较数据
      switch (chartConfig.type) {
        case 'line':
          option = getLineChartOption(chartConfig, chartData, comparisonChartData);
          break;
        case 'bar':
          option = getBarChartOption(chartConfig, chartData, comparisonChartData);
          break;
        case 'pie':
          option = getPieChartOption(chartConfig, chartData, true, comparisonChartData);
          break;
        case 'scatter':
          option = getScatterChartOption(chartConfig, chartData, false, comparisonChartData);
          break;
        case 'custom':
          option = getCustomChartOption(chartConfig, chartData, true, comparisonChartData);
          break;
        default:
          console.warn(`未支持的图表类型: ${chartConfig.type}`);
          return;
      }
    }

    // 确保 option 已定义
    if (!option) {
    console.error('图表配置生成失败');
    return;
  }
  // 设置图表标题
  option.title = {
    text: chartConfig.name,
    left: 'center',
    textStyle: {
      fontSize: 14
    }
  };

  // 添加图表联动事件
  option.tooltip = {
    ...option.tooltip,
    trigger: chartConfig.type === 'pie' ? 'item' : 'axis',
    axisPointer: chartConfig.type !== 'pie' ? {
      type: 'cross',
      link: {show: true}
    } : undefined
  };

  // 应用配置
  charts.value[index].setOption(option, true);
  
  // 添加图表事件监听
  setupChartEvents(charts.value[index], index, chartData);
};

// 设置图表事件监听，实现联动高亮
const setupChartEvents = (chart, chartIndex, chartData) => {
  // 清除旧的事件监听
  chart.off('mouseover');
  chart.off('mouseout');
  chart.off('click');
  
  // 添加鼠标悬停事件
  chart.on('mouseover', params => {
    // 获取当前高亮的数据索引
    const dataIndex = params.dataIndex;
    if (dataIndex === undefined) return;
    
    // 在其他图表中高亮相同时间点的数据
    charts.value.forEach((otherChart, index) => {
      if (index !== chartIndex && otherChart) {
        // 根据图表类型设置不同的高亮方式
        const chartType = currentChartConfig.value.charts[index].type;
        
        if (chartType === 'pie') {
          // 饼图高亮
          otherChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: dataIndex
          });
        } else {
          // 其他图表高亮
          otherChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: dataIndex
          });
          
          // 高亮数据点
          otherChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: dataIndex
          });
        }
      }
    });
  });
  
  // 添加鼠标移出事件
  chart.on('mouseout', params => {
    // 取消所有图表的高亮
    charts.value.forEach(otherChart => {
      if (otherChart) {
        otherChart.dispatchAction({
          type: 'hideTip'
        });
        
        otherChart.dispatchAction({
          type: 'downplay'
        });
      }
    });
  });
  
  // 添加点击事件，实现数据点选中状态
  chart.on('click', params => {
    const dataIndex = params.dataIndex;
    if (dataIndex === undefined) return;
    
    // 记录当前选中的数据点
    const selectedPoint = {
      category: selectedCategory.value,
      dataIndex: dataIndex,
      value: params.value
    };
    
    // 可以将选中的数据点信息存储到 store 中，或者通过事件发送给父组件
    console.log('选中数据点:', selectedPoint);
    
    // 触发其他图表的联动选中
    charts.value.forEach((otherChart, index) => {
      if (index !== chartIndex && otherChart) {
        otherChart.dispatchAction({
          type: 'select',
          seriesIndex: 0,
          dataIndex: dataIndex
        });
      }
    });
  });
};

// 获取折线图配置
const getLineChartOption = (chartConfig, data) => {

  // 添加防御性检查
  if (!data || !Array.isArray(data) || data.length === 0) {
    console.warn('折线图数据为空或无效');
    return {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: [],
        name: '年份'
      },
      yAxis: {
        type: 'value',
        name: chartConfig.yAxisName || ''
      },
      series: [{
        name: '历史数据',
        data: [],
        type: 'line',
        smooth: true
      }]
    };
  }
  // 处理数据格式
  const xData = data.map(item => item.year);
  const yData = data.map(item => {
    if ('value' in item) return item.value;
    if ('count' in item) return item.count;
    if ('ratio' in item) return item.ratio;
    if ('amount' in item) return item.amount;
    if ('literacyRate' in item) return item.literacyRate;
    return 0;
  });

  return {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: xData,
      name: '年份'
    },
    yAxis: {
      type: 'value',
      name: chartConfig.yAxisName || ''
    },
    series: [{
      name: '西安历史数据',
      data: yData,
      type: 'line',
      smooth: true,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(59,130,246,0.8)' },
          { offset: 1, color: 'rgba(59,130,246,0.1)' }
        ])
      }
    }]
  };
};

// 获取柱状图配置
const getBarChartOption = (chartConfig, data) => {
  let xData=[], yData=[];

    // 添加防御性检查，确保 data 存在且不为空
    if (!data || !Array.isArray(data) || data.length === 0) {
    console.warn('柱状图数据为空或无效');
    return {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: []
      },
      yAxis: {
        type: 'value',
        name: chartConfig.yAxisName || ''
      },
      series: [{
        data: [],
        type: 'bar',
        barWidth: '60%'
      }]
    };
  }

  // 处理不同数据结构
  if ('year' in data[0]) {
    // 时间序列数据
    xData = data.map(item => item.year);
    yData = data.map(item => {
      if ('count' in item) return item.count;
      if ('value' in item) return item.value;
      return 0;
    });
  } else {
    // 分类数据
    xData = data.map(item => {
      if ('category' in item) return item.category;
      if ('region' in item) return item.region;
      if ('name' in item) return item.name;
      return '';
    });
    yData = data.map(item => {
      if ('value' in item) return item.value;
      if ('count' in item) return item.count;
      return 0;
    });
  }

  return {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: xData
    },
    yAxis: {
      type: 'value',
      name: chartConfig.yAxisName || ''
    },
    series: [{
      data: yData,
      type: 'bar',
      barWidth: '60%',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' }
        ])
      }
    }]
  };
};

// 获取饼图配置
// 获取饼图配置
const getPieChartOption = (chartConfig, data) => {
  // 处理数据
  const seriesData = data.map(item => {
    let name, value;
    
    if ('category' in item) {
      name = item.category;
      value = item.value;
    } else if ('region' in item) {
      name = item.region;
      value = item.count;
    } else if ('type' in item) {
      name = item.type;
      value = item.percentage;
    } else if ('name' in item && 'value' in item) {
      // 直接使用 name 和 value 属性，适用于寺庙数据
      name = item.name;
      value = item.value;
    } else if ('name' in item && 'followers' in item) {
      name = item.name;
      value = item.followers;
    }
    
    return { name, value };
  });

  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      data: seriesData.map(item => item.name)
    },
    series: [
      {
        name: chartConfig.name,
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}: {d}%'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '14',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        data: seriesData
      }
    ]
  };
};

// 获取散点图配置
const getScatterChartOption = (chartConfig, data) => {
  // 处理数据
  const seriesData = data.map(item => [
    item.year,
    item.impact,
    item.name
  ]);

  return {
    tooltip: {
      trigger: 'item',
      formatter: function(params) {
        return `${selectedCity.value}${params.data[2]}<br/>年份: ${params.data[0]}<br/>影响力: ${params.data[1]}`;
      }
    },
    xAxis: {
      type: 'value',
      name: '年份'
    },
    yAxis: {
      type: 'value',
      name: '影响力'
    },
    series: [{
      name: `${selectedCity.value}历史发明`,
      type: 'scatter',
      symbolSize: function(data) {
        return Math.sqrt(data[1]) * 10;
      },
      data: seriesData,
      label: {
        show: true,
        formatter: function(param) {
          return param.data[2];
        },
        position: 'top'
      }
    }]
  };
};

// 获取自定义图表配置（用于战役等特殊数据）
const getCustomChartOption = (chartConfig, data) => {
  // 这里简化为表格形式的图表
  return {
    tooltip: {
      trigger: 'item'
    },
    grid: {
      top: 40,
      bottom: 20,
      left: 20,
      right: 20,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.year),
      name: '年份'
    },
    yAxis: {
      type: 'category',
      data: data.map(item => item.name),
      name: `${selectedCity.value}战役`
    },
    visualMap: {
      min: 0,
      max: 1,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 0,
      text: ['胜利', '失败'],
      inRange: {
        color: ['#ff4d4f', '#52c41a']
      },
      show: false
    },
    series: [{
      name: `${selectedCity.value}历史战役`,
      type: 'heatmap',
      data: data.map(item => [
        item.year,
        item.name,
        item.result === '胜利' ? 1 : 0
      ]),
      label: {
        show: true,
        formatter: function(params) {
          return params.data[2] === 1 ? '胜' : '败';
        }
      }
    }]
  };
};

// 切换数据类别
const switchCategory = (category) => {
  selectedCategory.value = category;
  
  // 清除现有图表实例
  charts.value.forEach((chart, index) => {
    if (chart) {
      chart.dispose();
      charts.value[index] = null;
    }
  });
  
  // 延迟一下，确保 DOM 更新后再初始化图表
  setTimeout(() => {
    initCharts();
  }, 100);
};

// 切换显示模式（绝对值/百分比）
const toggleDisplayMode = () => {
  displayMode.value = displayMode.value === 'absolute' ? 'percentage' : 'absolute';
  loadChartData();
};

// 监听朝代变化
watch(() => periodStore.currentPeriod, () => {
  loadChartData();
});

// 监听数据模式变化
watch(dataMode, () => {
  loadChartData();
});

// 在组件挂载时初始化图表
onMounted(() => {
  console.log('DataPanel 组件已挂载');
  updateChartOptions(); // 确保初始化时更新图表配置
  initCharts();
});

</script>

<template>
  <div class="data-panel">
    <div class="panel-header">
      <h2>{{ currentChartConfig.title }}</h2>
      
      
      <div class="category-tabs">
        <button 
          v-for="(config, category) in chartOptions" 
          :key="category"
          class="category-tab"
          :class="{ active: selectedCategory === category }"
          @click="switchCategory(category)">
          {{ config.title }}
        </button>
      </div>
      
    </div>
    
    <div class="charts-container" :class="{ loading: isLoading }">
      <div v-if="isLoading" class="loading-indicator">
        加载中...
      </div>
      
      <div v-else-if="loadError" class="error-message">
        加载失败: {{ loadError }}
      </div>
      
      <!-- 修改图表容器的ID，加入类别信息确保唯一性 -->
      <div 
        v-for="(chartConfig, index) in currentChartConfig.charts" 
        :key="`${selectedCategory}-${index}`"
        class="chart-wrapper">
        <div 
          :id="`chart-${selectedCategory}-${index}`"
          class="chart-container">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 15px;
}

.panel-header {
  margin-bottom: 15px;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.panel-header h2 {
  margin: 0 0 1rem;
  text-align: center;
  font-size: 1.5rem;
  color: #1e293b;
}

.category-tabs {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.category-tab {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #f1f5f9;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
}

.category-tab.active {
  background-color: #3b82f6;
  color: white;
}

.display-mode-toggle {
  display: flex;
  justify-content: center;
}

.mode-toggle-btn {
  padding: 0.25rem 0.75rem;
  border: 1px solid #3b82f6;
  background-color: transparent;
  color: #3b82f6;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
}

.mode-toggle-btn:hover {
  background-color: #3b82f6;
  color: white;
}

.charts-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  padding: 1rem;
  flex: 1;
  position: relative;
  min-height: 400px;
}

.charts-container.loading {
  opacity: 0.7;
}

.chart-wrapper {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chart-container {
  width: 100%;
  height: 100%; 
  min-height: 200px; 
}

.loading-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem 2rem;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.error-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem 2rem;
  background-color: #fee2e2;
  color: #ef4444;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

@media (max-width: 768px) {
  .charts-container {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }
  
  .category-tabs {
    flex-wrap: wrap;
  }
}

/* 添加高亮样式 */
.chart-container :deep(.highlighted) {
  animation: highlight-pulse 1.5s infinite alternate;
}

@keyframes highlight-pulse {
  from {
    opacity: 0.7;
  }
  to {
    opacity: 1;
    filter: brightness(1.2);
  }
}
.current-mode {
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}
</style>