import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Square from "./Square";

export default class Board extends Component {
  // renderSquare function takes in a number and returns a square with the number as the value of the square.
  renderSquare(i) {
    let color;

    // if the square is a winning square, change the color of the square to red.
    if (this.props.winner != null && this.props.winner.includes(i)) {
      color = 1;
    } else color = 0;

    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        color={color}
      />
    );
  }

  render() {
    return (
      <View style={styles.board}>
        <View style={styles.row}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </View>
        <View style={styles.row}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </View>
        <View style={styles.row}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
