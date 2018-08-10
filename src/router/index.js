import React from "react"
import {Switch, Route, Redirect} from "react-router-dom"

import Login from "../web/basics-web/login/index"
import Register from "../web/basics-web/register/index"
import ErrorWeb from '../web/basics-web/error/index'

import gameConfig from './gameComponent'
import reactConfig from './reactComponent'
import vueConfig from './vueComponent'

const routerConfig = [
    ...gameConfig,
    ...reactConfig,
    ...vueConfig
];

const getRouterList = () => {
    return routerConfig.map(config => {
        return (
            <Route key={config.key} path={config.path} component={config.component}/>
        );
    });
};


/**
 * 路由组件
 */
const route = (
    <Switch>
        <Route key="login" path="/login" component={Login}/>,
        <Route key="error" path="/error" component={ErrorWeb}/>,
        <Route key="register" path="/register" component={Register}/>,
        {getRouterList()}
        <Route key="*" path="/login" component={Login}/>,
        <Redirect path="/" to="/login"/>
    </Switch>
);

export default route;