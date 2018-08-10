import asyncComponent from './async-component';

const VuePac = asyncComponent(()=> import('../web/vue-pac/index'));

const vueConfig = [
    {
        name: 'Vue',
        key: "vue",
        path: '/vue/index',
        component: VuePac
    },
];
export default vueConfig;