// 日期格式化
Date.prototype.format = function (format) {
    const o = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'H+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        'S': this.getMilliseconds()
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (String(this.getFullYear())).substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1
                ? o[k]
                : ('00' + o[k]).substr((String(o[k])).length));
        }
    }
    return format;
};

/**
 *js中更改日期
 * year年， month月， day日， hour小时， minute分钟，second秒
 */
Date.prototype.add = function (part, value) {
    value *= 1;
    if (isNaN(value)) {
        value = 0;
    }
    switch (part) {
        case 'year':
            this.setFullYear(this.getFullYear() + value);
            break;
        case 'month':
            this.setMonth(this.getMonth() + value);
            break;
        case 'day':
            this.setDate(this.getDate() + value);
            break;
        case 'hour':
            this.setHours(this.getHours() + value);
            break;
        case 'minute':
            this.setMinutes(this.getMinutes() + value);
            break;
        case 'second':
            this.setSeconds(this.getSeconds() + value);
            break;
        default:

    }
};

/**
 * 设置本地数据
 * @param key
 * @param value
 */
export const setLocalData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

/**
 * 获取本地数据
 * @param key
 * @returns {*}
 */
export const getLocalData = (key) => {
    const value = localStorage.getItem(key);
    if (value) return JSON.parse(localStorage.getItem(key));
    return value;
};

/**
 * 根据key, 清除某个数据
 * @param key
 */
export const removeLocalData = (key) => {
    localStorage.removeItem(key);
};

/**
 * 删除所有本地保存的数据
 */
export const clearLocalData = () => {
    localStorage.clear();
};

/**
 * token key
 * @type {string}
 */
const TOKEN_KEY = 'token';

/**
 * 用户本地存储信息
 * @type {json}
 */
const USER_INFO_KEY = 'USER_INFO';

/**
 * 保存登录状态token
 * @param token
 */
export const setUserToken = (token) => {
    setLocalData(TOKEN_KEY, token);
};

/**
 * 获取用户本地的token
 * @returns {any}
 */
export const getUserToken = () => {
    return getLocalData(TOKEN_KEY);
};

/**
 * 清除用户token
 */
export const clearUserToken = () => {
    clearLocalData();
};

/**
 * 保存用户信息
 * @returns {any}
 */
export const setUserInfo = (userInfo) => {
    setLocalData(USER_INFO_KEY, userInfo);
};
/**
 * 获取用户信息
 * @returns {any}
 */
export const getUserInfo = () => {
    return getLocalData(USER_INFO_KEY);
};

/**
 * 获取参数值
 * @param url
 * @param key
 * @returns {string}
 */
export const getParamValue = (url, key) => {
    url = String(url);
    let regstr = '/(\\?|\\&)' + key + '=([^\\&]+)/';
    let reg = eval(regstr);// eval可以将 regstr字符串转换为 正则表达式
    let result = url.match(reg);// 匹配的结果是：result[0]=?sid=22 result[1]=sid result[2]=22。所以下面我们返回result[2]

    if (result && result[2]) {
        return result[2];
    }
};

/*
    增加参数
 */
export const addParam = (url, key, value) => {
    // customerStatus=new
    return url.concat(`${key}=${value}`);
};
/**
 * 删除参数
 * @param url
 * @param key
 * @returns {*}
 */
export const deleteParam = (url, key) => {
    // 如果不包括此参数
    if (url.indexOf(key) === -1) return url;

    let arr_url = url.split('?');
    let base = arr_url[0];
    let arr_param = arr_url[1].split('&');
    let index = -1;
    for (let i = 0; i < arr_param.length; i++) {
        let paired = arr_param[i].split('=');
        if (paired[0] === key) {
            index = i;
            break;
        }
    }
    if (index === -1) {
        return url;
    } else {
        arr_param.splice(index, 1);
        return base + '?' + arr_param.join('&');
    }
};

/**
 * 更新查询参数
 * @param uri
 * @param key
 * @param value
 * @returns {*}
 */
export const updateParamValue = (uri, key, value) => {
    let re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
    let separator = uri.indexOf('?') !== -1 ? '&' : '?';
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + '=' + value + '$2');
    }
    else {
        return uri + separator + key + '=' + value;
    }
};

/**
 * 转换URL参数为对象
 */
export const convertUrlSearchToObj = (url) => {
    let name;
    let value;
    let str = url;
    if (!str) {
        str = window.location.href;
    }
    let num = str.indexOf('?');
    str = str.substr(num + 1); // 取得所有参数
    let arr = str.split('&'); // 各个参数放到数组里
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
        num = arr[i].indexOf('=');
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = decodeURIComponent(arr[i].substr(num + 1));
            if (value && value.indexOf(',') > -1) {
                value = value.split(',');
            }
            obj[name] = value;
        }
    }
    return obj;
};

/**
 * 根据Url获取URL的所有信息
 */
export const getUrlData = (url) => {
    const parser = document.createElement('a');
    parser.href = url;
    return {
        protocol: parser.protocol,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        search: parser.search,
        hash: parser.hash,
        host: parser.host,
    };
};


/**
 * 设置cookie
 * @param name
 * @param value
 * @param hours 默认24小时
 */
export const setCookie = (name, value, hours = 24) => {
    let expiresTime = new Date();
    expiresTime.setTime(expiresTime.getTime() + hours * 60 * 60 * 1000);
    document.cookie = name + '=' + encodeURIComponent(value) + ';path=/;expires=' + expiresTime.toGMTString();
};

/**
 * 获取cookie
 * @param name
 * @returns {*}
 */
export const getCookie = (name) => {
    let arr;
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    if (arr = document.cookie.match(reg)) return decodeURI(arr[2]);
    else return null;
};

/**
 * 删除cookie
 * @param name
 */
export const deleteCookie = (name) => {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let value = getCookie(name);
    if (value != null) document.cookie = name + '=' + encodeURIComponent(value) + ';path=/;expires=' + exp.toGMTString();
};

/**
 * 查询是否在函数中
 * @param arr
 * @param value
 * @returns {boolean}
 */
export const checkInArray = (arr, value) => {
    for (let i = 0; i < arr.length; i++) {
        if (value === arr[i]) {
            return true;
        }
    }
    return false;
};

/**
 * 从数组中移除数据
 * @param array
 * @param value
 */
export const removeInArray = (array, value) => {
    let index = -1;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            index = i;
            break;
        }
    }
    if (index > -1) {
        array.splice(index, 1);
    }
};

/**
 * 判断是否是微信浏览器
 * @returns {boolean}
 */
export const isWeiXin = () => {
    // window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    return /micromessenger/i.test(navigator.userAgent);
};

/**
 * 是否是wap
 * @returns {boolean}
 */
export const isWap = () => {
    return /iphone|android|mobile|windows ce|miui|ipad|ipod/i.test(navigator.userAgent);
};

/**
 * 创建可以取消的promise
 * @param promise promise对象
 */
export const makeCancelable = (promise) => {
    let _hasCanceled = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then((val) =>
            (_hasCanceled ? reject({isCanceled: true}) : resolve(val))
        );
        promise.catch((error) =>
            (_hasCanceled ? reject({isCanceled: true}) : reject(error))
        );
    });

    return {
        promise: wrappedPromise,
        cancel() {
            _hasCanceled = true;
        },
    };
};

class JudgeInputValue {
    getkey(val) {
        return Object.keys(val);
    }

    isHasNull(val) {
        let keyArr = this.getkey(val);
        let res = keyArr.some((value) => {
            return !val[value];
        });
        return res;
    }

    isEqual(val1, val2) {
        return val1 === val2;
    }
}

export const JudgeInput = new JudgeInputValue();

/**
 * 判断值是否存在于数组
 * @param arr
 * @param value
 * @returns {boolean}
 */
export const valueInArr = (arr, value) => {
    let result = false;
    if (arr && Array.isArray(arr)) {
        result = arr.some((val) => {
            return val === value;
        });
    }
    return result;
};

/**
 * 日期加减法
 * @param date 时间
 * @param days 加减的天数
 * @returns {string}
 */
export const addDate = (date, days) => {
    let d = new Date(date);
    d.setDate(d.getDate() + days);
    let month = '00' + (d.getMonth() + 1);
    let day = '00' + d.getDate();
    month = month.substr(month.length - 2);
    day = day.substr(day.length - 2);
    return d.getFullYear() + '-' + month + '-' + day;
};

/**
 * 获取默认的上课时间范围, 未来3天时间
 */
export const getDefaultClassTimeRange = () => {
    const startTime = (new Date()).format('yyyy-MM-dd') + ' 00:00:00';
    const endTime = addDate(new Date(), 2) + ' 23:59:59';
    return [
        startTime,
        endTime
    ];
};

/**
 * 获取上课时间
 * @param startDate
 * @param endDate
 */
export const getClassTime = (startDate, endDate) => {

    const array = [];
    const timeConfig = [
        '10:00',
        '10:30',
        '11:00',
        '18:00',
        '18:30',
        '19:00',
        '19:30',
        '20:00',
        '20:30',
    ];
    let maxLength = startDate ? 7 : 5;

    // 默认显示最近5天内的上课时间
    startDate = startDate ? addDate(new Date(startDate), 0) : addDate(new Date(), -2);
    endDate = endDate ? addDate(new Date(endDate), 0) : addDate(new Date(), 2);

    for (let i = 0; i < maxLength; i++) {
        let strDate = addDate(new Date(startDate), i);
        let day = {
            id: strDate,
            name: strDate,
            children: [],
        };

        for (let j = 0; j < timeConfig.length; j++) {
            day.children.push({
                id: strDate + '_' + timeConfig[j],
                name: strDate + ' ' + timeConfig[j],
            });
        }

        array.push(day);

        if (strDate === endDate) {
            break;
        }
    }

    return array;
};

/**
 * 计算学生年龄
 * @param birthYear
 * @param birthMonth
 * @returns {string}
 */
export const studentAge = (birthYear, birthMonth) => {
    if (typeof birthYear === 'number' && birthYear < 1900) {
        return '学员自主更改';
    }
    if (typeof birthYear !== 'number' || typeof birthMonth !== 'number') return '';
    let year = new Date().getFullYear() - parseInt(birthYear, 10);
    let month = (new Date().getMonth() + 1) - parseInt(birthMonth, 10);

    if (year < 0 || (year === 0 && month <= 0)) {
        return '学员自主修改';
    }

    if (month === 0) {
        return `${year}岁`;
    } else if (month > 0) {
        return `${year}岁${month}个月`;
    } else {
        return `${year - 1}岁${12 + month}个月`;
    }
};

/**
 * 简单函数节流
 * @param action
 * @param delay
 * @returns {Function}
 */
export const throttle = function (action, delay) {
    let last = 0;
    return function () {
        let current = Number(new Date());
        if (current - last > delay) {
            action.apply(this, arguments);
            last = current;
        }
    };
};

/**
 * 根据秒数计算返回时分秒
 * @param second
 * @returns {string}
 */
export const secondCount = function (second) {
    if (typeof second !== 'number' && second < 0) {
        return '';
    }
    return (second / 60 / 60 >>> 0) + ' 时 ' + (second / 60 % 60 >>> 0) + ' 分 ' + (second % 60) + '秒';
};
