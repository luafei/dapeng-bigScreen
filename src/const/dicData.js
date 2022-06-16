export const carFlowTypeDic = {
    carIn: '驶入车辆',
    carOut: '驶出车辆',
    carNetinflow: '净流入车辆',
    nativeLocation: '本地车辆',
    otherPlace: '异地车辆',
    total: '全部车辆'
}

export const warningTypeList = [{
        label: '超速行驶',
        value: 'overSpeed'
    },
    {
        label: '疲劳驾驶',
        value: 'tired'
    },
    {
        label: '电子围栏',
        value: 'electricFence'
    },
    {
        label: '违停',
        value: 'illegalStop'
    },
    {
        label: '偏离路线',
        value: 'deviate'
    }
]

export const warningTypeMap = {
    overSpeed: '超速行驶',
    tired: '疲劳驾驶',
    electricFence: '电子围栏',
    illegalStop: '违停',
    deviate: '偏离路线'
}

export const directionList = [{
        label: '全部',
        value: '2'
    },
    {
        label: '驶入',
        value: '0'
    },
    {
        label: '驶出',
        value: '1'
    },
]

export const directionMap = {
    '0': '驶入',
    '1': '驶出',
    '2': '全部'
}

export const vihecleTypeList = [{
        label: '全部',
        value: 'all'
    },
    {
        label: '大型',
        value: '1'
    },
    {
        label: '货车',
        value: '2'
    }
]

export const roadFlagList = [{
        label: '道路',
        value: 0
    },
    {
        label: '出入口',
        value: 1
    },
    {
        label: '沙鱼涌',
        value: 2
    }
]

export const originList = [{
        label: '全部',
        value: "2"
    },
    {
        label: '本地',
        value: "0"
    },
    {
        label: '外地',
        value: "1"
    }
]

export const vehicleAlarmType = {
    // 0: '紧急报瞥触动报警开关后触发',
    0: '无',
    1: '超速报警',
    2: '疲劳驾驶',
    3: '预警',
    4: 'GNSS模块发生故障',
    5: 'GNSS天线未接或被剪断',
    6: 'GNSS天线短路',
    7: '终端主电源欠压',
    8: '终端主电源掉电',
    9: '终端LCD或显示器故障',
    10: 'TTS模块故障',
    11: '摄像头故障',
    18: '当天累计驾驶超时',
    19: '超时停车',
    20: '进出区域',
    21: '进出路线',
    22: '路段行驶时间不足/过长',
    23: '路线偏离报警',
    24: '车辆VSS故障',
    25: '车辆油量异常',
    26: '车辆被盗（通过车辆防盗器）',
    27: '车辆非法点火',
    28: '车辆非法位移',
    excute: function(val) {
        return this[val] ? this[val] : `保留(${val})`
    }
}

export const levelAlarmMap = {
    '10': '蓝色',
    '20': '黄色',
    '30': '橙色',
    '40': '红色'
}