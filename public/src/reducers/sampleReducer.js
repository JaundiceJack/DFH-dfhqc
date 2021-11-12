import {
  LOADING_SAMPLES,
  GET_SAMPLES,
  SAMPLE_ADDED,
  SAMPLE_EDITED,
  SAMPLE_DELETED
} from '../actions/types.js';

const initialState = {
  loading: false,
  micro:     { samples: [], showSampling: false, showTesting:  false, showDeleting: false },
  hm:        { samples: [], showSampling: false, showTesting:  false, showDeleting: false },
  pesticide: { samples: [], showSampling: false, showTesting:  false, showDeleting: false },
  solvent:   { samples: [], showSampling: false, showTesting:  false, showDeleting: false },
  rancidity: { samples: [], showSampling: false, showTesting:  false, showDeleting: false },
  assays:    { samples: [], showSampling: false, showTesting:  false, showDeleting: false },
  ids:       { samples: [], showSampling: false, showTesting:  false, showDeleting: false }
}

const sampleReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOADING_SAMPLES: return { ...state, loading: true}
    case GET_SAMPLES:
      return {...state,
        loading: false,
        micro: {...initialState.micro, samples: action.payload.micros}        
      }
    default:
      return state
  }
}

export default sampleReducer;
