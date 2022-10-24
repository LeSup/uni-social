const http = uni.$u.http;

// post请求，获取菜单
// export const postMenu = (params, config = {}) => http.post('/ebapi/public_api/index', params, config)

// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
// export const getMenu = (data) => http.get('/ebapi/public_api/index', data)

// 获取广告列表
export const getAdvertisingList = (params) => http.get('/advertisingspace/advertising', { params });

// 获取动态列表
export const getDynamicList = (params) => http.get('/feeds', { params });

// 获取资讯列表
export const getNewsList = (params) => http.get('/news', { params });
