import { ref, computed } from 'vue'

const eventData = {
  'qin-unification': {
    title: '秦始皇统一六国建都咸阳',
    timeRange: {
      start: -221,
      display: '公元前221年'
    },
    description: '秦始皇统一六国后，以咸阳（今西安附近）为都城，开创了中国历史上第一个统一的中央集权国家。',
    detailedContent: '秦王嬴政统一六国后，建立起中国历史上第一个中央集权制国家，实行郡县制度，统一文字、货币、度量衡等。',
    background: '战国末期，七国争霸，秦国在商鞅变法后国力强盛，以咸阳为中心逐步统一六国。',
    impact: '咸阳成为中国第一个统一王朝的都城，奠定了西安地区作为政治中心的地位。秦朝建立的中央集权制度影响了中国两千多年的政治格局。',
    images: {
      qinShihuang: '/images/xian/qin-shihuang.jpg',
      qinPalace: '/images/xian/qin-palace.jpg',
      liSi: '/images/xian/li-si.jpg',
      qinMeasure: '/images/xian/qin-measure.jpg',
      terracottaWarriors: '/images/xian/terracotta-warriors.jpg'
    },
    video: '/videos/qin-unification.mp4',
    modelUrl: '/models/qin.gltf',
    keyEvents: [
      '公元前230年，秦灭韓國',
      '公元前221年，秦始皇统一六国，定都咸阳',
      '公元前220年，秦始皇开始修建骊山陵墓（兵马俑）',
      '公元前214年，修建咸阳宫和阿房宫'
    ],
    keyFigures: [
      { name: '秦始皇嬴政', role: '秦国国王，中国第一位皇帝', image: '/images/xian/qin-shihuang.jpg' },
      { name: '李斯', role: '秦国丞相，推动统一政策', image: '/images/xian/li-si.jpg' }
    ],
    artifacts: [
      { name: '秦始皇兵马俑', image: '/images/xian/terracotta-warriors.jpg' },
      { name: '秦统一度量衡', image: '/images/xian/qin-measure.jpg' }
    ],
    locations: ['咸阳', '骊山', '阿房宫', '秦长城起点'],
    regions: [
      { id: 'xian', name: '咸阳' },
      { id: 'central-china', name: '中原地区' }
    ],
    influences: [
      { targetId: 'central-government', type: 'political', strength: 1 },
      { targetId: 'standardization', type: 'cultural', strength: 0.8 }
    ],
    position: { x: -5, y: 0, z: 0 },
    tags: [
      { name: '秦都咸阳', value: 100 },
      { name: '统一六国', value: 95 },
      { name: '中央集权', value: 90 },
      { name: '书同文', value: 85 },
      { name: '车同轨', value: 85 },
      { name: '郡县制推行', value: 84 },
      { name: '三公九卿制', value: 83 },
      { name: '统一度量衡', value: 80 },
      { name: '兵马俑', value: 75 },
      { name: '阿房宫', value: 70 }
    ]
  },
  'silk-road': {
    title: '汉武帝开通丝绸之路',
    timeRange: {
      start: -138,
      display: '公元前138年'
    },
    description: '汉武帝时期，以长安（今西安）为起点的丝绸之路正式开通，成为连接东西方的重要贸易通道。',
    background: '汉武帝时期，匈奴势力强大，威胁长安安全。汉武帝派张骞从长安出发，寻求与大月氏结盟抗击匈奴。',
    impact: '长安成为丝绸之路的东方起点，促进东西方经济文化交流，使西安成为国际化大都市。',
    images: {
      hanWudi: '/images/xian/han-wudi.jpg',
      zhangQian: '/images/xian/zhang-qian.jpg',
      hanSilk: '/images/xian/han-silk.jpg',
      hanDancer: '/images/xian/han-dancer.jpg',
      silkRoad: '/images/xian/silk-road.jpg',
      silkRoadMap: '/images/xian/silk-road-map.png',
      hanMirror: '/images/xian/han-mirror.jpg'
    },
    video: '/videos/silk-road.mp4',
    modelUrl: '/models/silk-road.gltf',
    keyEvents: [
      '公元前138年，张骞从长安出发首次出使西域',
      '公元前119年，张骞第二次出使西域',
      '公元104年，长安成为丝绸之路东方起点'
    ],
    keyFigures: [
      { name: '汉武帝刘彻', role: '西汉第七位皇帝', image: '/images/xian/han-wudi.jpg' },
      { name: '张骞', role: '汉朝外交家，从长安出使西域', image: '/images/xian/zhang-qian.jpg' }
    ],
    artifacts: [
      { name: '汉代丝绸', image: '/images/xian/han-silk.jpg' },
      { name: '西域舞乐俑', image: '/images/xian/han-dancer.jpg' },
      { name: '汉代铜镜', image: '/images/xian/han-mirror.jpg' }
    ],
    locations: ['长安', '敦煌', '楼兰', '大宛', '大月氏', '安息'],
    regions: [
      { id: 'xian', name: '长安' },
      { id: 'central-asia', name: '中亚' },
      { id: 'persia', name: '波斯' }
    ],
    influences: [
      { targetId: 'trade', type: 'economic', strength: 1 },
      { targetId: 'cultural-exchange', type: 'cultural', strength: 0.9 }
    ],
    position: { x: -3, y: 0, z: 0 },
    tags: [
      { name: '丝绸之路', value: 100 },
      { name: '汉长安', value: 95 },
      { name: '张骞出使', value: 90 },
      { name: '汉武盛世', value: 85 },
      { name: '东西贸易', value: 85 },
      { name: '丝绸', value: 85 },
      { name: '茶叶', value: 80 },
      { name: '瓷器', value: 80 },
      { name: '文化交流', value: 77 }
    ]
  },
  'tang-changan': {
    title: '唐长安城建设',
    timeRange: {
      start: 618,
      display: '公元618年'
    },
    description: '唐朝建立后，以长安（今西安）为都城，修建了规模宏大、规划严整的长安城，成为当时世界上最大、最繁华的国际化大都市。',
    background: '隋朝末年，李渊在太原起兵，攻占长安，建立唐朝。唐朝建立后，在隋大兴城基础上扩建长安城。',
    impact: '唐长安城成为当时世界上最大的城市，人口超过百万，是国际文化交流中心，各国使节、商人、留学生云集于此。',
    images: {
      tangChangan: '/images/xian/tang-changan.jpeg',
      liYuan: '/images/xian/li-yuan.webp',
      tangTaizong: '/images/xian/tang-taizong.jpg',
      tangSancai: '/images/xian/tang-sancai.webp',
      changanModel: '/images/xian/changan-model.jpg',
      tangMarket: '/images/xian/tang-market.jpg',
      yuwenKai: '/images/xian/yuwen-kai.jpg'
    },
    video: '/videos/tang-changan.mp4',
    modelUrl: '/models/tang-changan.gltf',
    keyEvents: [
      '公元618年，唐朝建立，定都长安',
      '公元624年，开始大规模扩建长安城',
      '公元643年，长安城基本建成',
      '公元652年，大雁塔建成'
    ],
    keyFigures: [
      { name: '唐高祖李渊', role: '唐朝开国皇帝', image: '/images/xian/li-yuan.webp' },
      { name: '唐太宗李世民', role: '唐朝第二位皇帝', image: '/images/xian/tang-taizong.jpg' },
      { name: '宇文恺', role: '设计者', image: '/images/xian/yuwen-kai.jpg' }
    ],
    artifacts: [
      { name: '唐三彩', image: '/images/xian/tang-sancai.webp' },
      { name: '长安城模型', image: '/images/xian/changan-model.jpg' },
      { name: '市招', image: '/images/xian/tang-market.jpg' }
    ],
    locations: ['皇城', '明德门', '安定门', '西市', '大明宫', '兴庆宫', '大雁塔', '小雁塔', '曲江池'],
    regions: [
      { id: 'xian', name: '长安' }
    ],
    influences: [
      { targetId: 'urban-planning', type: 'architectural', strength: 1 },
      { targetId: 'cultural-exchange', type: 'cultural', strength: 0.9 }
    ],
    position: { x: -1, y: 0, z: 0 },
    tags: [
      { name: '宇文恺遗制', value: 100 },
      { name: '朱雀大街', value: 98 },
      { name: '三重城制', value: 95 },
      { name: '108坊布局', value: 94 },
      { name: '东西两市', value: 93 },
      { name: '街鼓制度', value: 93 },
      { name: '排水明沟', value: 92 },
      { name: '行道槐树', value: 91 },
      { name: '武候铺', value: 90 }
    ]
  },
  'xuanzang': {
    title: '玄奘从长安出发西行取经',
    timeRange: {
      start: 629,
      display: '公元629年'
    },
    description: '唐朝高僧玄奘从长安（今西安）出发，历经艰险西行天竺，带来大量佛经典籍，对中印文化交流产生深远影响。',
    background: '唐初，佛教在长安发展迅速，但佛经翻译存在诸多问题，玄奘决心西行求取真经。',
    impact: '玄奘带来657部佛经，在长安翻译佛经75部，1335卷，促进长安佛教文化发展，大雁塔成为西安标志性建筑。',
    images: {
      xuanzangPortrait: '/images/xian/xuanzang-portrait.jpg',
      xuanzangRoute: '/images/xian/xuanzang-route.jpg',
      giantWildGoosePagoda: '/images/xian/giant-wild-goose-pagoda.jpg',
      daTangXiyuJi: '/images/xian/da-tang-xiyu-ji.jpg',
      buddhistSutra: '/images/xian/buddhist-sutra.jpg',
      jieriWang: '/images/xian/jieri-wang.jpg'
    },
    video: '/videos/xuanzang.mp4',
    modelUrl: '/models/xuanzang.gltf',
    keyEvents: [
      '公元629年，玄奘从长安出发',
      '公元645年，玄奘返回长安',
      '公元652年，玄奘主持建造大雁塔保存佛经',
      '公元664年，玄奘在长安圆寂'
    ],
    keyFigures: [
      { name: '玄奘', role: '唐代高僧，佛经翻译家', image: '/images/xian/xuanzang-portrait.jpg' },
      { name: '唐太宗', role: '唐朝皇帝，支持佛教发展', image: '/images/xian/tang-taizong.jpg' },
      { name: '戒日王', role: '天竺国王', image: '/images/xian/jieri-wang.jpg' }
    ],
    artifacts: [
      { name: '大雁塔', image: '/images/xian/giant-wild-goose-pagoda.jpg' },
      { name: '大唐西域记', image: '/images/xian/da-tang-xiyu-ji.jpg' },
      { name: '佛经', image: '/images/xian/buddhist-sutra.jpg' }
    ],
    locations: ['长安', '大雁塔', '慈恩寺', '玄奘墓', '敦煌', '天竺', '那烂陀寺'],
    regions: [
      { id: 'xian', name: '长安' },
      { id: 'india', name: '印度' }
    ],
    influences: [
      { targetId: 'buddhism', type: 'religious', strength: 1 },
      { targetId: 'cultural-exchange', type: 'cultural', strength: 0.9 }
    ],
    position: { x: 1, y: 0, z: 0 },
    tags: [
      { name: '贞观禁边令', value: 100 },
      { name: '突厥分裂', value: 98 },
      { name: '高昌王认亲', value: 95 },
      { name: '戒日王朝', value: 94 },
      { name: '吐蕃崛起', value: 93 },
      { name: '那烂陀求学', value: 93 },
      { name: '曲女城辩经', value: 92 },
      { name: '大小乘之争', value: 91 },
      { name: '佛陀伽耶', value: 90 }
    ]
  },
  'xian-incident': {
    title: '西安事变',
    timeRange: {
      start: 1936,
      display: '公元1936年'
    },
    description: '张学良、杨虎城在西安发动"兵谏"，扣留蒋介石，迫使国民党停止内战，一致抗日，成为中国历史上的重要转折点。',
    background: '1936年，日本侵略加剧，但国民党仍坚持"攘外必先安内"政策，继续内战。张学良、杨虎城为改变这一局面，发动西安事变。',
    impact: '西安事变促成了第二次国共合作，形成了抗日民族统一战线，成为中国抗日战争的转折点。',
    images: {
      xianIncident: '/images/xian/xian-incident.jpg',
      zhangXueliang: '/images/xian/zhang-xueliang.jpg',
      yangHucheng: '/images/xian/yang-hucheng.jpg',
      chiangKaiShek: '/images/xian/chiang-kai-shek.jpg',
      incidentSite: '/images/xian/incident-site.jpg',
      xianIncidentDocument: '/images/xian/xian-incident-document.jpg',
      huaqingPool: '/images/xian/huaqing-pool.jpg'
    },
    video: '/videos/xian-incident.mp4',
    modelUrl: '/models/xian-incident.gltf',
    keyEvents: [
      '1936年12月12日，张学良、杨虎城在临潼华清池扣留蒋介石',
      '1936年12月13日，提出停止内战、一致抗日等八项要求',
      '1936年12月25日，蒋介石被释放返回南京'
    ],
    keyFigures: [
      { name: '张学良', role: '东北军领导人', image: '/images/xian/zhang-xueliang.jpg' },
      { name: '杨虎城', role: '西北军领导人', image: '/images/xian/yang-hucheng.jpg' },
      { name: '蒋介石', role: '国民政府领导人', image: '/images/xian/chiang-kai-shek.jpg' }
    ],
    artifacts: [
      { name: '西安事变旧址', image: '/images/xian/incident-site.jpg' },
      { name: '历史文件', image: '/images/xian/xian-incident-document.jpg' },
      { name: '华清池', image: '/images/xian/huaqing-pool.jpg' }
    ],
    locations: ['华清池', '临潼', '西安城', '杨虎城公馆'],
    regions: [
      { id: 'xian', name: '西安' }
    ],
    influences: [
      { targetId: 'national-unity', type: 'political', strength: 1 },
      { targetId: 'anti-japanese', type: 'military', strength: 0.9 }
    ],
    position: { x: 3, y: 0, z: 0 },
    tags: [
      { name: '"攘外必先安内"政策', value: 100 },
      { name: '西北剿总成立', value: 98 },
      { name: '中共《八一宣言》', value: 95 },
      { name: '救国会七君子案', value: 94 },
      { name: '两广事变', value: 93 },
      { name: '直罗镇战役', value: 93 },
      { name: '洛川会谈', value: 92 },
      { name: '延安机场密约', value: 91 },
      { name: '华清池兵谏', value: 90 }
    ]
  },
  'city-wall': {
    title: '西安古城墙保护与修复',
    timeRange: {
      start: 1983,
      display: '公元1983年'
    },
    description: '西安启动大规模古城墙保护与修复工程，成为中国城市遗产保护的典范。',
    background: '西安古城墙始建于明洪武年间，是中国现存规模最大、保存最完整的古代城垣。改革开放后，西安市开始重视遗产保护。',
    impact: '西安古城墙的保护与修复，使这座拥有600多年历史的明代城墙重新焕发出机，成为西安城市名片和重要旅游景点。',
    images: {
      cityWall: '/images/xian/city-wall.jpg',
      xianGovernment: '/images/xian/xian-government.jpg',
      experts: '/images/xian/experts.jpg',
      mingBrick: '/images/xian/ming-brick.jpg',
      wallModel: '/images/xian/wall-model.jpg',
      ancientGate: '/images/xian/ancient-gate.jpg',
      craftsman: '/images/xian/craftsman.jpg',
      huaqingPool: '/images/xian/huaqing-pool.jpg'
    },
    video: '/videos/city-wall.mp4',
    modelUrl: '/models/city-wall.gltf',
    keyEvents: [
      '1983年，西安古城墙被列为全国重点文物保护单位',
      '1983-1993年，进行第一阶段大规模修复',
      '2005年，完成城墙环线贯通工程',
      '2014年，申报世界文化遗产'
    ],
    keyFigures: [
      { name: '西安市政府', role: '古城保护主导者', image: '/images/xian/xian-government.jpg' },
      { name: '文物专家团队', role: '提供技术支持', image: '/images/xian/experts.jpg' },
      { name: '工匠传承人', role: '技艺传承', image: '/images/xian/craftsman.jpg' }
    ],
    artifacts: [
      { name: '明代城砖', image: '/images/xian/ming-brick.jpg' },
      { name: '古城墙模型', image: '/images/xian/wall-model.jpg' },
      { name: '城墙砖雕', image: '/images/xian/wall-model.jpg' },
      { name: '古代城门', image: '/images/xian/ancient-gate.jpg' }
    ],
    locations: ['西安城墙', '南门', '永宁门', '碑林博物馆', '钟鼓楼'],
    regions: [
      { id: 'xian', name: '西安' }
    ],
    influences: [
      { targetId: 'urban-defense', type: 'military', strength: 1 },
      { targetId: 'architectural-heritage', type: 'cultural', strength: 0.9 }
    ],
    position: { x: 5, y: 0, z: 0 },
    tags: [
      { name: '《陕西省保护城墙办法》颁布（1959）', value: 100 },
      { name: '环城公园建设（1961年）', value: 98 },
      { name: '世界遗产预备名录（2006年）', value: 95 },
      { name: '《西安城墙保护条例》实施（2004年）', value: 94 },
      { name: '文物认养制度（2013年）', value: 93 },
      { name: '民国补城（1938年）', value: 93 },
      { name: '建国后首修', value: 92 },
      { name: '含光门遗址博物馆', value: 91 },
      { name: '护城河治理', value: 90 }
    ]
  }
};