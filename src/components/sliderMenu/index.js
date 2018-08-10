import React, {Component} from 'react'
import {Layout, Menu, Icon} from "antd"
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import {MenuData} from "../../analogData/basicMessage";//侧边栏配置数据

const {Sider, Header, Content, Footer} = Layout;
const {SubMenu} = Menu;

class ComponentSliderMenu extends Component {
    static propTypes = {
        MenuData:PropTypes.array.isRequired,//menu数据数组
    };
    static defaultProps = {};

    render() {
        return (
            <div>

            </div>
        );
    }

}
