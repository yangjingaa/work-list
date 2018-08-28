import React, {Component} from 'react'

import {judgeDataType} from "../../utils/tools";

class Game2d extends Component {


    textObjectKey = () => {
        const arr = [1, 2, 3];
        arr.find(value => {
            console.log(value);
        });
        const obj = Object.prototype.toString.call("name");
        const res = judgeDataType("ssd", "string");
        console.log(res);
    };

    render() {
        const a = this.textObjectKey();
        return (
            <div>
                <p>2D游戏</p>

            </div>
        );
    }

}

export default Game2d;