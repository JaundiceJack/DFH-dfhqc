// Import action types
import {
  LOADING_SAMPLES, GET_SAMPLES, SAMPLE_ADDED, SAMPLE_EDITED, SAMPLE_DELETED
} from './types';
// Import axios to handle http requests
import axios from 'axios';
// Import server actions: to report errors
import { handleError } from './msgActions';
// Import the server route
import server from './route';

const config = { headers: {"Content-type": "application/json"} };

// Submit a request to load the samples
export const getSamples = () => dispatch => {
  dispatch({ type: LOADING_SAMPLES });
  axios.get(`${server}/api/samples`, config)
  .then(res => { dispatch({type: GET_SAMPLES, payload: res.data}) })
  .catch(err => { handleError(err) });
}

// Submit a request to add a new sample
export const addSample = sample => dispatch => {
  const newSample = JSON.stringify(sample);
  axios.post(`${server}/api/samples`, newSample, config)
  .then(res => { dispatch({type: SAMPLE_ADDED, payload: res.data}) })
  .catch(err => { handleError(err) });
}

// Submit a request to edit the given sample
export const editSample = sample => dispatch => {
  const editedSample = JSON.stringify(sample);
  axios.post(`${server}/api/samples/${sample._id}`, editedSample, config)
  .then(res => { dispatch({type: SAMPLE_EDITED, payload: res.data}) })
  .catch(err => { handleError(err) });
}

// Submit a request to delete the sample by ID
export const deleteSample = id => dispatch => {
  axios.delete(`${server}/api/samples/${id}`, config)
  .then(res => { dispatch({ type: SAMPLE_DELETED, payload: id })})
  .catch(err => { handleError(err) });
}

// Select sample and toggle states
