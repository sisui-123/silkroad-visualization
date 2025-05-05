<script setup>
import { ref, onMounted } from 'vue';
import { usePeriodStore } from '../store/period.store';

const periodStore = usePeriodStore();

// 各城市的历史时间轴数据
const cityTimelines = {
  '西安': [
    { year: -1046, event: '西周建都镐京', type: 'major', periodId: 'ancient' },
    { year: -221, event: '秦朝定都咸阳', type: 'major', periodId: 'qin' },
    { year: 202, event: '西汉定都长安', type: 'major', periodId: 'han' },
    { year: 582, event: '隋朝兴建大兴城', type: 'major', periodId: 'sui' },
    { year: 618, event: '唐朝定都长安', type: 'major', periodId: 'tang' },
    { year: 904, event: '唐朝迁都洛阳，长安衰落', type: 'major', periodId: 'tang' },
    { year: 1369, event: '明朝改奉元路为西安府', type: 'major', periodId: 'ming' }
  ],
  '敦煌': [
    { year: -111, event: '汉武帝设立敦煌郡', type: 'major', periodId: 'han' },
    { year: 366, event: '莫高窟开凿', type: 'major', periodId: 'northern' },
    { year: 400, event: '李暠建立西凉，定都敦煌', type: 'major', periodId: 'northern' },
    { year: 781, event: '吐蕃占领敦煌', type: 'major', periodId: 'tang' },
    { year: 848, event: '张议潮收复敦煌', type: 'major', periodId: 'tang' },
    { year: 1036, event: '西夏占领敦煌', type: 'major', periodId: 'song' },
    { year: 1900, event: '王圆箓发现藏经洞', type: 'major', periodId: 'modern' }
  ],
  '喀什': [
    { year: -128, event: '张骞出使西域到达疏勒', type: 'major', periodId: 'han' },
    { year: 73, event: '班超经营疏勒', type: 'major', periodId: 'han' },
    { year: 648, event: '唐朝设立疏勒都督府', type: 'major', periodId: 'tang' },
    { year: 840, event: '喀喇汗王朝建立', type: 'major', periodId: 'tang' },
    { year: 1006, event: '喀喇汗王朝灭于阗国', type: 'major', periodId: 'song' },
    { year: 1211, event: '西辽统治喀什', type: 'major', periodId: 'yuan' },
    { year: 1759, event: '清朝平定大小和卓叛乱', type: 'major', periodId: 'qing' }
  ],
  '撒马尔罕': [
    { year: -329, event: '亚历山大大帝征服撒马尔罕', type: 'major', periodId: 'hellenistic' },
    { year: 712, event: '阿拉伯帝国占领撒马尔罕', type: 'major', periodId: 'islamic' },
    { year: 1220, event: '蒙古帝国摧毁撒马尔罕', type: 'major', periodId: 'mongol' },
    { year: 1370, event: '帖木儿帝国定都撒马尔罕', type: 'major', periodId: 'timurid' },
    { year: 1405, event: '帖木儿去世，帝国衰落', type: 'major', periodId: 'timurid' },
    { year: 1868, event: '俄罗斯帝国占领撒马尔罕', type: 'major', periodId: 'modern' }
  ],
  '布拉哈': [
    { year: 500, event: '布拉哈成为粟特重要城市', type: 'major', periodId: 'sogdian' },
    { year: 709, event: '阿拉伯帝国占领布拉哈', type: 'major', periodId: 'islamic' },
    { year: 892, event: '萨曼王朝定都布拉哈', type: 'major', periodId: 'samanid' },
    { year: 999, event: '喀喇汗王朝占领布拉哈', type: 'major', periodId: 'karakhanid' },
    { year: 1220, event: '蒙古帝国摧毁布拉哈', type: 'major', periodId: 'mongol' },
    { year: 1506, event: '乌兹别克汗国占领布拉哈', type: 'major', periodId: 'uzbek' },
    { year: 1920, event: '苏联红军占领布拉哈', type: 'major', periodId: 'modern' }
  ],
  '梅尔夫': [
    { year: -521, event: '大流士一世时期成为波斯重要城市', type: 'major', periodId: 'achaemenid' },
    { year: 651, event: '阿拉伯帝国占领梅尔夫', type: 'major', periodId: 'islamic' },
    { year: 813, event: '阿拉伯哈里发马蒙定都梅尔夫', type: 'major', periodId: 'abbasid' },
    { year: 1040, event: '塞尔柱帝国占领梅尔夫', type: 'major', periodId: 'seljuk' },
    { year: 1141, event: '西辽击败塞尔柱帝国', type: 'major', periodId: 'kara-khitan' },
    { year: 1221, event: '蒙古帝国摧毁梅尔夫', type: 'major', periodId: 'mongol' },
    { year: 1884, event: '俄罗斯帝国吞并梅尔夫', type: 'major', periodId: 'modern' }
  ],
  '巴格达': [
    { year: 762, event: '阿拔斯王朝建立巴格达', type: 'major', periodId: 'abbasid' },
    { year: 786, event: '哈伦·拉希德时期达到鼎盛', type: 'major', periodId: 'abbasid' },
    { year: 1258, event: '蒙古帝国攻陷巴格达', type: 'major', periodId: 'mongol' },
    { year: 1401, event: '帖木儿洗劫巴格达', type: 'major', periodId: 'timurid' },
    { year: 1534, event: '奥斯曼帝国占领巴格达', type: 'major', periodId: 'ottoman' },
    { year: 1917, event: '英国占领巴格达', type: 'major', periodId: 'modern' },
    { year: 1921, event: '伊拉克王国定都巴格达', type: 'major', periodId: 'modern' }
  ],
  '君士坦丁堡': [
    { year: 330, event: '君士坦丁大帝建立新罗马', type: 'major', periodId: 'roman' },
    { year: 532, event: '尼卡起义，圣索菲亚大教堂重建', type: 'major', periodId: 'byzantine' },
    { year: 1204, event: '第四次十字军攻陷君士坦丁堡', type: 'major', periodId: 'crusader' },
    { year: 1261, event: '拜占庭收复君士坦丁堡', type: 'major', periodId: 'byzantine' },
    { year: 1453, event: '奥斯曼帝国攻陷君士坦丁堡', type: 'major', periodId: 'ottoman' },
    { year: 1923, event: '土耳其共和国迁都安卡拉', type: 'major', periodId: 'modern' },
    { year: 1930, event: '正式更名为伊斯坦布尔', type: 'major', periodId: 'modern' }
  ]
};

// 当前选中的城市
const currentCity = ref('西安');
// 当前时间轴数据
const timelineData = ref(cityTimelines['西安']);

// 切换城市
const changeCity = (city) => {
  currentCity.value = city;
  timelineData.value = cityTimelines[city];
  selectedYear.value = null;
};

// 当前选中的年份
const selectedYear = ref(null);

// 添加折叠状态控制
const isCollapsed = ref(false);

// 切换折叠状态
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

// 滚动到指定朝代
const scrollToPeriod = (periodId) => {
  const firstEvent = timelineData.value.find(event => event.periodId === periodId);
  if (firstEvent) {
    scrollToYear(firstEvent.year);
  }
};

// 滚动到指定年份
const scrollToYear = (year, highlight = false) => {
  selectedYear.value = highlight ? year : null;
  
  // 实际项目中这里应该有滚动逻辑
  console.log(`滚动到年份: ${year}`);
  
  // 触发年份变化事件
  emit('year-change', year);
};

// 处理事件点击
const handleEventClick = (event) => {
  selectedYear.value = event.year;
  emit('event-click', event);
};

// 定义组件事件
const emit = defineEmits(['event-click', 'year-change']);

// 暴露方法给父组件
defineExpose({
  scrollToPeriod,
  scrollToYear,
  changeCity
});

onMounted(() => {
  console.log('TimeAxis 组件已挂载');
});
</script>

<template>
  <div class="time-axis" :class="{ 'collapsed': isCollapsed }">
    <!-- 修改抬头，去掉城市名称 -->
    <h3 class="time-axis-title">历史时间轴</h3>
    
    <div class="timeline-container">
      <div class="timeline-line"></div>
      
      <div 
        v-for="event in timelineData" 
        :key="event.year"
        class="timeline-event"
        :class="{ 
          'event-major': event.type === 'major',
          'event-minor': event.type === 'minor',
          'event-selected': selectedYear === event.year
        }"
        @click="handleEventClick(event)">
        <div class="event-dot"></div>
        <div class="event-content">
          <div class="event-year">{{ event.year > 0 ? event.year + '年' : Math.abs(event.year) + '年' + '前' }}</div>
          <div class="event-name">{{ event.event }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.time-axis {
  padding: 20px;
  height: 100%;
  position: relative;
  transition: height 0.3s ease;
}

/* 移除城市选择栏相关样式 */
.time-axis-title {
  margin-top: 0;
  margin-bottom: 20px;
  text-align: center;
  font-size: 18px;
  color: #333;
}

.timeline-container {
  position: relative;
  padding: 20px 0;
  overflow-x: auto;
  white-space: nowrap;
}

.timeline-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #e2e8f0;
  z-index: 1;
}

.timeline-event {
  position: relative;
  display: inline-block;
  margin-right: 60px;
  cursor: pointer;
  z-index: 2;
}

.event-dot {
  position: absolute;
  top: 50%;
  left: 0;
  width: 12px;
  height: 12px;
  background-color: #3b82f6;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.event-content {
  position: relative;
  left: 10px;
  padding: 8px 12px;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  min-width: 100px;
}

.event-year {
  font-weight: bold;
  font-size: 14px;
  color: #3b82f6;
}

.event-name {
  font-size: 12px;
  color: #4b5563;
}

.event-major .event-dot {
  width: 16px;
  height: 16px;
  background-color: #3b82f6;
}

.event-minor .event-dot {
  background-color: #94a3b8;
}

.event-selected .event-content {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}
</style>