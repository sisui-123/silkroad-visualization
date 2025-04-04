import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import HistoricalPeriod from '../pages/HistoricalPeriod.vue'
import TradeGoods from '../pages/TradeGoods.vue'
import CulturalExchange from '../pages/CulturalExchange.vue'
import SilkRoadSites from '../pages/SilkRoadSites.vue'
import HistoricalEvents from '../pages/HistoricalEvents.vue'
import ModernSites from '../pages/ModernSites.vue'
import SiteDetail from '../pages/SiteDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/historical-period',
    name: 'historical-period',
    component: HistoricalPeriod
  },
  {
    path: '/trade-goods',
    name: 'trade-goods',
    component: TradeGoods
  },
  {
    path: '/cultural-exchange',
    name: 'cultural-exchange',
    component: CulturalExchange
  },
  {
    path: '/SilkRoadsites',
    name: 'silkRoadsites',
    component: SilkRoadSites
  },
  {
    path: '/historical-events',
    name: 'historical-events',
    component: HistoricalEvents
  },
  {
    path: '/modern-sites',
    name: 'modern-sites',
    component: ModernSites
  },
  {
    path: '/site/:id',
    name: 'site-detail',
    component: SiteDetail
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 