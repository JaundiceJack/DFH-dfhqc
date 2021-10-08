// Import action types
import {LOADING_METHODS,
        GET_METHODS,
        METHOD_ADDED,
        METHOD_EDITED,
        METHOD_DELETED,
        TOGGLE_ADDING_METHOD,
        TOGGLE_EDITING_METHOD,
        TOGGLE_DELETING_METHOD,
        SELECT_METHOD } from './types';
// Import axios to handle http requests
import axios from 'axios';
// Import server actions: to report errors
import { handleError } from './msgActions';
// Import the server route
import server from './route';

const config = { headers: {"Content-type": "application/json"} };

// Submit a request to load the methods
export const getMethods = () => dispatch => {
  dispatch({ type: LOADING_METHODS });
  axios.get(`${server}/api/methods`, config)
  .then(res => { dispatch({type: GET_METHODS, payload: res.data}) })
  .catch(err => { dispatch(handleError(err)) });
}

// Submit a request to add a new method
export const addMethod = method => dispatch => {
  const newMethod = JSON.stringify(method);
  axios.post(`${server}/api/methods`, newMethod, config)
  .then(res => { dispatch({type: METHOD_ADDED, payload: res.data}) })
  .catch(err => { dispatch(handleError(err)) });
}

// Submit a request to edit the given method
export const editMethod = method => dispatch => {
  const editedMethod = JSON.stringify(method);
  axios.post(`${server}/api/methods/${method._id}`, editedMethod, config)
  .then(res => { dispatch({type: METHOD_EDITED, payload: res.data}) })
  .catch(err => { dispatch(handleError(err)) });
}

// Submit a request to delete the method by ID
export const deleteMethod = id => dispatch => {
  axios.delete(`${server}/api/methods/${id}`, config)
  .then(res => { dispatch({ type: METHOD_DELETED, payload: id })})
  .catch(err => { dispatch(handleError(err)) });
}

// Select method and toggle states
export const selectMethod = method => dispatch => dispatch({ type: SELECT_METHOD, payload: method });
export const toggleAdding   = () => dispatch => dispatch({ type: TOGGLE_ADDING_METHOD });
export const toggleDeleting = () => dispatch => dispatch({ type: TOGGLE_DELETING_METHOD });
export const toggleEditing  = () => dispatch => dispatch({ type: TOGGLE_EDITING_METHOD });
