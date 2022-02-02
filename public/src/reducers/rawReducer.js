import {
  RAW_LIST_REQUEST,    RAW_LIST_SUCCESS,    RAW_LIST_FAILURE,
  RAW_GET_REQUEST,     RAW_GET_SUCCESS,     RAW_GET_FAILURE,
  RAW_ADD_REQUEST,     RAW_ADD_SUCCESS,     RAW_ADD_FAILURE,
  RAW_EDIT_REQUEST,    RAW_EDIT_SUCCESS,    RAW_EDIT_FAILURE,
  RAW_DELETE_REQUEST,  RAW_DELETE_SUCCESS,  RAW_DELETE_FAILURE,
  RAW_TOGGLE_ADDING,   RAW_TOGGLE_EDITING,  RAW_TOGGLE_DELETING,
  RAW_DIRECT_SELECT
} from '../actions/types.js';

const initialState = {
  raws: [],
  selectedRaw: {},
  adding: false,
  editing: false,
  deleting: false,
  loading: false,
  error: null
}

const rawReducer = (state = initialState, action) => {
  switch(action.type) {
    case RAW_LIST_REQUEST:
    case RAW_GET_REQUEST:
    case RAW_ADD_REQUEST:
    case RAW_EDIT_REQUEST:
    case RAW_DELETE_REQUEST: return { ...state, loading: true }
    case RAW_LIST_FAILURE:
    case RAW_GET_FAILURE:
    case RAW_ADD_FAILURE:
    case RAW_EDIT_FAILURE:
    case RAW_DELETE_FAILURE: return { ...state, loading: false, error: action.payload }
    case RAW_LIST_SUCCESS:
      return { ...state, loading: false, raws: action.payload.sort((a, b) => a.number <= b.number) }
    case RAW_DIRECT_SELECT:
    case RAW_GET_SUCCESS:
      return { ...state, loading: false, selectedRaw: action.payload }
    case RAW_ADD_SUCCESS:
      return { ...state, loading: false, raws: [...state.raws, action.payload].sort((a, b) => a.number <= b.number), selectedRaw: action.payload}
    case RAW_EDIT_SUCCESS:
      return { ...state, loading: false, selectedRaw: action.payload,
        raws: [...state.raws.filter(raw => { return raw._id !== action.payload._id }), action.payload].sort((a, b) => a.number <= b.number), }
    case RAW_DELETE_SUCCESS:
      return { ...state, loading: false, adding: false, editing: false, deleting: false, selectedRaw: {},
        raws: action.payload.sort((a, b) => a.number <= b.number)  }
    case RAW_TOGGLE_ADDING:
      return { ...state, adding: !state.adding }
    case RAW_TOGGLE_DELETING:
      return { ...state, deleting: !state.deleting }
    case RAW_TOGGLE_EDITING:
      return { ...state, editing: !state.editing }
    default:
      return state;
  }
};

export default rawReducer;
