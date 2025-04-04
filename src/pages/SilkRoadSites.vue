<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
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
  <div class="sites-container">
    <h2>丝绸之路历史遗址</h2>
    <div v-for="site in sites" :key="site.name" class="site-card" @click="goToSiteDetail(site.id)">
      <img :src="site.image" :alt="site.name" class="site-image" />
      <div class="site-info">
        <h3>{{ site.name }}</h3>
        <p><strong>位置:</strong> {{ site.location }}</p>
        <p><strong>年代:</strong> {{ site.year }}</p>
        <p>{{ site.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sites-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-image: url('/images/bg.jpg'); 
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.site-card {
  display: flex;
  align-items: center; 
  margin-bottom: 30px;
  border: 1px solid #d2b48c; 
  border-radius: 8px;
  overflow: hidden;
  background-color: rgba(255, 250, 240, 0.8); 
  cursor: pointer; 
}

.site-image {
  width: 250px; 
  height: 200px; 
  object-fit: cover;
  border-right: 1px solid #d2b48c; 
}

.site-info {
  padding: 15px;
  flex: 1;
}

h2 {
  color: #8b4513; 
  text-align: center;
  margin-bottom: 20px;
}

h3 {
  color: #a0522d; 
}

p {
  color: #654321; 
}

@media (max-width: 600px) {
  .site-card {
    flex-direction: column;
  }
  
  .site-image {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid #d2b48c; 
  }
}
</style>