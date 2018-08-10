import React ,{Component} from 'react'

import styles from './index.less'

class ErrorWeb extends Component{
    state={
    };
    componentDidMount=()=>{
    };

    render() {
        return (
            <div>
                <p className={styles.errColor}>我是错误页面</p>
            </div>
        );
    }

}

export default ErrorWeb;