// Import action types
import {
  GET_BLENDS,
  SELECT_BLEND,
  BLEND_ADDED,
  BLEND_EDITED,
  BLEND_DELETED,
  TOGGLE_ADDING_BLEND,
  TOGGLE_EDITING_BLEND,
  TOGGLE_DELETING_BLEND,
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

// Obtain an array of blends from the server and dispatch them to the redux state
export const getBlends = () => (dispatch, getState) => {
  const config = tokenConfig(getState);
  axios.get(`${server}/api/blends`, config)
  .then(res => { dispatch({ type: GET_BLENDS, payload: res.data }) })
  .catch(err => { dispatch(handleError(err)) });
}
// Take entries and add a new blend to the database
export const addBlend = blend => (dispatch, getState) => {
  const config = tokenConfig(getState);
  const newBlend = JSON.stringify(blend);
  axios.post(`${server}/api/blends/`, newBlend, config)
  .then(res => { dispatch({ type: BLEND_ADDED, payload: res.data }) })
  .catch(err => { dispatch(handleError(err)) });
}
// Modify the selected blend
export const editBlend = blend => (dispatch, getState) => {
  const config = tokenConfig(getState);
  const editedBlend = JSON.stringify(blend);
  axios.post(`${server}/api/blends/${blend._id}`, editedBlend, config)
  .then(res => { dispatch({ type: BLEND_EDITED, payload: res.data }) })
  .catch(err => { dispatch(handleError(err)) });
}
export const deleteBlend = id => (dispatch, getState) => {
  const config = tokenConfig(getState);
  axios.delete(`${server}/api/blends/${id}`, config)
  .then(res => { dispatch({ type: BLEND_DELETED, payload: id })})
  .catch(err => { dispatch(handleError(err)) });
}

// Selection and toggles
export const selectBlend = blend => dispatch => { dispatch({ type: SELECT_BLEND, payload: blend }) }
export const toggleAdding   = () => dispatch => dispatch({ type: TOGGLE_ADDING_BLEND });
export const toggleDeleting = () => dispatch => dispatch({ type: TOGGLE_DELETING_BLEND });
export const toggleEditing  = () => dispatch => dispatch({ type: TOGGLE_EDITING_BLEND });
