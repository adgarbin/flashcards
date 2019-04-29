import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { blue, gray } from "../utils/colors";

export default class DeckItem extends Component {
  render() {
    const { deck } = this.props;

    return (
      <View style={styles.item}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.numCard}>{deck.questions.length} cards</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderBottomColor: gray,
    padding: 35
  },
  title: {
    color: gray,
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold"
  },
  numCard: {
    color: blue,
    fontSize: 18,
    textAlign: "center"
  }
});
