import {
  GET_LABS,
  LAB_ADDED,
  LAB_EDITED,
  LAB_DELETED,
  TOGGLE_ADDING_LAB,
  TOGGLE_EDITING_LAB,
  TOGGLE_DELETING_LAB,
  SELECT_LAB
} from '../actions/types.js';

const initialState = {
  labs: [],
  selectedLab: {},
  adding: false,
  editing: false,
  deleting: false,
}

const labReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_LABS:
      return {
        ...state,
        labs: action.payload.sort((a, b) => { return b.name[0] < a.name[0] })
      }
    case LAB_ADDED:
      return {
        ...state,
        labs: [...state.labs, action.payload].sort((a, b) => { return b.name[0] < a.name[0] }),
        selectedLab: action.payload
      }
    case LAB_EDITED:
      return {
        ...state,
        labs: [
          ...state.labs.filter(lab => { return lab._id !== action.payload._id }),
          action.payload
        ].sort((a, b) => { return b.name[0] < a.name[0] }),
        selectedLab: action.payload,
      }
    case LAB_DELETED:
      return {
        ...state,
        selectedLab: {},
        labs: [...state.labs.filter(lab => lab._id !== action.payload)],
        adding: false,
        editing: false,
        deleting: false
      }
    case SELECT_LAB:
      return {
        ...state,
        selectedLab: action.payload
      }
    case TOGGLE_ADDING_LAB:
      return {
        ...state,
        adding: !state.adding
      }
    case TOGGLE_DELETING_LAB:
      return {
        ...state,
        deleting: !state.deleting
      }
    case TOGGLE_EDITING_LAB:
      return {
        ...state,
        editing: !state.editing
      }
    default:
      return state;
  }
};

export default labReducer;
