// Import Basics
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import Actions
import { getTests, takeRawSample, editRawSample, removeRawSample,
  setShowTesting, setShowSampling, setShowDeleting }
  from '../../../../../actions/testingActions.js';
// Import Components
import Button  from '../../../../inputs/button.js';
import Spinner from '../../../../misc/spinner.js';
import Container from '../../../../misc/container.js';
// Get components specific to this testing dialog
import SampleInfo   from './sampleInfo.js';
import AddHmResults from './addHmResults.js';
// Get components common to the testing dialogs
import OptionRow    from '../common/optionRow.js';
import AddSample    from '../common/addSample.js';
import SelectSample from '../common/selectSample.js';
import DeleteSample from '../common/deleteSample.js';
import TestHeader   from '../common/testHeader.js';

const HmTests = ({ lot }) => {
  // Set/Get component variables
  const {
    tests, loading, error,
    sampling, testing, deleting
  } = useSelector(state => state.testing);

  // Filter out the current test type by type
  const currentTestType = tests ?
    tests.filter(test => test.type === 'hm') :
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
    dispatch(takeRawSample(lot._id, 'hm', sample));
    dispatch(setShowSampling(''));
    // Reset to unmodified so the last sample shows
    setModified(false);
  }

  // Submit labs or results for the sample and hide the dialog
  const takeResults = (e, sample) => {
    e.preventDefault();
    dispatch(editRawSample(lot._id, 'hm', sample));
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
    <Container title="Heavy Metals" loading={loading} contents={
      <div>
      {(sampling !== 'hm') && (testing !== 'hm') && (deleting !== 'hm') &&
        <div className="pb-2">
          <OptionRow type="hm" test={currentTest}
            showSampling={sampling === 'hm'}
            showTesting={testing === 'hm'}
            showDeleting={deleting === 'hm'} />
          <SelectSample type="hm" test={currentTest}
            currentIndex={sampleIndex}
            showDeleting={deleting === 'hm'}
            setSample={e => {
              setSampleIndex(e.target.value);
              setModified(true);
            }} />
          <SampleInfo sample={currentSample} spec={lot && lot.blend && lot.blend.hm} />
        </div>
      }
      {/* Sampling, Testing, & Deleting Dialogs*/}
      {(sampling === 'hm') &&
        <AddSample lotId={lot._id} takeSample={takeSample}
          close={() => dispatch(setShowSampling(''))} />
      }
      {(testing === 'hm') &&
        <AddHmResults lotId={lot._id} takeResults={takeResults}
          sample={currentSample} close={() => dispatch(setShowTesting(''))}
          spec={lot.blend.hm} />
      }
      {(deleting === 'hm') &&
        <DeleteSample lotId={lot._id} removeSample={removeSample}
          sample={currentSample} close={() => dispatch(setShowDeleting(''))} />
      }
      </div>
    } />
  )
}

export default HmTests;
