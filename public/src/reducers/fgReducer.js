import {
  FG_LIST_REQUEST, FG_LIST_SUCCESS, FG_LIST_FAILURE,
  FG_GET_REQUEST, FG_GET_SUCCESS, FG_GET_FAILURE,
  FG_ADD_REQUEST, FG_ADD_SUCCESS, FG_ADD_FAILURE,
  FG_EDIT_REQUEST, FG_EDIT_SUCCESS, FG_EDIT_FAILURE,
  FG_DELETE_REQUEST, FG_DELETE_SUCCESS, FG_DELETE_FAILURE,
  FG_TOGGLE_ADDING, FG_TOGGLE_EDITING, FG_TOGGLE_DELETING,
  FG_DIRECT_SELECT } from '../actions/types.js';

const initialState = {
  fgs: [],
  selectedFg: {},
  adding: false,
  editing: false,
  deleting: false,
  loading: false,
  error: null
}

const fgReducer = (state = initialState, action) => {
  switch(action.type) {
    case FG_LIST_REQUEST:
    case FG_GET_REQUEST:
    case FG_ADD_REQUEST:
    case FG_EDIT_REQUEST:
    case FG_DELETE_REQUEST: return { ...state, loading: true }
    case FG_LIST_FAILURE:
    case FG_GET_FAILURE:
    case FG_ADD_FAILURE:
    case FG_EDIT_FAILURE:
    case FG_DELETE_FAILURE: return { ...state, loading: false, error: action.payload }
    case FG_LIST_SUCCESS:
      return { ...state, loading: false, fgs: action.payload.sort((a, b) => a.number <= b.number) }
    case FG_DIRECT_SELECT:
    case FG_GET_SUCCESS:
      return { ...state, loading: false, selectedFg: action.payload }
    case FG_ADD_SUCCESS:
      return { ...state, loading: false, fgs: [...state.fgs, action.payload].sort((a, b) => a.number <= b.number), selectedFg: action.payload}
    case FG_EDIT_SUCCESS:
      return { ...state, loading: false, selectedFg: action.payload,
        fgs: [...state.fgs.filter(fg => { return fg._id !== action.payload._id }), action.payload].sort((a, b) => a.number <= b.number), }
    case FG_DELETE_SUCCESS:
      return { ...state, loading: false, adding: false, editing: false, deleting: false, selectedFg: {},
        fgs: action.payload.sort((a, b) => a.number <= b.number)  }
    case FG_TOGGLE_ADDING:
      return { ...state, adding: !state.adding }
    case FG_TOGGLE_DELETING:
      return { ...state, deleting: !state.deleting }
    case FG_TOGGLE_EDITING:
      return { ...state, editing: !state.editing }
    default:
      return state;
  }
};

export default fgReducer;
