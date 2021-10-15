import {
  LOADING_VENDORS,
  GET_VENDORS,
  VENDOR_ADDED,
  VENDOR_EDITED,
  VENDOR_DELETED,
  TOGGLE_ADDING_VENDOR,
  TOGGLE_EDITING_VENDOR,
  TOGGLE_DELETING_VENDOR,
  SELECT_VENDOR
} from '../actions/types.js';

const initialState = {
  vendors: [],
  selectedVendor: {},
  loading: false,
  adding: false,
  editing: false,
  deleting: false
}

const vendorReducer = (state = initialState, action) => {
  switch(action.type) {
    case VENDOR_ADDED:
      return {
        ...state,
        vendors: [
          ...state.vendors,
           action.payload
         ].sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ),
        selectedVendor: action.payload,
        adding: false
      }
    case VENDOR_EDITED:
      return {
        ...state,
        vendors: [
          ...state.vendors.filter(vendor => vendor._id !== action.payload._id),
          action.payload
        ].sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ),
        selectedVendor: action.payload,
        editing: false
      }
    case VENDOR_DELETED:
      return {
        ...state,
        selectedVendor: {},
        vendors: [
          ...state.vendors.filter(vendor => vendor._id !== action.payload)
        ].sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ),
        deleting: false
      }
    case LOADING_VENDORS:
      return { ...state, loading: true }
    case GET_VENDORS:
      return { ...state, loading: false, vendors: action.payload }
    case SELECT_VENDOR:
      return { ...state, selectedVendor: action.payload }
    case TOGGLE_ADDING_VENDOR:
      return { ...state, adding:   !state.adding }
    case TOGGLE_DELETING_VENDOR:
      return { ...state, deleting: !state.deleting }
    case TOGGLE_EDITING_VENDOR:
      return { ...state, editing:  !state.editing }
    default:
      return state;
  }
};

export default vendorReducer;
