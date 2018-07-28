import axios from 'public/js/service';

/**
 * 登录
 * @param params
 */
export const login = params => axios.post('/manage/user/login.do', params);

/**
 * 退出登录
 * @param params
 */
export const logout = () => axios.post('/user/logout.do');

export const getHomeCount = () => axios.post("/manage/statistic/base_count.do");