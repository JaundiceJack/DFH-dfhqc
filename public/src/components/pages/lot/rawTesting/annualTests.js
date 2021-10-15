import { BiPlus } from 'react-icons/bi';
import Button from '../../../button.js';
import AddSample from './addSample.js';
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
              testName="Pesticides"
              type='pesticide'
              lotId={lot._id}
              isTested={lot.item.pesticide.tested}
              results={lot.testing.pesticide}
              toggle={showPestSampling}
              showSampling={() => setShowPestSampling(true)} />
            <TestLine
              testName="Solvents"
              type='solvent'
              lotId={lot._id}
              isTested={lot.item.solvent.tested}
              results={lot.testing.solvent}
              toggle={showSolventSampling}
              showSampling={() => setShowSolventSampling(true)} />
            <TestLine
              testName="Peroxide"
              type='rancidity'
              lotId={lot._id}
              isTested={lot.item.rancidity.tested}
              results={lot.testing.rancidity}
              toggle={showRanciditySampling}
              showSampling={() => setShowRanciditySampling(true)} />
            <TestLine
              testName="p-Anisidine"
              type='rancidity'
              lotId={lot._id}
              isTested={lot.item.rancidity.tested}
              results={lot.testing.rancidity}
              toggle={showRanciditySampling}
              showSampling={() => setShowRanciditySampling(true)}
              hideButton={true} />
            <TestLine
              testName="TOTOX"
              type='rancidity'
              lotId={lot._id}
              isTested={lot.item.rancidity.tested}
              results={lot.testing.rancidity}
              toggle={showRanciditySampling}
              showSampling={() => setShowRanciditySampling(true)}
              hideButton={true} />
          </div>
        }
        {showPestSampling &&
          <AddSample
            lotId={lot._id}
            type='pesticide'
            onToggle={() => setShowPestSampling(false)} />
        }
        {showSolventSampling &&
          <AddSample
            lotId={lot._id}
            type='solvent'
            onToggle={() => setShowSolventSampling(false)} />
        }
        {showRanciditySampling &&
          <AddSample
            lotId={lot._id}
            type='rancidity'
            onToggle={() => setShowRanciditySampling(false)} />
        }
      </div>
    </div>
  )
}

export default AnnualTests;
