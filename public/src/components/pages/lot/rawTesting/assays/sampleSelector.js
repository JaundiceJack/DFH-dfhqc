// Import Basics
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import Actions
import { setShowDeleting } from '../../../../../actions/testingActions.js';
// Import Components
import Divider from '../../../../divider.js';
import Button from '../../../../button.js';
import Selection from '../../../../inputs/selection.js';

const SampleSelector = ({
  type,
  test,
  currentSample,
  setSample,
  showDeleting
}) => {
  const dispatch = useDispatch();

  return (
    <div>
      {test && test.samples.length > 0 &&
        <Selection label="Sample #:" name="sampleIndex" value={currentSample}
          onChange={setSample} cap={false}
          options={
            test.samples.map((microSample, index) => {
              return { name: microSample.number, value: index }}) }
          append={
            <Button color={showDeleting ? "bg-red-300" : "bg-red-300"}
              text={showDeleting ? "x" : "x"}
              onClick={() => dispatch(setShowDeleting(type))}
              extraClasses="self-center w-7 h-7 pb-1 ml-1"/>} />
      }
    </div>
  )
}

export default SampleSelector;
