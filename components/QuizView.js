import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { red, white, gray, green, pink } from "../utils/colors";
import TextButton from "./TextButton";
import StandardBtn from "./StandardBtn";

function QuizScore({ onPress, score, numOfCard, goBack }) {
  return (
    <View>
      <Text style={styles.scoreText}>
        Your score is {score} / {numOfCard} good answers
      </Text>
      <StandardBtn
        style={{ backgroundColor: pink, margin: 10 }}
        onPress={onPress}
      >
        Restart Quiz
      </StandardBtn>
      <StandardBtn onPress={goBack}>Back To Deck</StandardBtn>
    </View>
  );
}

function RectoSide({ question, onPress }) {
  return (
    <View>
      <Text style={styles.cardText}>{question}</Text>
      <TextButton style={{ padding: 10, color: gray }} onPress={onPress}>
        Answer
      </TextButton>
    </View>
  );
}

function VersoSide({ answer, onPress }) {
  return (
    <View>
      <Text style={styles.cardText}>{answer}</Text>
      <TextButton style={{ padding: 10, color: gray }} onPress={onPress}>
        Question
      </TextButton>
    </View>
  );
}

class QuizView extends Component {
  state = {
    score: 0,
    cardViewed: 0,
    sideCard: "Recto"
  };

  handleSubmit = validation => {
    const { score, cardViewed } = this.state;
    const { deck } = this.props;
    const numOfCard = deck.questions.length;
    let validate = false;

    if (validation === "correct") {
      validate = true;
    }

    this.setState(() => ({
      score: validate ? score + 1 : score,
      cardViewed: cardViewed + 1
    }));

    if (cardViewed === numOfCard) {
      clearLocalNotification().then(setLocalNotification);
    }
  };

  playAgain = () => {
    this.setState(() => ({
      score: 0,
      cardViewed: 0
    }));
  };

  flipCard = () => {
    const { sideCard } = this.state;
    this.setState(() => ({
      sideCard: sideCard === "Recto" ? "Verso" : "Recto"
    }));
  };

  toDeck = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { cardViewed, score, sideCard } = this.state;
    const { deck } = this.props;
    const questions = deck.questions;
    const numOfCard = questions.length;

    if (numOfCard === 0) {
      return (
        <Text style={styles.cardText}>
          Sorry, There is no cards in this deck!
        </Text>
      );
    }

    if (cardViewed === numOfCard) {
      return (
        <QuizScore
          onPress={this.playAgain}
          numOfCard={numOfCard}
          score={score}
          goBack={this.toDeck}
        />
      );
    }
    return (
      <View style={styles.quizContainer}>
        <View>
          <Text style={styles.cardViewed}>
            {cardViewed + 1}/{numOfCard}
          </Text>
        </View>
        <View>
          {sideCard === "Recto" && (
            <RectoSide
              question={questions[cardViewed].question}
              onPress={this.flipCard}
            />
          )}

          {sideCard === "Verso" && (
            <VersoSide
              answer={questions[cardViewed].answer}
              onPress={this.flipCard}
            />
          )}
        </View>
        <View style={{ marginBottom: 80 }}>
          <StandardBtn
            style={{ backgroundColor: green, margin: 10 }}
            onPress={() => this.handleSubmit("correct")}
          >
            Correct
          </StandardBtn>
          <StandardBtn
            style={{ backgroundColor: red }}
            onPress={() => this.handleSubmit("incorrect")}
          >
            Incorrect
          </StandardBtn>
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

export default connect(mapStateToProps)(QuizView);

const styles = StyleSheet.create({
  quizContainer: {
    flex: 1,
    backgroundColor: white,
    justifyContent: "space-between"
  },
  cardViewed: {
    fontSize: 20,
    margin: 15
  },
  cardText: {
    textAlign: "center",
    fontSize: 28,
    margin: 20
  },
  scoreText: {
    fontSize: 22,
    textAlign: "center",
    margin: 30
  },
  inputText: {
    borderColor: gray,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    fontSize: 22,
    borderWidth: 1,
    backgroundColor: white
  }
});
