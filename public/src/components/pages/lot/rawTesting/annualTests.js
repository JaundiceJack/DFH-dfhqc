import { BiPlus } from 'react-icons/bi';
import Button from '../../../button.js';
import Sampling from './sampling.js';
import TestLine from './testLine.js';
import { useState } from 'react';

const AnnualTests = ({lot}) => {
  // So, i'd like instead of the on/off sample, use a state to swap out the screen to select things
  const [showPestSampling, setShowPestSampling] = useState(false);
  const [showSolventSampling, setShowSolventSampling] = useState(false);
  const [showRanciditySampling, setShowRanciditySampling] = useState(false);

  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <div className="flex flex-row px-2 py-1">
        <h3 className="text-lg text-left px-2 text-blue-200">Annual Testing</h3>
        <div className="flex-grow"></div>
        
      </div>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className=" p-2">
        {!showPestSampling && !showSolventSampling && !showRanciditySampling &&
          <div>
            <TestLine
              text="Pesticides"
              type='pesticide'
              id={lot._id}
              tested={lot.item.pesticide_tested}
              results={lot.pesticide_results}
              toggle={showPestSampling}
              onSample={setShowPestSampling} />
            <TestLine
              text="Solvents"
              type='solvent'
              id={lot._id}
              tested={lot.item.solvent_tested}
              results={lot.solvent_results}
              toggle={showSolventSampling}
              onSample={setShowSolventSampling} />
            <TestLine
              text="Peroxide"
              type='rancidity'
              id={lot._id}
              tested={lot.item.rancidity_tested}
              results={lot.rancidity_results}
              toggle={showRanciditySampling}
              onSample={setShowRanciditySampling} />
            <TestLine
              text="p-Anisidine"
              type='rancidity'
              id={lot._id}
              tested={lot.item.rancidity_tested}
              results={lot.rancidity_results}
              toggle={showRanciditySampling}
              onSample={setShowRanciditySampling}
              hideButton={true} />
            <TestLine
              text="TOTOX"
              type='rancidity'
              id={lot._id}
              tested={lot.item.rancidity_tested}
              results={lot.rancidity_results}
              toggle={showRanciditySampling}
              onSample={setShowRanciditySampling}
              hideButton={true} />
          </div>
        }
        {showPestSampling &&
          <Sampling
            id={lot._id}
            type='pesticide'
            onToggle={setShowPestSampling} />
        }
        {showSolventSampling &&
          <Sampling
            id={lot._id}
            type='solvent'
            onToggle={setShowSolventSampling} />
        }
        {showRanciditySampling &&
          <Sampling
            id={lot._id}
            type='rancidity'
            onToggle={setShowRanciditySampling} />
        }
      </div>
    </div>
  )
}

export default AnnualTests;
