<template>
  <div class="historical-events">
    <div class="glass-container">
      <h1 class="title">历史事件</h1>
      <div class="timeline">
        <div v-for="event in historicalEvents" :key="event.id" class="event-card">
          <div class="event-header">
            <div class="event-date">{{ event.date }}</div>
            <div class="event-location">
              <i class="fas fa-map-marker-alt"></i>
              {{ event.location }}
            </div>
          </div>
          <div class="event-content">
            <h2>{{ event.title }}</h2>
            <p class="description">{{ event.description }}</p>
            <div class="event-details">
              <div class="detail-section">
                <h3>历史背景</h3>
                <p>{{ event.background }}</p>
              </div>
              <div class="detail-section">
                <h3>历史影响</h3>
                <ul>
                  <li v-for="(impact, index) in event.impacts" :key="index">
                    {{ impact }}
                  </li>
                </ul>
              </div>
              <div class="detail-section">
                <h3>相关人物</h3>
                <div class="people-list">
                  <div v-for="person in event.people" :key="person.name" class="person-item">
                    <span class="person-name">{{ person.name }}</span>
                    <span class="person-role">{{ person.role }}</span>
                  </div>
                </div>
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
  name: 'HistoricalEvents',
  data() {
    return {
      historicalEvents: [
        {
          id: 1,
          date: '公元前138年',
          location: '长安（今西安）',
          title: '张骞出使西域',
          description: '汉武帝派遣张骞出使西域，开启了中国与西方文明交流的新纪元。',
          background: '汉武帝时期，为了联合大月氏对抗匈奴，派遣张骞出使西域。这次出使虽然未能达到预期目的，但为后来丝绸之路的开通奠定了基础。',
          impacts: [
            '建立了中国与西域各国的外交关系',
            '促进了东西方文化的交流',
            '为丝绸之路的开通奠定了基础',
            '推动了汉朝与西域各国的贸易往来'
          ],
          people: [
            { name: '张骞', role: '使者' },
            { name: '汉武帝', role: '决策者' }
          ]
        },
        {
          id: 2,
          date: '公元629年',
          location: '长安',
          title: '玄奘西行取经',
          description: '唐代高僧玄奘西行取经，促进了佛教文化的传播与交流。',
          background: '玄奘为了寻求佛教真经，克服重重困难，历时17年，行程5万余里，最终带回大量佛经。',
          impacts: [
            '促进了佛教文化在中国的传播',
            '推动了中印文化交流',
            '留下了珍贵的旅行记录',
            '影响了中国文学艺术的发展'
          ],
          people: [
            { name: '玄奘', role: '高僧' },
            { name: '唐太宗', role: '支持者' }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.historical-events {
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

.event-card {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 1.5rem;
  transition: transform 0.3s ease;
}

.event-card:hover {
  transform: translateY(-5px);
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.event-date {
  font-size: 1.2rem;
  color: #2c3e50;
  font-weight: 600;
}

.event-location {
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.event-content h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.description {
  color: #444;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.event-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.detail-section h3 {
  color: #2c3e50;
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
}

.detail-section p {
  color: #666;
  line-height: 1.6;
}

.detail-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.detail-section li {
  color: #666;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.detail-section li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #2c3e50;
}

.people-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.person-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.person-name {
  color: #2c3e50;
  font-weight: 500;
}

.person-role {
  color: #666;
  font-size: 0.9rem;
}
</style> 