import {
  BULK_LIST_REQUEST, BULK_LIST_SUCCESS, BULK_LIST_FAILURE,
  BULK_GET_REQUEST, BULK_GET_SUCCESS, BULK_GET_FAILURE,
  BULK_ADD_REQUEST, BULK_ADD_SUCCESS, BULK_ADD_FAILURE,
  BULK_EDIT_REQUEST, BULK_EDIT_SUCCESS, BULK_EDIT_FAILURE,
  BULK_DELETE_REQUEST, BULK_DELETE_SUCCESS, BULK_DELETE_FAILURE,
  BULK_TOGGLE_ADDING, BULK_TOGGLE_EDITING, BULK_TOGGLE_DELETING,
  BULK_DIRECT_SELECT } from '../actions/types.js';

const initialState = {
  bulks: [],
  selectedBulk: {},
  adding: false,
  editing: false,
  deleting: false,
  loading: false,
  error: null
}

const bulkReducer = (state = initialState, action) => {
  switch(action.type) {
    case BULK_LIST_REQUEST:
    case BULK_GET_REQUEST:
    case BULK_ADD_REQUEST:
    case BULK_EDIT_REQUEST:
    case BULK_DELETE_REQUEST: return { ...state, loading: true }
    case BULK_LIST_FAILURE:
    case BULK_GET_FAILURE:
    case BULK_ADD_FAILURE:
    case BULK_EDIT_FAILURE:
    case BULK_DELETE_FAILURE: return { ...state, loading: false, error: action.payload }
    case BULK_LIST_SUCCESS:
      return { ...state, loading: false, bulks: action.payload.sort((a, b) => a.number <= b.number) }
    case BULK_DIRECT_SELECT:
    case BULK_GET_SUCCESS:
      return { ...state, loading: false, selectedBulk: action.payload }
    case BULK_ADD_SUCCESS:
      return { ...state, loading: false, bulks: [...state.bulks, action.payload].sort((a, b) => a.number <= b.number), selectedBulk: action.payload}
    case BULK_EDIT_SUCCESS:
      return { ...state, loading: false, selectedBulk: action.payload,
        bulks: [...state.bulks.filter(bulk => { return bulk._id !== action.payload._id }), action.payload].sort((a, b) => a.number <= b.number), }
    case BULK_DELETE_SUCCESS:
      return { ...state, loading: false, adding: false, editing: false, deleting: false, selectedBulk: {},
        bulks: action.payload.sort((a, b) => a.number <= b.number)  }
    case BULK_TOGGLE_ADDING:
      return { ...state, adding: !state.adding }
    case BULK_TOGGLE_DELETING:
      return { ...state, deleting: !state.deleting }
    case BULK_TOGGLE_EDITING:
      return { ...state, editing: !state.editing }
    default:
      return state;
  }
};

export default bulkReducer;
