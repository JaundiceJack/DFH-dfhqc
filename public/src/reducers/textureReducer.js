import {
  LOADING_TEXTURES,
  GET_TEXTURES,
  TEXTURE_ADDED,
  TEXTURE_EDITED,
  TEXTURE_DELETED,
  TOGGLE_ADDING_TEXTURE,
  TOGGLE_EDITING_TEXTURE,
  TOGGLE_DELETING_TEXTURE,
  SELECT_TEXTURE
} from '../actions/types.js';

const initialState = {
  textures: [],
  selectedTexture: {},
  loading: false,
  adding: false,
  editing: false,
  deleting: false
}

const textureReducer = (state = initialState, action) => {
  switch(action.type) {
    case TEXTURE_ADDED:
      return {
        ...state,
        textures: [
          ...state.textures,
           action.payload
         ].sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ),
        selectedTexture: action.payload,
        adding: false
      }
    case TEXTURE_EDITED:
      return {
        ...state,
        textures: [
          ...state.textures.filter(texture => texture._id !== action.payload._id),
          action.payload
        ].sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ),
        selectedTexture: action.payload,
        editing: false
      }
    case TEXTURE_DELETED:
      return {
        ...state,
        selectedTexture: {},
        textures: [
          ...state.textures.filter(texture => texture._id !== action.payload)
        ].sort((a, b) => b.name < a.name ? 1 : b.name > a.name ? -1 : 0 ),
        deleting: false
      }
    case LOADING_TEXTURES:
      return { ...state, loading: true }
    case GET_TEXTURES:
      return { ...state, loading: false, textures: action.payload }
    case SELECT_TEXTURE:
      return { ...state, selectedTexture: action.payload }
    case TOGGLE_ADDING_TEXTURE:
      return { ...state, adding:   !state.adding }
    case TOGGLE_DELETING_TEXTURE:
      return { ...state, deleting: !state.deleting }
    case TOGGLE_EDITING_TEXTURE:
      return { ...state, editing:  !state.editing }
    default:
      return state;
  }
};

export default textureReducer;
