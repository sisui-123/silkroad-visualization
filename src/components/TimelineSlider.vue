<template>
  <div class="timeline-container">
    <h3>丝绸之路历史时期</h3>
    <div class="timeline">
      <input 
        type="range" 
        v-model="currentEraIndex" 
        min="0" 
        :max="eras.length - 1" 
        step="1" 
        class="slider" 
        @input="updateMap"
      >
      <div class="era-labels">
        <span 
          v-for="(era, index) in eras" 
          :key="index" 
          :class="{ active: currentEraIndex === index }"
          @click="setEra(index)"
        >
          {{ era.name }}
          <div class="era-tooltip">
            <p>{{ era.period }}</p>
            <p>{{ era.description }}</p>
            <p v-if="era.cities[0].name.includes('西安')">{{ era.cities[0].description }}</p>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimelineSlider',
  props: {
    eras: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentEraIndex: 0
    }
  },
  methods: {
    updateMap() {
      this.$emit('era-change', this.eras[this.currentEraIndex]);
    },
    setEra(index) {
      this.currentEraIndex = index;
      this.updateMap();
    }
  }
}
</script>

<style scoped>
.timeline-container {
  margin: 20px auto;
  max-width: 800px;
  padding: 15px;
  background: #f8f8f8;
  border-radius: 8px;
}

.timeline {
  margin-top: 15px;
}

.slider {
  width: 100%;
  height: 10px;
  -webkit-appearance: none;
  background: #ddd;
  border-radius: 5px;
  outline: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: #8B4513;
  border-radius: 50%;
  cursor: pointer;
}

.era-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  position: relative;
}

.era-labels span {
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
  position: relative;
}

.era-labels span.active {
  background: #8B4513;
  color: white;
}

.era-labels span:hover {
  background: #A0522D;
  color: white;
}

.era-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: white;
  padding: 5px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s;
  margin-bottom: 5px;
}

.era-labels span:hover .era-tooltip {
  visibility: visible;
  opacity: 1;
}
</style>