import {
  LAB_LIST_REQUEST,   LAB_LIST_SUCCESS,   LAB_LIST_FAILURE,
  LAB_GET_REQUEST,    LAB_GET_SUCCESS,    LAB_GET_FAILURE,
  LAB_ADD_REQUEST,    LAB_ADD_SUCCESS,    LAB_ADD_FAILURE,
  LAB_EDIT_REQUEST,   LAB_EDIT_SUCCESS,   LAB_EDIT_FAILURE,
  LAB_DELETE_REQUEST, LAB_DELETE_SUCCESS, LAB_DELETE_FAILURE,
  LAB_TOGGLE_ADD,     LAB_TOGGLE_EDIT,    LAB_TOGGLE_DELETE,
  LAB_SELECT } from '../actions/types.js';

const initialState = {
  labs: [],
  selectedLab: {},
  adding: false,
  editing: false,
  deleting: false,
  loading: false,
  error: null
}

const labReducer = (state = initialState, action) => {
  switch(action.type) {
    case LAB_LIST_SUCCESS:   return { ...state,
      labs: action.payload.sort((a, b) => { return b.name[0] < a.name[0] }),
      loading: false
    }
    case LAB_GET_SUCCESS: return { ...state,
      selectedLab: action.payload,
      loading: false
    }
    case LAB_ADD_SUCCESS: return { ...state,
      labs: [...state.labs, action.payload].sort((a, b) => { return b.name[0] < a.name[0] }),
      selectedLab: action.payload,
      loading: false
    }
    case LAB_EDIT_SUCCESS: return { ...state,
      labs: [
        ...state.labs.filter(lab => { return lab._id !== action.payload._id }),
        action.payload
      ].sort((a, b) => { return b.name[0] < a.name[0] }),
      selectedLab: action.payload,
      loading: false
    }
    case LAB_DELETE_SUCCESS: return { ...state,
      selectedLab: {},
      labs: [...state.labs.filter(lab => lab._id !== action.payload)],
      adding: false,
      editing: false,
      deleting: false,
      loading: false
    }
    case LAB_SELECT:        return { ...state, selectedLab: action.payload }
    case LAB_TOGGLE_ADD:    return { ...state, adding: !state.adding }
    case LAB_TOGGLE_DELETE: return { ...state, deleting: !state.deleting }
    case LAB_TOGGLE_EDIT:   return { ...state, editing: !state.editing }
    case LAB_LIST_FAILURE:
    case LAB_GET_FAILURE:
    case LAB_ADD_FAILURE:
    case LAB_EDIT_FAILURE:
    case LAB_DELETE_FAILURE: return { ...state, loading: false, error: action.payload }
    case LAB_LIST_REQUEST:
    case LAB_GET_REQUEST:
    case LAB_ADD_REQUEST:
    case LAB_EDIT_REQUEST:
    case LAB_DELETE_REQUEST: return { ...state, loading: true }
    default: return state;
  }
};

export default labReducer;
