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
import AddHmSample from './addHmSample.js';
import AddHmResults from './addHmResults.js';
import DeleteHm from './deleteHm.js';

const HmTests = ({ lot }) => {
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
      const hmTests = tests.filter(test => test.type === 'hm');
      const hmTest = hmTests.length > 0 ? hmTests[0] : null;
      return (
        hmTest &&
        hmTest.samples.length > 0 &&
        sampleIndex <= hmTest.samples.length-1
      ) ? hmTest.samples[sampleIndex] : null;
    } else return null;
  }
  const currentTest = () => {
    if (tests) {
      const hmTests = tests.filter(test => test.type === 'hm');
      return hmTests.length > 0 ? hmTests[0] : null;
    } else return null;
  }
  // Submit a new sample
  const takeSample = (e, sample) => {
    e.preventDefault();
    dispatch(takeRawSample(lot._id, 'hm', sample));
    dispatch(setShowSampling(''));
  }
  // Submit labs or results for the sample
  const takeResults = (e, sample) => {
    e.preventDefault();
    dispatch(editRawSample(lot._id, 'hm', sample));
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
      <SampleHeader title="Heavy Metals" type="hm" test={currentTest()}
        showSampling={sampling === 'hm'}
        showTesting={testing === 'hm'}
        showDeleting={deleting === 'hm'} />
      <Divider />
      {(sampling !== 'hm') && (testing !== 'hm') && (deleting !== 'hm') &&
        <div className="pb-2">
          <SampleSelector type="hm" currentSample={sampleIndex}
            setSample={e => setSampleIndex(e.target.value)}
            test={currentTest()} showDeleting={deleting === 'hm'} />
          <SampleInfo sample={currentSample()} spec={lot.item.hm} />
        </div>
      }
      {/* Sampling, Testing, & Deleting Dialogs*/}
      {(sampling === 'hm') &&
        <AddHmSample lotId={lot._id}  takeSample={takeSample} />
      }
      {(testing === 'hm') &&
        <AddHmResults lotId={lot._id} takeResults={takeResults}
          spec={lot.item.hm} sample={currentSample()} />
      }
      {(deleting === 'hm') &&
        <DeleteHm lotId={lot._id} removeSample={removeSample}
          sample={currentSample()} close={() => dispatch(setShowDeleting(''))} />
      }

    </div>
  )
}

export default HmTests;
