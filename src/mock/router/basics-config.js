import {basicsTemplate} from '../template/index'

/**
 * 基础路由配置
 * @type {{url: string, type: string, template: login}}
 */
const basicsConfig = [
    /**
     * 登录
     */
    {
        url: '/api/login',
        type: 'post',
        template: basicsTemplate.login
    },

];



export default basicsConfig;
