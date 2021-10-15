import {
  LOADING_MANUFACTURERS,
  GET_MANUFACTURERS,
  MANUFACTURER_ADDED,
  MANUFACTURER_EDITED,
  MANUFACTURER_DELETED,
  TOGGLE_ADDING_MANUFACTURER,
  TOGGLE_EDITING_MANUFACTURER,
  TOGGLE_DELETING_MANUFACTURER,
  SELECT_MANUFACTURER
} from '../actions/types.js';

const initialState = {
  manufacturers: [],
  selectedManufacturer: {},
  loading: false,
  adding: false,
  editing: false,
  deleting: false
}

const manufacturerReducer = (state = initialState, action) => {
  switch(action.type) {
    case MANUFACTURER_ADDED:
      return {
        ...state,
        manufacturers: [
          ...state.manufacturers,
           action.payload
         ].sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ),
        selectedManufacturer: action.payload,
        adding: false
      }
    case MANUFACTURER_EDITED:
      return {
        ...state,
        manufacturers: [
          ...state.manufacturers.filter(manufacturer => manufacturer._id !== action.payload._id),
          action.payload
        ].sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ),
        selectedManufacturer: action.payload,
        editing: false
      }
    case MANUFACTURER_DELETED:
      return {
        ...state,
        selectedManufacturer: {},
        manufacturers: [
          ...state.manufacturers.filter(manufacturer => manufacturer._id !== action.payload)
        ].sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ),
        deleting: false
      }
    case LOADING_MANUFACTURERS:
      return { ...state, loading: true }
    case GET_MANUFACTURERS:
      return { ...state, loading: false, manufacturers: action.payload }
    case SELECT_MANUFACTURER:
      return { ...state, selectedManufacturer: action.payload }
    case TOGGLE_ADDING_MANUFACTURER:
      return { ...state, adding:   !state.adding }
    case TOGGLE_DELETING_MANUFACTURER:
      return { ...state, deleting: !state.deleting }
    case TOGGLE_EDITING_MANUFACTURER:
      return { ...state, editing:  !state.editing }
    default:
      return state;
  }
};

export default manufacturerReducer;
