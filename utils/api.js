import { AsyncStorage } from "react-native";
import { deckResults, DECKS_STORAGE_KEY } from "./_data";

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(deckResults);
}

export function getDeck(deckId) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    return data[key];
  });
}

export function saveDeckTitle(newDeck) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newDeck));
}

export function addCardToDeck(id, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    const deckQuestions = data[id].questions;
    const newCards = deckQuestions.concat(card);
    const newDeck = { [id]: { questions: newCards } };

    AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newDeck));
  });
}

export function deleteDeck(id) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    data[id] = undefined;
    delete data[id];
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
  });
}
