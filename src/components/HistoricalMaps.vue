<template>
    <div id="container" class="map-container">
      <button class="silk-button" @click="toggleRoutes">
        {{ showRoutes ? '隐藏路线' : '显示丝绸之路' }}
      </button>
      <button class="spice-button" @click="toggleSpiceRoutes">
        {{ showSpiceRoutes ? '隐藏香料路线' : '显示香料路线' }}
      </button>

    </div>
  </template>
  
  <script setup>
  import { onMounted, onUnmounted, ref } from 'vue'
  import { Scene } from '@antv/l7'
  import { GaodeMap } from '@antv/l7-maps'
  import { LineLayer, PointLayer } from '@antv/l7-layers'
  

  let scene = null
  let lineLayer = null
  let spiceLayer = null
  let cityPointLayer = null
  const showRoutes = ref(false)
  const showSpiceRoutes = ref(false)
  
  // 定义路线数据
  const routeData  = {
    type: 'FeatureCollection',
    features: [
      // 北道（长安-武威）
      {
        type: 'Feature',
        properties: {
          from: '长安',
          to: '武威',
          value: 8,
          type: 'north_route'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [108.9398, 34.3413], // 长安
            [107.6389, 35.7333], // 泾川
            [106.3306, 36.0037], // 固原
            [104.6865, 36.5613], // 靖远
            [102.8998, 37.9282]  // 武威
          ]
        }
      },
      // 中道（长安-武威）
      {
        type: 'Feature',
        properties: {
          from: '长安',
          to: '武威',
          value: 9,
          type: 'middle_route'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [108.9398, 34.3413], // 长安
            [107.6389, 35.7333], // 泾川
            [106.6817, 35.5500], // 平凉
            [105.0547, 35.5807], // 会宁
            [103.8233, 36.0642], // 兰州
            [102.8998, 37.9282]  // 武威
          ]
        }
      },
      // 南道（长安-张掖）
      {
        type: 'Feature',
        properties: {
          from: '长安',
          to: '张掖',
          value: 11,
          type: 'south_route'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [108.9398, 34.3413], // 长安
            [107.4000, 34.5200], // 凤翔
            [105.7249, 34.5809], // 天水
            [104.6404, 35.0037], // 陇西
            [103.2152, 35.5985], // 临夏
            [102.1043, 36.5023], // 乐都
            [101.7679, 36.6407], // 西宁
            [100.4498, 38.9259]  // 张掖
          ]
        }
      },
      // 东段路线（长安-敦煌）
      {
        type: 'Feature',
        properties: {
          from: '长安',
          to: '敦煌',
          value: 10,
          type: 'main_route'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [108.9398, 34.3413], // 长安
            [107.6389, 35.7333], // 泾川
            [106.6817, 35.5500], // 平凉
            [104.1954, 35.5793], // 兰州
            [102.8998, 37.9282], // 武威
            [94.6618, 40.1421]   // 敦煌
          ]
        }
      },
      // 中段路线（敦煌-葱岭）
      {
        type: 'Feature',
        properties: {
          from: '敦煌',
          to: '葱岭',
          value: 12,
          type: 'middle_route'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [94.6618, 40.1421],  // 敦煌
            [92.8932, 40.1421],  // 玉门关
            [89.5934, 40.1421],  // 阳关
            [88.1673, 40.6366],  // 楼兰
            [87.6169, 43.8256],  // 吐鲁番
            [85.3112, 41.7728],  // 库尔勒
            [82.9749, 41.7275],  // 阿克苏
            [81.6784, 37.1144],  // 于阗
            [77.2484, 38.4142],  // 莎车
            [75.9892, 39.4672]   // 葱岭
          ]
        }
      },
      // 西段路线（葱岭-罗马）
      {
        type: 'Feature',
        properties: {
          from: '葱岭',
          to: '罗马',
          value: 15,
          type: 'west_route'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [75.9892, 39.4672],  // 葱岭
            [66.9750, 39.6547],  // 撒马尔罕
            [63.1400, 39.7000],  // 布哈拉
            [59.6142, 36.7749],  // 梅尔夫
            [58.3819, 37.2800],  // 尼沙普尔
            [51.3890, 35.6892],  // 德黑兰
            [44.3661, 33.3152],  // 巴格达
            [39.1925, 21.5433],  // 吉达
            [32.8597, 39.9334]   // 罗马
          ]
        }
      },
      // 灵关道（成都-大理）
      {
        type: 'Feature',
        properties: {
          from: '成都',
          to: '大理',
          value: 10,
          type: 'lingguan_route'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [104.0679, 30.6799], // 成都
            [103.4642, 30.4103], // 邛崃
            [103.0414, 30.0104], // 雅安
            [102.6771, 29.3445], // 汉源
            [102.2644, 27.8945], // 西昌
            [101.5090, 27.4234], // 盐源
            [101.3247, 25.7222], // 大姚
            [100.5547, 25.4444], // 祥云
            [100.2257, 25.5894]  // 大理
          ]
        }
      },
      // 五尺道（成都-大理）
      {
        type: 'Feature',
        properties: {
          from: '成都',
          to: '大理',
          value: 11,
          type: 'wuchi_route'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [104.0679, 30.6799], // 成都
            [104.6418, 28.7513], // 宜宾
            [103.7173, 27.3382], // 昭通
            [104.7273, 27.1237], // 赫章
            [103.7978, 25.5016], // 曲靖
            [102.8329, 24.8801], // 昆明
            [100.2257, 25.5894]  // 大理
          ]
        }
      },
      // 永昌道（大理-印度）
      {
        type: 'Feature',
        properties: {
          from: '大理',
          to: '印度',
          value: 12,
          type: 'yongchang_route'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [100.2257, 25.5894], // 大理
            [99.5333, 25.4667], // 永平
            [99.1678, 25.1118], // 保山
            [98.4904, 25.0207], // 腾冲
            [97.8550, 24.1333], // 缅甸
            [85.0000, 20.0000]   // 印度
          ]
        }
      },
      // 东洋航线（中国-日本）
      {
        type: 'Feature',
        properties: {
          from: '中国沿海',
          to: '日本',
          value: 10,
          type: 'east_sea_route'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [113.2644, 23.1291], // 广州
            [118.5894, 24.9089], // 泉州
            [120.1551, 30.2741], // 杭州
            [119.4128, 32.3947], // 扬州
            [126.9780, 37.5665], // 首尔
            [139.6917, 35.6895]  // 东京
          ]
        }
      },
      // 南洋航线（中国-东南亚）
      {
        type: 'Feature',
        properties: {
          from: '中国沿海',
          to: '东南亚',
          value: 12,
          type: 'south_sea_route'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [113.2644, 23.1291], // 广州
            [118.5894, 24.9089], // 泉州
            [120.1551, 30.2741], // 杭州
            [119.4128, 32.3947], // 扬州
            [100.5018, 13.7563], // 曼谷
            [103.8198, 1.3521],  // 新加坡
            [106.8456, -6.2088] // 雅加达
          ]
        }
      },
      // 西洋航线（中国-东非）
      {
        type: 'Feature',
        properties: {
          from: '中国沿海',
          to: '东非',
          value: 15,
          type: 'west_sea_route'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [113.2644, 23.1291], // 广州
            [118.5894, 24.9089], // 泉州
            [120.1551, 30.2741], // 杭州
            [119.4128, 32.3947], // 扬州
            [100.5018, 13.7563], // 曼谷
            [103.8198, 1.3521],  // 新加坡
            [72.8777, 19.0760],  // 孟买
            [55.2708, 25.2048],  // 迪拜
            [39.1925, 21.5433]   // 吉达
          ]
        }
      }
    ]
  }
  
  // 定义香料路线数据
  const spiceRouteData = {
    type: 'FeatureCollection',
    features: [
      // 印度-中亚路线
      {
        type: 'Feature',
        properties: {
          from: '印度',
          to: '中亚',
          value: 8,
          type: 'spice_route_1'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [85.0000, 20.0000],  // 印度
            [78.9629, 20.5937],  // 孟买
            [72.8777, 19.0760],  // 孟买港口
            [66.9750, 39.6547],  // 撒马尔罕
            [63.1400, 39.7000]   // 布哈拉
          ]
        }
      },
      // 东南亚-中亚路线
      {
        type: 'Feature',
        properties: {
          from: '东南亚',
          to: '中亚',
          value: 9,
          type: 'spice_route_2'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [106.8456, -6.2088], // 雅加达
            [103.8198, 1.3521],  // 新加坡
            [100.5018, 13.7563], // 曼谷
            [66.9750, 39.6547],  // 撒马尔罕
            [63.1400, 39.7000]   // 布哈拉
          ]
        }
      },
      // 中亚-中国路线
      {
        type: 'Feature',
        properties: {
          from: '中亚',
          to: '中国',
          value: 10,
          type: 'spice_route_3'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [63.1400, 39.7000],  // 布哈拉
            [59.6142, 36.7749],  // 梅尔夫
            [58.3819, 37.2800],  // 尼沙普尔
            [51.3890, 35.6892],  // 德黑兰
            [44.3661, 33.3152],  // 巴格达
            [88.1673, 40.6366],  // 楼兰
            [81.6784, 37.1144],  // 于阗
            [77.2484, 38.4142],  // 莎车
            [75.9892, 39.4672]   // 葱岭
          ]
        }
      }
    ]
  }
  
  // 提取所有城市点数据
  const cityData = {
    type: 'FeatureCollection',
    features: [
      // 陆上丝绸之路城市
      { type: 'Feature', properties: { name: '长安' }, geometry: { type: 'Point', coordinates: [108.9398, 34.3413] } },
      { type: 'Feature', properties: { name: '泾川' }, geometry: { type: 'Point', coordinates: [107.6389, 35.7333] } },
      { type: 'Feature', properties: { name: '固原' }, geometry: { type: 'Point', coordinates: [106.3306, 36.0037] } },
      { type: 'Feature', properties: { name: '靖远' }, geometry: { type: 'Point', coordinates: [104.6865, 36.5613] } },
      { type: 'Feature', properties: { name: '武威' }, geometry: { type: 'Point', coordinates: [102.8998, 37.9282] } },
      { type: 'Feature', properties: { name: '平凉' }, geometry: { type: 'Point', coordinates: [106.6817, 35.5500] } },
      { type: 'Feature', properties: { name: '会宁' }, geometry: { type: 'Point', coordinates: [105.0547, 35.5807] } },
      { type: 'Feature', properties: { name: '兰州' }, geometry: { type: 'Point', coordinates: [103.8233, 36.0642] } },
      { type: 'Feature', properties: { name: '凤翔' }, geometry: { type: 'Point', coordinates: [107.4000, 34.5200] } },
      { type: 'Feature', properties: { name: '天水' }, geometry: { type: 'Point', coordinates: [105.7249, 34.5809] } },
      { type: 'Feature', properties: { name: '陇西' }, geometry: { type: 'Point', coordinates: [104.6404, 35.0037] } },
      { type: 'Feature', properties: { name: '临夏' }, geometry: { type: 'Point', coordinates: [103.2152, 35.5985] } },
      { type: 'Feature', properties: { name: '乐都' }, geometry: { type: 'Point', coordinates: [102.1043, 36.5023] } },
      { type: 'Feature', properties: { name: '西宁' }, geometry: { type: 'Point', coordinates: [101.7679, 36.6407] } },
      { type: 'Feature', properties: { name: '张掖' }, geometry: { type: 'Point', coordinates: [100.4498, 38.9259] } },
      { type: 'Feature', properties: { name: '敦煌' }, geometry: { type: 'Point', coordinates: [94.6618, 40.1421] } },
      { type: 'Feature', properties: { name: '玉门关' }, geometry: { type: 'Point', coordinates: [92.8932, 40.1421] } },
      { type: 'Feature', properties: { name: '阳关' }, geometry: { type: 'Point', coordinates: [89.5934, 40.1421] } },
      { type: 'Feature', properties: { name: '楼兰' }, geometry: { type: 'Point', coordinates: [88.1673, 40.6366] } },
      { type: 'Feature', properties: { name: '吐鲁番' }, geometry: { type: 'Point', coordinates: [87.6169, 43.8256] } },
      { type: 'Feature', properties: { name: '库尔勒' }, geometry: { type: 'Point', coordinates: [85.3112, 41.7728] } },
      { type: 'Feature', properties: { name: '阿克苏' }, geometry: { type: 'Point', coordinates: [82.9749, 41.7275] } },
      { type: 'Feature', properties: { name: '于阗' }, geometry: { type: 'Point', coordinates: [81.6784, 37.1144] } },
      { type: 'Feature', properties: { name: '莎车' }, geometry: { type: 'Point', coordinates: [77.2484, 38.4142] } },
      { type: 'Feature', properties: { name: '葱岭' }, geometry: { type: 'Point', coordinates: [75.9892, 39.4672] } },
      { type: 'Feature', properties: { name: '撒马尔罕' }, geometry: { type: 'Point', coordinates: [66.9750, 39.6547] } },
      { type: 'Feature', properties: { name: '布哈拉' }, geometry: { type: 'Point', coordinates: [63.1400, 39.7000] } },
      { type: 'Feature', properties: { name: '梅尔夫' }, geometry: { type: 'Point', coordinates: [59.6142, 36.7749] } },
      { type: 'Feature', properties: { name: '尼沙普尔' }, geometry: { type: 'Point', coordinates: [58.3819, 37.2800] } },
      { type: 'Feature', properties: { name: '德黑兰' }, geometry: { type: 'Point', coordinates: [51.3890, 35.6892] } },
      { type: 'Feature', properties: { name: '巴格达' }, geometry: { type: 'Point', coordinates: [44.3661, 33.3152] } },
      { type: 'Feature', properties: { name: '吉达' }, geometry: { type: 'Point', coordinates: [39.1925, 21.5433] } },
      { type: 'Feature', properties: { name: '罗马' }, geometry: { type: 'Point', coordinates: [32.8597, 39.9334] } },
      // 南方丝绸之路城市
      { type: 'Feature', properties: { name: '成都' }, geometry: { type: 'Point', coordinates: [104.0679, 30.6799] } },
      { type: 'Feature', properties: { name: '邛崃' }, geometry: { type: 'Point', coordinates: [103.4642, 30.4103] } },
      { type: 'Feature', properties: { name: '雅安' }, geometry: { type: 'Point', coordinates: [103.0414, 30.0104] } },
      { type: 'Feature', properties: { name: '汉源' }, geometry: { type: 'Point', coordinates: [102.6771, 29.3445] } },
      { type: 'Feature', properties: { name: '西昌' }, geometry: { type: 'Point', coordinates: [102.2644, 27.8945] } },
      { type: 'Feature', properties: { name: '盐源' }, geometry: { type: 'Point', coordinates: [101.5090, 27.4234] } },
      { type: 'Feature', properties: { name: '大姚' }, geometry: { type: 'Point', coordinates: [101.3247, 25.7222] } },
      { type: 'Feature', properties: { name: '祥云' }, geometry: { type: 'Point', coordinates: [100.5547, 25.4444] } },
      { type: 'Feature', properties: { name: '大理' }, geometry: { type: 'Point', coordinates: [100.2257, 25.5894] } },
      { type: 'Feature', properties: { name: '永平' }, geometry: { type: 'Point', coordinates: [99.5333, 25.4667] } },
      { type: 'Feature', properties: { name: '保山' }, geometry: { type: 'Point', coordinates: [99.1678, 25.1118] } },
      { type: 'Feature', properties: { name: '腾冲' }, geometry: { type: 'Point', coordinates: [98.4904, 25.0207] } },
      // 海上丝绸之路城市
      { type: 'Feature', properties: { name: '广州' }, geometry: { type: 'Point', coordinates: [113.2644, 23.1291] } },
      { type: 'Feature', properties: { name: '泉州' }, geometry: { type: 'Point', coordinates: [118.5894, 24.9089] } },
      { type: 'Feature', properties: { name: '杭州' }, geometry: { type: 'Point', coordinates: [120.1551, 30.2741] } },
      { type: 'Feature', properties: { name: '扬州' }, geometry: { type: 'Point', coordinates: [119.4128, 32.3947] } },
      { type: 'Feature', properties: { name: '首尔' }, geometry: { type: 'Point', coordinates: [126.9780, 37.5665] } },
      { type: 'Feature', properties: { name: '东京' }, geometry: { type: 'Point', coordinates: [139.6917, 35.6895] } },
      { type: 'Feature', properties: { name: '曼谷' }, geometry: { type: 'Point', coordinates: [100.5018, 13.7563] } },
      { type: 'Feature', properties: { name: '新加坡' }, geometry: { type: 'Point', coordinates: [103.8198, 1.3521] } },
      { type: 'Feature', properties: { name: '雅加达' }, geometry: { type: 'Point', coordinates: [106.8456, -6.2088] } },
      { type: 'Feature', properties: { name: '孟买' }, geometry: { type: 'Point', coordinates: [72.8777, 19.0760] } },
      { type: 'Feature', properties: { name: '迪拜' }, geometry: { type: 'Point', coordinates: [55.2708, 25.2048] } }
    ]
  }
  
  // 创建城市标记点和名称标注
  const createCityLayers = () => {
    // 创建城市点图层，包含标记点和文本标注
    cityPointLayer = new PointLayer({
      zIndex: 3,
      autoFit: false
    })
      .source(cityData)
      .shape('circle')
      .size(5)
      .color('#FF0000')
      .style({
        opacity: 0.8
      })
      .label('name', {
        field: 'name',
        style: {
          fill: '#FFFFFF',
          fontSize: 14,
          textAnchor: 'center',
          textOffset: [0, 10],
          opacity: 0.8
        }
      })
  
    scene.addLayer(cityPointLayer)
  }
  
  const toggleRoutes = () => {
    if (!showRoutes.value) {
      // 首次显示路线，添加动画效果
      showRoutes.value = true
      
      // 创建新的路线图层
      lineLayer = new LineLayer({
        zIndex: 2,
        autoFit: false
      })
        .source(routeData)
        .shape('line')
        .size(1.5)
        .color('type', [
          '#FFD700',  // 陆上丝绸之路（金色）
          '#FFD700',  // 陆上丝绸之路
          '#FFD700',  // 陆上丝绸之路
          '#FFD700',  // 陆上丝绸之路
          '#FFD700',  // 陆上丝绸之路
          '#FFD700',  // 陆上丝绸之路
          '#00FF00',  // 南方丝绸之路（绿色）
          '#00FF00',  // 南方丝绸之路
          '#00FF00',  // 南方丝绸之路
          '#4169E1',  // 海上丝绸之路（蓝色）
          '#4169E1',  // 海上丝绸之路
          '#4169E1'   // 海上丝绸之路
        ])
        .style({
          opacity: 0.8,
          lineType: 'solid'
        })
        
      scene.addLayer(lineLayer)
      // 使用 setTimeout 确保图层添加后再开始动画
      setTimeout(() => {
        lineLayer.animate({
          enable: true,
          interval: 4,
          duration: 5,
          trailLength: 0.8
        })
      }, 100)
  
      // 显示城市标记点
      createCityLayers()
    } else {
      // 隐藏路线
      showRoutes.value = false
      if (lineLayer) {
        // 先停止动画
        lineLayer.animate({
          enable: false
        })
        // 使用淡出效果
        lineLayer.style({
          opacity: 0
        })
        // 延迟移除图层
        setTimeout(() => {
          scene.removeLayer(lineLayer)
          lineLayer = null  // 清除图层引用
        }, 500)
      }
  
      // 立即移除城市标记点
      if (cityPointLayer) {
        scene.removeLayer(cityPointLayer)
        cityPointLayer = null
      }
    }
  }
  
  // 香料路线切换函数
  const toggleSpiceRoutes = () => {
    if (!showSpiceRoutes.value) {
      showSpiceRoutes.value = true
      
      spiceLayer = new LineLayer({
        zIndex: 2,
        autoFit: false
      })
        .source(spiceRouteData)
        .shape('line')
        .size(1.5)
        .color('type', [
          '#FFA500',  // 印度-中亚路线（橙色）
          '#FFA500',  // 东南亚-中亚路线
          '#FFA500'   // 中亚-中国路线
        ])
        .style({
          opacity: 0.8,
          lineType: 'solid'
        })
        
      scene.addLayer(spiceLayer)
      setTimeout(() => {
        spiceLayer.animate({
          enable: true,
          interval: 4,
          duration: 5,
          trailLength: 0.8
        })
      }, 100)
  
      // 显示城市标记点
      createCityLayers()
    } else {
      showSpiceRoutes.value = false
      if (spiceLayer) {
        spiceLayer.animate({
          enable: false
        })
        spiceLayer.style({
          opacity: 0
        })
        setTimeout(() => {
          scene.removeLayer(spiceLayer)
          spiceLayer = null
        }, 500)
      }
  
      // 立即移除城市标记点
      if (cityPointLayer) {
        scene.removeLayer(cityPointLayer)
        cityPointLayer = null
      }
    }
  }
  
  onMounted(() => {
    // 初始化场景
    scene = new Scene({
      id: 'container',
      map: new GaodeMap({
        style: 'dark',
        center: [91.111891, 29.662557],
        pitch: 15,
        zoom: 5,
        token: '546570dc4305d0dd190907a49307a8cb'
      }),
      renderer: {
        willReadFrequently: true
      }
    })
  
    // 加载数据
    scene.on('loaded', () => {
      console.log('地图加载完成')
      console.log('路线数据:', routeData)
    })
  })
  
  onUnmounted(() => {
    if (scene) {
      scene.destroy()
    }
  })
  </script>
  
  <style scoped>
  .map-container {
    width: 100%;
    height: 100vh;
    position: relative;
  }
  
  .silk-button {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    background-color: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    color: #333;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    z-index: 1000;  
  }
  
  .silk-button:hover {
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  .spice-button {
    position: absolute;
    top: 70px;  /* 位于丝绸按钮下方 */
    right: 20px;
    padding: 10px 20px;
    background-color: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    color: #333;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    z-index: 1000;
  }
  
  .spice-button:hover {
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  :deep(body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  
  :deep(#app) {
    height: 100vh;
    width: 100vw;
  }
  </style> 