import { BiPlus } from 'react-icons/bi';
import Button from '../../../button.js';
import AddSample from './addSample.js';
import TestLine from './testLine.js';
import { useState } from 'react';

const HmTests = ({lot}) => {
  const [showHMSampling, setShowHMSampling] = useState(false);

  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <div className="flex flex-row px-2 py-1">
        <h3 className="text-lg text-left px-2 text-blue-200">Heavy Metals</h3>
        <div className="flex-grow"></div>

      </div>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className=" p-2">
        {!showHMSampling &&
          <div>
            <TestLine
              testName="Arsenic"
              type='heavy metal'
              lotId={lot._id}
              isTested={lot.item.hm.arsenic}
              results={lot.testing.hm}
              toggle={showHMSampling}
              showSampling={() => setShowHMSampling(true)} />
            <TestLine
              testName="Cadmium"
              type='heavy metal'
              lotId={lot._id}
              isTested={lot.item.hm.cadmium}
              results={lot.testing.hm}
              toggle={showHMSampling}
              showSampling={() => setShowHMSampling(true)}
              hideButton={true} />
            <TestLine
              testName="Lead"
              type='heavy metal'
              lotId={lot._id}
              isTested={lot.item.hm.lead}
              results={lot.testing.hm}
              toggle={showHMSampling}
              showSampling={() => setShowHMSampling(true)}
              hideButton={true} />
            <TestLine
              testName="Mercury"
              type='heavy metal'
              lotId={lot._id}
              isTested={lot.item.hm.mercury}
              results={lot.testing.hm}
              toggle={showHMSampling}
              showSampling={() => setShowHMSampling(true)}
              hideButton={true} />
            {lot.item.nickel_tested &&
              <TestLine
                testName="Nickel"
                type='heavy metal'
                lotId={lot._id}
                isTested={lot.item.hm.nickel}
                results={lot.testing.hm}
                toggle={showHMSampling}
                showSampling={() => setShowHMSampling(true)}
                hideButton={true} />
            }
          </div>
        }
        {showHMSampling &&
          <AddSample
            lotId={lot._id}
            type='heavy metal'
            onToggle={() => setShowHMSampling(false)} />
        }
      </div>
    </div>
  )
}

export default HmTests
