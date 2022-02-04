// Import action types
import {
  MANUFACTURER_LIST_REQUEST, MANUFACTURER_LIST_SUCCESS, MANUFACTURER_LIST_FAILURE,
  MANUFACTURER_GET_REQUEST, MANUFACTURER_GET_SUCCESS, MANUFACTURER_GET_FAILURE,
  MANUFACTURER_ADD_REQUEST, MANUFACTURER_ADD_SUCCESS, MANUFACTURER_ADD_FAILURE,
  MANUFACTURER_EDIT_REQUEST, MANUFACTURER_EDIT_SUCCESS, MANUFACTURER_EDIT_FAILURE,
  MANUFACTURER_DELETE_REQUEST, MANUFACTURER_DELETE_SUCCESS, MANUFACTURER_DELETE_FAILURE,
  MANUFACTURER_TOGGLE_ADDING, MANUFACTURER_TOGGLE_EDITING, MANUFACTURER_TOGGLE_DELETING,
  MANUFACTURER_DIRECT_SELECT } from './types';
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

// Obtain an array of manufacturers from the server and dispatch them to the redux state
export const getManufacturers = () => async (dispatch, getState) => {
  dispatch({ type: MANUFACTURER_LIST_REQUEST });
  try {
    const { data } = await axios.get('/api/manufacturers', tokenConfig(getState));
    dispatch({ type: MANUFACTURER_LIST_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: MANUFACTURER_LIST_FAILURE, payload: handleError(e) }) }
}

// Get an individual manufacturer's info and place it in the selectedManufacturer state
export const getManufacturer = id => async (dispatch, getState) => {
  dispatch({ type: MANUFACTURER_GET_REQUEST });
  try {
    const { data } = await axios.get(`/api/manufacturers/${id}`, tokenConfig(getState));
    dispatch({ type: MANUFACTURER_GET_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: MANUFACTURER_GET_FAILURE, payload: handleError(e) }) }
}

// Take entries and add a new manufacturer to the database
export const addManufacturer = manufacturer => async (dispatch, getState) => {
  dispatch({ type: MANUFACTURER_ADD_REQUEST });
  try {
    const newManufacturer = JSON.stringify(manufacturer);
    const { data } = await axios.post('/api/manufacturers', newManufacturer, tokenConfig(getState));
    dispatch({ type: MANUFACTURER_ADD_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: MANUFACTURER_ADD_FAILURE, payload: handleError(e) }) }
}

// Modify the selected manufacturer
export const editManufacturer = manufacturer => async (dispatch, getState) => {
  dispatch({ type: MANUFACTURER_EDIT_REQUEST });
  try {
    const editedManufacturer = JSON.stringify(manufacturer);
    const { data } = await axios.put(`/api/manufacturers/${manufacturer._id}`, editedManufacturer, tokenConfig(getState));
    dispatch({ type: MANUFACTURER_EDIT_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: MANUFACTURER_EDIT_FAILURE, payload: handleError(e) }) }
}

// Remove the selected manufacturer
export const deleteManufacturer = id => async (dispatch, getState) => {
  dispatch({ type: MANUFACTURER_DELETE_REQUEST });
  try {
    const { data } = await axios.delete(`/api/manufacturers/${id}`, tokenConfig(getState));
    dispatch({ type: MANUFACTURER_DELETE_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: MANUFACTURER_DELETE_FAILURE, payload: handleError(e) }) }
}

// Selection and toggles
export const selectManufacturer = manufacturer => dispatch => dispatch({type: MANUFACTURER_DIRECT_SELECT, payload: manufacturer});
export const toggleAdding = () => dispatch => dispatch({ type: MANUFACTURER_TOGGLE_ADDING });
export const toggleDeleting = () => dispatch => dispatch({ type: MANUFACTURER_TOGGLE_DELETING });
export const toggleEditing = () => dispatch => dispatch({ type: MANUFACTURER_TOGGLE_EDITING });
