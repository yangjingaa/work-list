import React, {PureComponent} from "react"
import CommonCopyToClipboard from "./dom2"
import {Button} from 'antd'
// import './index.styl'
import styles from './back.less'

class Dom1 extends PureComponent {

    static propTypes = {
        // name:PropTypes.string
    };
    static defaultProps = {};

    componentWillMount() {
    }

    componentDidMount() {
        console.log(this.commonponentBox)
    }

    componentWillReceiveProps() {

    }

    componentWillUpdate() {

    }

    componentDidUpdate() {

    }


    render() {
        return (
            <div>
                <Button type="primary">Primary</Button>
                <Button>Default</Button>
                <Button type="danger">Danger</Button>
                <CommonCopyToClipboard
                    ref={(target) => {
                        console.log(1);
                        this.commonponentBox=target;
                    }}
                    text={'哈哈哈哈'}/>
                <p className={styles.bob}>nsssame</p>
            </div>
        )

    }
}

export default Dom1;

