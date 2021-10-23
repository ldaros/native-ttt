import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import Board from "./Board";

export default class Game extends Component {
  constructor(props) {
    super(props);

    // initial state
    this.state = {
      history: [{ squares: Array(9).fill(null) }], // game history
      xIsNext: true, // who's turn is it? x = true, o = false
      stepNumber: 0, // current move
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  // handle click on a square in the board and update the state accordingly.
  handleClick(i) {
    // copy the history up to the current move (stepNumber) and add the new move to the end of the array
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1]; // get the current move
    const squares = current.squares.slice(); // copy the squares array from the current move

    // if the square is already occupied, return
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // update the squares array with the new move
    squares[i] = this.state.xIsNext ? "X" : "O";

    // update the state with the new history and the new squares array
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length, // update the current move
      xIsNext: !this.state.xIsNext, // update the turn
    });
  }

  render() {
    let history = this.state.history; // get the history
    const current = history[this.state.stepNumber]; // get the current move
    const winner = calculateWinner(current.squares); // get the winner, if any

    const moves = history.map((step, move) => {
      const desc = move ? "Move\n#" + move : "Game\nStart";

      return (
        // if the move is the current move, highlight it with a different color
        <TouchableHighlight
          key={move}
          onPress={() => this.jumpTo(move)}
          underlayColor="#f0f0f0"
          style={
            move === this.state.stepNumber
              ? [styles.button, styles.color]
              : styles.button
          }
        >
          <Text
            style={
              move === this.state.stepNumber
                ? [styles.buttonInnerText, styles.color]
                : styles.buttonInnerText
            }
          >
            {desc}
          </Text>
        </TouchableHighlight>
      );
    });

    let status; // status message, that is displayed at the right of the board
    if (winner) {
      // if there is a winner
      status = "Winner: " + winner[0]; // set the status message to the win condition
    } else if (history.length === 10 && !calculateWinner(current.squares)) {
      // if there is no winner and the game is over (draw)
      status = "Draw";
    } else {
      // if there is no winner and the game is still in progress
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    // get the winning line, if any (array of the indexes of the squares that form the line)
    let win_line = calculateWinner(current.squares)
      ? calculateWinner(current.squares)[1]
      : null;

    // render everything
    return (
      <View>
        <View>
          <Text style={styles.status}>{status}</Text>
        </View>
        <View>
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winner={win_line}
          />
        </View>
        <View style={styles.movesContainer}>{moves}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  status: {
    fontSize: 20,
    textAlign: "center",
  },

  button: {
    backgroundColor: "white",
    padding: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    margin: 5,
  },

  movesContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    maxWidth: 320,
    margin: "auto",
  },

  buttonInnerText: {
    fontSize: 20,
    textAlign: "center",
    color: "black",
  },

  color: {
    color: "steelblue",
    borderColor: "steelblue",
  },
});

// helper function to see if there is a winner
function calculateWinner(squares) {
  // all possible winning lines
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // loop through all the winning lines
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      let winner = [squares[a], lines[i]];
      return winner; // Hooray! We have a winner!
    }
  }
  return null;
}
