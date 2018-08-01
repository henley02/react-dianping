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

/**
 * 获取首页数据
 */
export const getHomeCount = () => axios.post("/manage/statistic/base_count.do");

/**
 * 获取用户列表数据
 * @param params
 * @constructor
 */
export const FetchUserList = (params) => axios.post("/manage/user/list.do", params);

export const FetchProductList = (params) => axios.post("/manage/product/list.do", params);

export const ChangeProductStatus = (params) => axios.post("/manage/product/set_sale_status.do", params);