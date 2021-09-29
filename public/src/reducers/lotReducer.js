import {
  GET_LOTS,
  LOT_ADDED,
  LOT_EDITED,
  LOT_DELETED,
  TOGGLE_ADDING_LOT,
  TOGGLE_EDITING_LOT,
  TOGGLE_DELETING_LOT,
  SELECT_LOT
} from '../actions/types.js';

const initialState = {
  lots: [],
  selectedIndex: null,
  selectedLot: {},
  adding: false,
  editing: false,
  deleting: false
}

const lotReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_LOTS:
      return {
        ...state,
        lots: action.payload
      }
    case LOT_ADDED:
      return {
        ...state,
        lots: [...state.lots, action.payload],
        selectedLot: action.payload,
        selectedIndex: null
      }
    case LOT_EDITED:
      return {
        ...state,
        lots: [
          ...state.lots.filter(lot => { return lot._id !== action.payload._id }),
          action.payload
        ],
        selectedLot: action.payload,
        selectedIndex: null
      }
    case LOT_DELETED:
      return {
        ...state,
        selectedIndex: null,
        selectedLot: {},
        lots: [state.lots.filter(lot => lot._id !== action.payload)],
        adding: false,
        editing: false,
        deleting: false
      }
    case SELECT_LOT:
      return {
        ...state,
        selectedIndex: action.payload,
        selectedLot: state.lots[action.payload]
      }
    case TOGGLE_ADDING_LOT:
      return {
        ...state,
        adding: !state.adding
      }
    case TOGGLE_DELETING_LOT:
      return {
        ...state,
        deleting: !state.deleting
      }
    case TOGGLE_EDITING_LOT:
      return {
        ...state,
        editing: !state.editing
      }
    default:
      return state;
  }
};

export default lotReducer;
