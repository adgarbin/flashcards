import React, { Component } from "react";
import { connect } from "react-redux";
import { white, gray } from "../utils/colors";
import { handleAddDeck } from "../actions/index";
import { createDeck } from "../utils/helpers";
import { View, Text, TextInput, StyleSheet, Platform } from "react-native";
import StandardBtn from "./StandardBtn";
import { NavigationActions } from "react-navigation";

class AddDeck extends Component {
  state = {
    title: "",
    ready: false
  };

  handleSubmit = () => {
    const title = this.state.title;
    const newDeck = createDeck(title);
    const { dispatch } = this.props;

    if (title.length < 1) {
      return;
    }

    dispatch(handleAddDeck(newDeck));

    this.setState(() => ({
      ready: true,
      title: ""
    }));

    this.toDeck(Object.keys(newDeck)[0]);
  };

  toDeck = deckId => {
    const navigateAction = NavigationActions.navigate({
      routeName: "DeckView",
      params: { entryId: deckId }
    });

    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    const { title } = this.state;
    return (
      <View>
        <Text style={styles.title}>What is the title of your Deck?</Text>
        <TextInput
          placeholder="Enter Title"
          onChangeText={title => this.setState({ title })}
          value={title}
          style={Platform.OS === "ios" ? styles.inputTextOs : styles.inputText}
        />
        <StandardBtn onPress={this.handleSubmit}>SUBMIT</StandardBtn>
      </View>
    );
  }
}

export default connect()(AddDeck);

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 25,
    padding: 15
  },
  inputTextOs: {
    borderColor: gray,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    fontSize: 22,
    borderWidth: 1,
    backgroundColor: white,
    marginBottom: 20
  },
  inputText: {
    borderColor: gray,
    padding: 10,
    borderRadius: 2,
    height: 45,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 22,
    borderWidth: 1,
    backgroundColor: white,
    marginBottom: 20
  }
});
