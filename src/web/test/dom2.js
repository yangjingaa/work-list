import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CommonCopyToClipboard extends Component {

    static propTypes = {
        text: PropTypes.string.isRequired, // 复制文本
        typePic: PropTypes.string,
        msg: PropTypes.string,
        iconType: PropTypes.string,
    };

    static defaultProps = {
        text: '',
        typePic: 'icon',
        msg: '复制成功！',
        iconType: 'copy',
    };

    renderCondition = () => {
        let conditionArray = null;
        const {typePic} = this.props;
        if (!typePic) {
            return conditionArray;
        }
        switch (typePic) {
            case 'button':
                conditionArray = (
                    <button>复制</button>
                );
                break;
            case 'span':
                conditionArray = (
                    <span>复sss制</span>
                );
                break;
        }
        return conditionArray;
    };

    render() {
        const {text} = this.props;
        return (
            <div>
                {text}
                {this.renderCondition()}
            </div>
        );

    }
}


export default CommonCopyToClipboard;
