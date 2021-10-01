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
import { returnMessages } from './msgActions';
// Import the server route
import server from './route';

// Obtain an array of bulks from the server and dispatch them to the redux state
export const getBulks = () => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Make request for bulk info
  axios.get(`${server}/api/bulks`, config)
  .then(res => {
    dispatch({ type: GET_BULKS, payload: res.data });
  })
  .catch(err => {
    dispatch(returnMessages(err.response.data, err.response.status));
  })
}

// TODO: add authentication
// Take entries and add a new bulk to the database
export const addBulk = (bulk) => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Convert the new bulk to JSON for sending
  const newBulk = JSON.stringify(bulk);
  // Submit a post with the new bulk
  axios.post(`${server}/api/bulks/`, newBulk, config)
  .then(res => { dispatch({type: BULK_ADDED, payload: res.data}) })
  .catch(err => dispatch(returnMessages(err.response.data, err.response.status)))
}
export const editBulk = (bulk) => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Convert the new bulk to JSON for sending
  const editedBulk = JSON.stringify(bulk);
  // Submit a post with the new bulk
  axios.post(`${server}/api/bulks/${bulk._id}`, editedBulk, config)
  .then(res => { dispatch({type: BULK_EDITED, payload: res.data}) })
  .catch(err => dispatch(returnMessages(err.response.data, err.response.status)))
}
export const deleteBulk = (id) => dispatch => {
  const config = { headers: {"Content-type": "application/json"} };
  axios.delete(`${server}/api/bulks/${id}`, config)
  .then(res => { dispatch({ type: BULK_DELETED, payload: id })})
  .catch(err => dispatch(returnMessages(err.response.data, err.response.status)))
}

export const selectBulk = (bulk) => dispatch => {
  dispatch({ type: SELECT_BULK, payload: bulk });
}

export const toggleAdding = () => dispatch => dispatch({ type: TOGGLE_ADDING_BULK });
export const toggleDeleting = () => dispatch => dispatch({ type: TOGGLE_DELETING_BULK });
export const toggleEditing = () => dispatch => dispatch({ type: TOGGLE_EDITING_BULK });
