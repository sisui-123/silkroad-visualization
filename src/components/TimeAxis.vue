<script setup>
import { ref, onMounted } from 'vue';
import { usePeriodStore } from '../store/period.store';

const periodStore = usePeriodStore();

// 模拟时间轴数据
const timelineData = ref([
  { year: 618, event: '唐朝建立', type: 'major', periodId: 'tang' },
  { year: 626, event: '贞观之治开始', type: 'major', periodId: 'tang' },
  { year: 649, event: '贞观之治结束', type: 'minor', periodId: 'tang' },
  { year: 712, event: '开元盛世开始', type: 'major', periodId: 'tang' },
  { year: 755, event: '安史之乱爆发', type: 'major', periodId: 'tang' },
  { year: 907, event: '唐朝灭亡', type: 'major', periodId: 'tang' },
  
  { year: 960, event: '宋朝建立', type: 'major', periodId: 'song' },
  { year: 1127, event: '靖康之变', type: 'major', periodId: 'song' },
  { year: 1279, event: '宋朝灭亡', type: 'major', periodId: 'song' }
]);

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
  scrollToYear
});

onMounted(() => {
  console.log('TimeAxis 组件已挂载');
});
</script>

<template>
  <div class="time-axis" :class="{ 'collapsed': isCollapsed }">
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
          <div class="event-year">{{ event.year }}年</div>
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

/* 折叠状态样式 */
.time-axis.collapsed {
  height: 5px;
  overflow: hidden;
}

/* 折叠箭头样式 */
.collapse-arrow {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 0 0 20px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.arrow-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.arrow-icon.rotated {
  transform: rotate(180deg);
}

.arrow-icon svg {
  width: 100%;
  height: 100%;
  color: #666;
}

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