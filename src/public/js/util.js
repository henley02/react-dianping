/**
 * 获取URL参数
 * @param name
 * @returns {undefined}
 */
export function getParamsCode(name) {
    let search = window.location.href.indexOf('?') > -1 ? window.location.href.split('?')[1].split('&') : [],
        i = 0,
        len = search.length,
        params = {},
        pos;
    for (; i < len; i++) {
        pos = search[i].indexOf('=');
        if (pos > 0) {
            params[search[i].substring(0, pos)] = decodeURIComponent(search[i].substring(pos + 1));
        }
    }
    return params[name] ? params[name] : undefined;
}

/**
 * 时间格式化
 * @param _value
 * @param format
 * @returns {*}
 */
export function dateFormat(_value, format = 'yyyy-MM-dd hh:mm:ss') {
    if (!_value) return _value;
    let value = _value;
    if (typeof value === "string" && value.indexOf("-") > -1) {
        value = value.replace(/-/g, '/');
    }
    if (!isNaN(value)) {
        value = parseInt(value);
    }
    value = new Date(value);
    let args = {
        'M+': value.getMonth() + 1,
        'd+': value.getDate(),
        'h+': value.getHours(),
        'm+': value.getMinutes(),
        's+': value.getSeconds(),
        'q+': Math.floor((value.getMonth() + 3) / 3), // quarter
        S: value.getMilliseconds()
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (String(value.getFullYear())).substr(4 - RegExp.$1.length));
    for (let i in args) {
        if (args.hasOwnProperty(i)) {
            let n = args[i];
            if (new RegExp('(' + i + ')').test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ('00' + n).substr((String(n)).length));
        }
    }
    return format;
}

/**
 * 设置localStorage
 * @param key
 * @param data
 */
export function setLocalStorage(key, data) {
    let type = typeof data;
    if (type === "object") {
        localStorage.setItem(key, JSON.stringify(data));
    } else if (['string', 'number', 'boolean'].indexOf(type) > -1) {
        localStorage.setItem(key, data);
    } else {
        alert("该类型不能用于本地存储");
    }
}

/**
 * 获取localStorage
 * @param key
 * @returns {string}
 */
export function getLocalStorage(key) {
    let data = localStorage.getItem(key);
    if (data) {
        return JSON.parse(data);
    } else {
        return "";
    }
}

/**
 * 删除localStorage
 * @param key
 */
export function removeLocalStorage(key) {
    localStorage.removeItem(key)
}