import {
  LOADING_UNITS,
  GET_UNITS,
  UNIT_ADDED,
  UNIT_EDITED,
  UNIT_DELETED,
  TOGGLE_ADDING_UNIT,
  TOGGLE_EDITING_UNIT,
  TOGGLE_DELETING_UNIT,
  SELECT_UNIT
} from '../actions/types.js';

const initialState = {
  units: [],
  selectedUnit: {},
  loading: false,
  adding: false,
  editing: false,
  deleting: false
}

const unitReducer = (state = initialState, action) => {
  switch(action.type) {
    case UNIT_ADDED:
      return {
        ...state,
        units: [
          ...state.units,
           action.payload
         ].sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ),
        selectedUnit: action.payload,
        adding: false
      }
    case UNIT_EDITED:
      return {
        ...state,
        units: [
          ...state.units.filter(unit => unit._id !== action.payload._id),
          action.payload
        ].sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ),
        selectedUnit: action.payload,
        editing: false
      }
    case UNIT_DELETED:
      return {
        ...state,
        selectedUnit: {},
        units: [
          ...state.units.filter(unit => unit._id !== action.payload)
        ].sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ),
        deleting: false
      }
    case LOADING_UNITS:
      return { ...state, loading: true }
    case GET_UNITS:
      return { ...state, loading: false, units: action.payload }
    case SELECT_UNIT:
      return { ...state, selectedUnit: action.payload }
    case TOGGLE_ADDING_UNIT:
      return { ...state, adding:   !state.adding }
    case TOGGLE_DELETING_UNIT:
      return { ...state, deleting: !state.deleting }
    case TOGGLE_EDITING_UNIT:
      return { ...state, editing:  !state.editing }
    default:
      return state;
  }
};

export default unitReducer;
