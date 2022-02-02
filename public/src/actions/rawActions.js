// Import action types
import {
  RAW_LIST_REQUEST,    RAW_LIST_SUCCESS,    RAW_LIST_FAILURE,
  RAW_GET_REQUEST,     RAW_GET_SUCCESS,     RAW_GET_FAILURE,
  RAW_ADD_REQUEST,     RAW_ADD_SUCCESS,     RAW_ADD_FAILURE,
  RAW_EDIT_REQUEST,    RAW_EDIT_SUCCESS,    RAW_EDIT_FAILURE,
  RAW_DELETE_REQUEST,  RAW_DELETE_SUCCESS,  RAW_DELETE_FAILURE,
  RAW_TOGGLE_ADDING,   RAW_TOGGLE_EDITING,  RAW_TOGGLE_DELETING,
  RAW_DIRECT_SELECT } from './types';
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
export const getRaws = () => async (dispatch, getState) => {
  dispatch({ type: RAW_LIST_REQUEST });
  try {
    const { data } = await axios.get('/api/raws', tokenConfig(getState));
    dispatch({ type: RAW_LIST_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: RAW_LIST_FAILURE, payload: handleError(e) }) }
}

// Get an individual raw's info and place it in the selectedRaw state
export const getRaw = id => async (dispatch, getState) => {
  dispatch({ type: RAW_GET_REQUEST });
  try {
    const { data } = await axios.get(`/api/raws/${id}`, tokenConfig(getState));
    dispatch({ type: RAW_GET_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: RAW_GET_FAILURE, payload: handleError(e) }) }
}

// Take entries and add a new raw to the database
export const addRaw = raw => async (dispatch, getState) => {
  dispatch({ type: RAW_ADD_REQUEST });
  try {
    const newRaw = JSON.stringify(raw);
    const { data } = await axios.post('/api/raws', newRaw, tokenConfig(getState));
    dispatch({ type: RAW_ADD_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: RAW_ADD_FAILURE, payload: handleError(e) }) }
}

// Modify the selected raw
export const editRaw = raw => async (dispatch, getState) => {
  dispatch({ type: RAW_EDIT_REQUEST });
  try {
    const editedRaw = JSON.stringify(raw);
    const { data } = await axios.put(`/api/raws/${raw._id}`, editedRaw, tokenConfig(getState));
    dispatch({ type: RAW_EDIT_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: RAW_EDIT_FAILURE, payload: handleError(e) }) }
}

// Remove the selected raw
export const deleteRaw = id => async (dispatch, getState) => {
  dispatch({ type: RAW_DELETE_REQUEST });
  try {
    const { data } = await axios.delete(`/api/raws/${id}`, tokenConfig(getState));
    dispatch({ type: RAW_DELETE_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: RAW_DELETE_FAILURE, payload: handleError(e) }) }
}

// Selection and toggles
export const selectRaw = raw => dispatch => dispatch({type: RAW_DIRECT_SELECT, payload: raw});
export const toggleAdding = () => dispatch => dispatch({ type: RAW_TOGGLE_ADDING });
export const toggleDeleting = () => dispatch => dispatch({ type: RAW_TOGGLE_DELETING });
export const toggleEditing = () => dispatch => dispatch({ type: RAW_TOGGLE_EDITING });
