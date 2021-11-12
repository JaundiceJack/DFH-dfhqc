// Import action types
import {
  GET_LOTS,
  SELECT_LOT,
  LOT_ADDED,
  LOT_EDITED,
  LOT_DELETED,
  TOGGLE_ADDING_LOT,
  TOGGLE_EDITING_LOT,
  TOGGLE_DELETING_LOT,
  TOGGLE_RAW_LOTS,
  TOGGLE_BLEND_LOTS,
  TOGGLE_BULK_LOTS,
  TOGGLE_FG_LOTS,
  TOGGLE_OTHER_LOTS,
  TOGGLE_MT_LOTS,
  TOGGLE_NV_LOTS,
  TOGGLE_CT_LOTS,
  INCREMENT_YEAR,
  DECREMENT_YEAR,
  LOT_SAMPLED,
  LOT_UNSAMPLED,
  LOT_TESTED,
  LOT_UNTESTED,
  TESTING_INDEX_SELECTED,
  TESTING_TOGGLE_TESTING,
  TESTING_TOGGLE_SAMPLING,
  TESTING_TOGGLE_DELETING,
  SHOW_ASSAY_SAMPLING,
  SHOW_ASSAY_TESTING,
  SHOW_ASSAY_DELETING,
  ASSAY_INDEX_SELECTED
   } from './types';
// Import axios to handle http requests
import axios from 'axios';
// Import server actions: to report errors
import { handleError } from './msgActions';
// Import the server route
import server from './route';

// Obtain an array of lots from the server and dispatch them to the redux state
export const getLots = () => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Make request for lot info
  axios.get(`${server}/api/lots`, config)
  .then(res => { dispatch({ type: GET_LOTS, payload: res.data }) })
  .catch(err => { handleError(err) });
}

// Take entries and add a new lot to the database
export const addLot = (lot) => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Convert the new lot to JSON for sending
  const newLot = JSON.stringify(lot);
  // Submit a post with the new lot
  axios.post(`${server}/api/lots/`, newLot, config)
  .then(res => { dispatch({type: LOT_ADDED, payload: res.data}) })
  .catch(err => { handleError(err) });
}
export const editLot = (lot) => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Convert the new lot to JSON for sending
  const editedLot = JSON.stringify(lot);
  // Submit a post with the new lot
  axios.post(`${server}/api/lots/${lot._id}`, editedLot, config)
  .then(res => { dispatch({type: LOT_EDITED, payload: res.data}) })
  .catch(err => { handleError(err) });
}
export const deleteLot = (lot) => dispatch => {
  const config = { headers: {"Content-type": "application/json"} };
  axios.delete(`${server}/api/lots/${lot.item_type}/${lot._id}`, config)
  .then(res => { dispatch({ type: LOT_DELETED, payload: lot })})
  .catch(err => { handleError(err) });
}

// Basic state manipulation functions
export const selectLot =     lot => dispatch => dispatch({ type: SELECT_LOT, payload: lot });
export const toggleAdding =   () => dispatch => dispatch({ type: TOGGLE_ADDING_LOT });
export const toggleDeleting = () => dispatch => dispatch({ type: TOGGLE_DELETING_LOT });
export const toggleEditing =  () => dispatch => dispatch({ type: TOGGLE_EDITING_LOT });
export const toggleRaws =     () => dispatch => dispatch({ type: TOGGLE_RAW_LOTS });
export const toggleBlends =   () => dispatch => dispatch({ type: TOGGLE_BLEND_LOTS });
export const toggleBulks =    () => dispatch => dispatch({ type: TOGGLE_BULK_LOTS });
export const toggleFgs =      () => dispatch => dispatch({ type: TOGGLE_FG_LOTS });
export const toggleOthers =   () => dispatch => dispatch({ type: TOGGLE_OTHER_LOTS });
export const toggleMT =       () => dispatch => dispatch({ type: TOGGLE_MT_LOTS });
export const toggleNV =       () => dispatch => dispatch({ type: TOGGLE_NV_LOTS });
export const toggleCT =       () => dispatch => dispatch({ type: TOGGLE_CT_LOTS });
export const incrementYear =  () => dispatch => dispatch({ type: INCREMENT_YEAR });
export const decrementYear =  () => dispatch => dispatch({ type: DECREMENT_YEAR });
export const setTestingIndex = (index, type) => dispatch => {
  dispatch({ type: TESTING_INDEX_SELECTED, payload: {index, type}}) }
export const setShowTesting = (type) => dispatch => {
  dispatch({ type: TESTING_TOGGLE_TESTING, payload: {type}}) }
export const setShowSampling = (type) => dispatch => {
  dispatch({ type: TESTING_TOGGLE_SAMPLING, payload: {type}}) }
export const setShowDeleting = (type) => dispatch => {
  dispatch({ type: TESTING_TOGGLE_DELETING, payload: {type}}) }

// Create a sample for the given lot and result
export const takeRawSample = (lotId, resultType, sample) => dispatch => {
  const config = { headers: {"Content-type": "application/json"} };
  const body = JSON.stringify({lotId, resultType, sample});
  axios.post(`/api/lots/sample_raw`, body, config)
  .then(res => { dispatch({type: LOT_SAMPLED, payload: res.data}) })
  .catch(err => { handleError(err) });
}
export const editRawSample = (lotId, resultType, sample) => dispatch => {
  const config = { headers: {"Content-type": "application/json"} };
  const body = JSON.stringify({lotId, resultType, sample});
  axios.post(`/api/lots/test_raw`, body, config)
  .then(res => { dispatch({type: LOT_SAMPLED, payload: res.data}) })
  .catch(err => { handleError(err) });
}
// Remove a sample for the given lot and result
export const removeRawSample = (lotId, resultType, sampleNumber, testId=null) => dispatch => {
  const config = { headers: {"Content-type": "application/json"} };
  axios.delete(`/api/lots/${lotId}/unsample_raw/${resultType}/${sampleNumber}/${testId !== null && "/"+testId}`, config)
  .then(res => { dispatch({type: LOT_UNSAMPLED, payload: res.data}) })
  .catch(err => { handleError(err) });
}

export const setShowSamplingAssay = (showSampling, currentAssay) => dispatch => {
  dispatch({ type: SHOW_ASSAY_SAMPLING, payload: {showSampling, currentAssay} });
}

export const setShowTestingAssay = (showTesting, currentAssay) => dispatch => {
  dispatch({ type: SHOW_ASSAY_TESTING, payload: {showTesting, currentAssay} });
}

export const setShowDeletingAssay = (showDeleting, currentAssay) => dispatch => {
  dispatch({ type: SHOW_ASSAY_DELETING, payload: {showDeleting, currentAssay} });
}

export const setAssayTestingIndex = (index, currentAssay) => dispatch => {
  dispatch({ type: ASSAY_INDEX_SELECTED, payload: {index, currentAssay} })
}
