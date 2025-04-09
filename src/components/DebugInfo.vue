<script setup>
import { ref, onMounted } from 'vue';

const isVisible = ref(true);
const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
};

onMounted(() => {
  console.log('调试组件已挂载');
});
</script>

<template>
  <div v-if="isVisible" class="debug-panel">
    <div class="debug-header">
      <h3>调试面板</h3>
      <button @click="toggleVisibility">关闭</button>
    </div>
    <div class="debug-content">
      <p>应用已成功渲染</p>
      <p>Vue 版本: {{ Vue.version }}</p>
      <p>当前时间: {{ new Date().toLocaleString() }}</p>
    </div>
  </div>
</template>

<style scoped>
.debug-panel {
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 5px;
  z-index: 9999;
  max-width: 300px;
}

.debug-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.debug-header h3 {
  margin: 0;
  font-size: 14px;
}

.debug-header button {
  background: none;
  border: 1px solid white;
  color: white;
  padding: 2px 5px;
  border-radius: 3px;
  cursor: pointer;
}

.debug-content p {
  margin: 5px 0;
  font-size: 12px;
}
</style>