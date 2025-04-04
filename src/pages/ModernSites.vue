<template>
  <div class="modern-sites">
    <div class="glass-container">
      <h1 class="title">现代遗址</h1>
      <div class="sites-grid">
        <div v-for="site in modernSites" :key="site.id" class="site-card">
          <div class="site-image">
            <img :src="site.image" :alt="site.name">
            <div class="site-status" :class="site.status">{{ site.statusText }}</div>
          </div>
          <div class="site-content">
            <h2>{{ site.name }}</h2>
            <div class="site-info">
              <div class="info-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>{{ site.location }}</span>
              </div>
              <div class="info-item">
                <i class="fas fa-calendar"></i>
                <span>{{ site.period }}</span>
              </div>
              <div class="info-item">
                <i class="fas fa-flag"></i>
                <span>{{ site.country }}</span>
              </div>
            </div>
            <p class="description">{{ site.description }}</p>
            <div class="site-features">
              <h3>主要特点</h3>
              <ul>
                <li v-for="(feature, index) in site.features" :key="index">
                  {{ feature }}
                </li>
              </ul>
            </div>
            <div class="site-visit">
              <h3>参观信息</h3>
              <div class="visit-info">
                <div class="visit-item">
                  <span class="label">开放时间：</span>
                  <span>{{ site.visitInfo.openingHours }}</span>
                </div>
                <div class="visit-item">
                  <span class="label">门票：</span>
                  <span>{{ site.visitInfo.ticket }}</span>
                </div>
                <div class="visit-item">
                  <span class="label">交通：</span>
                  <span>{{ site.visitInfo.transportation }}</span>
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
  name: 'ModernSites',
  data() {
    return {
      modernSites: [
        {
          id: 1,
          name: '莫高窟',
          image: '/images/mogao.jpg',
          location: '甘肃省敦煌市',
          period: '始建于前秦时期',
          country: '中国',
          status: 'active',
          statusText: '开放参观',
          description: '莫高窟是丝绸之路上的重要佛教艺术宝库，保存了大量精美的壁画和彩塑。',
          features: [
            '现存492个洞窟',
            '保存有4.5万平方米的壁画',
            '2000多身彩塑',
            '世界文化遗产'
          ],
          visitInfo: {
            openingHours: '8:00-18:00（旺季）',
            ticket: '238元（含讲解）',
            transportation: '可乘坐敦煌机场大巴或包车前往'
          }
        },
        {
          id: 2,
          name: '撒马尔罕古城',
          image: '/images/samarkand.jpg',
          location: '乌兹别克斯坦撒马尔罕',
          period: '始建于公元前6世纪',
          country: '乌兹别克斯坦',
          status: 'active',
          statusText: '开放参观',
          description: '撒马尔罕是丝绸之路上的重要城市，保存着众多伊斯兰建筑杰作。',
          features: [
            '雷吉斯坦广场',
            '比比哈努姆清真寺',
            '古尔-埃米尔陵墓',
            '世界文化遗产'
          ],
          visitInfo: {
            openingHours: '9:00-17:00',
            ticket: '约30美元（通票）',
            transportation: '可从塔什干乘坐高铁或飞机前往'
          }
        }
      ]
    }
  }
}
</script>

<style scoped>
.modern-sites {
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

.sites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.site-card {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.site-card:hover {
  transform: translateY(-5px);
}

.site-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.site-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.site-card:hover .site-image img {
  transform: scale(1.05);
}

.site-status {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
}

.site-status.active {
  background: rgba(46, 204, 113, 0.8);
}

.site-content {
  padding: 1.5rem;
}

.site-content h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.site-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
}

.info-item i {
  color: #2c3e50;
}

.description {
  color: #444;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.site-features h3,
.site-visit h3 {
  color: #2c3e50;
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
}

.site-features ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.site-features li {
  color: #666;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.site-features li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #2c3e50;
}

.visit-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.visit-item {
  display: flex;
  gap: 0.5rem;
}

.visit-item .label {
  color: #666;
  font-weight: 500;
}
</style> 