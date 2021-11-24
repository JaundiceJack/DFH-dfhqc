// Import Basics
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import Actions
import { getTests, takeRawSample, editRawSample, removeRawSample,
  setShowTesting, setShowSampling, setShowDeleting }
  from '../../../../../actions/testingActions.js';
// Import Components
import Divider from '../../../../divider.js';
import Button from '../../../../button.js';
import SampleHeader from './sampleHeader.js';
import SampleSelector from './sampleSelector.js';
import SampleInfo from './sampleInfo.js';
import AddAssaySample from './addAssaySample.js';
import AddAssayResults from './addAssayResults.js';
import DeleteAssay from './deleteAssay.js';
import Assay from './assay.js';

const AssayTests = ({ lot }) => {
  // Set/Get component variables
  const {
    tests, loading, error,
    sampling, testing, deleting
  } = useSelector(state => state.testing);



  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
    <SampleHeader title="Assays" />
      {
        lot.item.assays.map((assay, index) => {
          return <Assay key={index} lot={lot} spec={assay} />
        })
      }
    </div>
  )
}

export default AssayTests;
