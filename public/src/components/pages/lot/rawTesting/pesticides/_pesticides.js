// Import Basics
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import Actions
import { getTests, takeRawSample, editRawSample, removeRawSample,
  setShowTesting, setShowSampling, setShowDeleting }
  from '../../../../../actions/testingActions.js';
// Import Components
import Button from '../../../../inputs/button.js';
import Spinner from '../../../../misc/spinner.js';
import Container from '../../../../misc/container.js';
// Get components specific to this testing dialog
import SampleInfo      from './sampleInfo.js';
import AddPesticideResults from './addPesticideResults.js';
// Get components common to the testing dialogs
import OptionRow    from '../common/optionRow.js';
import AddSample    from '../common/addSample.js';
import SelectSample from '../common/selectSample.js';
import DeleteSample from '../common/deleteSample.js';
import TestHeader   from '../common/testHeader.js';

const PesticideTests = ({ lot }) => {
  // Set/Get component variables
  const {
    tests, loading, error,
    sampling, testing, deleting
  } = useSelector(state => state.testing);

  // Filter out the current test type by type
  const currentTestType = tests ?
    tests.filter(test => test.type === 'pesticides') :
    null;
  // Get the first test object found if any
  const currentTest = (currentTestType && currentTestType.length > 0) ?
    currentTestType[0] :
    null;

  // Set a local index for the current sample
  const [sampleIndex, setSampleIndex] =
    useState(currentTest ? currentTest.samples.length-1 : 0);
  // Set a modified variable to determine whether to show the last sample
  const [modified, setModified] = useState(false);

  // Get the current sample info to display based on the sample index
  const currentSample = (
    currentTest &&
    currentTest.samples.length > 0 &&
    currentTest.samples.length > sampleIndex) ?
      currentTest.samples[sampleIndex] :
      null;

  // Submit a new sample and hide the dialog
  const takeSample = (e, sample) => {
    e.preventDefault();
    dispatch(takeRawSample(lot._id, 'pesticides', sample));
    dispatch(setShowSampling(''));
    // Reset to unmodified so the last sample shows
    setModified(false);
  }

  // Submit labs or results for the sample and hide the dialog
  const takeResults = (e, sample) => {
    e.preventDefault();
    dispatch(editRawSample(lot._id, 'pesticides', sample));
    dispatch(setShowTesting(''));
  }

  // Remove the current sample from the database and hide the doalog
  const removeSample = () => {
    if (currentTest && currentSample) {
      dispatch(removeRawSample(lot._id, currentTest._id, currentSample.number));
      // Decrement the sample index if possible
      setSampleIndex((sampleIndex - 1 >= 0) ? (sampleIndex - 1) : 0);
    }
    dispatch(setShowDeleting(''));
  }

  // Get the lot's tests/samples upon loading
  const dispatch = useDispatch();
  useEffect(() => {
    if (!tests) dispatch(getTests(lot._id));
    // Set the sample index to the last one upon loading unless it was changed
    if (!modified) {
      const lastSampleIndex = (currentTest && currentTest.samples.length > 0) ?
        (currentTest.samples.length -1) : 0;
      setSampleIndex(lastSampleIndex);
    }
  }, [dispatch, tests, lot, currentTest, modified]);

  return (
    <Container title="Pesticides" loading={loading} contents={
      <div>
      {(sampling !== 'pesticides') && (testing !== 'pesticides') && (deleting !== 'pesticides') &&
        <div className="pb-2">
          <OptionRow type="pesticides" test={currentTest}
            showSampling={sampling === 'pesticides'}
            showTesting={testing === 'pesticides'}
            showDeleting={deleting === 'pesticides'} />
          <SelectSample type="pesticides" test={currentTest}
            currentIndex={sampleIndex}
            showDeleting={deleting === 'pesticides'}
            setSample={e => {
              setSampleIndex(e.target.value);
              setModified(true);
            }} />
          <SampleInfo sample={currentSample} spec={lot.raw.pesticide} />
        </div>
      }
      {/* Sampling, Testing, & Deleting Dialogs*/}
      {(sampling === 'pesticides') &&
        <AddSample lotId={lot._id} takeSample={takeSample} testName="pesticides"
          close={() => dispatch(setShowSampling(''))} />
      }
      {(testing === 'pesticides') &&
        <AddPesticideResults lotId={lot._id} takeResults={takeResults}
          sample={currentSample}  close={() => dispatch(setShowTesting(''))}
          spec={lot.raw.pesticide}  />
      }
      {(deleting === 'pesticides') &&
        <DeleteSample lotId={lot._id} removeSample={removeSample}
          sample={currentSample} close={() => dispatch(setShowDeleting(''))} />
      }
      </div>
    } />
  )
}

export default PesticideTests;
