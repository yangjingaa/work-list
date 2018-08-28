import Mock from 'mockjs'
import {mockConfig} from './mock-config'
import router from './router/index'

Mock.setup(mockConfig);

router();


export default Mock;