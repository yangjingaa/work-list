import message from './message';
import _ from 'lodash';

import * as tools from './tools';

const loginReg = /^\/login/i;

/**
 * 请求超时, 单位毫秒
 * @type {number}
 */
const REQUEST_TIMEOUT = 16000;

/**
 * 包装 fetch api
 * @param url
 * @param data
 * @param type
 * @param contentType 提交数据格式
 * @returns {Promise<*>}
 */
const fetchWrapper = async (url = '', data = {}, type = 'GET', contentType = CONTENT_TYPE.FORM) => {

    const token = tools.getUserToken();
    if (!loginReg.test(window.location.pathname)) {
        if (!token) {
            message.error('请重新登录!', '登录状态已过期');
            if (!loginReg.test(window.location.pathname)) {
                // history.push(`/login?returnUrl=${encodeURIComponent(window.location.href)}`);
                window.location.href = `/login?returnUrl=${encodeURIComponent(window.location.href)}`;
            }
            return Promise.reject('登录状态已过期');
        }
    }

    !data && (data = {});

    // 数据拼接字符串
    let paramStr = '';

    Object.keys(data).forEach(key => {
        if (data[key] === undefined) {
            return;
        }

        if (data[key] && _.isPlainObject(data[key])) {
            // Object对象
            paramStr += key + '=' + encodeURIComponent(JSON.stringify(data[key])) + '&';
        }
        // else if (Array.isArray(data[key])) {
        //     //数组
        //     paramStr += key + '=' + encodeURIComponent(JSON.stringify(data[key])) + '&';
        // }
        else {
            paramStr += key + '=' + encodeURIComponent(data[key]) + '&';
        }
    });
    if (paramStr !== '') {
        paramStr = paramStr.substr(0, paramStr.lastIndexOf('&'));
    }

    if ((type === HTTP_METHOD.GET || type === HTTP_METHOD.DELETE) && paramStr !== '') {
        url = url + '?' + paramStr;
    }

    let requestConfig = {
        method: type,
        headers: {
            'Accept': 'application/json',
            'Content-Type': contentType,
        },
        // cors跨域设置
        mode: 'cors',
        // // 是否携带cookie
        // credentials: 'include',
        cache: 'no-cache'
    };

    if (!loginReg.test(window.location.pathname)) {
        requestConfig.headers['X-Auth-Token'] = token;
    }

    if (type === HTTP_METHOD.POST || type === HTTP_METHOD.PUT) {
        requestConfig.body = paramStr;
    }

    try {
        const response = await fetch(url, requestConfig);
        const responseJson = await response.json();

        // 如果接口响应成功, 则返回响应数据
        if (responseJson.code && responseJson.code === RESULT_CODE.OK) {
            responseJson.message && message.info(responseJson.message);
            return responseJson;
        }

        /**
         * 网关返回的接口不存在错误
         */
        if (responseJson.error) {
            let desc = responseJson.error;
            if (desc === 'Not Found') {
                desc = `接口不存在, ${url}`;
            }
            message.error('发生错误!', desc);
            return Promise.reject(responseJson.error);
        }

        /**
         * 服务不可用错误
         */
        if (responseJson.msg) {
            let desc = responseJson.msg;
            message.error('发生错误!', desc);
            return Promise.reject(desc);
        }

        /**
         * 登录状态过期, 需要重新登录
         */
        if (responseJson.code === RESULT_CODE.TOKEN_EXPIRED) {
            message.error('请重新登录!', '登录状态已过期');
            if (!loginReg.test(window.location.pathname)) {
                // history.push(`/login?returnUrl=${encodeURIComponent(window.location.href)}`);
                window.location.href = `/login?returnUrl=${encodeURIComponent(window.location.href)}`;
            }
            return Promise.reject('登录状态已过期');
        }

        switch (responseJson.code) {

            /**
             * token过期/无效
             */
            case RESULT_CODE.TOKEN_EXPIRED:
                message.error('请重新登录!', '登录状态已过期');
                if (!loginReg.test(window.location.pathname)) {
                    // history.push(`/login?returnUrl=${encodeURIComponent(window.location.href)}`);
                    window.location.href = `/login?returnUrl=${encodeURIComponent(window.location.href)}`;
                }
                return Promise.reject('登录状态已过期');

            /**
             * 登录错误
             */
            case RESULT_CODE.ERROR_USERNAME:
            case RESULT_CODE.ERROR_PASSWORD:
                // 如果接口响应失败, 则显示错误信息, 并返回 rejected 状态的结果
                message.error('账号或密码错误!', '请重新登录 或 联系管理员!');
                return Promise.reject(responseJson);

            /**
             * 没有权限
             */
            case RESULT_CODE.UNAUTHORIZED:
            case RESULT_CODE.FORBIDDEN:
                message.error('您没有权限!', '');
                if (!loginReg.test(window.location.pathname)) {
                    history.push(`/denied`);
                }
                return Promise.reject(responseJson);

            /**
             * Not Found
             */
            case RESULT_CODE.NOT_FOUND:
                message.error(responseJson.message || '未找到数据!', '');
                return Promise.reject(responseJson);

            /**
             * 业务异常
             */
            case RESULT_CODE.BIZ_ERROR:
                message.error(responseJson.message || '发生业务异常!', '');
                return Promise.reject(responseJson);

            /**
             * 程序异常
             */
            default:
                // 如果接口响应失败, 则显示错误信息, 并返回 rejected 状态的结果
                message.error(responseJson.message || '发生错误!', `接口发生异常, ${url}`);
                return Promise.reject(responseJson);
        }

    } catch (error) {
        message.error(error.toString(), `接口访问失败, ${url}`);
        return Promise.reject(error.toString());
    }
};

/**
 * 内部fetch方法, 修改全局loading状态
 * @param url
 * @param data
 * @param method
 * @param autoLoading
 * @returns {Promise<T>}
 */
const innerFetch = (url, data, method, contentType) => {

    const timerPromise = (timeout = REQUEST_TIMEOUT) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('请求超时!');
            }, timeout);
        });
    };

    return Promise.race([fetchWrapper(url, data, method, contentType), timerPromise()])
        .catch(error => {
            if (error === '请求超时!') {
                message.error(error, `接口请求超时 ${url}`);
            }
            return Promise.reject(error);
        });
};

/**
 * 异步获取或提交数据的方法
 * @returns {*}
 */
const fetchUtils = {
    /**
     * 获取数据
     * @param url
     * @param data
     * @returns {Promise<*>}
     */
    get(url, data) {
        return innerFetch(url, data, HTTP_METHOD.GET);
    },
    /**
     * 提交数据
     * @param url
     * @param data
     * @returns {Promise<*>}
     */
    post(url, data) {
        return innerFetch(url, data, HTTP_METHOD.POST);
    },
    /**
     * 提交数据, CONTENT_TYPE 等于 application/json; charset=UTF-8
     * @param url
     * @param data
     * @returns {Promise<T>}
     */
    postJson(url, data) {
        return innerFetch(url, data, HTTP_METHOD.POST, CONTENT_TYPE.JSON);
    },
    /**
     * 修改数据
     * @param url
     * @param data
     * @returns {Promise<*>}
     */
    put(url, data) {
        return innerFetch(url, data, HTTP_METHOD.PUT);
    },
    /**
     * 修改数据, CONTENT_TYPE 等于 application/json; charset=UTF-8
     * @param url
     * @param data
     * @returns {Promise<T>}
     */
    putJson(url, data) {
        return innerFetch(url, data, HTTP_METHOD.PUT, CONTENT_TYPE.JSON);
    },
    /**
     * 删除数据
     * @param url
     * @param data
     * @returns {Promise<*>}
     */
    delete(url, data) {
        return innerFetch(url, data, HTTP_METHOD.DELETE);
    },
};

export default fetchUtils;
