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

export function getLocalStorage(key) {
    let data = localStorage.getItem(key);
    if (data) {
        return JSON.parse(data);
    } else {
        return "";
    }
}

export function removeLocalStorage(key) {
    localStorage.removeItem(key)
}