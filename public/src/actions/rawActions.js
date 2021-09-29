// Import action types
import {
  GET_RAWS,
  GET_OPTIONS,
  SELECT_RAW,
  RAW_ADDED,
  RAW_EDITED,
  RAW_DELETED,
  TOGGLE_ADDING_RAW,
  TOGGLE_EDITING_RAW,
  TOGGLE_DELETING_RAW,
   } from './types';
// Import axios to handle http requests
import axios from 'axios';
// Import server actions: to report errors
import { returnMessages } from './msgActions';
// Import the server route
import server from './route';

// Obtain an array of raws from the server and dispatch them to the redux state
export const getRaws = () => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Make request for raw info
  axios.get(`${server}/api/raws`, config)
  .then(res => {
    dispatch({ type: GET_RAWS, payload: res.data });
  })
  .catch(err => {
    dispatch(returnMessages(err.response.data, err.response.status));
  })
}

// Get the list of assay & id names, methods, and units
export const getOptions = () => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Make request for raw info
  axios.get(`${server}/api/raws/options`, config)
  .then(res => {
    dispatch({ type: GET_OPTIONS, payload: res.data });
  })
  .catch(err => {
    dispatch(returnMessages(err.response.data, err.response.status));
  })
}

// TODO: add authentication
// Take entries and add a new raw to the database
export const addRaw = (raw) => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Convert the new raw to JSON for sending
  const newRaw = JSON.stringify(raw);
  // Submit a post with the new raw
  axios.post(`${server}/api/raws/`, newRaw, config)
  .then(res => { dispatch({type: RAW_ADDED, payload: res.data}) })
  .catch(err => dispatch(returnMessages(err.response.data, err.response.status)))
}
export const editRaw = (raw) => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Convert the new raw to JSON for sending
  const editedRaw = JSON.stringify(raw);
  // Submit a post with the new raw
  axios.post(`${server}/api/raws/${raw._id}`, editedRaw, config)
  .then(res => { dispatch({type: RAW_EDITED, payload: res.data}) })
  .catch(err => dispatch(returnMessages(err.response.data, err.response.status)))
}
export const deleteRaw = (id) => dispatch => {
  const config = { headers: {"Content-type": "application/json"} };
  axios.delete(`${server}/api/raws/${id}`, config)
  .then(res => { dispatch({ type: RAW_DELETED, payload: id })})
  .catch(err => dispatch(returnMessages(err.response.data, err.response.status)))
}

export const selectRaw = (index) => dispatch => {
  dispatch({type: SELECT_RAW, payload: index});
}

export const toggleAdding = () => dispatch => dispatch({ type: TOGGLE_ADDING_RAW });
export const toggleDeleting = () => dispatch => dispatch({ type: TOGGLE_DELETING_RAW });
export const toggleEditing = () => dispatch => dispatch({ type: TOGGLE_EDITING_RAW });
