import {RESULT_CODE} from '../mock-config'
import Mock from 'mockjs'

const Random=Mock.Random;


const result = (code = RESULT_CODE.suc, message = '成功', data = []) => {
    return {
        code: code,
        message: message,
        data: data
    }
};

/****************************基础登录模版数据************************/

/**
 * 登录template
 * 返回 登录结果 o.1几率返回登录错误状态
 */
export const login = () => {
    const data="登录成功";
    return result(RESULT_CODE.suc, '登录成功',data);
};

