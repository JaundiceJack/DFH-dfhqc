// Import basics
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import server actions
import { setTestingIndex, setShowTesting, setShowSampling, setShowDeleting }
  from '../../../../../actions/lotActions.js';
// Import icons
import { BiPlus } from 'react-icons/bi';
// Import Components
import Button from '../../../../button.js';
import DeletePest      from './deletePest.js';
import DeleteSolvent   from './deleteSolvent.js';
import DeleteRancidity from './deleteRancidity.js';
import PestTestLine      from './pestTestLine.js';
import SolventTestLine   from './solventTestLine.js';
import RancidityTestLine from './rancidityTestLine.js';
import AddPestSample      from './addPestSample.js';
import AddSolventSample   from './addSolventSample.js';
import AddRanciditySample from './addRanciditySample.js';
import AddPestResults      from './addPestResults.js';
import AddSolventResults   from './addSolventResults.js';
import AddRancidityResults from './addRancidityResults.js';

const AnnualTests = ({ lot }) => {
  // Make the dispatch to issue server actions
  const dispatch = useDispatch();

  // Bring in vars from redux
  const { sampleIndexPesticide, sampleIndexSolvent, sampleIndexRancidity,
          showSampling, showTesting, showDeleting } =
    useSelector(state => state.lot.testing.hm);


  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      
    </div>
  )
}

export default AnnualTests
