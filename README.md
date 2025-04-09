# 丝绸之路数据可视化

## 项目简介

这是一个基于Vue 3和Vite的丝绸之路数据可视化项目，通过交互式地图、时间轴和数据分析图表，直观展现丝绸之路的历史与文化。项目采用现代前端技术栈，结合3D地球、历史地图和数据可视化，为用户提供沉浸式的丝绸之路探索体验。

## 功能特点

- **交互式地图展示**
  - 3D地球可视化（Globe3D）
  - 历史地图叠加（HistoricalMaps）
  - 地形图展示（TerrainMap）
  - 丝绸之路沿线重要城市标注

- **时间轴与历史事件**
  - 朝代更迭时间轴
  - 重要历史事件标记
  - 历史视频资料展示

- **数据分析与可视化**
  - 贸易数据统计图表
  - 文化交流影响分析
  - 实时数据更新

- **文化遗产展示**
  - 考古遗址信息
  - 文物图片展示
  - 文化交流故事

## 技术栈

- **核心框架**
  - Vue 3 - 渐进式JavaScript框架
  - Vite - 下一代前端构建工具

- **地图可视化**
  - Leaflet - 开源地图库
  - Three.js - 3D渲染引擎

- **数据可视化**
  - ECharts - 图表可视化库
  - D3.js - 数据驱动文档

- **状态管理**
  - Pinia - Vue官方推荐的状态管理方案

- **工具链**
  - TypeScript - 类型安全
  - ESLint - 代码质量
  - Prettier - 代码格式化

## 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装步骤

1. 克隆项目
```bash
git clone https://github.com/yourusername/silkroad-visualization.git
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

## 项目结构

```
src/
├── assets/          # 静态资源（图片、样式等）
├── components/      # 可复用组件
│   ├── AnimatedMap/     # 动态地图组件
│   ├── Globe3D/        # 3D地球组件
│   └── TimeAxis/       # 时间轴组件
├── pages/          # 页面组件
│   ├── Home/          # 首页
│   ├── SilkRoadSites/ # 遗址展示
│   └── TradeAnalysis/ # 贸易分析
├── services/       # API服务和数据处理
├── store/          # Pinia状态管理
├── styles/         # 全局样式
├── utils/          # 工具函数
└── workers/        # Web Workers
```

## 开发指南

### 代码规范
- 遵循Vue 3组合式API的编码风格
- 使用TypeScript进行类型检查
- 遵循ESLint和Prettier的代码格式规范

### 组件开发
- 使用SFC（单文件组件）格式
- 实现响应式设计
- 注重组件复用性

### 数据管理
- 使用Pinia进行状态管理
- 实现数据持久化
- 优化数据加载性能

## 贡献指南

1. Fork本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交Pull Request

## 许可证

本项目采用 MIT 许可证 