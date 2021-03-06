// Import action types
import { GET_MESSAGES, CLEAR_MESSAGES } from './types';

// Put any server/action messages into the current state
export const returnMessages = (msg, status) => dispatch => {
  dispatch({
    type: GET_MESSAGES,
    payload: { error: msg.error, warning: msg.warning, info: msg.info, status: status }
  });
}

export const handleError = (err) => {
  const errmsg = err.response ?
    {error: err.response.data ? err.response.data.msg : "Error encountered"} :
    {error: "Error encountered"};
  const errstatus = err.response ? err.response.status : null;
  returnMessages(errmsg, errstatus);
}

// Remove any messages from the current state
export const clearMessages = () => { return { type: CLEAR_MESSAGES } }
