<template>
  <div class="historical-events">
    <!-- 城市切换选择器 -->
    <div class="city-selector">
      <select v-model="selectedCity" @change="changeCity">
        <option v-for="city in availableCities" :key="city.value" :value="city.value">
          {{ city.label }}
        </option>
      </select>
    </div>
    
    <!-- 遮罩层 -->
    <div class="modal-overlay" :class="{ 'active': selectedEvent }"></div>
    
    <div class="timeline-container" :class="{ 'has-selected': selectedEvent }">
      <!-- Timeline line -->
      <div class="timeline-line"></div>
      
      <!-- Event cards -->
      <div class="events-container">
        <TransitionGroup name="card">
          <div
            v-for="(event, index) in filteredEvents"
            :key="event.id"
            class="event-card"
            :class="{ 
              'selected': selectedEvent === event.id,
              'top': index % 2 === 0,
              'bottom': index % 2 === 1,
              'other-cards': selectedEvent && selectedEvent !== event.id
            }"
            :style="{
              '--index': index,
              '--total': filteredEvents.length
            }"
            @click="selectEvent(event.id, index % 2 === 0)"
          >
            <div class="card-content" :class="{ 'expanded': selectedEvent === event.id }">
              <!-- Normal card view -->
              <template v-if="selectedEvent !== event.id">
                <div class="card-image">
                  <img :src="event.images[Object.keys(event.images)[0]]" :alt="event.title">
                </div>
                <div class="card-info">
                  <h3>{{ event.title }}</h3>
                  <p class="time">{{ event.timeRange.display }}</p>
                  <p class="description">{{ event.description }}</p>
                </div>
              </template>

              <!-- Expanded card view -->
              <template v-else>
                <button class="close-button" @click.stop="selectEvent(null)"></button>
                
                <!-- Header section -->
                <div class="event-header">
                  <div class="header-left">
                    <div class="card-image">
                      <img :src="event.images[Object.keys(event.images)[0]]" :alt="event.title">
                    </div>
                    <div class="header-info">
                      <h3>{{ event.title }}</h3>
                      <p class="time">{{ event.timeRange.display }}</p>
                      <p class="description">{{ event.description }}</p>
                    </div>
                  </div>
                  <div class="header-right" v-if="event.keyFigures && event.keyFigures.length">
                    <div class="key-figures">
                      <div v-for="figure in event.keyFigures" :key="figure.name" class="figure-item">
                        <img :src="figure.image" :alt="figure.name">
                        <div class="figure-info">
                          <h5>{{ figure.name }}</h5>
                          <p>{{ figure.role }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Main content -->
                <div class="event-main">
                  <div class="detailed-section">
                    <h4>背景</h4>
                    <p>{{ event.background }}</p>
                  </div>
                  <div class="detailed-section">
                    <h4>影响</h4>
                    <p>{{ event.impact }}</p>
                  </div>
                  <div class="detailed-section">
                    <h4>关键事件</h4>
                    <ul>
                      <li v-for="(item, idx) in event.keyEvents" :key="idx">{{ item }}</li>
                    </ul>
                  </div>
                  <!-- 相关地点移到右侧 -->
                  <div class="detailed-section" v-if="event.locations && event.locations.length">
                    <h4>相关地点</h4>
                    <div class="location-tags">
                      <span v-for="location in event.locations" :key="location" class="location-tag">
                        {{ location }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Sidebar content -->
                <div class="event-sidebar">
                  <!-- 视频展示区域 -->
                  <div class="detailed-section" v-if="event.mainVideo">
                    <div class="video-container">
                      <video :src="event.mainVideo" controls preload="metadata" class="event-video">
                        您的浏览器不支持视频播放
                      </video>
                    </div>
                  </div>
                  
                  <!-- 文物展示 -->
                  <div class="detailed-section" v-if="event.artifacts && event.artifacts.length">
                    <h4>相关文物</h4>
                    <div class="artifacts-grid">
                      <div v-for="artifact in event.artifacts" :key="artifact.name" class="artifact-item">
                        <div class="artifact-image">
                          <img :src="artifact.image" :alt="artifact.name">
                        </div>
                        <p class="artifact-name">{{ artifact.name }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedEvent = ref(null)
const selectedCity = ref('xian') // 默认选择西安

// 可用城市列表
const availableCities = [
  { label: '西安', value: 'xian' },
  { label: '敦煌', value: 'dunhuang' },
  { label: '长安', value: 'changan' },
  { label: '洛阳', value: 'luoyang' },
  { label: '广州', value: 'guangzhou' }
]

// 城市切换函数
const changeCity = () => {
  // 切换城市时清除选中的事件
  selectedEvent.value = null
  // 这里可以添加其他城市切换逻辑，如加载特定城市的数据
}

const historicalEvents = [
  {
    id: 1,
    title: '秦始皇统一六国',
    year: '公元前221年',
    icon: 'fas fa-crown',
    description: '秦始皇统一六国，建立中国历史上第一个统一的中央集权国家。',
    impact: '确立了中国统一的政治体制，奠定了中央集权制度的基础。',
    background: '为了对抗匈奴，寻求军事同盟，同时开拓西域贸易。',
    mainVideo: '/videos/qin-unification.mp4',
    videoCaption: '秦统一六国历史纪录片片段',
    keyEvents: [
      '公元前230年，秦灭韓國',
      '公元前221年，秦始皇统一六国，定都咸阳',
      '公元前220年，秦始皇开始修建骊山陵墓（兵马俑）',
      '公元前214年，修建咸阳宫和阿房宫'
    ],
    keyFigures: [
      { name: '秦始皇', role: '秦国君主', image: '/images/xian/qin-shihuang.jpg' },
      { name: '李斯', role: '丞相', image: '/images/xian/li-si.jpg' }
    ],
    artifacts: [
      { name: '秦始皇兵马俑', image: '/images/xian/terracotta-warriors.jpg' },
      { name: '秦统一度量衡', image: '/images/xian/qin-measure.jpg' }
    ],
    locations: ['咸阳', '骊山', '阿房宫', '秦长城起点'],
    images: {
      main: '/images/xian/terracotta-warriors.jpg'
    },
    timeRange: {
      display: '公元前221年'
    },
    city: 'xian' // 添加城市标识
  },
  {
    id: 2,
    title: '汉武帝开通丝绸之路',
    year: '公元前139年',
    icon: 'fas fa-road',
    description: '汉武帝派张骞出使西域，开通丝绸之路，促进了东西方经济文化交流。',
    background: '为了对抗匈奴，寻求军事同盟，同时开拓西域贸易。',
    impact: '开辟了连接东西方的贸易通道，促进了经济文化交流，奠定了中国与西域各国关系的基础。',
    mainVideo: '/videos/silk-road.mp4',
    videoCaption: '丝绸之路历史纪录片',
    keyEvents: [
      '张骞第一次出使西域（公元前139年）',
      '张骞第二次出使西域（公元前119年）',
      '确立西域都护府',
      '丝绸之路正式形成'
    ],
    keyFigures: [
      { name: '汉武帝', role: '汉朝皇帝', image: '/images/xian/han-wudi.jpg' },
      { name: '张骞', role: '使者', image: '/images/xian/zhang-qian.jpg' }
    ],
    artifacts: [
      { name: '汉代丝绸', image: '/images/xian/han-silk.jpg' },
      { name: '汉代铜镜', image: '/images/xian/han-mirror.jpg' }
    ],
    locations: ['长安城', '敦煌', '楼兰', '大宛'],
    images: {
      main: '/images/xian/han-silk.jpg'
    },
    timeRange: {
      display: '公元前139年'
    },
    city: 'xian' // 添加城市标识
  },
  {
    id: 3,
    title: '唐长安城建设',
    year: '公元618年',
    icon: 'fas fa-landmark',
    description: '唐朝建都长安，建设了当时世界上最大、最繁华的都城。',
    background: '随着唐朝建立，需要一个能够承载大唐帝国统治中心的宏伟都城。',
    impact: '创造了世界城市建设的典范，影响了日本、韩国等国家的都城规划。',
    mainVideo: '/videos/tang-changan.mp4',
    videoCaption: '唐长安城复原展示',
    keyEvents: [
      '大兴城改名长安',
      '建设皇城宫殿',
      '形成坊市制度',
      '西市东市繁荣'
    ],
    keyFigures: [
      { name: '李世民', role: '唐太宗', image: '/images/xian/tang-taizong.jpg' },
      { name: '宇文恺', role: '设计者', image: '/images/xian/yuwen-kai.jpg' }
    ],
    artifacts: [
      { name: '唐三彩', image: '/images/xian/tang-sancai.webp' },
      { name: '市招', image: '/images/xian/tang-market.jpg' }
    ],
    locations: ['皇城', '明德门', '安定门', '西市'],
    images: {
      main: '/images/xian/tang-sancai.webp'
    },
    timeRange: {
      display: '公元618年'
    },
    city: 'xian' // 添加城市标识
  },
  {
    id: 4,
    title: '玄奘西行取经',
    year: '公元627年',
    icon: 'fas fa-dharmachakra',
    description: '玄奘法师从长安出发，历经艰险前往天竺取经。',
    background: '为求取佛教真经，澄清教义分歧。',
    impact: '促进了中印文化交流，《大唐西域记》记录了丝路沿线重要历史资料。',
    mainVideo: '/videos/xuanzang.mp4',
    videoCaption: '玄奘西行纪录片',
    keyEvents: [
      '从长安出发',
      '穿越塔克拉玛干沙漠',
      '到达那烂陀寺',
      '携带经书返回'
    ],
    keyFigures: [
      { name: '玄奘', role: '法师', image: '/images/xian/xuanzang-portrait.jpg' },
      { name: '戒日王', role: '天竺国王', image: '/images/xian/jieri-wang.jpg' }
    ],
    artifacts: [
      { name: '大雁塔', image: '/images/xian/giant-wild-goose-pagoda.jpg' },
      { name: '佛经', image: '/images/xian/buddhist-sutra.jpg' }
    ],
    locations: ['长安', '敦煌', '天竺', '那烂陀寺'],
    images: {
      main: '/images/xian/giant-wild-goose-pagoda.jpg'
    },
    timeRange: {
      display: '公元627年'
    },
    city: 'changan' // 添加城市标识
  },
  {
    id: 5,
    title: '西安事变',
    year: '1936年12月12日',
    icon: 'fas fa-handshake',
    description: '张学良、杨虎城扣留蒋介石，促成国共合作抗日。',
    background: '面对日本侵略，国民党坚持剿共政策，引发军事将领不满。',
    impact: '促成第二次国共合作，实现了全民族抗日统一战线的形成。',
    mainVideo: '/videos/xian-incident.mp4',
    videoCaption: '西安事变历史影像',
    keyEvents: [
      '扣留蒋介石',
      '周恩来到西安谈判',
      '和平解决事变',
      '促成抗日统一战线'
    ],
    keyFigures: [
      { name: '张学良', role: '东北军领袖', image: '/images/xian/zhang-xueliang.jpg' },
      { name: '杨虎城', role: '西北军领袖', image: '/images/xian/yang-hucheng.jpg' }
    ],
    artifacts: [
      { name: '华清池', image: '/images/xian/huaqing-pool.jpg' },
      { name: '事变旧址', image: '/images/xian/incident-site.jpg' }
    ],
    locations: ['华清池', '临潼', '西安'],
    images: {
      main: '/images/xian/huaqing-pool.jpg'
    },
    timeRange: {
      display: '1936年12月12日'
    },
    city: 'xian' // 添加城市标识
  },
  {
    id: 6,
    title: '西安古城墙保护',
    year: '1983年至今',
    icon: 'fas fa-archway',
    description: '对西安明清古城墙进行系统保护和修复。',
    background: '古城墙是世界上保存最完整的古代城垣，需要科学保护。',
    impact: '为世界遗产保护树立典范，促进了文化旅游发展。',
    mainVideo: '/videos/city-wall.mp4',
    videoCaption: '西安城墙保护工程纪实',
    keyEvents: [
      '列入重点文物保护单位',
      '开展系统修缮工程',
      '建立数字化监测系统',
      '发展文化旅游项目'
    ],
    keyFigures: [
      { name: '专家团队', role: '修复专家', image: '/images/xian/experts.jpg' },
      { name: '工匠传承人', role: '技艺传承', image: '/images/xian/craftsman.jpg' }
    ],
    artifacts: [
      { name: '城墙砖雕', image: '/images/xian/wall-model.jpg' },
      { name: '古代城门', image: '/images/xian/ancient-gate.jpg' }
    ],
    locations: ['南门', '北门', '钟楼', '碑林'],
    images: {
      main: '/images/xian/ancient-gate.jpg'
    },
    timeRange: {
      display: '1983年至今'
    },
    city: 'xian' // 添加城市标识
  },
  {
    id: 7,
    title: '莫高窟艺术',
    year: '公元366年至今',
    icon: 'fas fa-monument',
    description: '敦煌莫高窟是世界上现存规模最大、内容最丰富的佛教艺术圣地。',
    background: '因丝绸之路的繁荣，佛教东传，敦煌成为东西方文化交汇的重要节点。',
    impact: '保存了大量珍贵的佛教艺术和历史文献，是研究中国古代艺术、宗教和民族关系的重要资料。',
    mainVideo: '/videos/mogao-caves.mp4',
    videoCaption: '莫高窟艺术纪录片',
    keyEvents: [
      '公元366年，乐僔开凿第一个洞窟',
      '唐代达到鼎盛，开凿了大量精美洞窟',
      '1900年，王道士发现藏经洞',
      '现代保护与数字化工作持续进行'
    ],
    keyFigures: [
      { name: '乐僔', role: '创始人', image: '/images/dunhuang/le-zun.jpg' },
      { name: '王圆箓', role: '发现藏经洞的道士', image: '/images/dunhuang/wang-yuanlu.jpg' }
    ],
    artifacts: [
      { name: '飞天壁画', image: '/images/dunhuang/flying-apsaras.jpg' },
      { name: '敦煌经卷', image: '/images/dunhuang/dunhuang-manuscripts.jpg' }
    ],
    locations: ['莫高窟', '藏经洞', '敦煌市'],
    images: {
      main: '/images/dunhuang/mogao-caves.jpg'
    },
    timeRange: {
      display: '公元366年至今'
    },
    city: 'dunhuang' // 添加城市标识
  },
  {
    id: 8,
    title: '广州十三行贸易',
    year: '1757年至1842年',
    icon: 'fas fa-ship',
    description: '清朝时期，广州成为中国唯一对外开放的通商口岸，十三行是当时中外贸易的唯一渠道。',
    background: '清朝实行海禁政策，仅允许广州一地进行对外贸易，并通过行商制度管理外贸。',
    impact: '促进了中西贸易和文化交流，但也导致了鸦片战争等一系列历史事件。',
    mainVideo: '/videos/thirteen-factories.mp4',
    videoCaption: '广州十三行贸易历史',
    keyEvents: [
      '1757年，清朝颁布"一口通商"政策',
      '1760年，十三行行商制度正式确立',
      '1835年，广州外贸达到鼎盛',
      '1842年，鸦片战争后，广州失去独家对外贸易权'
    ],
    keyFigures: [
      { name: '潘启官', role: '十三行行商', image: '/images/guangzhou/pan-qiguan.jpg' },
      { name: '伍秉鉴', role: '著名行商', image: '/images/guangzhou/wu-bingjian.jpg' }
    ],
    artifacts: [
      { name: '外销瓷器', image: '/images/guangzhou/export-porcelain.jpg' },
      { name: '十三行遗址', image: '/images/guangzhou/thirteen-factories-site.jpg' }
    ],
    locations: ['十三行', '沙面', '黄埔'],
    images: {
      main: '/images/guangzhou/thirteen-factories.jpg'
    },
    timeRange: {
      display: '1757年至1842年'
    },
    city: 'guangzhou' // 添加城市标识
  }
]

const filteredEvents = computed(() => {
  return historicalEvents.filter(event => event.city === selectedCity.value)
})

const events = computed(() => historicalEvents)

const selectEvent = (eventId, isTop) => {
  if (selectedEvent.value === eventId) {
    selectedEvent.value = null
  } else {
    selectedEvent.value = eventId
    // Add a class to body to prevent scrolling when card is expanded
    document.body.style.overflow = 'hidden'
  }
}
</script>

<style scoped>
.historical-events {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: 40px 20px;
  position: relative;
}

/* 添加遮罩层 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 5;
  backdrop-filter: blur(3px);
  will-change: opacity, visibility;
}

.modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

.timeline-container {
  position: relative;
  width: 95%;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.timeline-container.has-selected {
  height: 100vh;
  padding: 0;
}

.timeline-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #333;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.has-selected .timeline-line {
  opacity: 0.3;
}

.events-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.event-card {
  position: absolute;
  width: 260px;
  cursor: pointer;
  z-index: 2;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  left: calc((var(--index) / (var(--total) - 1)) * (100% - 260px));
  transform-origin: center center;
}

.event-card.top {
  top: 15%;
  transform: translateY(-50%);
}

.event-card.bottom {
  bottom: 15%;
  transform: translateY(50%);
}

.event-card.selected {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 1200px;
  height: 90vh;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  will-change: transform, opacity;
}

.event-card.selected .card-content {
  position: relative;
  width: 90vw;
  max-width: 1200px;
  height: auto;
  max-height: 90vh;
  margin: 0;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas: 
    "header header"
    "sidebar main";
  gap: 24px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  animation: scaleIn 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  overflow-y: auto;
  will-change: transform;
}

@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* 移动时间线 - 上方卡片被选中 */
.event-card.selected.top + .timeline-line,
.timeline-container:has(.event-card.selected.top) .timeline-line {
  transform: translateY(40vh);
  opacity: 0.3;
}

/* 移动时间线 - 下方卡片被选中 */
.event-card.selected.bottom + .timeline-line,
.timeline-container:has(.event-card.selected.bottom) .timeline-line {
  transform: translateY(-40vh);
  opacity: 0.3;
}

/* 移动其他卡片 - 上方卡片被选中 */
.event-card.selected.top ~ .event-card {
  transform: translateY(40vh);
  opacity: 0;
  pointer-events: none;
  transition-delay: 0.05s;
}

/* 移动其他卡片 - 下方卡片被选中 */
.event-card.selected.bottom ~ .event-card {
  transform: translateY(-40vh);
  opacity: 0;
  transition-delay: 0.05s;
  pointer-events: none;
}

.event-card.other-cards {
  opacity: 0;
  pointer-events: none;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  transform: scale(0.95);
  transition-delay: 0.05s;
}

.card-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 1px solid #eee;
  transform-origin: center center;
  will-change: transform, width, height;
}

.card-content.expanded {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  padding: 40px;
}

.card-image {
  width: 100%;
  height: 120px;
  overflow: hidden;
}

.expanded .card-image {
  height: 300px;
  border-radius: 12px;
  margin-bottom: 24px;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-info {
  padding: 12px;
}

.expanded .card-info {
  padding: 0;
}

.card-info h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
  font-weight: bold;
}

.expanded .card-info h3 {
  font-size: 32px;
  margin-bottom: 16px;
}

.card-info .time {
  font-size: 14px;
  color: #666;
  margin: 4px 0;
}

.expanded .card-info .time {
  font-size: 18px;
  margin: 8px 0 24px;
}

.card-info .description {
  font-size: 12px;
  color: #666;
  margin: 0;
  line-height: 1.4;
}

.expanded .card-info .description {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 32px;
}

.detailed-content {
  margin-top: 32px;
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
  animation-delay: 0.3s;
}

.detailed-section {
  margin-bottom: 24px;
}

.detailed-section:last-child {
  margin-bottom: 0;
}

.detailed-section h4 {
  font-size: 20px;
  margin: 0 0 16px 0;
  color: #333;
  position: relative;
  padding-bottom: 8px;
}

.detailed-section h4::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background: #e0c088;
  border-radius: 2px;
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  padding: 16px 0;
}

.image-item {
  aspect-ratio: 3/2;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.expanded .event-header {
  grid-area: header;
  display: flex;
  gap: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
  height: auto;
  min-height: 160px;
  justify-content: space-between;
}

.expanded .header-left {
  display: flex;
  gap: 24px;
  flex: 1;
}

.expanded .header-right {
  width: 300px;
  border-left: 1px solid #eee;
  padding-left: 20px;
  margin-left: 10px;
}

@media (max-width: 768px) {
  .event-card.selected .card-content {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas: 
      "header"
      "main"
      "sidebar";
  }
  
  .expanded .event-main,
  .expanded .event-sidebar {
    height: auto;
    max-height: 50vh;
    padding: 0;
    border-right: none;
  }
  
  .expanded .event-main {
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
  
  .expanded .event-header {
    flex-direction: column;
    gap: 16px;
  }
  
  .expanded .header-left,
  .expanded .header-right {
    width: 100%;
    border-left: none;
    padding-left: 0;
    margin-left: 0;
  }
  
  .expanded .header-right {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
  }
  
  .figure-item {
    width: 100%;
  }
}

.expanded .header-left .card-image {
  width: 240px;
  height: 160px;
  flex-shrink: 0;
  border-radius: 12px;
  margin: 0;
}

.expanded .header-left .header-info {
  flex: 1;
  min-width: 0;
}

.expanded .header-right h4 {
  margin-top: 0;
}

.expanded .header-right .key-figures {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding-right: 10px;
  max-height: none;
  overflow-y: visible;
}

.figure-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: calc(50% - 8px);
}

.figure-item img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.video-container {
  margin: 0 0 5px 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.expanded .event-main {
  height: auto;
  max-height: none;
  overflow-y: visible;
}

.expanded .event-sidebar {
  height: auto;
  max-height: none;
  overflow-y: visible;
}

.expanded .event-main {
  grid-area: main;
  height: calc(90vh - 250px); /* 减去header的高度和padding */
  overflow-y: auto;
  padding: 0 0 0 20px;
  border-left: 1px solid #eee;
}

.expanded .event-sidebar {
  grid-area: sidebar;
  height: calc(90vh - 250px);
  overflow-y: auto;
  padding: 0 20px 0 0;
}

.video-container {
  margin: 20px 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.expanded .event-header h3 {
  font-size: 28px;
  margin: 0 0 12px 0;
  color: #333;
}

.expanded .event-header .time {
  font-size: 16px;
  color: #666;
  margin: 0 0 12px 0;
}

.expanded .event-header .description {
  font-size: 14px;
  line-height: 1.6;
  color: #666;
  margin: 0;
}

.detailed-section p,
.detailed-section li {
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 12px;
  color: #444;
}

.detailed-section ul {
  padding-left: 20px;
  margin-top: 12px;
}

.detailed-section li {
  position: relative;
  padding-left: 5px;
  margin-bottom: 10px;
}

.close-button {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.08);
  border: none;
  cursor: pointer;
  z-index: 101;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.close-button:hover {
  background: rgba(0, 0, 0, 0.15);
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.close-button::before,
.close-button::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 2px;
  background: #333;
}

.close-button::before {
  transform: rotate(45deg);
}

.close-button::after {
  transform: rotate(-45deg);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 视频样式 */
.video-container {
  margin-bottom: 24px;
}

.event-video {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.event-video:hover {
  transform: scale(1.01);
}

.video-caption {
  font-size: 14px;
  color: #666;
  text-align: center;
  margin: 0;
}

/* 文物网格布局 */
.artifacts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.artifact-item {
  text-align: center;
}

.artifact-item img {
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
}

.artifact-item p {
  font-size: 12px;
  margin: 0;
  color: #666;
}

/* 地点标签样式 */
.location-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.location-tag {
  background: #f5f5f5;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  color: #444;
  display: inline-block;
  margin-bottom: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #eee;
}

.location-tag:hover {
  background: #e0c088;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.key-figures {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-start;
}

.figure-item {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px;
  background: #f8f8f8;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  margin-bottom: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.03);
  width: calc(50% - 6px);
  min-width: 180px;
}

.figure-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  background: #fff;
}

.figure-item img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.figure-info {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.figure-info h5 {
  margin: 0 0 4px 0;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.figure-info p {
  margin: 0;
  font-size: 12px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 文物展示样式 */
.artifacts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 12px;
}

.artifact-item {
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.artifact-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.artifact-image {
  width: 100%;
  height: 120px;
  overflow: hidden;
}

.artifact-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.artifact-item:hover .artifact-image img {
  transform: scale(1.05);
}

.artifact-name {
  padding: 10px;
  margin: 0;
  font-size: 14px;
  text-align: center;
  color: #333;
  font-weight: 500;
}

.figure-item:hover img {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.figure-info h5 {
  margin: 0 0 4px 0;
  font-size: 16px;
  color: #333;
}

.figure-info p {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.detailed-section p {
  font-size: 15px;
  line-height: 1.6;
  color: #666;
  margin: 0;
}

.detailed-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.detailed-section li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 12px;
  font-size: 15px;
  line-height: 1.6;
  color: #666;
}

.detailed-section li:last-child {
  margin-bottom: 0;
}

.detailed-section li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #666;
}

/* Scrollbar styles */
.event-main::-webkit-scrollbar,
.event-sidebar::-webkit-scrollbar {
  width: 4px;
}

.event-main::-webkit-scrollbar-track,
.event-sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.event-main::-webkit-scrollbar-thumb,
.event-sidebar::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 2px;
}

/* 确保内容区域有足够的内边距 */
.event-main,
.event-sidebar {
  padding-bottom: 24px;
}

/* 城市选择器样式 */
.city-selector {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
}

.city-selector select {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: white;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
  padding-right: 32px;
}

.city-selector select:hover {
  border-color: #ccc;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.city-selector select:focus {
  outline: none;
  border-color: #e0c088;
  box-shadow: 0 0 0 3px rgba(224, 192, 136, 0.2);
}
</style>
