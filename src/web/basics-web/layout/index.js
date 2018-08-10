import React, {Component} from 'react'

import LayoutPublicWeb from './layout'


const loginReg = /^\/login|\/register/i;

/**
 * 登陆后网页的公共部分
 * 根据url 返回layout 和无layout 组件
 * @returns {*}
 */
class LayoutIndex extends Component {

    loadLayout = () => {
        const pathname = window.location.pathname;
        return loginReg.test(pathname);
    };


    render() {
        const {children} = this.props;
        const isLayout = this.loadLayout();
        return (
            <div style={{width: "100%", height: "100%"}}>
                {isLayout ? children : <LayoutPublicWeb>{children}</LayoutPublicWeb>}
            </div>
        )
    }

}

export default LayoutIndex;