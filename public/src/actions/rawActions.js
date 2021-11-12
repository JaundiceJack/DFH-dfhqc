// Import action types
import {
  GET_RAWS, SELECT_RAW, RAW_ADDED, RAW_EDITED, RAW_DELETED,
  TOGGLE_ADDING_RAW, TOGGLE_EDITING_RAW, TOGGLE_DELETING_RAW,
} from './types';
// Import axios to handle http requests
import axios from 'axios';
// Import server actions: to report errors
import { handleError } from './msgActions';
// Import the server route
import server from './route';

// Get a header with the token if available
const tokenConfig = getState => {
  const token = getState().auth.token;
  const config = { headers: {"Content-type": "application/json"} };
  if (token) config.headers["x-auth-token"] = token;
  return config;
}

// Obtain an array of raws from the server and dispatch them to the redux state
export const getRaws = () => (dispatch, getState) => {
  const config = tokenConfig(getState);
  axios.get(`${server}/api/raws`, config)
  .then(res => { dispatch({ type: GET_RAWS, payload: res.data }) })
  .catch(err => { handleError(err) });
}
// Take entries and add a new raw to the database
export const addRaw = raw => (dispatch, getState) => {
  const config = tokenConfig(getState);
  const newRaw = JSON.stringify(raw);
  axios.post(`${server}/api/raws/`, newRaw, config)
  .then(res => { dispatch({type: RAW_ADDED, payload: res.data}) })
  .catch(err => { handleError(err) });
}
// Modify the selected raw
export const editRaw = raw => (dispatch, getState) => {
  const config = tokenConfig(getState);
  const editedRaw = JSON.stringify(raw);
  axios.post(`${server}/api/raws/${raw._id}`, editedRaw, config)
  .then(res => { dispatch({type: RAW_EDITED, payload: res.data}) })
  .catch(err => { handleError(err) });
}
// Remove the selected raw
export const deleteRaw = id => (dispatch, getState) => {
  const config = tokenConfig(getState);
  axios.delete(`${server}/api/raws/${id}`, config)
  .then(res => { dispatch({ type: RAW_DELETED, payload: id }) })
  .catch(err => { handleError(err) });
}

// Selection and toggles
export const selectRaw = raw => dispatch => dispatch({type: SELECT_RAW, payload: raw});
export const toggleAdding = () => dispatch => dispatch({ type: TOGGLE_ADDING_RAW });
export const toggleDeleting = () => dispatch => dispatch({ type: TOGGLE_DELETING_RAW });
export const toggleEditing = () => dispatch => dispatch({ type: TOGGLE_EDITING_RAW });
