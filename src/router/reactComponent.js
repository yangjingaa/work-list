import asyncComponent from './async-component';

const ReactPac = asyncComponent(()=> import('../web/react-pac/index'));

const reactConfig = [
    {
        name: 'react',
        key: "react",
        path: '/react/index',
        component: ReactPac
    },
];
export default reactConfig;