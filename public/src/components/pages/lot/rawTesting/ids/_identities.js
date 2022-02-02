// Import Basics
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import Actions
import { getTests, takeRawSample, editRawSample, removeRawSample,
  setShowTesting, setShowSampling, setShowDeleting }
  from '../../../../../actions/testingActions.js';
// Import Components
import Button from '../../../../inputs/button.js';
import Container from '../../../../misc/container.js';
import Divider from '../../../../misc/divider.js';
import Identity from './identity.js';
// Get components common to the testing dialogs
import TestHeader   from '../common/testHeader.js';

const IdentityTests = ({ lot }) => {
  const { loading } = useSelector(state => state.testing);

  return (
    <Container title="Identity" loading={loading} contents={
      lot.raw.ids.map((identity, index) => {
        return <div key={index}>
          <Identity lot={lot} spec={identity} />
          {index !== lot.raw.ids.length-1 && <div className="mb-2 h-px w-full bg-gradient-to-r from-transparent via-blue-300 to-transparent" />}
        </div>
      })
    } />
  )
}

export default IdentityTests;
