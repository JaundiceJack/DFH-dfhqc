// Import action types
import {
  GET_MANUFACTURERS,
  SELECT_MANUFACTURER,
  MANUFACTURER_ADDED,
  MANUFACTURER_EDITED,
  MANUFACTURER_DELETED,
  TOGGLE_ADDING_MANUFACTURER,
  TOGGLE_EDITING_MANUFACTURER,
  TOGGLE_DELETING_MANUFACTURER,
   } from './types';
// Import axios to handle http requests
import axios from 'axios';
// Import server actions: to report errors
import { handleError } from './msgActions';
// Import the server route
import server from './route';

// Obtain an array of manufacturers from the server and dispatch them to the redux state
export const getManufacturers = () => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Make request for manufacturer info
  axios.get(`${server}/api/manufacturers`, config)
  .then(res => { dispatch({ type: GET_MANUFACTURERS, payload: res.data }) })
  .catch(err => { handleError(err) });
}

// TODO: add authentication
// Take entries and add a new manufacturer to the database
export const addManufacturer = (manufacturer) => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Convert the new manufacturer to JSON for sending
  const newManufacturer = JSON.stringify(manufacturer);
  // Submit a post with the new manufacturer
  axios.post(`${server}/api/manufacturers/`, newManufacturer, config)
  .then(res => { dispatch({type: MANUFACTURER_ADDED, payload: res.data}) })
  .catch(err => { handleError(err) });
}
export const editManufacturer = (manufacturer) => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Convert the new manufacturer to JSON for sending
  const editedManufacturer = JSON.stringify(manufacturer);
  // Submit a post with the new manufacturer
  axios.post(`${server}/api/manufacturers/${manufacturer._id}`, editedManufacturer, config)
  .then(res => { dispatch({type: MANUFACTURER_EDITED, payload: res.data}) })
  .catch(err => { handleError(err) })
}
export const deleteManufacturer = (id) => dispatch => {
  const config = { headers: {"Content-type": "application/json"} };
  axios.delete(`${server}/api/manufacturers/${id}`, config)
  .then(res => { dispatch({ type: MANUFACTURER_DELETED, payload: id })})
  .catch(err => { handleError(err) })
}

export const selectManufacturer = manufacturer => dispatch => dispatch({type: SELECT_MANUFACTURER, payload: manufacturer});
export const toggleAdding = () => dispatch => dispatch({ type: TOGGLE_ADDING_MANUFACTURER });
export const toggleDeleting = () => dispatch => dispatch({ type: TOGGLE_DELETING_MANUFACTURER });
export const toggleEditing = () => dispatch => dispatch({ type: TOGGLE_EDITING_MANUFACTURER });
