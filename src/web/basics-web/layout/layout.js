import React, {Component} from 'react'
import {Layout} from "antd"

import HeaderLayout from './header'
import SliderLayout from './silder'

import styles from './index.less'

const { Content} = Layout;

class LayoutPublicWeb extends Component {
    state={
        collapsed:false
    };

    changeTrigger=()=>{
      this.setState({
          collapsed:!this.state.collapsed
      })
    };

    render() {
        const {collapsed}=this.state;
        return (
            <Layout className={styles.layoutContent}>
                <SliderLayout collapsed={collapsed}/>
                <Layout>
                    <HeaderLayout collapsed={collapsed} onClickTrigger={this.changeTrigger}/>
                    <Content className={styles.contentLayout}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default LayoutPublicWeb;