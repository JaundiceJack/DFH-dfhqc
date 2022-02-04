import {
  LOADING_IDENTITIES,
  GET_IDENTITIES,
  IDENTITY_ADDED,
  IDENTITY_EDITED,
  IDENTITY_DELETED,
  TOGGLE_ADDING_IDENTITY,
  TOGGLE_EDITING_IDENTITY,
  TOGGLE_DELETING_IDENTITY,
  SELECT_IDENTITY
} from '../actions/types.js';

const initialState = {
  identities: [],
  selectedIdentity: {},
  loading: false,
  adding: false,
  editing: false,
  deleting: false
}

const identityReducer = (state = initialState, action) => {
  switch(action.type) {
    case IDENTITY_ADDED:
      return {
        ...state,
        identities: [
          ...state.identities,
           action.payload
         ].sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ),
        selectedIdentity: action.payload,
        adding: false
      }
    case IDENTITY_EDITED:
      return {
        ...state,
        identities: [
          ...state.identities.filter(identity => identity._id !== action.payload._id),
          action.payload
        ].sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ),
        selectedIdentity: action.payload,
        editing: false
      }
    case IDENTITY_DELETED:
      return {
        ...state,
        selectedIdentity: {},
        identities: [
          ...state.identities.filter(identity => identity._id !== action.payload)
        ].sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ),
        deleting: false
      }
    case LOADING_IDENTITIES:
      return { ...state, loading: true }
    case GET_IDENTITIES:
      return { ...state, loading: false, identities: action.payload.sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ) }
    case SELECT_IDENTITY:
      return { ...state, selectedIdentity: action.payload }
    case TOGGLE_ADDING_IDENTITY:
      return { ...state, adding:   !state.adding }
    case TOGGLE_DELETING_IDENTITY:
      return { ...state, deleting: !state.deleting }
    case TOGGLE_EDITING_IDENTITY:
      return { ...state, editing:  !state.editing }
    default:
      return state;
  }
};

export default identityReducer;
