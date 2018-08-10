import asyncComponent from './async-component';

const Home = asyncComponent(import('../web/test/dom1'));

const textConfig = [
    {
        name: '例子1',
        key: "dom1",
        path: '/test',
        component: Home
    }
];
export default textConfig;