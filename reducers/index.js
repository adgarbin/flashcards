import { RECEIVE_DECKS, ADD_DECK, ADD_QUESTION, REMOVE_DECK } from "../actions";

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          questions: [...state[action.id].questions, action.card]
        }
      };
    case REMOVE_DECK:
      const { [action.id]: value, ...newState } = state;
      return newState;
    default:
      return state;
  }
}
export default decks;
