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
import { returnMessages } from './msgActions';
// Import the server route
import server from './route';

// Obtain an array of blends from the server and dispatch them to the redux state
export const getBlends = () => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Make request for blend info
  axios.get(`${server}/api/blends`, config)
  .then(res => {
    dispatch({ type: GET_BLENDS, payload: res.data });
  })
  .catch(err => {
    dispatch(returnMessages(err.response.data, err.response.status));
  })
}

// TODO: add authentication
// Take entries and add a new blend to the database
export const addBlend = (blend) => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Convert the new blend to JSON for sending
  const newBlend = JSON.stringify(blend);
  // Submit a post with the new blend
  axios.post(`${server}/api/blends/`, newBlend, config)
  .then(res => { dispatch({type: BLEND_ADDED, payload: res.data}) })
  .catch(err => dispatch(returnMessages(err.response.data, err.response.status)))
}
export const editBlend = (blend) => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Convert the new blend to JSON for sending
  const editedBlend = JSON.stringify(blend);
  // Submit a post with the new blend
  axios.post(`${server}/api/blends/${blend._id}`, editedBlend, config)
  .then(res => { dispatch({type: BLEND_EDITED, payload: res.data}) })
  .catch(err => dispatch(returnMessages(err.response.data, err.response.status)))
}
export const deleteBlend = (id) => dispatch => {
  const config = { headers: {"Content-type": "application/json"} };
  axios.delete(`${server}/api/blends/${id}`, config)
  .then(res => { dispatch({ type: BLEND_DELETED, payload: id })})
  .catch(err => dispatch(returnMessages(err.response.data, err.response.status)))
}

export const selectBlend = (blend) => dispatch => {
  dispatch({ type: SELECT_BLEND, payload: blend });
}

export const toggleAdding = () => dispatch => dispatch({ type: TOGGLE_ADDING_BLEND });
export const toggleDeleting = () => dispatch => dispatch({ type: TOGGLE_DELETING_BLEND });
export const toggleEditing = () => dispatch => dispatch({ type: TOGGLE_EDITING_BLEND });
