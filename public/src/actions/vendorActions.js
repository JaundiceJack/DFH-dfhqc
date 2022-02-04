// Import action types
import {
  VENDOR_LIST_REQUEST, VENDOR_LIST_SUCCESS, VENDOR_LIST_FAILURE,
  VENDOR_GET_REQUEST, VENDOR_GET_SUCCESS, VENDOR_GET_FAILURE,
  VENDOR_ADD_REQUEST, VENDOR_ADD_SUCCESS, VENDOR_ADD_FAILURE,
  VENDOR_EDIT_REQUEST, VENDOR_EDIT_SUCCESS, VENDOR_EDIT_FAILURE,
  VENDOR_DELETE_REQUEST, VENDOR_DELETE_SUCCESS, VENDOR_DELETE_FAILURE,
  VENDOR_TOGGLE_ADDING, VENDOR_TOGGLE_EDITING, VENDOR_TOGGLE_DELETING,
  VENDOR_DIRECT_SELECT } from './types';
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

// Obtain an array of vendors from the server and dispatch them to the redux state
export const getVendors = () => async (dispatch, getState) => {
  dispatch({ type: VENDOR_LIST_REQUEST });
  try {
    const { data } = await axios.get('/api/vendors', tokenConfig(getState));
    dispatch({ type: VENDOR_LIST_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: VENDOR_LIST_FAILURE, payload: handleError(e) }) }
}

// Get an individual vendor's info and place it in the selectedVendor state
export const getVendor = id => async (dispatch, getState) => {
  dispatch({ type: VENDOR_GET_REQUEST });
  try {
    const { data } = await axios.get(`/api/vendors/${id}`, tokenConfig(getState));
    dispatch({ type: VENDOR_GET_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: VENDOR_GET_FAILURE, payload: handleError(e) }) }
}

// Take entries and add a new vendor to the database
export const addVendor = vendor => async (dispatch, getState) => {
  dispatch({ type: VENDOR_ADD_REQUEST });
  try {
    const newVendor = JSON.stringify(vendor);
    const { data } = await axios.post('/api/vendors', newVendor, tokenConfig(getState));
    dispatch({ type: VENDOR_ADD_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: VENDOR_ADD_FAILURE, payload: handleError(e) }) }
}

// Modify the selected vendor
export const editVendor = vendor => async (dispatch, getState) => {
  dispatch({ type: VENDOR_EDIT_REQUEST });
  try {
    const editedVendor = JSON.stringify(vendor);
    const { data } = await axios.put(`/api/vendors/${vendor._id}`, editedVendor, tokenConfig(getState));
    dispatch({ type: VENDOR_EDIT_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: VENDOR_EDIT_FAILURE, payload: handleError(e) }) }
}

// Remove the selected vendor
export const deleteVendor = id => async (dispatch, getState) => {
  dispatch({ type: VENDOR_DELETE_REQUEST });
  try {
    const { data } = await axios.delete(`/api/vendors/${id}`, tokenConfig(getState));
    dispatch({ type: VENDOR_DELETE_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: VENDOR_DELETE_FAILURE, payload: handleError(e) }) }
}

// Selection and toggles
export const selectVendor = vendor => dispatch => dispatch({type: VENDOR_DIRECT_SELECT, payload: vendor});
export const toggleAdding = () => dispatch => dispatch({ type: VENDOR_TOGGLE_ADDING });
export const toggleDeleting = () => dispatch => dispatch({ type: VENDOR_TOGGLE_DELETING });
export const toggleEditing = () => dispatch => dispatch({ type: VENDOR_TOGGLE_EDITING });
