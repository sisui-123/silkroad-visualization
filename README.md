# 丝绸之路数据可视化

## 项目简介

这是一个基于Vue 3和Vite的丝绸之路数据可视化项目，通过交互式地图、时间轴和数据分析图表，直观展现丝绸之路的历史与文化。项目采用现代前端技术栈，结合3D地球、历史地图和数据可视化，为用户提供沉浸式的丝绸之路探索体验。

## 功能特点

- **3D地球可视化**
  - 基于Three.js的交互式3D地球
  - 丝绸之路沿线重要城市标注
  - 城市信息悬浮显示
  - 路线动态展示

- **历史时间轴**
  - 朝代更迭时间轴
  - 城市历史事件标记
  - 按时间筛选历史事件

- **多维度数据展示**
  - 贸易数据统计图表
  - 文化交流影响分析
  - 历史事件可视化

- **丰富的多媒体内容**
  - 历史视频资料
  - 文物图片展示
  - 考古遗址信息

## 技术栈

- **核心框架**
  - Vue 3.4+ - 渐进式JavaScript框架
  - Vite 5.1+ - 下一代前端构建工具
  - Vue Router 4.3+ - Vue官方路由管理器

- **状态管理**
  - Pinia 3.0+ - Vue官方推荐的状态管理方案

- **3D渲染与地图**
  - Three.js 0.162+ - WebGL 3D渲染库
  - L7 2.22+ - 蚂蚁金服开源的地理空间数据可视化框架

- **数据可视化**
  - ECharts 5.6+ - 百度开源的数据可视化图表库
  - ECharts-GL 2.0+ - ECharts的WebGL扩展
  - D3.js 7.9+ - 数据驱动文档
  - Vue-ECharts 7.0+ - Vue的ECharts组件

- **动画效果**
  - GSAP 3.12+ - 专业级JavaScript动画库
  - Framer Motion 12.6+ - React动画库
  - VueUse Motion 3.0+ - Vue动画组合式API
  - AOS 2.3+ - 滚动动画库

- **开发工具**
  - TypeScript - 类型安全
  - Sass - CSS预处理器
  - ESLint - 代码质量
  - Prettier - 代码格式化

## 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装步骤

1. 克隆项目
```bash
git clone https://github.com/sisui-123/silkroad-visualization.git
cd silkroad-visualization
```

2. 安装依赖
```bash
npm install
```

3. 开发环境运行
```bash
npm run dev
```

4. 生产环境构建
```bash
npm run build
```

5. 预览生产构建
```bash
npm run preview
```

## 项目结构

```
src/
├── assets/          # 静态资源（图片、样式等）
│   ├── data/        # 静态数据文件
│   ├── geojson/     # 地理数据文件
│   ├── images/      # 图片资源
│   └── styles/      # 样式文件
├── components/      # 可复用组件
│   ├── Globe3D.vue         # 3D地球组件
│   ├── TimeAxis.vue        # 时间轴组件
│   ├── AnimatedMap.vue     # 动态地图组件
│   ├── HistoricalMaps.vue  # 历史地图组件
│   ├── TerrainMap.vue      # 地形图组件
│   ├── InteractiveMap.vue  # 交互式地图组件
│   ├── TradeVolumeChart.vue # 贸易量图表
│   └── TimelineSlider.vue  # 时间轴滑块组件
├── data/           # 数据文件
│   ├── eventData.js       # 事件数据
│   ├── silkRoadData.js    # 丝绸之路数据
│   ├── mapData.json       # 地图数据
│   └── silkroad/          # 丝绸之路相关数据
├── pages/          # 页面组件
│   ├── Home.vue           # 首页
│   ├── MainDashboard.vue  # 主仪表盘
│   ├── Trade.vue          # 贸易页面
│   ├── CulturalExchange.vue # 文化交流页面
│   ├── HistoricalEvents.vue # 历史事件页面
│   ├── Location.vue       # 位置页面
│   └── Site.vue           # 遗址展示页面
├── router/         # 路由配置
│   └── index.js          # 路由定义
├── services/       # API服务和数据处理
│   ├── api.js            # API服务
│   └── export.service.ts # 导出服务
├── store/          # Pinia状态管理
│   ├── index.js          # 状态管理入口
│   ├── dynastyStore.js   # 朝代状态
│   ├── chart.store.ts    # 图表状态
│   └── period.store.ts   # 时期状态
├── styles/         # 全局样式
│   ├── main.scss         # 主样式文件
│   ├── variables.scss    # 样式变量
│   └── transitions.scss  # 过渡动画样式
├── utils/          # 工具函数
│   ├── index.js          # 通用工具
│   ├── mapLoader.js      # 地图加载工具
│   └── historyData.js    # 历史数据处理
├── workers/        # Web Workers
│   ├── dataWorker.js     # 数据处理Worker
│   └── tradeWorker.js    # 贸易数据Worker
├── App.vue         # 应用根组件
├── main.js         # 应用入口
└── historicalData.js # 历史数据
```

## 主要功能模块

### 首页 (Home)
- 3D地球展示
- 城市信息浮窗
- 导航入口

### 历史时期 (Historical Period)
- 朝代时间轴
- 历史事件展示
- 时期特征描述

### 贸易分析 (Trade Analysis)
- 贸易路线可视化
- 商品流通数据
- 贸易量统计图表

### 文化交流 (Cultural Exchange)
- 宗教传播路线
- 艺术交流展示
- 技术传播分析

### 遗址展示 (Silk Road Sites)
- 考古遗址信息
- 文物图片展示
- 遗址历史背景

## 开发指南

### 代码规范
- 遵循Vue 3组合式API的编码风格
- 使用ESLint和Prettier进行代码格式规范
- 组件名使用PascalCase命名
- 变量和函数使用camelCase命名

### 组件开发
- 使用SFC（单文件组件）格式
- 优先使用组合式API (Composition API)
- 实现响应式设计，适配不同屏幕尺寸
- 注重组件复用性和可维护性

### 数据管理
- 使用Pinia进行状态管理
- 大型数据处理使用Web Workers
- 静态数据存放在data目录
- 动态数据通过services获取

## 贡献指南

1. Fork本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交Pull Request

## 许可证

本项目采用 MIT 许可证