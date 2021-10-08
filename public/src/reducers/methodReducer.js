import {
  LOADING_METHODS,
  GET_METHODS,
  METHOD_ADDED,
  METHOD_EDITED,
  METHOD_DELETED,
  TOGGLE_ADDING_METHOD,
  TOGGLE_EDITING_METHOD,
  TOGGLE_DELETING_METHOD,
  SELECT_METHOD
} from '../actions/types.js';

const initialState = {
  methods: [],
  selectedMethod: {},
  loading: false,
  adding: false,
  editing: false,
  deleting: false
}

const methodReducer = (state = initialState, action) => {
  switch(action.type) {
    case METHOD_ADDED:
      return {
        ...state,
        methods: [
          ...state.methods,
           action.payload
         ].sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ),
        selectedMethod: action.payload,
        adding: false
      }
    case METHOD_EDITED:
      return {
        ...state,
        methods: [
          ...state.methods.filter(method => method._id !== action.payload._id),
          action.payload
        ].sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ),
        selectedMethod: action.payload,
        editing: false
      }
    case METHOD_DELETED:
      return {
        ...state,
        selectedMethod: {},
        methods: [
          ...state.methods.filter(method => method._id !== action.payload)
        ].sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ),
        deleting: false
      }
    case LOADING_METHODS:
      return { ...state, loading: true }
    case GET_METHODS:
      return { ...state, loading: false, methods: action.payload }
    case SELECT_METHOD:
      return { ...state, selectedMethod: action.payload }
    case TOGGLE_ADDING_METHOD:
      return { ...state, adding:   !state.adding }
    case TOGGLE_DELETING_METHOD:
      return { ...state, deleting: !state.deleting }
    case TOGGLE_EDITING_METHOD:
      return { ...state, editing:  !state.editing }
    default:
      return state;
  }
};

export default methodReducer;
