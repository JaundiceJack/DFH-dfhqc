// Import action types
import {LOADING_UNITS,
        GET_UNITS,
        UNIT_ADDED,
        UNIT_EDITED,
        UNIT_DELETED,
        TOGGLE_ADDING_UNIT,
        TOGGLE_EDITING_UNIT,
        TOGGLE_DELETING_UNIT,
        SELECT_UNIT } from './types';
// Import axios to handle http requests
import axios from 'axios';
// Import server actions: to report errors
import { handleError } from './msgActions';
// Import the server route
import server from './route';

const config = { headers: {"Content-type": "application/json"} };

// Submit a request to load the units
export const getUnits = () => dispatch => {
  dispatch({ type: LOADING_UNITS });
  axios.get(`${server}/api/units`, config)
  .then(res => { dispatch({type: GET_UNITS, payload: res.data}) })
  .catch(err => { dispatch(handleError(err)) });
}

// Submit a request to add a new unit
export const addUnit = unit => dispatch => {
  const newUnit = JSON.stringify(unit);
  axios.post(`${server}/api/units`, newUnit, config)
  .then(res => { dispatch({type: UNIT_ADDED, payload: res.data}) })
  .catch(err => { dispatch(handleError(err)) });
}

// Submit a request to edit the given unit
export const editUnit = unit => dispatch => {
  const editedUnit = JSON.stringify(unit);
  axios.post(`${server}/api/units/${unit._id}`, editedUnit, config)
  .then(res => { dispatch({type: UNIT_EDITED, payload: res.data}) })
  .catch(err => { dispatch(handleError(err)) });
}

// Submit a request to delete the unit by ID
export const deleteUnit = id => dispatch => {
  axios.delete(`${server}/api/units/${id}`, config)
  .then(res => { dispatch({ type: UNIT_DELETED, payload: id })})
  .catch(err => { dispatch(handleError(err)) });
}

// Select unit and toggle states
export const selectUnit = unit => dispatch => dispatch({ type: SELECT_UNIT, payload: unit });
export const toggleAdding   = () => dispatch => dispatch({ type: TOGGLE_ADDING_UNIT });
export const toggleDeleting = () => dispatch => dispatch({ type: TOGGLE_DELETING_UNIT });
export const toggleEditing  = () => dispatch => dispatch({ type: TOGGLE_EDITING_UNIT });
