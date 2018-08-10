import React, {Component} from 'react';

function asyncComponent(importComponent) {

    class AsyncComponent extends Component {

        state = {
            component: null,
        };

        async componentDidMount() {
            const {default: component} = await importComponent();

            !this.isCancelled && this.setState({
                component: component
            });
        }

        componentWillUnmount() {
            this.isCancelled = true;
        }

        render() {
            const C = this.state.component;

            return C
                ? <C {...this.props} />
                : null;
        }
    }

    return AsyncComponent;
}

export default asyncComponent;
