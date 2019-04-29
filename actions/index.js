import { addCardToDeck, saveDeckTitle, getDecks } from "../utils/api";
export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const ADD_QUESTION = "ADD_QUESTION";
export const REMOVE_DECK = "REMOVE_DECK";

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}
export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  };
}
export function addQuestion(id, card) {
  return {
    type: ADD_QUESTION,
    id,
    card
  };
}
export function removeDeck(id) {
  return {
    type: REMOVE_DECK,
    id
  };
}

export function handleGetDecks() {
  return dispatch => {
    return getDecks().then(decks => dispatch(receiveDecks(decks)));
  };
}

export function handleAddCard(id, card) {
  return dispatch => {
    return addCardToDeck(id, card).then(() => dispatch(addQuestion(id, card)));
  };
}

export function handleAddDeck(deck) {
  return dispatch => {
    return saveDeckTitle(deck).then(() => dispatch(addDeck(deck)));
  };
}
