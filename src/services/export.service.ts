import { useChartStore } from '../store/chart.store';
import { usePeriodStore } from '../store/period.store';

class ExportService {
  // 不在构造函数中初始化 store
  private chartStore;
  private periodStore;

  constructor() {
    // 构造函数为空
  }

  /**
   * 懒加载获取 store 实例
   */
  private getStores() {
    // 只在需要时获取 store 实例
    if (!this.chartStore) {
      this.chartStore = useChartStore();
    }
    if (!this.periodStore) {
      this.periodStore = usePeriodStore();
    }
  }

  /**
   * 导出当前数据为指定格式
   */
  async exportData(format: 'csv'|'json') {
    // 调用方法时初始化 store
    this.getStores();
    
    // 获取当前朝代数据
    const periodId = this.periodStore.currentPeriod;
    const data = await this.chartStore.fetchData(periodId);
    
    if (!data) {
      throw new Error('无法获取数据');
    }
    
    switch(format) {
      case 'csv':
        return this.convertToCSV(data);
      case 'json':
        return JSON.stringify(data, null, 2);
      default:
        throw new Error(`不支持的导出格式: ${format}`);
    }
  }

  /**
   * 将数据导出为文件并下载
   */
  async exportToFile(format: 'csv'|'json', filename?: string) {
    // 调用方法时初始化 store
    this.getStores();
    
    try {
      const data = await this.exportData(format);
      const periodName = this.periodStore.currentPeriodInfo?.name || '未知朝代';
      const defaultFilename = `${periodName}_数据_${new Date().toISOString().split('T')[0]}`;
      const finalFilename = filename || defaultFilename;
      
      // 创建Blob对象
      const blob = new Blob([data], { 
        type: format === 'csv' 
          ? 'text/csv;charset=utf-8;' 
          : 'application/json;charset=utf-8;' 
      });
      
      // 创建下载链接
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `${finalFilename}.${format}`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      return true;
    } catch (error) {
      console.error('导出数据失败:', error);
      throw error;
    }
  }

  /**
   * 将数据转换为CSV格式
   * @param data 要转换的数据对象
   * @returns CSV格式的字符串
   */
  private convertToCSV(data: any): string {
    // 处理嵌套对象
    const flattenData = (obj: any, prefix = ''): Record<string, any> => {
      let result: Record<string, any> = {};
      
      for (const key in obj) {
        const value = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;
        
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          // 递归处理嵌套对象
          Object.assign(result, flattenData(value, newKey));
        } else if (Array.isArray(value)) {
          // 处理数组
          value.forEach((item, index) => {
            if (typeof item === 'object' && item !== null) {
              // 如果数组元素是对象，展平每个对象
              for (const itemKey in item) {
                result[`${newKey}[${index}].${itemKey}`] = item[itemKey];
              }
            } else {
              // 如果数组元素是基本类型
              result[`${newKey}[${index}]`] = item;
            }
          });
        } else {
          // 基本类型直接赋值
          result[newKey] = value;
        }
      }
      
      return result;
    };
    
    // 展平数据
    const flatData = flattenData(data);
    
    // 获取所有键作为CSV的表头
    const headers = Object.keys(flatData);
    
    // 创建CSV内容
    let csvContent = headers.join(',') + '\n';
    csvContent += headers.map(header => {
      const value = flatData[header];
      // 处理包含逗号、引号或换行符的值
      if (value === null || value === undefined) {
        return '';
      } else if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
        return `"${value.replace(/"/g, '""')}"`;
      } else {
        return String(value);
      }
    }).join(',');
    
    return csvContent;
  }
}

// 创建服务实例但不立即初始化 store
const exportService = new ExportService();
export default exportService;