import Mock from 'mockjs'
import { getParams } from '@/utils/util'
export default ({ mock }) => {
    if (!mock) return;
    // 今日车流量
    Mock.mock(/\/daPeng\/largeScreen\/traffic\/trafficFlow/, 'get', (options) => {
        const params = getParams(options.url)
        let {dateTime, carType} = params
        let list = []
        for (let i = 0; i < 1; i++) {
            list.push(Mock.mock({
                dateDay: new Date().getTime() + '',
                carType : 'dumper',
                driveIn:3000,
                driveOut:800,
                netFlow:200,
                local:10000,
                foreign:200,
                whole:14000
            }))
        }
        return {
            status: 0,
            msg:"Operate Success",
            data: list
        }
    });
    //出入口排名   主要路段通行量排名
    Mock.mock(/\/daPeng\/largeScreen\/traffic\/trafficRank/, 'get', (options) => {
        const params = getParams(options.url)
        let {dateDay, carType, direction} = params
        let list = []
        for (let i = 0; i < 5; i++) {
            list.push(Mock.mock({
                dateTime : "20200110",
                carType:"dumper",
                direction:" entrance",
                rank: i,
                tollName:"葵涌收费站"+i,
                tollCode:i,    //收费站id
                flowNum: 200*(i+1)
            }))
        }
        return {
            status: 0,
            msg:"Operate Success",
            data: list
        }
    })
    //出入口时间分布
    Mock.mock(/\/daPeng\/largeScreen\/traffic\/timeDistribution/, 'get', (options) => {
        const params = getParams(options.url)
        let {carType, roadFlag, direction, timeType, roadName} = params
        return {
            status: 0,
            msg:"Operate Success",
            data: {
                x: [ "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "01", "02", "03" ],
                y: [ 57, 547, 57, 547, 57, 576, 527, 537, 457, 57, 547, 57, 567, 57, 537, 57, 357, 571, 457 ]
            }
        }
    })
   // 模拟鱼沙涌检测接口  
   Mock.mock(/\/daPeng\/largeScreen\/traffic\/driveInOut/,'get',(options)=>{
    const params = getParams(options.url)
    let {carType, roadFlag, direction,timeType,roadName} = params
       let list = []
       for(let i = 0; i<1; i++){
           list.push(Mock.mock({
            carType: carType,
            roadFlag: roadFlag,
            direction: direction,//驶入
            timeType: timeType,
            roadName: roadName,
            x: [1, 2, 3, 4, 5, 6, 7 , 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
               20, 21, 22 , 23,24,25,26,27,28,29,30,31
            ],
            // x: ['1','2','3','4','5'],
             y: [ 50, 60, 70, 80, 90, 100, 110,120,130,140,150,160,170,180,190,200, 100, 110,120,130,140,150,160,150,852,96,87,88,12,52,63]
            // y: [100, 80, 60, 40, 20]
            })
         )
       }
       return {
        status: 0,
        msg:"Operate Success",
        data: list
      }
   })
   
   //模拟 来源地 饼图接口
   Mock.mock(/\/daPeng\/largeScreen\/traffic\/originPlace/, 'get', (options) => {
    const params = getParams(options.url)
    let {dateTime, carType, driveType} = params
    let list = []
    for(let i = 0; i<1; i++){
        list.push(Mock.mock({
            carType: carType,
            driveType: driveType,
            nativeLocation: 2000,
            otherPlace: 2000
        }))
    }
    return {
      status: 0,
      msg:"Operate Success",
      data: list
    }
   })

    // 模拟地图接口
    Mock.mock('/daPeng/largeScreen/traffic/mapSite', 'get', () => {
        let list = []
        for (let i = 0; i < 1; i++) {
            list.push(Mock.mock({
                mapType : "video",
                lat:"114.416530115796191",
                lon:"22.6362065760357321"
            }),
            Mock.mock({
                mapType : "dumper",
                lat:"114.416530115796192",
                lon:"22.6362065760357322"
            }),
            Mock.mock({
                mapType : "dangerous",
                lat:"114.416530115796193",
                lon:"22.6362065760357323"
            })
        )
        }
        return {
            status: 0,
            msg:"Operate Success",
            data: list
        }
    })
    //获取出入口及道路名称
    Mock.mock(/\/daPeng\/largeScreen\/traffic\/siteName/, 'get', (options) => {
        const params = getParams(options.url)
        let {carName, startTime, endTime, driveType, carType, trafficType} = params
        let list = []
        for (let i = 0; i < 5; i++) {
            list.push(Mock.mock({
                trafficType: "gate", 
                roadName:"葵涌收费站"+i,
                roadCode:i+1,
            }))
        }
        return {
            status: 0,
            msg:"Operate Success",
            data: list
        }
    })
    //车辆报警信息分析
    Mock.mock(/\/daPeng\/largeScreen\/traffic\/alertRank/, 'get', (options) => {
        const params = getParams(options.url)
        let {beginTime, endTime, carType, warningType} = params
        let list = []
        for (let i = 0; i < 5; i++) {
            list.push(Mock.mock({
                carType : "dumper", 
                warningType: 'overSpeed',
                rank :i+1,
                plateNo: '粤B12345'+i,
                warningNum : 100+i
            }))
        }
        return {
            status: 0,
            msg:"Operate Success",
            data: list
        }
    })
    //车辆轨迹特征查询
    Mock.mock(/\/daPeng\/largeScreen\/traffic\/trailQuery/, 'get', (options) => {
        const params = getParams(options.url)
        let {beginTime, endTime, carType, plateNo} = params
        return {
            status: 0,
            msg:"Operate Success",
            data: [{
                plateNo:"粤B.123458",
                entrance:"葵涌收费站",
                exit:"葵涌收费站",
                source:"深圳",
                mainRoad:"葵涌收费站",
                tired:"10次 晚上8点",
                overSpeed:"20次 深葵路",
            }]
        }
    })
     //视频站点名称
     Mock.mock(/\/daPeng\/largeScreen\/traffic\/videoName/, 'get', (options) => {
        const params = getParams(options.url)
        let {carName, driveType,beginTime, endTime, carType, siteName} = params
        let list = []
        for (let i = 0; i < 2; i++) {
            list.push(Mock.mock({
                trafficType: "gate",
                videoName:"深葵视频站"+i, 
                videoCode: i+1
            }))
        }
        return {
            status: 0,
            msg:"Operate Success",
            data: list
        }
    })
    //详情单
    Mock.mock(/\/daPeng\/largeScreen\/traffic\/details/, 'get', (options) => {
        const params = getParams(options.url)
        let {page, pageSize,start,beginTime, endTime,vehicleType, plateNo,direction, roadName,roadCode,roadFlag,nativeLocation,videoName} = params
        let list = []
        for (let i = 0; i < 5; i++) {
            list.push(Mock.mock(
                {
                    id: i+1,
                    plateNo: "粤B11119"+i,
                    vehicleColor: "黑色",   //颜色
                    direction:" entrance", 
                    roadName:"葵涌收费站"+i,
                    vehicleType:"dumper", 
                    videoName:"葵涌收费站视频点"+i,
                    vehicleLogo:"大众", 
                    videoID:i+1+"号点", 
                    imagePath:"url", 
                    captureTime:"10:00:00 – 12:00:00"
                },
            ))
        }
        return {
            status: 0,
            msg:"Operate Success",
            data: list
        }
    })
}
