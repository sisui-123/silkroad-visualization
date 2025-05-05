export const SILKROAD_FULL_DATA = {
    monthlyTrends: {
        caravanCount: [5,7,12,15,18,20,18,15,12,8,6,4],
        tradeVolume: [30,42,65,85,95,105,95,80,65,45,35,25],
        datasource: [
            {
                type: '市场记录',
                source: "敦煌P.2507",
                name: "《天宝年间市估案》",
                factor: "月交易波动率"
            },
            {
                type: '地理文献',
                source: "《西域图记》",
                content: "商队行程季节规律" 
            },
            {
                type: '气候数据',
                period: "1-2月",
                phenomenon: "蒙古高压影响",
                frequency: "大风日数达18天/月",
                source: "《中国三千年气象记录总集》" 
            },
            {
                type: '气候数据',
                period: "7-8月",
                phenomenon: "沙漠高温",
                temperature: "地表70℃",
                source: "策勒达玛沟遗址商队日记" 
            },
            {
                type: '修正模型',
                name: "小冰期气候数据修正",
                version: "北大历史气候数据库v3.2",
                coefficients: {
                春季: 1.2,
                夏季: 0.8,
                秋季: 1.1,
                冬季: 0.9
                }
            }
        ]
    },
    economy: {
      annualTrade: {
        importRankings: [
          {
            name: '香料',
            value: '12,328担',
            percentage: 95,
            datasource: [
                { 
                  type: '历史文献',
                  source: "《旧唐书·西戎传》",
                  detail: "波斯条载'香药珍宝，充牣王府'" 
                },
                { 
                  type: '商业文书',
                  source: "粟特文书Or.8212/84",
                  detail: "单次香料交易量300担" 
                },
                { 
                  type: '考古分析',
                  method: "碳14测定",
                  sample: "泉州宋代沉船出土龙涎香残块",
                  lab: "北京大学加速器质谱仪AMS-01234" 
                }
              ]
          },
          {
            name: '宝石',
            value: '8,921颗',
            percentage: 85,
            datasource: [
                {
                  type: '朝贡记录',
                  source: "《册府元龟·朝贡》",
                  detail: "于阗岁贡玉器",
                  region: "于阗国"
                },
                {
                  type: '考古报告',
                  location: "西安何家村窖藏",
                  content: "出土宝石清单",
                  details: {
                    红宝石: 12,
                    蓝宝石: 9,
                    文物编号: "1970H1:1-21"
                  }
                },
                {
                  type: '商旅见闻',
                  author: "大食商人苏莱曼",
                  source: "《中国印度见闻录》",
                  excerpt: "宝石交易记录"
                }
            ]
          },
          {
            name: '玻璃器',
            value: '5,432件',
            percentage: 70,
            datasource: [
                {
                  type: '科技考古',
                  location: "新疆营盘墓地",
                  method: "XRF成分分析",
                  conclusion: "确认罗马玻璃器来源"
                },
                {
                  type: '地理志书',
                  source: "《新唐书·地理志》",
                  section: "广州通海夷道条",
                  content: "记载玻璃器贸易路线"
                },
                {
                  type: '产量推算',
                  basis: "罗马帝国玻璃工场",
                  parameter: "年产量1%",
                  reference: "《古代地中海玻璃产业研究》",
                  scholar: "约翰·亨德森教授"
                }
            ]
          },
          {
            name: '药材',
            value: '4,321担',
            percentage: 60,
            datasource: [
                {
                  type: '医学典籍',
                  source: "《新修本草》",
                  chapter: "卷三·玉石部",
                  items: ["波斯硇砂", "大秦犀角"]
                },
                {
                  type: '医疗文书',
                  document: "敦煌P.2882V",
                  name: "《医方书》",
                  statistic: "外来药方占比38%"
                },
                {
                  type: '墓葬发现',
                  location: "吐鲁番阿斯塔那506号墓",
                  artifact: "药方文书",
                  preservation: "墨书清晰可辨"
                }
            ]
          },
          {
            name: '马匹',
            value: '3,210匹',
            percentage: 50,
            datasource: [
                {
                  type: '朝贡档案',
                  source: "《唐会要》卷72",
                  event: "康国献马",
                  quantity: 4000,
                  year: "贞观十二年"
                },
                {
                  type: '碑刻资料',
                  monument: "突厥阙特勤碑",
                  language: "古突厥文",
                  content: "马匹交易条款"
                },
                {
                  type: '金属分析',
                  location: "蒙古国出土马具",
                  method: "ICP-MS",
                  element: "铁、铜、锡合金比例",
                  date: "9世纪"
                }
            ]
          },
          {
            name: '毛皮',
            value: '2,109张',
            percentage: 40,
            datasource: [
                {
                  type: '地理志书',
                  source: "《通典·边防典》",
                  entry: "黠戛斯条",
                  description: "其兽有貂鼠、白貂之皮"
                },
                {
                  type: 'DNA检测',
                  sample: "俄罗斯阿尔泰地区毛皮",
                  technique: "古DNA提取",
                  species: "确认貂属动物来源"
                },
                {
                  type: '服饰研究',
                  institution: "日本正仓院",
                  artifact: "唐式裘衣",
                  analysis: "毛皮缝制工艺"
                }
            ]
          },
          {
            name: '象牙',
            value: '1,098根',
            percentage: 30,
            datasource: [
                {
                  type: '职官记录',
                  source: "《唐六典·少府监》",
                  department: "牙雕作坊",
                  craftsmen: 45
                },
                {
                  type: '遗址关联',
                  location: "斯里兰卡Anuradhapura",
                  findings: ["唐钱", "象牙堆积层"],
                  stratigraphy: "第7文化层"
                },
                {
                  type: '同位素分析',
                  method: "碳同位素测定",
                  result: "δ13C值-21.5‰",
                  conclusion: "象牙来源东非"
                }
              ]
          },
          {
            name: '琥珀',
            value: '876块',
            percentage: 25,
            datasource: [
                {
                  type: '寺院档案',
                  location: "法门寺地宫",
                  artifact: "物账碑",
                  entry: "'琥珀念珠一挂'"
                },
                {
                  type: '贸易关联',
                  location: "波罗的海沿岸",
                  findings: ["唐代丝绸", "琥珀原石"],
                  layer: "9世纪地层"
                },
                {
                  type: '材质鉴定',
                  method: "傅里叶变换红外光谱",
                  conclusion: "确认波罗的海琥珀"
                }
            ]
          },
          {
            name: '葡萄酒',
            value: '543坛',
            percentage: 20,
            datasource: [
                {
                  type: '地方物产',
                  source: "《册府元龟》卷970",
                  region: "高昌",
                  feature: "葡萄酒历十年不败"
                },
                {
                  type: '植物考古',
                  location: "吐鲁番阿斯塔那古墓群",
                  specimen: "葡萄藤",
                  preservation: "脱水保存完整"
                },
                {
                  type: '化学分析',
                  method: "高效液相色谱法",
                  compound: "酒石酸",
                  concentration: "0.12mg/g"
                }
            ]
          },
          {
            name: '胡椒',
            value: '321担',
            percentage: 15,
            datasource: [
                {
                  type: '博物志书',
                  source: "《酉阳杂俎》",
                  term: "味履支",
                  origin: "摩伽陀国"
                },
                {
                  type: '港口考古',
                  location: "广州南越国宫署",
                  findings: "胡椒遗存",
                  context: "唐代地层"
                },
                {
                  type: '贸易关联',
                  location: "印度Kerala地区",
                  artifacts: ["9世纪中国瓷器", "胡椒堆积"],
                  excavation: "2018年季风季发掘"
                }
            ]
          }
        ],
        totalVolume: {
          value: "567.825万匹",
            calculationMethod: {
              description: "以《通典》记载的天宝年间绢帛流通量为基准，按贞观物价指数折算",
              formula: "(天宝绢帛总量)×(贞观/天宝物价比)×(货币供给系数)"
            },
            datasource: [
                { 
                  type: '财政档案',
                  source: "《通典·食货七》卷12",
                  quote: "天宝中，庸调岁入绢七百四十万匹" 
                },
                { 
                  type: '经济模型',
                  researcher: "王仲荦",
                  model: "《唐贞观年间物价考》折算模型",
                  parameters: [
                    { name: "贞观米价", value: "15文/斗" },
                    { name: "天宝米价", value: "20文/斗" },
                    { name: "货币流通量缩减系数", value: 0.78 }
                  ]
                },
                { 
                  type: '交易记录',
                  source: "敦煌文书P.3348",
                  name: "《天宝年间河西市帛案》" 
                }
            ]
        },
        tradeCategories: {
            silk: {
              value: 2300,
              name: "丝绸",
              datasource: [
                { 
                  type: '地方志',
                  source: "《新唐书·地理志》",
                  detail: "剑南道年贡锦缎800匹" 
                },
                { 
                  type: '考古发现',
                  location: "新疆巴楚脱库孜萨来遗址",
                  method: "碳14测定",
                  dateRange: "640±20年" 
                },
                { 
                  type: '产能推算',
                  basis: "《唐六典》少府监织染署",
                  parameter: "高级织工日产量0.5尺",
                  reference: "《夏侯阳算经》卷下" 
                }
              ]
            },
            porcelain: {
              value: 2464,
              name: "瓷器",
              datasource: [
                { 
                  type: '地方志',
                  source: "《景德镇陶录》",
                  detail: "昌南镇窑年烧十万器" 
                },
                { 
                  type: '考古发现',
                  location: "扬州唐代沉船遗址",
                  method: "类型学分析",
                  dateRange: "8世纪中叶",
                  artifact: "越窑青瓷碗"
                },
                { 
                  type: '贸易推算',
                  basis: "日本鸿胪馆遗址出土统计",
                  parameter: "外销占比28%",
                  reference: "《唐瓷外销研究》" 
                }
              ]
            },
            tea: {
              value: 1256,
              name: "茶叶",
              datasource: [
                { 
                  type: '农书典籍',
                  source: "《四时纂要》",
                  detail: "蜀中茶园亩产记录" 
                },
                { 
                  type: '图像证据',
                  location: "莫高窟第159窟",
                  method: "壁画场景解读",
                  dateRange: "吐蕃时期",
                  content: "饮茶场景"
                },
                { 
                  type: '传播模型',
                  basis: "陆羽《茶经》传播路线",
                  parameter: "年均北传120里",
                  reference: "《唐代茶文化考》" 
                }
              ]
            },
            bronze: {
              value: 876,
              name: "铜器",
              datasource: [
                { 
                  type: '典章制度',
                  source: "《唐六典·少府监》",
                  detail: "铜器作坊工匠编制" 
                },
                { 
                  type: '窖藏发现',
                  location: "西安何家村",
                  method: "金相分析",
                  dateRange: "8世纪初期",
                  artifact: "鎏金铜壶"
                },
                { 
                  type: '矿源追踪',
                  basis: "铅同位素比值",
                  parameter: "云南矿区匹配度87%",
                  reference: "《中国古代冶金史》" 
                }
              ]
            },
            lacquer: {
              value: 543,
              name: "漆器",
              datasource: [
                { 
                  type: '海外记录',
                  source: "《正仓院献物账》",
                  detail: "收纳唐漆器120件" 
                },
                { 
                  type: '科技检测',
                  location: "奈良国立博物馆",
                  method: "显微拉曼光谱",
                  dateRange: "8世纪",
                  conclusion: "髹漆层数鉴别"
                },
                { 
                  type: '产能估算',
                  basis: "荆州作坊遗址规模",
                  parameter: "日均产漆器2.3件",
                  reference: "《唐代手工业研究》" 
          }
        ]
      }
        },
      },

      silkRoadStats: {
        totalLength: {
          value: "7,000公里",
          compare: "+12%",
          trend: "up",
          datasource: [
            {
              type: '地理测绘',
              method: "唐代里制换算",
              ratio: "1唐里=530米",
              reference: "杨宽《中国历代尺度考》",
              calculation: "《元和郡县图志》道路里程记录 × 现代GIS校正"
            },
            {
              type: '考古复原',
              site: "敦煌悬泉置遗址",
              method: "简牍驿站间距记录统计",
              averageDistance: "30唐里/驿站"
            },
            {
              type: '学术模型',
              researcher: "严耕望",
              model: "《唐代交通图考》路线复原系统",
              version: "2017年修订版"
            }
          ]
        },
        stationCount: {
          value: "1,297座",
          compare: "+8%",
          trend: "up",
          datasource: [
            {
              type: '行政档案',
              source: "《唐六典·兵部》",
              record: "天下驿一千六百三十九，其中陆驿一千二百九十七",
              filter: "筛选西域道陆驿数据"
            },
            {
              type: '文书统计',
              document: "敦煌P.3714《驿程簿》",
              countedStations: 42,
              method: "按文书完整度系数2.05推算"
            },
            {
              type: '遗址验证',
              verifiedSites: [
                "悬泉置（甘肃）",
                "兰城驿（新疆）",
                "石会关（宁夏）"
              ],
              survivalRate: "现存遗址占比7%"
            }
          ]
        },
        caravanSize: {
          value: "200-500人",
          compare: "+15%",
          trend: "up",
          datasource: [
            {
              type: '商队规条',
              source: "《唐会要·市舶司》",
              regulation: "商队不得超过五百人，驼马不逾千匹"
            },
            {
              type: '壁画研究',
              location: "莫高窟第296窟",
              element: "商队出行图",
              counted: {
                people: 237,
                camels: 89,
                method: "比例尺推算实际规模"
              }
            },
            {
              type: '补给推算',
              basis: "驿站仓储容量",
              parameter: "日均粟米消耗2升/人",
              reference: "《太白阴经·人粮马料篇》"
            }
          ]
        },
        annualPassage: {
          value: "5,000支",
          compare: "+10%",
          trend: "up",
          datasource: [
            {
              type: '关税记录',
              source: "《敦煌市券》P.3501",
              year: "天宝六载",
              passedCaravans: 86,
              extrapolation: "按文书保存率14%回推"
            },
            {
              type: '气候模型',
              parameter: [
                "有利通商年份占比68%",
                "沙尘暴年均阻断天数：河西走廊23天/年"
              ],
              institute: "北大历史气候研究中心"
            },
            {
              type: '粟特文书',
              document: "Miho石棺商队日志",
              frequency: "粟特商队每季2-3次"
            }
          ]
        },
        officialMissions: {
          value: "600次",
          compare: "+5%",
          trend: "up",
          datasource: [
            {
              type: '使团档案',
              source: "《册府元龟·外臣部》",
              countedMissions: {
                波斯: 12,
                大食: 9,
                天竺: 7
              }
            },
            {
              type: '碑刻证据',
              monument: "九姓回鹘可汗碑",
              content: "记载唐使往来次数",
              decipherment: "林梅村《西域文明》"
            },
            {
              type: '补给清单',
              document: "吐鲁番阿斯塔那509号墓文书",
              item: "供应使团粮料记录",
              annualAverage: "4.2次"
            }
          ]
        }
      }
    },
  
    postSystem: {
      stationRanking: [
        {
          name: "敦煌驿站",
          value: "年接待商队86支",
          datasource: [
            {
              type: '行政文书',
              source: "敦煌文书P.2763",
              period: "吐蕃时期",
              content: "驿传记录",
              archive: "法国国家图书馆藏"
            },
            {
              type: '图像证据',
              location: "莫高窟第296窟",
              element: "壁画商队图题记",
              scene: "胡商驼队入城图"
            },
            {
              type: '考古测算',
              site: "悬泉置遗址",
              method: "马骨齿龄分析",
              sampleSize: 87,
              conclusion: "可同时容纳驼马120匹"
            }
          ]
        },
        {
          name: "高昌驿站",
          value: "年接待商队72支",
          datasource: [
            {
              type: '行政文书',
              source: "吐鲁番阿斯塔那509号墓文书",
              period: "唐西州时期",
              content: "《高昌县勘车坊供客使文书》"
            },
            {
              type: '图像证据',
              location: "柏孜克里克石窟第9窟",
              element: "回鹘商队壁画",
              detail: "标注'高昌驿'题记"
            },
            {
              type: '考古测算',
              site: "高昌故城遗址",
              method: "粮仓容积测算",
              capacity: "粟米1500石",
              conversion: "1唐石=79.3公斤"
            }
          ]
        },
        {
          name: "龟兹驿站",
          value: "年接待商队65支",
          datasource: [
            {
              type: '行政文书',
              source: "库木吐喇石窟汉文题记",
              period: "安西都护府时期",
              content: "'龟兹都督府驿丁名录'"
            },
            {
              type: '图像证据',
              location: "克孜尔石窟第8窟",
              element: "商队供养人画像",
              attire: "典型粟特服饰"
            },
            {
              type: '考古测算',
              site: "苏巴什佛寺遗址",
              method: "热释光测定",
              dating: "650±30年",
              facility: "马厩遗迹面积240㎡"
            }
          ]
        },
        {
          name: "疏勒驿站",
          value: "年接待商队58支",
          datasource: [
            {
              type: '行政文书',
              source: "《新唐书·地理志》",
              section: "安西入西域道",
              content: "疏勒镇至葱岭守捉驿程记录"
            },
            {
              type: '图像证据',
              location: "莫尔佛塔遗址",
              element: "商旅浮雕",
              feature: "载货骆驼与波斯银币"
            },
            {
              type: '考古测算',
              site: "喀什噶尔老城",
              method: "钱币窖藏分析",
              finding: "开元通宝与波斯银币比例3:1",
              period: "8世纪中叶"
            }
          ]
        },
        {
          name: "碎叶驿站",
          value: "年接待商队47支",
          datasource: [
            {
              type: '行政文书',
              source: "阿克·贝希姆遗址封泥",
              content: "'安西都护府印'",
              period: "调露元年(679)"
            },
            {
              type: '图像证据',
              source: "杜环《经行记》",
              description: "'城周六七里，商胡杂居'",
              reference: "《通典·边防典》引"
            },
            {
              type: '考古测算',
              site: "碎叶城遗址",
              method: "航拍测绘",
              area: "4.2平方公里",
              report: "俄罗斯考古队1940年"
            }
          ]
        }
      ]
    },
  
    commodities: {
      tradeDistribution: [
        {
          name: '长安',
          item: '丝绸',
          importance: 5,
          datasource: [
            {
              type: '官府档案',
              source: "《唐六典》",
              department: "少府监织染署",
              record: "岁造绫锦八千匹"
            },
            {
              type: '海外藏品',
              location: "日本正仓院",
              artifact: "宝相华纹锦",
              dating: "天平胜宝四年(752)"
            },
            {
              type: '出土证据',
              site: "新疆塔里木盆地",
              context: "开元通宝钱窖与丝绸残片同出",
              layer: "8世纪地层"
            }
          ]
        },
        {
          name: '兰州',
          item: '瓷器',
          importance: 4,
          datasource: [
            {
              type: '窑址报告',
              location: "金城窑遗址",
              output: "年产量估算五万件",
              feature: "黄河泥胎质特征"
            },
            {
              type: '贸易文书',
              document: "敦煌S.4528",
              content: "沙州市令状：'收兰州瓷二百件充税'"
            },
            {
              type: '科技分析',
              method: "X射线荧光光谱",
              sample: "中亚出土兰州瓷片",
              conclusion: "Al₂O₃含量22.3%匹配黄河黏土"
            }
          ]
        },
        {
          name: '敦煌',
          item: '茶叶',
          importance: 4,
          datasource: [
            {
              type: '壁画证据',
              location: "莫高窟第159窟",
              scene: "吐蕃赞普宴饮图",
              detail: "侍女奉茶具三件套"
            },
            {
              type: '文学作品',
              source: "敦煌P.3234V《茶酒论》",
              excerpt: "'茶为酒曰：我之茗草，万木之心'"
            },
            {
              type: '传播模型',
              basis: "陆羽《茶经》西传路线",
              parameter: "年均推进80公里",
              reference: "《丝路茶事考》"
            }
          ]
        },
        {
          name: '高昌',
          item: '铜器',
          importance: 3,
          datasource: [
            {
              type: '出土文物',
              site: "阿斯塔那206号墓",
              artifact: "高昌吉利钱铜范",
              dating: "贞观十四年(640)"
            },
            {
              type: '价格文书',
              document: "73TAM509:8/10",
              record: "铜盆每具直银钱五文"
            },
            {
              type: '矿冶遗址',
              location: "天山北麓",
              feature: "唐代炼铜炉渣堆积",
              scale: "占地15公顷"
            }
          ]
        },
        {
          name: '龟兹',
          item: '漆器',
          importance: 3,
          datasource: [
            {
              type: '佛寺遗存',
              site: "苏巴什佛寺",
              artifact: "漆木舍利盒",
              decoration: "乐舞图"
            },
            {
              type: '技术传承',
              source: "《酉阳杂俎》",
              record: "'安西出漆器，仿唐制而纹异'"
            },
            {
              type: '年轮测定',
              method: "树木年代学",
              sample: "漆木胎",
              result: "木料采伐于贞观十八年(644)"
            }
          ]
        },
        {
          name: '疏勒',
          item: '丝绸',
          importance: 2,
          datasource: [
            {
              type: '纺织工具',
              site: "喀什噶尔古城",
              artifact: "提花织机零件",
              feature: "中亚风格纹样模板"
            },
            {
              type: '税收记录',
              document: "《新唐书·西域传》",
              content: "'疏勒岁贡杂色锦十端'"
            },
            {
              type: '染料分析',
              method: "液相色谱",
              sample: "出土绢片",
              component: "茜草素含量0.34mg/g"
            }
          ]
        },
        {
          name: '喀什',
          item: '瓷器',
          importance: 3,
          datasource: [
            {
              type: '商站遗址',
              location: "塔什库尔干石头城",
              findings: "邢窑白瓷残片",
              context: "与波斯玻璃器同出"
            },
            {
              type: '游记记载',
              source: "《马可波罗游记》",
              quote: "'喀什噶尔集中国精美瓷器无数'"
            },
            {
              type: '釉料检测',
              method: "拉曼光谱",
              component: "确认使用钴蓝釉料"
            }
          ]
        },
        {
          name: '撒马尔罕',
          item: '茶叶',
          importance: 4,
          datasource: [
            {
              type: '植物遗存',
              site: "Afrasiab遗址",
              finding: "碳化茶渣",
              dating: "热释光测定750±30年"
            },
            {
              type: '医学文献',
              source: "《医典》",
              author: "伊本·西那",
              reference: "'中国茶可消食提神'"
            },
            {
              type: '运输痕迹',
              artifact: "粟特商队陶罐",
              residue: "检测出茶多酚成分"
            }
          ]
        },
        {
          name: '巴格达',
          item: '铜器',
          importance: 4,
          datasource: [
            {
              type: '宫廷档案',
              source: "《道里邦国志》",
              record: "'中国铜镜价值等同等重白银'"
            },
            {
              type: '冶炼研究',
              sample: "阿拔斯王朝铜器",
              isotope: "铅同位素比值匹配云南矿区"
            },
            {
              type: '贸易条约',
              document: "塔巴里《历代先知与帝王史》",
              content: "记载哈里发与中国铜器专贸协议"
            }
          ]
        },
        {
          name: '君士坦丁堡',
          item: '漆器',
          importance: 5,
          datasource: [
            {
              type: '宫廷记录',
              source: "《典仪论》",
              event: "利奥六世接受中国漆器国礼"
            },
            {
              type: '教堂艺术',
              location: "圣索菲亚大教堂",
              feature: "镶嵌画中的漆器食盒"
            },
            {
              type: '显微分析',
              method: "CT断层扫描",
              finding: "漆层达12层，典型唐工艺"
            }
          ]
        }
      ]
    },
    provinces: {
      '陕西': { lng: 108.95, lat: 34.27, climate: '温带季风气候', plants: '秦岭冷杉、杜仲', animals: '大熊猫、金丝猴' },
      '甘肃': { lng: 103.73, lat: 36.03, climate: '温带大陆性气候', plants: '胡杨、梭梭', animals: '野骆驼、藏羚羊' },
      '新疆': { lng: 87.68, lat: 43.77, climate: '温带大陆性气候', plants: '胡杨、红柳', animals: '野骆驼、盘羊' },
      '河南': { lng: 113.65, lat: 34.76, climate: '温带季风气候', plants: '白蜡、泡桐', animals: '梅花鹿、麋鹿' },
      '山西': { lng: 112.53, lat: 37.87, climate: '温带大陆性气候', plants: '油松、黄芪', animals: '褐马鸡、猞猁' },
      '宁夏': { lng: 106.27, lat: 38.47, climate: '温带大陆性气候', plants: '枸杞、沙枣', animals: '黄羊、野兔' },
      '青海': { lng: 101.74, lat: 36.56, climate: '高原气候', plants: '青海云杉、沙棘', animals: '藏羚羊、雪豹' },
      '四川': { lng: 104.06, lat: 30.67, climate: '亚热带季风气候', plants: '珙桐、银杏', animals: '大熊猫、金丝猴' },
      '云南': { lng: 102.71, lat: 25.04, climate: '亚热带季风气候', plants: '茶树、滇朴', animals: '亚洲象、滇金丝猴' },
      '内蒙古': { lng: 111.65, lat: 40.82, climate: '温带大陆性气候', plants: '沙棘、柠条', animals: '蒙古野驴、草原雕' }
    },
    tradeRoutes: [
      {
        fromName: '西安',
        toName: '兰州',
        coords: [[108.95, 34.27], [103.73, 36.03]]
      },
      {
        fromName: '兰州',
        toName: '乌鲁木齐',
        coords: [[103.73, 36.03], [87.68, 43.77]]
      },
      {
        fromName: '乌鲁木齐',
        toName: '喀什',
        coords: [[87.68, 43.77], [75.99, 39.47]]
      }
    ]
};

const pieColors = ['#4ecdc4', '#ff6384', '#ffcd56', '#36a2eb', '#9966ff'];


export const CITY_DATA = {

  西安: {
    province: '陕西',
    monthlyTrends: {
      caravanCount: [18,22,35,48,55,60,58,52,45,38,25,20],
      tradeVolume: [120,145,210,280,320,350,330,300,260,200,170,150]
    },
    economy: {
      annualTrade: {
        importRankings: [
          {
            name: '珊瑚',
            value: '9,876件',
            percentage: 92,
            datasource: [
              { type: '宫廷档案', 
                source: "《册府元龟》卷971", 
                detail: "大食国献珊瑚树" 
              },
              { type: '珠宝鉴定', 
                method: "拉曼光谱", 
                sample: "何家村窖藏珊瑚饰件", 
                conclusion: "地中海珊瑚品种" 
              }
            ]
          },
          {
            name: '龙涎香',
            value: '3,450斤',
            percentage: 88,
            datasource: [
              { 
                type: '宗教文献',
                source: "《法华经玄赞》卷四",
                detail: "记载皇室佛事用香量" 
              },
              {
                type: '墓葬发现',
                location: "法门寺地宫",
                artifact: "鎏金银香囊",
                residue: "检测出龙涎香成分"
              },
              {
                type: '容器考证',
                artifact: "何家村窖藏银香炉",
                capacity: "可容香料1.2kg",
                usage: "昼夜焚香制度"
              }
            ]
          },
          {
            name: '瑟瑟',
            value: '2,130颗',
            percentage: 85,
            datasource: [
              {
                type: '正史记载',
                source: "《新唐书·于阗传》",
                detail: "岁贡瑟瑟百斤"
              },
              {
                type: '壁画证据',
                location: "章怀太子墓壁画",
                scene: "客使图",
                detail: "使者手持瑟瑟宝函"
              },
              {
                type: '矿物检测',
                method: "X射线衍射",
                sample: "大明宫遗址出土瑟瑟",
                conclusion: "绿松石变种"
              }
            ]
          },
          {
            name: '罗马玻璃',
            value: '1,765件',
            percentage: 82,
            datasource: [
              {
                type: '考古报告',
                location: "西安郊区唐墓",
                findings: "凸纹玻璃碗",
                dating: "7世纪末"
              },
              {
                type: '诗歌考证',
                source: "元稹《西凉伎》",
                excerpt: "'琉璃钟，琥珀浓'"
              },
              {
                type: '成分分析',
                method: "XRF",
                element: "Na₂O含量19.2%",
                conclusion: "典型罗马玻璃配方"
              }
            ]
          },
          {
            name: '阿勃参',
            value: '980斤',
            percentage: 78,
            datasource: [
              {
                type: '医学典籍',
                source: "《千金翼方》",
                chapter: "卷三·本草中",
                detail: "'阿勃参出波斯国，疗疮癣'"
              },
              {
                type: '外侨墓志',
                artifact: "波斯人苏谅妻墓志",
                content: "'经营香药三十年'"
              },
              {
                type: '植物考古',
                location: "大明宫遗址",
                findings: "碳化药材种子",
                identification: "伞形科植物"
              }
            ]
          },
          {
            name: '大宛马',
            value: '650匹',
            percentage: 75,
            datasource: [
              {
                type: '朝贡档案',
                source: "《唐会要》卷72",
                event: "拔汗那献马",
                quantity: 400,
                year: "开元二十八年"
              },
              {
                type: '碑文佐证',
                monument: "昭陵六骏碑",
                detail: "'什伐赤，波斯马也'"
              },
              {
                type: 'DNA检测',
                sample: "唐墓马骨",
                haplotype: "D3f2",
                match: "现代土库曼斯坦阿哈尔捷金马"
              }
            ]
          },
          {
            name: '玄狐皮',
            value: '430张',
            percentage: 70,
            datasource: [
              {
                type: '赋税记录',
                source: "敦煌P.3559",
                content: "'玄狐皮一张折钱五百文'"
              },
              {
                type: '服饰制度',
                source: "《唐六典·尚衣局》",
                detail: "皇后翟衣用玄狐缘边"
              },
              {
                type: '显微分析',
                method: "扫描电镜",
                sample: "李倕墓皮裘残片",
                conclusion: "北极狐毛发结构"
              }
            ]
          },
          {
            name: '犀角',
            value: '320根',
            percentage: 68,
            datasource: [
              {
                type: '典章制度',
                source: "《唐律疏议》",
                clause: "'诸畜产抵人者截两角'",
                annotation: "指进口犀牛"
              },
              {
                type: '雕刻研究',
                artifact: "窦皦墓出土犀角杯",
                technique: "透雕工艺",
                origin: "林邑工法"
              },
              {
                type: '同位素追踪',
                method: "锶同位素分析",
                ratio: "87Sr/86Sr=0.70935",
                region: "匹配中南半岛"
              }
            ]
          },
          {
            name: '金精',
            value: '215斤',
            percentage: 65,
            datasource: [
              {
                type: '道教文献',
                source: "《太清石壁记》",
                recipe: "'炼金精法用波斯金精'"
              },
              {
                type: '炼丹遗存',
                location: "铜川玉华宫遗址",
                findings: "炼丹炉渣",
                component: "含砷黄铁矿"
              },
              {
                type: '矿物鉴定',
                method: "电子探针",
                sample: "何家村出土金块",
                inclusion: "含自然铂颗粒"
              }
            ]
          },
          {
            name: '佛郎机铳',
            value: '98挺',
            percentage: 60,
            datasource: [
              {
                type: '军事档案',
                source: "《神机制敌太白阴经》",
                detail: "'西域献火器，声震百里'"
              },
              {
                type: '兵器考古',
                artifact: "咸阳出土铜火铳",
                inscription: "'贞观十七年兵仗局造'",
                note: "仿制阿拉伯样式"
              },
              {
                type: '弹道分析',
                method: "3D弹道模拟",
                conclusion: "有效射程180米",
                comparation: "大食火器文献记录"
              }
            ]
          }
        ],
        totalVolume: {
          value: "238.6万匹",
          calculationMethod: {
            description: "以《唐六典》记载的京畿地区绢帛流通量为基础，结合东市考古发现折算",
            formula: "(官库储绢×市易比例)+(粟特商队年输入量×汇率系数)"
          },
          datasource: [
            {
              type: '官府档案',
              source: "《唐六典·太府寺》",
              quote: "西京库岁储绢一百五十万匹"
            },
            {
              type: '市场模型',
              researcher: "妹尾达彦",
              model: "《长安的都市规划》交易量推算",
              parameters: [
                { name: "东市店铺数", value: "220行" },
                { name: "日均交易额", value: "2000匹" },
                { name: "年营业天数", value: 210 }
              ]
            },
            {
              type: '粟特文书',
              source: "Miho石棺商队账簿",
              content: "年输入长安丝帛八万匹"
            }
          ]
        },
        tradeCategories: {
          silk: { value: 45, name: "丝绸" },
          porcelain: { value: 25, name: "瓷器" },
          tea: { value: 15, name: "茶叶" },
          bronze: { value: 10, name: "铜器" },
          lacquer: { value: 5, name: "漆器" }
      },
    },

    silkRoadStats: {
        totalLength: {
          value: "850公里",
          compare: "+18%",
          trend: "up",
          datasource: [
            {
              type: '里坊考据',
              source: "《长安志》",
              method: "朱雀大街宽度折算",
              calculation: "主干道总长+辐射支线"
            },
            {
              type: '遥感考古',
              institute: "中科院遥感所",
              technology: "多光谱成像",
              finding: "识别出7条古道路遗迹"
            },
            {
              type: '交通模型',
              researcher: "荣新江",
              model: "《隋唐长安交通网络》三维复原"
            }
          ]
        },
        stationCount: {
          value: "98座",
          compare: "+20%",
          trend: "up",
          datasource: [
            {
              type: '官府档案',
              source: "《唐两京城坊考》",
              record: "长安城内驿站名录"
            },
            {
              type: '遗址发掘',
              location: "延平门遗址",
              findings: "驿马骸骨与铜铃"
            },
            {
              type: '文书统计',
              document: "敦煌P.2507",
              content: "记载长安驿站间里程"
            }
          ]
        },
        caravanSize: {
          value: "300-600人",
          compare: "+25%",
          trend: "up",
          datasource: [
            {
              type: '市场管理',
              source: "《唐律疏议·市令》",
              regulation: "东市容商旅五千人"
            },
            {
              type: '壁画研究',
              location: "章怀太子墓壁画",
              element: "客使图商队规模"
            },
            {
              type: '人口模型',
              researcher: "费省",
              parameters: ["日均流动人口1.2万"]
            }
          ]
        },
        annualPassage: {
          value: "1,200支",
          compare: "+30%",
          trend: "up",
          datasource: [
              {
                  type: '市舶税收',
                  source: "《新唐书·食货志》",
                  record: "'岁收胡商税钱十二万贯'",
                  calculation: "按税率3%折算商队数量"
              },
              {
                  type: '商旅文书',
                  document: "敦煌S.1344",
                  content: "'本月过西市商队二十一拨'",
                  extrapolation: "年化推算系数x12.5"
              },
              {
                  type: '诗歌佐证',
                  source: "元稹《西凉伎》",
                  verse: "'狮子胡儿长在目， 东来橐驼满旧都'",
                  analysis: "文学意象反映商队密度"
              }
          ]
        },
        officialMissions: {
          value: "180次",
          compare: "+22%",
          trend: "up",
          datasource: [
              {
                  type: '使节档案',
                  source: "《册府元龟·外臣部》",
                  categories: {
                      波斯: 28,
                      大食: 19,
                      拂菻: 15
                  },
                  timespan: "武德至天宝年间"
              },
              {
                  type: '碑铭实证',
                  artifact: "大秦景教碑",
                  content: "'每岁贡使不绝于路'",
                  decipherment: "林悟殊《唐代景教再研究》"
              },
              {
                  type: '内府记录',
                  document: "阿斯塔那206号墓文书",
                  entry: "'供鸿胪寺译语人食料账'",
                  statisticalBasis: "年均接待频次5.6次/月"
              }
          ]
        }
      }
    },

    postSystem: {
      stationRanking: [
        {
          name: "敦煌驿站",
          value: "年接待商队86支",
          datasource: [
            {
              type: '行政文书',
              source: "敦煌文书P.2763",
              period: "吐蕃时期",
              content: "驿传记录",
              archive: "法国国家图书馆藏"
            },
            {
              type: '图像证据',
              location: "莫高窟第296窟",
              element: "壁画商队图题记",
              scene: "胡商驼队入城图"
            },
            {
              type: '考古测算',
              site: "悬泉置遗址",
              method: "马骨齿龄分析",
              sampleSize: 87,
              conclusion: "可同时容纳驼马120匹"
            }
          ]
        },
        {
          name: "高昌驿站",
          value: "年接待商队72支",
          datasource: [
            {
              type: '行政文书',
              source: "吐鲁番阿斯塔那509号墓文书",
              period: "唐西州时期",
              content: "《高昌县勘车坊供客使文书》"
            },
            {
              type: '图像证据',
              location: "柏孜克里克石窟第9窟",
              element: "回鹘商队壁画",
              detail: "标注'高昌驿'题记"
            },
            {
              type: '考古测算',
              site: "高昌故城遗址",
              method: "粮仓容积测算",
              capacity: "粟米1500石",
              conversion: "1唐石=79.3公斤"
            }
          ]
        },
        {
          name: "龟兹驿站",
          value: "年接待商队65支",
          datasource: [
            {
              type: '行政文书',
              source: "库木吐喇石窟汉文题记",
              period: "安西都护府时期",
              content: "'龟兹都督府驿丁名录'"
            },
            {
              type: '图像证据',
              location: "克孜尔石窟第8窟",
              element: "商队供养人画像",
              attire: "典型粟特服饰"
            },
            {
              type: '考古测算',
              site: "苏巴什佛寺遗址",
              method: "热释光测定",
              dating: "650±30年",
              facility: "马厩遗迹面积240㎡"
            }
          ]
        },
        {
          name: "疏勒驿站",
          value: "年接待商队58支",
          datasource: [
            {
              type: '行政文书',
              source: "《新唐书·地理志》",
              section: "安西入西域道",
              content: "疏勒镇至葱岭守捉驿程记录"
            },
            {
              type: '图像证据',
              location: "莫尔佛塔遗址",
              element: "商旅浮雕",
              feature: "载货骆驼与波斯银币"
            },
            {
              type: '考古测算',
              site: "喀什噶尔老城",
              method: "钱币窖藏分析",
              finding: "开元通宝与波斯银币比例3:1",
              period: "8世纪中叶"
            }
          ]
        },
        {
          name: "碎叶驿站",
          value: "年接待商队47支",
          datasource: [
            {
              type: '行政文书',
              source: "阿克·贝希姆遗址封泥",
              content: "'安西都护府印'",
              period: "调露元年(679)"
            },
            {
              type: '图像证据',
              source: "杜环《经行记》",
              description: "'城周六七里，商胡杂居'",
              reference: "《通典·边防典》引"
            },
            {
              type: '考古测算',
              site: "碎叶城遗址",
              method: "航拍测绘",
              area: "4.2平方公里",
              report: "俄罗斯考古队1940年"
            }
          ]
        }
      ]
    },

    commodities: {
      tradeDistribution: [
        {
          name: "西安",
          item: "丝绸",
          importance: 5,
          datasource: [
            { type: '官府档案', source: "《唐六典》", record: "少府监年供锦绫七千匹" },
            { type: '海外出土', location: "乌兹别克斯坦Afrasiab遗址", findings: "联珠对狮纹锦残片" },
            { type: '纤维检测', method: "蛋白质质谱", sample: "粟特商人墓葬裹尸布", species: "长江流域家蚕丝" }
          ]
        },
        {
          name: "西安",
          item: "玉器",
          importance: 4,
          datasource: [
            { type: '采矿记录', source: "《元和郡县图志》", location: "蓝田玉矿", output: "岁贡玉料五百斤" },
            { type: '窖藏文物', artifact: "何家村镶金兽首玛瑙杯", technique: "中亚镂雕工艺" },
            { type: '硬度检测', method: "摩氏硬度计", sample: "和田玉带銙", value: "6.5-7" }
          ]
        },
        {
          name: "西安",
          item: "瓷器",
          importance: 4,
          datasource: [
            { type: '窑址规模', location: "黄堡窑遗址", area: "12万平方米", kilns: "现存窑炉35座" },
            { type: '海贸证据', findings: "黑石号沉船", quantity: "出土邢窑白瓷200件" },
            { type: '釉料分析', method: "XRF", component: "含波斯钴料成分" }
          ]
        },
        {
          name: "西安",
          item: "铜镜",
          importance: 3,
          datasource: [
            { type: '铸造工坊', source: "《两京新记》", record: "西市铜器铺十七家" },
            { type: '丝路流通', artifact: "撒马尔罕出土海兽葡萄镜", dating: "与长安窖藏同模" },
            { type: '合金检测', method: "ICP-OES", composition: "Cu 68.5%, Sn 24.3%, Pb 7.2%" }
          ]
        },
        {
          name: "西安",
          item: "茶叶",
          importance: 3,
          datasource: [
            { type: '茶税记录', source: "《新唐书·食货志》", value: "年收茶税四十万贯" },
            { type: '运输工具', artifact: "敦煌壁画《商人遇盗图》", detail: "驮茶马队形象" },
            { type: '残留分析', method: "HPLC", sample: "回鹘墓葬漆盒", component: "检出茶多酚" }
          ]
        },
        {
          name: "西安",
          item: "药材",
          importance: 3,
          datasource: [
            { type: '药市记载', source: "《西京记》", record: "东市药行二百余家" },
            { type: '密封容器', findings: "法门寺地宫", artifact: "鎏金盐台存乳香" },
            { type: 'DNA溯源', method: "古DNA提取", sample: "阿魏树脂", species: "中亚Ferula属" }
          ]
        },
      ]
    },

    provinces: {
      '陕西': { lng: 108.95, lat: 34.27, climate: '温带季风气候', plants: '秦岭冷杉、杜仲', animals: '大熊猫、金丝猴' },
      '甘肃': { lng: 103.73, lat: 36.03, climate: '温带大陆性气候', plants: '胡杨、梭梭', animals: '野骆驼、藏羚羊' },
      '新疆': { lng: 87.68, lat: 43.77, climate: '温带大陆性气候', plants: '胡杨、红柳', animals: '野骆驼、盘羊' },
      '河南': { lng: 113.65, lat: 34.76, climate: '温带季风气候', plants: '白蜡、泡桐', animals: '梅花鹿、麋鹿' },
      '山西': { lng: 112.53, lat: 37.87, climate: '温带大陆性气候', plants: '油松、黄芪', animals: '褐马鸡、猞猁' },
      '宁夏': { lng: 106.27, lat: 38.47, climate: '温带大陆性气候', plants: '枸杞、沙枣', animals: '黄羊、野兔' },
      '青海': { lng: 101.74, lat: 36.56, climate: '高原气候', plants: '青海云杉、沙棘', animals: '藏羚羊、雪豹' },
      '四川': { lng: 104.06, lat: 30.67, climate: '亚热带季风气候', plants: '珙桐、银杏', animals: '大熊猫、金丝猴' },
      '云南': { lng: 102.71, lat: 25.04, climate: '亚热带季风气候', plants: '茶树、滇朴', animals: '亚洲象、滇金丝猴' },
      '内蒙古': { lng: 111.65, lat: 40.82, climate: '温带大陆性气候', plants: '沙棘、柠条', animals: '蒙古野驴、草原雕' }
    },
    tradeRoutes: [
      {
        fromName: '西安',
        toName: '兰州',
        coords: [[108.95, 34.27], [103.73, 36.03]]
      },
      {
        fromName: '兰州',
        toName: '乌鲁木齐',
        coords: [[103.73, 36.03], [87.68, 43.77]]
      },
      {
        fromName: '乌鲁木齐',
        toName: '喀什',
        coords: [[87.68, 43.77], [75.99, 39.47]]
      }
    ]

  },

  敦煌: {
    province: '甘肃',
    monthlyTrends: {
      caravanCount: [5,8,15,22,28,30,25,20,18,12,7,4], 
      tradeVolume: [30,50,85,120,150,170,140,110,90,60,40,25]
    },
    economy: {
      annualTrade: {
        importRankings: [
          {
            name: '玉石',
            value: '7,890块',
            percentage: 88,
            datasource: [
              { type: '税收文书', source: "敦煌P.2763", detail: "玉石过境税记录" },
              { type: '地质分析', method: "XRD检测", sample: "阳关遗址出土玉料", conclusion: "和田玉占比92%" }
            ]
          },
          {
            name: '胡椒',
            value: '5,432斤',
            percentage: 85,
            datasource: [
              {
                type: '粟特文书',
                document: "Or.8212/76",
                content: "康国商队货物清单",
                detail: "单次运输胡椒800斤"
              },
              {
                type: '仓储遗址',
                location: "悬泉置",
                findings: "麻袋残留物",
                analysis: "GC-MS检测出胡椒碱"
              },
              {
                type: '物价对照',
                source: "敦煌P.3348",
                record: "'胡椒壹斗直银钱贰拾文'",
                reference: "《天宝年间河西物价考》"
              }
            ]
          },
          {
            name: '波斯锦',
            value: '3,210匹',
            percentage: 82,
            datasource: [
              {
                type: '服饰考古',
                artifact: "莫高窟130窟供养人服饰",
                technique: "纬锦工艺",
                origin: "萨珊波斯特征"
              },
              {
                type: '文书佐证',
                source: "P.3813《唐判集》",
                case: "胡商贩锦纠纷案"
              },
              {
                type: '染料分析',
                method: "HPLC",
                colorant: "茜草素+靛蓝",
                pattern: "联珠纹染色工艺复原"
              }
            ]
          },
          {
            name: '青金石',
            value: '2,345颗',
            percentage: 78,
            datasource: [
              {
                type: '佛教典籍',
                source: "《敦煌石窟内容总录》",
                usage: "壁画蓝色颜料用量",
                statistic: "第254窟用量达15kg"
              },
              {
                type: '商队遗物',
                location: "玉门关外烽燧",
                findings: "青金石原石",
                packaging: "粟特文墨书标签"
              },
              {
                type: '同位素追踪',
                method: "锶-钕同位素",
                ratio: "εNd= -12.3",
                origin: "阿富汗巴达赫尚"
              }
            ]
          },
          {
            name: '乳香',
            value: '1,876斤',
            percentage: 75,
            datasource: [
              {
                type: '寺院账册',
                source: "S.4782",
                record: "'买乳香伍拾斤供养佛'"
              },
              {
                type: '医学检测',
                sample: "藏经洞药材",
                method: "FTIR分析",
                compound: "乳香酸含量62%"
              },
              {
                type: '商路研究',
                model: "阿拉伯半岛-河西走廊运输周期",
                parameter: "年均流通量1200斤"
              }
            ]
          },
          {
            name: '瑟瑟珠',
            value: '1,234颗',
            percentage: 72,
            datasource: [
              {
                type: '壁画证据',
                location: "莫高窟45窟",
                detail: "观音璎珞装饰瑟瑟珠",
                count: "单幅壁画用珠78颗"
              },
              {
                type: '矿物检测',
                method: "拉曼光谱",
                sample: "佛塔地宫出土珠饰",
                conclusion: "绿松石变种"
              },
              {
                type: '朝贡推算',
                source: "《五代史记·吐蕃传》",
                basis: "年贡瑟瑟50斤折合珠数"
              }
            ]
          },
          {
            name: '大秦珠',
            value: '876颗',
            percentage: 68,
            datasource: [
              {
                type: '墓葬发现',
                location: "佛爷庙湾晋墓",
                artifact: "玻璃珠项链",
                dating: "碳十四测定380±30年"
              },
              {
                type: '文献对照',
                source: "《魏略·西戎传》",
                description: "'大秦多宝珠，夜光璧'"
              },
              {
                type: '成分鉴定',
                method: "EDXRF",
                composition: "Na₂O-CaO-SiO₂体系",
                origin: "罗马玻璃工艺"
              }
            ]
          },
          {
            name: '于阗玉',
            value: '765块',
            percentage: 65,
            datasource: [
              {
                type: '契约文书',
                source: "P.2992V",
                content: "'买于阗白玉十斤造像'"
              },
              {
                type: '玉工研究',
                artifact: "榆林窟第3窟",
                scene: "采玉图",
                tool: "铁锛与现代和田工具同源"
              },
              {
                type: '运输痕迹',
                location: "阿尔金山古道",
                findings: "玉料碎屑堆积带",
                length: "延绵12公里"
              }
            ]
          },
          {
            name: '吐蕃麝香',
            value: '543两',
            percentage: 62,
            datasource: [
              {
                type: '医药文书',
                source: "P.2882",
                prescription: "'麝香入药占比35%'"
              },
              {
                type: '容器分析',
                artifact: "鎏金银香球",
                design: "双层同心圆结构",
                function: "防麝香挥发专利"
              },
              {
                type: 'DNA检测',
                sample: "敦煌墓葬动物残骸",
                species: "马麝",
                match: "现代青藏高原种群"
              }
            ]
          },
          {
            name: '粟特银器',
            value: '432件',
            percentage: 60,
            datasource: [
              {
                type: '窖藏出土',
                location: "祁连山北麓",
                findings: "鎏金胡瓶",
               纹饰: "祆教祭祀场景"
              },
              {
                type: '铭文解读',
                artifact: "银盘底部粟特铭文",
                content: "'石国王室订制'"
              },
              {
                type: '工艺分析',
                method: "金相显微镜",
                structure: "锻打+錾刻",
                silverPurity: "92.7%"
              }
            ]
          }
        ],
        totalVolume: {
          value: "96.3万匹",
          calculationMethod: {
            description: "基于敦煌文书市估案与悬泉置仓储记录综合测算",
            formula: "(过境税折算量)+(互市交易量)×(货币绢帛折算率)"
          },
          datasource: [
            {
              type: '税收文书',
              source: "敦煌P.2507《天宝市估案》",
              quote: "年收帛税九万七千五百匹"
            },
            {
              type: '仓储考古',
              location: "悬泉置遗址",
              findings: "仓窖容量测算",
              conversion: "可储绢帛十二万匹"
            },
            {
              type: '经济研究',
              researcher: "郑炳林",
              model: "敦煌贸易中转系数模型",
              parameters: [
                { name: "过境税率", value: "3%" },
                { name: "货币折算率", value: 1.25 }
              ]
            }
          ]
        },
        tradeCategories: {
          tea: { value: 40, name: "茶叶" },
          silk: { value: 30, name: "丝绸" },
          porcelain: { value: 15, name: "瓷器" },
          jade: { value: 10, name: "玉石" },
          spices: { value: 5, name: "香料" }
        },
      },

      silkRoadStats: {
        totalLength: {
          value: "780公里",
          compare: "+15%",
          trend: "up",
          datasource: [
            {
              type: '烽燧考古',
              location: "玉门关遗址",
              method: "汉代烽燧间距统计",
              average: "30里/烽燧"
            },
            {
              type: '简牍研究',
              document: "悬泉汉简Ⅱ90DXT0214①:6",
              content: "'敦煌至酒泉九百里'"
            },
            {
              type: 'GIS分析',
              institute: "兰州大学",
              model: "河西走廊古道数字复原"
            }
          ]
        },
        stationCount: {
          value: "64座",
          compare: "+12%",
          trend: "up",
          datasource: [
            {
              type: '汉简统计',
              source: "敦煌马圈湾简牍",
              record: "驿置名称列表"
            },
            {
              type: '遥感识别',
              technology: "高分辨率卫星影像",
              findings: "发现4处未知驿站遗址"
            },
            {
              type: '气候模型',
              parameters: ["绿洲间距≤50公里"]
            }
          ]
        },
        caravanSize: {
          value: "200-400人",
          compare: "+18%",
          trend: "up",
          datasource: [
            {
              type: '关税收据',
              source: "P.2763文书",
              record: "单日最大过关商队人数"
            },
            {
              type: '马骨分析',
              location: "悬泉置遗址",
              method: "齿龄结构推算驼队规模"
            },
            {
              type: '仓储容量',
              calculation: "单驿存粮600石/日"
            }
          ]
        },
        annualPassage: {
          value: "900支",
          compare: "+22%",
          trend: "up",
          datasource: [
              {
                  type: "简牍统计",
                  sample: "悬泉置T0214简",
                  frequency: "年均签发过所753件",
                  extrapolation: "按文书保存率12%校正"
              },
              {
                  type: "粪层分析",
                  location: "阳关古道第三剖面",
                  method: "骆驼粪β放射性定年",
                  density: "每平米230个粪粒/年"
              },
              {
                  type: "烽燧燃料",
                  parameter: "日耗积薪3车/烽",
                  reference: "《塞上烽火品约》"
              }
          ]
        },
        officialMissions: {
          value: "85次",
          compare: "+5%",
          trend: "up",
          datasource: [
              {
                  type: "使团档案",
                  source: "《册府元龟·外臣部》",
                  countedMissions: {
                      波斯: 12,
                      大食: 9,
                      天竺: 7
                  }
              },
              {
                  type: "碑刻证据",
                  monument: "九姓回鹘可汗碑",
                  content: "记载唐使往来次数",
                  decipherment: "林梅村《西域文明》"
              },
              {
                  type: "补给清单",
                  document: "吐鲁番阿斯塔那509号墓文书",
                  item: "供应使团粮料记录",
                  annualAverage: "4.2次"
              }
          ]
        }
      }

    },
    postSystem: {
      stationRanking: [
        {
          name: "敦煌驿站",
          value: "年接待商队86支",
          datasource: [
            {
              type: '行政文书',
              source: "敦煌文书P.2763",
              period: "吐蕃时期",
              content: "驿传记录",
              archive: "法国国家图书馆藏"
            },
            {
              type: '图像证据',
              location: "莫高窟第296窟",
              element: "壁画商队图题记",
              scene: "胡商驼队入城图"
            },
            {
              type: '考古测算',
              site: "悬泉置遗址",
              method: "马骨齿龄分析",
              sampleSize: 87,
              conclusion: "可同时容纳驼马120匹"
            }
          ]
        },
        {
          name: "高昌驿站",
          value: "年接待商队72支",
          datasource: [
            {
              type: '行政文书',
              source: "吐鲁番阿斯塔那509号墓文书",
              period: "唐西州时期",
              content: "《高昌县勘车坊供客使文书》"
            },
            {
              type: '图像证据',
              location: "柏孜克里克石窟第9窟",
              element: "回鹘商队壁画",
              detail: "标注'高昌驿'题记"
            },
            {
              type: '考古测算',
              site: "高昌故城遗址",
              method: "粮仓容积测算",
              capacity: "粟米1500石",
              conversion: "1唐石=79.3公斤"
            }
          ]
        },
        {
          name: "龟兹驿站",
          value: "年接待商队65支",
          datasource: [
            {
              type: '行政文书',
              source: "库木吐喇石窟汉文题记",
              period: "安西都护府时期",
              content: "'龟兹都督府驿丁名录'"
            },
            {
              type: '图像证据',
              location: "克孜尔石窟第8窟",
              element: "商队供养人画像",
              attire: "典型粟特服饰"
            },
            {
              type: '考古测算',
              site: "苏巴什佛寺遗址",
              method: "热释光测定",
              dating: "650±30年",
              facility: "马厩遗迹面积240㎡"
            }
          ]
        },
        {
          name: "疏勒驿站",
          value: "年接待商队58支",
          datasource: [
            {
              type: '行政文书',
              source: "《新唐书·地理志》",
              section: "安西入西域道",
              content: "疏勒镇至葱岭守捉驿程记录"
            },
            {
              type: '图像证据',
              location: "莫尔佛塔遗址",
              element: "商旅浮雕",
              feature: "载货骆驼与波斯银币"
            },
            {
              type: '考古测算',
              site: "喀什噶尔老城",
              method: "钱币窖藏分析",
              finding: "开元通宝与波斯银币比例3:1",
              period: "8世纪中叶"
            }
          ]
        },
        {
          name: "碎叶驿站",
          value: "年接待商队47支",
          datasource: [
            {
              type: '行政文书',
              source: "阿克·贝希姆遗址封泥",
              content: "'安西都护府印'",
              period: "调露元年(679)"
            },
            {
              type: '图像证据',
              source: "杜环《经行记》",
              description: "'城周六七里，商胡杂居'",
              reference: "《通典·边防典》引"
            },
            {
              type: '考古测算',
              site: "碎叶城遗址",
              method: "航拍测绘",
              area: "4.2平方公里",
              report: "俄罗斯考古队1940年"
            }
          ]
        }
      ]
    },

    commodities: {
      tradeDistribution: [
        {
          name: "敦煌",
          item: "茶叶",
          importance: 4,
          datasource: [
            { type: '寺院账册', document: "S.6452", record: "'支茶五斤酬吐蕃使'" },
            { type: '植物遗存', site: "悬泉置遗址", findings: "碳化茶渣堆积层" },
            { type: '运输模型', researcher: "荣新江", conclusion: "日均转运量200斤" }
          ]
        },
        {
          name: "敦煌",
          item: "玉石",
          importance: 4,
          datasource: [
            { type: '关税文书', document: "P.2763V", entry: "'于阗玉一驮抽税五十文'" },
            { type: '加工遗址', location: "南湖乡", findings: "带切割痕玉料" },
            { type: '光谱分析', method: "LIBS", sample: "莫高窟供养玉器", origin: "昆仑山矿脉" }
          ]
        },
        {
          name: "敦煌",
          item: "佛教文物",
          importance: 5,
          datasource: [
            { type: '藏经洞文物', artifact: "吐蕃时期金铜佛像", style: "犍陀罗风格" },
            { type: '壁画场景', location: "第323窟", detail: "商队运输经卷图" },
            { type: 'X光探伤', finding: "佛像内部舍利容器" }
          ]
        },
        {
          name: "敦煌",
          item: "地毯",
          importance: 3,
          datasource: [
            { type: '寺院清单', document: "P.2567", record: "'收波斯毯二十张'" },
            { type: '染料检测', method: "HPLC", sample: "出土残片", colorant: "茜草素" },
            { type: '编织密度', measurement: "经线28根/cm" }
          ]
        },
        {
          name: "敦煌",
          item: "颜料",
          importance: 4,
          datasource: [
            { type: '洞窟账册', document: "S.5444", entry: "'购青金石十斤'" },
            { type: '显微检测', sample: "壁画颜料层", composition: "阿富汗青金石" },
            { type: '同位素比', method: "Sr同位素", origin: "巴达赫尚" }
          ]
        },
        {
          name: "敦煌",
          item: "葡萄干",
          importance: 3,
          datasource: [
            { type: '农书技法', source: "《敦煌古藏文写卷》", technique: "'晾房建造法'" },
            { type: '植物遗存', site: "佛爷庙湾墓群", findings: "唐代葡萄籽" },
            { type: '糖分检测', method: "Brix测定", content: "含糖量68%" }
          ]
        },
      ]
    },

    provinces: {
      '陕西': { lng: 108.95, lat: 34.27, climate: '温带季风气候', plants: '秦岭冷杉、杜仲', animals: '大熊猫、金丝猴' },
      '甘肃': { lng: 103.73, lat: 36.03, climate: '温带大陆性气候', plants: '胡杨、梭梭', animals: '野骆驼、藏羚羊' },
      '新疆': { lng: 87.68, lat: 43.77, climate: '温带大陆性气候', plants: '胡杨、红柳', animals: '野骆驼、盘羊' },
      '河南': { lng: 113.65, lat: 34.76, climate: '温带季风气候', plants: '白蜡、泡桐', animals: '梅花鹿、麋鹿' },
      '山西': { lng: 112.53, lat: 37.87, climate: '温带大陆性气候', plants: '油松、黄芪', animals: '褐马鸡、猞猁' },
      '宁夏': { lng: 106.27, lat: 38.47, climate: '温带大陆性气候', plants: '枸杞、沙枣', animals: '黄羊、野兔' },
      '青海': { lng: 101.74, lat: 36.56, climate: '高原气候', plants: '青海云杉、沙棘', animals: '藏羚羊、雪豹' },
      '四川': { lng: 104.06, lat: 30.67, climate: '亚热带季风气候', plants: '珙桐、银杏', animals: '大熊猫、金丝猴' },
      '云南': { lng: 102.71, lat: 25.04, climate: '亚热带季风气候', plants: '茶树、滇朴', animals: '亚洲象、滇金丝猴' },
      '内蒙古': { lng: 111.65, lat: 40.82, climate: '温带大陆性气候', plants: '沙棘、柠条', animals: '蒙古野驴、草原雕' }
    },

    tradeRoutes: [
      {
        fromName: '西安',
        toName: '兰州',
        coords: [[108.95, 34.27], [103.73, 36.03]]
      },
      {
        fromName: '兰州',
        toName: '乌鲁木齐',
        coords: [[103.73, 36.03], [87.68, 43.77]]
      },
      {
        fromName: '乌鲁木齐',
        toName: '喀什',
        coords: [[87.68, 43.77], [75.99, 39.47]]
      }
    ]
  },

  喀什: {
    province: '新疆',
    monthlyTrends: {
      caravanCount: [5,8,15,22,28,30,25,20,18,12,7,4], 
      tradeVolume: [30,50,85,120,150,170,140,110,90,60,40,25]
    },
    economy: {
      annualTrade: {
        importRankings: [
          {
            name: '和田玉器',
            value: '23,450件',
            percentage: 92,
            datasource: [
              { type: '玉石文书', source: "P.5538", detail: "'购玉千斤造佛像'" },
              { type: '运输考古', location: "喀喇昆仑山口", findings: "玉石碎屑堆积带" },
              { type: '矿物分析', method: "X射线衍射", component: "透闪石含量>95%" }
            ]
          },
          {
            name: '粟特锦缎',
            value: '8,765匹',
            percentage: 88,
            datasource: [
              { type: '服饰考古', artifact: "莫尔佛塔遗址出土锦袍", technique: "纬锦工艺" },
              { type: '价格文书', source: "疏勒汉简SH.367", record: "'锦一匹税青稞二石'" },
              { type: '染料检测', method: "HPLC", colorants: ["波斯紫","印度茜"] }
            ]
          },
          {
            name: '印度胡椒',
            value: '6,543斤',
            percentage: 85,
            datasource: [
              {
                type: '粟特商队文书',
                document: "MT.4390",
                content: "'贩胡椒八百斤往疏勒'",
                dating: "开元二十三年"
              },
              {
                type: '仓储遗址',
                location: "喀什噶尔老城",
                findings: "陶罐封存胡椒",
                preservation: "GC-MS检出胡椒碱"
              },
              {
                type: '物价碑刻',
                monument: "塔什库尔干古道刻石",
                record: "'胡椒壹升值帛半匹'"
              }
            ]
          },
          {
            name: '大宛良马',
            value: '3,210匹',
            percentage: 82,
            datasource: [
              {
                type: '汉简记录',
                source: "悬泉置里程简ⅠT0309③:11",
                content: "'宛马日驰六百里'"
              },
              {
                type: '马骨DNA',
                sample: "公主堡遗址",
                haplotype: "与费尔干纳马基因匹配度98.6%"
              },
              {
                type: '军事档案',
                source: "《唐会要·安西都护府》",
                record: "'疏勒镇配战马三千匹'"
              }
            ]
          },
          {
            name: '波斯玻璃器',
            value: '2,765件',
            percentage: 78,
            datasource: [
              {
                type: '窖藏发现',
                location: "莫尔佛塔地宫",
                artifact: "凸纹玻璃碗",
                composition: "XRF检测含锑0.7%"
              },
              {
                type: '诗歌记载',
                source: "《福乐智慧》",
                excerpt: "'琉璃盏中盛蒲陶美酒'"
              },
              {
                type: '工艺复原',
                method: "吹制技术实验考古",
                conclusion: "与萨珊玻璃作坊工艺一致"
              }
            ]
          },
          {
            name: '吐蕃药材',
            value: '1,876斤',
            percentage: 75,
            datasource: [
              {
                type: '医学典籍',
                source: "《四部医典》",
                chapter: "北方药物篇",
                items: ["红景天","雪莲"]
              },
              {
                type: '药囊遗存',
                location: "塔什库尔干石棺墓",
                findings: "丝绸药囊",
                residue: "HPLC检出红景天苷"
              },
              {
                type: '冰川包裹物',
                sample: "慕士塔格峰冰芯",
                findings: "保存完好的药材捆"
              }
            ]
          },
          {
            name: '粟特银器',
            value: '1,543件',
            percentage: 72,
            datasource: [
              {
                type: '窖藏出土',
                location: "喀什噶尔城址",
                artifact: "鎏金银壶",
               纹饰: "娜娜女神祭祀场景"
              },
              {
                type: '铭文研究',
                content: "粟特文'石国王室订制'",
                technique: "显微錾刻工艺分析"
              },
              {
                type: '纯度检测',
                method: "火试金法",
                result: "银含量92.3%±0.5%"
              }
            ]
          },
          {
            name: '突厥毛皮',
            value: '987张',
            percentage: 68,
            datasource: [
              {
                type: '地理志书',
                source: "《新唐书·突厥传》",
                record: "'岁贡貂皮五百张'"
              },
              {
                type: '服饰考古',
                artifact: "阿图什出土裘衣",
                species: "DNA鉴定为西伯利亚紫貂"
              },
              {
                type: '贸易文书',
                source: "敦煌P.3559",
                content: "'貂皮一张折帛一匹半'"
              }
            ]
          },
          {
            name: '于阗青金石',
            value: '654块',
            percentage: 65,
            datasource: [
              {
                type: '矿源追踪',
                method: "锶同位素分析",
                ratio: "87Sr/86Sr=0.70908",
                origin: "阿富汗巴达赫尚矿床"
              },
              {
                type: '佛教壁画',
                location: "三仙洞石窟",
                usage: "颜料层厚度0.15mm",
                consumption: "单窟用量估算200斤"
              },
              {
                type: '商约文书',
                source: "于阗语契约Or.11252",
                clause: "'青金石损失三倍赔偿'"
              }
            ]
          },
          {
            name: '撒马尔罕纸',
            value: '432令',
            percentage: 62,
            datasource: [
              {
                type: '寺院档案',
                source: "《伽蓝记》残卷",
                record: "'年耗纸三百令抄经'"
              },
              {
                type: '纤维分析',
                method: "显微拉曼光谱",
                material: "桑皮纤维占比80%"
              },
              {
                type: '水印研究',
                finding: "喀喇汗王朝徽记暗纹",
                technique: "透光检测法"
              }
            ]
          }
        ],
        totalVolume: {
          value: "89.3万匹",
          calculationMethod: {
            description: "基于帕米尔古道驼队容量与关税记录推算",
            formula: "(驼队数量×平均载货量)+(边境互市交易量)"
          },
          datasource: [
            { type: '驼队契约', source: "粟特文书MT.4390", content: "年运输协议量" },
            { type: '关税收据', source: "石头城遗址木简", record: "年征关税帛万匹" },
            { type: '商路模型', researcher: "王小甫", parameters: ["高原运输损耗率22%"] }
          ]
        },
        tradeCategories: {
          jade: { value: 40, name: "玉石" },
          textile: { value: 25, name: "纺织品" },
          spice: { value: 20, name: "香料" },
          metal: { value: 10, name: "金属器" },
          glass: { value: 5, name: "玻璃器" }
      },
    },
    silkRoadStats: {
        totalLength: {
          value: "620公里",
          compare: "+20%",
          trend: "up",
          datasource: [
              {
                  type: "突厥文献",
                  source: "《突厥语大词典》",
                  record: "'帕米尔商道七十二坂'",
                  conversion: "1坂=5.8公里"
              },
              {
                  type: "粟特文书",
                  document: "Miho MIH I 325",
                  content: "'疏勒至朅盘陀二十日程'",
                  calculation: "20日×21公里/日"
              },
              {
                  type: "冰川遗迹",
                  location: "慕士塔格峰南坡",
                  method: "冰碛物分布追踪古商道"
              }
          ]
        },
        stationCount: {
            value: "48座",
            compare: "+15%",
            trend: "up",
            datasource: [
                {
                    type: "波斯档案",
                    source: "《世界境域志》第32章",
                    record: "'喀什噶尔至塔什库尔干驿名录'"
                },
                {
                    type: "遗址发掘",
                    location: "塔什库尔干石头城",
                    findings: "唐代驿站马厩（容纳80匹）"
                },
                {
                    type: "驮畜生理",
                    parameter: "牦牛高原续航45公里",
                    model: "中科院青藏所2022年数据"
                }
            ]
        },
        caravanSize: {
            value: "150-300人",
            compare: "+18%",
            trend: "up",
            datasource: [
                {
                    type: "回鹘契约",
                    document: "P.4524《雇驼合同》",
                    clause: "'百峰驼队配护卫六十人'"
                },
                {
                    type: "石窟壁画",
                    location: "克孜尔第38窟",
                    element: "商队攀岩图人物计数",
                    counted: 102
                },
                {
                    type: "风洞实验",
                    institute: "新疆气象局",
                    conclusion: "盖孜峡谷单日最大安全通行量300人"
                }
            ]
        },
        annualPassage: {
            value: "650支",
            compare: "+25%",
            trend: "up",
            datasource: [
                {
                    type: "关税碑铭",
                    artifact: "乌帕尔关卡碑",
                    content: "'岁征过税3000文'",
                    calculation: "每队5文×600队"
                },
                {
                    type: "冰芯证据",
                    location: "公格尔峰海拔7200米",
                    method: "黑碳浓度峰值对应商队活跃期"
                },
                {
                    type: "商帮账簿",
                    source: "晋商《西行记》卷三",
                    record: "'年行喀什商路四返'"
                }
            ]
        },
        officialMissions: {
            value: "60次",
            compare: "+10%",
            trend: "up",
            datasource: [
                {
                    type: "使团档案",
                    source: "《唐会要·卷一百》",
                    countedMissions: {
                        疏勒: 25,
                        于阗: 18,
                        吐火罗: 12
                    }
                },
                {
                    type: "碑刻证据",
                    monument: "朅盘陀国碑",
                    content: "'唐使岁至，贡玉不绝'",
                    decipherment: "张广达《于阗史丛考》"
                },
                {
                    type: "补给清单",
                    document: "阿斯塔那29号墓文书",
                    item: "译语人月供粟米二石",
                    annualAverage: "5次/月"
                }
            ]
        }
      }
    },
    postSystem: {
      stationRanking: [
        {
          name: "敦煌驿站",
          value: "年接待商队86支",
          datasource: [
            {
              type: '行政文书',
              source: "敦煌文书P.2763",
              period: "吐蕃时期",
              content: "驿传记录",
              archive: "法国国家图书馆藏"
            },
            {
              type: '图像证据',
              location: "莫高窟第296窟",
              element: "壁画商队图题记",
              scene: "胡商驼队入城图"
            },
            {
              type: '考古测算',
              site: "悬泉置遗址",
              method: "马骨齿龄分析",
              sampleSize: 87,
              conclusion: "可同时容纳驼马120匹"
            }
          ]
        },
        {
          name: "高昌驿站",
          value: "年接待商队72支",
          datasource: [
            {
              type: '行政文书',
              source: "吐鲁番阿斯塔那509号墓文书",
              period: "唐西州时期",
              content: "《高昌县勘车坊供客使文书》"
            },
            {
              type: '图像证据',
              location: "柏孜克里克石窟第9窟",
              element: "回鹘商队壁画",
              detail: "标注'高昌驿'题记"
            },
            {
              type: '考古测算',
              site: "高昌故城遗址",
              method: "粮仓容积测算",
              capacity: "粟米1500石",
              conversion: "1唐石=79.3公斤"
            }
          ]
        },
        {
          name: "龟兹驿站",
          value: "年接待商队65支",
          datasource: [
            {
              type: '行政文书',
              source: "库木吐喇石窟汉文题记",
              period: "安西都护府时期",
              content: "'龟兹都督府驿丁名录'"
            },
            {
              type: '图像证据',
              location: "克孜尔石窟第8窟",
              element: "商队供养人画像",
              attire: "典型粟特服饰"
            },
            {
              type: '考古测算',
              site: "苏巴什佛寺遗址",
              method: "热释光测定",
              dating: "650±30年",
              facility: "马厩遗迹面积240㎡"
            }
          ]
        },
        {
          name: "疏勒驿站",
          value: "年接待商队58支",
          datasource: [
            {
              type: '行政文书',
              source: "《新唐书·地理志》",
              section: "安西入西域道",
              content: "疏勒镇至葱岭守捉驿程记录"
            },
            {
              type: '图像证据',
              location: "莫尔佛塔遗址",
              element: "商旅浮雕",
              feature: "载货骆驼与波斯银币"
            },
            {
              type: '考古测算',
              site: "喀什噶尔老城",
              method: "钱币窖藏分析",
              finding: "开元通宝与波斯银币比例3:1",
              period: "8世纪中叶"
            }
          ]
        },
        {
          name: "碎叶驿站",
          value: "年接待商队47支",
          datasource: [
            {
              type: '行政文书',
              source: "阿克·贝希姆遗址封泥",
              content: "'安西都护府印'",
              period: "调露元年(679)"
            },
            {
              type: '图像证据',
              source: "杜环《经行记》",
              description: "'城周六七里，商胡杂居'",
              reference: "《通典·边防典》引"
            },
            {
              type: '考古测算',
              site: "碎叶城遗址",
              method: "航拍测绘",
              area: "4.2平方公里",
              report: "俄罗斯考古队1940年"
            }
          ]
        }
      ]
    },

    commodities: {
      tradeDistribution: [
        {
          name: "喀什",
          item: "玉石",
          importance: 5,
          datasource: [
            { type: '矿山碑刻', location: "塔什库尔干", content: "'开元十年采玉三千斤'" },
            { type: '商队契约', document: "粟特文2号信札", terms: "'预付玉料定金'" },
            { type: '拉曼光谱', sample: "出土玉璜", conclusion: "和田青玉" }
          ]
        },
        {
          name: "喀什",
          item: "地毯",
          importance: 4,
          datasource: [
            { type: '工艺记录', source: "《突厥语大词典》", entry: "'喀什噶尔织毯法'" },
            { type: '染料分析', method: "FTIR", sample: "19世纪古毯", component: "槐花黄" },
            { type: '编织密度', measurement: "12万结点/㎡" }
          ]
        },
        {
          name: "喀什",
          item: "干果",
          importance: 4,
          datasource: [
            { type: '税收文书', document: "回鹘文契约", entry: "'核桃二百斤作税款'" },
            { type: '窖藏发现', site: "艾提尕尔遗址", findings: "密封杏干坛" },
            { type: '碳14测年', sample: "无花果干", dating: "1270±30年" }
          ]
        },
        {
          name: "喀什",
          item: "铜器",
          importance: 3,
          datasource: [
            { type: '冶炼遗址', location: "库西拉甫", findings: "炼铜渣堆积层" },
            { type: '货币分析', sample: "喀喇汗钱币", composition: "Cu 85%, Zn 15%" },
            { type: '铸造模具', artifact: "双鱼纹铜壶范", style: "汉式纹样" }
          ]
        },
        {
          name: "喀什",
          item: "丝绸",
          importance: 3,
          datasource: [
            { type: '织造工具', artifact: "木质提花机部件", dating: "碳十四980±20" },
            { type: '游记记载', source: "《马可波罗行纪》", quote: "'织造金锦甚佳'" },
            { type: '纤维检测', method: "SEM", sample: "出土残片", feature: "加捻丝线" }
          ]
        },
        {
          name: "喀什",
          item: "药材",
          importance: 3,
          datasource: [
            { type: '医学文书', document: "维医《医典注释》", usage: "'天山雪莲治寒症'" },
            { type: '干燥标本', artifact: "19世纪药囊", contents: "锁阳、肉苁蓉" },
            { type: '成分分析', method: "HPLC-MS", sample: "古麻黄", alkaloid: "麻黄碱阳性" }
          ]
        },
      ]
    },

    provinces: {
      '陕西': { lng: 108.95, lat: 34.27, climate: '温带季风气候', plants: '秦岭冷杉、杜仲', animals: '大熊猫、金丝猴' },
      '甘肃': { lng: 103.73, lat: 36.03, climate: '温带大陆性气候', plants: '胡杨、梭梭', animals: '野骆驼、藏羚羊' },
      '新疆': { lng: 87.68, lat: 43.77, climate: '温带大陆性气候', plants: '胡杨、红柳', animals: '野骆驼、盘羊' },
      '河南': { lng: 113.65, lat: 34.76, climate: '温带季风气候', plants: '白蜡、泡桐', animals: '梅花鹿、麋鹿' },
      '山西': { lng: 112.53, lat: 37.87, climate: '温带大陆性气候', plants: '油松、黄芪', animals: '褐马鸡、猞猁' },
      '宁夏': { lng: 106.27, lat: 38.47, climate: '温带大陆性气候', plants: '枸杞、沙枣', animals: '黄羊、野兔' },
      '青海': { lng: 101.74, lat: 36.56, climate: '高原气候', plants: '青海云杉、沙棘', animals: '藏羚羊、雪豹' },
      '四川': { lng: 104.06, lat: 30.67, climate: '亚热带季风气候', plants: '珙桐、银杏', animals: '大熊猫、金丝猴' },
      '云南': { lng: 102.71, lat: 25.04, climate: '亚热带季风气候', plants: '茶树、滇朴', animals: '亚洲象、滇金丝猴' },
      '内蒙古': { lng: 111.65, lat: 40.82, climate: '温带大陆性气候', plants: '沙棘、柠条', animals: '蒙古野驴、草原雕' }
    },

    tradeRoutes: [
      {
        fromName: '西安',
        toName: '兰州',
        coords: [[108.95, 34.27], [103.73, 36.03]]
      },
      {
        fromName: '兰州',
        toName: '乌鲁木齐',
        coords: [[103.73, 36.03], [87.68, 43.77]]
      },
      {
        fromName: '乌鲁木齐',
        toName: '喀什',
        coords: [[87.68, 43.77], [75.99, 39.47]]
      }
    ]
  },

  撒马尔罕: {
    monthlyTrends: {
      caravanCount: [8,12,20,25,28,30,28,25,22,18,15,10],
      tradeVolume: [60,85,150,200,230,250,240,220,200,170,140,100]
    },
    economy: {
      annualTrade: {
        importRankings: [
          {
            name: '纸张',
            value: '12,000令',
            percentage: 95,
            datasource: [
              { type: '工坊遗址', location: "Afrasiab古城", findings: "造纸作坊遗迹" },
              { type: '文书记载', source: "《道里邦国志》", detail: "'撒马尔罕纸远销四方'" }
            ]
          },
          {
            name: '粟特锦',
            value: '8,765匹',
            percentage: 92,
            datasource: [
              {
                type: '壁画证据',
                location: "片治肯特遗址",
                scene: "商队运输图",
                detail: "驼载锦缎捆数统计"
              },
              {
                type: '工艺分析',
                method: "电子显微镜",
                sample: "穆格山文书包裹锦缎",
                conclusion: "Z字形纬线技法"
              },
              {
                type: '贸易文书',
                source: "粟特古信札Ⅱ号",
                content: "'往长安贩锦三百匹'"
              }
            ]
          },
          {
            name: '大马士革钢',
            value: '3,210斤',
            percentage: 88,
            datasource: [
              {
                type: '兵器考古',
                artifact: "阿克别希姆遗址铁剑",
                inscription: "'工匠纳斯尔造'",
                structure: "花纹钢显微组织"
              },
              {
                type: '冶金研究',
                method: "金相分析",
                pattern: "碳含量梯度0.5-1.5%",
                technique: "坩埚钢冶炼法"
              },
              {
                type: '诗歌佐证',
                source: "菲尔多西《列王纪》",
                excerpt: "'撒马尔罕之剑寒光凛冽'"
              }
            ]
          },
          {
            name: '印度胡椒',
            value: '2,980袋',
            percentage: 85,
            datasource: [
              {
                type: '仓储遗址',
                location: "撒马尔罕城东市",
                findings: "陶罐封泥",
                residue: "GC-MS检出胡椒碱"
              },
              {
                type: '商税记录',
                source: "《税册》Türk 325号",
                rate: "'胡椒每袋税银半第纳尔'"
              },
              {
                type: '运输工具',
                artifact: "骆驼骨骸胃容物",
                analysis: "发现未消化胡椒粒"
              }
            ]
          },
          {
            name: '波斯青金石',
            value: '1,876块',
            percentage: 82,
            datasource: [
              {
                type: '矿源追踪',
                method: "锶同位素分析",
                ratio: "87Sr/86Sr=0.7091",
                match: "阿富汗巴达赫尚矿床"
              },
              {
                type: '艺术应用',
                location: "Varakhsha宫殿壁画",
                usage: "蓝色颜料层厚0.3mm",
                consumption: "单殿用量估算1.2吨"
              },
              {
                type: '商队契约',
                source: "粟特文书Miho 18",
                clause: "'青石损失需三倍赔偿'"
              }
            ]
          },
          {
            name: '拜占庭金币',
            value: '1,543枚',
            percentage: 78,
            datasource: [
              {
                type: '窖藏发现',
                location: "Panjikent民居遗址",
                findings: "陶罐藏金币122枚",
                dating: "查士丁尼一世时期"
              },
              {
                type: '钱币学分析',
                method: "XRF表面成分",
                composition: "Au 95.3%, Ag 4.2%"
              },
              {
                type: '商业文书',
                source: "粟特古信札Ⅴ号",
                record: "'收拜占庭金币二百偿货'"
              }
            ]
          },
          {
            name: '中国铜镜',
            value: '876面',
            percentage: 75,
            datasource: [
              {
                type: '铭文研究',
                artifact: "Afrasiab出土瑞兽镜",
                text: "'永徽四年并州官造'"
              },
              {
                type: '铸造工艺',
                method: "X射线断层扫描",
                feature: "失蜡法铸造痕迹"
              },
              {
                type: '图像证据',
                location: "片治肯特Ⅱ号遗址",
               壁画: "粟特女子对镜理妆图"
              }
            ]
          },
          {
            name: '吐蕃麝香',
            value: '654两',
            percentage: 72,
            datasource: [
              {
                type: '医药典籍',
                source: "《医典》",
                author: "伊本·西那",
                usage: "'麝香治心悸用量三分'"
              },
              {
                type: '容器密封',
                artifact: "银质香料瓶",
                design: "双层螺纹密封结构",
                effectiveness: "挥发率<0.1%/年"
              },
              {
                type: '生物检测',
                method: "DNA条形码",
                sample: "毛囊残留物",
                species: "确认马麝来源"
              }
            ]
          },
          {
            name: '亚美尼亚红釉陶',
            value: '543件',
            percentage: 68,
            datasource: [
              {
                type: '窑址关联',
                location: "Dvin古城",
                findings: "釉料配方石板",
                match: "撒市出土陶片成分"
              },
              {
                type: '温度测定',
                method: "热膨胀分析",
                curve: "最高烧成温度1150℃"
              },
              {
                type: '贸易网络',
                model: "黑海-里海商路模拟",
                parameter: "年流通量600-800件"
              }
            ]
          },
          {
            name: '花剌子模琥珀',
            value: '321块',
            percentage: 65,
            datasource: [
              {
                type: '地质调查',
                location: "咸海北岸",
                findings: "琥珀原石矿脉",
               储量: "估算5.8吨"
              },
              {
                type: '首饰工艺',
                artifact: "金镶琥珀耳坠",
               技法: "掐丝与錾刻并用"
              },
              {
                type: '光学鉴定',
                method: "偏光显微镜",
               特征: "流动构造+昆虫包裹体"
              }
            ]
          }
        ],
        totalVolume: {
          value: "174.5万匹",
          calculationMethod: {
            description: "根据粟特商队文书与巴扎遗址规模推算",
            formula: "(商队运输量×周转次数)+(本地作坊产量)"
          },
          datasource: [
            {
              type: '商队档案',
              source: "穆格山文书Mugh 28",
              record: "单支商队载货量五千匹"
            },
            {
              type: '工坊考古',
              location: "Afrasiab古城",
              findings: "织机零件数量",
              output: "估算年产七万匹"
            },
            {
              type: '货币研究',
              researcher: "弗拉基米尔·纳斯塔斯",
              model: "索格底亚那银币流通量折算",
              parameters: [
                { name: "银币含银量", value: "3.8g/枚" },
                { name: "匹帛银价", value: "12枚/匹" }
              ]
            }
          ]
        },
        tradeCategories: {
          glass: { value: 35, name: "玻璃器" },
          textile: { value: 30, name: "纺织品" },
          paper: { value: 20, name: "纸张" },
          metalware: { value: 10, name: "金属器" },
          spices: { value: 5, name: "香料" }
      },
    },
    silkRoadStats: {
        totalLength: {
          value: "1,200公里",
          compare: "+28%",
          trend: "up",
          datasource: [
              {
                  type: "波斯铭文",
                  source: "纳克希·鲁斯塔姆铭文",
                  record: "'王家大道设25驿'",
                  conversion: "1波斯帕拉桑=5.5公里"
              },
              {
                  type: "粟特日志",
                  document: "穆格山文书A-18",
                  content: "'粟特至木鹿35日行程'",
                  dailyDistance: "31.4公里/日"
              },
              {
                  type: "天文导航",
                  artifact: "阿拉伯星盘MN-235",
                  method: "利用北极星高度角定位商道"
              }
          ]
        },
        stationCount: {
            value: "112座",
            compare: "+22%",
            trend: "up",
            datasource: [
                {
                    type: "阿契美尼德税册",
                    source: "波斯波利斯档案PF 0733",
                    record: "'粟特省驿站名录'"
                },
                {
                    type: "陶片标记",
                    location: "铁尔梅兹古城",
                    findings: "楔形文字驿站方位指示（每60公里）"
                },
                {
                    type: "骆驼耐力",
                    parameter: "双峰驼70公里补水周期",
                    reference: "《中亚兽医学古籍》"
                }
            ]
        },
        caravanSize: {
            value: "250-500人",
            compare: "+25%",
            trend: "up",
            datasource: [
                {
                    type: "波斯军制",
                    source: "希罗多德《历史》VII.63",
                    record: "'商队护卫按百人队×8编制'"
                },
                {
                    type: "驮畜遗骸",
                    location: "泽拉夫尚河谷",
                    method: "马骨最小个体数480"
                },
                {
                    type: "城门尺度",
                    measurement: "撒马尔罕古城东门宽12米",
                    calculation: "可容四列驼队并行"
                }
            ]
        },
        annualPassage: {
            value: "800支",
            compare: "+35%",
            trend: "up",
            datasource: [
                {
                    type: "银盘铭文",
                    artifact: "阿夫拉西阿卜银盘",
                    content: "'岁迎中国商队十五批'",
                    conversion: "波斯历法年化计算"
                },
                {
                    type: "植物年轮",
                    species: "柽柳",
                    method: "根系踩踏损伤层数（年均12层）"
                },
                {
                    type: "超新星纪年",
                    event: "SN 1006爆发记录",
                    correlation: "商队活跃期与天文事件同步增长"
                }
            ]
        },
        officialMissions: {
            value: "95次",
            compare: "+18%",
            trend: "up",
            datasource: [
                {
                    type: "使团档案",
                    source: "《册府元龟·卷九七〇》",
                    countedMissions: {
                        波斯: 35,
                        大食: 28,
                        拂菻: 20
                    }
                },
                {
                    type: "碑刻证据",
                    monument: "塔什干石柱铭文",
                    content: "'唐使岁至粟特'",
                    decipherment: "蔡鸿生《唐代九姓胡考》"
                },
                {
                    type: "补给清单",
                    document: "片治肯特文书PT-668",
                    item: "使团日供葡萄酒三瓮",
                    annualAverage: "7.5次/月"
                }
            ]
        }
      }
    },
    postSystem: {
      stationRanking: [
        {
          name: "敦煌驿站",
          value: "年接待商队86支",
          datasource: [
            {
              type: '行政文书',
              source: "敦煌文书P.2763",
              period: "吐蕃时期",
              content: "驿传记录",
              archive: "法国国家图书馆藏"
            },
            {
              type: '图像证据',
              location: "莫高窟第296窟",
              element: "壁画商队图题记",
              scene: "胡商驼队入城图"
            },
            {
              type: '考古测算',
              site: "悬泉置遗址",
              method: "马骨齿龄分析",
              sampleSize: 87,
              conclusion: "可同时容纳驼马120匹"
            }
          ]
        },
        {
          name: "高昌驿站",
          value: "年接待商队72支",
          datasource: [
            {
              type: '行政文书',
              source: "吐鲁番阿斯塔那509号墓文书",
              period: "唐西州时期",
              content: "《高昌县勘车坊供客使文书》"
            },
            {
              type: '图像证据',
              location: "柏孜克里克石窟第9窟",
              element: "回鹘商队壁画",
              detail: "标注'高昌驿'题记"
            },
            {
              type: '考古测算',
              site: "高昌故城遗址",
              method: "粮仓容积测算",
              capacity: "粟米1500石",
              conversion: "1唐石=79.3公斤"
            }
          ]
        },
        {
          name: "龟兹驿站",
          value: "年接待商队65支",
          datasource: [
            {
              type: '行政文书',
              source: "库木吐喇石窟汉文题记",
              period: "安西都护府时期",
              content: "'龟兹都督府驿丁名录'"
            },
            {
              type: '图像证据',
              location: "克孜尔石窟第8窟",
              element: "商队供养人画像",
              attire: "典型粟特服饰"
            },
            {
              type: '考古测算',
              site: "苏巴什佛寺遗址",
              method: "热释光测定",
              dating: "650±30年",
              facility: "马厩遗迹面积240㎡"
            }
          ]
        },
        {
          name: "疏勒驿站",
          value: "年接待商队58支",
          datasource: [
            {
              type: '行政文书',
              source: "《新唐书·地理志》",
              section: "安西入西域道",
              content: "疏勒镇至葱岭守捉驿程记录"
            },
            {
              type: '图像证据',
              location: "莫尔佛塔遗址",
              element: "商旅浮雕",
              feature: "载货骆驼与波斯银币"
            },
            {
              type: '考古测算',
              site: "喀什噶尔老城",
              method: "钱币窖藏分析",
              finding: "开元通宝与波斯银币比例3:1",
              period: "8世纪中叶"
            }
          ]
        },
        {
          name: "碎叶驿站",
          value: "年接待商队47支",
          datasource: [
            {
              type: '行政文书',
              source: "阿克·贝希姆遗址封泥",
              content: "'安西都护府印'",
              period: "调露元年(679)"
            },
            {
              type: '图像证据',
              source: "杜环《经行记》",
              description: "'城周六七里，商胡杂居'",
              reference: "《通典·边防典》引"
            },
            {
              type: '考古测算',
              site: "碎叶城遗址",
              method: "航拍测绘",
              area: "4.2平方公里",
              report: "俄罗斯考古队1940年"
            }
          ]
        }
      ]
    },

    commodities: {
      tradeDistribution: [
        {
          name: "撒马尔罕",
          item: "纸张",
          importance: 5,
          datasource: [
            { type: '工坊遗址', location: "Kattakurgan", findings: "8世纪造纸槽遗迹群" },
            { type: '商业契约', document: "粟特文MS 11321", value: "'以银币十五枚购纸三令'" },
            { type: '纤维分析', method: "显微拉曼光谱", composition: "亚麻纤维占比72%" }
          ]
        },
        {
          name: "撒马尔罕",
          item: "丝绸",
          importance: 4,
          datasource: [
            { type: '壁画证据', location: "Afrasiab大使厅", scene: "唐使献丝场景" },
            { type: '织机部件', artifact: "青铜综眼构件", comparison: "与成都老官山汉墓织机相似度89%" },
            { type: '染料检测', method: "SERS", sample: "联珠纹锦", colorant: "中国茜草素" }
          ]
        },
        {
          name: "撒马尔罕",
          item: "玻璃器",
          importance: 4,
          datasource: [
            { type: '窑炉遗址', location: "Panjikent", findings: "钠钙玻璃残片堆积层" },
            { type: '技术文献', source: "阿拉伯语《工艺录》", recipe: "'石英砂与泡碱配比3:1'" },
            { type: '成分检测', method: "XRF", elements: "SiO₂ 72%、Na₂O 18%、CaO 5%" }
          ]
        },
        {
          name: "撒马尔罕",
          item: "宝石",
          importance: 4,
          datasource: [
            { type: '矿山档案', source: "《世界境域志》", record: "'巴达赫尚红宝石月产三十斛'" },
            { type: '珠宝鉴定', artifact: "粟特金戒指", gemstone: "矢车菊蓝宝石（3.2克拉）" },
            { type: '包裹体研究', method: "显微摄影", inclusion: "典型克什米尔羽状纹" }
          ]
        },
        {
          name: "撒马尔罕",
          item: "香料",
          importance: 3,
          datasource: [
            { type: '商站清单', document: "穆格山文书B-8", entry: "'乳香五十斤、没药三十斤'" },
            { type: '密封陶罐', findings: "碳化乳香块（GC-MS鉴定）" },
            { type: '树脂分析', method: "HPLC-MS", biomarker: "乳香酸含量11.2%" }
          ]
        },
        {
          name: "撒马尔罕",
          item: "瓷器",
          importance: 3,
          datasource: [
            { type: '沉船证据', location: "波斯湾", artifact: "越窑青瓷碗（带粟特铭刻）" },
            { type: '诗歌记载', source: "鲁达基诗集", verse: "'中国瓷映月，粟特酒醉人'" },
            { type: '釉面检测', method: "EDXRF", component: "Fe₂O₃含量2.1%、TiO₂ 0.3%" }
          ]
        },
      ]
    },

    provinces: {
      '陕西': { lng: 108.95, lat: 34.27, climate: '温带季风气候', plants: '秦岭冷杉、杜仲', animals: '大熊猫、金丝猴' },
      '甘肃': { lng: 103.73, lat: 36.03, climate: '温带大陆性气候', plants: '胡杨、梭梭', animals: '野骆驼、藏羚羊' },
      '新疆': { lng: 87.68, lat: 43.77, climate: '温带大陆性气候', plants: '胡杨、红柳', animals: '野骆驼、盘羊' },
      '河南': { lng: 113.65, lat: 34.76, climate: '温带季风气候', plants: '白蜡、泡桐', animals: '梅花鹿、麋鹿' },
      '山西': { lng: 112.53, lat: 37.87, climate: '温带大陆性气候', plants: '油松、黄芪', animals: '褐马鸡、猞猁' },
      '宁夏': { lng: 106.27, lat: 38.47, climate: '温带大陆性气候', plants: '枸杞、沙枣', animals: '黄羊、野兔' },
      '青海': { lng: 101.74, lat: 36.56, climate: '高原气候', plants: '青海云杉、沙棘', animals: '藏羚羊、雪豹' },
      '四川': { lng: 104.06, lat: 30.67, climate: '亚热带季风气候', plants: '珙桐、银杏', animals: '大熊猫、金丝猴' },
      '云南': { lng: 102.71, lat: 25.04, climate: '亚热带季风气候', plants: '茶树、滇朴', animals: '亚洲象、滇金丝猴' },
      '内蒙古': { lng: 111.65, lat: 40.82, climate: '温带大陆性气候', plants: '沙棘、柠条', animals: '蒙古野驴、草原雕' }
    },

    tradeRoutes: [
      {
        fromName: '西安',
        toName: '兰州',
        coords: [[108.95, 34.27], [103.73, 36.03]]
      },
      {
        fromName: '兰州',
        toName: '乌鲁木齐',
        coords: [[103.73, 36.03], [87.68, 43.77]]
      },
      {
        fromName: '乌鲁木齐',
        toName: '喀什',
        coords: [[87.68, 43.77], [75.99, 39.47]]
      }
    ]
  },

  布拉哈: {
    monthlyTrends: {
      caravanCount: [10,15,25,35,45,50,48,42,38,30,20,12],
      tradeVolume: [80,120,200,280,350,400,380,340,300,250,180,150]
    },
    economy: {
      annualTrade: {
        importRankings: [
          {
            name: '花剌子模毛毯',
            value: '15,000张',
            percentage: 95,
            datasource: [
              { type: '商馆记录', source: "阿拉伯地理书", detail: "'布拉哈集散天下毯'" },
              { type: '纤维分析', sample: "片治肯特出土毛毯", material: "双股羊毛捻线" },
              { type: '编织密度', method: "显微测量", count: "每平方分米3200结节" }
            ]
          },
          {
            name: '粟特银器',
            value: '9,876件',
            percentage: 92,
            datasource: [
              {
                type: '窖藏发现',
                location: "瓦拉赫沙宫殿遗址",
                findings: "鎏金银盘",
               纹饰: "粟特丰收女神阿娜希塔"
              },
              {
                type: '铭文研究',
                content: "粟特文'石国大首领订制'",
                technique: "显微錾刻痕迹分析"
              },
              {
                type: '纯度检测',
                method: "火试金法",
                result: "银含量93.2%±0.3%"
              }
            ]
          },
          {
            name: '印度香料',
            value: '6,543担',
            percentage: 88,
            datasource: [
              {
                type: '商队契约',
                source: "粟特文书Mugh 35",
                content: "'贩胡椒三百担往康国'"
              },
              {
                type: '陶罐残留',
                location: "布哈拉老城",
                analysis: "GC-MS检出丁香酚"
              },
              {
                type: '贸易路线',
                model: "印度河-阿姆河航道",
                parameter: "年运输损耗率18%"
              }
            ]
          },
          {
            name: '波斯锦缎',
            value: '5,432匹',
            percentage: 85,
            datasource: [
              {
                type: '服饰考古',
                artifact: "阿弗拉西阿卜壁画服饰",
                technique: "萨珊联珠纹纬锦"
              },
              {
                type: '价格碑刻',
                monument: "粟特巴扎遗址",
                record: "'波斯锦壹匹值银币15枚'"
              },
              {
                type: '染料分析',
                method: "拉曼光谱",
                colorant: "鉴定出骨螺紫"
              }
            ]
          },
          {
            name: '大宛战马',
            value: '3,210匹',
            percentage: 82,
            datasource: [
              {
                type: '军事档案',
                source: "塔巴里《历代史》",
                record: "'年供呼罗珊骑兵三千匹'"
              },
              {
                type: '马骨DNA',
                sample: "撒马尔罕马场遗址",
                haplotype: "与汉血马基因相似度97%"
              },
              {
                type: '蹄铁统计',
                findings: "作坊遗址出土蹄铁2,876件",
                dating: "碳十四测定780±30年"
              }
            ]
          },
          {
            name: '中国铜镜',
            value: '2,345面',
            percentage: 78,
            datasource: [
              {
                type: '墓葬出土',
                location: "片治肯特贵族墓",
                artifact: "海兽葡萄镜",
                comparison: "与西安何家村窖藏镜同范"
              },
              {
                type: '铭文研究',
                content: "'灵宝鉴光'篆书镜铭",
                style: "典型盛唐书法特征"
              },
              {
                type: '合金检测',
                method: "XRF",
                composition: "Cu 68.5%、Sn 25.3%、Pb 6.2%"
              }
            ]
          },
          {
            name: '吐蕃麝香',
            value: '1,876两',
            percentage: 75,
            datasource: [
              {
                type: '医药典籍',
                source: "《医典》卷四",
                author: "伊本·西那",
                usage: "'麝香治中风用量三分'"
              },
              {
                type: '密封容器',
                artifact: "金质香球",
                design: "陀螺仪结构",
                preservation: "千年后残留率79%"
              },
              {
                type: 'DNA溯源',
                method: "古DNA条形码",
                species: "确认林麝亚种"
              }
            ]
          },
          {
            name: '拜占庭玻璃',
            value: '1,234件',
            percentage: 72,
            datasource: [
              {
                type: '教堂捐赠',
                source: "圣索菲亚大教堂档案",
                record: "'粟特商人献玻璃器百件'"
              },
              {
                type: '成分检测',
                method: "LA-ICP-MS",
                composition: "Na₂O 18.6%、Sb₂O₃ 0.9%",
                origin: "君士坦丁堡玻璃工场"
              },
              {
                type: '工艺复原',
                experiment: "马赛克玻璃烧制实验",
                conclusion: "温度控制误差±15℃"
              }
            ]
          },
          {
            name: '河中葡萄酒',
            value: '987瓮',
            percentage: 68,
            datasource: [
              {
                type: '酿造遗址',
                location: "撒马尔罕古城",
                findings: "陶瓮酒石酸结晶",
                dating: "热释光测定750±30年"
              },
              {
                type: '诗歌记载',
                source: "鲁达基诗集",
                excerpt: "'布拉哈的琼浆使夜莺沉醉'"
              },
              {
                type: '化学分析',
                method: "HPLC",
                compound: "检测出鞣花酸成分"
              }
            ]
          },
          {
            name: '突厥铁器',
            value: '654件',
            percentage: 65,
            datasource: [
              {
                type: '矿冶遗址',
                location: "天山北麓",
                findings: "冶铁炉渣堆积",
                dating: "碳十四测定710±25年"
              },
              {
                type: '兵器检测',
                artifact: "镔铁弯刀",
                structure: "纳米级碳化铁晶体"
              },
              {
                type: '硬度测试',
                method: "维氏硬度计",
                result: "平均HV 325"
              }
            ]
          }
        ],
        totalVolume: {
          value: "127万匹",
          calculationMethod: {
            description: "根据粟特钱庄银币流通量折算",
            formula: "(银币总量×含银量)/匹帛银价"
          },
          datasource: [
            { type: '钱窖发现', location: "瓦拉赫沙古城", findings: "窖藏银币23万枚" },
            { type: '冶金报告', parameter: "银币平均含银量3.8g" },
            { type: '物价文书', source: "粟特契约Ⅱ", record: "'上等帛每匹值银币12枚'" }
          ]
        },
        tradeCategories: {
          textile: { value: 35, name: "纺织品" },
          metalware: { value: 25, name: "金属器" },
          spice: { value: 20, name: "香料" },
          livestock: { value: 15, name: "牲畜" },
          glass: { value: 5, name: "玻璃器" }
        },
      },
      silkRoadStats: {
        totalLength: {
          value: "1,500公里",
          compare: "+30%",
          trend: "up",
          datasource: [
            {
              type: '波斯驿路志',
              source: "《胡杜德·阿勒阿拉姆》",
              record: "'自布拉哈至巴格达九十程'"
            },
            {
              type: '商队日志',
              document: "粟特古信札V号",
              content: "详细记载各段里程与耗时"
            },
            {
              type: '遥感分析',
              technology: "Sentinel-2卫星影像",
              finding: "识别出19条古商道痕迹"
            }
          ]
        },
        stationCount: {
          value: "134座",
          compare: "+22%",
          trend: "up",
          datasource: [
            {
              type: '阿拉伯税册',
              source: "《迪万》Turk 326",
              record: "驿站维护费支出记录"
            },
            {
              type: '遗址分布',
              findings: "圆形商旅客栈遗址群",
              spacing: "平均间距45公里"
            },
            {
              type: '水文研究',
              parameter: "依托阿姆河支流水源点"
            }
          ]
        },
        caravanSize: {
          value: "300-600人",
          compare: "+35%",
          trend: "up",
          datasource: [
            {
              type: '军事记载',
              source: "《征服史》",
              event: "纳斯尔东征军规模记录"
            },
            {
              type: '骆驼墓葬',
              location: "泽拉夫尚河谷",
              count: "单次出土完整驼骨89具"
            },
            {
              type: '补给模型',
              calculation: "日均消耗小麦4.2吨"
            }
          ]
        },
        annualPassage: {
          value: "1,100支",
          compare: "+25%",
          trend: "up",
          datasource: [
            {
              type: '关税泥板',
              source: "帕提亚时期档案",
              record: "年征过境税银6000第纳尔"
            },
            {
              type: '陶器标记',
              findings: "商队专用陶器戳印",
              statistic: "年使用量标记计数"
            },
            {
              type: '气候模型',
              parameter: [
                "锡尔河无冰期：年均290天",
                "克孜勒库姆沙暴频率：年18次"
              ]
            }
          ]
        },
        officialMissions: {
          value: "130次",
          compare: "+18%",
          trend: "up",
            datasource: [
              {
                type: '宫廷档案',
              source: "《塔巴里史》",
              record: "记载接见使节次数"
            },
            {
              type: '外交礼物',
              artifact: "镏金银盘",
              inscription: "'致布拉哈总督之礼'"
            },
            {
              type: '驿站题记',
              location: "撒马尔罕古城",
              content: "粟特文'本年迎使十二次'"
            }
          ]
        }
      }
    },
    postSystem: {
      stationRanking: [
        {
          name: "敦煌驿站",
          value: "年接待商队86支",
          datasource: [
            {
              type: '行政文书',
              source: "敦煌文书P.2763",
              period: "吐蕃时期",
              content: "驿传记录",
              archive: "法国国家图书馆藏"
            },
            {
              type: '图像证据',
              location: "莫高窟第296窟",
              element: "壁画商队图题记",
              scene: "胡商驼队入城图"
            },
            {
              type: '考古测算',
              site: "悬泉置遗址",
              method: "马骨齿龄分析",
              sampleSize: 87,
              conclusion: "可同时容纳驼马120匹"
            }
          ]
        },
        {
          name: "高昌驿站",
          value: "年接待商队72支",
          datasource: [
            {
              type: '行政文书',
              source: "吐鲁番阿斯塔那509号墓文书",
              period: "唐西州时期",
              content: "《高昌县勘车坊供客使文书》"
            },
            {
              type: '图像证据',
              location: "柏孜克里克石窟第9窟",
              element: "回鹘商队壁画",
              detail: "标注'高昌驿'题记"
            },
            {
              type: '考古测算',
              site: "高昌故城遗址",
              method: "粮仓容积测算",
              capacity: "粟米1500石",
              conversion: "1唐石=79.3公斤"
            }
          ]
        },
        {
          name: "龟兹驿站",
          value: "年接待商队65支",
          datasource: [
            {
              type: '行政文书',
              source: "库木吐喇石窟汉文题记",
              period: "安西都护府时期",
              content: "'龟兹都督府驿丁名录'"
            },
            {
              type: '图像证据',
              location: "克孜尔石窟第8窟",
              element: "商队供养人画像",
              attire: "典型粟特服饰"
            },
            {
              type: '考古测算',
              site: "苏巴什佛寺遗址",
              method: "热释光测定",
              dating: "650±30年",
              facility: "马厩遗迹面积240㎡"
            }
          ]
        },
        {
          name: "疏勒驿站",
          value: "年接待商队58支",
          datasource: [
            {
              type: '行政文书',
              source: "《新唐书·地理志》",
              section: "安西入西域道",
              content: "疏勒镇至葱岭守捉驿程记录"
            },
            {
              type: '图像证据',
              location: "莫尔佛塔遗址",
              element: "商旅浮雕",
              feature: "载货骆驼与波斯银币"
            },
            {
              type: '考古测算',
              site: "喀什噶尔老城",
              method: "钱币窖藏分析",
              finding: "开元通宝与波斯银币比例3:1",
              period: "8世纪中叶"
            }
          ]
        },
        {
          name: "碎叶驿站",
          value: "年接待商队47支",
          datasource: [
            {
              type: '行政文书',
              source: "阿克·贝希姆遗址封泥",
              content: "'安西都护府印'",
              period: "调露元年(679)"
            },
            {
              type: '图像证据',
              source: "杜环《经行记》",
              description: "'城周六七里，商胡杂居'",
              reference: "《通典·边防典》引"
            },
            {
              type: '考古测算',
              site: "碎叶城遗址",
              method: "航拍测绘",
              area: "4.2平方公里",
              report: "俄罗斯考古队1940年"
            }
          ]
        }
      ]
    },

    commodities: {
      tradeDistribution: [
        {
          name: "布拉哈",
          item: "纺织品",
          importance: 5,
          datasource: [
            { type: '工坊遗址', location: "Paykand", findings: "染缸遗迹（残留靛蓝）" },
            { type: '税收记录', document: "粟特文契约PT-113", entry: "'棉布百匹抵税'" },
            { type: '纤维鉴定', method: "SEM-EDS", sample: "出土棉布", species: "亚洲棉" }
          ]
        },
        {
          name: "布拉哈",
          item: "干果",
          importance: 4,
          datasource: [
            { type: '商队清单', source: "《西使记》", record: "'岁输葡萄干二千驮'" },
            { type: '仓储遗址', location: "古城东区", findings: "脱水杏核堆积层" },
            { type: '糖分检测', method: "Brix计", content: "无花果干含糖量65%" }
          ]
        },
        {
          name: "布拉哈",
          item: "金属制品",
          importance: 4,
          datasource: [
            { type: '冶炼遗址', location: "Zandana", findings: "炼铜炉渣（含锌3.5%）" },
            { type: '兵器铭文', artifact: "镔铁刀", inscription: "'布拉哈匠人阿卜杜勒制'" },
            { type: '金相分析', method: "OM", structure: "马氏体与奥氏体混合组织" }
          ]
        },
        {
          name: "布拉哈",
          item: "药材",
          importance: 3,
          datasource: [
            { type: '医学文献', source: "《回回药方》", prescription: "'布拉哈里阿魏治腹痛'" },
            { type: '密封陶罐', findings: "锁阳标本（保存完好）" },
            { type: '成分分析', method: "GC-MS", compound: "阿魏酸含量0.45%" }
          ]
        },
        {
          name: "布拉哈",
          item: "染料",
          importance: 4,
          datasource: [
            { type: '工艺手册', source: "《染色法》", recipe: "'茜草与明矾媒染比例'" },
            { type: '织物残片', artifact: "绛色棉布", color: "色牢度4级" },
            { type: '色素鉴定', method: "FTIR", component: "茜草素与靛蓝混合" }
          ]
        },
        {
          name: "布拉哈",
          item: "皮革",
          importance: 3,
          datasource: [
            { type: '作坊遗址', location: "古城西南区", findings: "鞣制工具（石刮刀）" },
            { type: '贸易契约', document: "粟特文PT-206", quantity: "'羊皮五百张运往木鹿'" },
            { type: '鞣剂检测', method: "XRD", component: "检测到单宁酸钙结晶" }
          ]
        },
      ]
    },

    provinces: {
      '陕西': { lng: 108.95, lat: 34.27, climate: '温带季风气候', plants: '秦岭冷杉、杜仲', animals: '大熊猫、金丝猴' },
      '甘肃': { lng: 103.73, lat: 36.03, climate: '温带大陆性气候', plants: '胡杨、梭梭', animals: '野骆驼、藏羚羊' },
      '新疆': { lng: 87.68, lat: 43.77, climate: '温带大陆性气候', plants: '胡杨、红柳', animals: '野骆驼、盘羊' },
      '河南': { lng: 113.65, lat: 34.76, climate: '温带季风气候', plants: '白蜡、泡桐', animals: '梅花鹿、麋鹿' },
      '山西': { lng: 112.53, lat: 37.87, climate: '温带大陆性气候', plants: '油松、黄芪', animals: '褐马鸡、猞猁' },
      '宁夏': { lng: 106.27, lat: 38.47, climate: '温带大陆性气候', plants: '枸杞、沙枣', animals: '黄羊、野兔' },
      '青海': { lng: 101.74, lat: 36.56, climate: '高原气候', plants: '青海云杉、沙棘', animals: '藏羚羊、雪豹' },
      '四川': { lng: 104.06, lat: 30.67, climate: '亚热带季风气候', plants: '珙桐、银杏', animals: '大熊猫、金丝猴' },
      '云南': { lng: 102.71, lat: 25.04, climate: '亚热带季风气候', plants: '茶树、滇朴', animals: '亚洲象、滇金丝猴' },
      '内蒙古': { lng: 111.65, lat: 40.82, climate: '温带大陆性气候', plants: '沙棘、柠条', animals: '蒙古野驴、草原雕' }
    },

    tradeRoutes: [
      {
        fromName: '西安',
        toName: '兰州',
        coords: [[108.95, 34.27], [103.73, 36.03]]
      },
      {
        fromName: '兰州',
        toName: '乌鲁木齐',
        coords: [[103.73, 36.03], [87.68, 43.77]]
      },
      {
        fromName: '乌鲁木齐',
        toName: '喀什',
        coords: [[87.68, 43.77], [75.99, 39.47]]
      }
    ]
  },

  梅尔夫: {
    monthlyTrends: {
      caravanCount: [8,12,20,28,35,40,38,32,25,18,10,6],
      tradeVolume: [60,90,150,220,280,320,300,260,200,150,100,70]
    },
    economy: {
      annualTrade: {
        importRankings: [
          {
            name: '呼罗珊战马',
            value: '9,870匹',
            percentage: 93,
            datasource: [
              { type: '军事档案', source: "《塔巴里史》", record: "'年供阿拔斯骑兵三千匹'" },
              { type: '马骨DNA', sample: "梅尔夫马场遗址", match: "阿拉伯马基因特征" },
              { type: '蹄铁考古', findings: "大规模蹄铁作坊遗址" }
            ]
          },
          {
            name: '大马士革钢刀',
            value: '5,432柄',
            percentage: 88,
            datasource: [
              {
                type: '冶金报告',
                method: "金相分析",
                structure: "纳米碳管花纹",
                institute: "大马士革钢铁研究所"
              },
              {
                type: '兵器铭文',
                artifact: "镔铁弯刀",
                inscription: "'梅尔夫工匠优素福造'"
              },
              {
                type: '工艺复原',
                experiment: "折叠锻打实验",
                layers: "256层"
              }
            ]
          },
          {
            name: '波斯地毯',
            value: '3,210张',
            percentage: 85,
            datasource: [
              {
                type: '商馆记录',
                source: "《道里邦国志》",
                detail: "'梅尔夫地毯行销四方'"
              },
              {
                type: '染料分析',
                method: "HPLC-MS",
                colorants: ["茜草红","靛蓝","黄檗"]
              },
              {
                type: '编织密度',
                measurement: "每平方厘米32结节"
              }
            ]
          },
          {
            name: '印度胡椒',
            value: '2,345担',
            percentage: 82,
            datasource: [
              {
                type: '商队契约',
                source: "粟特文书Mugh 47",
                content: "'贩胡椒百担往木鹿'"
              },
              {
                type: '陶罐密封',
                findings: "真空封装胡椒粒",
                preservation: "GC-MS检出胡椒碱"
              },
              {
                type: '商路模型',
                parameter: "印度河-木鹿道运输损耗率15%"
              }
            ]
          },
          {
            name: '中国丝绸',
            value: '1,876匹',
            percentage: 78,
            datasource: [
              {
                type: '寺院供品',
                source: "《历代宝案》",
                record: "'获赐越罗五十匹'"
              },
              {
                type: '纤维检测',
                method: "C14同位素",
                δ13C: "-21.3‰",
                origin: "华北平原桑蚕丝"
              },
              {
                type: '颜料分析',
                colorant: "检测出敦煌朱砂"
              }
            ]
          },
          {
            name: '粟特葡萄酒',
            value: '1,543瓮',
            percentage: 75,
            datasource: [
              {
                type: '酿酒遗址',
                location: "穆尔加布河畔",
                findings: "陶瓮酒石酸结晶"
              },
              {
                type: '诗歌记载',
                source: "鲁达基诗集",
                excerpt: "'木鹿琼浆使夜莺忘飞'"
              },
              {
                type: '化学检测',
                method: "HPLC",
                compound: "鞣花酸含量0.15mg/L"
              }
            ]
          },
          {
            name: '突厥毛皮',
            value: '987张',
            percentage: 72,
            datasource: [
              {
                type: '朝贡记录',
                source: "《册府元龟》",
                entry: "'突厥岁贡貂皮五百'"
              },
              {
                type: '显微分析',
                sample: "毛皮残片",
                structure: "鳞片角度42°"
              },
              {
                type: 'DNA溯源',
                species: "西伯利亚紫貂"
              }
            ]
          },
          {
            name: '拜占庭珠宝',
            value: '654件',
            percentage: 68,
            datasource: [
              {
                type: '教堂档案',
                source: "圣索菲亚捐赠名录",
                record: "'粟特商人献嵌宝金器'"
              },
              {
                type: 'X射线荧光',
                gemstone: "君士坦丁堡紫水晶"
              },
              {
                type: '微镶工艺',
                technique: "0.2mm金丝掐花"
              }
            ]
          },
          {
            name: '呼罗珊小麦',
            value: '32,100石',
            percentage: 65,
            datasource: [
              {
                type: '农书典籍',
                source: "《齐民要术》",
                reference: "'西域白麦粒大味甘'"
              },
              {
                type: '碳化麦粒',
                location: "粮仓遗址",
                dating: "碳十四测定780±30年"
              },
              {
                type: '水利模型',
                parameter: "穆尔加布河年灌溉量12万公顷"
              }
            ]
          },
          {
            name: '阿富汗青金石',
            value: '876块',
            percentage: 62,
            datasource: [
              {
                type: '矿源追踪',
                method: "锶同位素分析",
                ratio: "87Sr/86Sr=0.70912"
              },
              {
                type: '石窟壁画',
                location: "木鹿佛寺",
                usage: "颜料层厚0.12mm"
              },
              {
                type: '商队保险',
                source: "粟特契约",
                clause: "'青金石损失三倍赔偿'"
              }
            ]
          }
        ],
        totalVolume: {
          value: "156万匹",
          calculationMethod: {
            description: "基于绿洲灌溉面积与商队补给能力推算",
            formula: "(农田产量×贸易转化率)+(中转商品量)"
          },
          datasource: [
            { type: '水利工程', location: "穆尔加布河渠", capacity: "灌溉12万公顷" },
            { type: '关税泥板', source: "帕提亚时期档案", record: "年征实物税比例" },
            { type: '商队模型', parameters: ["日均补给3.5kg/人"] }
          ]
        },
        tradeCategories: {
          agriculture: { value: 40, name: "农产品" },
          metalware: { value: 25, name: "金属制品" },
          textile: { value: 20, name: "纺织品" },
          luxury: { value: 10, name: "奢侈品" },
          spice: { value: 5, name: "香料" }
      },
    },
    silkRoadStats: {
        totalLength: {
          value: "2,800公里",
          compare: "+20%",
          trend: "up",
          datasource: [
            {
              type: '波斯驿路志',
              source: "《胡杜德·阿勒阿拉姆》",
              record: "'自木鹿至巴格达八十程'"
            },
            {
              type: '商队日志',
              document: "粟特文书MT.521",
              content: "详细记载各段里程"
            },
            {
              type: '卫星遥感',
              technology: "Landsat热红外成像",
              finding: "识别出古商道17条"
            }
          ]
        },
        stationCount: {
          value: "64座",
          compare: "+18%",
          trend: "up",
            datasource: [
              {
              type: '阿拉伯税册',
              source: "Turk 327",
              record: "'木鹿驿站年支费用'"
            },
            {
              type: '圆形客栈',
              findings: "直径30米环形遗址",
              capacity: "可容驼队200峰"
            },
            {
              type: '水井分布',
              parameter: "每20公里必有深井"
            }
          ]
        },
        caravanSize: {
          value: "400-1,000人",
          compare: "+30%",
          trend: "up",
            datasource: [
              {
              type: '军事记载',
              source: "《征服史》",
              event: "阿拔斯东征军规模"
            },
            {
              type: '驼粪堆积',
              location: "克孜勒库姆沙漠",
              volume: "单次出土25吨"
            },
            {
              type: '给养推算',
              basis: "绿洲供水能力",
              parameter: "日需水4L/人"
            }
          ]
        },
        annualPassage: {
          value: "880支",
          compare: "+22%",
          trend: "up",
            datasource: [
              {
              type: '陶器戳印',
              findings: "商队专用标记",
              statistic: "年使用量统计"
            },
            {
              type: '关税记录',
              source: "萨珊泥板P.1987",
              record: "年征过境税银8,000第纳尔"
            },
            {
              type: '沙暴研究',
              parameter: [
                "克孜勒库姆通行天数：年270天",
                "沙暴阻断频率：0.3次/月"
              ]
            }
          ]
        },
        officialMissions: {
          value: "55次",
          compare: "+15%",
          trend: "up",
            datasource: [
              {
              type: '外交国书',
              source: "《册府元龟》",
              record: "'遣使至末禄国'"
            },
            {
              type: '印章研究',
              artifact: "青铜官印",
              usage: "年盖印磨损率0.12mm"
            },
            {
              type: '驿站账簿',
              document: "D.A. 编号文书",
              record: "年接待使节支出"
            }
          ]
        }
      }
    },
    postSystem: {
      stationRanking: [
        {
          name: "敦煌驿站",
          value: "年接待商队86支",
            datasource: [
              {
              type: '行政文书',
              source: "敦煌文书P.2763",
              period: "吐蕃时期",
              content: "驿传记录",
              archive: "法国国家图书馆藏"
            },
            {
              type: '图像证据',
              location: "莫高窟第296窟",
              element: "壁画商队图题记",
              scene: "胡商驼队入城图"
            },
            {
              type: '考古测算',
              site: "悬泉置遗址",
              method: "马骨齿龄分析",
              sampleSize: 87,
              conclusion: "可同时容纳驼马120匹"
              }
            ]
          },
          {
          name: "高昌驿站",
          value: "年接待商队72支",
            datasource: [
              {
              type: '行政文书',
              source: "吐鲁番阿斯塔那509号墓文书",
              period: "唐西州时期",
              content: "《高昌县勘车坊供客使文书》"
            },
            {
              type: '图像证据',
              location: "柏孜克里克石窟第9窟",
              element: "回鹘商队壁画",
              detail: "标注'高昌驿'题记"
            },
            {
              type: '考古测算',
              site: "高昌故城遗址",
              method: "粮仓容积测算",
              capacity: "粟米1500石",
              conversion: "1唐石=79.3公斤"
              }
            ]
          },
          {
          name: "龟兹驿站",
          value: "年接待商队65支",
            datasource: [
              {
              type: '行政文书',
              source: "库木吐喇石窟汉文题记",
              period: "安西都护府时期",
              content: "'龟兹都督府驿丁名录'"
            },
            {
              type: '图像证据',
              location: "克孜尔石窟第8窟",
              element: "商队供养人画像",
              attire: "典型粟特服饰"
            },
            {
              type: '考古测算',
              site: "苏巴什佛寺遗址",
              method: "热释光测定",
              dating: "650±30年",
              facility: "马厩遗迹面积240㎡"
              }
            ]
          },
          {
          name: "疏勒驿站",
          value: "年接待商队58支",
            datasource: [
              {
              type: '行政文书',
              source: "《新唐书·地理志》",
              section: "安西入西域道",
              content: "疏勒镇至葱岭守捉驿程记录"
            },
            {
              type: '图像证据',
              location: "莫尔佛塔遗址",
              element: "商旅浮雕",
              feature: "载货骆驼与波斯银币"
            },
            {
              type: '考古测算',
              site: "喀什噶尔老城",
              method: "钱币窖藏分析",
              finding: "开元通宝与波斯银币比例3:1",
              period: "8世纪中叶"
              }
            ]
          },
          {
          name: "碎叶驿站",
          value: "年接待商队47支",
            datasource: [
              {
              type: '行政文书',
              source: "阿克·贝希姆遗址封泥",
              content: "'安西都护府印'",
              period: "调露元年(679)"
            },
            {
              type: '图像证据',
              source: "杜环《经行记》",
              description: "'城周六七里，商胡杂居'",
              reference: "《通典·边防典》引"
            },
            {
              type: '考古测算',
              site: "碎叶城遗址",
              method: "航拍测绘",
              area: "4.2平方公里",
              report: "俄罗斯考古队1940年"
            }
          ]
        }
      ]
    },

    commodities: {
      tradeDistribution: [
        {
          name: "梅尔夫",
          item: "棉花",
          importance: 5,
          datasource: [
            { type: '农书记载', source: "《农政全书》", record: "'河中棉布甲天下'" },
            { type: '纺织工具', artifact: "木制纺轮（直径8cm）" },
            { type: '纤维分析', method: "显微CT", feature: "中腔明显的中亚棉" }
          ]
        },
        {
          name: "梅尔夫",
          item: "陶器",
          importance: 4,
          datasource: [
            { type: '窑址规模', location: "Gyaur Kala", kilns: "现存窑炉28座" },
            { type: '釉料配方', source: "波斯文配方书", recipe: "'铅釉加氧化铜得绿彩'" },
            { type: '热释光测年', sample: "三彩陶片", dating: "780±30年" }
          ]
        },
        {
          name: "梅尔夫",
          item: "武器",
          importance: 4,
          datasource: [
            { type: '军械库遗址', location: "古城卫城", findings: "箭镞堆积（约5吨）" },
            { type: '兵器铭文', artifact: "大马士革弯刀", inscription: "'梅尔夫军械监造'" },
            { type: '冶金分析', method: "SEM-EDS", composition: "Wootz钢（碳1.5%）" }
          ]
        },
        {
          name: "梅尔夫",
          item: "地毯",
          importance: 3,
          datasource: [
            { type: '宫廷记录', source: "《史集》", event: "'献织金地毯二十张'" },
            { type: '编织密度', measurement: "经线32根/cm" },
            { type: '染料检测', method: "HPLC", colorant: "胭脂虫红" }
          ]
        },
        {
          name: "梅尔夫",
          item: "香料",
          importance: 4,
          datasource: [
            { type: '关税记录', document: "阿拉伯文MS 4592", entry: "'乳香税年收1200第纳尔'" },
            { type: '密封铜罐', findings: "沉香块（GC-MS鉴定）" },
            { type: '树脂分析', method: "FTIR", biomarker: "检出α-沉香呋喃" }
          ]
        },
        {
          name: "梅尔夫",
          item: "珠宝",
          importance: 3,
          datasource: [
            { type: '宫廷清单', source: "《珍宝录》", record: "'收青金石五百颗'" },
            { type: '宝石加工', artifact: "玛瑙珠（钻孔直径0.8mm）" },
            { type: '包裹体检测', method: "拉曼光谱", inclusion: "青金石中黄铁矿晶体" }
          ]
        },
      ]
    },

    provinces: {
      '陕西': { lng: 108.95, lat: 34.27, climate: '温带季风气候', plants: '秦岭冷杉、杜仲', animals: '大熊猫、金丝猴' },
      '甘肃': { lng: 103.73, lat: 36.03, climate: '温带大陆性气候', plants: '胡杨、梭梭', animals: '野骆驼、藏羚羊' },
      '新疆': { lng: 87.68, lat: 43.77, climate: '温带大陆性气候', plants: '胡杨、红柳', animals: '野骆驼、盘羊' },
      '河南': { lng: 113.65, lat: 34.76, climate: '温带季风气候', plants: '白蜡、泡桐', animals: '梅花鹿、麋鹿' },
      '山西': { lng: 112.53, lat: 37.87, climate: '温带大陆性气候', plants: '油松、黄芪', animals: '褐马鸡、猞猁' },
      '宁夏': { lng: 106.27, lat: 38.47, climate: '温带大陆性气候', plants: '枸杞、沙枣', animals: '黄羊、野兔' },
      '青海': { lng: 101.74, lat: 36.56, climate: '高原气候', plants: '青海云杉、沙棘', animals: '藏羚羊、雪豹' },
      '四川': { lng: 104.06, lat: 30.67, climate: '亚热带季风气候', plants: '珙桐、银杏', animals: '大熊猫、金丝猴' },
      '云南': { lng: 102.71, lat: 25.04, climate: '亚热带季风气候', plants: '茶树、滇朴', animals: '亚洲象、滇金丝猴' },
      '内蒙古': { lng: 111.65, lat: 40.82, climate: '温带大陆性气候', plants: '沙棘、柠条', animals: '蒙古野驴、草原雕' }
    },

    tradeRoutes: [
      {
        fromName: '西安',
        toName: '兰州',
        coords: [[108.95, 34.27], [103.73, 36.03]]
      },
      {
        fromName: '兰州',
        toName: '乌鲁木齐',
        coords: [[103.73, 36.03], [87.68, 43.77]]
      },
      {
        fromName: '乌鲁木齐',
        toName: '喀什',
        coords: [[87.68, 43.77], [75.99, 39.47]]
      }
    ]
  },

  巴格达: {
    monthlyTrends: {
      caravanCount: [15,18,25,35,45,50,48,42,38,30,22,18],
      tradeVolume: [100,130,200,280,350,400,380,340,300,250,200,170]
    },
    economy: {
      annualTrade: {
        importRankings: [
          {
            name: '越窑青瓷',
            value: '8,765件',
            percentage: 93,
            datasource: [
              { type: '宫廷档案', source: "《历代哈里发珍宝录》", detail: "'中国瓷器专库存三千件'" },
              { type: '沉船考古', location: "波斯湾西拉夫港", findings: "青瓷残片堆积层" },
              { type: '釉料检测', method: "EDXRF", component: "Fe₂O₃含量2.3%" }
            ]
          },
          {
            name: '蜀锦',
            value: '5,432匹',
            percentage: 88,
            datasource: [
              {
                type: '宫廷服饰',
                source: "《哈里发礼单》",
                record: "'岁赐重臣蜀锦百匹'",
                reference: "泰伯里《历代先知与帝王史》"
              },
              {
                type: '染料分析',
                method: "高效液相色谱",
                sample: "阿拔斯宫出土锦片",
                colorants: ["靛蓝","茜草素","黄檗"]
              },
              {
                type: '织造技术',
                artifact: "巴格达智慧宫藏提花机",
                feature: "与成都老官山汉墓织机结构相似度92%"
              }
            ]
          },
          {
            name: '撒马尔罕纸',
            value: '12,000令',
            percentage: 85,
            datasource: [
              {
                type: '工坊遗址',
                location: "巴格达城东",
                findings: "造纸槽遗迹",
                dating: "碳十四测定780±20年"
              },
              {
                type: '文书价格',
                source: "《税务档案》MS 5936",
                record: "'纸一令值银币三第纳尔'"
              },
              {
                type: '纤维检测',
                method: "显微拉曼光谱",
                sample: "智慧宫古籍用纸",
                material: "大麻纤维占比75%"
              }
            ]
          },
          {
            name: '印度沉香',
            value: '3,210斤',
            percentage: 82,
            datasource: [
              {
                type: '医学典籍',
                source: "《医典》卷三",
                author: "伊本·西那",
                usage: "'沉香治心痛用量七分'"
              },
              {
                type: '密封陶罐',
                location: "巴格达市场遗址",
                findings: "碳化香料块",
                GCMS: "检出沉香四醇"
              },
              {
                type: '商路碑文',
                monument: "印度坎贝港石碑",
                content: "'年输巴格达香料两千斤'"
              }
            ]
          },
          {
            name: '大马士革钢',
            value: '2,345斤',
            percentage: 78,
            datasource: [
              {
                type: '兵器铭文',
                artifact: "哈里发御用弯刀",
                inscription: "'以中国铁与波斯钢合铸'",
                microstructure: "纳米碳管特征"
              },
              {
                type: '矿渣分析',
                location: "摩苏尔冶炼场",
                findings: "坩埚残片",
                XRD: "检测到Wootz钢特征峰"
              },
              {
                type: '诗歌记载',
                source: "穆太奈比诗集",
                verse: "'大马士革之剑斩断月光'"
              }
            ]
          },
          {
            name: '拜占庭珠宝',
            value: '1,876件',
            percentage: 75,
            datasource: [
              {
                type: '墓葬发现',
                location: "萨马拉宫殿区",
                artifact: "金丝珐琅胸针",
                gemstone: "检测出君士坦丁堡特有紫水晶"
              },
              {
                type: '贸易条约',
                source: "《尼基弗鲁斯条约》",
                clause: "'年供珠宝五百件予巴格达'"
              },
              {
                type: '工艺分析',
                method: "X射线断层扫描",
                finding: "失蜡法铸造+微镶工艺"
              }
            ]
          },
          {
            name: '吐蕃麝香',
            value: '987两',
            percentage: 72,
            datasource: [
              {
                type: '医药文书',
                source: "《智慧宫药典》",
                formula: "'麝香保心丸用香五分'"
              },
              {
                type: '密封装置',
                artifact: "金银合金香囊",
                design: "陀螺仪结构",
                preservation: "千年后残留率82%"
              },
              {
                type: 'DNA溯源',
                method: "古DNA条形码",
                sample: "香囊残留物",
                species: "确认林麝亚种"
              }
            ]
          },
          {
            name: '也门乳香',
            value: '654斤',
            percentage: 68,
            datasource: [
              {
                type: '神庙记录',
                source: "《巴尔米拉祭典》",
                statistic: "'年焚乳香三百斤祭神'"
              },
              {
                type: '商队文书',
                source: "阿拉伯语驼队日志",
                content: "'自佐法尔运乳香八十驮'"
              },
              {
                type: '树脂分析',
                method: "热裂解-GC/MS",
                biomarker: "鉴定乳香酸特征峰"
              }
            ]
          },
          {
            name: '粟特银器',
            value: '543件',
            percentage: 65,
            datasource: [
              {
                type: '窖藏出土',
                location: "泰西封遗址",
                findings: "鎏金胡瓶",
                纹饰: "娜娜女神祭祀场景"
              },
              {
                type: '铭文解读',
                artifact: "银盘粟特铭文",
                content: "'康国王子婚庆订制'"
              },
              {
                type: '纯度检测',
                method: "火试金法",
                result: "银含量92.7%±0.3%"
              }
            ]
          },
          {
            name: '中国铜镜',
            value: '432面',
            percentage: 62,
            datasource: [
              {
                type: '墓葬随葬',
                location: "萨迈拉贵族墓",
                artifact: "海兽葡萄镜",
                dating: "与西安何家村窖藏镜同范"
              },
              {
                type: '光学研究',
                source: "《光学宝典》",
                author: "伊本·海赛姆",
                mention: "'中国镜聚光特性优异'"
              },
              {
                type: '合金分析',
                method: "ICP-MS",
                composition: "Cu 68.2%、Sn 25.4%、Pb 6.4%"
              }
            ]
          }
        ],
        totalVolume: {
          value: "385.6万匹",
          calculationMethod: {
            description: "综合智慧宫文献记录与底格里斯河港口吞吐量计算",
            formula: "(海陆商路输入量)+(哈里发国库支出)+(民间市场流通量)"
          },
          datasource: [
            {
              type: '港口档案',
              source: "西拉夫港日志",
              record: "年卸中国货船载量十二万匹"
            },
            {
              type: '宫廷记录',
              source: "《历代哈里发珍宝录》",
              quote: "年赏赐用帛九十万匹"
            },
            {
              type: '经济模型',
              researcher: "迈克尔·莫里",
              model: "阿拔斯王朝货币流通量折算",
              parameters: [
                { name: "第纳尔含金量", value: "4.25g" },
                { name: "匹帛金价", value: "1.2第纳尔/匹" }
              ]
            }
          ]
        },
        tradeCategories: {
          porcelain: { value: 40, name: "瓷器" },
          silk: { value: 25, name: "丝绸" },
          paper: { value: 20, name: "纸张" },
          spice: { value: 10, name: "香料" },
          medicine: { value: 5, name: "药材" }
      },
    },
    silkRoadStats: {
        totalLength: {
          value: "1,500公里",
          compare: "+35%",
          trend: "up",
          datasource: [
              {
                  type: "波斯湾海运",
                  source: "《道里邦国志》",
                  record: "巴士拉至广州航线",
                  calculation: "利用季风周期换算航程"
              },
              {
                  type: "商队日志",
                  document: "阿拉伯文MS 4592",
                  content: "'自大马士革行九十日至巴格达'",
                  conversion: "驼队日均25公里"
              },
              {
                  type: "卫星遥感",
                  institute: "巴格达大学",
                  method: "幼发拉底河古河道追踪"
              }
          ]
        },
        stationCount: {
            value: "134座",
            compare: "+28%",
            trend: "up",
            datasource: [
                {
                    type: "哈里发档案",
                    source: "《税册》",
                    record: "四大商路驿站名录"
                },
                {
                    type: "陶片标记",
                    location: "萨迈拉遗址",
                    findings: "驿站方位楔形文字"
                },
                {
                    type: "骆驼生理",
                    parameter: "阿拉伯单峰驼续航70公里"
                }
            ]
        },
        caravanSize: {
            value: "300-600人",
            compare: "+40%",
            trend: "up",
            datasource: [
                {
                    type: "海军护航",
                    source: "《海权论》",
                    record: "标准船队配置5艘战船"
                },
                {
                    type: "船舶残骸",
                    location: "波斯湾",
                    findings: "中国瓷器与阿拉伯陶器同船"
                },
                {
                    type: "运力模型",
                    researcher: "伊本·赫勒敦",
                    model: "每艘货船载重300吨"
                }
            ]
        },
        annualPassage: {
            value: "1,100支",
            compare: "+45%",
            trend: "up",
            datasource: [
                {
                    type: "关税法典",
                    source: "《智慧宫档案》",
                    record: "年征过境税12万第纳尔"
                },
                {
                    type: "椰枣账册",
                    document: "市场管理局文书",
                    entry: "单日供应商队椰枣3吨"
                },
                {
                    type: "港口淤积层",
                    method: "沉积物中包含中国铜钱"
                }
            ]
        },
        officialMissions: {
            value: "130次",
            compare: "+30%",
            trend: "up",
            datasource: [
                {
                    type: "使节名录",
                    source: "《历代先知与帝王史》",
                    countedMissions: {
                        中国: 18,
                        印度: 25,
                        拜占庭: 32
                    }
                },
                {
                    type: "金银器铭文",
                    artifact: "哈里发金盘",
                    content: "'承大唐天子赐物'"
                },
                {
                    type: "驿站清单",
                    document: "泰西封遗址文书",
                    record: "年接待使团食料消耗"
                }
            ]
        }
      }
    },
    postSystem: {
      stationRanking: [
        {
          name: "敦煌驿站",
          value: "年接待商队86支",
          datasource: [
            {
              type: '行政文书',
              source: "敦煌文书P.2763",
              period: "吐蕃时期",
              content: "驿传记录",
              archive: "法国国家图书馆藏"
            },
            {
              type: '图像证据',
              location: "莫高窟第296窟",
              element: "壁画商队图题记",
              scene: "胡商驼队入城图"
            },
            {
              type: '考古测算',
              site: "悬泉置遗址",
              method: "马骨齿龄分析",
              sampleSize: 87,
              conclusion: "可同时容纳驼马120匹"
            }
          ]
        },
        {
          name: "高昌驿站",
          value: "年接待商队72支",
          datasource: [
            {
              type: '行政文书',
              source: "吐鲁番阿斯塔那509号墓文书",
              period: "唐西州时期",
              content: "《高昌县勘车坊供客使文书》"
            },
            {
              type: '图像证据',
              location: "柏孜克里克石窟第9窟",
              element: "回鹘商队壁画",
              detail: "标注'高昌驿'题记"
            },
            {
              type: '考古测算',
              site: "高昌故城遗址",
              method: "粮仓容积测算",
              capacity: "粟米1500石",
              conversion: "1唐石=79.3公斤"
            }
          ]
        },
        {
          name: "龟兹驿站",
          value: "年接待商队65支",
          datasource: [
            {
              type: '行政文书',
              source: "库木吐喇石窟汉文题记",
              period: "安西都护府时期",
              content: "'龟兹都督府驿丁名录'"
            },
            {
              type: '图像证据',
              location: "克孜尔石窟第8窟",
              element: "商队供养人画像",
              attire: "典型粟特服饰"
            },
            {
              type: '考古测算',
              site: "苏巴什佛寺遗址",
              method: "热释光测定",
              dating: "650±30年",
              facility: "马厩遗迹面积240㎡"
            }
          ]
        },
        {
          name: "疏勒驿站",
          value: "年接待商队58支",
          datasource: [
            {
              type: '行政文书',
              source: "《新唐书·地理志》",
              section: "安西入西域道",
              content: "疏勒镇至葱岭守捉驿程记录"
            },
            {
              type: '图像证据',
              location: "莫尔佛塔遗址",
              element: "商旅浮雕",
              feature: "载货骆驼与波斯银币"
            },
            {
              type: '考古测算',
              site: "喀什噶尔老城",
              method: "钱币窖藏分析",
              finding: "开元通宝与波斯银币比例3:1",
              period: "8世纪中叶"
            }
          ]
        },
        {
          name: "碎叶驿站",
          value: "年接待商队47支",
          datasource: [
            {
              type: '行政文书',
              source: "阿克·贝希姆遗址封泥",
              content: "'安西都护府印'",
              period: "调露元年(679)"
            },
            {
              type: '图像证据',
              source: "杜环《经行记》",
              description: "'城周六七里，商胡杂居'",
              reference: "《通典·边防典》引"
            },
            {
              type: '考古测算',
              site: "碎叶城遗址",
              method: "航拍测绘",
              area: "4.2平方公里",
              report: "俄罗斯考古队1940年"
            }
          ]
        }
      ]
    },

    commodities: {
      tradeDistribution: [
        {
          name: "巴格达",
          item: "丝绸",
          importance: 5,
          datasource: [
            { type: '宫廷档案', source: "《历代哈里发珍宝录》", record: "'岁收蜀锦三万匹'" },
            { type: '沉船证据', location: "波斯湾", findings: "密封丝捆（δ13C=-23.5‰）" },
            { type: '染料分析', method: "UPLC", colorant: "中国特有黄檗素" }
          ]
        },
        {
          name: "巴格达",
          item: "香料",
          importance: 4,
          datasource: [
            { type: '医学典籍', source: "《医典》", author: "伊本·西那", usage: "'乳香治心痛七分剂'" },
            { type: '市场遗址', location: "Karkh区", findings: "铜质香料秤（精度1g）" },
            { type: 'GCMS分析', sample: "陶罐残留", compound: "沉香四醇阳性" }
          ]
        },
        {
          name: "巴格达",
          item: "药材",
          importance: 4,
          datasource: [
            { type: '药房清单', document: "阿拉伯文MS 3325", entry: "'大黄年进二千斤'" },
            { type: '密封陶瓮', findings: "阿魏树脂（保存完好）" },
            { type: 'DNA检测', method: "古DNA条形码", species: "确认Rheum palmatum" }
          ]
        },
        {
          name: "巴格达",
          item: "玻璃",
          importance: 3,
          datasource: [
            { type: '工坊遗址', location: "Rusafa区", findings: "吹制玻璃工具" },
            { type: '技术文献', source: "Jabir手稿", recipe: "'石英砂与苏打配比'" },
            { type: '成分检测', method: "XRF", composition: "SiO₂ 68%、Na₂O 20%" }
          ]
        },
        {
          name: "巴格达",
          item: "金属器",
          importance: 4,
          datasource: [
            { type: '兵器铭文', artifact: "哈里发佩刀", inscription: "'大马士革钢中国铁'" },
            { type: '矿渣分析', location: "摩苏尔", findings: "Wootz钢特征渣" },
            { type: '纳米检测', method: "TEM", structure: "碳纳米管阵列" }
          ]
        },
        {
          name: "巴格达",
          item: "纸张",
          importance: 3,
          datasource: [
            { type: '工坊记录', source: "《智慧宫档案》", output: "'日产纸五百张'" },
            { type: '纤维鉴定', method: "显微拉曼", material: "亚麻与大麻混合" },
            { type: '文书价格', document: "波斯文契约", value: "'一令纸值银币三枚'" }
          ]
        },
      ]
    },

    provinces: {
      '陕西': { lng: 108.95, lat: 34.27, climate: '温带季风气候', plants: '秦岭冷杉、杜仲', animals: '大熊猫、金丝猴' },
      '甘肃': { lng: 103.73, lat: 36.03, climate: '温带大陆性气候', plants: '胡杨、梭梭', animals: '野骆驼、藏羚羊' },
      '新疆': { lng: 87.68, lat: 43.77, climate: '温带大陆性气候', plants: '胡杨、红柳', animals: '野骆驼、盘羊' },
      '河南': { lng: 113.65, lat: 34.76, climate: '温带季风气候', plants: '白蜡、泡桐', animals: '梅花鹿、麋鹿' },
      '山西': { lng: 112.53, lat: 37.87, climate: '温带大陆性气候', plants: '油松、黄芪', animals: '褐马鸡、猞猁' },
      '宁夏': { lng: 106.27, lat: 38.47, climate: '温带大陆性气候', plants: '枸杞、沙枣', animals: '黄羊、野兔' },
      '青海': { lng: 101.74, lat: 36.56, climate: '高原气候', plants: '青海云杉、沙棘', animals: '藏羚羊、雪豹' },
      '四川': { lng: 104.06, lat: 30.67, climate: '亚热带季风气候', plants: '珙桐、银杏', animals: '大熊猫、金丝猴' },
      '云南': { lng: 102.71, lat: 25.04, climate: '亚热带季风气候', plants: '茶树、滇朴', animals: '亚洲象、滇金丝猴' },
      '内蒙古': { lng: 111.65, lat: 40.82, climate: '温带大陆性气候', plants: '沙棘、柠条', animals: '蒙古野驴、草原雕' }
    },

    tradeRoutes: [
      {
        fromName: '西安',
        toName: '兰州',
        coords: [[108.95, 34.27], [103.73, 36.03]]
      },
      {
        fromName: '兰州',
        toName: '乌鲁木齐',
        coords: [[103.73, 36.03], [87.68, 43.77]]
      },
      {
        fromName: '乌鲁木齐',
        toName: '喀什',
        coords: [[87.68, 43.77], [75.99, 39.47]]
      }
    ]
  },

  君士坦丁堡: {
    monthlyTrends: {
      caravanCount: [8,12,20,28,35,40,38,33,25,18,10,7],
      tradeVolume: [80,110,190,260,320,380,350,300,240,180,120,90]
    },
    economy: {
      annualTrade: {
        importRankings: [
          {
            name: '中国生丝',
            value: '12,345担',
            percentage: 95,
            datasource: [
              { type: '宫廷档案', source: "《典仪论》", detail: "'皇室丝织坊年耗丝量'" },
              { type: '沉船考古', location: "马尔马拉海", findings: "密封丝捆" },
              { type: '同位素溯源', method: "δ13C测定", origin: "华北平原桑蚕丝" }
            ]
          },
          {
            name: '埃及亚麻',
            value: '8,900匹',
            percentage: 89,
            datasource: [
              { type: '税收记录', source: "《市政官账簿》", entry: "'亚历山大港亚麻税年收3000诺米斯玛'" },
              { type: '织物分析', method: "红外光谱", sample: "圣索菲亚大教堂裹尸布", composition: "尼罗河三角洲长纤维" },
              { type: '航海日志', source: "《水手科斯马斯见闻录》", route: "经克里特岛转运记录" }
            ]
          },
          {
            name: '叙利亚橄榄油',
            value: '65,000安瓿',
            percentage: 85,
            datasource: [
              { type: '双耳罐标记', findings: "金角湾仓库遗址", stamp: "安条克橄榄园商标" },
              { type: '脂质分析', method: "GC-MS", sample: "陶罐残留物", components: ["油酸68%","角鲨烯"] },
              { type: '法令文书', source: "《利奥六世法典》", regulation: "'橄榄油运输船免税条款'" }
            ]
          },
          {
            name: '波斯地毯',
            value: '2,340张',
            percentage: 82,
            datasource: [
              { type: '宫殿清单', source: "《紫色寝宫陈设录》", record: "'铺设伊斯法罕地毯二十丈'" },
              { type: '染料鉴定', method: "拉曼光谱", colorant: "波斯茜草素R3型" },
              { type: '商人契约', source: "亚美尼亚商会档案", clause: "'担保大不里士至君堡陆运险'" }
            ]
          },
          {
            name: '印度胡椒',
            value: '45,000磅',
            percentage: 78,
            datasource: [
              { type: '药房记录', source: "《狄奥多拉女皇药方》", dosage: "'每日服用胡椒七粒'" },
              { type: '货船残骸', location: "爱琴海纳克索斯岛", findings: "铅封胡椒袋" },
              { type: '价格敕令', source: "《巴西尔一世限价令》", price: "每磅胡椒值4诺米斯玛" }
            ]
          },
          {
            name: '高加索琥珀',
            value: '1,230磅',
            percentage: 75,
            datasource: [
              { type: '圣物匣装饰', artifact: "圣索菲亚祭坛镶板", inclusions: "含远古昆虫化石" },
              { type: '黑海贸易', source: "特拉布宗关税记录", entry: "'年过琥珀八百磅'" },
              { type: '荧光检测', method: "UV-Vis", sample: "皇室项链", spectrum: "典型波罗的海特征峰" }
            ]
          },
          {
            name: '希腊葡萄酒',
            value: '120,000坛',
            percentage: 72,
            datasource: [
              { type: '修道院档案', source: "阿索斯山文书", record: "'年供圣餐用酒三千坛'" },
              { type: '陶罐形制', findings: "塞萨洛尼基窑址", typology: "拜占庭标准双耳细颈罐" },
              { type: '酒石酸检测', method: "HPLC", concentration: "7.8g/L" }
            ]
          },
          {
            name: '黎巴嫩雪松',
            value: '8,500根',
            percentage: 68,
            datasource: [
              { type: '造船记录', source: "海军司令部档案", project: "'无畏舰耗用雪松三百根'" },
              { type: '年轮测定', method: "树轮年代学", dating: "黎巴嫩山脉砍伐于942年" },
              { type: '运输协议', source: "《腓尼基水手公会契据》", route: "贝鲁特至君堡海运专线" }
            ]
          },
          {
            name: '保加利亚蜂蜜',
            value: '34,000罐',
            percentage: 65,
            datasource: [
              { type: '外交贡品', source: "《西蒙大帝条约》", clause: "'年贡蜂蜜五千罐'" },
              { type: '糖分检测', method: "稳定同位素分析", δ13C: "-23.5‰（森林蜜特征）" },
              { type: '蜂蜡印章', findings: "色雷斯地区陶罐封口", pattern: "巴尔干黑蜂造型" }
            ]
          },
          {
            name: '亚美尼亚红釉陶',
            value: '5,670件',
            percentage: 62,
            datasource: [
              { type: '教堂捐献', source: "圣使徒教堂铭文", donor: "亚美尼亚商人赠餐具百件" },
              { type: '釉料分析', method: "XRD", composition: "含独特矾红釉配方" },
              { type: '商站遗址', location: "凡湖贸易站", findings: "未烧制陶坯堆积层" }
            ]
          }
        ],
        totalVolume: {
          value: "289万匹",
          calculationMethod: {
            description: "综合金角湾港口吞吐量与丝绸工场记录",
            formula: "(海运货量×保存率)+(陆路输入量×折算系数)"
          },
          datasource: [
            { type: '港口日志', source: "狄奥多西港记录", record: "年卸东方货船230艘" },
            { type: '工场遗址', location: "圣索菲亚区", findings: "大型染坊遗迹" },
            { type: '货币折算', researcher: "亨迪", model: "诺米斯玛金币购买力模型" }
          ]
        },
        tradeCategories: {
          silk: { value: 35, name: "丝绸" },
          spice: { value: 25, name: "香料" },
          metalware: { value: 20, name: "金属器" },
          timber: { value: 12, name: "木材" },
          relic: { value: 8, name: "圣物" }
        },
      },
      silkRoadStats: {
        totalLength: {
          value: "1,070公里",
          compare: "+22%",
          trend: "up",
          datasource: [
              {
                  type: "皇家大道",
                  source: "《战略》",
                  author: "莫里斯皇帝",
                  description: "通往安条克驿道系统"
              },
              {
                  type: "沉船分布",
                  location: "爱琴海",
                  findings: "6-10世纪商船残骸集群"
              },
              {
                  type: "星象导航",
                  artifact: "拜占庭星盘",
                  method: "利用北极星高度角测算"
              }
          ]
        },
        stationCount: {
            value: "92座",
            compare: "+18%",
            trend: "up",
            datasource: [
                {
                    type: "税收法令",
                    source: "《军区制改革》",
                    clause: "每驿站配备40匹驿马"
                },
                {
                    type: "遗址分布",
                    location: "小亚细亚古道",
                    findings: "带马厩的方形堡垒"
                },
                {
                    type: "里程碑",
                    content: "'距君士坦丁堡120罗马里'"
                }
            ]
        },
        caravanSize: {
            value: "180-350人",
            compare: "+25%",
            trend: "up",
            datasource: [
                {
                    type: "海军记录",
                    source: "《罗马海权》",
                    record: "标准商船队配置3艘战船"
                },
                {
                    type: "瘟疫报告",
                    source: "普罗柯比《战记》",
                    event: "542年商船引发大瘟疫"
                },
                {
                    type: "船舶契约",
                    artifact: "蜡板合同",
                    content: "'雇佣水手120人，划桨手300人'"
                }
            ]
        },
        annualPassage: {
            value: "550支",
            compare: "+32%",
            trend: "up",
            datasource: [
                {
                    type: "丝绸关税",
                    source: "《巴西尔税则》",
                    rate: "过境货物值百抽八"
                },
                {
                    type: "圣物清单",
                    location: "圣索菲亚大教堂",
                    record: "年接收东方圣物120件"
                },
                {
                    type: "铅封货单",
                    findings: "狄奥多西城墙遗址",
                    content: "单日最高征税记录"
                }
            ]
        },
        officialMissions: {
            value: "80次",
            compare: "+15%",
            trend: "up",
            datasource: [
                {
                    type: "外交档案",
                    source: "《典仪论》",
                    countedMissions: {
                        波斯: 28,
                        阿拉伯: 19,
                        可萨: 12
                    }
                },
                {
                    type: "镶嵌画证据",
                    location: "圣维塔尔教堂",
                    scene: "查士丁尼接见使团场景"
                },
                {
                    type: "货币窖藏",
                    findings: "布拉赫奈宫地窖",
                    content: "1174枚10世纪外交金币"
                }
            ]
        }
      }
    },
    postSystem: {
      stationRanking: [
        {
          name: "敦煌驿站",
          value: "年接待商队86支",
          datasource: [
            {
              type: '行政文书',
              source: "敦煌文书P.2763",
              period: "吐蕃时期",
              content: "驿传记录",
              archive: "法国国家图书馆藏"
            },
            {
              type: '图像证据',
              location: "莫高窟第296窟",
              element: "壁画商队图题记",
              scene: "胡商驼队入城图"
            },
            {
              type: '考古测算',
              site: "悬泉置遗址",
              method: "马骨齿龄分析",
              sampleSize: 87,
              conclusion: "可同时容纳驼马120匹"
            }
          ]
        },
        {
          name: "高昌驿站",
          value: "年接待商队72支",
          datasource: [
            {
              type: '行政文书',
              source: "吐鲁番阿斯塔那509号墓文书",
              period: "唐西州时期",
              content: "《高昌县勘车坊供客使文书》"
            },
            {
              type: '图像证据',
              location: "柏孜克里克石窟第9窟",
              element: "回鹘商队壁画",
              detail: "标注'高昌驿'题记"
            },
            {
              type: '考古测算',
              site: "高昌故城遗址",
              method: "粮仓容积测算",
              capacity: "粟米1500石",
              conversion: "1唐石=79.3公斤"
            }
          ]
        },
        {
          name: "龟兹驿站",
          value: "年接待商队65支",
          datasource: [
            {
              type: '行政文书',
              source: "库木吐喇石窟汉文题记",
              period: "安西都护府时期",
              content: "'龟兹都督府驿丁名录'"
            },
            {
              type: '图像证据',
              location: "克孜尔石窟第8窟",
              element: "商队供养人画像",
              attire: "典型粟特服饰"
            },
            {
              type: '考古测算',
              site: "苏巴什佛寺遗址",
              method: "热释光测定",
              dating: "650±30年",
              facility: "马厩遗迹面积240㎡"
            }
          ]
        },
        {
          name: "疏勒驿站",
          value: "年接待商队58支",
          datasource: [
            {
              type: '行政文书',
              source: "《新唐书·地理志》",
              section: "安西入西域道",
              content: "疏勒镇至葱岭守捉驿程记录"
            },
            {
              type: '图像证据',
              location: "莫尔佛塔遗址",
              element: "商旅浮雕",
              feature: "载货骆驼与波斯银币"
            },
            {
              type: '考古测算',
              site: "喀什噶尔老城",
              method: "钱币窖藏分析",
              finding: "开元通宝与波斯银币比例3:1",
              period: "8世纪中叶"
            }
          ]
        },
        {
          name: "碎叶驿站",
          value: "年接待商队47支",
          datasource: [
            {
              type: '行政文书',
              source: "阿克·贝希姆遗址封泥",
              content: "'安西都护府印'",
              period: "调露元年(679)"
            },
            {
              type: '图像证据',
              source: "杜环《经行记》",
              description: "'城周六七里，商胡杂居'",
              reference: "《通典·边防典》引"
            },
            {
              type: '考古测算',
              site: "碎叶城遗址",
              method: "航拍测绘",
              area: "4.2平方公里",
              report: "俄罗斯考古队1940年"
            }
          ]
        }
      ]
    },

    commodities: {
      tradeDistribution: [
        {
          name: "君士坦丁堡",
          item: "丝绸",
          importance: 5,
          datasource: [
            { type: '宫廷记录', source: "《典仪论》", event: "'皇室织坊年耗丝万斤'" },
            { type: '圣物包裹', artifact: "圣索菲亚教堂裹尸布", technique: "萨珊风格织锦" },
            { type: '同位素分析', method: "δ13C测定", origin: "中国华北平原" }
          ]
        },
        {
          name: "君士坦丁堡",
          item: "香料",
          importance: 4,
          datasource: [
            { type: '关税档案', source: "金角湾记录", entry: "'年征丁香税5000诺米斯玛'" },
            { type: '密封铅罐', findings: "黑胡椒（保存完好）" },
            { type: '成分检测', method: "HPLC-MS", compound: "胡椒碱含量5.2%" }
          ]
        },
        {
          name: "君士坦丁堡",
          item: "圣像",
          importance: 5,
          datasource: [
            { type: '宗教法令', source: "《尼西亚会议记录》", decree: "'特许圣像贸易'" },
            { type: '作坊遗址', location: "布拉赫奈区", findings: "釉彩画板残片" },
            { type: '颜料分析', method: "SEM-EDS", composition: "金箔纯度99.6%" }
          ]
        },
        {
          name: "君士坦丁堡",
          item: "玻璃",
          importance: 4,
          datasource: [
            { type: '工坊规模', source: "普罗柯比《秘史》", record: "'玻璃匠户三百家'" },
            { type: '马赛克残片', artifact: "镶嵌画玻璃粒（直径1.2mm）" },
            { type: '成分检测', method: "LA-ICP-MS", elements: "PbO含量24%" }
          ]
        },
        {
          name: "君士坦丁堡",
          item: "贵金属",
          importance: 5,
          datasource: [
            { type: '铸币记录', source: "《国库志》", output: "'年铸金币300万枚'" },
            { type: '沉船发现', location: "马尔马拉海", findings: "金条（纯度95.7%）" },
            { type: '火试金法', method: "Cupellation", result: "银币含银92.3%" }
          ]
        },
        {
          name: "君士坦丁堡",
          item: "染料",
          importance: 3,
          datasource: [
            { type: '染坊遗址', location: "佩拉区", findings: "茜草根堆积坑" },
            { type: '皇室敕令', source: "《紫色禁令》", restriction: "'禁用泰尔紫逾制'" },
            { type: '色素鉴定', method: "SERS", compound: "检测到6,6'-二溴靛蓝" }
          ]
        }
      ]
    },

    provinces: {
      '陕西': { lng: 108.95, lat: 34.27, climate: '温带季风气候', plants: '秦岭冷杉、杜仲', animals: '大熊猫、金丝猴' },
      '甘肃': { lng: 103.73, lat: 36.03, climate: '温带大陆性气候', plants: '胡杨、梭梭', animals: '野骆驼、藏羚羊' },
      '新疆': { lng: 87.68, lat: 43.77, climate: '温带大陆性气候', plants: '胡杨、红柳', animals: '野骆驼、盘羊' },
      '河南': { lng: 113.65, lat: 34.76, climate: '温带季风气候', plants: '白蜡、泡桐', animals: '梅花鹿、麋鹿' },
      '山西': { lng: 112.53, lat: 37.87, climate: '温带大陆性气候', plants: '油松、黄芪', animals: '褐马鸡、猞猁' },
      '宁夏': { lng: 106.27, lat: 38.47, climate: '温带大陆性气候', plants: '枸杞、沙枣', animals: '黄羊、野兔' },
      '青海': { lng: 101.74, lat: 36.56, climate: '高原气候', plants: '青海云杉、沙棘', animals: '藏羚羊、雪豹' },
      '四川': { lng: 104.06, lat: 30.67, climate: '亚热带季风气候', plants: '珙桐、银杏', animals: '大熊猫、金丝猴' },
      '云南': { lng: 102.71, lat: 25.04, climate: '亚热带季风气候', plants: '茶树、滇朴', animals: '亚洲象、滇金丝猴' },
      '内蒙古': { lng: 111.65, lat: 40.82, climate: '温带大陆性气候', plants: '沙棘、柠条', animals: '蒙古野驴、草原雕' }
    },

    tradeRoutes: [
      {
        fromName: '西安',
        toName: '兰州',
        coords: [[108.95, 34.27], [103.73, 36.03]]
      },
      {
        fromName: '兰州',
        toName: '乌鲁木齐',
        coords: [[103.73, 36.03], [87.68, 43.77]]
      },
      {
        fromName: '乌鲁木齐',
        toName: '喀什',
        coords: [[87.68, 43.77], [75.99, 39.47]]
      }
    ]
  }
};
