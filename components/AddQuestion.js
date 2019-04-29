import React, { Component } from "react";
import { connect } from "react-redux";
import { gray } from "../utils/colors";
import { handleAddCard } from "../actions/index";
import { View, TextInput, StyleSheet, Platform } from "react-native";
import StandardBtn from "./StandardBtn";

class AddQuestion extends Component {
  state = {
    question: "",
    answer: ""
  };
  handleSubmit = () => {
    const { navigation, dispatch } = this.props;
    const id = navigation.getParam("entryId", "NO-ID");
    const { question, answer } = this.state;
    const card = { question: question, answer: answer };

    if (question.length < 1 || answer.length < 1) {
      return;
    }

    dispatch(handleAddCard(id, card));
    this.setState(() => ({
      ready: true,
      question: "",
      answer: ""
    }));
    this.toDeck();
  };

  toDeck = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { question, answer } = this.state;

    return (
      <View>
        <TextInput
          placeholder="Enter Question"
          name="question"
          style={Platform.OS === "ios" ? styles.inputTextOs : styles.inputText}
          value={question}
          onChangeText={question => this.setState({ question })}
        />
        <TextInput
          placeholder="Enter Answer"
          name="answer"
          style={Platform.OS === "ios" ? styles.inputTextOs : styles.inputText}
          value={answer}
          onChangeText={answer => this.setState({ answer })}
        />
        <StandardBtn onPress={this.handleSubmit}>SUBMIT</StandardBtn>
      </View>
    );
  }
}

export default connect()(AddQuestion);

const styles = StyleSheet.create({
  inputTextOs: {
    borderColor: gray,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    fontSize: 22,
    borderWidth: 1,
    backgroundColor: "#ffffff",
    marginTop: 10,
    marginBottom: 10
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
    backgroundColor: "#ffffff",
    marginTop: 10,
    marginBottom: 10
  }
});
