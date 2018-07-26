import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.timeout = 100000;
axios.defaults.headers.common['X-Requested-With'] = 'application/x-www-form-urlencoded;charset=utf-8';

// // axios拦截器
// axios.interceptors.request.use(config => {
//     config.setHeaders([
//         // 在这里设置请求头与携带token信息
//     ])
//     return config
// })

axios.interceptors.response.use(response => {
    if (response.data.status === 10) {
        this.doLogin();
    } else {
        return response.data;
    }
}, err => {
    return Promise.reject(err);
})

export default axios;