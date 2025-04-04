<template>
  <div class="trade-goods">
    <div class="glass-container">
      <h1 class="title">主要贸易品</h1>
      <div class="goods-grid">
        <div v-for="good in tradeGoods" :key="good.id" class="good-card">
          <div class="good-image">
            <img :src="good.image" :alt="good.name">
          </div>
          <div class="good-content">
            <h2>{{ good.name }}</h2>
            <p class="description">{{ good.description }}</p>
            <div class="details">
              <div class="detail-item">
                <span class="label">产地：</span>
                <span>{{ good.origin }}</span>
              </div>
              <div class="detail-item">
                <span class="label">主要贸易路线：</span>
                <span>{{ good.tradeRoute }}</span>
              </div>
              <div class="detail-item">
                <span class="label">历史影响：</span>
                <span>{{ good.historicalImpact }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TradeGoods',
  data() {
    return {
      tradeGoods: [
        {
          id: 1,
          name: '丝绸',
          image: '/images/silk.jpg',
          description: '中国最著名的出口商品，象征着古代中国的文明与工艺。',
          origin: '中国',
          tradeRoute: '陆上丝绸之路',
          historicalImpact: '促进了东西方文化交流，影响了西方服饰文化'
        },
        {
          id: 2,
          name: '瓷器',
          image: '/images/porcelain.jpg',
          description: '精美的中国瓷器是海上丝绸之路的重要贸易品。',
          origin: '中国',
          tradeRoute: '海上丝绸之路',
          historicalImpact: '推动了全球陶瓷工艺发展，影响了世界各地的饮食文化'
        },
        {
          id: 3,
          name: '香料',
          image: '/images/spices.jpg',
          description: '来自东南亚和印度的香料是重要的贸易商品。',
          origin: '东南亚、印度',
          tradeRoute: '海上丝绸之路',
          historicalImpact: '改变了全球饮食文化，推动了航海技术的发展'
        }
      ]
    }
  }
}
</script>

<style scoped>
.trade-goods {
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.glass-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 600;
}

.goods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.good-card {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.good-card:hover {
  transform: translateY(-5px);
}

.good-image {
  height: 200px;
  overflow: hidden;
}

.good-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.good-card:hover .good-image img {
  transform: scale(1.05);
}

.good-content {
  padding: 1.5rem;
}

.good-content h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.description {
  color: #444;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-item {
  display: flex;
  gap: 0.5rem;
}

.label {
  color: #666;
  font-weight: 500;
}
</style> 