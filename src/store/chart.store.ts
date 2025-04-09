import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
// 修复 PeriodId 类型导入
import { usePeriodStore } from './period.store';

// 定义 PeriodId 类型
export type PeriodId = 'qin' | 'han' | 'tang' | 'song' | 'yuan' | 'ming' | 'qing';

// 定义图表数据接口
export interface ChartData {
  // 经济数据
  economic: {
    tradeRatio: { year: number; value: number }[];
    caravans: { year: number; count: number }[];
    agriculture: { category: string; value: number }[];
    revenue: { year: number; amount: number }[];
  };
  
  // 人口数据
  population: {
    total: { year: number; count: number }[];
    distribution: { region: string; count: number }[];
    urbanRatio: { year: number; ratio: number }[];
    density: { region: string; value: number }[];
  };
  
  // 军事数据
  military: {
    armySize: { year: number; count: number }[];
    composition: { type: string; percentage: number }[];
    battles: { name: string; result: string; year: number }[];
    weapons: { name: string; count: number }[];
  };
  
  // 文化数据
  culture: {
    literature: { category: string; count: number }[];
    inventions: { name: string; year: number; impact: number }[];
    education: { year: number; literacyRate: number }[];
    religion: { name: string; followers: number }[];
  };
}

// 定义数据加载状态
export type DataLoadingStatus = 'idle' | 'loading' | 'success' | 'error';

// 创建并导出 store
// 在 useChartStore 定义中添加
export const useChartStore = defineStore('chart', () => {
  // 状态
  const chartData = ref<Record<PeriodId, ChartData | null>>({
    qin: null,
    han: null,
    tang: null,
    song: null,
    yuan: null,
    ming: null,
    qing: null
  });
  
  const loadingStatus = ref<Record<PeriodId, DataLoadingStatus>>({
    qin: 'idle',
    han: 'idle',
    tang: 'idle',
    song: 'idle',
    yuan: 'idle',
    ming: 'idle',
    qing: 'idle'
  });
  
  const error = ref<Record<PeriodId, string | null>>({
    qin: null,
    han: null,
    tang: null,
    song: null,
    yuan: null,
    ming: null,
    qing: null
  });
  
  // 获取指定朝代的数据
  const getChartData = computed(() => {
    return (periodId: PeriodId) => chartData.value[periodId];
  });
  
  // 获取指定朝代的加载状态
  const getLoadingStatus = computed(() => {
    return (periodId: PeriodId) => loadingStatus.value[periodId];
  });
  
  // 获取指定朝代的错误信息
  const getError = computed(() => {
    return (periodId: PeriodId) => error.value[periodId];
  });
  
  // 模拟数据（实际项目中应从API获取）
  const mockData: Record<PeriodId, ChartData> = {
    qin: generateMockData(30),
    han: generateMockData(60),
    tang: generateMockData(85),
    song: generateMockData(70),
    yuan: generateMockData(65),
    ming: generateMockData(75),
    qing: generateMockData(80)
  };
  
  // 生成模拟数据的辅助函数
  function generateMockData(baseValue: number): ChartData {
    return {
      economic: {
        tradeRatio: Array.from({ length: 5 }, (_, i) => ({
          year: 1 + i,
          value: baseValue * 0.1 * (1 + Math.random() * 0.5)
        })),
        caravans: Array.from({ length: 5 }, (_, i) => ({
          year: 1 + i,
          count: Math.round(baseValue * 10 * (1 + Math.random() * 0.5))
        })),
        agriculture: [
          { category: '粮食', value: baseValue * 10 },
          { category: '棉麻', value: baseValue * 5 },
          { category: '茶叶', value: baseValue * 3 },
          { category: '丝绸', value: baseValue * 4 }
        ],
        revenue: Array.from({ length: 5 }, (_, i) => ({
          year: 1 + i,
          amount: baseValue * 100000 * (1 + i * 0.1 + Math.random() * 0.2)
        }))
      },
      population: {
        total: Array.from({ length: 5 }, (_, i) => ({
          year: 1 + i,
          count: baseValue * 1000000 * (1 + i * 0.05 + Math.random() * 0.1)
        })),
        distribution: [
          { region: '北方', count: baseValue * 500000 },
          { region: '南方', count: baseValue * 700000 },
          { region: '西部', count: baseValue * 300000 },
          { region: '东部', count: baseValue * 600000 }
        ],
        urbanRatio: Array.from({ length: 5 }, (_, i) => ({
          year: 1 + i,
          ratio: 5 + i * 2 + Math.random() * 3
        })),
        density: [
          { region: '京畿', value: baseValue * 0.5 },
          { region: '江南', value: baseValue * 0.7 },
          { region: '西北', value: baseValue * 0.2 },
          { region: '东南', value: baseValue * 0.6 }
        ]
      },
      military: {
        armySize: Array.from({ length: 5 }, (_, i) => ({
          year: 1 + i,
          count: baseValue * 10000 * (1 + i * 0.1 + Math.random() * 0.2)
        })),
        composition: [
          { type: '步兵', percentage: 60 },
          { type: '骑兵', percentage: 20 },
          { type: '弓箭手', percentage: 15 },
          { type: '攻城部队', percentage: 5 }
        ],
        battles: [
          { name: '重要战役1', result: '胜利', year: 2 },
          { name: '重要战役2', result: '失败', year: 3 },
          { name: '重要战役3', result: '胜利', year: 4 }
        ],
        weapons: [
          { name: '刀剑', count: baseValue * 50000 },
          { name: '弓箭', count: baseValue * 40000 },
          { name: '战车', count: baseValue * 5000 },
          { name: '攻城器械', count: baseValue * 1000 }
        ]
      },
      culture: {
        literature: [
          { category: '诗词', count: baseValue * 200 },
          { category: '散文', count: baseValue * 150 },
          { category: '戏剧', count: baseValue * 50 },
          { category: '小说', count: baseValue * 100 }
        ],
        inventions: [
          { name: '重要发明1', year: 2, impact: baseValue * 0.5 },
          { name: '重要发明2', year: 3, impact: baseValue * 0.7 },
          { name: '重要发明3', year: 4, impact: baseValue * 0.9 }
        ],
        education: Array.from({ length: 5 }, (_, i) => ({
          year: 1 + i,
          literacyRate: 5 + baseValue * 0.1 * (1 + i * 0.2)
        })),
        religion: [
          { name: '主流宗教1', followers: baseValue * 500000 },
          { name: '主流宗教2', followers: baseValue * 300000 },
          { name: '其他信仰', followers: baseValue * 200000 }
        ]
      }
    };
  }
  
  // 加载指定朝代的数据
  const fetchData = async (periodId: PeriodId) => {
    // 如果数据已加载，则直接返回
    if (chartData.value[periodId]) {
      return chartData.value[periodId];
    }
    
    // 更新加载状态
    loadingStatus.value[periodId] = 'loading';
    error.value[periodId] = null;
    
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 获取模拟数据
      const data = mockData[periodId];
      
      // 更新状态
      chartData.value[periodId] = data;
      loadingStatus.value[periodId] = 'success';
      
      return data;
    } catch (err) {
      // 处理错误
      loadingStatus.value[periodId] = 'error';
      error.value[periodId] = err instanceof Error ? err.message : '未知错误';
      return null;
    }
  };
  
  // 清除指定朝代的数据
  const clearData = (periodId: PeriodId) => {
    chartData.value[periodId] = null;
    loadingStatus.value[periodId] = 'idle';
    error.value[periodId] = null;
  };
  
  // 清除所有数据
  const clearAllData = () => {
    Object.keys(chartData.value).forEach(key => {
      chartData.value[key as PeriodId] = null;
      loadingStatus.value[key as PeriodId] = 'idle';
      error.value[key as PeriodId] = null;
    });
  };
  
  // 添加焦点年份状态
  const focusYear = ref<number | null>(null);
  
  // 设置焦点年份的方法
  const setFocusYear = (year: number | null) => {
    focusYear.value = year;
    
    // 可以在这里添加根据年份筛选数据的逻辑
    // 例如，获取该年份附近的历史事件或数据点
  };
  
  // 清除焦点年份
  const clearFocusYear = () => {
    focusYear.value = null;
  };
  
  return {
    chartData,
    loadingStatus,
    error,
    getChartData,
    getLoadingStatus,
    getError,
    fetchData,
    clearData,
    clearAllData,
    focusYear,
    setFocusYear,
    clearFocusYear
  };
});