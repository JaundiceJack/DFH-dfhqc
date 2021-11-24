// Import Basics
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import Actions
import { getTests, takeRawSample, editRawSample, removeRawSample,
  setShowTesting, setShowSampling, setShowDeleting }
  from '../../../../../actions/testingActions.js';
// Import Components
import Divider from '../../../../divider.js';
import Button from '../../../../button.js';
import SampleHeader from './sampleHeader.js';
import SampleSelector from './sampleSelector.js';
import SampleInfo from './sampleInfo.js';
import AddMicroSample from './addMicroSample.js';
import AddMicroResults from './addMicroResults.js';
import DeleteMicro from './deleteMicro.js';

const MicroTests = ({ lot }) => {
  // Set/Get component variables
  const {
    tests, loading, error,
    sampling, testing, deleting
  } = useSelector(state => state.testing);
  const [sampleIndex, setSampleIndex] = useState(0);

  // Get the lot's tests/samples upon loading
  const dispatch = useDispatch();
  useEffect(() => {
    if (!tests) dispatch(getTests(lot._id));
  }, [dispatch, tests, lot]);

  // Get the current sample info to display based on the sample index
  const currentSample = () => {
    if (tests) {
      const microTests = tests.filter(test => test.type === 'micro');
      const microTest = microTests.length > 0 ? microTests[0] : null;
      return (
        microTest &&
        microTest.samples.length > 0 &&
        sampleIndex <= microTest.samples.length-1
      ) ? microTest.samples[sampleIndex] : null;
    } else return null;
  }
  const currentTest = () => {
    if (tests) {
      const microTests = tests.filter(test => test.type === 'micro');
      return microTests.length > 0 ? microTests[0] : null;
    } else return null;
  }
  // Submit a new sample
  const takeSample = (e, sample) => {
    e.preventDefault();
    dispatch(takeRawSample(lot._id, 'micro', sample));
    dispatch(setShowSampling(''));
  }
  // Submit labs or results for the sample
  const takeResults = (e, sample) => {
    e.preventDefault();
    dispatch(editRawSample(lot._id, 'micro', sample));
    dispatch(setShowTesting(''));
  }
  // Remove the current sample from the database
  const removeSample = () => {
    const thisTest = currentTest();
    const thisSample = currentSample();
    if (thisTest && thisSample) {
      dispatch(removeRawSample(lot._id, thisTest._id, thisSample.number));
    }
    dispatch(setShowDeleting(''));
  }

  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <SampleHeader title="Microbials" type="micro" test={currentTest()}
        showSampling={sampling === 'micro'}
        showTesting={testing === 'micro'}
        showDeleting={deleting === 'micro'} />
      <Divider />
      {(sampling !== 'micro') && (testing !== 'micro') && (deleting !== 'micro') &&
        <div className="pb-2">
          <SampleSelector type="micro" currentSample={sampleIndex}
            setSample={e => setSampleIndex(e.target.value)}
            test={currentTest()} showDeleting={deleting === 'micro'} />
          <SampleInfo sample={currentSample()} spec={lot.item.micro} />
        </div>
      }
      {/* Sampling, Testing, & Deleting Dialogs*/}
      {(sampling === 'micro') &&
        <AddMicroSample lotId={lot._id}  takeSample={takeSample} />
      }
      {(testing === 'micro') &&
        <AddMicroResults lotId={lot._id} takeResults={takeResults}
          spec={lot.item.micro} sample={currentSample()} />
      }
      {(deleting === 'micro') &&
        <DeleteMicro lotId={lot._id} removeSample={removeSample}
          sample={currentSample()} close={() => dispatch(setShowDeleting(''))} />
      }

    </div>
  )
}

export default MicroTests;
