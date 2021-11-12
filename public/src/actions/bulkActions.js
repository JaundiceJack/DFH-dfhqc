// Import action types
import {
  GET_BULKS,
  SELECT_BULK,
  BULK_ADDED,
  BULK_EDITED,
  BULK_DELETED,
  TOGGLE_ADDING_BULK,
  TOGGLE_EDITING_BULK,
  TOGGLE_DELETING_BULK,
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

// Obtain an array of bulks from the server and dispatch them to the redux state
export const getBulks = () => (dispatch, getState) => {
  const config = tokenConfig(getState);
  axios.get(`${server}/api/bulks`, config)
  .then(res => { dispatch({ type: GET_BULKS, payload: res.data }) })
  .catch(err => { handleError(err) });
}
// Take entries and add a new bulk to the database
export const addBulk = bulk => (dispatch, getState) => {
  const config = tokenConfig(getState);
  const newBulk = JSON.stringify(bulk);
  axios.post(`${server}/api/bulks/`, newBulk, config)
  .then(res => { dispatch({ type: BULK_ADDED, payload: res.data }) })
  .catch(err => { handleError(err) });
}
// Modify the selected bulk
export const editBulk = bulk => (dispatch, getState) => {
  const config = tokenConfig(getState);
  const editedBulk = JSON.stringify(bulk);
  axios.post(`${server}/api/bulks/${bulk._id}`, editedBulk, config)
  .then(res => { dispatch({ type: BULK_EDITED, payload: res.data }) })
  .catch(err => { handleError(err) });
}
// Remove the selected bulk
export const deleteBulk = id => (dispatch, getState) => {
  const config = tokenConfig(getState);
  axios.delete(`${server}/api/bulks/${id}`, config)
  .then(res => { dispatch({ type: BULK_DELETED, payload: id }) })
  .catch(err => { handleError(err) });
}

// Selection and toggles
export const selectBulk = bulk   => dispatch => dispatch({ type: SELECT_BULK, payload: bulk }) 
export const toggleAdding   = () => dispatch => dispatch({ type: TOGGLE_ADDING_BULK });
export const toggleDeleting = () => dispatch => dispatch({ type: TOGGLE_DELETING_BULK });
export const toggleEditing  = () => dispatch => dispatch({ type: TOGGLE_EDITING_BULK });
