import {
  SAMPLE_LIST_REQUEST, SAMPLE_LIST_SUCCESS, SAMPLE_LIST_FAIL,
  SAMPLE_CREATE_REQUEST, SAMPLE_CREATE_SUCCESS, SAMPLE_CREATE_FAIL,
  SAMPLE_EDIT_REQUEST, SAMPLE_EDIT_SUCCESS, SAMPLE_EDIT_FAIL,
  SAMPLE_DELETE_REQUEST, SAMPLE_DELETE_SUCCESS, SAMPLE_DELETE_FAIL,
  SAMPLES_SHOW_TESTING, SAMPLES_SHOW_DELETING, SAMPLES_SHOW_SAMPLING,
  SAMPLE_PRIOR_SUCCESS
} from '../actions/types';

const initialState = {
  loading: false,
  error: null,
  tests: null,
  deleting: '',
  sampling: '',
  testing: '',
  prior_tests: null
}

const testingReducer = (state = initialState, action) => {
  switch(action.type) {
    case SAMPLE_LIST_REQUEST:
    case SAMPLE_CREATE_REQUEST:
    case SAMPLE_EDIT_REQUEST:
    case SAMPLE_DELETE_REQUEST:
     return { ...state, loading: true }
    case SAMPLE_LIST_FAIL:
    case SAMPLE_CREATE_FAIL:
    case SAMPLE_EDIT_FAIL:
    case SAMPLE_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload }
    case SAMPLE_LIST_SUCCESS:
    case SAMPLE_CREATE_SUCCESS:
    case SAMPLE_EDIT_SUCCESS:
    case SAMPLE_DELETE_SUCCESS:
      return { ...state, loading: false, tests: action.payload }
    case SAMPLE_PRIOR_SUCCESS:
      return { ...state, loading: false, prior_tests: action.payload }
    case SAMPLES_SHOW_TESTING:
      return { ...state, testing: action.payload, sampling: '', deleting: '' }
    case SAMPLES_SHOW_DELETING:
      return { ...state, deleting: action.payload, sampling: '', testing: '' }
    case SAMPLES_SHOW_SAMPLING:
      return { ...state, sampling: action.payload, deleting: '', testing: '' }
    default:
      return state
  }
}

export default testingReducer;
