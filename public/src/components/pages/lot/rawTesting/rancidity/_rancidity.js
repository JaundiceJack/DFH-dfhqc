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
import AddRancidityResults from './addRancidityResults.js';
// Get components common to the testing dialogs
import OptionRow    from '../common/optionRow.js';
import AddSample    from '../common/addSample.js';
import SelectSample from '../common/selectSample.js';
import DeleteSample from '../common/deleteSample.js';
import TestHeader   from '../common/testHeader.js';

// TODO: when the rancidity results are submitted, in the backend i want to calculate the totox from the entries and submit that with results
//


const RancidityTests = ({ lot }) => {
  // Set/Get component variables
  const {
    tests, loading, error,
    sampling, testing, deleting
  } = useSelector(state => state.testing);

  // Filter out the current test type by type
  const currentTestType = tests ?
    tests.filter(test => test.type === 'rancidity') :
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
    dispatch(takeRawSample(lot._id, 'rancidity', sample));
    dispatch(setShowSampling(''));
    // Reset to unmodified so the last sample shows
    setModified(false);
  }

  // Submit labs or results for the sample and hide the dialog
  const takeResults = (e, sample) => {
    e.preventDefault();

    // Calculate the totox from the peroxide and p-anisidine before submission
    const calced = {...sample,
      results: { ...sample.results,
        peroxide: sample.results.peroxide !== "" ? Number(sample.results.peroxide) : null,
        anisidine: sample.results.anisidine !== "" ? Number(sample.results.anisidine) : null,
        totox: (sample.results.peroxide !== "" && sample.results.anisidine !== "") ?
          ((2 * Number(sample.results.peroxide)) + Number(sample.results.anisidine)) : null,
      }
    };

    dispatch(editRawSample(lot._id, 'rancidity', calced));
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
    <Container title="Rancidity" loading={loading} contents={
      <div>
      {(sampling !== 'rancidity') && (testing !== 'rancidity') && (deleting !== 'rancidity') &&
        <div className="pb-2">
          <OptionRow type="rancidity" test={currentTest}
            showSampling={sampling === 'rancidity'}
            showTesting={testing === 'rancidity'}
            showDeleting={deleting === 'rancidity'} />
          <SelectSample type="rancidity" test={currentTest}
            currentIndex={sampleIndex}
            showDeleting={deleting === 'rancidity'}
            setSample={e => {
              setSampleIndex(e.target.value);
              setModified(true);
            }} />
          <SampleInfo sample={currentSample} spec={lot.raw.rancidity} />
        </div>
      }
      {/* Sampling, Testing, & Deleting Dialogs*/}
      {(sampling === 'rancidity') &&
        <AddSample lotId={lot._id} takeSample={takeSample} testName="rancidity"
          close={() => dispatch(setShowSampling(''))} />
      }
      {(testing === 'rancidity') &&
        <AddRancidityResults lotId={lot._id} takeResults={takeResults}
          sample={currentSample}  close={() => dispatch(setShowTesting(''))}
          spec={lot.raw.rancidity}  />
      }
      {(deleting === 'rancidity') &&
        <DeleteSample lotId={lot._id} removeSample={removeSample}
          sample={currentSample} close={() => dispatch(setShowDeleting(''))} />
      }
      </div>
    } />
  )
}

export default RancidityTests;
