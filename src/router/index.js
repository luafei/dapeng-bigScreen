import Vue from 'vue'
import VueRouter from 'vue-router'
const DangerousChemicals = () =>
    import ( /* webpackChunkNmae: "dangerousChemicals"*/ '@/views/DangerousChemicals')
const MudTruck = () =>
    import ( /* webpackChunkNmae: "mudTruck"*/ '@/views/MudTruck')
const WayLeave = () =>
    import ( /* webpackChunkNmae: "WayLeave"*/ '@/views/WayLeave')
const DemonstrationSection = () =>
    import ( /* webpackChunkNmae: "WayLeave"*/ '@/views/DemonstrationSection') // 示范路段
const CoastDefence = () => import('@/views/CoastDefence')    // 海防打私
const TyphoonDefence = () => import('@/views/TyphoonDefence')  // 台风防御
const RoadRunning = () => import('@/views/WayLeave/roadRunning.vue')
const BusOperation = () => import('@/views/WayLeave/busOperation.vue')
const KeyVehicle = () => import('@/views/WayLeave/keyVehicle.vue')
const StaticTraffic = () => import('@/views/WayLeave/staticTraffic.vue')
const TrafficPassengerFlow = () => import('@/views/WayLeave/trafficPassengerFlow.vue')
const TrafficManageSupport = () => import('@/views/WayLeave/trafficManageSupport.vue')
const RoadMulPortrait = () => import('@/views/WayLeave/roadMulPortrait.vue')

const views = () =>
    import ('@/views')
const viewsgis = () => import('@/views/indexgis') 
const Cartransit = () =>
    import ( /* webpackChunkNmae: "Cartransit"*/ '@/views/Cartransit')
const Importcar = () =>
    import ( /* webpackChunkNmae: "Cartransit"*/ '@/views/Importcar')
const Monitoringcar = () =>
    import ( /* webpackChunkNmae: "Cartransit"*/ '@/views/Monitoringcar')
const carVehicle = () =>
    import ( /* webpackChunkNmae: "carVehicle"*/ '@/views/carVehicle')
const busCapacity = () =>
    import ( /* webpackChunkNmae: "busCapacity"*/ '@/views/busCapacity')
const login = () =>
    import ( /*webpackChunkNmae:"login"*/ '@/views/login')
const sandBeach = () =>
    import ('@/views/tourism/sandBeach')    
const scenicSpot = () =>
    import ( /*webpackChunkNmae:"sandBeach"*/ '@/views/tourism/scenicSpot')
const scenicSpotDetail = () =>
    import ( /*webpackChunkNmae:"sandBeach"*/ '@/views/tourism/scenicSpot/detail')

const warningDetails = () =>
    import ( /*webpackChunkNmae:"warningDetails"*/ '@/views/warningDetails')
const blockData = () => import('@/views/blockData')
const largeScreenAnalysis = () => import("@/views/blockData/largeScreenAnalysis")
const dapengWisdomNet = () => import("@/views/blockData/dapengWisdomNet")
const serviceAnalyzation = () =>
    import ( /*webpackChunkNmae:"govSerivce"*/ '@/views/govService/serviceAnalyzation')
const businessanalysis = () =>
    import ( /*webpackChunkNmae:"govSerivce"*/ '@/views/govService/businessanalysis')
const construction = () =>
    import ( /*webpackChunkNmae:"govSerivce"*/ '@/views/govService/construction')
const operation = () => 
    import ( /*webpackChunkNmae:"govSerivce"*/ '@/views/govService/operation')
const Analysis = () => 
    import ( /*webpackChunkNmae:"govSerivce"*/ '@/views/govService/Analysis')
const ecotope = () =>
    import ( /*webpackChunkNmae:"ecotope"*/ '@/views/ecotope')
const watercolor = () =>
        import ( /*webpackChunkNmae:"ecotope"*/ '@/views/ecotope/watercolor')
const offshore = () =>
        import ( /*webpackChunkNmae:"ecotope"*/ '@/views/ecotope/offshore')
const shentai = () =>
        import ( /*webpackChunkNmae:"ecotope"*/ '@/views/ecotope/shentai')
const Noiseandsoilsac = () =>
        import ( /*webpackChunkNmae:"ecotope"*/ '@/views/ecotope/Noiseandsoilsac')
const environment = () =>
        import ( /*webpackChunkNmae:"ecotope"*/ '@/views/ecotope/environment')
// 智慧经服
const wisdomSutraService = () => import('@/views/wisdomSutraService')
const wisdomStatistics = () => import('@/views/wisdomSutraService/statistics.vue')
// 疫情防控
const digitalSignage = () => import('@/views/epidemicPreventionControl/digitalSignage')
const epidemicMap = () => import('@/views/epidemicPreventionControl/epidemicMap')
// 数字孪生
const threeDMap = () => import('@/views/digitalTwin/threeDMap')
Vue.use(VueRouter)
export const asyncRouterMap = [{
        path: '/',
        component: views,
        name: "交通运行",
        meta: {
            roles: ['GET/bigScreen/vehicleMonitor', 'GET/bigScreen/vehicleMonitorDP', 'GET/bigScreen/vehicleMonitorKC', 'GET/bigScreen/vehicleMonitorNA', 'GET/bigScreen/busCapacity', 'GET/bigScreen/busCapacityDP', 'GET/bigScreen/busCapacityKC', 'GET/bigScreen/busCapacityNA', 'GET/bigScreen/RoadRunning', 'GET/bigScreen/BusOperation', 'GET/bigScreen/KeyVehicle', 'GET/bigScreen/StaticTraffic', 'GET/bigScreen/TrafficPassengerFlow', 'GET/bigScreen/TrafficManageSupport', 'GET/bigScreen/RoadMulPortrait']
        },
        children: [{
                path: '/carVehicle',
                name: 'carVehicle',
                component: carVehicle,
                title: '车辆监测',
                meta: {
                    roles: ['GET/bigScreen/vehicleMonitor']
                }
            },
            {
                path: '/carVehicle',
                name: 'carVehicleDP',
                component: carVehicle,
                title: '车辆监测',
                meta: {
                    roles: ['GET/bigScreen/vehicleMonitorDP']
                }
            },
            {
                path: '/carVehicle',
                name: 'carVehicleKC',
                component: carVehicle,
                title: '车辆监测',
                meta: {
                    roles: ['GET/bigScreen/vehicleMonitorKC']
                }
            },
            {
                path: '/carVehicle',
                name: 'carVehicleNA',
                component: carVehicle,
                title: '车辆监测',
                meta: {
                    roles: ['GET/bigScreen/vehicleMonitorNA']
                }
            },
            {
                path: 'busCapacity',
                name: 'busCapacity',
                title: '公交运力保障',
                meta: {
                    roles: ['GET/bigScreen/busCapacity']
                },
                component: busCapacity
            },
            {
                path: 'busCapacity',
                name: 'busCapacityDP',
                title: '公交运力保障',
                meta: {
                    roles: ['GET/bigScreen/busCapacityDP']
                },
                component: busCapacity
            },
            {
                path: 'busCapacity',
                name: 'busCapacityKC',
                title: '公交运力保障',
                meta: {
                    roles: ['GET/bigScreen/busCapacityKC']
                },
                component: busCapacity
            },
            {
                path: 'busCapacity',
                name: 'busCapacityNA',
                title: '公交运力保障',
                meta: {
                    roles: ['GET/bigScreen/busCapacityNA']
                },
                component: busCapacity
            },
            // {
            //     path: '/WayLeave',
            //     name: 'WayLeave',
            //     title: '道路运行',
            //     meta: {
            //         roles: ['GET/bigScreen/WayLeave']
            //     },
            //     component: WayLeave
            // },
            {
                path: '/RoadRunning',
                name: 'RoadRunning',
                title: '道路运行监测',
                meta: {
                    roles: ['GET/bigScreen/RoadRunning']
                },
                component: RoadRunning
            },
            {
                path: '/BusOperation',
                name: 'BusOperation',
                title: '公交运行监测',
                meta: {
                    roles: ['GET/bigScreen/BusOperation']
                },
                component: BusOperation
            },
            {
                path: '/KeyVehicle',
                name: 'KeyVehicle',
                title: '重点车辆监测',
                meta: {
                    roles: ['GET/bigScreen/KeyVehicle']
                },
                component: KeyVehicle
            },
            {
                path: '/StaticTraffic',
                name: 'StaticTraffic',
                title: '静态交通监测',
                meta: {
                    roles: ['GET/bigScreen/StaticTraffic']
                },
                component: StaticTraffic
            },
            {
                path: '/TrafficPassengerFlow',
                name: 'TrafficPassengerFlow',
                title: '交通客流分析',
                meta: {
                    roles: ['GET/bigScreen/TrafficPassengerFlow']
                },
                component: TrafficPassengerFlow
            },
            {
                path: '/TrafficManageSupport',
                name: 'TrafficManageSupport',
                title: '交通管理支撑分析',
                meta: {
                    roles: ['GET/bigScreen/TrafficManageSupport']
                },
                component: TrafficManageSupport
            },
            {
                path: '/RoadMulPortrait',
                name: 'RoadMulPortrait',
                title: '道路多维画像',
                meta: {
                    roles: ['GET/bigScreen/RoadMulPortrait']
                },
                component: RoadMulPortrait
            }
        ],
    },
    {
        path: '/sandBeach',
        component: views,
        name: '文化旅游',
        meta: {
            roles: ['GET/bigScreen/sandBeach', 'GET/bigScreen/sandBeachNA', 'GET/bigScreen/sandBeachDP', 'GET/bigScreen/sandBeachKC']
        },
        children: [{
            path: '/sandBeach',
            name: 'sandBeach',
            title: '沙滩',
            meta: {
                roles: ['GET/bigScreen/sandBeach']
            },
            component: sandBeach,
        }, {
            path: '/sandBeach',
            name: 'sandBeachNA',
            title: '沙滩',
            meta: {
                roles: ['GET/bigScreen/sandBeachNA']
            },
            component: sandBeach,
        }, {
            path: '/sandBeach',
            name: 'sandBeachDP',
            title: '沙滩',
            meta: {
                roles: ['GET/bigScreen/sandBeachDP']
            },
            component: sandBeach,
        }, {
            path: '/sandBeach',
            name: 'sandBeachKC',
            title: '沙滩',
            meta: {
                roles: ['GET/bigScreen/sandBeachKC']
            },
            component: sandBeach,
        }, {
            path: '/scenicSpot',
            name: 'scenicSpot',
            title: '景区',
            hide: true,
            meta: {
                roles: ['GET/bigScreen/scenicSpot']
            },
            component: scenicSpot,
        }, {
            path: '/scenicSpotDetail',
            name: 'scenicSpotDetail',
            title: '详情',
            hide: true,
            meta: {
                roles: ['GET/bigScreen/scenicSpotDetail']
            },
            component: scenicSpotDetail,
        }]
    },
    {
        path: '/warningDetails',
        component: views,
        name: '公共安全',
        meta: {
            roles: ['GET/bigScreen/warningDetails', 'GET/bigScreen/dangerGoods', 'GET/bigScreen/dangerGoodsDP', 'GET/bigScreen/dangerGoodsKC', 'GET/bigScreen/dangerGoodsNA', 'GET/bigScreen/mudTruck', 'GET/bigScreen/mudTruckDP', 'GET/bigScreen/mudTruckKC', 'GET/bigScreen/mudTruckNA', 'GET/bigScreen/demonstrationSection', 'GET/bigScreen/coastDefence', 'GET/bigScreen/typhoonDefence'],
        },
        children: [{
                path: '/warningDetails',
                name: 'warningDetails',
                title: '监控预警',
                meta: {
                    roles: ['GET/bigScreen/warningDetails']
                },
                component: warningDetails
            }, 
            {
                path: '/DangerousChemicals',
                name: 'DangerousChemicals',
                component: DangerousChemicals,
                title: '危化品车',
                meta: {
                    roles: ['GET/bigScreen/dangerGoods']
                }
            },
            {
                path: '/DangerousChemicals',
                name: 'DangerousChemicalsDP',
                component: DangerousChemicals,
                title: '危化品车',
                meta: {
                    roles: ['GET/bigScreen/dangerGoodsDP']
                }
            },
            {
                path: '/DangerousChemicals',
                name: 'DangerousChemicalsKC',
                component: DangerousChemicals,
                title: '危化品车',
                meta: {
                    roles: ['GET/bigScreen/dangerGoodsKC']
                }
            },
            {
                path: '/DangerousChemicals',
                name: 'DangerousChemicalsNA',
                component: DangerousChemicals,
                title: '危化品车',
                meta: {
                    roles: ['GET/bigScreen/dangerGoodsNA']
                }
            },
            {
                path: '/MudTruck',
                name: 'MudTruck',
                title: '泥头车',
                component: MudTruck,
                meta: {
                    roles: ['GET/bigScreen/mudTruck']
                }
            },
            {
                path: '/MudTruck',
                name: 'MudTruckDP',
                title: '泥头车',
                component: MudTruck,
                meta: {
                    roles: ['GET/bigScreen/mudTruckDP']
                }
            },
            {
                path: '/MudTruck',
                name: 'MudTruckKC',
                title: '泥头车',
                component: MudTruck,
                meta: {
                    roles: ['GET/bigScreen/mudTruckKC']
                }
            },
            {
                path: '/MudTruck',
                name: 'MudTruckNA',
                title: '泥头车',
                component: MudTruck,
                meta: {
                    roles: ['GET/bigScreen/mudTruckNA']
                }
            },
            {
                path: '/DemonstrationSection', // 示范路段
                title: '示范路段',
                name: 'DemonstrationSection',
                component :DemonstrationSection,
                meta: {
                    roles: ['GET/bigScreen/demonstrationSection'],
                }
            },
            {
                path: '/CoastDefence', // 海防打私
                title: '海防打私',
                name: 'CoastDefence',
                component :CoastDefence,
                meta: {
                    roles: ['GET/bigScreen/coastDefence'],
                }
            },
            {
                path: '/TyphoonDefence', // 台风防御
                title: '台风防御',
                name: 'TyphoonDefence',
                component :TyphoonDefence,
                meta: {
                    roles: ['GET/bigScreen/typhoonDefence'],
                }
            }
        ]
    },
    {
        path: '/epidemicPreventionControl',
        component: views,
        name: '疫情防控',
        meta: {
            roles: ['GET/bigScreen/digitalSignage', 'GET/bigScreen/epidemicMap']
        },
        children: [
            {
                path: '/digitalSignage',
                name: 'digitalSignage',
                title: '数字看板',
                meta: {
                    roles: ['GET/bigScreen/digitalSignage']
                },
                component: digitalSignage
            },
            {
                path: '/epidemicMap',
                name: 'epidemicMap',
                title: '疫情地图',
                meta: {
                    roles: ['GET/bigScreen/epidemicMap']
                },
                component: epidemicMap
            }
        ]
    },
    {
        path: '/socialGovernance',
        component: views,
        name: '社会治理',
        meta: {
            roles: ['GET/bigScreen/socialGovernance/blockData', 'GET/bigScreen/largeScreenAnalysis', 'GET/bigScreen/dapengWisdomNet'],
        },
        children: [
            {
                path: '/blockData',
                name: 'blockData',
                title: '块数据底板',
                component: blockData,
                meta: {
                    roles: ['GET/bigScreen/socialGovernance/blockData']
                }
            },
            {
                path: '/largeScreenAnalysis',
                name: 'largeScreenAnalysis',
                title: '大屏分析',
                component: largeScreenAnalysis,
                meta: {
                    roles: ['GET/bigScreen/largeScreenAnalysis']
                }
            },
            {
                path: '/dapengWisdomNet',
                name: 'dapengWisdomNet',
                title: '大鹏智网',
                component: dapengWisdomNet,
                meta: {
                    roles: ['GET/bigScreen/dapengWisdomNet']
                }
            }
        ]
    },
    {
        path: '/govService',
        component: views,
        name: '政务服务',
        // serviceAnalyzation
        meta: {
            roles: ['GET/bigScreen/govService/serviceAnalyzation', 'GET/bigScreen/govService/businessanalysis','GET/bigScreen/govService/construction','GET/bigScreen/govService/operation','GET/bigScreen/govService/Analysis'],
        },
        children: [{
                path: '/serviceAnalyzation',
                name: 'serviceAnalyzation',
                title: '总体业务',
                component: serviceAnalyzation,

                meta: {
                    roles: ['GET/bigScreen/govService/serviceAnalyzation']
                }
            },
            {
                path: '/businessanalysis',
                name: 'businessanalysis',
                title: '服务指标',
                meta: {
                    roles: ['GET/bigScreen/govService/businessanalysis']
                },
                component: businessanalysis,
            },
            {
                path: '/construction',
                name: 'construction',
                title: '重点业务',
                meta: {
                    roles: ['GET/bigScreen/govService/construction']
                },
                component: construction
            },
            {
                path: '/operation',
                name: 'operation',
                title: '大厅运行监测',
                meta: {
                    roles: ['GET/bigScreen/govService/operation']
                },
                component: operation
            },
            {
                path: '/Analysis',
                name: 'Analysis',
                title: '审批流程分析',
                meta: {
                    roles: ['GET/bigScreen/govService/Analysis']
                },
                component: Analysis
            }
        ]
    },
    {
        path: '/ecotope',
        component: views,
        name: '生态环境',
        meta: {
            roles: ['GET/bigScreen/ecotope/ecotope','GET/bigScreen/ecotope/watercolor','GET/bigScreen/ecotope/offshore','GET/bigScreen/ecotope/shentai','GET/bigScreen/ecotope/Noiseandsoilsac','GET/bigScreen/ecotope/environment' ]
        },
        children: [
            {
                path: '/ecotope',
                name: 'ecotope',
                title: '大气',
                meta: {
                    roles: ['GET/bigScreen/ecotope/ecotope']
                },
                component: ecotope
            },
            {
                path: '/watercolor',
                name: 'watercolor',
                title: '水环境',
                meta: {
                    roles: ['GET/bigScreen/ecotope/watercolor']
                },
                component: watercolor
            },
            {
                path: '/offshore',
                name: 'offshore',
                title: '近海海域',
                meta: {
                    roles: ['GET/bigScreen/ecotope/offshore']
                },
                component: offshore
            },
            {
                path: '/shentai',
                name: 'shentai',
                title: '生态',
                meta: {
                    roles: ['GET/bigScreen/ecotope/shentai']
                },
                component: shentai
            },
            {
                path: '/Noiseandsoilsac',
                name: 'Noiseandsoilsac',
                title: '噪声与土壤',
                meta: {
                    roles: ['GET/bigScreen/ecotope/Noiseandsoilsac']
                },
                component: Noiseandsoilsac
            },
            {
                path: '/environment',
                name: 'environment',
                title: '环境监管',
                meta: {
                    roles: ['GET/bigScreen/ecotope/environment']
                },
                component: environment
            }
        ]

    },
    {
        path: '/gis',
        component: views,
        name: 'gis演示',
        meta: {
            roles: ['GET/bigScreen/sandBeach']
        },
        children: [
            {
                path: '/gis',
                name: 'ecotope',
                title: '大气',
                meta: {
                    roles: ['GET/bigScreen/sandBeach']
                },
                component: viewsgis
            }
        ]
    },
    {
        path: '/wisdomSutraService',
        component: views,
        name: '经济运行',
        meta: {
            roles: ['GET/bigScreen/wisdomSutraService', 'GET/bigScreen/wisdomStatistics']
        },
        children: [
            {
                path: '/wisdomSutraService',
                name: 'wisdomSutraService',
                title: '智慧经服',
                meta: {
                    roles: ['GET/bigScreen/wisdomSutraService']
                },
                component: wisdomSutraService
            },
            {
                path: '/wisdomStatistics',
                name: 'wisdomStatistics',
                title: '智慧统计',
                meta: {
                    roles: ['GET/bigScreen/wisdomStatistics']
                },
                component: wisdomStatistics
            }
        ]
    },
    {
        path: '/digitalTwin',
        component: views,
        name: '数字孪生',
        meta: {
            roles: ['GET/bigScreen/threeDMap']
        },
        children: [
            {
                path: '/threeDMap',
                name: 'threeDMap',
                title: '三维地图',
                meta: {
                    roles: ['GET/bigScreen/threeDMap']
                },
                component: threeDMap
            }
        ] 
    }

]
export const constantRouterMap = [{
        path: '/login',
        component: login
    }
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes: constantRouterMap
})

export default router