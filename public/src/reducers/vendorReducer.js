import {
  VENDOR_LIST_REQUEST, VENDOR_LIST_SUCCESS, VENDOR_LIST_FAILURE,
  VENDOR_GET_REQUEST, VENDOR_GET_SUCCESS, VENDOR_GET_FAILURE,
  VENDOR_ADD_REQUEST, VENDOR_ADD_SUCCESS, VENDOR_ADD_FAILURE,
  VENDOR_EDIT_REQUEST, VENDOR_EDIT_SUCCESS, VENDOR_EDIT_FAILURE,
  VENDOR_DELETE_REQUEST, VENDOR_DELETE_SUCCESS, VENDOR_DELETE_FAILURE,
  VENDOR_TOGGLE_ADDING, VENDOR_TOGGLE_EDITING, VENDOR_TOGGLE_DELETING,
  VENDOR_DIRECT_SELECT } from '../actions/types.js';

const initialState = {
  vendors: [],
  selectedVendor: {},
  loading: false,
  adding: false,
  editing: false,
  deleting: false,
  error: null
}

const vendorReducer = (state = initialState, action) => {
  switch(action.type) {
    case VENDOR_LIST_REQUEST:
    case VENDOR_GET_REQUEST:
    case VENDOR_ADD_REQUEST:
    case VENDOR_EDIT_REQUEST:
    case VENDOR_DELETE_REQUEST: return { ...state, loading: true }
    case VENDOR_LIST_FAILURE:
    case VENDOR_GET_FAILURE:
    case VENDOR_ADD_FAILURE:
    case VENDOR_EDIT_FAILURE:
    case VENDOR_DELETE_FAILURE: return { ...state, loading: false, error: action.payload }
    case VENDOR_LIST_SUCCESS:
      return { ...state, loading: false, vendors: action.payload.sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ) }
    case VENDOR_DIRECT_SELECT:
    case VENDOR_GET_SUCCESS:
      return { ...state, loading: false, selectedVendor: action.payload }
    case VENDOR_ADD_SUCCESS:
      return { ...state, loading: false, vendors: [...state.vendors, action.payload].sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ), selectedVendor: action.payload}
    case VENDOR_EDIT_SUCCESS:
      return { ...state, loading: false, selectedVendor: action.payload,
        vendors: [...state.vendors.filter(vendor => { return vendor._id !== action.payload._id }), action.payload].sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ), }
    case VENDOR_DELETE_SUCCESS:
      return { ...state, loading: false, adding: false, editing: false, deleting: false, selectedVendor: {},
        vendors: action.payload.sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 )  }
    case VENDOR_TOGGLE_ADDING:
      return { ...state, adding: !state.adding }
    case VENDOR_TOGGLE_DELETING:
      return { ...state, deleting: !state.deleting }
    case VENDOR_TOGGLE_EDITING:
      return { ...state, editing: !state.editing }
    default:
      return state;
  }
};
//.sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 )
export default vendorReducer;
