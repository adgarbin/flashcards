import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { white, gray, pink } from "../utils/colors";
import TextButton from "./TextButton";
import { deleteDeck } from "../utils/api";
import { removeDeck } from "../actions/index";
import { NavigationActions } from "react-navigation";
import StandardBtn from "./StandardBtn";

class DeckView extends Component {
  removeDeck = () => {
    const { deckId, dispatch } = this.props;
    deleteDeck(deckId);
    this.backToList();
    dispatch(removeDeck(deckId));
  };

  backToList = () => {
    console.log("im in redirect");
    const navigateAction = NavigationActions.navigate({
      routeName: "DeckList"
    });

    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    const { deck, deckId } = this.props;

    if (!deck) {
      return <Text>No Deck Found</Text>;
    }

    return (
      <View style={styles.deckContainer}>
        <View>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.subTitle}>{deck.questions.length} cards</Text>
        </View>
        <View>
          <StandardBtn
            onPress={() =>
              this.props.navigation.navigate("AddQuestion", { entryId: deckId })
            }
          >
            Add Card
          </StandardBtn>
          <StandardBtn
            onPress={() =>
              this.props.navigation.navigate("QuizView", { entryId: deckId })
            }
            style={{ margin: 20, backgroundColor: pink }}
          >
            Start Quizz
          </StandardBtn>
          <TextButton onPress={this.removeDeck}>Delete</TextButton>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  const params = props.navigation.state.params;
  const deckId = params["entryId"];

  return {
    deck: deckId && state ? state[deckId] : null,
    deckId: deckId
  };
}

export default connect(mapStateToProps)(DeckView);

const styles = StyleSheet.create({
  deckContainer: {
    flex: 1,
    backgroundColor: white,
    alignItems: "center",
    justifyContent: "space-around",
    textAlign: "center"
  },
  title: {
    fontSize: 25,
    textAlign: "center"
  },
  subTitle: {
    fontSize: 18,
    color: gray,
    textAlign: "center"
  }
});
