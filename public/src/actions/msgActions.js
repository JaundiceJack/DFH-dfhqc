// Import action types
import { GET_MESSAGES, CLEAR_MESSAGES } from './types';

// Put any server/action messages into the current state
export const returnMessages = (msg, status, id = null) => {
  return {
    type: GET_MESSAGES,
    payload: { error: msg.error, warning: msg.warning, info: msg.info, status: status, id: id }
  }
}

export const handleError = (err, id=null) => {
  const errmsg = err.response ?
                 {error: err.response.data ? err.response.data.msg : "Error encountered"} :
                 {error: "Error encountered"};
  const errstatus = err.response ? err.response.status : null;
  returnMessages(errmsg, errstatus, id);
}

// Remove any messages from the current state
export const clearMessages = () => { return { type: CLEAR_MESSAGES } }
