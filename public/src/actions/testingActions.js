// Import action types
import {
  SAMPLE_LIST_REQUEST, SAMPLE_LIST_SUCCESS, SAMPLE_LIST_FAIL,
  SAMPLE_CREATE_REQUEST, SAMPLE_CREATE_SUCCESS, SAMPLE_CREATE_FAIL,
  SAMPLE_EDIT_REQUEST, SAMPLE_EDIT_SUCCESS, SAMPLE_EDIT_FAIL,
  SAMPLE_DELETE_REQUEST, SAMPLE_DELETE_SUCCESS, SAMPLE_DELETE_FAIL,
  SAMPLES_SHOW_TESTING, SAMPLES_SHOW_DELETING, SAMPLES_SHOW_SAMPLING,
  SAMPLE_PRIOR_SUCCESS
} from './types';
// Import axios to handle http requests
import axios from 'axios';
// Import server actions: to report errors
import { handleError } from './msgActions';
// Import the server route
//import server from './route';

const config = { headers: {"Content-type": "application/json"} };

// Submit a request to load the samples
export const getTests = lotId => async dispatch => {
  dispatch({ type: SAMPLE_LIST_REQUEST });
  try {
    const { data } = await axios.get(`/api/tests/${lotId}`, config);
    dispatch({ type: SAMPLE_LIST_SUCCESS, payload: data });
  } catch(e) { dispatch({ type: SAMPLE_LIST_FAIL, payload: handleError(e) })}
}

// Load a single test for a given lot of a given type (for annual testing)
export const getTest = (lotId, type) => async dispatch => {
  // TODO: dispatch a loading event
  try {
    const { data } = await axios.get(`/api/tests/${lotId}/${type}`, config);
    // dispatch({ type: TEST_GET_SUCCESS, payload: data });
  } catch(e) { dispatch({ type: SAMPLE_LIST_FAIL, payload: handleError(e) })}
}

// Obtain the testing from previously received lots for
export const getPriorTests = lotId => async dispatch => {
  dispatch({ type: SAMPLE_LIST_REQUEST });
  try {
    const { data } = await axios.get(`/api/tests/${lotId}`, config);
    dispatch({ type: SAMPLE_PRIOR_SUCCESS, payload: data });
  } catch(e) { dispatch({ type: SAMPLE_LIST_FAIL, payload: handleError(e) })}
}

// Create a sample for the given lot
export const takeRawSample = (lotId, sampleType, sample, assayId=null, identityId=null) => async dispatch => {
  dispatch({ type: SAMPLE_CREATE_REQUEST });
  try {
    const body = JSON.stringify({ sampleType, sample, assayId, identityId });
    const { data } = await axios.post(`/api/tests/${lotId}`, body, config);
    dispatch({ type: SAMPLE_CREATE_SUCCESS, payload: data });
  } catch(e) { dispatch({ type: SAMPLE_CREATE_FAIL, payload: handleError(e) })}
}

// TODO: change the sample editor below to send the test._id instead of the other stuff for better locating

// Submit a request to edit the given sample
export const editRawSample = (lotId, sampleType, sample, assayId=null, identityId=null ) => async dispatch => {
  dispatch({ type: SAMPLE_EDIT_REQUEST });
  try {
    const { data } = await axios.put(`/api/tests/${lotId}`, { sampleType, sample, assayId, identityId }, config);
    dispatch({ type: SAMPLE_EDIT_SUCCESS, payload: data });
  } catch(e) { dispatch({ type: SAMPLE_EDIT_FAIL, payload: handleError(e) })}
}

// Submit a request to delete the sample by ID
export const removeRawSample = (lotId, testId, sampleNumber) => async dispatch => {
  dispatch({ type: SAMPLE_DELETE_REQUEST });
  try {
    const { data } = await axios.delete(`/api/tests/${lotId}/${testId}/${sampleNumber}`, config);
    dispatch({ type: SAMPLE_DELETE_SUCCESS, payload: data });
  } catch(e) { dispatch({ type: SAMPLE_DELETE_FAIL, payload: handleError(e) })}
}

// Select sample and toggle states

// Show the different dialogs
export const setShowTesting  = type => dispatch => { dispatch({ type: SAMPLES_SHOW_TESTING,  payload: type }) }
export const setShowDeleting = type => dispatch => { dispatch({ type: SAMPLES_SHOW_DELETING, payload: type }) }
export const setShowSampling = type => dispatch => { dispatch({ type: SAMPLES_SHOW_SAMPLING, payload: type }) }
