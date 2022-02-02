// Import action types
import {
  BLEND_LIST_REQUEST, BLEND_LIST_SUCCESS, BLEND_LIST_FAILURE,
  BLEND_GET_REQUEST, BLEND_GET_SUCCESS, BLEND_GET_FAILURE,
  BLEND_ADD_REQUEST, BLEND_ADD_SUCCESS, BLEND_ADD_FAILURE,
  BLEND_EDIT_REQUEST, BLEND_EDIT_SUCCESS, BLEND_EDIT_FAILURE,
  BLEND_DELETE_REQUEST, BLEND_DELETE_SUCCESS, BLEND_DELETE_FAILURE,
  BLEND_TOGGLE_ADDING, BLEND_TOGGLE_EDITING, BLEND_TOGGLE_DELETING,
  BLEND_DIRECT_SELECT } from './types';
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
export const getBlends = () => async (dispatch, getState) => {
  dispatch({ type: BLEND_LIST_REQUEST });
  try {
    const { data } = await axios.get('/api/blends', tokenConfig(getState));
    dispatch({ type: BLEND_LIST_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: BLEND_LIST_FAILURE, payload: handleError(e) }); }
}

// Get a single blend from it's id
export const getBlend = id => async (dispatch, getState) => {
  dispatch({ type: BLEND_GET_REQUEST });
  try {
    const { data } = await axios.get(`/api/blends/${id}`, tokenConfig(getState));
    dispatch({ type: BLEND_GET_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: BLEND_GET_FAILURE, payload: handleError(e) }) }
}

// Take entries and add a new blend to the database
export const addBlend = blend => async (dispatch, getState) => {
  dispatch({ type: BLEND_ADD_REQUEST });
  try {
    const newBlend = JSON.stringify(blend);
    const { data } = await axios.post('/api/blends', newBlend, tokenConfig(getState));
    dispatch({ type: BLEND_ADD_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: BLEND_ADD_FAILURE, payload: handleError(e) }); }
}

// Modify the selected blend
export const editBlend = blend => async (dispatch, getState) => {
  dispatch({ type: BLEND_EDIT_REQUEST });
  try {
    const editedBlend = JSON.stringify(blend);
    const { data } = await axios.put(`/api/blends/${blend._id}`, editedBlend, tokenConfig(getState));
    dispatch({ type: BLEND_EDIT_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: BLEND_EDIT_FAILURE, payload: handleError(e) }); }
}

// Remove the selected blend
export const deleteBlend = id => async (dispatch, getState) => {
  dispatch({ type: BLEND_DELETE_REQUEST });
  try {
    const { data } = await axios.delete(`/api/blends/${id}`, tokenConfig(getState));
    dispatch({ type: BLEND_DELETE_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: BLEND_DELETE_FAILURE, payload: handleError(e) }); }
}

// Selection and toggles
export const selectBlend = blend => dispatch => dispatch({ type: BLEND_DIRECT_SELECT, payload: blend });
export const toggleAdding   = () => dispatch => dispatch({ type: BLEND_TOGGLE_ADDING });
export const toggleEditing  = () => dispatch => dispatch({ type: BLEND_TOGGLE_EDITING });
export const toggleDeleting = () => dispatch => dispatch({ type: BLEND_TOGGLE_DELETING });
