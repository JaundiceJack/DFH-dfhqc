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
// Get components specific to this testing dialog
import SampleInfo from './sampleInfo.js';
import AddAssayResults from './addAssayResults.js';
// Get components common to the testing dialogs
import OptionRow    from '../common/optionRow.js';
import AddSample    from '../common/addSample.js';
import SelectSample from '../common/selectSample.js';
import DeleteSample from '../common/deleteSample.js';

const Assay = ({ lot, spec }) => {
  // Set/Get component variables
  const {
    tests, loading, error,
    sampling, testing, deleting
  } = useSelector(state => state.testing);

  // Get the current test type by type
  const currentTestType = tests ?
    tests.filter(test => (test.type === 'assay' && test.assay === spec.assay._id)) :
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
    dispatch(takeRawSample(lot._id, 'assay', sample, spec.assay._id, null));
    dispatch(setShowSampling(''));
    // Reset to unmodified so the last sample shows
    setModified(false);
  }

  // Submit labs or results for the sample and hide the dialog
  const takeResults = (e, sample) => {
    e.preventDefault();

    // Convert the result to a number
    const formatted = {...sample,
      results: {...sample.results,
        [spec.assay.name]: sample.results[spec.assay.name] === '' ? null :
          Number(sample.results[spec.assay.name])
      }
    }

    dispatch(editRawSample(lot._id, 'assay', formatted, spec.assay._id, null));
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
    <div style={{minHeight: 100+'px'}}
      className="bg-gray-600 rounded text-blue-100 font-semibold flex flex-col pt-2">
      {loading ? <Spinner /> :
        <div>
          <div className="pb-2">
            {(testing !== spec.assay._id) &&
             (sampling !== spec.assay._id) &&
             (deleting !== spec.assay._id) &&
            <div>
              <OptionRow type={spec.assay._id} test={currentTest}
                showSampling={sampling === spec.assay._id}
                showTesting={testing === spec.assay._id}
                showDeleting={deleting === spec.assay._id} />
              <SelectSample type={spec.assay._id} test={currentTest}
                currentIndex={sampleIndex}
                showDeleting={deleting === spec.assay._id}
                setSample={e => {
                  setSampleIndex(e.target.value);
                  setModified(true);
                }} />
              <SampleInfo sample={currentSample} spec={spec} />
            </div>
          }
          </div>

          {/* Sampling, Testing, & Deleting Dialogs*/}
          {(sampling === spec.assay._id) &&
            <AddSample lotId={lot._id} takeSample={takeSample} testName={spec.assay.name}
              close={() => dispatch(setShowSampling(''))} />
          }
          {(testing === spec.assay._id) &&
            <AddAssayResults lotId={lot._id}
              takeResults={takeResults}
              sample={currentSample}
              close={() => dispatch(setShowTesting(''))}
              spec={spec} />
          }
          {(deleting === spec.assay._id) &&
            <DeleteSample lotId={lot._id} removeSample={removeSample}
              sample={currentSample} close={() => dispatch(setShowDeleting(''))} />
          }
        </div>
      }
    </div>
  )
}

export default Assay;
