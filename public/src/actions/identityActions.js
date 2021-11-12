// Import action types
import {LOADING_IDENTITIES,
        GET_IDENTITIES,
        IDENTITY_ADDED,
        IDENTITY_EDITED,
        IDENTITY_DELETED,
        TOGGLE_ADDING_IDENTITY,
        TOGGLE_EDITING_IDENTITY,
        TOGGLE_DELETING_IDENTITY,
        SELECT_IDENTITY } from './types';
// Import axios to handle http requests
import axios from 'axios';
// Import server actions: to report errors
import { handleError } from './msgActions';
// Import the server route
import server from './route';

const config = { headers: {"Content-type": "application/json"} };

// Submit a request to load the identities
export const getIdentities = () => dispatch => {
  dispatch({ type: LOADING_IDENTITIES });
  axios.get(`${server}/api/identities`, config)
  .then(res => { dispatch({type: GET_IDENTITIES, payload: res.data}) })
  .catch(err => { handleError(err) });
}

// Submit a request to add a new identity
export const addIdentity = identity => dispatch => {
  const newIdentity = JSON.stringify(identity);
  axios.post(`${server}/api/identities`, newIdentity, config)
  .then(res => { dispatch({type: IDENTITY_ADDED, payload: res.data}) })
  .catch(err => { handleError(err) });
}

// Submit a request to edit the given identity
export const editIdentity = identity => dispatch => {
  const editedIdentity = JSON.stringify(identity);
  axios.post(`${server}/api/identities/${identity._id}`, editedIdentity, config)
  .then(res => { dispatch({type: IDENTITY_EDITED, payload: res.data}) })
  .catch(err => { handleError(err) });
}

// Submit a request to delete the identity by ID
export const deleteIdentity = id => dispatch => {
  axios.delete(`${server}/api/identities/${id}`, config)
  .then(res => { dispatch({ type: IDENTITY_DELETED, payload: id })})
  .catch(err => { handleError(err) });
}

// Select identity and toggle states
export const selectIdentity = identity => dispatch => dispatch({ type: SELECT_IDENTITY, payload: identity });
export const toggleAdding   = () => dispatch => dispatch({ type: TOGGLE_ADDING_IDENTITY });
export const toggleDeleting = () => dispatch => dispatch({ type: TOGGLE_DELETING_IDENTITY });
export const toggleEditing  = () => dispatch => dispatch({ type: TOGGLE_EDITING_IDENTITY });
