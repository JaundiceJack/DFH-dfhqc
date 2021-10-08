import { BiPlus } from 'react-icons/bi';
import Button from '../../../button.js';
import Sampling from './sampling.js';
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
              text="Arsenic"
              type='heavy metal'
              id={lot._id}
              tested={lot.item.arsenic_max}
              results={lot.hm_results}
              toggle={showHMSampling}
              onSample={setShowHMSampling} />
            <TestLine
              text="Cadmium"
              type='heavy metal'
              id={lot._id}
              tested={lot.item.cadmium_max}
              results={lot.hm_results}
              toggle={showHMSampling}
              onSample={setShowHMSampling}
              hideButton={true} />
            <TestLine
              text="Lead"
              type='heavy metal'
              id={lot._id}
              tested={lot.item.lead_max}
              results={lot.hm_results}
              toggle={showHMSampling}
              onSample={setShowHMSampling}
              hideButton={true} />
            <TestLine
              text="Mercury"
              type='heavy metal'
              id={lot._id}
              tested={lot.item.mercury_max}
              results={lot.hm_results}
              toggle={showHMSampling}
              onSample={setShowHMSampling}
              hideButton={true} />
            {lot.item.nickel_tested &&
              <TestLine
                text="Nickel"
                type='heavy metal'
                id={lot._id}
                tested={lot.item.nickel_max}
                results={lot.hm_results}
                toggle={showHMSampling}
                onSample={setShowHMSampling}
                hideButton={true} />
            }
          </div>
        }
        {showHMSampling &&
          <Sampling
            id={lot._id}
            type='heavy metal'
            onToggle={setShowHMSampling} />
        }
      </div>
    </div>
  )
}

export default HmTests
