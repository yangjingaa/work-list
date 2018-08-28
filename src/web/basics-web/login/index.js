import React, {Component} from 'react'
import {Button, Card, Input} from 'antd'

import {basicRequest} from '../../../service/index'
import message from '../../../utils/message'
import {tools} from "../../../utils/index"
// import message from ''

import styles from './index.less'

class Login extends Component {
    state = {
        userName: 'yangjingbo',
        password: 123456
    };
    goto = () => {

    };
    /**
     * 绑定input改变事件
     */
    handelInputChange = (key, e) => {
        const value = e.target.value;
        this.setState({
            [key]: value
        })
    };
    /**
     * 登录 并验证输入框
     * 所做操作:
     * a:验证输入规则 1. 全部不可为空 2.密码规则
     */
    login = () => {
        const {userName, password} = this.state;
        if (!userName || !password) {
            message.error("请检查输入 输入不可为空! Error");
            return false;
        }
        const data = {
            userName,
            password
        };
        basicRequest.login(data)
            .then((data) => {
                const {token, user} = data;
                tools.setLocalData("user", user);
                tools.setLocalData("token", token);
                this.props.history.push("/react/index")
                }
            )
            .catch(err => console.log(err))

    };

    render() {
        const {userName, password} = this.state;
        return (
            <div className={styles.loginBox}>
                <div className={styles.loginContent}>
                    <Card className={styles.loginCard}>
                        <Card.Grid className={styles.loginWrap}>
                            <div className={styles.title}>
                                <span>一个登录</span>
                            </div>
                            <div className={styles.content}>
                                <div className={styles.loginInput}>
                                    <Input
                                        placeholder={'userName'}
                                        className={styles.labelInput}
                                        value={userName}
                                        onChange={this.handelInputChange.bind(null, 'userName')}/>
                                </div>
                                <div className={styles.loginInput}>
                                    <Input
                                        placeholder={'password'}
                                        className={styles.labelInput}
                                        type={'password'}
                                        value={password}
                                        onChange={this.handelInputChange.bind(null, 'password')}
                                    />
                                </div>
                                <Button block className={styles.labelButton} onClick={this.login}>登录</Button>
                            </div>
                        </Card.Grid>
                    </Card>
                </div>
            </div>
        );
    }

}

export default Login;