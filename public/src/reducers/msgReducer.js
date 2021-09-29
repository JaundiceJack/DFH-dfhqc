import {
  GET_MESSAGES,
  CLEAR_MESSAGES
} from '../actions/types.js';

const initialState = {
  error: "",
  warning: "",
  info: "",
  status: null,
  id:  null,
}

const msgReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_MESSAGES:
      return {
        error:   action.payload.error,
        warning: action.payload.warning,
        info:    action.payload.info,
        status:  action.payload.status,
        id:      action.payload.id
      }
    case CLEAR_MESSAGES:
      return {
        error: "",
        warning: "",
        info: "",
        status: null,
        id:     null
      }
    default:
      return state;
  }
};

export default msgReducer;
