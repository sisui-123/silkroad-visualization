import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import HistoricalPeriod from '../pages/MainDashboard.vue'
import TradeGoods from '../pages/Trade.vue'
import CulturalExchange from '../pages/CulturalExchange.vue'
import HistoricalEvents from '../pages/HistoricalEvents.vue'
import Locatoin from '../pages/Location.vue'
import Site from '../pages/Site.vue'

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
    path: '/location',
    name: 'location',
    component: Locatoin
  },
  {
    path: '/silkRoadsites',
    name: 'silkRoadsites',
    component: Site
  },
  {
    path: '/historical-events',
    name: 'historical-events',
    component: HistoricalEvents
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router