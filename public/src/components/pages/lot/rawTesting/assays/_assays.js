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
import Container from '../../../../misc/container.js';
import Assay from './assay.js';
// Get components common to the testing dialogs
import TestHeader   from '../common/testHeader.js';

const AssayTests = ({ lot }) => {
  const { loading } = useSelector(state => state.testing);

  return (
    <Container title="Assays" loading={loading} contents={
      lot.raw.assays.map((assay, index) => {
        return (
          <div key={index}>
            <Assay lot={lot} spec={assay} />
            {index !== lot.raw.assays.length-1 && <div className="mb-2 h-px w-full bg-gradient-to-r from-transparent via-blue-300 to-transparent" />}
          </div>
        )
      })
    } />
  )
}

export default AssayTests;
