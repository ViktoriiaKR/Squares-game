import React, {Component} from "react";

class Button extends Component {

    render() {

        return (
            <div className="btn_start_game" id="btn_start_game">
                <button onClick={() => this.props.func(Math.random())}>Start</button>
            </div>
        );
    }
}

export default Button;