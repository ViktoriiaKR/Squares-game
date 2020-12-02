import React, {Component} from "react";

class Game extends Component {
     state = {
            condition: '',
            trueClick: -1,
            falseClick: -1,
            new_game: false,
            global_time: null
        };
  
    // This function creates a playing field: 10x10 squares (1 row, 100 cells)

    createFieldGame = () => {
        let table = [];
        let lineTR = 1;
        let columnTD = [];
        const { index } = this.props;
        const { trueClick, falseClick } = this.state;
            for (let j = 1; j < 101; j++) {
                columnTD.push(<td 
                                onClick={() => this.activSquare(j)} 
                                className={`
                                    stl_column
                                    ${index === j ? 'column_after_start' : ''}
                                    ${trueClick === j ? 'column_after_click' : ''}
                                    ${falseClick === j ? 'column_not_click' : ''}
                                `}
                                key={j}
                            >
                            </td>)
            };
        table.push(<tr key={lineTR}>{columnTD}</tr>);
        
        return table
    }

    // Create a timer so that the user independently sets the duration of one round of the game
    // The round time is set in milliseconds (for example, 1 second = 1000 milliseconds)

    useTimer() {
        this.state.global_time = setTimeout(() => {  
            this.setState({
                falseClick: this.props.index,
                new_game: false
        });
            setTimeout(() => {  
                this.props.updateComputerState();
            }, 1000);
        }, this.props.timer);
        return () => clearTimeout(this.state.global_time);
    }

    // This function turns on the game

    startGame() {
        this.setState({
            trueClick: -1,
            falseClick: -1,
            new_game: true  
        });
        this.useTimer();
    }

    // This function resets the game

    resetGame() {
        this.setState({
            trueClick: -1,
            falseClick: -1,
            new_game: false
        });
    }
  
    // This function is responsible for the functional work of the game after the start
    // The first condition is responsible for the player’s actions
    // The second condition is the result of the computer
    
    activSquare (index) {
        if (this.state.new_game) {
            if (index === this.props.index) {
                clearTimeout(this.state.global_time);
                this.setState({trueClick: index});
                setTimeout(() => {  
                    this.props.updatePlayer();
                }, 1000);
                this.setState({new_game: false});
            } else {
                clearTimeout(this.state.global_time);
                this.setState({falseClick: index});
                setTimeout(() => {  
                    this.props.updateComputerState();
                }, 1000);
                this.setState({new_game: false});
            }
        }
    }

    render() {
        return (<div className="field_of_play">
                    <table>
                        {this.createFieldGame()}
                    </table>
                </div>)      
    }
}
 
export default Game;
