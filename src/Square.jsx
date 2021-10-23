import React from "react";
import { StyleSheet, TouchableHighlight, Text } from "react-native";

// square is just button with either X, O or nothing in it.
export default function Square(props) {
  return (
    <TouchableHighlight
      underlayColor="#f0f0f0"
      style={styles.square}
      onPress={props.onClick}
    >
      <Text style={props.color ? styles.winner : styles.text}>
        {props.value ? props.value : ""}
      </Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  square: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: 100,
    height: 100,

    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
  },

  text: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },

  winner: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    color: "red",
  },
});
