<template>
    <div class="location-page">
      <div class="glass-container">
        <h1 class="title">丝绸之路历史地图</h1>
        <div class="tab-container">
          <button 
            v-for="tab in tabs" 
            :key="tab.id" 
            @click="currentTab = tab.id"
            :class="{ active: currentTab === tab.id }"
          >
            {{ tab.name }}
          </button>
        </div>
    
        <div class="dashboard-layout">
          <div class="map-container" v-if="currentTab === '2d'">
            <Maps />
          </div>
    
          <div class="historical-info" v-if="currentTab === 'city-info'">
            <div class="info-grid" data-aos="fade-up">
          <!-- 添加城市历史发展板块 -->
          <div class="events-section">
              <div class="events">
                <h3 class="section-title">📜 城市历史发展</h3>
                
                <!-- 城市中心的迁移与重建 -->
                <div class="era-card">
                    <h4>1. 城市中心的迁移与重建</h4>
                    <p>汉代：汉长安城是丝绸之路的起点之一，位于今西安西北方向。汉武帝时期，张骞出使西域，开辟了丝绸之路，长安成为重要的交通枢纽。</p>
                    <p>隋唐时期：隋文帝放弃旧都长安，命宇文恺在汉长安城东南面建造新都大兴城，唐王朝建立后改称长安城。唐代长安城成为当时世界上最大的城市，也是丝绸之路的商贸和文化交流中心。</p>
                </div>
    
                <!-- 交通网络的拓展与完善 -->
                <div class="era-card">
                    <h4>2. 交通网络的拓展与完善</h4>
                    <p>陆路交通：丝绸之路的开辟使西安成为连接中原与西域的重要节点。从长安出发，经河西走廊通往中亚、西亚，直至欧洲。随着丝绸之路的繁荣，西安的交通网络不断拓展，形成了多条通往西域的路线。</p>
                    <p>现代交通：在"丝绸之路经济带"建设中，西安作为陇海兰新铁路沿线最大的西部中心城市，具有承东启西、连接南北的重要战略地位。</p>
                </div>
    
                <!-- 城市功能的转变与提升 -->
                <div class="era-card">
                    <h4>3. 城市功能的转变与提升</h4>
                    <p>古代：丝绸之路的繁荣使西安成为国际贸易、文化交流的重要城市。唐代长安城内的大唐西市是中亚、波斯等西域商人从事商业贸易的国际性市场。</p>
                    <p>现代：西安依托自身区位优势，成为"一带一路"倡议的重要节点城市，肩负着促进亚欧合作交流的使命。</p>
                </div>
    
                <!-- 经济与文化交流的增强 -->
                <div class="era-card">
                    <h4>4. 经济与文化交流的增强</h4>
                    <p>古代：丝绸之路的开通使西安成为东西方文明交融的中心。来自中亚、西亚的商人、学者、艺术家汇聚于此，带来了异域的香料、宝石等商品，也促进了佛教、祆教等宗教的传播。</p>
                    <p>现代：西安作为"丝绸之路经济带"的重要门户，通过跨国道路联通等工程，吸引了大量跨国资本、企业和人流，提升了城市的国际化水平。</p>
                </div>
            </div>
        </div>
  
        <!-- 保留西安地理优势板块 -->
        <div class="city-section">
          <div class="city-info">
            <h3 class="section-title">🏯 西安地理优势</h3>
            <div class="city-card">
              <div class="city-header">
                <h4 class="city-name">长安古城 · 丝路起点</h4>
                <img src="/images/dayanta.png" alt="西安大雁塔" class="city-image">
              </div>
              <div class="city-content">
                <p class="city-intro">八百里秦川腹地，十三朝古都西安，作为丝绸之路的东方起点，拥有得天独厚的地理条件：</p>
                <ul class="feature-list">
                  <li v-for="(feature, idx) in cityFeatures" :key="idx" class="feature-item">
                    <span class="feature-icon">{{ feature.icon }}</span>
                    <div class="feature-content">
                      <strong>{{ feature.title }}</strong>
                      <p>{{ feature.description }}</p>
                    </div>
                  </li>
                </ul>
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
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Maps from '../components/HistoricalMaps.vue';
  import AOS from 'aos';
  import 'aos/dist/aos.css';
  // 移除未使用的历史数据导入
  
  onMounted(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  });
    
  const currentTab = ref('2d');
    
  const tabs = ref([
    { id: "2d", name: "历史地图" },
    { id: "city-info", name: "地缘区位优势" }
    // 移除"城市发展"选项卡
  ]);
    
  const cityFeatures = ref([
    {
      icon: "🗺️",
      title: "地形地貌",
      description: "位于关中平原中部，渭河冲积平原，海拔400-700米，地势平坦开阔，南依秦岭，北靠黄土高原，形成天然屏障"
    },
    {
      icon: "🌤️",
      title: "气候条件",
      description: "暖温带半湿润大陆性季风气候，年均气温13-14℃，年降水量580-750mm，四季分明，适宜农业生产和人类居住"
    },
    {
      icon: "💧",
      title: "水文系统",
      description: "渭河及其支流形成密集水网，八水绕长安（渭、泾、沣、涝、潏、滈、浐、灞），充足的水源保障城市发展和农业灌溉"
    },
    {
      icon: "🚩",
      title: "交通枢纽",
      description: "控制陇山东西通道，渭河谷地连接中原与河西走廊，秦岭古道通往巴蜀和江南"
    },
    {
      icon: "🏞️",
      title: "资源禀赋",
      description: '关中平原沃野千里，号称"天府之国"，周边山区矿产丰富（蓝田玉等），秦岭提供丰富木材和动植物资源'
    }
  ]);
  </script>
  
  <style>
  /* 基础样式 */
  .location-page {
    height: 100vh;
    padding: 1rem;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    overflow: hidden;
    position: relative;
    font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
  }
  
  .location-page::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/src/assets/location/dayanta.png') no-repeat center center;
    background-size: cover;
    opacity: 0.15;
    z-index: -1;
  }
  
  .glass-container {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border-radius: 20px;
    padding: 1.25rem;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.18);
    height: calc(100vh - 2rem);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    z-index: 1;
  }
  
  .glass-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent);
    z-index: -1;
    border-radius: 20px 20px 0 0;
  }
  
  .title {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 0.75rem;
    font-size: 2rem;
    font-weight: 600;
    position: relative;
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .title::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 3px;
    background: linear-gradient(90deg, transparent, rgba(44, 62, 80, 0.5), transparent);
  }
  
  /* 标签页样式 */
  .tab-container {
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  .tab-container button {
    padding: 0.5rem 1.25rem;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 0.9rem;
    font-weight: 500;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    color: #2c3e50;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .tab-container button.active {
    background: #2c3e50;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(44, 62, 80, 0.2);
  }
  
  .tab-container button:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
  
  /* 布局容器 */
  .dashboard-layout {
    display: flex;
    flex: 1;
    gap: 1.25rem;
    height: calc(100% - 5rem);
    overflow: hidden;
    margin-top: 0.5rem;
  }
  
  /* 地图容器 */
  .map-container {
    flex: 1;
    border-radius: 15px;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.25);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  /* 信息网格布局 */
  .historical-info {
    flex: 1;
    overflow-y: auto;
    padding-right: 0.5rem;
  }
  
  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
    align-items: start;
  }
  
  .events {
    padding: 1rem;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.25);
  }
  
  .section-title {
    color: #2c3e50;
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1.3rem;
    position: relative;
    display: inline-block;
    padding-bottom: 0.5rem;
    font-weight: 600;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
  
  .section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(44, 62, 80, 0.5), transparent);
  }
  
  .era-card {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 14px;
    padding: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
    position: relative;
  }
  
  .era-card:hover {
    transform: translateY(-3px) scale(1.01);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.25);
  }
  
  .era-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent);
    border-radius: 14px 14px 0 0;
    z-index: 0;
  }
  
  .era-card h4 {
    color: #2c3e50;
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
    font-weight: 600;
    position: relative;
    z-index: 1;
  }
  
  .era-card p {
    color: rgba(44, 62, 80, 0.85);
    margin-bottom: 0.75rem;
    line-height: 1.6;
    font-size: 0.9rem;
    position: relative;
    z-index: 1;
  }
  
  /* 右侧城市信息区域 */
  .city-section {
    display: flex;
    flex-direction: column;
  }
  
  .city-info {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    padding: 1rem;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.25);
  }
  
  .city-card {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
    position: relative;
  }
  
  .city-card:hover {
    transform: translateY(-3px) scale(1.01);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.25);
  }
  
  .city-header {
    position: relative;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
  }
  
  .city-name {
    color: #2c3e50;
    margin-bottom: 0.75rem;
    font-size: 1.2rem;
    text-align: center;
    font-weight: 600;
    position: relative;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
  
  .city-image {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.3);
    transition: transform 0.5s ease;
  }
  
  .city-card:hover .city-image {
    transform: scale(1.03);
  }
  
  .city-content {
    padding: 1rem;
  }
  
  .city-intro {
    color: rgba(44, 62, 80, 0.85);
    margin-bottom: 1rem;
    line-height: 1.6;
    font-size: 0.9rem;
  }
  
  .feature-list {
    list-style: none;
    padding: 0;
  }
  
  .feature-item {
    display: flex;
    margin-bottom: 0.75rem;
    background: rgba(255, 255, 255, 0.15);
    padding: 0.75rem;
    border-radius: 10px;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .feature-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    background: rgba(255, 255, 255, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  
  .feature-icon {
    font-size: 1.5rem;
    margin-right: 0.75rem;
    color: #2c3e50;
  }
  
  .feature-content {
    flex: 1;
  }
  
  .feature-content strong {
    display: block;
    color: #2c3e50;
    margin-bottom: 0.3rem;
    font-size: 1rem;
    font-weight: 600;
  }
  
  .feature-content p {
    color: rgba(44, 62, 80, 0.85);
    margin: 0;
    line-height: 1.5;
    font-size: 0.85rem;
  }
  
  /* 响应式调整 */
  @media (max-width: 768px) {
    .info-grid {
      grid-template-columns: 1fr;
    }
    
    .dashboard-layout {
      flex-direction: column;
    }
  }
  
  /* 滚动条样式 */
  .historical-info::-webkit-scrollbar {
    width: 6px;
  }
  
  .historical-info::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  
  .historical-info::-webkit-scrollbar-thumb {
    background: rgba(44, 62, 80, 0.3);
    border-radius: 10px;
  }
  
  .historical-info::-webkit-scrollbar-thumb:hover {
    background: rgba(44, 62, 80, 0.5);
  }
  </style>