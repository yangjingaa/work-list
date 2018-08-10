import React, {PureComponent} from 'react';

function funComponent(Component, funcStr) {


    class AuthComponent extends PureComponent {
        render() {
            <Component {...this.props}/>
        }
    }

    return AuthComponent
}

export default funComponent;