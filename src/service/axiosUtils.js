import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/api',
    timeout: 100000,
    headers: {
        common: {'X-Requested-With': 'XMLHttpRequest'},
        post: {'Content-Type': 'application/x-www-form-urlencoded'}
    },
    responseType: 'json'
});
const token = 'token';
/**
 * 请求拦截器
 * @param config
 * @returns {*}
 */
const requestInterceptors = (config) => {
    if(token){
        config.headers["Authorization"] = token;
    }
    return config;
};
/**
 * 响应拦截器
 */
const responseInterceptors = (response) => {
    const {status, data} = response;
    if (status !== 200) {
        return Promise.reject("服务器错误")
    }
    return data;
};
axiosInstance.interceptors.request.use(requestInterceptors, error => {
    return Promise.reject(error)
});
axiosInstance.interceptors.response.use(responseInterceptors, error => {
    return Promise.reject(error)
});
/**
 * 请求成功后 判断响应 内容
 * @param res
 * @param resolve
 * @param reject
 */
const successRequest=(res,resolve,reject)=>{
    const {code, data, message} = res;
    if (code === 200) {
        resolve(data)
    } else {
        reject(message)
    }
};

/**
 * 处理请求响应
 * @param url
 * @param method
 * @param data
 * @returns {Promise}
 */
const axiosFetch = (url, method = 'GET', data = '') => {
    return new Promise((resolve, reject) => {
        axiosInstance({url:url,method:method,data:data})
            .then((res) => {
                successRequest(res,resolve,reject)
            })
            .catch((error) => {
                console.error(error);
            })
    })
};
/**
 * 区分请求类型
 * @type {{get(*=): *, post(*=, *=): *, put(*=, *=): *, delete(*=, *): *}}
 */
const axiosUtils = {
    get(url) {
        return axiosFetch(url)
    },
    post(url, data) {
        return axiosFetch(url, 'POST', data)
    },
    put(url,data){
        return axiosFetch(url,'PUT',data)
    },
    delete(url,data){
        return axiosFetch(url,'DELETE',data)
    }

};

export default axiosUtils;



