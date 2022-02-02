// Import action types
import {
  GET_LOTS, SELECT_LOT, LOT_ADDED, LOT_EDITED, LOT_DELETED, LOT_GET_REQUEST,
  LOT_ADD_REQUEST, LOT_EDIT_REQUEST, LOT_DELETE_REQUEST,
  LOT_ADD_FAIL, LOT_EDIT_FAIL, LOT_DELETE_FAIL, LOT_GET_FAIL,
  TOGGLE_ADDING_LOT, TOGGLE_EDITING_LOT, TOGGLE_DELETING_LOT,
  TOGGLE_RAW_LOTS, TOGGLE_BLEND_LOTS, TOGGLE_BULK_LOTS, TOGGLE_FG_LOTS, TOGGLE_OTHER_LOTS,
  TOGGLE_MT_LOTS, TOGGLE_NV_LOTS, TOGGLE_CT_LOTS,
  INCREMENT_YEAR, DECREMENT_YEAR, LOT_PRIOR_SUCCESS
} from './types';
// Import axios to handle http requests
import axios from 'axios';
// Import server actions: to report errors
import { handleError } from './msgActions.js';
import { getTests } from './testingActions.js';
// Import the server route if using Heroku
import server from './route';

const config = { headers: {"Content-type": "application/json"} };

// Obtain an array of lots from the server and dispatch them to the redux state
export const getLots = () => async dispatch => {
  dispatch({ type: LOT_GET_REQUEST });
  try {
    // Make request for lot info
    const { data } = await axios.get(`/api/lots`, config);
    dispatch({ type: GET_LOTS, payload: data });
  } catch (e) { dispatch({ type: LOT_GET_FAIL, payload: handleError(e) }) }
}

// Get an individual lot's info and place it in the selectedLot state
export const getLot = id => async dispatch => {
  dispatch({ type: LOT_GET_REQUEST });
  try {
    const { data } = await axios.get(`/api/lots/${id}`, config);
    dispatch({ type: SELECT_LOT, payload: data });
  } catch (e) { dispatch({ type: LOT_GET_FAIL, payload: handleError(e) }) }
}

// Get the prior_lot for a lot to use for FT-IR samples
export const getPriorLot = id => async dispatch => {
  dispatch({ type: LOT_GET_REQUEST });
  try {
    const { data } = await axios.get(`/api/lots/${id}`, config);
    dispatch({ type: LOT_PRIOR_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: LOT_GET_FAIL, payload: handleError(e) }) }
}

// Take entries and add a new lot to the database
export const addLot = lot => async (dispatch, getState) => {
  dispatch({ type: LOT_ADD_REQUEST });
  try {
    // Convert the new lot to JSON for sending
    const newLot = JSON.stringify(lot);
    // Submit a post with the new lot
    const { data } = await axios.post(`/api/lots/`, newLot, config)
    dispatch({type: LOT_ADDED, payload: data});
    // Request the selected lot's tests
    if (getState().lot.selectedLot)
      dispatch(getTests(getState().lot.selectedLot._id));
  } catch (e) { dispatch({ type: LOT_ADD_FAIL, payload: handleError(e) }) }
}

export const editLot = lot => async (dispatch, getState) => {
  dispatch({ type: LOT_EDIT_REQUEST });
  try {
    // Convert the new lot to JSON for sending
    const editedLot = JSON.stringify(lot);
    // Submit a post with the new lot
    const { data } = await axios.post(`/api/lots/${lot._id}`, editedLot, config)
    dispatch({type: LOT_EDITED, payload: data});
    // Re-request the selected lot's tests
    if (getState().lot.selectedLot)
      dispatch(getTests(getState().lot.selectedLot._id));
  } catch(e) { dispatch({ type: LOT_EDIT_FAIL, payload: handleError(e) }) }
}

export const deleteLot = lot => async dispatch => {
  dispatch({ type: LOT_DELETE_REQUEST });
  try {
    const { data } = await axios.delete(`/api/lots/${lot._id}`, config);
    dispatch({ type: LOT_DELETED, payload: data });
  } catch(e) { dispatch({ type: LOT_DELETE_FAIL, payload: handleError(e) }) }
}

// Basic state manipulation functions
// Place the in-state lot in the selectedLot variable (does not trigger loading)
export const selectLot = lot => dispatch => { dispatch({ type: SELECT_LOT, payload: lot }); }
// Toggle dialogs
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

// I'm thinking about making a function to issue a get request
// but, if you want to fill multiple state variables, it would still need multiple gets
// so nvm
// i'll issue the lot request, check the type, and issue get requests for the raw with the passing lots filled in
