import React, {Component} from 'react'

class ReactPac extends Component {

    name = (a) => {
        if (Array.isArray()) {
            console.log(1)
        }
    };

    render() {
        return (
            <div>
                <p>master1</p>
                <p>master2</p>
                <p>master2</p>
                <p>master3</p>
                <p>test21</p>
                <p>master3</p>
                <p>test21</p>

                <p>master2</p>
                <p>master3</p>
                <p>test21</p>
            </div>
        );
    }

}

export default ReactPac;