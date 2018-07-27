import axios from 'public/js/service';

/**
 * 登录
 * @param params
 */
export const login = params => axios.post(params.url, params.data);