<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

// 遗址信息数组 - 添加id字段与SilkRoadSites.vue保持一致
const sites = [
  {
    id: 'mogaoku',
    // 新增子景点数据
    subSites: [
      {
        title: '九层楼',
        image: '/images/jiucenglou.jpg',
        desc: '莫高窟标志性建筑，内藏世界最大室内泥塑弥勒佛像'
      },
      {
        title: '藏经洞',
        image: '/images/cangjindong.jpeg',
        desc: '发现五余件古代文书，震惊中外学术界'
      }
    ],
    name: '莫高窟',
    image: '/images/mogaoku.jpg',
    location: '中国甘肃省敦煌市',
    year: '366年',
    description: `
      莫高窟，俗称千佛洞，坐落在河西走廊西端的敦煌。它始建于十六国的前秦时期，后历经北朝、隋、唐、五代、西夏、元等历代的兴建，形成巨大的规模。
      
      艺术特色：
      • 现存洞窟735个，壁画4.5万平方米
      • 泥质彩塑2415尊
      • 保存了古代丝绸之路上多元文化交融的珍贵史料
      
      1987年被联合国教科文组织列为世界文化遗产。`,
  },
  {
    id: 'jiaohegucheng',
    subSites: [
  
      {
        title: '官署遗址',
        image: '/images/guanshu.jpg',
        desc: '车师前国行政中心，出土大量重要文书'
      },
      {
        title: '地下寺院',
        image: '/images/dixiasiyuan.webp',
        desc: '罕见的半地下式佛教建筑遗址'
      }
    ],
    name: '交河故城',
    image: '/images/jiaohegucheng.jpg',
    location: '中国新疆吐鲁番',
    year: '公元前2世纪',
    description: `
    交河故城是世界上保存最完整的生土建筑城市，始建于公元前2世纪，作为车师前国的都城屹立在丝绸之路要冲达1600年之久。
    
    核心特色：
    ▫️ 独特的"减地留墙"建造工艺，直接从台地表面向下掏挖成型
    ▫️ 完整保存官署区、寺院区、墓葬区等古代城市功能区划
    ▫️ 出土汉代五铢钱、唐代莲花纹瓦当等重要文物
  
    遗址现状：
    现存遗址面积约35万平方米，南北长1650米，最大宽度300米，
    崖壁最高达30米，堪称西域历史的立体教科书。`
  },
  {
    id: 'loulan',
    subSites: [
      
      {
        title: '佛塔遗址',
        image: '/images/fota.jpeg',
        desc: '见证佛教东传的重要遗迹'
      },
      {
        title: '墓葬群',
        image: '/images/muzangqun.jpg',
        desc: '出土著名的楼兰美女干尸'
      }
    ],
    name: '楼兰古城',
    image: '/images/loulan.jpg',
    location: '中国新疆罗布泊',
    year: '公元前176年',
    description: `
    楼兰古城遗址是丝绸之路的咽喉要道，公元前176年见诸汉文史籍，公元4世纪后神秘消失，1900年由瑞典探险家斯文·赫定重新发现。
    
    核心价值：
    ➤ 保存完整的汉代城市布局：官署、民居、佛寺分区明确
    ➤ 出土文物包括汉晋文书、佉卢文木简、精美毛纺织品
    ➤ 著名的"楼兰美女"干尸（距今3800年）见证早期文明
    环境变迁：
    • 塔里木河改道导致水资源枯竭
    • 孔雀河断流后最终被风沙掩埋
    • 年降水量不足20毫米的极端干旱区
    `
},
];

// 修改查找逻辑，使用id匹配
const site = sites.find(s => s.id === route.params.id);

// 如果找不到遗址，显示错误
if (!site) {
  console.error('未找到对应的遗址信息:', route.params.id); // 将name改为id
}
</script>

<template>
  <div class="site-detail">
    <div v-if="site">
      <h2 class="site-title">{{ site.name }}</h2>
      <div class="content-wrapper">
        <img :src="site.image" :alt="site.name" class="site-image" />
        <div class="detail-content">
          <div class="info-box">
            <p><strong>📍 地理位置：</strong>{{ site.location }}</p>
            <p><strong>⏳ 始建年代：</strong>{{ site.year }}</p>
          </div>
          <div class="description">
            <h3>文化价值与历史背景</h3>
            <p style="white-space: pre-line;">{{ site.description }}</p>
          </div>
        </div>
      </div>
      
      <!-- 新增经典遗址区块 -->
      <div class="sub-sites" v-if="site.subSites">
        <h3 class="section-title">经典遗址亮点</h3>
        <div class="subsite-grid">
          <div class="subsite-card" v-for="(sub, index) in site.subSites" :key="index">
            <img :src="sub.image" :alt="sub.title" class="subsite-image" />
            <div class="subsite-info">
              <h4>{{ sub.title }}</h4>
              <p>{{ sub.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 如果未找到遗址，显示错误信息 -->
    <div v-else>
      <h2>遗址信息未找到</h2>
      <p>抱歉，未能找到该遗址的详细信息。</p>
    </div>
  </div>
</template>


<style scoped>
.site-detail {
  max-width: 1200px;
  padding: 30px;
  background: #f5f1e6; /* 新增沙色纸质背景 */
  background-image: linear-gradient(
      to right,
      rgba(205, 170, 125, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      rgba(205, 170, 125, 0.1) 1px,
      transparent 1px
    ); /* 添加丝绸纹理 */
  background-size: 20px 20px;
  border: 1px solid #d4c4a8; /* 新增边框 */
}

.site-title {
  text-align: center;
  color: #6b4f32; /* 改为深褐色 */
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 10px;
}

.site-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 2px;
  background: #9e7b5e; /* 标题下划线 */
}

.info-box {
  background: rgba(255, 248, 225, 0.9); /* 羊皮纸色背景 */
  border: 1px solid #d4c4a8; /* 与边框同色系 */
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
}

.description {
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.content-wrapper {
  display: grid;
  grid-template-columns: 350px 1fr; /* 明确的左右分栏 */
  gap: 50px;
  align-items: start;
  background: rgba(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.site-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  position: sticky;
  top: 20px; /* 图片固定位置 */
}

.detail-content {
  padding-left: 30px;
  border-left: 2px dashed #d4c4a8; /* 添加装饰分隔线 */
}

/* 移动端适配调整 */
@media (max-width: 992px) {
  .content-wrapper {
    grid-template-columns: 1fr;
    padding: 20px;
  }
  
  .detail-content {
    padding-left: 0;
    border-left: none;
    border-top: 2px dashed #d4c4a8;
    padding-top: 20px;
  }
  
  .site-image {
    position: static;
    height: 300px;
  }
}

/* 新增样式 */
.section-title {
  color: #5d432c;
  border-left: 4px solid #9e7b5e;
  padding-left: 15px;
  margin: 40px 0 25px;
}

.subsite-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.subsite-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.subsite-card:hover {
  transform: translateY(-5px);
}

.subsite-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-bottom: 2px solid #d4c4a8;
}

.subsite-info {
  padding: 15px;
}

.subsite-info h4 {
  color: #6b4f32;
  margin-bottom: 10px;
  font-size: 1.1em;
}

.subsite-info p {
  font-size: 0.95em;
  line-height: 1.6;
  color: #666;
}

@media (max-width: 768px) {
  .subsite-grid {
    grid-template-columns: 1fr;
  }
  
  .subsite-image {
    height: 150px;
  }
}
</style>
