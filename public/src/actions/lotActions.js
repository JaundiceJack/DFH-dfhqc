// Import action types
import {
  GET_LOTS,
  GET_OPTIONS,
  SELECT_LOT,
  LOT_ADDED,
  LOT_EDITED,
  LOT_DELETED,
  TOGGLE_ADDING_LOT,
  TOGGLE_EDITING_LOT,
  TOGGLE_DELETING_LOT,
   } from './types';
// Import axios to handle http requests
import axios from 'axios';
// Import server actions: to report errors
import { returnMessages } from './msgActions';
// Import the server route
import server from './route';

// Obtain an array of lots from the server and dispatch them to the redux state
export const getLots = () => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Make request for lot info
  axios.get(`${server}/api/lots`, config)
  .then(res => {
    dispatch({ type: GET_LOTS, payload: res.data });
  })
  .catch(err => {
    dispatch(returnMessages(err.response.data, err.response.status));
  })
}

// Get the list of assay & id names, methods, and units
export const getOptions = () => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Make request for lot info
  axios.get(`${server}/api/lots/options`, config)
  .then(res => {
    dispatch({ type: GET_OPTIONS, payload: res.data });
  })
  .catch(err => {
    dispatch(returnMessages(err.response.data, err.response.status));
  })
}

// TODO: add authentication
// Take entries and add a new lot to the database
export const addLot = (lot) => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Convert the new lot to JSON for sending
  const newLot = JSON.stringify(lot);
  // Submit a post with the new lot
  axios.post(`${server}/api/lots/`, newLot, config)
  .then(res => { dispatch({type: LOT_ADDED, payload: res.data}) })
  .catch(err => dispatch(returnMessages(err.response.data, err.response.status)))
}
export const editLot = (lot) => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Convert the new lot to JSON for sending
  const editedLot = JSON.stringify(lot);
  // Submit a post with the new lot
  axios.post(`${server}/api/lots/${lot._id}`, editedLot, config)
  .then(res => { dispatch({type: LOT_EDITED, payload: res.data}) })
  .catch(err => dispatch(returnMessages(err.response.data, err.response.status)))
}
export const deleteLot = (id) => dispatch => {
  const config = { headers: {"Content-type": "application/json"} };
  axios.delete(`${server}/api/lots/${id}`, config)
  .then(res => { dispatch({ type: LOT_DELETED, payload: id })})
  .catch(err => dispatch(returnMessages(err.response.data, err.response.status)))
}

export const selectLot = (index) => dispatch => {
  dispatch({type: SELECT_LOT, payload: index});
}

export const toggleAdding = () => dispatch => dispatch({ type: TOGGLE_ADDING_LOT });
export const toggleDeleting = () => dispatch => dispatch({ type: TOGGLE_DELETING_LOT });
export const toggleEditing = () => dispatch => dispatch({ type: TOGGLE_EDITING_LOT });
