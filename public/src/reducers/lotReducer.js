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
  LOT_UNSAMPLED,
  TESTING_INDEX_SELECTED,
  TESTING_TOGGLE_TESTING,
  TESTING_TOGGLE_SAMPLING,
  TESTING_TOGGLE_DELETING,
  SHOW_ASSAY_SAMPLING,
  SHOW_ASSAY_TESTING,
  SHOW_ASSAY_DELETING,
  ASSAY_INDEX_SELECTED
} from '../actions/types.js';

const initialState = {
  rawLots:   [],
  blendLots: [],
  bulkLots:  [],
  fgLots:    [],
  otherLots: [],
  selectedLot: {},
  adding: false,  editing: false,   deleting: false,
  showRaws: true, showBlends: true, showBulks: true, showFgs: true, showOthers: true,
  showMT: true,   showNV: true,     showCT: true,
  currentYear:   new Date().getFullYear(),
  testing: {
    micro: {
      sampleIndex:  null, showSampling: false, showTesting:  false, showDeleting: false,
    },
    hm: {
      sampleIndex:  null, showSampling: false, showTesting:  false, showDeleting: false,
    },
    pesticide: {
      sampleIndex:  null, showSampling: false, showTesting:  false, showDeleting: false,
    },
    solvent: {
      sampleIndex:  null, showSampling: false, showTesting:  false, showDeleting: false,
    },
    rancidity: {
      sampleIndex:  null, showSampling: false, showTesting:  false, showDeleting: false,
    },
    assays: {
      currentAssay: null, showSampling: false, showTesting:  false, showDeleting: false,
      sampleIndices: [],
    },
    ids: {
      currentIdentity: null, showSampling: false, showTesting:  false, showDeleting: false,
      sampleIndices: [],
    }
  }
}

// Return the testing settings to their defaults (showing the most recent sample)
const resetTesting = (payload) => {
  return {
    micro: {
      sampleIndex: payload.testing.micro.length > 0 ? payload.testing.micro.length-1 : null,
      showSampling: false, showTesting: false, showDeleting: false,
    },
    hm: {
      sampleIndex: payload.testing.hm.length > 0 ? payload.testing.hm.length-1 : null,
      showSampling: false, showTesting: false, showDeleting: false,
    },
    assays: {
      currentAssay: null, showSampling: false, showTesting: false, showDeleting: false,
      sampleIndices: payload.testing.assay.length > 0 ?
        payload.testing.assay.map((assay, index) => {
          return assay.samples.length > 0 ?
            {assayId: assay.assay, index: assay.samples.length-1} :
            {assayId: assay.assay, index: null}
        }) : [],
    }
  }
}

// Empty out all testing states for a new lot
const clearTesting = (payload) => {
  return {
    micro: { sampleIndex: null, showSampling: false, showTesting: false, showDeleting: false, } ,
    hm: { sampleIndex: null, showSampling: false, showTesting: false, showDeleting: false },
    assays: {sampleIndices: [], currentAssay: null, showSampling: false, showTesting: false, showDeleting: false }
  }
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
        selectedLot: action.payload,
        testing: clearTesting(action.payload)
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
        selectedLot: action.payload,
        testing: resetTesting(action.payload)
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
        deleting: false,
        testing: clearTesting(action.payload)
      }
    case SELECT_LOT:
      return {
        ...state,
        selectedLot: action.payload,
        testing : resetTesting(action.payload)
      }
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
    case TESTING_INDEX_SELECTED:
      return { ...state,
        testing: { ...state.testing,
          [action.payload.type]: {
            sampleIndex: action.payload.index,
            showSampling: false, showTesting: false, showDeleting: false
      }}}
    case TESTING_TOGGLE_SAMPLING:
      return { ...state,
        testing: { ...state.testing,
          [action.payload.type]: { ...state.testing[action.payload.type],
            showSampling: !state.testing[action.payload.type].showSampling
      }}}
    case TESTING_TOGGLE_TESTING:
      return { ...state,
        testing: { ...state.testing,
          [action.payload.type]: { ...state.testing[action.payload.type],
            showTesting: !state.testing[action.payload.type].showTesting
      }}}
    case TESTING_TOGGLE_DELETING:
      return { ...state,
        testing: { ...state.testing,
          [action.payload.type]: { ...state.testing[action.payload.type],
            showDeleting: !state.testing[action.payload.type].showDeleting
      }}}
    case SHOW_ASSAY_SAMPLING:
      return { ...state,
        testing: { ...state.testing,
          assays: { ...state.testing.assays,
            showSampling: action.payload.showSampling,
            currentAssay: action.payload.currentAssay
      }}}
    case SHOW_ASSAY_TESTING:
      return { ...state,
        testing: { ...state.testing,
          assays: { ...state.testing.assays,
            showTesting: action.payload.showTesting,
            currentAssay: action.payload.currentAssay
      }}}
    case SHOW_ASSAY_DELETING:
      return { ...state,
        testing: { ...state.testing,
          assays: { ...state.testing.assays,
            showDeleting: action.payload.showDeleting,
            currentAssay: action.payload.currentAssay
      }}}
    case ASSAY_INDEX_SELECTED:
      return { ...state,
        testing: { ...state.testing,
          assays: {
            showSampling: false, showTesting: false, showDeleting: false,
            sampleIndices: [...state.testing.assays.sampleIndices.filter(s =>
              s.assayId === action.payload.assayId),
              {assayId: action.payload.assayId, index: action.payload.index}
            ],
      }}}
    default:
      return state;
  }
};



export default lotReducer;
