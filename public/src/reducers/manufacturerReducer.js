import {
  MANUFACTURER_LIST_REQUEST, MANUFACTURER_LIST_SUCCESS, MANUFACTURER_LIST_FAILURE,
  MANUFACTURER_GET_REQUEST, MANUFACTURER_GET_SUCCESS, MANUFACTURER_GET_FAILURE,
  MANUFACTURER_ADD_REQUEST, MANUFACTURER_ADD_SUCCESS, MANUFACTURER_ADD_FAILURE,
  MANUFACTURER_EDIT_REQUEST, MANUFACTURER_EDIT_SUCCESS, MANUFACTURER_EDIT_FAILURE,
  MANUFACTURER_DELETE_REQUEST, MANUFACTURER_DELETE_SUCCESS, MANUFACTURER_DELETE_FAILURE,
  MANUFACTURER_TOGGLE_ADDING, MANUFACTURER_TOGGLE_EDITING, MANUFACTURER_TOGGLE_DELETING,
  MANUFACTURER_DIRECT_SELECT } from '../actions/types.js';

const initialState = {
  manufacturers: [],
  selectedManufacturer: {},
  loading: false,
  adding: false,
  editing: false,
  deleting: false,
  error: null
}

const manufacturerReducer = (state = initialState, action) => {
  switch(action.type) {
    case MANUFACTURER_LIST_REQUEST:
    case MANUFACTURER_GET_REQUEST:
    case MANUFACTURER_ADD_REQUEST:
    case MANUFACTURER_EDIT_REQUEST:
    case MANUFACTURER_DELETE_REQUEST: return { ...state, loading: true }
    case MANUFACTURER_LIST_FAILURE:
    case MANUFACTURER_GET_FAILURE:
    case MANUFACTURER_ADD_FAILURE:
    case MANUFACTURER_EDIT_FAILURE:
    case MANUFACTURER_DELETE_FAILURE: return { ...state, loading: false, error: action.payload }
    case MANUFACTURER_LIST_SUCCESS:
      return { ...state, loading: false, manufacturers: action.payload.sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ) }
    case MANUFACTURER_DIRECT_SELECT:
    case MANUFACTURER_GET_SUCCESS:
      return { ...state, loading: false, selectedManufacturer: action.payload }
    case MANUFACTURER_ADD_SUCCESS:
      return { ...state, loading: false, manufacturers: [...state.manufacturers, action.payload].sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ), selectedManufacturer: action.payload}
    case MANUFACTURER_EDIT_SUCCESS:
      return { ...state, loading: false, selectedManufacturer: action.payload,
        manufacturers: [...state.manufacturers.filter(manufacturer => { return manufacturer._id !== action.payload._id }), action.payload].sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ), }
    case MANUFACTURER_DELETE_SUCCESS:
      return { ...state, loading: false, adding: false, editing: false, deleting: false, selectedManufacturer: {},
        manufacturers: action.payload.sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 )  }
    case MANUFACTURER_TOGGLE_ADDING:
      return { ...state, adding: !state.adding }
    case MANUFACTURER_TOGGLE_DELETING:
      return { ...state, deleting: !state.deleting }
    case MANUFACTURER_TOGGLE_EDITING:
      return { ...state, editing: !state.editing }
    default:
      return state;
  }
};

export default manufacturerReducer;
