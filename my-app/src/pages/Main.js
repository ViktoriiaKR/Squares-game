import React, {Component} from "react";
import Game from "../components/Game/Game";
import Button from "../components/Game/Button";
import Modal from "../components/Game/Modal"

class Main extends Component {
       state = {
           player_scrolls: 0,
           computer_scrolls: 0,
           count: 0,
           value: '',
           changed: false,
           start_new_game: true
        };

    // This function adds points to the player if he plays according to the rules.
    
    updatePlayerState = () => {
        this.setState({player_scrolls: this.state.player_scrolls + 1});
        if (this.state.player_scrolls === 10) {   
            this.setState({ count: 0 });
            this.refs.game.resetGame();
        } else {
            this.initializationRandomSquare();
        }
    }

    // This function adds points to the computer if the player is playing incorrectly.
    
    updateComputerState = () => {
        this.setState({computer_scrolls: this.state.computer_scrolls +1});
        if (this.state.computer_scrolls === 10) {
            this.setState({ count: 0 });
            this.refs.game.resetGame();
        } else {
            this.initializationRandomSquare();
        }
    }

    // This function defines a random square

    initializationRandomSquare = () => {
        const rand = 1 + Math.floor(Math.random() * (100 - 1));
        this.setState({
            count: rand,
            start_new_game: false
        });
        this.refs.game.startGame();
    }   

    // This function resets game results - player and computer scores

    resetGameResults() {
        this.setState({
            player_scrolls: 0,
            computer_scrolls: 0,
            start_new_game: true
        });
    }

    // This function gets the value that the user enters in milliseconds

    inputChange = (e) => {
        let next = this.state;
        next.value = e.target.value;
        this.setState(next);
    }

    render(){
        return (
        <div>
            <h1>Welcome to the game !</h1>
            <div className="players">
                <p>Player: {this.state.player_scrolls}</p>
                <p>Computer: {this.state.computer_scrolls}</p>
            </div>
            <div className="time_round"> 
                <label>Setting the time for one round in milliseconds</label>
                <input type="number" placeholder="For example, '3000'"
                    className="form-control" 
                    onChange={this.inputChange}
                    value={this.state.value}>
                </input>
            </div>
            <h3>Count: <span id={this.state.count}>{this.state.count}</span></h3>
            {this.state.player_scrolls !== 10 & this.state.computer_scrolls !== 10 ? '' : <Modal initializationRandomSquare={()=>this.resetGameResults()} scorePlayer={this.state.player_scrolls} scoreComputer={this.state.computer_scrolls}/>}
            {this.state.start_new_game ? <Button func={this.initializationRandomSquare} /> : ''}
            <Game ref="game" updatePlayer={this.updatePlayerState} updateComputerState={this.updateComputerState} timer={this.state.value} index={this.state.count}/>
        </div>
        ); 
    }
}

export default Main;