import Mock from 'mockjs'
import {mockConfig} from './mock-config'
import basicsConfig from './router/basics-config'

Mock.setup(mockConfig);

const routerConfig=[
    ...basicsConfig
];
const router=()=>{
    if (routerConfig.length > 0) {
        routerConfig.forEach(value => {
            const {url,type,template}=value;
            Mock.mock(url,type,template());
        })
    }
};

router();


export default Mock;