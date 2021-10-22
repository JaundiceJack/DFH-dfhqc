import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeRawSample, takeRawSample } from '../../../../actions/lotActions';
import { BiPlus } from 'react-icons/bi';
import Button from '../../../button.js';
import AssayTestLine from './assayTestLine.js';
import AddSample from './addSample.js';


// So, when a raw sample is taken, i need to pass the id for the taken sample assay to pass into the result object

const AssayTests = ({ lot }) => {
/*
  const [sampleDate, setSampleDate] = useState(new Date().toISOString().split('T')[0]);
  const [assayTesting, setAssayTesting] = useState({
    showSampling: false,
    showTesting: false,
    assayId: ""
  });
  const onTakeSample = (assayId) => {
    setAssayTesting(...assayTesting, showSampling: true, assayId: assayId);
  }

  // Dispatch a change to the sampled state of the raw category
  const dispatch = useDispatch();
  const takeSample = (e) => {
    e.preventDefault();
    dispatch(takeRawSample(lot._id, type, sampleDate, testId));
    setShowAssaySampling(false);
  }
  // Set up the action to remove the sample
  const removeSample = (testId) => { dispatch(removeRawSample(lot._id, 'assay', testId)) };

  console.log(lot.testing.assay)
*/
  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold min-h-200">
      <div className="flex flex-row px-2 py-1">
        <h3 className="text-lg text-left px-2 text-blue-200">Assays</h3>
        <div className="flex-grow"></div>
      </div>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className="grid gap-y-2 p-2">

{/*
        {!showAssaySampling && lot && lot.item && lot.item.assays.map((assay, index) => {
          return <AssayTestLine
            key={index}
            testName={assay.assay.name}
            isTested={assay.min || assay.max}
            currentTests={lot.testing.assay.filter(test => test.assay !== assay.assay._id)}

            lotId={lot._id}


            toggle={showAssaySampling}
            showSampling={() => setShowAssaySampling(true)}
            removeSample={() => removeSample(assay.assay._id)}
            setTestId={() => setTestId(assay.assay._id)}
            testId={assay.assay._id} />
          })
        }
        {showAssaySampling &&
          <Sampling
            lotId={lot._id}
            type='assay'
            testId={assayId}
            onToggle={() => setShowAssaySampling(false)} />
        }
        */}
      </div>
    </div>
  )
}

export default AssayTests;
