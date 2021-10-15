import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  RESET_FAIL,
  RESET_VERIFIED,
  CHANGE_PAGE
} from '../actions/types'

const initialState = {
  user: null,
  isLoading: false,
  currentPage: 'home',
  genuineReset: false,
  isAuthenticated: null,
  token: window.localStorage.getItem('token'),
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case USER_LOADING: return { ...state, isLoading: true };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      window.localStorage.setItem('token', action.payload.token);
      return { ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        currentPage: 'manage'
      };
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
    case REGISTER_FAIL:
      window.localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    case CHANGE_PAGE:    return { ...state, currentPage: action.payload }
    case RESET_VERIFIED: return { ...state, genuineReset: true }
    case RESET_FAIL:     return { ...state, genuineReset: false, currentPage: 'login' }
    default: return state;
  }
};

export default authReducer;
