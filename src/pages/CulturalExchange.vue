<template>
  <div class="cultural-exchange">
    <div class="glass-container">
      <h1 class="title">文化交流</h1>
      
      <div class="dashboard-layout">
        <!-- 左侧图表区域 -->
        <div class="charts-container">
          <!-- 时间轴组件 -->
          <div class="chart-section timeline-section" data-aos="fade-up">
            <h2>文化交流时间线</h2>
            <div class="timeline" ref="timeline">
              <div class="chart-loading">
                <div class="loading-icon"></div>
                <div class="loading-text">正在加载时间线...</div>
              </div>
            </div>
          </div>

          <!-- 图表区域 -->
          <div class="charts-row">
            <!-- 文化关系网络图 -->
            <div class="chart-section network-section" data-aos="fade-up">
              <h2>文化关系网络</h2>
              <div class="network-chart" ref="networkChart"></div>
            </div>

            <!-- 文化影响力分布 -->
            <div class="chart-section influence-section" data-aos="fade-up">
              <h2>文化影响力分布</h2>
              <div class="influence-chart" ref="influenceChart"></div>
            </div>
          </div>
        </div>

        <!-- 右侧文化交流分类内容 -->
        <div class="exchange-content">
          <div class="filters" data-aos="fade-right">
            <input v-model="searchQuery" placeholder="搜索文化交流内容..." class="search-input">
            <div class="category-filters">
              <button 
                v-for="category in categories" 
                :key="category"
                :class="['filter-btn', { active: selectedCategory === category }]"
                @click="selectCategory(category)"
              >
                {{ category }}
              </button>
            </div>
          </div>

          <div class="exchange-grid">
            <div 
              v-for="item in filteredExchangeItems" 
              :key="item.id" 
              class="exchange-card"
            >
              <div class="card-content compact">
                <div class="card-header">
                  <div class="card-image">
                    <img :src="item.image" :alt="item.title">
                  </div>
                  <div class="card-title">
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.description }}</p>
                  </div>
                </div>
                <div class="card-details">
                  <div class="influence">
                    <h4>影响：</h4>
                    <ul>
                      <li v-for="(influence, index) in item.influences" :key="index">
                        {{ influence }}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="stats">
                  <div class="stat-item">
                    <span class="label">传播范围</span>
                    <div class="progress-container">
                      <div class="progress-bar">
                        <div :style="{ width: item.spreadRange + '%' }" class="progress progress-spread"></div>
                      </div>
                      <span class="stat-text">{{ item.spreadText }}</span>
                    </div>
                  </div>
                  <div class="stat-item">
                    <span class="label">影响程度</span>
                    <div class="progress-container">
                      <div class="progress-bar">
                        <div :style="{ width: item.impactLevel + '%' }" class="progress progress-impact"></div>
                      </div>
                      <span class="stat-text">{{ item.impactText }}</span>
                    </div>
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
import { ref, onMounted, computed } from 'vue'
import * as echarts from 'echarts'
import * as d3 from 'd3'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { text } from 'd3'

export default {
  name: 'CulturalExchange',
  setup() {
    const timeline = ref(null)
    const networkChart = ref(null)
    const influenceChart = ref(null)
    const searchQuery = ref('')
    const selectedCategory = ref('全部')

    const categories = ['全部', '宗教', '艺术', '科技', '文学', '生活习俗', '动植物交流']

    const culturalData = {
      timeline: [
        { year: '公元前138年', event: '张骞出使西域，开启丝绸之路文化交流', details: '汉武帝派遣张骞出使西域，开辟了东西方交流的重要通道。' },
        { year: '公元1世纪', event: '佛教传入中国', details: '佛教经丝绸之路传入中国，对中国文化产生深远影响。' },
        { year: '公元7世纪', event: '玄奘西行取经', details: '唐朝高僧玄奘前往印度求取佛经，促进了中印文化交流。' },
        { year: '公元7世纪', event: '景教传入中国', details: '基督教聂斯脱利派（景教）传入中国，在唐朝一度繁荣。' },
        { year: '公元751年', event: '怛罗斯战役后造纸术西传', details: '阿拉伯人从中国战俘中学习造纸技术，随后传播至欧洲。' },
        { year: '公元8世纪', event: '伊斯兰文化东渐', details: '伊斯兰文化通过丝绸之路传入中国，形成了独特的回族文化。' },
        { year: '公元13世纪', event: '马可·波罗东游', details: '威尼斯商人马可·波罗到达中国，后著《马可·波罗游记》介绍东方。' }
      ],
      // 丝绸之路主要城市坐标（简化版，用于地图展示）
      silkroadCities: [
        { name: '长安（西安）', coordinates: [108.943, 34.343], description: '丝绸之路东方起点，唐朝政治文化中心，是连接中国与西域的重要枢纽。这里的文化交流促进了佛教、音乐、艺术等多方面的发展。' },
        { name: '敦煌', coordinates: [94.662, 40.142], description: '河西走廊重镇，是古代丝绸之路的重要枢纽，以莫高窟闻名于世。佛教艺术的交汇处，壁画和雕塑展现了中西文化的融合。' },
        { name: '撒马尔罕', coordinates: [66.975, 39.627], description: '中亚古城，丝绸之路上的重要商业中心，曾是帖木儿帝国的首都。伊斯兰文化与波斯文化的交汇点，在建筑、数学和天文学领域成就卓著。' },
        { name: '巴格达', coordinates: [44.361, 33.312], description: '阿拉伯帝国重要城市，曾是阿拔斯王朝的首都，学术与文化中心。"智慧之家"成为当时世界最大的学术中心之一，阿拉伯数学、天文学、医学发展的中心。' },
        { name: '君士坦丁堡', coordinates: [28.978, 41.008], description: '今伊斯坦布尔，横跨欧亚两大洲，曾是拜占庭帝国和奥斯曼帝国的首都。东西方文明的十字路口，基督教与伊斯兰教文化碰撞交融的地方，建筑艺术的杰出代表。' },
        { name: '威尼斯', coordinates: [12.315, 45.44], description: '欧洲通往东方的贸易门户，海上丝绸之路西端的重要港口。意大利商人马可·波罗从这里出发前往中国，后来记述的《马可·波罗游记》让欧洲了解到了东方文明。' },
        { name: '喀什', coordinates: [75.989, 39.467], description: '新疆重镇，丝绸之路北道和中道的交汇处，是中国进入中亚的门户。多民族文化交汇地，伊斯兰文化、维吾尔文化与汉文化交融的典范。' },
        { name: '布哈拉', coordinates: [64.421, 39.767], description: '乌兹别克斯坦古城，伊斯兰教学术中心，丝绸之路上的"圣城"。伊斯兰学术与艺术中心，众多哲学家、数学家、医学家和诗人的故乡。' },
        { name: '梅尔夫', coordinates: [62.178, 37.663], description: '古代土库曼斯坦重要城市，曾是丝绸之路上最大的绿洲城市之一。波斯文化与中亚文化的融合地，曾是重要的学术中心和伊斯兰图书馆所在地。' },
        { name: '杭州', coordinates: [120.155, 30.274], description: '宋朝时期的首都，海上丝绸之路的重要港口城市。宋代文化艺术中心，诗词、绘画、印刷、园林艺术的繁荣之地。' },
        { name: '泉州', coordinates: [118.675, 24.874], description: '中国古代最重要的国际贸易港口之一，海上丝绸之路的起点。多元宗教文化共存，佛教、伊斯兰教、基督教、摩尼教等在此传播交流。' },
        { name: '广州', coordinates: [113.264, 23.129], description: '中国南方最大的港口城市，海上丝绸之路的重要枢纽。中外商贸文化交流中心，阿拉伯和波斯商人聚居地，伊斯兰文化传入重要窗口。' }
      ],
      exchangeItems: [
        {
          id: 1,
          category: '宗教',
          title: '佛教东传',
          image: '/images/buddhism.jpg',
          description: '佛教经丝绸之路传入中国，对哲学、艺术、文学、社会生活产生深远影响。',
          influences: [
            '丰富中国哲学思想体系（禅宗）',
            '促进雕塑、绘画、石窟艺术发展',
            '影响文学创作与建筑样式',
            '改变部分生活习俗与节日'
          ],
          spreadRange: 90,
          impactLevel: 92,
          spreadText: '广泛，影响东亚大部分地区',
          impactText: '极为深远'
        },
        {
          id: 2,
          category: '宗教',
          title: '伊斯兰文化',
          image: '/images/islam.jpg',
          description: '伊斯兰文化通过丝绸之路传入中国，带来新的宗教信仰、科学知识和艺术风格。',
          influences: [
            '引入伊斯兰教信仰',
            '促进天文学、数学、医学交流',
            '带来独特建筑风格（清真寺）',
            '丰富饮食与工艺文化'
          ],
          spreadRange: 65,
          impactLevel: 78,
          spreadText: '主要影响西域及中国内陆部分穆斯林聚居区',
          impactText: '影响深远，尤其在特定区域和领域'
        },
        {
          id: 3,
          category: '艺术',
          title: '音乐艺术',
          image: '/images/music.jpg',
          description: '丝绸之路促进东西方音乐舞蹈艺术交流，西域和中亚的乐器、乐曲和舞蹈丰富了中国音乐艺术。',
          influences: [
            '引入新乐器（琵琶、唢呐、箜篌）',
            '传入新乐理和乐曲（龟兹乐、高昌乐）',
            '带来新舞蹈形式（胡旋舞、胡腾舞）',
            '促进中外艺术风格融合'
          ],
          spreadRange: 70,
          impactLevel: 68,
          spreadText: '影响广泛，尤其在上层社会和都市文化中',
          impactText: '显著，丰富了艺术形式'
        },
        {
          id: 4,
          category: '科技',
          title: '造纸术传播',
          image: '/images/papermaking.jpg',
          description: '中国造纸术通过丝绸之路向西传播，最终传遍世界，推动人类文明进程。',
          influences: [
            '促进知识记录、保存和传播',
            '降低文化传播成本，推动教育发展',
            '为欧洲文艺复兴提供物质基础',
            '推动印刷术发展和应用'
          ],
          spreadRange: 95,
          impactLevel: 89,
          spreadText: '全球范围',
          impactText: '极其深远，革命性影响'
        },
        {
          id: 5,
          category: '生活习俗',
          title: '丝绸与纺织技术',
          image: '/images/silk.jpg',
          description: '中国丝绸生产技术西传，对西方世界经济和服饰文化产生重要影响。',
          influences: [
            '成为罗马贵族身份象征',
            '促进拜占庭本土丝绸业发展',
            '影响沿线地区纺织图案与技术',
            '推动经济和服饰文化发展'
          ],
          spreadRange: 85,
          impactLevel: 81,
          spreadText: '广泛，欧亚大陆',
          impactText: '非常高，经济文化双重影响'
        },
        {
          id: 6,
          category: '宗教',
          title: '景教与摩尼教',
          image: '/images/nestorianism.jpg',
          description: '西亚的景教和摩尼教沿丝绸之路传入中国，短暂繁荣。',
          influences: [
            '留下宗教遗迹（大秦景教流行中国碑）',
            '经文翻译与本土文化融合',
            '丰富唐朝多元文化景象',
            '促进东西方宗教思想交流'
          ],
          spreadRange: 40,
          impactLevel: 42,
          spreadText: '传入中国，有一定信众，但未成为主流',
          impactText: '有限，但具有文化多样性意义'
        },
        {
          id: 7,
          category: '动植物交流',
          title: '植物物种交流',
          image: '/images/plants.jpg',
          description: '丝绸之路促进农作物互传，如西域葡萄、苜蓿东传，中国桃、杏西传。',
          influences: [
            '丰富各地农业物种多样性',
            '改变饮食结构和烹饪方式',
            '促进农业技术交流创新',
            '增加药用植物种类'
          ],
          spreadRange: 75,
          impactLevel: 76,
          spreadText: '欧亚大陆',
          impactText: '重要，对农业和生活影响实在'
        }
      ]
    }

    const filteredExchangeItems = computed(() => {
      return culturalData.exchangeItems.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesCategory = selectedCategory.value === '全部' || item.category === selectedCategory.value
        return matchesSearch && matchesCategory
      })
    })

    const initTimeline = () => {
      const chart = echarts.init(timeline.value)
      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: params => {
            const timelineItem = culturalData.timeline.find(item => item.year === params[0].name)
            return `<div style="padding: 12px; max-width: 300px;">
                    <div style="font-weight: bold; margin-bottom: 10px; color: #2c3e50; font-size: 14px; border-bottom: 1px solid rgba(0,0,0,0.1); padding-bottom: 6px;">${timelineItem.year}</div>
                    <div style="margin-bottom: 8px; color: #333; font-weight: 500; line-height: 1.6;">${timelineItem.event}</div>
                    <div style="font-size: 13px; color: #666; line-height: 1.5;">${timelineItem.details || ''}</div>
                  </div>`
          },
          position: function(point, params, dom, rect, size) {
            return [Math.max(point[0] - size.contentSize[0] / 2, 0), 
                    Math.max(point[1] - size.contentSize[1] - 10, 5)];
          },
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderColor: 'rgba(255, 255, 255, 0.25)',
          borderWidth: 1,
          textStyle: {
            color: '#2c3e50'
          },
          extraCssText: 'backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-radius: 10px; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12); word-wrap: break-word; white-space: normal; max-width: 300px;'
        },
        grid: {
          top: 40,
          bottom: 60,
          left: 50,
          right: 50
        },
        xAxis: {
          type: 'category',
          data: culturalData.timeline.map(item => item.year),
          axisLabel: {
            rotate: 45,
            fontSize: 11,
            color: '#2c3e50',
            fontWeight: 'bold',
            margin: 14,
            align: 'center',
            verticalAlign: 'middle'
          },
          axisLine: {
            lineStyle: {
              color: '#aaa',
              width: 2
            }
          },
          axisTick: {
            alignWithLabel: true,
            lineStyle: {
              color: '#aaa'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(204, 204, 204, 0.2)',
              type: 'dashed'
            }
          }
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [{
          type: 'line',
          data: culturalData.timeline.map(item => item.event),
          symbolSize: 15,
          symbol: 'emptyCircle',
          symbolOffset: [0, 0],
          itemStyle: {
            color: '#1890ff',
            borderWidth: 2,
            borderColor: '#fff',
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowBlur: 5
          },
          lineStyle: {
            width: 3,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#6fa8dc' },
              { offset: 1, color: '#1890ff' }
            ]),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          },
          label: {
            show: true,
            position: function(params) {
              // 交替显示在上方和下方，避免标签重叠
              return params.dataIndex % 2 === 0 ? 'top' : 'bottom';
            },
            fontSize: 11,
            color: '#2c3e50',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            padding: [4, 8],
            borderRadius: 4,
            distance: 8,
            formatter: function(params) {
              return params.value.length > 12 ? params.value.substring(0, 12) + '...' : params.value;
            }
          },
          emphasis: {
            itemStyle: {
              color: '#ff7875',
              borderWidth: 3,
              borderColor: '#fff',
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            },
            label: {
              color: '#ff7875',
              fontWeight: 'bold',
              backgroundColor: 'rgba(255, 255, 255, 0.9)'
            }
          },
          smooth: true,
          animation: true,
          animationDuration: 1500,
          animationEasing: 'elasticOut'
        }]
      }
      chart.setOption(option)
      
      // Add timeline-loaded class after chart is initialized
      setTimeout(() => {
        timeline.value.classList.add('timeline-loaded');
        
        // 默认高亮重要的事件
        chart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: 1 // 佛教传入中国的索引
        });
        
        // 显示提示框
        chart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: 1
        });
      }, 300);
      
      // 添加点击事件
      chart.on('click', (params) => {
        const timelineItem = culturalData.timeline.find(item => item.year === params.name)
        if (timelineItem) {
          // 高亮显示被点击的事件
          chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: params.dataIndex
          });
          
          // 根据事件内容可能筛选相关的文化交流项
          const relevantCategory = getRelevantCategory(timelineItem.event);
          if (relevantCategory) {
            selectCategory(relevantCategory);
          }
          
          console.log('Timeline item clicked:', timelineItem)
        }
      })
    }
    
    // 根据时间线事件内容判断相关类别
    const getRelevantCategory = (eventText) => {
      const lowerEvent = eventText.toLowerCase();
      if (lowerEvent.includes('佛教') || lowerEvent.includes('景教') || lowerEvent.includes('伊斯兰')) {
        return '宗教';
      } else if (lowerEvent.includes('音乐') || lowerEvent.includes('艺术')) {
        return '艺术';
      } else if (lowerEvent.includes('造纸') || lowerEvent.includes('科技')) {
        return '科技';
      } else if (lowerEvent.includes('文学')) {
        return '文学';
      } else if (lowerEvent.includes('丝绸') || lowerEvent.includes('习俗')) {
        return '生活习俗';
      } else if (lowerEvent.includes('植物') || lowerEvent.includes('动物')) {
        return '动植物交流';
      }
      return null;
    }

    const initNetworkChart = () => {
      // 使用echarts创建交互式地图替代网络图
      const chart = echarts.init(networkChart.value)
      
      // 设置默认交互参数
      const defaultZoom = 5;
      const defaultCenter = [80, 35];
      
      // 确保地图容器获得焦点时的交互性
      networkChart.value.addEventListener('mouseenter', () => {
        networkChart.value.style.cursor = 'grab';
      });
      
      networkChart.value.addEventListener('mousedown', () => {
        networkChart.value.style.cursor = 'grabbing';
      });
      
      networkChart.value.addEventListener('mouseup', () => {
        networkChart.value.style.cursor = 'grab';
      });
      
      networkChart.value.addEventListener('mouseleave', () => {
        networkChart.value.style.cursor = 'default';
      });
      
      // 定义丝绸之路路线
      const silkRoadRoutes = [
        // 主要陆路路线
        {
          coords: [
            [108.943, 34.343],   // 长安（西安）
            [94.662, 40.142],    // 敦煌
            [75.989, 39.467],    // 喀什
            [66.975, 39.627],    // 撒马尔罕
            [64.421, 39.767],    // 布哈拉
            [62.178, 37.663],    // 梅尔夫
            [44.361, 33.312],    // 巴格达
            [28.978, 41.008]     // 君士坦丁堡
          ],
          name: '陆上丝绸之路北线',
          color: '#ff6b5e',
          description: '经由甘肃走廊、塔里木盆地北缘、天山南北通往中亚的主要贸易线路，佛教、粟特文化沿此传入中国。'
        },
        // 陆上丝绸之路南线
        {
          coords: [
            [108.943, 34.343],   // 长安（西安）
            [94.662, 40.142],    // 敦煌
            [75.989, 39.467],    // 喀什
            [66.975, 39.627],    // 撒马尔罕
            [62.178, 37.663],    // 梅尔夫
            [54.5, 32.6],        // 伊斯法罕
            [44.361, 33.312],    // 巴格达
            [36.2, 33.5],        // 大马士革
            [28.978, 41.008]     // 君士坦丁堡
          ],
          name: '陆上丝绸之路南线',
          color: '#ffa16d',
          description: '经由中亚南部、波斯高原通往西亚的重要交通线，伊斯兰文化、波斯文化沿此传入中国，中国丝绸、茶叶沿此西传。'
        },
        // 海上丝绸之路 - 东中国海路线
        {
          coords: [
            [108.943, 34.343],   // 长安（西安）
            [120.155, 30.274],   // 杭州
            [118.675, 24.874],   // 泉州
            [113.264, 23.129],   // 广州
            [103.82, 1.35],      // 新加坡
            [100.5, 13.8],       // 曼谷
            [96.15, 16.8]        // 仰光
          ],
          name: '海上丝绸之路东段',
          color: '#5ab8db',
          description: '连接中国沿海与东南亚地区的海上航线，促进了中国与南洋地区的贸易往来与文化交流，宋元明时期尤为繁荣。'
        },
        // 海上丝绸之路 - 印度洋路线
        {
          coords: [
            [96.15, 16.8],       // 仰光
            [80.28, 13.09],      // 金奈
            [75.78, 11.26],      // 卡利卡特
            [79.86, 6.93],       // 科伦坡
            [55.3, 25.28],       // 迪拜
            [45.02, 12.82],      // 亚丁
            [44.361, 33.312]     // 巴格达
          ],
          name: '海上丝绸之路中段',
          color: '#3f9cff',
          description: '连接东南亚、南亚与西亚的海上贸易航线，香料、宝石、象牙等珍稀商品沿此贸易，郑和下西洋曾多次航行于此。'
        },
        // 海上丝绸之路 - 地中海路线
        {
          coords: [
            [44.361, 33.312],    // 巴格达
            [31.2, 30.05],       // 开罗
            [28.978, 41.008],    // 君士坦丁堡
            [12.315, 45.44]      // 威尼斯
          ],
          name: '海上丝绸之路西段',
          color: '#1876d4',
          description: '连接西亚、北非与欧洲的海上航线，阿拉伯商人在此扮演重要的中介角色，文艺复兴时期威尼斯等城市因此繁荣。'
        }
      ]
      
      // 定义文化交流集中区域
      const culturalExchangeRegions = [
        { 
          name: '中亚文化交流区',
          coords: [66.975, 39.627], // 撒马尔罕为中心
          radius: 500,  // 半径，单位：公里
          color: 'rgba(255, 107, 94, 0.15)'
        },
        { 
          name: '中国西北文化交流区',
          coords: [94.662, 40.142], // 敦煌为中心
          radius: 600,
          color: 'rgba(255, 161, 109, 0.15)'
        },
        { 
          name: '中国东部文化交流区',
          coords: [112.0, 32.0], // 中国东部
          radius: 700,
          color: 'rgba(90, 184, 219, 0.15)'
        },
        { 
          name: '西亚文化交流区',
          coords: [44.361, 33.312], // 巴格达为中心
          radius: 650,
          color: 'rgba(63, 156, 255, 0.15)'
        },
        { 
          name: '地中海文化交流区',
          coords: [28.978, 41.008], // 君士坦丁堡为中心
          radius: 600,
          color: 'rgba(24, 118, 212, 0.15)'
        }
      ]
      
      const option = {
        backgroundColor: 'rgba(255, 255, 255, 0.0)',
        title: {
          text: '丝绸之路文化交流网络',
          left: 'center',
          top: 5,
          textStyle: {
            color: '#2c3e50',
            fontSize: 12,
            fontWeight: 'normal'
          },
          subtextStyle: {
            fontSize: 10
          }
        },
        legend: {
          orient: 'horizontal',
          bottom: 10,
          left: 'center',
          data: silkRoadRoutes.map(route => route.name),
          textStyle: {
            color: '#333',
            fontSize: 10
          },
          itemWidth: 15,
          itemHeight: 10,
          selectedMode: false,
          formatter: function(name) {
            return name;
          },
          icon: 'rect',
          itemStyle: {
            color: function(params) {
              const route = silkRoadRoutes.find(r => r.name === params.name);
              return route ? route.color : '#333';
            }
          }
        },
        tooltip: {
          trigger: 'item',
          position: ['right', 'top'],
          confine: true,
          formatter: params => {
            if (params.seriesType === 'effectScatter') {
              const city = culturalData.silkroadCities.find(city => city.name === params.name)
              return `<div style="padding: 18px; max-width: 280px;">
                      <div style="font-weight: bold; margin-bottom: 12px; color: #2c3e50; font-size: 16px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 8px;">${city.name}</div>
                      <div style="line-height: 1.6; color: #333; font-size: 14px; word-wrap: break-word; white-space: normal;">${city.description}</div>
                    </div>`
            } else if (params.seriesType === 'lines') {
              // 路线的提示信息
              const route = silkRoadRoutes.find(route => route.name === params.seriesName)
              return `<div style="padding: 18px; max-width: 280px;">
                      <div style="font-weight: bold; margin-bottom: 12px; color: #2c3e50; font-size: 16px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 8px;">${params.seriesName}</div>
                      <div style="line-height: 1.6; color: #333; font-size: 14px; word-wrap: break-word; white-space: normal;">${route ? route.description : '丝绸之路重要交通路线，促进了沿线地区的文化交流与商贸往来。'}</div>
                    </div>`
            } else {
              return params.name
            }
          },
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          textStyle: {
            color: '#333'
          },
          extraCssText: 'backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px); border-radius: 16px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18); max-width: 280px; word-wrap: break-word; white-space: normal; border: 1px solid rgba(255, 255, 255, 0.3);'
        },
        geo: {
          map: 'world',
          roam: true, // 允许缩放和平移
          zoom: 2.2,
          center: [80, 35], // 居中显示亚欧大陆
          label: {
            show: false
          },
          silent: false,
          itemStyle: {
            areaColor: '#e9eaef',
            borderColor: '#ccc',
            borderWidth: 0.5
          },
          emphasis: {
            itemStyle: {
              areaColor: '#d9d9d9'
            },
            label: {
              show: false
            }
          },
          selectedMode: false
        },
        // 添加地图控制器
        visualMap: {
          show: false,
          min: 0,
          max: 100
        },
        series: [
          // 国家边界线
          {
            name: '国家边界',
            type: 'map',
            map: 'world',
            geoIndex: 0,
            aspectScale: 0.75,
            itemStyle: {
              areaColor: '#f4f5f6',
              borderColor: '#b4b7be',
              borderWidth: 0.5
            },
            emphasis: {
              itemStyle: {
                areaColor: '#d9d9d9',
                borderWidth: 0.6
              }
            },
            zlevel: 1
          },
          // 文化交流区域（放在最底层）
          ...culturalExchangeRegions.map(region => ({
            name: region.name,
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 1,
            rippleEffect: {
              brushType: 'stroke',
              scale: 8,
              period: 4
            },
            data: [{
              name: region.name,
              value: region.coords,
              visualMap: false
            }],
            symbolSize: region.radius / 15,
            itemStyle: {
              color: region.color,
              shadowColor: region.color,
              shadowBlur: 10
            },
            hoverAnimation: false,
            label: {
              show: false
            }
          })),
          // 丝绸之路路线
          ...silkRoadRoutes.map(route => ({
            name: route.name,
            type: 'lines',
            coordinateSystem: 'geo',
            zlevel: 3,
            progressive: 400,
            progressiveThreshold: 500,
            data: [{
              coords: route.coords,
              lineStyle: {
                color: route.color
              }
            }],
            polyline: true,
            lineStyle: {
              width: 4,
              opacity: 0.6,
              curveness: 0.2,
              cap: 'round',
              join: 'round',
              color: route.color,
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 5,
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            effect: {
              show: true,
              period: 6,
              trailLength: 0.7,
              symbol: 'circle',
              symbolSize: 5,
              color: '#fff'
            }
          })),
          // 城市标记
          {
            name: '重要城市',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 4,
            data: culturalData.silkroadCities.map(city => ({
              name: city.name,
              value: city.coordinates
            })),
            symbolSize: 10,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke',
              scale: 3,
              period: 4
            },
            hoverAnimation: true,
            itemStyle: {
              color: '#ffc069',
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            },
            emphasis: {
              scale: true,
              scaleSize: 14,
              itemStyle: {
                color: '#ff6b5e',
                borderColor: '#fff',
                borderWidth: 2
              }
            }
          },
          // 城市名称标签
          {
            name: '城市名称',
            type: 'scatter',
            coordinateSystem: 'geo',
            zlevel: 5,
            data: culturalData.silkroadCities.map(city => ({
              name: city.name,
              value: city.coordinates
            })),
            symbolSize: 1,
            itemStyle: {
              color: 'transparent'
            },
            label: {
              show: true,
              position: 'right',
              formatter: '{b}',
              fontSize: 10,
              color: '#333',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              padding: [3, 5],
              borderRadius: 3,
              distance: 5
            },
            emphasis: {
              label: {
                show: true,
                color: '#333',
                fontWeight: 'bold',
                backgroundColor: 'rgba(255, 255, 255, 0.8)'
              }
            }
          }
        ]
      }
      
      // 确保地图能够响应窗口大小变化
      const resizeHandler = () => {
        if (chart && !chart.isDisposed()) {
          chart.resize();
        }
      };
      
      window.addEventListener('resize', resizeHandler);
      
      // 加载世界地图数据
      fetch('/data/map.json')
        .then(response => response.json())
        .then(worldJson => {
          echarts.registerMap('world', worldJson)
          chart.setOption(option)
          
          // 延长加载世界地图后的延迟，确保地图正确加载
          setTimeout(() => {
            chart.dispatchAction({
              type: 'restore'
            });
            
            // 重新设置视图，确保地图初始定位正确
            setTimeout(() => {
              chart.setOption({
                geo: {
                  zoom: defaultZoom,
                  center: defaultCenter
                }
              });
            }, 500);
          }, 300);
          
          // 添加双击缩放监听器
          chart.getZr().on('dblclick', function() {
            chart.dispatchAction({
              type: 'restore'
            });
            setTimeout(() => {
              chart.dispatchAction({
                type: 'geoRoam',
                zoom: defaultZoom,
                center: defaultCenter
              });
            }, 100);
          });

          // 处理鼠标滚轮缩放
          chart.getZr().on('mousewheel', function(e) {
            // 这个事件会自动被 ECharts 处理
            // 只需确保 roam 设置为 true
            e.event.preventDefault(); // 防止页面同时滚动
          });
        })
        .catch(error => {
          console.error('加载地图数据失败:', error)
          // 如果加载失败，回退到简单的网络图
          initFallbackNetworkChart()
        })
        
      // 添加点击事件
      chart.on('click', params => {
        if (params.seriesType === 'effectScatter') {
          const city = culturalData.silkroadCities.find(city => city.name === params.name)
          if (city) {
            console.log('City clicked:', city)
            // 可以在这里添加更多交互，比如显示详细信息面板等
          }
        }
      })
    }
    
    
    const initInfluenceChart = () => {
      const chart = echarts.init(influenceChart.value)
      const option = {
        backgroundColor: 'transparent',
        title: {
          text: '基于对中国文化影响的深度和广度',
          left: 'center',
          top: 0,
          textStyle: {
            fontSize: 16,
            fontWeight: 'normal',
            color: '#2c3e50'
          },
          subtextStyle: {
            fontSize: 12,
            color: '#666'
          }
        },
        tooltip: {
          trigger: 'item',
          position: ['right', 'top'],
          confine: true,
          formatter: (params) => {
            const item = culturalData.exchangeItems.find(item => item.title === params.name);
            return `<div style="padding: 18px; max-width: 280px;">
                    <div style="font-weight: bold; margin-bottom: 12px; color: #2c3e50; font-size: 16px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 8px;">${params.name}</div>
                    <div style="margin-bottom: 10px; color: #333; line-height: 1.6; font-size: 14px; word-wrap: break-word; white-space: normal;">${item.description}</div>
                    <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 500; margin-top: 8px;">
                      <div style="color: #5ab8db;">传播范围: ${item.spreadRange}%</div>
                      <div style="color: #ff6b5e;">影响程度: ${params.value}%</div>
                    </div>
                  </div>`;
          },
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderColor: 'rgba(255, 255, 255, 0.4)',
          borderWidth: 1,
          textStyle: {
            color: '#333'
          },
          extraCssText: 'backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px); border-radius: 16px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18); max-width: 280px; word-wrap: break-word; white-space: normal; border: 1px solid rgba(255, 255, 255, 0.3);'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 'center',
          itemWidth: 12,
          itemHeight: 12,
          itemGap: 12,
          textStyle: {
            fontSize: 12,
            color: '#2c3e50',
            rich: {
              name: {
                width: 100,
                fontSize: 12
              },
              value: {
                color: '#ff6b5e',
                fontWeight: 'bold',
                fontSize: 12,
                align: 'right'
              }
            }
          },
          formatter: (name) => {
            const item = culturalData.exchangeItems.find(item => item.title === name);
            return `{name|${name}}{value|${item.impactLevel}%}`;
          },
          icon: 'circle',
          itemStyle: {
            borderColor: 'rgba(255, 255, 255, 0.5)'
          },
          pageTextStyle: {
            color: '#666'
          },
          pageIconColor: '#666',
          pageIconInactiveColor: '#ccc',
          selectedMode: false
        },
        grid: {
          left: '5%',
          right: '30%', // 为右侧图例留出更多空间
          top: '15%', 
          bottom: '5%',
          containLabel: true
        },
        series: [{
          name: '文化影响力',
          type: 'pie',
          radius: ['25%', '55%'],
          center: ['30%', '55%'], 
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 6,
            borderColor: 'rgba(255, 255, 255, 0.4)',
            borderWidth: 2
          },
          data: culturalData.exchangeItems.map(item => ({
            name: item.title,
            value: item.impactLevel,
            spreadRange: item.spreadRange,
            itemStyle: {
              color: item.category === '宗教' ? '#ff6b5e' : 
                     item.category === '艺术' ? '#5ab8db' : 
                     item.category === '科技' ? '#72c07b' :
                     item.category === '生活习俗' ? '#ffc069' :
                     item.category === '动植物交流' ? '#b37feb' : '#95de64'
            }
          })),
          label: {
            show: false
          },
          emphasis: {
            focus: 'series',
            scale: true,
            scaleSize: 10,
            itemStyle: {
              shadowBlur: 20,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold',
              formatter: '{b}\n{c}%',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: 8,
              padding: [6, 10],
              color: '#333',
              backdropBlur: 10
            }
          },
          labelLine: {
            length: 30,
            length2: 0,
            maxSurfaceAngle: 80
          },
          roseType: 'radius',
          animationType: 'expansion',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 300 + 100;
          },
          animationDuration: 1500
        }]
      }
      chart.setOption(option)
      
      // 添加点击事件
      chart.on('click', (params) => {
        const item = culturalData.exchangeItems.find(item => item.title === params.name)
        if (item) {
          // 高亮显示对应的卡片
          console.log('Influence chart item clicked:', item)
          // 自动筛选到对应分类
          selectCategory(item.category)
          
          // 显示额外效果
          chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            name: params.name
          });
          
          // 3秒后恢复
          setTimeout(() => {
            chart.dispatchAction({
              type: 'downplay',
              seriesIndex: 0
            });
          }, 3000);
        }
      })
    }

    const selectCategory = (category) => {
      selectedCategory.value = category
    }

    onMounted(() => {
      AOS.init({
        duration: 800,
        once: true,
        offset: 20,
        delay: 100
      })
      initTimeline()
      initNetworkChart()
      initInfluenceChart()

      // 添加事件监听
      if (timeline.value) {
        timeline.value.addEventListener('mouseover', handleChartMouseover);
      }

      const handleResize = () => {
        const timelineChart = echarts.getInstanceByDom(timeline.value)
        const networkChartInstance = echarts.getInstanceByDom(networkChart.value)
        const influenceChartInstance = echarts.getInstanceByDom(influenceChart.value)
        timelineChart?.resize()
        networkChartInstance?.resize()
        influenceChartInstance?.resize()
      }
      
      window.addEventListener('resize', handleResize)
      
      // 清理函数
      return () => {
        window.removeEventListener('resize', handleResize)
        if (timeline.value) {
          timeline.value.removeEventListener('mouseover', handleChartMouseover);
        }
        const timelineChart = echarts.getInstanceByDom(timeline.value)
        const networkChartInstance = echarts.getInstanceByDom(networkChart.value)
        const influenceChartInstance = echarts.getInstanceByDom(influenceChart.value)
        timelineChart?.dispose()
        networkChartInstance?.dispose()
        influenceChartInstance?.dispose()
      }
    })

    // 监听timeline图表的mouseover事件，确保标签可见性
    const handleChartMouseover = () => {
      const timelineChart = echarts.getInstanceByDom(timeline.value);
      if (timelineChart) {
        timelineChart.setOption({
          series: [{
            label: {
              show: true
            }
          }]
        });
      }
    };

    return {
      searchQuery,
      selectedCategory,
      categories,
      filteredExchangeItems,
      timeline,
      networkChart,
      influenceChart,
      selectCategory
    }
  }
}
</script>

<style scoped>
.cultural-exchange {
  height: 100vh;
  padding: 1rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  overflow: hidden;
  position: relative;
}

.cultural-exchange::before {
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
  height: 80px;
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
  gap: 1.25rem;
  height: calc(100% - 2.5rem);
  overflow: hidden;
  margin-top: 0.5rem;
}

.charts-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  overflow: hidden;
}

.charts-row {
  display: flex;
  gap: 1.25rem;
  flex: 1;
}

.chart-section {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.25);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.chart-section:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.chart-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent);
  z-index: 0;
  border-radius: 15px 15px 0 0;
}

.timeline-section {
  height: 240px;
  position: relative;
  min-height: 240px;
  overflow: visible;
}

.timeline-section::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  background-image: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.3;
  z-index: 0;
  pointer-events: none;
}

.timeline {
  flex: 1;
  width: 100%;
  position: relative;
  z-index: 1;
  height: calc(100% - 2rem);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  overflow: visible;
  padding-bottom: 20px;
  margin-bottom: 10px;
}

.timeline::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(24, 144, 255, 0.2), transparent);
  z-index: 0;
  opacity: 0;
  animation: timeline-glow 2s ease-in-out 0.5s forwards;
}

@keyframes timeline-glow {
  0% {
    opacity: 0;
    transform: scaleX(0.3);
  }
  50% {
    opacity: 1;
    transform: scaleX(1);
  }
  100% {
    opacity: 0.3;
    transform: scaleX(1);
  }
}

.network-section,
.influence-section {
  flex: 1;
  height: calc(100% - 1rem);
}

.network-section {
  min-height: 350px;
  position: relative;
}

.network-chart {
  min-height: 300px;
  height: 100%;
  width: 100%;
  position: relative;
  touch-action: none;
  user-select: none;
  z-index: 1;
}

/* 添加地图交互时的样式 */
.network-chart:active {
  cursor: grabbing !important;
}

.network-chart:hover {
  cursor: grab;
}

.chart-section h2 {
  margin-bottom: 0.75rem;
  color: #2c3e50;
  font-size: 1.1rem;
  text-align: center;
  position: relative;
  z-index: 1;
  font-weight: 600;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.timeline,
.network-chart,
.influence-chart {
  flex: 1;
  width: 100%;
  position: relative;
  z-index: 1;
}

.exchange-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: visible;
  max-width: 40%;
  position: relative;
  min-width: 350px;
}

.filters {
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 2;
}

.search-input {
  width: 100%;
  padding: 0.5rem 0.8rem;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.05);
  color: #2c3e50;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.1);
}

.search-input::placeholder {
  color: rgba(44, 62, 80, 0.6);
}

.category-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.3rem 0.8rem;
  border: none;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.82rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #2c3e50;
}

.filter-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.filter-btn.active {
  background: #2c3e50;
  color: white;
  box-shadow: 0 3px 8px rgba(44, 62, 80, 0.2);
}

.exchange-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow-y: auto;
  height: calc(100vh - 12rem);
  max-height: 100%;
  padding: 0 0.75rem 1rem 0;
  position: relative;
  scroll-behavior: smooth;
}

.exchange-card {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 14px;
  overflow: visible;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
}

.exchange-card:hover {
  transform: translateY(-3px) scale(1.01);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.25);
}

.exchange-card::before {
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

.card-image {
  width: 60px;
  height: 60px;
  overflow: hidden;
  border-radius: 8px;
  flex-shrink: 0;
  position: relative;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.exchange-card:hover .card-image img {
  transform: scale(1.08);
}

.card-content {
  padding: 0.6rem 0.8rem;
  position: relative;
  z-index: 1;
}

.card-content.compact {
  padding: 0.6rem 0.8rem;
}

.card-header {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.6rem;
}

.card-title {
  flex: 1;
}

.card-content h3 {
  color: #2c3e50;
  margin-bottom: 0.3rem;
  font-size: 1rem;
  font-weight: 600;
  position: relative;
}

.card-content p {
  color: rgba(44, 62, 80, 0.85);
  line-height: 1.5;
  margin-bottom: 0.5rem;
  font-size: 0.82rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-details {
  display: flex;
  gap: 0.6rem;
  flex-direction: column;
  position: relative;
  overflow: visible;
}

.influence {
  flex: 1;
  overflow: visible;
}

.influence h4 {
  color: #2c3e50;
  margin-bottom: 0.3rem;
  font-size: 0.88rem;
  font-weight: 600;
}

.influence ul {
  list-style: none;
  padding: 0;
  margin: 0 0 0.3rem 0;
  overflow: visible;
}

.influence li {
  color: rgba(44, 62, 80, 0.8);
  margin-bottom: 0.3rem;
  padding-left: 1rem;
  position: relative;
  font-size: 0.8rem;
  line-height: 1.5;
  white-space: normal;
  overflow: visible;
  display: block;
  max-width: 100%;
  word-wrap: break-word;
}

.influence li::before {
  content: "•";
  position: absolute;
  left: 0;
  top: 0;
  color: #1890ff;
  font-size: 1.2em;
  line-height: 1;
}

.stats {
  flex: 1;
  margin-top: 0.5rem;
  padding-top: 0.4rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.stat-item {
  margin-bottom: 0.5rem;
}

.stat-item .label {
  display: block;
  margin-bottom: 0.3rem;
  color: rgba(44, 62, 80, 0.8);
  font-size: 0.82rem;
  font-weight: 500;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.progress-bar {
  flex: 1;
  height: 5px;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 3px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

.progress {
  height: 100%;
  transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 3px;
}

.progress-spread {
  background: linear-gradient(90deg, #69c0ff 0%, #1890ff 100%);
  box-shadow: 0 0 10px rgba(24, 144, 255, 0.3);
}

.progress-impact {
  background: linear-gradient(90deg, #ff7875 0%, #f5222d 100%);
  box-shadow: 0 0 10px rgba(245, 34, 45, 0.3);
}

.stat-text {
  font-size: 0.78rem;
  color: rgba(44, 62, 80, 0.8);
  white-space: nowrap;
  min-width: 80px;
  font-weight: 500;
}

/* 自定义滚动条样式 */
.exchange-grid::-webkit-scrollbar {
  width: 6px;
}

.exchange-grid::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.03);
  border-radius: 10px;
}

.exchange-grid::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.exchange-grid::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.18);
}

/* 适配更多屏幕尺寸 */
@media (max-width: 1366px) {
  .dashboard-layout {
    gap: 1rem;
  }
  
  .exchange-content {
    max-width: 45%;
  }
  
  .card-content.compact {
    padding: 0.75rem;
  }
  
  .card-details {
    flex-direction: column;
  }
  
  .card-image {
    width: 70px;
    height: 70px;
  }
  
  .influence li {
    font-size: 0.82rem;
    line-height: 1.5;
  }
}

@media (max-width: 1200px) {
  .dashboard-layout {
    flex-direction: column;
  }
  
  .exchange-content {
    max-width: 100%;
  }
  
  .charts-row {
    flex-direction: column;
  }
  
  .charts-container,
  .chart-section {
    min-height: auto;
  }
  
  .network-chart {
    min-height: 250px;
  }
  
  .influence li {
    -webkit-line-clamp: 3;
  }
}

.influence-section {
  flex: 1;
  height: calc(100% - 1rem);
  position: relative;
}

.influence-chart {
  flex: 1;
  width: 100%;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: flex-start; /* Align content to the left */
  overflow: visible !important;
}

.chart-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 5;
  opacity: 1;
  transition: opacity 0.5s ease, visibility 0.5s ease;
  pointer-events: none;
}

.timeline-loaded .chart-loading {
  opacity: 0;
  visibility: hidden;
}

.loading-icon {
  width: 30px;
  height: 30px;
  border: 3px solid rgba(24, 144, 255, 0.2);
  border-radius: 50%;
  border-top-color: #1890ff;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 10px;
}

.loading-text {
  font-size: 12px;
  color: #2c3e50;
  font-weight: 500;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>