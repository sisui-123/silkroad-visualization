# 丝绸之路数据可视化

这是一个基于Vue 3和Vite的丝绸之路数据可视化项目，通过交互式地图、时间轴和数据分析图表，直观展现丝绸之路的历史与文化。

## 功能特点

- 交互式地图：展示丝绸之路的地理路线和重要城市
- 历史时间轴：展示重要历史事件和朝代更迭
- 数据分析：通过图表展示贸易和文化交流数据
- 文化详情：展示沿线重要文化的详细信息

## 技术栈

- Vue 3
- Vite
- Leaflet (地图可视化)
- ECharts (图表可视化)
- Pinia (状态管理)
- Vue Router (路由管理)

## 安装

1. 克隆项目
```bash
git clone https://github.com/sisui-123/silkroad-visualization.git
cd silkroad-visualization
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 构建生产版本
```bash
npm run build
```

## 项目结构

```
src/
├── assets/          # 静态资源
├── components/      # 可复用组件
├── pages/          # 页面组件
├── router/         # 路由配置
├── services/       # API服务
├── store/          # 状态管理
├── utils/          # 工具函数
├── App.vue         # 根组件
└── main.js         # 入口文件
```

## 开发指南

1. 遵循Vue 3组合式API的编码风格
2. 使用Pinia进行状态管理
3. 使用Vue Router进行路由管理
4. 使用ECharts和Leaflet进行数据可视化

## 贡献指南

1. Fork项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 许可证

MIT License 