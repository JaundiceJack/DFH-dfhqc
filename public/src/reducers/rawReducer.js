import {
  GET_RAWS,
  GET_OPTIONS,
  RAW_ADDED,
  RAW_EDITED,
  RAW_DELETED,
  TOGGLE_ADDING_RAW,
  TOGGLE_EDITING_RAW,
  TOGGLE_DELETING_RAW,
  SELECT_RAW
} from '../actions/types.js';

const initialState = {
  raws: [],
  selectedIndex: null,
  selectedRaw: {},
  adding: false,
  editing: false,
  deleting: false,
  assayNames: [],
  idNames: [],
  assayMethods: [],
  idMethods: [],
  units: []
}

const rawReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_RAWS:
      return {
        ...state,
        raws: action.payload
      }
    case GET_OPTIONS:
      return {
        ...state,
        assayNames: action.payload.assayNames,
        idNames: action.payload.idNames,
        assayMethods: action.payload.assayMethods,
        idMethods: action.payload.idMethods,
        units: action.payload.units,
      }
    case RAW_ADDED:
      return {
        ...state,
        raws: [...state.raws, action.payload],
        selectedRaw: action.payload,
        selectedIndex: null
      }
    case RAW_EDITED:
      return {
        ...state,
        raws: [
          ...state.raws.filter(raw => { return raw._id !== action.payload._id }),
          action.payload
        ],
        selectedRaw: action.payload,
        selectedIndex: null
      }
    case RAW_DELETED:
      return {
        ...state,
        selectedIndex: null,
        selectedRaw: {},
        raws: [state.raws.filter(raw => raw._id !== action.payload)],
        adding: false,
        editing: false,
        deleting: false
      }
    case SELECT_RAW:
      return {
        ...state,
        selectedIndex: action.payload,
        selectedRaw: state.raws[action.payload]
      }
    case TOGGLE_ADDING_RAW:
      return {
        ...state,
        adding: !state.adding
      }
    case TOGGLE_DELETING_RAW:
      return {
        ...state,
        deleting: !state.deleting
      }
    case TOGGLE_EDITING_RAW:
      return {
        ...state,
        editing: !state.editing
      }
    default:
      return state;
  }
};

export default rawReducer;
