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
import AddAssaySample from './addAssaySample.js';
import AddAssayResults from './addAssayResults.js';
import DeleteAssay from './deleteAssay.js';


// With the assay tests, i'll have a level above this file, and feed this one the lot
// and assay from the list of assay specs which will let me have independant sample indices


const AssayTests = ({ lot, spec }) => {
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
      const assayTests = tests.filter(test => test.type === spec.assay.name);
      const assayTest = assayTests.length > 0 ? assayTests[0] : null;
      return (
        assayTest &&
        assayTest.samples.length > 0 &&
        sampleIndex <= assayTest.samples.length-1
      ) ? assayTest.samples[sampleIndex] : null;
    } else return null;
  }
  const currentTest = () => {
    if (tests) {
      const assayTests = tests.filter(test => test.type === spec.assay.name);
      return assayTests.length > 0 ? assayTests[0] : null;
    } else return null;
  }
  // Submit a new sample
  const takeSample = (e, sample) => {
    e.preventDefault();
    dispatch(takeRawSample(lot._id, spec.assay.name, sample));
    dispatch(setShowSampling(''));
  }
  // Submit labs or results for the sample
  const takeResults = (e, sample) => {
    e.preventDefault();
    dispatch(editRawSample(lot._id, spec.assay.name, sample));
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

      <Divider />
      <div className="grid grid-cols-3">
        {(testing !== spec.assay.name) &&
         (deleting !== spec.assay.name) &&
          <Button color={(sampling === spec.assay.name) ? "bg-red-300" : "bg-yellow-300"}
            text={(sampling === spec.assay.name) ? "x" : "Sample"}
            onClick={() => { (sampling === spec.assay.name) ?
              dispatch(setShowSampling('')) :
              dispatch(setShowSampling(spec.assay.name)) }}
            extraClasses="w-16 h-7 mr-2 justify-self-end"/>}
        {(sampling !== spec.assay.name) &&
         (deleting !== spec.assay.name) &&
          currentTest() && currentTest().samples.length > 0 &&
          <Button color={(testing === spec.assay.name) ? "bg-red-300" : "bg-green-300"}
            text={(testing === spec.assay.name) ? "x" : "Test"}
            onClick={() => { (testing === spec.assay.name) ?
              dispatch(setShowTesting('')) :
              dispatch(setShowTesting(spec.assay.name)) }}
            extraClasses="w-16 h-7 "/>}
        <SampleSelector type="hm" currentSample={sampleIndex}
          setSample={e => setSampleIndex(e.target.value)}
          test={currentTest()} showDeleting={deleting === spec.assay.name} />
      </div>

      {(sampling !== spec.assay.name) && (testing !== spec.assay.name) && (deleting !== spec.assay.name) &&
        <div className="pb-2 pt-2">
          <SampleInfo sample={currentSample()} spec={spec} />
        </div>
      }
      {/* Sampling, Testing, & Deleting Dialogs*/}
      {(sampling === spec.assay.name) &&
        <AddAssaySample lotId={lot._id}  takeSample={takeSample} />
      }
      {(testing === spec.assay.name) &&
        <AddAssayResults lotId={lot._id} takeResults={takeResults}
          spec={lot.item.hm} sample={currentSample()} />
      }
      {(deleting === spec.assay.name) &&
        <DeleteAssay lotId={lot._id} removeSample={removeSample}
          sample={currentSample()} close={() => dispatch(setShowDeleting(''))} />
      }

    </div>
  )
}

export default AssayTests;
