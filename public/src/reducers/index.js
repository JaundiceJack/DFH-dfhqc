import {combineReducers} from 'redux';
import rawReducer from './rawReducer.js';
import msgReducer from './msgReducer.js';
import authReducer from './authReducer.js';
import lotReducer from './lotReducer.js';
import blendReducer from './blendReducer.js';
import bulkReducer from './bulkReducer.js';
import fgReducer from './fgReducer.js';

export default combineReducers({
  raw: rawReducer,
  blend: blendReducer,
  lot: lotReducer,
  msg: msgReducer,
  auth: authReducer,
  bulk: bulkReducer,
  fg: fgReducer
})
