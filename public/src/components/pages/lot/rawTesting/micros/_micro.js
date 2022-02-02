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
import AddMicroResults from './addMicroResults.js';
// Get components common to the testing dialogs
import OptionRow    from '../common/optionRow.js';
import AddSample    from '../common/addSample.js';
import SelectSample from '../common/selectSample.js';
import DeleteSample from '../common/deleteSample.js';
import TestHeader   from '../common/testHeader.js';

const MicroTests = ({ lot }) => {
  // Set/Get component variables
  const {
    tests, loading, error,
    sampling, testing, deleting
  } = useSelector(state => state.testing);

  // Filter out the current test type by type
  const currentTestType = tests ?
    tests.filter(test => test.type === 'micro') :
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
    dispatch(takeRawSample(lot._id, 'micro', sample));
    dispatch(setShowSampling(''));
    // Reset to unmodified so the last sample shows
    setModified(false);
  }

  // Submit labs or results for the sample and hide the dialog
  const takeResults = (e, sample) => {
    e.preventDefault();
    // Convert data types before submission
    const converted = { ...sample, results: { ...sample.results,
      tpc:    sample.results.tpc    !== "" ? Number(sample.results.tpc)    : null,
      ym:     sample.results.ym     !== "" ? Number(sample.results.ym)     : null,
      entero: sample.results.entero !== "" ? Number(sample.results.entero) : null,
    } };
    dispatch(editRawSample(lot._id, 'micro', converted));
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
    <Container title="Micros" loading={loading} contents={
      <div>
      {(sampling !== 'micro') && (testing !== 'micro') && (deleting !== 'micro') &&
        <div className="pb-2">
          <OptionRow type="micro" test={currentTest}
            showSampling={sampling === 'micro'}
            showTesting={testing === 'micro'}
            showDeleting={deleting === 'micro'} />
          <SelectSample type="micro" test={currentTest}
            currentIndex={sampleIndex}
            showDeleting={deleting === 'micro'}
            setSample={e => {
              setSampleIndex(e.target.value);
              setModified(true);
            }} />
          <SampleInfo sample={currentSample} spec={lot.raw.micro} />
        </div>
      }
      {/* Sampling, Testing, & Deleting Dialogs*/}
      {(sampling === 'micro') &&
        <AddSample lotId={lot._id} takeSample={takeSample}
          close={() => dispatch(setShowSampling(''))} />
      }
      {(testing === 'micro') &&
        <AddMicroResults lotId={lot._id} takeResults={takeResults}
          sample={currentSample}  close={() => dispatch(setShowTesting(''))}
          spec={lot.raw.micro}  />
      }
      {(deleting === 'micro') &&
        <DeleteSample lotId={lot._id} removeSample={removeSample}
          sample={currentSample} close={() => dispatch(setShowDeleting(''))} />
      }
      </div>
    } />
  )
}

export default MicroTests;
