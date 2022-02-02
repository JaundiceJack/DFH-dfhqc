// Import action types
import {
  LAB_LIST_REQUEST,   LAB_LIST_SUCCESS,   LAB_LIST_FAILURE,
  LAB_GET_REQUEST,    LAB_GET_SUCCESS,    LAB_GET_FAILURE,
  LAB_ADD_REQUEST,    LAB_ADD_SUCCESS,    LAB_ADD_FAILURE,
  LAB_EDIT_REQUEST,   LAB_EDIT_SUCCESS,   LAB_EDIT_FAILURE,
  LAB_DELETE_REQUEST, LAB_DELETE_SUCCESS, LAB_DELETE_FAILURE,
  LAB_TOGGLE_ADD,     LAB_TOGGLE_EDIT,    LAB_TOGGLE_DELETE,
  LAB_SELECT } from './types';

// Import axios to handle http requests
import axios from 'axios';
// Import server actions: to report errors
import { handleError } from './msgActions';
// Import the server route
import server from './route';

const config = { headers: {"Content-type": "application/json"} };

// Obtain the testing labs from the server and put them in the redux state
export const getLabs = () => async dispatch => {
  dispatch({ type: LAB_LIST_REQUEST });
  try {
    const { data } = await axios.get(`/api/labs`, config);
    dispatch({ type: LAB_LIST_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: LAB_LIST_FAILURE, payload: handleError(e) }) }
}

// Obtain the selected lab from the server and put it in the redux state
export const getLab = id => async dispatch => {
  dispatch({ type: LAB_GET_REQUEST });
  try {
    const { data } = await axios.get(`/api/labs/${id}`, config);
    dispatch({ type: LAB_GET_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: LAB_GET_FAILURE, payload: handleError(e) }) }
}

// TODO: add authentication
// Take entries and add a new lab to the database
export const addLab = lab => async dispatch => {
  dispatch({ type: LAB_ADD_REQUEST });
  try {
    // Convert the new lab to JSON for sending and submit a post request
    const newLab = JSON.stringify(lab);
    const { data } = await axios.post(`/api/labs/`, newLab, config);
    dispatch({ type: LAB_ADD_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: LAB_ADD_FAILURE, payload: handleError(e) }) }
}

// Take a lab with updated info, and apply it to the database entry
export const editLab = lab => async dispatch => {
  dispatch({ type: LAB_EDIT_REQUEST });
  try {
    // Convert the new lab to JSON for sending and submit a post with the new lab
    const editedLab = JSON.stringify(lab);
    const { data } = await axios.put(`/api/labs/${lab._id}`, editedLab, config);
    dispatch({ type: LAB_EDIT_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: LAB_EDIT_FAILURE, payload: handleError(e) }) }
}

export const deleteLab = id => async dispatch => {
  dispatch({ type: LAB_DELETE_REQUEST });
  try {
    const { data } = await axios.delete(`/api/labs/${id}`, config)
    dispatch({ type: LAB_DELETE_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: LAB_DELETE_FAILURE, payload: handleError(e) }) }
}

export const selectLab = lab => dispatch => dispatch({ type: LAB_SELECT, payload: lab });
export const toggleAdding = ()   => dispatch => dispatch({ type: LAB_TOGGLE_ADD });
export const toggleDeleting = () => dispatch => dispatch({ type: LAB_TOGGLE_DELETE });
export const toggleEditing = ()  => dispatch => dispatch({ type: LAB_TOGGLE_EDIT });
