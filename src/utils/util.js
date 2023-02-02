import store from '@/store'
import router from '@/router'

export function getPickerOption() {
    return {
        shortcuts: [{
            text: '最近一周',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近一个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近三个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
            }
        }]
    }
}

export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

export function formatTime(time, option) {
    time = +time * 1000
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return (
            d.getMonth() +
            1 +
            '月' +
            d.getDate() +
            '日' +
            d.getHours() +
            '时' +
            d.getMinutes() +
            '分'
        )
    }
}

export function getCurrentFromat() {
    let strTime = parseTime(new Date().getTime(), '{y}-{m}-{d} {h}:{i}:{s}:{a}').split(' ');
    let ymd = strTime[0].split('-')
    let hisa = strTime[1].split(':')
    return `${ymd[0]}年${ymd[1]}月${ymd[2]}日  &nbsp;  ${hisa[0]}:${hisa[1]}:${hisa[2]} &nbsp; 星期${hisa[3]}`
    // return ymd[0]+'年'+ymd[1]+'月'+ymd[2] + '日  ' + hisa[0]+':'+hisa[1]+":"+hisa[2] + ' 星期'+hisa[3]
}

export function getParams(href) {
    const params = href.split("?")[1]
    const paramArr = params.split('&')
    const res = {};
    for (let i = 0; i < paramArr.length; i++) {
        const str = paramArr[i].split('=')
        res[str[0]] = str[1];
    }
    return res
}

//向上找到指定的组件
export function findComponentUpward(context, componentName) {
    let parent = context.$parent;
    let name = parent.$options.name;

    while (parent && (!name || [componentName].indexOf(name) < 0)) {
        parent = parent.$parent;
        if (parent) name = parent.$options.name;
    }
    return parent;
}

//向下找到指定的组件
export function findComponentDownward(context, componentName) {
    const childrens = context.$children;
    let children = null;

    if (childrens.length) {
        for (const child of childrens) {
            const name = child.$options.name;

            if (name === componentName) {
                children = child;
                break;
            } else {
                children = findComponentDownward(child, componentName);
                if (children) break;
            }
        }
    }
    return children;
}

//向下找到所有指定的组件
export function findComponentsDownward(context, componentName) {
    return context.$children.reduce((components, child) => {
        if (child.$options.name === componentName) components.push(child);
        const foundChilds = findComponentsDownward(child, componentName);
        return components.concat(foundChilds);
    }, []);
}

//获取当前时间
export function getCurrentTime(type, time) {
    let currentDay = parseTime(new Date().getTime(), '{y}-{m}-{d}')
    let currentMonth = parseTime(new Date().getTime(), '{y}-{m}')
    let beginTime = ''
    let endTime = ''
    switch (type) {
        // beginTime: 2021-07-15 00:00:00
        // endTime: 2021-07-15 23:59:59
        case 'hour':
            if (time) {
                beginTime = `${currentDay} ${time}:00:00`
                endTime = `${currentDay} ${time}:59:59`
            }
            break;
        case 'day':
            if (!time) {
                beginTime = currentDay + ' 00:00:00';
                endTime = currentDay + ' 23:59:59';
            } else {
                beginTime = `${currentMonth}-${time} 00:00:00`;
                endTime = `${currentMonth}-${time} 23:59:59`;
            }
            break;
        case 'week':
            //获取近一周2021-7-7 18:00  2021-7-15 18:00
            const start = new Date()
            const end = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            beginTime = parseTime(start)
            endTime = parseTime(end)
            break;
        case 'month':
            if (time) {
                let year = parseTime(new Date().getTime(), '{y}')
                let dayNum = getAnyMonthDayNum(year, time)
                beginTime = `${year}-${time}-01 00:00:00`
                endTime = parseTime(new Date(beginTime).getTime() + 3600 * 1000 * 24 * dayNum, '{y}-{m}-{d} {h}:{i}:{s}')
            } else {
                //获取近一月2021-6-15 18:00  2021-7-15 18:00
                const start = new Date()
                const end = new Date()

                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                beginTime = parseTime(start)
                endTime = parseTime(end)
            }
            break;
        case 'year':
            //获取近一年2020-7-15 18:00  2021-7-15 18:00
            const yStart = new Date()
            const yEnd = new Date()

            yStart.setTime(yStart.getTime() - 3600 * 1000 * 24 * 365)
            beginTime = parseTime(yStart)
            endTime = parseTime(yEnd)
            break;
    }
    return {
        beginTime,
        endTime
    }
}

export function getAnyMonthDayNum(year, month) {
    var d = new Date(year, month, 0);
    return d.getDate();
}


export function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'shallowClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
        if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = deepClone(source[keys])
        } else {
            targetObj[keys] = source[keys]
        }
    })
    return targetObj
}

export const generateCode = (num) => {
    let library = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (var i = 0; i < num; i++) {
        let randomPoz = Math.floor(Math.random() * library.length);
        code += library.substring(randomPoz, randomPoz + 1);
    }
    return code;
}


export function getBeachRolesName() {
    var roleResources =  [];
    store.getters.roles[0].roleResources.map(res => {
      roleResources.push(res.webUrl)
    })
    if (roleResources.includes('GET/bigScreen/sandBeach')) {
      return {name: ''}
    }else if(roleResources.includes('GET/bigScreen/sandBeachNA')) {
      return { name: '南澳' }
    }else if(roleResources.includes('GET/bigScreen/sandBeachDP')) {
      return { name: '大鹏' }
    }else if(roleResources.includes('GET/bigScreen/sandBeachKC')) {
      return { name: '葵涌' }
    }
}

export function getVehicleRolesName() {
    var roleResources =  [];
    store.getters.roles[0].roleResources.map(res => {
      roleResources.push(res.webUrl)
    })
    if (roleResources.includes('GET/bigScreen/vehicleMonitor')) {
      return ''
    }else if(roleResources.includes('GET/bigScreen/vehicleMonitorNA')) {
      return '南澳'
    }else if(roleResources.includes('GET/bigScreen/vehicleMonitorDP')) {
      return '大鹏' 
    }else if(roleResources.includes('GET/bigScreen/vehicleMonitorKC')) {
      return '葵涌'
    }
}

export function getDangerousChemicalsRolesName() {
    var roleResources =  [];
    store.getters.roles[0].roleResources.map(res => {
      roleResources.push(res.webUrl)
    })
    if (roleResources.includes('GET/bigScreen/dangerGoods')) {
      return ''
    }else if(roleResources.includes('GET/bigScreen/dangerGoodsDP')) {
      return '大鹏'
    }else if(roleResources.includes('GET/bigScreen/dangerGoodsKC')) {
      return '葵涌' 
    }else if(roleResources.includes('GET/bigScreen/dangerGoodsNA')) {
      return '南澳'
    }
}

export function getMudTruckRolesName() {
    var roleResources =  [];
    store.getters.roles[0].roleResources.map(res => {
      roleResources.push(res.webUrl)
    })
    if (roleResources.includes('GET/bigScreen/dangerGoods')) {
      return ''
    }else if(roleResources.includes('GET/bigScreen/mudTruckDP')) {
      return '大鹏'
    }else if(roleResources.includes('GET/bigScreen/mudTruckKC')) {
      return '葵涌' 
    }else if(roleResources.includes('GET/bigScreen/mudTruckNA')) {
      return '南澳'
    }
}


export function getBusCapacityRolesName() {
    var roleResources =  [];
    store.getters.roles[0].roleResources.map(res => {
      roleResources.push(res.webUrl)
    })
    if (roleResources.includes('GET/bigScreen/busCapacity')) {
      return ''
    }else if(roleResources.includes('GET/bigScreen/busCapacityDP')) {
      return '大鹏'
    }else if(roleResources.includes('GET/bigScreen/busCapacityKC')) {
      return '葵涌' 
    }else if(roleResources.includes('GET/bigScreen/busCapacityNA')) {
      return '南澳'
    }
}


export function getStreetName() {
    var path = router.app._route.path;
    var name = '';
    switch(path){
        case '/carVehicle':
            name = getVehicleRolesName();
            break;
        case '/DangerousChemicals':
            name = getDangerousChemicalsRolesName();
            break;
        case '/MudTruck':
            name = getMudTruckRolesName();
            break;
        case '/busCapacity':
            name = getBusCapacityRolesName();
            break;
        default:
            name = '';
            break; 
    }
    return name;
}