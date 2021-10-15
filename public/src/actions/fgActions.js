// Import action types
import {
  GET_FGS,
  SELECT_FG,
  FG_ADDED,
  FG_EDITED,
  FG_DELETED,
  TOGGLE_ADDING_FG,
  TOGGLE_EDITING_FG,
  TOGGLE_DELETING_FG,
   } from './types';
// Import axios to handle http requests
import axios from 'axios';
// Import server actions: to report errors
import { returnMessages } from './msgActions';
// Import the server route
import server from './route';

// Get a header with the token if available
const tokenConfig = getState => {
  const token = getState().auth.token;
  const config = { headers: {"Content-type": "application/json"} };
  if (token) config.headers["x-auth-token"] = token;
  return config;
}

// Obtain an array of fgs from the server and dispatch them to the redux state
export const getFgs = () => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Make request for fg info
  axios.get(`${server}/api/fgs`, config)
  .then(res => {
    dispatch({ type: GET_FGS, payload: res.data });
  })
  .catch(err => {
    dispatch(returnMessages(err.response.data, err.response.status));
  })
}

// TODO: add authentication
// Take entries and add a new fg to the database
export const addFg = (fg) => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Convert the new fg to JSON for sending
  const newFg = JSON.stringify(fg);
  // Submit a post with the new fg
  axios.post(`${server}/api/fgs/`, newFg, config)
  .then(res => { dispatch({type: FG_ADDED, payload: res.data}) })
  .catch(err => dispatch(returnMessages(err.response.data, err.response.status)))
}
export const editFg = (fg) => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Convert the new fg to JSON for sending
  const editedFg = JSON.stringify(fg);
  // Submit a post with the new fg
  axios.post(`${server}/api/fgs/${fg._id}`, editedFg, config)
  .then(res => { dispatch({type: FG_EDITED, payload: res.data}) })
  .catch(err => dispatch(returnMessages(err.response.data, err.response.status)))
}
export const deleteFg = (id) => dispatch => {
  const config = { headers: {"Content-type": "application/json"} };
  axios.delete(`${server}/api/fgs/${id}`, config)
  .then(res => { dispatch({ type: FG_DELETED, payload: id })})
  .catch(err => dispatch(returnMessages(err.response.data, err.response.status)))
}

export const selectFg = (fg) => dispatch => {
  dispatch({ type: SELECT_FG, payload: fg });
}

export const toggleAdding = () => dispatch => dispatch({ type: TOGGLE_ADDING_FG });
export const toggleDeleting = () => dispatch => dispatch({ type: TOGGLE_DELETING_FG });
export const toggleEditing = () => dispatch => dispatch({ type: TOGGLE_EDITING_FG });
