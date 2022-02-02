import {
  BLEND_LIST_REQUEST, BLEND_LIST_SUCCESS, BLEND_LIST_FAILURE,
  BLEND_GET_REQUEST, BLEND_GET_SUCCESS, BLEND_GET_FAILURE,
  BLEND_ADD_REQUEST, BLEND_ADD_SUCCESS, BLEND_ADD_FAILURE,
  BLEND_EDIT_REQUEST, BLEND_EDIT_SUCCESS, BLEND_EDIT_FAILURE,
  BLEND_DELETE_REQUEST, BLEND_DELETE_SUCCESS, BLEND_DELETE_FAILURE,
  BLEND_TOGGLE_ADDING, BLEND_TOGGLE_EDITING, BLEND_TOGGLE_DELETING,
  BLEND_DIRECT_SELECT } from '../actions/types.js';

const initialState = {
  blends: [],
  selectedBlend: {},
  adding: false,
  editing: false,
  deleting: false,
  loading: false,
}

const blendReducer = (state = initialState, action) => {
  switch(action.type) {
    case BLEND_LIST_REQUEST:
    case BLEND_GET_REQUEST:
    case BLEND_ADD_REQUEST:
    case BLEND_EDIT_REQUEST:
    case BLEND_DELETE_REQUEST: return { ...state, loading: true }
    case BLEND_LIST_FAILURE:
    case BLEND_GET_FAILURE:
    case BLEND_ADD_FAILURE:
    case BLEND_EDIT_FAILURE:
    case BLEND_DELETE_FAILURE: return { ...state, loading: false, error: action.payload }
    case BLEND_LIST_SUCCESS:
      return { ...state, loading: false, blends: action.payload.sort((a, b) => a.number <= b.number) }
    case BLEND_DIRECT_SELECT:
    case BLEND_GET_SUCCESS:
      return { ...state, loading: false, selectedBlend: action.payload }
    case BLEND_ADD_SUCCESS:
      return { ...state, loading: false, blends: [...state.blends, action.payload].sort((a, b) => a.number <= b.number), selectedBlend: action.payload}
    case BLEND_EDIT_SUCCESS:
      return { ...state, loading: false, selectedBlend: action.payload,
        blends: [...state.blends.filter(blend => { return blend._id !== action.payload._id }), action.payload].sort((a, b) => a.number <= b.number), }
    case BLEND_DELETE_SUCCESS:
      return { ...state, loading: false, adding: false, editing: false, deleting: false, selectedBlend: {},
        blends: action.payload.sort((a, b) => a.number <= b.number)  }
    case BLEND_TOGGLE_ADDING:
      return { ...state, adding: !state.adding }
    case BLEND_TOGGLE_DELETING:
      return { ...state, deleting: !state.deleting }
    case BLEND_TOGGLE_EDITING:
      return { ...state, editing: !state.editing }
    default:
      return state;
  }
};

export default blendReducer;
