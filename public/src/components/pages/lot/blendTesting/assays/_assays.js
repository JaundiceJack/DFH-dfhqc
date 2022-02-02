// Import Basics
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import Actions
import { getTests, takeRawSample, editRawSample, removeRawSample,
  setShowTesting, setShowSampling, setShowDeleting }
  from '../../../../../actions/testingActions.js';
// Import Components
import Button from '../../../../inputs/button.js';
import Divider from '../../../../misc/divider.js';
import Assay from './assay.js';
// Get components common to the testing dialogs
import TestHeader   from '../common/testHeader.js';

const AssayTests = ({ lot }) => {
  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <TestHeader title="Assays" />
      {
        lot.blend.assays.map((assay, index) => {
          return <div key={index}>
            <Assay lot={lot} spec={assay} />
            {index !== lot.blend.assays.length-1 && <Divider />}
          </div>
        })
      }
    </div>
  )
}

export default AssayTests;
