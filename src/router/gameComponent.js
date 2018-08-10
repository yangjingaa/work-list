import asyncComponent from './async-component';

const Game2d = asyncComponent(()=> import('../web/game2d/index'));
const Game3d = asyncComponent(()=> import('../web/game3d/index'));

const gameConfig = [
    {
        name: '2d游戏',
        key: "game2d",
        path: '/game2d',
        component: Game2d
    },
    {
        name:"3d游戏",
        key:'game3d',
        path:'/game3d',
        component:Game3d
    }
];
export default gameConfig;