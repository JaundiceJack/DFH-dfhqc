// Import Basics
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import Actions
import { setShowDeleting } from '../../../../../actions/testingActions.js';
// Import Components
import Divider   from '../../../../misc/divider.js';
import Button    from '../../../../inputs/button.js';
import Selection from '../../../../inputs/selection.js';

const SelectSample = ({ type, test, currentIndex, setSample, showDeleting }) => {
  // Set a dispatch for toggling dialogs
  const dispatch = useDispatch();

  return (
    <div>
      {test && test.samples.length > 0 &&
        <Selection label="Sample #:" name="sampleIndex" value={currentIndex}
          onChange={setSample} cap={false}
          options={
            test.samples.map((currentSample, index) => {
              return { name: currentSample.number, value: index }}) }
          append={
            <Button color={showDeleting ? "bg-red-300" : "bg-red-300"}
              text={showDeleting ? "x" : "x"}
              onClick={() => dispatch(setShowDeleting(type))}
              extraClasses="self-center w-7 h-7 pb-1 ml-1"/>} />
      }
    </div>
  )
}

export default SelectSample;
