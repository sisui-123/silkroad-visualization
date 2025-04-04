<template>
  <div>
    <Maps :cities="currentEra.cities" @city-click="onCityClick" />
    <TimelineSlider 
      :eras="historicalEras" 
      @era-change="updateMapForEra" 
    />
  </div>
</template>

<script>
import TimelineSlider from "./TimelineSlider.vue";
import Maps from "./HistoricalMaps.vue";

export default {
  name: "InteractiveMap",
  components: {
    TimelineSlider,
    Maps
  },
  data() {
    return {
      currentEra: {},
      historicalEras: [
        {
          name: "城市中心的迁移",
          period: "汉代至今",
          description: "西安城市中心的演变历程",
          routes: [
            [34.3416, 108.9375], // 现代西安
            [34.3167, 108.9333], // 唐长安
            [34.3667, 108.9167]  // 汉长安
          ],
          cities: [
            {
              position: [34.3416, 108.9375],
              name: "现代西安",
              description: "现代西安的中心逐渐向南迁移，以钟楼为中心，向四周扩展。如今，西安的建成区面积已扩大到369平方公里。",
              image: "/src/assets/modern_xian.jpg"
            },
            {
              position: [34.3167, 108.9333],
              name: "唐长安",
              description: "隋文帝放弃旧都，命宇文恺在汉长安城东南面建造新都大兴城。唐代改大兴城为长安城，并多次增修，使其成为当时世界上最大的城市。",
              image: "/src/assets/tang_changan.jpg"
            },
            {
              position: [34.3667, 108.9167],
              name: "汉长安",
              description: "汉长安城位于西安城区西北方向，龙首原北麓。汉长安城是当时世界上最大的都市，其规模和布局对后世影响深远。",
              image: "/src/assets/han_changan.jpg"
            }
          ]
        },
        {
          name: "城市范围的扩大",
          period: "古代至今",
          description: "西安城市范围的扩展历程",
          routes: [
            [34.3416, 108.9375], // 现代西安
            [34.3167, 108.9333], // 唐长安
            [34.3667, 108.9167]  // 汉长安
          ],
          cities: [
            {
              position: [34.3416, 108.9375],
              name: "现代西安",
              description: "现代西安的城市范围显著扩大，从20世纪50年代的14平方公里扩大到如今的369平方公里。城市向四周扩展，形成了多个新区。",
              image: "/src/assets/modern_xian.jpg"
            },
            {
              position: [34.3167, 108.9333],
              name: "唐长安",
              description: "唐长安城规模宏大，面积达84平方公里，是当时世界上最大的城市之一。",
              image: "/src/assets/tang_changan.jpg"
            },
            {
              position: [34.3667, 108.9167],
              name: "汉长安",
              description: "汉长安城面积为36平方公里，是当时世界上最大的都市之一。",
              image: "/src/assets/han_changan.jpg"
            }
          ]
        },
        {
          name: "交通网络的变化",
          period: "古代至今",
          description: "西安交通网络的演变",
          routes: [
            [34.3416, 108.9375], // 西安
            [36.0611, 103.8343], // 兰州
            [40.1411, 94.6619]  // 敦煌
          ],
          cities: [
            {
              position: [34.3416, 108.9375],
              name: "现代西安",
              description: "现代西安的交通网络更加发达，拥有铁路、公路、航空等多种交通方式。西安咸阳国际机场成为重要的航空枢纽，同时，西安也是中国西部重要的铁路交通枢纽。",
              image: "/src/assets/modern_xian.jpg"
            },
            {
              position: [34.3416, 108.9375],
              name: "古代西安",
              description: "丝绸之路的起点位于西安，主要通过河西走廊通往西域。古代西安的交通主要依赖陆路，尤其是丝绸之路。",
              image: "/src/assets/ancient_xian.jpg"
            }
          ]
        },
        {
          name: "行政区域的调整",
          period: "古代至今",
          description: "西安行政区域的变迁",
          routes: [
            [34.3416, 108.9375] // 西安
          ],
          cities: [
            {
              position: [34.3416, 108.9375],
              name: "现代西安",
              description: "现代西安的行政区划也经过多次调整。1954年，西安改为省辖市。如今，西安下辖10区3县。",
              image: "/src/assets/modern_xian.jpg"
            },
            {
              position: [34.3416, 108.9375],
              name: "古代西安",
              description: "西安的行政区域多次调整。西周时期称镐京，秦代属内史，西汉时成为司隶部京兆尹，唐代为京畿道京兆府。",
              image: "/src/assets/ancient_xian.jpg"
            }
          ]
        },
        {
          name: "城市功能的变化",
          period: "古代至今",
          description: "西安城市功能的演变",
          routes: [
            [34.3416, 108.9375] // 西安
          ],
          cities: [
            {
              position: [34.3416, 108.9375],
              name: "现代西安",
              description: "现代西安不仅是政治、经济和文化中心，还成为重要的科技、教育和旅游城市。西安依托自身优势，成为'一带一路'倡议的重要节点城市。",
              image: "/src/assets/modern_xian.jpg"
            },
            {
              position: [34.3416, 108.9375],
              name: "古代西安",
              description: "古代西安是政治、经济和文化中心，丝绸之路的起点使其成为国际贸易的重要节点。",
              image: "/src/assets/ancient_xian.jpg"
            }
          ]
        }
      ]
    };
  },
  methods: {
    updateMapForEra(era) {
      this.currentEra = era; // 更新当前时期
    }
  },
  created() {
    // 初始化默认显示第一个时期
    this.currentEra = this.historicalEras[0];
  }
};
</script>
  
  <style scoped>
  /* 可以添加一些自定义样式 */
  </style>