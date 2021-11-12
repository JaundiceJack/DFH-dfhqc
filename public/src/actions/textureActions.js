// Import action types
import {
  LOADING_TEXTURES, GET_TEXTURES, TEXTURE_ADDED, TEXTURE_EDITED, TEXTURE_DELETED,
  TOGGLE_ADDING_TEXTURE, TOGGLE_EDITING_TEXTURE, TOGGLE_DELETING_TEXTURE,
  SELECT_TEXTURE
} from './types';
// Import axios to handle http requests
import axios from 'axios';
// Import server actions: to report errors
import { handleError } from './msgActions';
// Import the server route
import server from './route';

const config = { headers: {"Content-type": "application/json"} };

// Submit a request to load the textures
export const getTextures = () => dispatch => {
  dispatch({ type: LOADING_TEXTURES });
  axios.get(`${server}/api/textures`, config)
  .then(res => { dispatch({type: GET_TEXTURES, payload: res.data}) })
  .catch(err => { handleError(err) });
}

// Submit a request to add a new texture
export const addTexture = texture => dispatch => {
  const newTexture = JSON.stringify(texture);
  axios.post(`${server}/api/textures`, newTexture, config)
  .then(res => { dispatch({type: TEXTURE_ADDED, payload: res.data}) })
  .catch(err => { handleError(err) });
}

// Submit a request to edit the given texture
export const editTexture = texture => dispatch => {
  const editedTexture = JSON.stringify(texture);
  axios.post(`${server}/api/textures/${texture._id}`, editedTexture, config)
  .then(res => { dispatch({type: TEXTURE_EDITED, payload: res.data}) })
  .catch(err => { handleError(err) });
}

// Submit a request to delete the texture by ID
export const deleteTexture = id => dispatch => {
  axios.delete(`${server}/api/textures/${id}`, config)
  .then(res => { dispatch({ type: TEXTURE_DELETED, payload: id })})
  .catch(err => { handleError(err) });
}

// Select texture and toggle states
export const selectTexture = texture => dispatch => dispatch({ type: SELECT_TEXTURE, payload: texture });
export const toggleAdding   = () => dispatch => dispatch({ type: TOGGLE_ADDING_TEXTURE });
export const toggleDeleting = () => dispatch => dispatch({ type: TOGGLE_DELETING_TEXTURE });
export const toggleEditing  = () => dispatch => dispatch({ type: TOGGLE_EDITING_TEXTURE });
