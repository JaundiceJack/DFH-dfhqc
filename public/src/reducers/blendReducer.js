import {
  GET_BLENDS,
  BLEND_ADDED,
  BLEND_EDITED,
  BLEND_DELETED,
  TOGGLE_ADDING_BLEND,
  TOGGLE_EDITING_BLEND,
  TOGGLE_DELETING_BLEND,
  SELECT_BLEND
} from '../actions/types.js';

const initialState = {
  blends: [],
  selectedIndex: null,
  selectedBlend: {},
  adding: false,
  editing: false,
  deleting: false,
}

const blendReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_BLENDS:
      return {
        ...state,
        blends: action.payload
      }
    case BLEND_ADDED:
      return {
        ...state,
        blends: [...state.blends, action.payload],
        selectedBlend: action.payload,
        selectedIndex: null
      }
    case BLEND_EDITED:
      return {
        ...state,
        blends: [
          ...state.blends.filter(blend => { return blend._id !== action.payload._id }),
          action.payload
        ],
        selectedBlend: action.payload,
        selectedIndex: null
      }
    case BLEND_DELETED:
      return {
        ...state,
        selectedIndex: null,
        selectedBlend: {},
        blends: [state.blends.filter(blend => blend._id !== action.payload)],
        adding: false,
        editing: false,
        deleting: false
      }
    case SELECT_BLEND:
      return {
        ...state,
        selectedIndex: action.payload,
        selectedBlend: state.blends[action.payload]
      }
    case TOGGLE_ADDING_BLEND:
      return {
        ...state,
        adding: !state.adding
      }
    case TOGGLE_DELETING_BLEND:
      return {
        ...state,
        deleting: !state.deleting
      }
    case TOGGLE_EDITING_BLEND:
      return {
        ...state,
        editing: !state.editing
      }
    default:
      return state;
  }
};

export default blendReducer;
