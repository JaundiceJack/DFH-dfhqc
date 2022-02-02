// Import action types
import {
  BULK_LIST_REQUEST, BULK_LIST_SUCCESS, BULK_LIST_FAILURE,
  BULK_GET_REQUEST, BULK_GET_SUCCESS, BULK_GET_FAILURE,
  BULK_ADD_REQUEST, BULK_ADD_SUCCESS, BULK_ADD_FAILURE,
  BULK_EDIT_REQUEST, BULK_EDIT_SUCCESS, BULK_EDIT_FAILURE,
  BULK_DELETE_REQUEST, BULK_DELETE_SUCCESS, BULK_DELETE_FAILURE,
  BULK_TOGGLE_ADDING, BULK_TOGGLE_EDITING, BULK_TOGGLE_DELETING,
  BULK_DIRECT_SELECT } from './types';
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
export const getBulks = () => async (dispatch, getState) => {
  dispatch({ type: BULK_LIST_REQUEST });
  try {
    const { data } = await axios.get('/api/bulks', tokenConfig(getState));
    dispatch({ type: BULK_LIST_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: BULK_LIST_FAILURE, payload: handleError(e) }); }
}

// Get a single bulk from it's id
export const getBulk = id => async (dispatch, getState) => {
  dispatch({ type: BULK_GET_REQUEST });
  try {
    const { data } = await axios.get(`/api/bulks/${id}`, tokenConfig(getState));
    dispatch({ type: BULK_GET_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: BULK_GET_FAILURE, payload: handleError(e) }) }
}

// Take entries and add a new bulk to the database
export const addBulk = bulk => async (dispatch, getState) => {
  dispatch({ type: BULK_ADD_REQUEST });
  try {
    const newBulk = JSON.stringify(bulk);
    const { data } = await axios.post('/api/bulks', newBulk, tokenConfig(getState));
    dispatch({ type: BULK_ADD_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: BULK_ADD_FAILURE, payload: handleError(e) }); }
}

// Modify the selected bulk
export const editBulk = bulk => async (dispatch, getState) => {
  dispatch({ type: BULK_EDIT_REQUEST });
  try {
    const editedBulk = JSON.stringify(bulk);
    const { data } = await axios.put(`/api/bulks/${bulk._id}`, editedBulk, tokenConfig(getState));
    dispatch({ type: BULK_EDIT_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: BULK_EDIT_FAILURE, payload: handleError(e) }); }
}

// Remove the selected bulk
export const deleteBulk = id => async (dispatch, getState) => {
  dispatch({ type: BULK_DELETE_REQUEST });
  try {
    const { data } = await axios.delete(`/api/bulks/${id}`, tokenConfig(getState));
    dispatch({ type: BULK_DELETE_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: BULK_DELETE_FAILURE, payload: handleError(e) }); }
}

// Selection and toggles
export const selectBulk = bulk => dispatch => dispatch({ type: BULK_DIRECT_SELECT, payload: bulk });
export const toggleAdding   = () => dispatch => dispatch({ type: BULK_TOGGLE_ADDING });
export const toggleEditing  = () => dispatch => dispatch({ type: BULK_TOGGLE_EDITING });
export const toggleDeleting = () => dispatch => dispatch({ type: BULK_TOGGLE_DELETING });
