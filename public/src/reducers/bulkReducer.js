import {
  GET_BULKS,
  BULK_ADDED,
  BULK_EDITED,
  BULK_DELETED,
  TOGGLE_ADDING_BULK,
  TOGGLE_EDITING_BULK,
  TOGGLE_DELETING_BULK,
  SELECT_BULK
} from '../actions/types.js';

const initialState = {
  bulks: [],
  selectedIndex: null,
  selectedBulk: {},
  adding: false,
  editing: false,
  deleting: false,
}

const bulkReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_BULKS:
      return {
        ...state,
        bulks: action.payload
      }
    case BULK_ADDED:
      return {
        ...state,
        bulks: [...state.bulks, action.payload],
        selectedBulk: action.payload,
        selectedIndex: null
      }
    case BULK_EDITED:
      return {
        ...state,
        bulks: [
          ...state.bulks.filter(bulk => { return bulk._id !== action.payload._id }),
          action.payload
        ],
        selectedBulk: action.payload,
        selectedIndex: null
      }
    case BULK_DELETED:
      return {
        ...state,
        selectedIndex: null,
        selectedBulk: {},
        bulks: [state.bulks.filter(bulk => bulk._id !== action.payload)],
        adding: false,
        editing: false,
        deleting: false
      }
    case SELECT_BULK:
      return {
        ...state,
        selectedIndex: action.payload,
        selectedBulk: state.bulks[action.payload]
      }
    case TOGGLE_ADDING_BULK:
      return {
        ...state,
        adding: !state.adding
      }
    case TOGGLE_DELETING_BULK:
      return {
        ...state,
        deleting: !state.deleting
      }
    case TOGGLE_EDITING_BULK:
      return {
        ...state,
        editing: !state.editing
      }
    default:
      return state;
  }
};

export default bulkReducer;
