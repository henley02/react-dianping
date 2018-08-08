import axios from 'axios';
import qs from "qs";

axios.defaults.withCredentials = true;
axios.defaults.timeout = 100000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

axios.defaults.transformRequest = [function (data) {
    //数据序列化
    return qs.stringify(data);
}]

// // axios拦截器
// axios.interceptors.request.use(config => {
//     config.setHeaders([
//         // 在这里设置请求头与携带token信息
//     ])
//     return config
// })

axios.interceptors.response.use(response => {
    if (response.data.status === 10) {
        // this.doLogin();
        window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`
    } else {
        return response.data;
    }
}, err => {
    return Promise.reject(err);
})

export default axios;