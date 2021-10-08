import {
  LOADING_ASSAYS,
  GET_ASSAYS,
  ASSAY_ADDED,
  ASSAY_EDITED,
  ASSAY_DELETED,
  TOGGLE_ADDING_ASSAY,
  TOGGLE_EDITING_ASSAY,
  TOGGLE_DELETING_ASSAY,
  SELECT_ASSAY
} from '../actions/types.js';

const initialState = {
  assays: [],
  selectedAssay: {},
  loading: false,
  adding: false,
  editing: false,
  deleting: false
}

const assayReducer = (state = initialState, action) => {
  switch(action.type) {
    case ASSAY_ADDED:
      return {
        ...state,
        assays: [
          ...state.assays,
           action.payload
         ].sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ),
        selectedAssay: action.payload,
        adding: false
      }
    case ASSAY_EDITED:
      return {
        ...state,
        assays: [
          ...state.assays.filter(assay => assay._id !== action.payload._id),
          action.payload
        ].sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ),
        selectedAssay: action.payload,
        editing: false
      }
    case ASSAY_DELETED:
      return {
        ...state,
        selectedAssay: {},
        assays: [
          ...state.assays.filter(assay => assay._id !== action.payload)
        ].sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ),
        deleting: false
      }
    case LOADING_ASSAYS:
      return { ...state, loading: true }
    case GET_ASSAYS:
      return { ...state, loading: false, assays: action.payload }
    case SELECT_ASSAY:
      return { ...state, selectedAssay: action.payload }
    case TOGGLE_ADDING_ASSAY:
      return { ...state, adding:   !state.adding }
    case TOGGLE_DELETING_ASSAY:
      return { ...state, deleting: !state.deleting }
    case TOGGLE_EDITING_ASSAY:
      return { ...state, editing:  !state.editing }
    default:
      return state;
  }
};

export default assayReducer;
