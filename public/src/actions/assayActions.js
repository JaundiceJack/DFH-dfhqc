// Import action types
//import { ADD_ASSAY } from './types';
// Import axios to handle http requests
import axios from 'axios';
// Import server actions: to report errors
import { returnMessages } from './msgActions';
// Import the server route
import server from './route';


export const getAssays = () => dispatch => {
  const config = { headers: {"Content-type": "application/json"} };
  axios.get(`${server}/api/assays`, config)
  .then(res => {

  })
  .catch(err => {

  });
}

// Request the assay object with the given id to get its name/labs/etc
export const getAssay = id => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Submit a post with the new raw
  axios.get(`${server}/api/assays/${id}`, config)
  .then(res => {
    return res.data })
  .catch(err => dispatch(returnMessages(err.response.data, err.response.status)))
}
// Request the assay object with the given id to get its name
export const getAssayName = id => dispatch => {
  // Set Headers
  const config = { headers: {"Content-type": "application/json"} };
  // Submit a post with the new raw
  axios.get(`${server}/api/assays/${id}`, config)
  .then(res => {
    return res.data })
  .catch(err => dispatch(returnMessages(err.response.data, err.response.status)))
}


export const addAssay = () => dispatch => {
  return "";
}
