// Import action types
import {
  FG_LIST_REQUEST, FG_LIST_SUCCESS, FG_LIST_FAILURE,
  FG_GET_REQUEST, FG_GET_SUCCESS, FG_GET_FAILURE,
  FG_ADD_REQUEST, FG_ADD_SUCCESS, FG_ADD_FAILURE,
  FG_EDIT_REQUEST, FG_EDIT_SUCCESS, FG_EDIT_FAILURE,
  FG_DELETE_REQUEST, FG_DELETE_SUCCESS, FG_DELETE_FAILURE,
  FG_TOGGLE_ADDING, FG_TOGGLE_EDITING, FG_TOGGLE_DELETING,
  FG_DIRECT_SELECT } from './types';
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

// Obtain an array of fgs from the server and dispatch them to the redux state
export const getFgs = () => async (dispatch, getState) => {
  dispatch({ type: FG_LIST_REQUEST });
  try {
    const { data } = await axios.get('/api/fgs', tokenConfig(getState));
    dispatch({ type: FG_LIST_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: FG_LIST_FAILURE, payload: handleError(e) }); }
}

// Get a single fg from it's id
export const getFg = id => async (dispatch, getState) => {
  dispatch({ type: FG_GET_REQUEST });
  try {
    const { data } = await axios.get(`/api/fgs/${id}`, tokenConfig(getState));
    dispatch({ type: FG_GET_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: FG_GET_FAILURE, payload: handleError(e) }) }
}

// Take entries and add a new fg to the database
export const addFg = fg => async (dispatch, getState) => {
  dispatch({ type: FG_ADD_REQUEST });
  try {
    const newFg = JSON.stringify(fg);
    const { data } = await axios.post('/api/fgs', newFg, tokenConfig(getState));
    dispatch({ type: FG_ADD_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: FG_ADD_FAILURE, payload: handleError(e) }); }
}

// Modify the selected fg
export const editFg = fg => async (dispatch, getState) => {
  dispatch({ type: FG_EDIT_REQUEST });
  try {
    const editedFg = JSON.stringify(fg);
    const { data } = await axios.put(`/api/fgs/${fg._id}`, editedFg, tokenConfig(getState));
    dispatch({ type: FG_EDIT_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: FG_EDIT_FAILURE, payload: handleError(e) }); }
}

// Remove the selected fg
export const deleteFg = id => async (dispatch, getState) => {
  dispatch({ type: FG_DELETE_REQUEST });
  try {
    const { data } = await axios.delete(`/api/fgs/${id}`, tokenConfig(getState));
    dispatch({ type: FG_DELETE_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: FG_DELETE_FAILURE, payload: handleError(e) }); }
}

// Selection and toggles
export const selectFg = fg => dispatch => dispatch({ type: FG_DIRECT_SELECT, payload: fg });
export const toggleAdding   = () => dispatch => dispatch({ type: FG_TOGGLE_ADDING });
export const toggleEditing  = () => dispatch => dispatch({ type: FG_TOGGLE_EDITING });
export const toggleDeleting = () => dispatch => dispatch({ type: FG_TOGGLE_DELETING });
