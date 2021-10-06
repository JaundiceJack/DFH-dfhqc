import {
  GET_FGS,
  FG_ADDED,
  FG_EDITED,
  FG_DELETED,
  TOGGLE_ADDING_FG,
  TOGGLE_EDITING_FG,
  TOGGLE_DELETING_FG,
  SELECT_FG
} from '../actions/types.js';

const initialState = {
  fgs: [],
  selectedFg: {},
  adding: false,
  editing: false,
  deleting: false,
}

const fgReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_FGS:
      return {
        ...state,
        fgs: action.payload
      }
    case FG_ADDED:
      return {
        ...state,
        fgs: [...state.fgs, action.payload],
        selectedFg: action.payload,
      }
    case FG_EDITED:
      return {
        ...state,
        fgs: [
          ...state.fgs.filter(fg => { return fg._id !== action.payload._id }),
          action.payload
        ],
        selectedFg: action.payload
      }
    case FG_DELETED:
      return {
        ...state,
        selectedFg: {},
        fgs: [...state.fgs.filter(fg => fg._id !== action.payload)],
        adding: false,
        editing: false,
        deleting: false
      }
    case SELECT_FG:
      return {
        ...state,
        selectedFg: action.payload
      }
    case TOGGLE_ADDING_FG:
      return {
        ...state,
        adding: !state.adding
      }
    case TOGGLE_DELETING_FG:
      return {
        ...state,
        deleting: !state.deleting
      }
    case TOGGLE_EDITING_FG:
      return {
        ...state,
        editing: !state.editing
      }
    default:
      return state;
  }
};

export default fgReducer;
