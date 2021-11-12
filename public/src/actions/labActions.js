// Import action types
import {
  GET_LABS,
  SELECT_LAB,
  LAB_ADDED,
  LAB_EDITED,
  LAB_DELETED,
  TOGGLE_ADDING_LAB,
  TOGGLE_EDITING_LAB,
  TOGGLE_DELETING_LAB,
   } from './types';
// Import axios to handle http requests
import axios from 'axios';
// Import server actions: to report errors
import { handleError } from './msgActions';
// Import the server route
import server from './route';

// Obtain an array of labs from the server and dispatch them to the redux state
export const getLabs = () => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Make request for lab info
  axios.get(`${server}/api/labs`, config)
  .then(res => { dispatch({ type: GET_LABS, payload: res.data }); })
  .catch(err => { handleError(err); });
}

// TODO: add authentication
// Take entries and add a new lab to the database
export const addLab = (lab) => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Convert the new lab to JSON for sending
  const newLab = JSON.stringify(lab);
  // Submit a post with the new lab
  axios.post(`${server}/api/labs/`, newLab, config)
  .then(res => { dispatch({type: LAB_ADDED, payload: res.data}) })
  .catch(err => { handleError(err); });
}

export const editLab = (lab) => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Convert the new lab to JSON for sending
  const editedLab = JSON.stringify(lab);
  // Submit a post with the new lab
  axios.post(`${server}/api/labs/${lab._id}`, editedLab, config)
  .then(res => { dispatch({type: LAB_EDITED, payload: res.data}) })
  .catch(err => { handleError(err); });
}

export const deleteLab = (id) => dispatch => {
  const config = { headers: {"Content-type": "application/json"} };
  axios.delete(`${server}/api/labs/${id}`, config)
  .then(res => { dispatch({ type: LAB_DELETED, payload: id })})
  .catch(err => { handleError(err); });
}

export const selectLab = (lab)   => dispatch => dispatch({ type: SELECT_LAB, payload: lab });
export const toggleAdding = ()   => dispatch => dispatch({ type: TOGGLE_ADDING_LAB });
export const toggleDeleting = () => dispatch => dispatch({ type: TOGGLE_DELETING_LAB });
export const toggleEditing = ()  => dispatch => dispatch({ type: TOGGLE_EDITING_LAB });

export const addLabAssay = (labId, addedAssays) => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Convert the new lab to JSON for sending
  const assays = JSON.stringify({assays: addedAssays});
  // Submit a post with the new lab
  axios.post(`${server}/api/labs/${labId}/add_assays`, assays, config)
  .then(res => { dispatch({type: LAB_EDITED, payload: res.data}) })
  .catch(err => { handleError(err); });
}
