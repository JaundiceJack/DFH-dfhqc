import {
  GET_RAWS,
  RAW_ADDED,
  RAW_EDITED,
  RAW_DELETED,
  TOGGLE_ADDING_RAW,
  TOGGLE_EDITING_RAW,
  TOGGLE_DELETING_RAW,
  SELECT_RAW
} from '../actions/types.js';

const initialState = {
  raws: [],
  selectedRaw: {},
  adding: false,
  editing: false,
  deleting: false,
}

const rawReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_RAWS: return { ...state, raws: action.payload }
    case RAW_ADDED:
      return { ...state,
        raws: [...state.raws, action.payload],
        selectedRaw: action.payload
      }
    case RAW_EDITED:
      return { ...state,
        raws: [
          ...state.raws.filter(raw => raw._id !== action.payload._id),
          action.payload
        ],
        selectedRaw: action.payload,
      }
    case RAW_DELETED:
      return { ...state,
        raws: [...state.raws.filter(raw => raw._id !== action.payload)],
        selectedRaw: {},
        adding: false,
        editing: false,
        deleting: false
      }
    case SELECT_RAW:
      return { ...state, selectedRaw: action.payload }
    case TOGGLE_ADDING_RAW:
      return { ...state, adding: !state.adding }
    case TOGGLE_DELETING_RAW:
      return { ...state, deleting: !state.deleting }
    case TOGGLE_EDITING_RAW:
      return { ...state, editing: !state.editing }
    default:
      return state;
  }
};

export default rawReducer;
