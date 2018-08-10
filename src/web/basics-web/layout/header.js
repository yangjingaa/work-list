import React, {Component} from 'react';
import {Layout, Avatar,Icon} from 'antd';
import PropTypes from 'prop-types';

import styles from './index.less'

const {Header} = Layout;

class HeaderLayout extends Component {
    static propTypes = {
        userName: PropTypes.string,//用户名字
        collapsed:PropTypes.bool,//slider 收起状态
        onClickTrigger:PropTypes.func.isRequired//状态切换
    };
    static defaultProps = {
        userName: "name",
        collapsed:false,
    };
    /**
     * 返回头像
     */
    renderAvatar = () => {
        const avatarStyle = {background: "#000", color: "#fff"};
        const {userName} = this.props;
        return (
            <Avatar
                size={'large'}
                // icon={'user'}
                style={avatarStyle}
            >
                {userName}
            </Avatar>
        )
    };

    render() {
        const {collapsed,onClickTrigger}=this.props;
        return (
            <Header className={styles.headerLayout}>
                <Icon
                    className={styles.trigger}
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={onClickTrigger}
                />
                <div className={styles.avatar}>
                    {this.renderAvatar()}
                </div>
            </Header>
        );
    }

}

export default HeaderLayout;