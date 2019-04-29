import { AsyncStorage } from "react-native";

export const DECKS_STORAGE_KEY = "Udacimobile:flashCard";
function setData() {
  const decks = {
    React: {
      title: "React",
      questions: [
        {
          question: "What is React is?",
          answer: "A library for managing user interfaces"
        },
        {
          question: "Where do you make Ajax requests in React?",
          answer: "The componentDidMount lifecycle event"
        }
      ]
    },
    JavaScript: {
      title: "JavaScript",
      questions: [
        {
          question: "What is a closure?",
          answer:
            "The combination of a function and the lexical environment within which that function was declared."
        }
      ]
    }
  };
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));

  return decks;
}

export function deckResults(results) {
  const decks = JSON.parse(results);
  return results === null ? setData() : decks;
}
