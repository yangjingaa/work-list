import Mock from 'mockjs'

import basicsConfig from './basics-config'

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
export default router;