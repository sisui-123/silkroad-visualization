<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

const router = useRouter();

onMounted(() => {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });
});
const sites = [
{
    name: '莫高窟',
    image: '/images/mogaoku.jpg',
    location: '中国甘肃省敦煌市',
    year: '366年',
    description: '莫高窟是丝绸之路上的重要佛教艺术遗址，拥有大量壁画和雕塑。',
    id: 'mogaoku'  // 添加唯一标识符
  },
  {
    name: '交河故城',
    image: '/images/jiaohegucheng.jpg',
    location: '中国新疆吐鲁番',
    year: '公元前2世纪',
    description: '交河故城是古代西域车师前国的都城遗址，制定了丝绸之路的繁荣。',
    id: 'jiaohegucheng'
  },
  {
    name: '楼兰古城',
    image: '/images/loulan.jpg',
    location: '中国新疆罗布泊',
    year: '公元前176年',
    description: '楼兰古城是丝绸之路上的重要驿站，因环境变迁而废弃。',
    id: 'loulan'
  }
];

const goToSiteDetail = (siteId) => {
  
  // 修改后（正确）
  router.push(`/site/${siteId}`);  // 使用路径格式跳转
};
</script>

<template>
  <div class="silkroad-sites">
    <div class="glass-container">
      <h1 class="title">丝绸之路历史遗址</h1>
      
      <div class="dashboard-layout">
        <div class="sites-container">
          <div v-for="site in sites" :key="site.name" class="site-card" @click="goToSiteDetail(site.id)" data-aos="fade-up">
            <img :src="site.image" :alt="site.name" class="site-image" />
            <div class="site-info">
              <h3>{{ site.name }}</h3>
              <p><strong>位置:</strong> {{ site.location }}</p>
              <p><strong>年代:</strong> {{ site.year }}</p>
              <p>{{ site.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.silkroad-sites {
  height: 100vh;
  padding: 1rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  overflow: hidden;
  position: relative;
  font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
}

.silkroad-sites::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/images/silk-road-bg.jpg') no-repeat center center;
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

.dashboard-layout {
  display: flex;
  flex: 1;
  height: calc(100% - 3.5rem);
  overflow: hidden;
  margin-top: 1rem;
}

.sites-container {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.site-card {
  display: flex;
  align-items: center; 
  border-radius: 14px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.site-card:hover {
  transform: translateY(-3px) scale(1.01);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.25);
}

.site-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent);
  z-index: 0;
}

.site-image {
  width: 250px; 
  height: 200px; 
  object-fit: cover;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.5s ease;
}

.site-card:hover .site-image {
  transform: scale(1.05);
}

.site-info {
  padding: 1rem;
  flex: 1;
}

h3 {
  color: #2c3e50;
  margin-bottom: 0.75rem;
  font-size: 1.2rem;
  font-weight: 600;
  position: relative;
  z-index: 1;
}

p {
  color: rgba(44, 62, 80, 0.85);
  margin-bottom: 0.5rem;
  line-height: 1.6;
  font-size: 0.9rem;
  position: relative;
  z-index: 1;
}

p strong {
  color: #2c3e50;
  font-weight: 600;
}

/* 滚动条样式 */
.sites-container::-webkit-scrollbar {
  width: 6px;
}

.sites-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.sites-container::-webkit-scrollbar-thumb {
  background: rgba(44, 62, 80, 0.3);
  border-radius: 10px;
}

.sites-container::-webkit-scrollbar-thumb:hover {
  background: rgba(44, 62, 80, 0.5);
}

@media (max-width: 768px) {
  .site-card {
    flex-direction: column;
  }
  
  .site-image {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
}
</style>