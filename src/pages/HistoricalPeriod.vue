<template>
  <div class="historical-period">
    <div class="glass-container">
      <h1 class="title">历史时期</h1>
      <div class="timeline">
        <div v-for="period in historicalPeriods" :key="period.id" class="period-card">
          <div class="period-content">
            <h2>{{ period.name }}</h2>
            <p class="time">{{ period.time }}</p>
            <p class="description">{{ period.description }}</p>
            <div class="features">
              <div v-for="feature in period.features" :key="feature" class="feature-item">
                {{ feature }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoricalPeriod',
  data() {
    return {
      historicalPeriods: [
        {
          id: 1,
          name: '汉朝时期',
          time: '公元前202年 - 公元220年',
          description: '丝绸之路正式开通，张骞出使西域，开启了中国与西方文明交流的新纪元。',
          features: ['张骞通西域', '佛教传入中国', '丝绸贸易兴起']
        },
        {
          id: 2,
          name: '唐朝时期',
          time: '公元618年 - 公元907年',
          description: '丝绸之路的黄金时期，文化、经济交流达到顶峰。',
          features: ['胡商云集', '多元文化交融', '佛教艺术发展']
        },
        {
          id: 3,
          name: '宋元时期',
          time: '公元960年 - 公元1368年',
          description: '海上丝绸之路兴起，陆上丝绸之路继续发展。',
          features: ['海上贸易繁荣', '瓷器外销', '伊斯兰文化传播']
        }
      ]
    }
  }
}
</script>

<style scoped>
.historical-period {
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.glass-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 600;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.period-card {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 1.5rem;
  transition: transform 0.3s ease;
}

.period-card:hover {
  transform: translateY(-5px);
}

.period-content h2 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
}

.time {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.description {
  color: #444;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.feature-item {
  background: rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: #2c3e50;
  font-size: 0.9rem;
}
</style> 