import React, {Component} from "react";

class Modal extends Component {

    render() {

        return (
            <div className="wrapper_modal_window">
                <div className="modal_window">
                    <h2>GAME OVER</h2>
                    <div>
                        <p>Player: {this.props.scorePlayer}</p>
                        <p>Computer: {this.props.scoreComputer}</p>
                    </div>
                    <button onClick={this.props.initializationRandomSquare} className="play_again">PLAY AGAIN</button>
                </div>
            </div>
        )
    }
}

export default Modal;