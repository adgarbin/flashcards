import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { handleGetDecks } from "../actions";
import DeckItem from "./DeckItem";

class DeckList extends Component {
  state = {
    ready: false
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleGetDecks());
    this.setState(() => ({ ready: true }));
  }
  render() {
    const { decks } = this.props;
    const { ready } = this.state;
    if (ready === false) {
      <Text>Loading...</Text>;
    }
    if (!decks) {
      <Text style={styles.noDeck}>Deck List is empty</Text>;
    }
    return (
      <View>
        {Object.keys(decks).map(key => (
          <TouchableOpacity
            key={key}
            onPress={() =>
              this.props.navigation.navigate("DeckView", { entryId: key })
            }
          >
            <DeckItem key={key} deck={decks[key]} />
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}
function mapStateToProps(decks) {
  return {
    decks: decks ? decks : null
  };
}
export default connect(mapStateToProps)(DeckList);

const styles = StyleSheet.create({
  noDeck: {
    fontSize: 35,
    textAlign: "center",
    margin: 30
  }
});
