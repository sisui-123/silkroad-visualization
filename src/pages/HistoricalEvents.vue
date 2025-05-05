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
  { label: '喀什', value: 'kashgar' },
  { label: '撒马尔罕', value: 'samarkand' },
  { label: '布拉哈', value: 'bukhara' },
  { label: '梅尔夫', value: 'merv' },
  { label: '巴格达', value: 'baghdad' },
  { label: '君士坦丁堡', value: 'constantinople' },
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
    city: 'xian' // 添加城市标识
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

  //敦煌
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
      { name: '乐尊', role: '创始人', image: '/images/dunhuang/le-zun.jpg' },
      { name: '王圆箓', role: '发现藏经洞的道士', image: '/images/dunhuang/wang-yuanlu.png' }
    ],
    artifacts: [
      { name: '飞天壁画', image: '/images/dunhuang/flying-apsaras.jpg' },
      { name: '敦煌经卷', image: '/images/dunhuang/dunhuang-manuscripts.jpg' }
    ],
    locations: ['莫高窟', '藏经洞', '敦煌市'],
    images: {
      main: '/images/dunhuang/mogao-caves.jpeg'
    },
    timeRange: {
      display: '公元366年至今'
    },
    city: 'dunhuang' // 添加城市标识
  },
  {
    id: 8,
    title: '敦煌设郡',
    year: '公元前111年',
    icon: 'fas fa-fort-awesome',
    description: '汉武帝设立敦煌郡，成为汉朝控制西域的战略要地。',
    background: '为巩固河西走廊防线，保障丝绸之路畅通而设立边郡',
    impact: '确立了敦煌作为丝绸之路咽喉要道的地位，为后续佛教艺术传播奠定基础',
    mainVideo: '/videos/dunhuang-established.mp4',
    videoCaption: '敦煌郡设立历史解析',
    keyEvents: [
      '霍去病大破匈奴',
      '汉朝设河西四郡',
      '修筑阳关、玉门关',
      '建立烽燧预警系统'
    ],
    keyFigures: [
      { name: '汉武帝', role: '汉朝皇帝', image: '/images/dunhuang/han-wudi.jpg' },
      { name: '霍去病', role: '军事统帅', image: '/images/dunhuang/huo-qubing.jpg' }
    ],
    artifacts: [
      { name: '汉简', image: '/images/dunhuang/han-bamboo-slips.jpg' },
      { name: '阳关遗址', image: '/images/dunhuang/yangguan-site.jpg' }
    ],
    locations: ['阳关', '玉门关', '敦煌城遗址'],
    images: {
      main: '/images/dunhuang/yangguan-site.jpg'
    },
    timeRange: {
      display: '公元前111年'
    },
    city: 'dunhuang'
  },
  {
    id: 9,
    title: '藏经洞惊世现',
    year: '1900年6月22日',
    icon: 'fas fa-scroll',
    description: '王道士发现莫高窟藏经洞，出土五万余件古代文书文物。',
    background: '在清理积沙时偶然发现密封洞窟，内藏4-11世纪珍贵文献',
    impact: '引发国际学界震动，促成敦煌学诞生，但也造成文物外流的历史遗憾',
    mainVideo: '/videos/library-cave.mp4',
    videoCaption: '藏经洞发现过程还原',
    keyEvents: [
      '王圆箓发现第17窟',
      '斯坦因1907年购得文物',
      '伯希和1908年系统挑选',
      '剩余文物运抵北京'
    ],
    keyFigures: [
      { name: '王圆箓', role: '发现者', image: '/images/dunhuang/wang-yuanlu.png' },
      { name: '斯坦因', role: '探险家', image: '/images/dunhuang/aurel-stein.jpg' }
    ],
    artifacts: [
      { name: '金刚经刻本', image: '/images/dunhuang/diamond-sutra.png' },
      { name: '吐蕃文书', image: '/images/dunhuang/tibetan-manuscript.jpeg' }
    ],
    locations: ['第16窟甬道', '第17窟藏经洞', '莫高窟下寺'],
    images: {
      main: '/images/dunhuang/library-cave.jpg'
    },
    timeRange: {
      display: '1900年'
    },
    city: 'dunhuang'
  },
  {
    id: 10,
    title: '敦煌佛国盛世',
    year: '公元5-6世纪',
    icon: 'fas fa-praying-hands',
    description: '北朝时期敦煌成为佛教艺术中心，形成独特敦煌风格',
    background: '丝路贸易繁荣与佛教东传共同推动的宗教艺术大发展',
    impact: '创造中西合璧的佛教艺术范式，影响云冈、龙门等后续石窟建设',
    mainVideo: '/videos/dunhuang-buddhist-art.mp4',
    videoCaption: '北朝敦煌艺术解析',
    keyEvents: [
      '北魏皇室开凿第259窟',
      '西魏创建第285窟',
      '北周兴建第428窟',
      '首创敦煌飞天形象'
    ],
    keyFigures: [
      { name: '乐僔', role: '莫高窟开创者', image: '/images/dunhuang/le-zun.jpg' },
      { name: '法显', role: '西行僧侣', image: '/images/dunhuang/faxian-monk.png' }
    ],
    artifacts: [
      { name: '禅定佛像', image: '/images/dunhuang/meditation-buddha.jpg' },
      { name: '五百强盗成佛图', image: '/images/dunhuang/500-bandits.jpg' }
    ],
    locations: ['第254窟', '第257窟', '第275窟'],
    images: {
      main: '/images/dunhuang/northern-dynasty-cave.jpg'
    },
    timeRange: {
      display: '5-6世纪'
    },
    city: 'dunhuang'
  },
  {
    id: 11,
    title: '数字敦煌计划',
    year: '2006年启动',
    icon: 'fas fa-laptop-code',
    description: '运用数字技术永久保存敦煌艺术，实现全球共享',
    background: '应对壁画褪色、洞窟承载压力等保护难题',
    impact: '开创文化遗产数字保护新范式，访问量突破2000万人次',
    mainVideo: '/videos/digital-dunhuang.mp4',
    videoCaption: '敦煌数字化工程纪实',
    keyEvents: [
      '建立毫米级三维模型',
      '研发壁画色彩还原技术',
      '上线数字敦煌资源库',
      'VR全景漫游系统开放'
    ],
    keyFigures: [
      { name: '樊锦诗', role: '敦煌研究院院长', image: '/images/dunhuang/fan-jinshi.jpg' },
      { name: '吴健', role: '摄影专家', image: '/images/dunhuang/wu-jian.jpg' }
    ],
    artifacts: [
      { name: '数字洞窟终端', image: '/images/dunhuang/digital-terminal.jpg' },
      { name: '高光谱扫描仪', image: '/images/dunhuang/hyperspectral-scanner.jpg' }
    ],
    locations: ['数字展示中心', '文物保护实验室', '数据中心'],
    images: {
      main: '/images/dunhuang/digital-cave.jpg'
    },
    timeRange: {
      display: '2006年至今'
    },
    city: 'dunhuang'
  },

  //喀什
  {
    id: 12,
    title: '喀喇汗王朝建立',
    year: '公元840年',
    icon: 'fas fa-kaaba',
    description: '突厥语民族建立喀喇汗王朝，开启西域伊斯兰化进程',
    background: '回鹘汗国解体后，葛逻禄等部族在塔里木盆地西部建立政权',
    impact: '推动了突厥语民族的伊斯兰化，创造了《福乐智慧》等文化瑰宝',
    mainVideo: '/videos/karakhanid.mp4',
    videoCaption: '喀喇汗王朝历史纪录片',
    keyEvents: [
      '萨图克·布格拉汗皈依伊斯兰教',
      '与于阗佛教王国战争',
      '建立喀什噶尔都城',
      '推行双语货币制度'
    ],
    keyFigures: [
      { name: '萨图克·布格拉汗', role: '王朝奠基者', image: '/images/kashgar/satuk-bughra-khan.jpg' },
      { name: '玉素甫·哈斯·哈吉甫', role: '诗人', image: '/images/kashgar/yusuf-khass-hajib.jpg' }
    ],
    artifacts: [
      { name: '《福乐智慧》手稿', image: '/images/kashgar/kutadgu-bilig.jpg' },
      { name: '三体钱币', image: '/images/kashgar/tri-lingual-coin.jpg' }
    ],
    locations: ['艾提尕尔清真寺', '汗诺依遗址', '喀什老城'],
    images: {
      main: '/images/kashgar/kashgar-old-city.jpg'
    },
    timeRange: {
      display: '公元9-13世纪'
    },
    city: 'kashgar'
  },
  {
    id: 13,
    title: '察合台汗国都城',
    year: '公元1227年',
    icon: 'fas fa-helmet-battle',
    description: '成吉思汗次子察合台建立汗国，喀什成为中亚统治中心',
    background: '蒙古西征后实行分封制，喀什噶尔成为察合台汗国重要都城',
    impact: '促进了突厥-蒙古文化融合，奠定现代维吾尔语文字基础',
    // mainVideo: '/videos/chagatai-khanate.mp4',
    // videoCaption: '察合台汗国历史复原',
    keyEvents: [
      '确立伊斯兰教国教地位',
      '兴建汗诺依宫殿',
      '推行回鹘式蒙古文',
      '建立驿站系统'
    ],
    keyFigures: [
      { name: '察合台', role: '汗国建立者', image: '/images/kashgar/chagatai-khan.jpg' },
      { name: '秃黑鲁·帖木儿', role: '首位皈依伊斯兰教的蒙古汗', image: '/images/kashgar/tughlugh-timur.webp' }
    ],
    artifacts: [
      { name: '察合台银币', image: '/images/kashgar/chagatai-coin.jpg' },
      { name: '《突厥语大词典》', image: '/images/kashgar/turkic-dictionary.jpg' }
    ],
    locations: ['汗诺依遗址', '阿尔斯兰汗墓', '古代商栈'],
    images: {
      main: '/images/kashgar/chagatai-palace.webp'
    },
    timeRange: {
      display: '13-14世纪'
    },
    city: 'kashgar'
  },
  {
    id: 14,
    title: '阿帕克霍加陵兴建',
    year: '公元1640年',
    icon: 'fas fa-dove',
    description: '伊斯兰苏菲派领袖陵墓建成，后演变为香妃墓传说',
    background: '白山派和卓家族为巩固宗教权威兴建宏伟陵寝',
    impact: '成为新疆伊斯兰建筑典范，融合波斯与中原建筑风格',
    // mainVideo: '/videos/afaq-khoja-mausoleum.mp4',
    // videoCaption: '陵墓建筑艺术解析',
    keyEvents: [
      '阿帕克霍加主持修建',
      '多次扩建形成陵墓群',
      '乾隆香妃传说附会',
      '加建琉璃穹顶'
    ],
    keyFigures: [
      { name: '阿帕克霍加', role: '宗教领袖', image: '/images/kashgar/afaq-khoja.webp' },
      { name: '伊帕尔罕', role: '传说中的香妃', image: '/images/kashgar/xiangfei.jpg' }
    ],
    artifacts: [
      { name: '琉璃穹顶', image: '/images/kashgar/turquoise-dome.jpg' },
      { name: '古兰经匣', image: '/images/kashgar/quran-box.jpg' }
    ],
    locations: ['阿帕克霍加陵', '讲经堂', '高低礼拜寺'],
    images: {
      main: '/images/kashgar/afaq-mausoleum.jpg'
    },
    timeRange: {
      display: '17世纪'
    },
    city: 'kashgar'
  },
  {
    id: 15,
    title: '平定大小和卓之乱',
    year: '公元1759年',
    icon: 'fas fa-peace',
    description: '清军彻底平定叛乱，确立对西域的稳固统治',
    background: '大小和卓利用准噶尔汗国灭亡之机试图独立',
    impact: '奠定现代新疆版图基础，推动多民族融合发展',
    mainVideo: '/videos/qing-conquest.mp4',
    videoCaption: '清军西征历史重现',
    keyEvents: [
      '兆惠将军黑水营之围',
      '巴图尔额敏和卓归顺',
      '伊西洱库尔淖尔之战',
      '设立总理回疆事务参赞大臣'
    ],
    keyFigures: [
      { name: '乾隆帝', role: '清朝皇帝', image: '/images/kashgar/qianlong-emperor.jpg' },
      { name: '兆惠', role: '定边将军', image: '/images/kashgar/zhao-hui.jpg' }
    ],
    artifacts: [
      { name: '《平定回部得胜图》', image: '/images/kashgar/victory-scroll.jpg' },
      { name: '格登山纪功碑', image: '/images/kashgar/gedengshan-monument.jpg' }
    ],
    locations: ['叶尔羌城遗址', '喀什噶尔旧城', '乌什要塞'],
    images: {
      main: '/images/kashgar/qing-military.jpg'
    },
    timeRange: {
      display: '1755-1759年'
    },
    city: 'kashgar'
  },

  //撒马尔罕
  {
    id: 16,
    title: '帖木儿帝国定都',
    year: '公元1370年',
    icon: 'fas fa-chess-king',
    description: '帖木儿将撒马尔罕建设为帝国首都，打造中亚最辉煌都城',
    background: '在蒙古帝国瓦解后，帖木儿通过军事征服建立庞大帝国',
    impact: '创造了波斯-突厥文艺复兴，建筑成就影响整个伊斯兰世界',
    mainVideo: '/videos/samarkand.mp4',
    videoCaption: '撒马尔罕建筑艺术解析',
    keyEvents: [
      '建造雷吉斯坦广场',
      '建立天文观测台',
      '掳掠各国工匠建设都城',
      '举办国际科学会议'
    ],
    keyFigures: [
      { name: '帖木儿', role: '帝国建立者', image: '/images/samarkand/tamerlane.webp' },
      { name: '兀鲁伯', role: '学者君主', image: '/images/samarkand/ulugh-beg.jpg' }
    ],
    artifacts: [
      { name: '兀鲁伯天文台遗址', image: '/images/samarkand/observatory.jpg' },
      { name: '帖木儿玉棺', image: '/images/samarkand/timur-mausoleum.png' }
    ],
    locations: ['雷吉斯坦广场', '比比哈努姆清真寺', '夏伊辛达陵墓'],
    images: {
      main: '/images/samarkand/registan.jpg'
    },
    timeRange: {
      display: '14-15世纪'
    },
    city: 'samarkand'
  },
  {
    id: 17,
    title: '粟特文明中心',
    year: '公元前5世纪',
    icon: 'fas fa-jug',
    description: '作为丝绸之路上最富庶的粟特城邦，成为东西方贸易中转站',
    background: '阿契美尼德王朝时期形成的城邦国家，以经商才能闻名',
    impact: '创造了独特的粟特文字与壁画艺术，发展出成熟的商业网络',
    // mainVideo: '/videos/sogdian-civilization.mp4',
    // videoCaption: '粟特商队数字复原',
    keyEvents: [
      '建立马拉坎达城（今撒马尔罕）',
      '开通波斯皇家大道',
      '铸造迪拉姆银币',
      '形成商业代理人制度'
    ],
    keyFigures: [
      { name: '斯皮塔米尼斯', role: '抗击亚历山大的粟特领袖', image: '/images/samarkand/spitamenes.jpg' },
      { name: '米霍拉克', role: '粟特商会首领', image: '/images/samarkand/mihirak.jpg' }
    ],
    artifacts: [
      { name: '阿夫拉西阿卜壁画', image: '/images/samarkand/afrasiab-murals.jpg' },
      { name: '粟特文契约文书', image: '/images/samarkand/sogdian-contract.jpg' }
    ],
    locations: ['阿夫拉西阿卜遗址', '粟特商队旅馆', '泽拉夫尚河古渡口'],
    images: {
      main: '/images/samarkand/afrasiab-site.jpg'
    },
    timeRange: {
      display: '前6-前4世纪'
    },
    city: 'samarkand'
  },
  {
    id: 18,
    title: '阿拉伯征服',
    year: '公元712年',
    icon: 'fas fa-mosque',
    description: '倭马亚王朝将领屈底波攻占撒马尔罕，开启伊斯兰化进程',
    background: '阿拉伯帝国向东扩张，与唐朝势力在中亚交汇',
    impact: '推动伊斯兰教传播，城市布局出现清真寺与阿拉伯军营',
    mainVideo: '/videos/arab-conquest.mp4',
    videoCaption: '怛罗斯战役前后局势',
    keyEvents: [
      '建造第一座清真寺',
      '造纸工匠被俘西传',
      '粟特贵族改宗伊斯兰',
      '设立铸币厂统一货币'
    ],
    keyFigures: [
      { name: '屈底波·伊本·穆斯林', role: '征服者', image: '/images/samarkand/qutayba.jpg' },
      { name: '阿布·穆斯林', role: '阿拔斯革命领袖', image: '/images/samarkand/abu-muslim.jpg' }
    ],
    artifacts: [
      { name: '阿拉伯第纳尔金币', image: '/images/samarkand/arab-dinar.jpg' },
      { name: '粟特-阿拉伯双语碑', image: '/images/samarkand/bilingual-stele.jpg' }
    ],
    locations: ['古清真寺遗址', '阿拉伯军营区', '造纸作坊遗迹'],
    images: {
      main: '/images/samarkand/arab-minaret.jpg'
    },
    timeRange: {
      display: '8世纪'
    },
    city: 'samarkand'
  },
  {
    id: 19,
    title: '突厥斯坦铁路贯通',
    year: '1888年',
    icon: 'fas fa-train',
    description: '沙俄修建的中亚铁路通达撒马尔罕，开启现代化进程',
    background: '俄罗斯帝国推行中亚铁路计划以巩固殖民统治',
    impact: '改变了传统驼队贸易模式，推动近代工业与考古研究兴起',
    // mainVideo: '/videos/transcaspian-railway.mp4',
    // videoCaption: '老火车影像资料',
    keyEvents: [
      '设立俄罗斯总督府',
      '建立棉花加工厂',
      '组织考古探险队',
      '兴建欧洲风格街区'
    ],
    keyFigures: [
      { name: '康斯坦丁·考夫曼', role: '突厥斯坦总督', image: '/images/samarkand/kaufman.png' },
      { name: '尼古拉·卡拉金', role: '铁路工程师', image: '/images/samarkand/karazin.jpg' }
    ],
    artifacts: [
      { name: '俄式火车站钟楼', image: '/images/samarkand/russian-station.jpg' },
      { name: '考古测绘图纸', image: '/images/samarkand/survey-map.jpg' }
    ],
    locations: ['沙俄总督府旧址', '铁路机修厂', '欧洲区林荫大道'],
    images: {
      main: '/images/samarkand/imperial-train.jpg'
    },
    timeRange: {
      display: '19世纪末'
    },
    city: 'samarkand'
  },

  //布拉哈
  {
    id: 20,
    title: '布哈拉保卫战',
    year: '公元673年',
    icon: 'fas fa-shield-alt',
    description: '阿拉伯军队首次围攻布哈拉，粟特人坚守城池三年',
    background: '倭马亚王朝东扩遭遇粟特城邦激烈抵抗',
    impact: '延缓了伊斯兰教传播速度，保留祆教文化火种',
    // mainVideo: '/videos/bukhara-siege.mp4',
    // videoCaption: '古代城防体系复原',
    keyEvents: [
      '建立烽火预警系统',
      '使用希腊火防御',
      '签订临时和约',
      '缴纳赎城黄金'
    ],
    keyFigures: [
      { name: '瓦拉兹曼', role: '布哈拉城主', image: '/images/bukhara/varazman.jpg' },
      { name: '赛义德·本·奥斯曼', role: '阿拉伯将领', image: '/images/bukhara/said-ibn-uthman.jpg' }
    ],
    artifacts: [
      { name: '粟特青铜头盔', image: '/images/bukhara/sogdian-helmet.jpg' },
      { name: '祆教纳骨瓮', image: '/images/bukhara/ossuary.png' }
    ],
    locations: ['古城西墙遗址', '火神庙废墟', '地下引水渠'],
    images: {
      main: '/images/bukhara/ancient-walls.jpg'
    },
    timeRange: {
      display: '7世纪'
    },
    city: 'bukhara'
  },
  {
    id: 21,
    title: '蒙古铁骑破城',
    year: '公元1220年',
    icon: 'fas fa-horse',
    description: '成吉思汗攻陷布哈拉，摧毁中亚最繁荣的学术之都',
    background: '花剌子模杀害蒙古商队引发西征',
    impact: '导致大量学者外逃，促成巴格达智慧宫学术复兴',
    // mainVideo: '/videos/mongol-conquest.mp4',
    // videoCaption: '蒙古攻城器械复原',
    keyEvents: [
      '守军退守内城',
      '图书馆典籍被焚',
      '工匠被征用西征',
      '重建灌溉系统'
    ],
    keyFigures: [
      { name: '成吉思汗', role: '征服者', image: '/images/bukhara/genghis-khan.jpg' },
      { name: '贾拉尔丁·曼格布迪', role: '守城将领', image: '/images/bukhara/jalal-ad-din.jpg' }
    ],
    artifacts: [
      { name: '蒙古箭镞', image: '/images/bukhara/mongol-arrowheads.jpg' },
      { name: '被焚经书残页', image: '/images/bukhara/burned-manuscript.jpg' }
    ],
    locations: ['阿尔卡禁城', '古城北门遗址', '工匠聚居区'],
    images: {
      main: '/images/bukhara/mongol-siege.jpg'
    },
    timeRange: {
      display: '13世纪'
    },
    city: 'bukhara'
  },
  {
    id: 22,
    title: '昔班尼王朝定都',
    year: '公元1506年',
    icon: 'fas fa-scroll',
    description: '乌兹别克人建立布哈拉汗国，复兴中亚伊斯兰学术',
    background: '帖木儿帝国崩溃后的政权更迭',
    impact: '形成苏菲派学术中心，发展出独特的布哈拉建筑风格',
    // mainVideo: '/videos/bukhara-khanate.mp4',
    // videoCaption: '汗国都城建设过程',
    keyEvents: [
      '重建城墙与城门',
      '创办米里阿拉伯经学院',
      '制定法典',
      '发展天课税收制度'
    ],
    keyFigures: [
      { name: '穆罕默德·昔班尼', role: '汗国建立者', image: '/images/bukhara/muhammad-shaibani.jpg' },
      { name: '阿卜杜拉汗二世', role: '鼎盛时期君主', image: '/images/bukhara/abdullah-khan.jpg' }
    ],
    artifacts: [
      { name: '彩釉建筑陶砖', image: '/images/bukhara/cobalt-tile.png' },
      { name: '宫廷诗集抄本', image: '/images/bukhara/court-poetry.jpg' }
    ],
    locations: ['查尔米纳尔门', '里亚比豪兹广场', '贸易穹顶'],
    images: {
      main: '/images/bukhara/khanate-palace.jpg'
    },
    timeRange: {
      display: '16世纪'
    },
    city: 'bukhara'
  },
  {
    id: 23,
    title: '沙皇特使到访',
    year: '1873年',
    icon: 'fas fa-handshake',
    description: '俄罗斯与布哈拉签订保护条约，开启现代化改革',
    background: '大博弈背景下俄罗斯的中亚扩张政策',
    impact: '引进电报与印刷技术，传统经学院转型现代教育',
    // mainVideo: '/videos/russian-protectorate.mp4',
    // videoCaption: '历史条约签署场景',
    keyEvents: [
      '建立俄语翻译学校',
      '铺设电报线路',
      '改革货币体系',
      '组建新式军队'
    ],
    keyFigures: [
      { name: '康斯坦丁·考夫曼', role: '突厥斯坦总督', image: '/images/samarkand/kaufman.png' },
      { name: '穆扎法尔丁汗', role: '末代埃米尔', image: '/images/bukhara/muzaffar-ed-din.webp' }
    ],
    artifacts: [
      { name: '双头鹰纹银币', image: '/images/bukhara/russian-coin.jpeg' },
      { name: '首部印刷版古兰经', image: '/images/bukhara/printed-quran.jpg' }
    ],
    locations: ['俄罗斯使馆旧址', '电报局大楼', '新式军营'],
    images: {
      main: '/images/bukhara/russian-consulate.jpg'
    },
    timeRange: {
      display: '19世纪'
    },
    city: 'bukhara'
  },

  //梅尔夫
  {
    id: 24,
    title: '波斯帝国要塞',
    year: '公元前6世纪',
    icon: 'fas fa-crown',
    description: '作为阿契美尼德王朝东北边疆重镇，控制丝绸之路北道',
    background: '居鲁士大帝东征建立的军事据点，防御塞种游牧民族',
    impact: '形成早期城市雏形，发展出独特的马尔吉亚纳文明',
    mainVideo: '/videos/achaemenid-merv.mp4',
    videoCaption: '波斯要塞遗址航拍',
    keyEvents: [
      '修筑环形防御城墙',
      '建立皇家驿站系统',
      '铸造大流士金币',
      '设置行省总督府'
    ],
    keyFigures: [
      { name: '大流士一世', role: '波斯皇帝', image: '/images/merv/darius-I.jpg' },
      { name: '马尔吉亚纳总督', role: '地方统治者', image: '/images/merv/satrap.png' }
    ],
    artifacts: [
      { name: '楔形文字泥板', image: '/images/merv/cuneiform-tablet.webp' },
      { name: '狮鹫纹金杯', image: '/images/merv/griffin-goblet.jpg' }
    ],
    locations: ['古城墙遗址', '总督府地基', '拜火教祭坛'],
    images: {
      main: '/images/merv/achaemenid-walls.jpg'
    },
    timeRange: {
      display: '前6-前4世纪'
    },
    city: 'merv'
  },
  {
    id: 25,
    title: '呼罗珊首府',
    year: '公元651年',
    icon: 'fas fa-mosque',
    description: '阿拉伯军队征服后成为倭马亚王朝东部行省首府',
    background: '控制中亚战略要地，镇压波斯复国运动',
    impact: '推动伊斯兰教传播，建立中亚最早清真寺',
    mainVideo: '/videos/umayyad-merv.mp4',
    videoCaption: '阿拉伯时期城市建设',
    keyEvents: [
      '建造星期五清真寺',
      '设立造币厂统一货币',
      '建立军事训练营地',
      '发展坎儿井灌溉系统'
    ],
    keyFigures: [
      { name: '阿卜杜拉·本·阿米尔', role: '征服者总督', image: '/images/merv/abdullah-amir.jpg' },
      { name: '艾布·穆斯林', role: '阿拔斯革命领袖', image: '/images/merv/abu-muslim.jpg' }
    ],
    artifacts: [
      { name: '库法体古兰经残页', image: '/images/merv/kufic-quran.jpg' },
      { name: '阿拉伯第纳尔', image: '/images/merv/arab-dinar.jpg' }
    ],
    locations: ['老城区清真寺', '铸币厂遗址', '地下水利网络'],
    images: {
      main: '/images/merv/arab-minaret.png'
    },
    timeRange: {
      display: '7-8世纪'
    },
    city: 'merv'
  },
  {
    id: 26,
    title: '塞尔柱帝国都城',
    year: '公元1040年',
    icon: 'fas fa-flag',
    description: '图格鲁尔贝格定都梅尔夫，建立横跨中亚的大帝国',
    background: '加兹尼王朝衰落后的权力真空',
    impact: '推动突厥-波斯文化融合，发展伊斯兰建筑新样式',
    // mainVideo: '/videos/seljuk-merv.mp4',
    // videoCaption: '塞尔柱都城复原动画',
    keyEvents: [
      '建造苏丹卡拉城堡',
      '设立皇家天文台',
      '建立跨区域驿传系统',
      '举办国际学术会议'
    ],
    keyFigures: [
      { name: '图格鲁尔贝格', role: '帝国建立者', image: '/images/merv/tughril-beg.webp' },
      { name: '尼扎姆·穆尔克', role: '传奇宰相', image: '/images/merv/nizam-al-mulk.jpg' }
    ],
    artifacts: [
      { name: '塞尔柱星盘', image: '/images/merv/seljuk-astrolabe.jpg' },
      { name: '釉面琉璃砖', image: '/images/merv/turquoise-tile.jpg' }
    ],
    locations: ['苏丹卡拉城堡', '天文台遗址', '皇家图书馆'],
    images: {
      main: '/images/merv/sultan-kala.jpg'
    },
    timeRange: {
      display: '11-12世纪'
    },
    city: 'merv'
  },
  {
    id: 27,
    title: '蒙古屠城浩劫',
    year: '公元1221年',
    icon: 'fas fa-fire',
    description: '拖雷率军毁灭梅尔夫，屠杀七十万居民',
    background: '花剌子模守军杀害蒙古使节引发报复',
    impact: '导致城市永久衰落，大量学者西逃促成阿拉伯科学复兴',
    // mainVideo: '/videos/mongol-destruction.mp4',
    // videoCaption: '蒙古攻城技术解析',
    keyEvents: [
      '守将巴赫尔姆诈降',
      '引水渠系统被毁',
      '工匠押送哈拉和林',
      '瘟疫导致二次毁灭'
    ],
    keyFigures: [
      { name: '拖雷', role: '蒙古统帅', image: '/images/merv/tolui.jpg' },
      { name: '志费尼', role: '历史学家', image: '/images/merv/juvaini.webp' }
    ],
    artifacts: [
      { name: '焦土层考古标本', image: '/images/merv/burned-layer.jpg' },
      { name: '蒙古复合弓残件', image: '/images/merv/mongol-bow.jpg' }
    ],
    locations: ['大屠杀纪念遗址', '被填塞的坎儿井', '万人坑考古区'],
    images: {
      main: '/images/merv/destroyed-city.jpg'
    },
    timeRange: {
      display: '13世纪'
    },
    city: 'merv'
  },

  //巴格达
  {
    id: 28,
    title: '圆形都城奠基',
    year: '公元762年',
    icon: 'fas fa-compass',
    description: '哈里发曼苏尔建造“和平之城”，开创伊斯兰城市规划典范',
    background: '阿拔斯王朝取代倭马亚后需要新的政治中心',
    impact: '确立巴格达千年古都地位，首创同心圆城市布局设计',
    // mainVideo: '/videos/baghdad-founded.mp4',
    // videoCaption: '都城设计原理复原',
    keyEvents: [
      '占星家选定城址',
      '10万工匠参与建设',
      '三重环形防御体系',
      '四大城门对应四方'
    ],
    keyFigures: [
      { name: '曼苏尔', role: '哈里发', image: '/images/baghdad/al-mansur.jpg' },
      // { name: '纳巴赫特', role: '首席建筑师', image: '/images/baghdad/nabahkt.jpg' }
    ],
    artifacts: [
      { name: '青铜都城模型', image: '/images/baghdad/city-model.jpg' },
      { name: '金门装饰残片', image: '/images/baghdad/golden-gate.jpg' }
    ],
    locations: ['圆形城墙遗址', '曼苏尔宫地基', '底格里斯河古码头'],
    images: {
      main: '/images/baghdad/round-city.jpg'
    },
    timeRange: {
      display: '8世纪'
    },
    city: 'baghdad'
  },
  {
    id: 29,
    title: '塞尔柱苏丹驻跸',
    year: '公元1055年',
    icon: 'fas fa-chess-rook',
    description: '图格鲁尔贝格进入巴格达，开启塞尔柱监护哈里发时代',
    background: '阿拔斯哈里发权威衰落，突厥军事势力介入',
    impact: '建立尼扎米亚学院，发展伊斯兰高等教育体系',
    // mainVideo: '/videos/seljuk-baghdad.mp4',
    // videoCaption: '塞尔柱时期学术成就',
    keyEvents: [
      '设立苏丹监护制度',
      '创办第一所官方经学院',
      '扩建跨河浮桥',
      '组建古拉姆卫队'
    ],
    keyFigures: [
      { name: '图格鲁尔贝格', role: '塞尔柱苏丹', image: '/images/baghdad/tughril-beg.jpg' },
      { name: '尼扎姆·穆尔克', role: '传奇宰相', image: '/images/baghdad/nizam-al-mulk.jpg' }
    ],
    artifacts: [
      { name: '尼扎米亚学院门匾', image: '/images/baghdad/nizamiya-plaque.webp' },
      { name: '塞尔柱釉面砖', image: '/images/baghdad/seljuk-tile.jpg' }
    ],
    locations: ['尼扎米亚遗址', '苏丹行宫', '鲁萨法区'],
    images: {
      main: '/images/baghdad/seljuk-palace.jpg'
    },
    timeRange: {
      display: '11世纪'
    },
    city: 'baghdad'
  },
  {
    id: 30,
    title: '旭烈兀屠城',
    year: '公元1258年',
    icon: 'fas fa-skull',
    description: '蒙古西征军摧毁千年古都，终结阿拔斯哈里发国',
    background: '哈里发拒绝投降，蒙古实施报复性惩罚',
    impact: '导致智慧宫典籍永久散失，底格里斯河被书卷染黑',
    // mainVideo: '/videos/mongol-sack.mp4',
    // videoCaption: '古城陷落过程重现',
    keyEvents: [
      '使用回回炮攻城',
      '四十日屠城',
      '图书馆典籍抛入河流',
      '建立伊儿汗国统治'
    ],
    keyFigures: [
      { name: '旭烈兀', role: '蒙古统帅', image: '/images/baghdad/hulagu-khan.jpg' },
      { name: '穆斯塔辛', role: '末代哈里发', image: '/images/baghdad/al-mustasim.jpg' }
    ],
    artifacts: [
      { name: '被焚书卷残页', image: '/images/baghdad/burned-manuscript.jpg' },
      { name: '蒙古攻城石弹', image: '/images/baghdad/catapult-stone.jpg' }
    ],
    locations: ['哈里发宫废墟', '智慧宫遗址', '底格里斯河书难处'],
    images: {
      main: '/images/baghdad/mongol-destruction.jpg'
    },
    timeRange: {
      display: '13世纪'
    },
    city: 'baghdad'
  },
  {
    id: 31,
    title: '奥斯曼复兴',
    year: '公元1534年',
    icon: 'fas fa-cannons',
    description: '苏莱曼大帝征服巴格达，重建两河流域统治中心',
    background: '奥斯曼与波斯争夺美索不达米亚控制权',
    impact: '修复古城防御体系，发展阿拉伯-突厥混合建筑风格',
    // mainVideo: '/videos/ottoman-baghdad.mp4',
    // videoCaption: '军事要塞改造工程',
    keyEvents: [
      '重建城墙与塔楼',
      '设立帕夏总督府',
      '疏通古代运河',
      '建立军械作坊'
    ],
    keyFigures: [
      { name: '苏莱曼大帝', role: '征服者', image: '/images/baghdad/suleiman.jpg' },
      { name: '易卜拉欣帕夏', role: '首任总督', image: '/images/baghdad/ibrahim-pasha.jpg' }
    ],
    artifacts: [
      // { name: '新月军旗', image: '/images/baghdad/crescent-banner.jpg' },
      { name: '多语界碑', image: '/images/baghdad/trilingual-stele.jpg' }
    ],
    locations: ['奥斯曼城堡', '苏莱曼清真寺', '蒂格里斯船坞'],
    images: {
      main: '/images/baghdad/ottoman-citadel.jpg'
    },
    timeRange: {
      display: '16世纪'
    },
    city: 'baghdad'
  },


  //君士坦丁堡
  {
    id: 32,
    title: '新罗马诞生',
    year: '公元330年5月11日',
    icon: 'fas fa-city',
    description: '君士坦丁大帝正式迁都拜占庭，开启千年帝国辉煌',
    background: '罗马帝国重心东移，需要更靠近边境的战略都城',
    impact: '奠定欧亚文明交汇中心地位，创造独特的拜占庭文明',
    // mainVideo: '/videos/constantinople-founded.mp4',
    // videoCaption: '迁都典礼数字复原',
    keyEvents: [
      '举行四十天献城仪式',
      '建立赛马场与皇宫',
      '竖立君士坦丁方尖碑',
      '规划新城区街道'
    ],
    keyFigures: [
      { name: '君士坦丁大帝', role: '建都者', image: '/images/constantinople/constantine-the-great.jpg' },
      { name: '佐西默斯', role: '城市设计师', image: '/images/constantinople/zosimus.jpg' }
    ],
    artifacts: [
      { name: '青铜蛇柱', image: '/images/constantinople/serpent-column.jpg' },
      { name: '迁都诏书副本', image: '/images/constantinople/edict.jpg' }
    ],
    locations: ['古赛马场', '君士坦丁广场', '金门大道'],
    images: {
      main: '/images/constantinople/founding-ceremony.jpg'
    },
    timeRange: {
      display: '4世纪'
    },
    city: 'constantinople'
  },
  {
    id: 33,
    title: '圣索菲亚奇迹',
    year: '公元537年12月27日',
    icon: 'fas fa-church',
    description: '查士丁尼大帝建成世界最大穹顶教堂，创建筑史奇迹',
    background: '尼卡暴动摧毁旧教堂，皇帝欲彰显帝国权威',
    impact: '定义拜占庭建筑风格，影响东正教教堂设计千年',
    // mainVideo: '/videos/hagia-sophia.mp4',
    // videoCaption: '穹顶建造技术解析',
    keyEvents: [
      '数学家安提莫斯设计',
      '使用新型轻质砖材',
      '万人大教堂祝圣',
      '穹顶地震后重建'
    ],
    keyFigures: [
      { name: '查士丁尼一世', role: '皇帝', image: '/images/constantinople/justinian.jpg' },
      { name: '安提莫斯', role: '建筑学家', image: '/images/constantinople/anthemius.jpg' }
    ],
    artifacts: [
      { name: '圣母马赛克', image: '/images/constantinople/theotokos-mosaic.jpg' },
      { name: '建筑契约泥板', image: '/images/constantinople/construction-tablet.webp' }
    ],
    locations: ['大教堂中殿', '帝王之门', '南楼廊'],
    images: {
      main: '/images/constantinople/hagia-sophia-dome.jpg'
    },
    timeRange: {
      display: '6世纪'
    },
    city: 'constantinople'
  },
  {
    id: 34,
    title: '拉丁帝国之耻',
    year: '1204年4月13日',
    icon: 'fas fa-cross',
    description: '第四次十字军背信洗劫君士坦丁堡，建立拉丁政权',
    background: '威尼斯商人操纵十字军转向攻击基督教兄弟',
    impact: '导致拜占庭文明断层，大量文物西流促成文艺复兴',
    // mainVideo: '/videos/fourth-crusade.mp4',
    // videoCaption: '攻城掠夺历史重现',
    keyEvents: [
      '威尼斯舰队突破金角湾',
      '火烧图书馆',
      '掠夺青铜驷马雕像',
      '加冕拉丁皇帝'
    ],
    keyFigures: [
      { name: '恩里科·丹多洛', role: '威尼斯总督', image: '/images/constantinople/enrico-dandolo.png' },
      { name: '阿莱克修斯四世', role: '流亡皇子', image: '/images/constantinople/alexios-IV.jpg' }
    ],
    artifacts: [
      { name: '被肢解的圣像', image: '/images/constantinople/mutilated-icon.JPG' },
      { name: '圣物箱残件', image: '/images/constantinople/relic-box.jpg' }
    ],
    locations: ['布拉赫奈宫废墟', '金角湾海墙', '拉丁军营区'],
    images: {
      main: '/images/constantinople/crusader-sack.webp'
    },
    timeRange: {
      display: '13世纪'
    },
    city: 'constantinople'
  },
  {
    id: 35,
    title: '帝国清真寺新生',
    year: '1453年-1574年',
    icon: 'fas fa-star-and-crescent',
    description: '征服者穆罕默德将圣索菲亚改为清真寺，苏莱曼时代达到巅峰',
    background: '奥斯曼帝国需要彰显伊斯兰正统地位',
    impact: '形成独特的奥斯曼建筑风格，保留拜占庭遗产',
    // mainVideo: '/videos/ottoman-conversion.mp4',
    // videoCaption: '建筑改造工程纪实',
    keyEvents: [
      '加建木制尖塔',
      '覆盖基督教马赛克',
      '增建伊斯兰书法圆盘',
      '扩建皇家陵园区'
    ],
    keyFigures: [
      { name: '穆罕默德二世', role: '征服者', image: '/images/constantinople/mehmed-II.jpg' },
      { name: '米马尔·希南', role: '首席建筑师', image: '/images/constantinople/mimar-sinan.jpg' }
    ],
    artifacts: [
      { name: '征服者书法铭文', image: '/images/constantinople/conquest-inscription.jpg' },
      { name: '礼拜龛朝向标记', image: '/images/constantinople/mihrab.jpg' }
    ],
    locations: ['苏丹楼座', '洗礼堂改建图书馆', '新增宣礼塔'],
    images: {
      main: '/images/constantinople/ottoman-mosque.jpg'
    },
    timeRange: {
      display: '15-16世纪'
    },
    city: 'constantinople'
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
