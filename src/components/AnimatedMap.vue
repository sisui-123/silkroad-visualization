<template>
  <div>
    <div class="events">
      <div>
        <h4>城市中心的迁移与重建</h4>
        <p>汉代：汉长安城是丝绸之路的起点之一，位于今西安西北方向。汉武帝时期，张骞出使西域，开辟了丝绸之路，长安成为重要的交通枢纽。</p>
        <p>隋唐时期：隋文帝放弃旧都长安，命宇文恺在汉长安城东南面建造新都大兴城，唐王朝建立后改称长安城。唐代长安城成为当时世界上最大的城市，也是丝绸之路的商贸和文化交流中心。</p>
        
        <h4>交通网络的拓展与完善</h4>
        <p>陆路交通：丝绸之路的开辟使西安成为连接中原与西域的重要节点。从长安出发，经河西走廊通往中亚、西亚，直至欧洲。随着丝绸之路的繁荣，西安的交通网络不断拓展，形成了多条通往西域的路线。</p>
        <p>现代交通：在“丝绸之路经济带”建设中，西安作为陇海兰新铁路沿线最大的西部中心城市，具有承东启西、连接南北的重要战略地位。</p>
        
        <h4>城市功能的转变与提升</h4>
        <p>古代：丝绸之路的繁荣使西安成为国际贸易、文化交流的重要城市。唐代长安城内的大唐西市是中亚、波斯等西域商人从事商业贸易的国际性市场。</p>
        <p>现代：西安依托自身区位优势，成为“一带一路”倡议的重要节点城市，担负着促进亚欧合作交流的使命。</p>
        
        <h4>经济与文化交流的增强</h4>
        <p>古代：丝绸之路的开通使西安成为东西方文明交融的中心。来自中亚、西亚的商人、学者、艺术家汇聚于此，带来了异域的香料、宝石等商品，也促进了佛教、祆教等宗教的传播。</p>
        <p>现代：西安作为“丝绸之路经济带”的重要门户，通过跨国道路联通等工程，吸引了大量跨国资本、企业和人流，提升了城市的国际化水平。</p>
      </div>
    </div>
  </div>
</template>

<script>
import historicalCityData from '../historicalData.js';

export default {
  name: "AnimatedMap",
  setup() {
    const cityCenterData = historicalCityData["城市中心的迁移"];
    return {
      cityCenterData
    };
  }
};
</script>

<style>
.events {
  margin-top: 30px;
  background: linear-gradient(135deg, #f8f8f8, #ffffff);
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.events h4 {
  color: #8B4513;
  font-size: 20px;
  margin-bottom: 20px;
  position: relative;
  display: inline-block;
}

.events h4::after {
  content: '';
  display: block;
  width: 100%;
  height: 3px;
  background: #8B4513;
  position: absolute;
  bottom: -5px;
  left: 0;
}

.events > div {
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.events > div:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.events p {
  color: #666;
  line-height: 1.8;
  margin-bottom: 15px;
}

.events ul {
  padding-left: 0;
  list-style: none;
}

.events li {
  padding: 15px;
  margin-bottom: 10px;
  background: #f8f8f8;
  border-left: 4px solid #8B4513;
  border-radius: 4px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.events li:hover {
  background: #e8e8e8;
  transform: translateX(10px);
}

.events li::before {
  content: '📜';
  margin-right: 10px;
  font-size: 18px;
}

.events li strong {
  color: #8B4513;
  margin-right: 8px;
}
</style>