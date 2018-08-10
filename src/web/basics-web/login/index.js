import React, {Component} from 'react'
import {Button, Card, Input} from 'antd'

// import message from ''

import styles from './index.less'

class Login extends Component {
    state = {
        userName: null,
        password: null
    };
    goto = () => {
        this.props.history.push('/error')
    };
    /**
     * 绑定input改变事件
     */
    handelInputChange = (key, e) => {
        const value=e.target.value;
        this.setState({
            [key]:value
        })
    };
    /**
     * 登录 并验证输入框
     */
    login=()=>{
        const {userName,password}=this.state;
        if (!userName){

        }

    };

    render() {
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
                                        onChange={this.handelInputChange.bind(null, 'userName')}/>
                                </div>
                                <div className={styles.loginInput}>
                                    <Input
                                        placeholder={'password'}
                                        className={styles.labelInput}
                                        type={'password'}
                                        onChange={this.handelInputChange.bind(null, 'password')}
                                    />
                                </div>
                                <Button block className={styles.labelButton} onClick={this.login}>登录</Button>
                            </div>
                        </Card.Grid>
                    </Card>
                    {/*<div className={styles.animalBox}>*/}
                        {/*/!*<Simple height={window.height} width={window.width}/>*!/*/}
                        {/*/!*<BoxExample/>*!/*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }

}

export default Login;