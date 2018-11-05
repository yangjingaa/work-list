/**
 * 登陆的账号密码
 * @type {{userName: string, password: number}}
 */
export const login = {
    userName: 'admin',
    password: 123
};
/**
 * 侧边栏 menu数据
 * @type {*[]}
 */
export const MenuData = [
    {
        action: "/animal",
        children: [
            {
                action: "/game2d",
                children: [],
                icon: "api",
                id: "38",
                name: "2d动画",
            },
            {
                action: "/game3d",
                children: [],
                icon: "global",
                id: "39",
                name: "3d动画",
            }
        ],
        icon: "car",
        id: "37",
        name: "动画管理",
    },
    {
        action: "/react",
        children: [
            {
                action: "/react/index",
                children: [],
                icon: "wifi",
                id: "41",
                name: "react-index",
            },
        ],
        icon: "fork",
        id: "40",
        name: "react管理",
    },
    // {
    //     action: "/vue",
    //     children: [
    //         {
    //             action: "/vue/index",
    //             children: [],
    //             icon: "usb",
    //             id: "41",
    //             name: "vue-index",
    //         },
    //     ],
    //     icon: "barcode",
    //     id: "50",
    //     name: "vue管理",
    // }
];