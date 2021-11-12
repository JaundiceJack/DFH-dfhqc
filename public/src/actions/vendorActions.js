// Import action types
import {
  GET_VENDORS, SELECT_VENDOR, VENDOR_ADDED, VENDOR_EDITED, VENDOR_DELETED,
  TOGGLE_ADDING_VENDOR, TOGGLE_EDITING_VENDOR, TOGGLE_DELETING_VENDOR,
} from './types';
// Import axios to handle http requests
import axios from 'axios';
// Import server actions: to report errors
import { handleError } from './msgActions';
// Import the server route
import server from './route';

// Obtain an array of vendors from the server and dispatch them to the redux state
export const getVendors = () => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Make request for vendor info
  axios.get(`${server}/api/vendors`, config)
  .then(res => { dispatch({ type: GET_VENDORS, payload: res.data }) })
  .catch(err => { handleError(err) });
}

// TODO: add authentication
// Take entries and add a new vendor to the database
export const addVendor = (vendor) => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Convert the new vendor to JSON for sending
  const newVendor = JSON.stringify(vendor);
  // Submit a post with the new vendor
  axios.post(`${server}/api/vendors/`, newVendor, config)
  .then(res => { dispatch({type: VENDOR_ADDED, payload: res.data}) })
  .catch(err => { handleError(err) });
}
export const editVendor = (vendor) => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Convert the new vendor to JSON for sending
  const editedVendor = JSON.stringify(vendor);
  // Submit a post with the new vendor
  axios.post(`${server}/api/vendors/${vendor._id}`, editedVendor, config)
  .then(res => { dispatch({type: VENDOR_EDITED, payload: res.data}) })
  .catch(err => { handleError(err) })
}
export const deleteVendor = (id) => dispatch => {
  const config = { headers: {"Content-type": "application/json"} };
  axios.delete(`${server}/api/vendors/${id}`, config)
  .then(res => { dispatch({ type: VENDOR_DELETED, payload: id })})
  .catch(err => { handleError(err) })
}

export const selectVendor = (vendor) => dispatch => dispatch({type: SELECT_VENDOR, payload: vendor});
export const toggleAdding = () => dispatch => dispatch({ type: TOGGLE_ADDING_VENDOR });
export const toggleDeleting = () => dispatch => dispatch({ type: TOGGLE_DELETING_VENDOR });
export const toggleEditing = () => dispatch => dispatch({ type: TOGGLE_EDITING_VENDOR });
