import {
  GET_LOTS,
  LOT_ADDED,
  LOT_EDITED,
  LOT_DELETED,
  TOGGLE_ADDING_LOT,
  TOGGLE_EDITING_LOT,
  TOGGLE_DELETING_LOT,
  TOGGLE_RAW_LOTS,
  TOGGLE_BLEND_LOTS,
  TOGGLE_BULK_LOTS,
  TOGGLE_FG_LOTS,
  TOGGLE_OTHER_LOTS,
  TOGGLE_MT_LOTS,
  TOGGLE_NV_LOTS,
  TOGGLE_CT_LOTS,
  SELECT_LOT,
  INCREMENT_YEAR,
  DECREMENT_YEAR,
  LOT_SAMPLED,
  LOT_UNSAMPLED
} from '../actions/types.js';


// thisll be complex
// on get, load each of the types of lots into their arrays
// don't combine them here,
// do that at the component level,
// but do store the visibility vars here

const initialState = {
  rawLots:   [],
  blendLots: [],
  bulkLots:  [],
  fgLots:    [],
  otherLots: [],
  selectedLot: {},
  adding:     false,
  editing:    false,
  deleting:   false,
  showRaws:   true,
  showBlends: true,
  showBulks:  true,
  showFgs:    true,
  showOthers: true,
  showMT:     true,
  showNV:     true,
  showCT:     true,
  currentYear:   new Date().getFullYear()
}

const lotReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_LOTS:
      return {
        ...state,
        rawLots:   action.payload.raws,
        blendLots: action.payload.blends,
        bulkLots:  action.payload.bulks,
        fgLots:    action.payload.fgs,
        otherLots: action.payload.others
      }
    case LOT_ADDED:
      return {
        ...state,
        rawLots:     action.payload.item_type === 'raw'   ? [...state.rawLots,   action.payload] : state.rawLots,
        blendLots:   action.payload.item_type === 'blend' ? [...state.blendLots, action.payload] : state.blendLots,
        bulkLots:    action.payload.item_type === 'bulk'  ? [...state.bulkLots,  action.payload] : state.bulkLots,
        fgLots:      action.payload.item_type === 'fg'    ? [...state.fgLots,    action.payload] : state.fgLots,
        otherLots:   action.payload.item_type === 'other' ? [...state.otherLots, action.payload] : state.otherLots,
        selectedLot: action.payload
      }
    case LOT_SAMPLED:
    case LOT_UNSAMPLED:
    case LOT_EDITED:
      return {
        ...state,
        rawLots:   action.payload.item_type === 'raw'   ? [...state.rawLots.filter(lot => { return lot._id !== action.payload._id }), action.payload].sort((a, b) => { return Date(b.date_created) - Date(a.date_created) }) : state.rawLots,
        blendLots: action.payload.item_type === 'blend' ? [...state.blendLots.filter(lot => { return lot._id !== action.payload._id }), action.payload].sort((a, b) => { return Date(b.date_created) - Date(a.date_created) }) : state.blendLots,
        bulkLots:  action.payload.item_type === 'bulk'  ? [...state.bulkLots.filter(lot => { return lot._id !== action.payload._id }), action.payload].sort((a, b) => { return Date(b.date_created) - Date(a.date_created) }) : state.bulkLots,
        fgLots:    action.payload.item_type === 'fg'    ? [...state.fgLots.filter(lot => { return lot._id !== action.payload._id }), action.payload].sort((a, b) => { return Date(b.date_created) - Date(a.date_created) }) : state.fgLots,
        otherLots: action.payload.item_type === 'other' ? [...state.otherLots.filter(lot => { return lot._id !== action.payload._id }), action.payload].sort((a, b) => { return Date(b.date_created) - Date(a.date_created) }) : state.otherLots,
        selectedLot: action.payload
      }
    case LOT_DELETED:
      return {
        ...state,
        rawLots:     action.payload.item_type === 'raw'   ? [...state.rawLots.filter(  lot => lot._id !== action.payload._id)] : state.rawLots,
        blendLots:   action.payload.item_type === 'blend' ? [...state.blendLots.filter(lot => lot._id !== action.payload._id)] : state.blendLots,
        bulkLots:    action.payload.item_type === 'bulk'  ? [...state.bulkLots.filter( lot => lot._id !== action.payload._id)] : state.bulkLots,
        fgLots:      action.payload.item_type === 'fg'    ? [...state.fgLots.filter(   lot => lot._id !== action.payload._id)] : state.fgLots,
        otherLots:   action.payload.item_type === 'other' ? [...state.otherLots.filter(lot => lot._id !== action.payload._id)] : state.otherLots,
        selectedLot: {},
        adding: false,
        editing: false,
        deleting: false
      }
    case SELECT_LOT:
      return {
        ...state,
        selectedLot: action.payload
      }
    case TOGGLE_ADDING_LOT:
      return {
        ...state,
        adding: !state.adding
      }
    case TOGGLE_DELETING_LOT:
      return {
        ...state,
        deleting: !state.deleting
      }
    case TOGGLE_EDITING_LOT:
      return {
        ...state,
        editing: !state.editing
      }
    case TOGGLE_RAW_LOTS:
      return {
        ...state,
        showRaws: !state.showRaws
      }
    case TOGGLE_BLEND_LOTS:
      return {
        ...state,
        showBlends: !state.showBlends
      }
    case TOGGLE_BULK_LOTS:
      return {
        ...state,
        showBulks: !state.showBulks
      }
    case TOGGLE_FG_LOTS:
      return {
        ...state,
        showFgs: !state.showFgs
      }
    case TOGGLE_OTHER_LOTS:
      return {
        ...state,
        showOthers: !state.showOthers
      }
    case TOGGLE_MT_LOTS:
      return {
        ...state,
        showMT: !state.showMT
      }
    case TOGGLE_NV_LOTS:
      return {
        ...state,
        showNV: !state.showNV
      }
    case TOGGLE_CT_LOTS:
      return {
        ...state,
        showCT: !state.showCT
      }
    case INCREMENT_YEAR:
      return {
        ...state,
        currentYear: state.currentYear + 1
      }
    case DECREMENT_YEAR:
      return {
        ...state,
        currentYear: state.currentYear - 1
      }
    default:
      return state;
  }
};

export default lotReducer;
