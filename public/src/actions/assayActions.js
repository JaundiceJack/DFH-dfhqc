// Import action types
import {LOADING_ASSAYS,
        GET_ASSAYS,
        ASSAY_ADDED,
        ASSAY_EDITED,
        ASSAY_DELETED,
        TOGGLE_ADDING_ASSAY,
        TOGGLE_EDITING_ASSAY,
        TOGGLE_DELETING_ASSAY,
        SELECT_ASSAY } from './types';
// Import axios to handle http requests
import axios from 'axios';
// Import server actions: to report errors
import { handleError } from './msgActions';
// Import the server route
import server from './route';

const config = { headers: {"Content-type": "application/json"} };

// Submit a request to load the assays
export const getAssays = () => dispatch => {
  dispatch({ type: LOADING_ASSAYS });
  axios.get(`${server}/api/assays`, config)
  .then(res => { dispatch({type: GET_ASSAYS, payload: res.data}) })
  .catch(err => { handleError(err) });
}

// Submit a request to add a new assay
export const addAssay = assay => dispatch => {
  const newAssay = JSON.stringify(assay);
  axios.post(`${server}/api/assays`, newAssay, config)
  .then(res => { dispatch({type: ASSAY_ADDED, payload: res.data}) })
  .catch(err => { dispatch(handleError(err)) });
}

// Submit a request to edit the given assay
export const editAssay = assay => dispatch => {
  const editedAssay = JSON.stringify(assay);
  axios.post(`${server}/api/assays/${assay._id}`, editedAssay, config)
  .then(res => { dispatch({type: ASSAY_EDITED, payload: res.data}) })
  .catch(err => { dispatch(handleError(err)) });
}

// Submit a request to delete the assay by ID
export const deleteAssay = id => dispatch => {
  axios.delete(`${server}/api/assays/${id}`, config)
  .then(res => { dispatch({ type: ASSAY_DELETED, payload: id })})
  .catch(err => { dispatch(handleError(err)) });
}

// Select assay and toggle states
export const selectAssay = assay => dispatch => dispatch({ type: SELECT_ASSAY, payload: assay });
export const toggleAdding   = () => dispatch => dispatch({ type: TOGGLE_ADDING_ASSAY });
export const toggleDeleting = () => dispatch => dispatch({ type: TOGGLE_DELETING_ASSAY });
export const toggleEditing  = () => dispatch => dispatch({ type: TOGGLE_EDITING_ASSAY });
