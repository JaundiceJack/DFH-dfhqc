import {
  GET_LOTS, LOT_ADDED, LOT_EDITED, LOT_DELETED, LOT_GET_REQUEST,
  LOT_ADD_REQUEST, LOT_EDIT_REQUEST, LOT_DELETE_REQUEST,
  LOT_ADD_FAIL, LOT_EDIT_FAIL, LOT_DELETE_FAIL, LOT_GET_FAIL,
  TOGGLE_ADDING_LOT, TOGGLE_EDITING_LOT, TOGGLE_DELETING_LOT,
  TOGGLE_RAW_LOTS, TOGGLE_BLEND_LOTS, TOGGLE_BULK_LOTS, TOGGLE_FG_LOTS, TOGGLE_OTHER_LOTS,
  TOGGLE_MT_LOTS, TOGGLE_NV_LOTS, TOGGLE_CT_LOTS,
  SELECT_LOT, INCREMENT_YEAR, DECREMENT_YEAR, LOT_PRIOR_SUCCESS
} from '../actions/types.js';

const initialState = {
  lots:   [],
  selectedLot: {},
  prior_lot: null,
  loading: false,
  error: null,
  adding: false,  editing: false,   deleting: false,
  showRaws: true, showBlends: true, showBulks: true, showFgs: true, showOthers: true,
  showMT: true,   showNV: true,     showCT: true,
  currentYear:   new Date().getFullYear(),
}

const lotReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOT_ADD_REQUEST:
    case LOT_EDIT_REQUEST:
    case LOT_DELETE_REQUEST:
    case LOT_GET_REQUEST: return { ...state, loading: true }
    case LOT_ADD_FAIL:
    case LOT_EDIT_FAIL:
    case LOT_DELETE_FAIL:
    case LOT_GET_FAIL: return { ...state, loading: false, error: action.payload }
    case GET_LOTS:
      return { ...state, loading: false, lots: action.payload }
    case LOT_ADDED:
      return { ...state,
        lots: [...state.lots, action.payload].sort((a, b) => {
          return (new Date(a.date_created) - new Date(b.date_created)) }),
        selectedLot: action.payload,
        loading: false
      }
    case LOT_EDITED:
      return { ...state,
        lots: [...state.lots.filter(lot => {
          return lot._id !== action.payload._id }), action.payload].sort((a, b) => {
            return Date(b.date_created) - Date(a.date_created) }),
        selectedLot: action.payload,
        loading: false
      }
    case LOT_DELETED:
      return { ...state,
        lots: action.payload,
        selectedLot: {},
        adding: false,
        editing: false,
        deleting: false,
        loading: false
      }
    case LOT_PRIOR_SUCCESS:
      return { ...state, prior_lot: action.payload, loading: false }
    case SELECT_LOT:
      return { ...state, selectedLot: action.payload, loading: false }
    case TOGGLE_ADDING_LOT:
      return { ...state, adding: !state.adding }
    case TOGGLE_DELETING_LOT:
      return { ...state, deleting: !state.deleting }
    case TOGGLE_EDITING_LOT:
      return { ...state, editing: !state.editing }
    case TOGGLE_RAW_LOTS:
      return { ...state, showRaws: !state.showRaws }
    case TOGGLE_BLEND_LOTS:
      return { ...state, showBlends: !state.showBlends }
    case TOGGLE_BULK_LOTS:
      return { ...state, showBulks: !state.showBulks }
    case TOGGLE_FG_LOTS:
      return { ...state, showFgs: !state.showFgs }
    case TOGGLE_OTHER_LOTS:
      return { ...state, showOthers: !state.showOthers }
    case TOGGLE_MT_LOTS:
      return { ...state, showMT: !state.showMT }
    case TOGGLE_NV_LOTS:
      return { ...state, showNV: !state.showNV }
    case TOGGLE_CT_LOTS:
      return { ...state, showCT: !state.showCT }
    case INCREMENT_YEAR:
      return { ...state, currentYear: state.currentYear + 1 }
    case DECREMENT_YEAR:
      return { ...state, currentYear: state.currentYear - 1 }
    default: return state;
  }
};

export default lotReducer;
