import { BiPlus } from 'react-icons/bi';
import Button from '../../../button.js';
import Sampling from './sampling.js';
import TestLine from './testLine.js';
import { useState } from 'react';

const MicroTests = ({lot}) => {
  const [showMicroSampling, setShowMicroSampling] = useState(false);

  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <div className="flex flex-row px-2 py-1">
        <h3 className="text-lg text-left px-2 text-blue-200">Microbials</h3>
        <div className="flex-grow"></div>

      </div>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className=" p-2">
        {!showMicroSampling &&
          <div>
            <TestLine
              text="TPC"
              type='micro'
              id={lot._id}
              tested={lot.item.tpc_max}
              results={lot.micro_results}
              toggle={showMicroSampling}
              onSample={setShowMicroSampling} />
            <TestLine
              text="Y&M"
              type='micro'
              id={lot._id}
              tested={lot.item.ym_max}
              results={lot.micro_results}
              toggle={showMicroSampling}
              onSample={setShowMicroSampling}
              hideButton={true} />
            <TestLine
              text="Enterobacteria"
              type='micro'
              id={lot._id}
              tested={lot.item.entero_max}
              results={lot.micro_results}
              toggle={showMicroSampling}
              onSample={setShowMicroSampling}
              hideButton={true} />
            <TestLine
              text="Salmonella"
              type='micro'
              id={lot._id}
              tested={lot.item.salmonella}
              results={lot.micro_results}
              toggle={showMicroSampling}
              onSample={setShowMicroSampling}
              hideButton={true} />
            <TestLine
              text="E. Coli"
              type='micro'
              id={lot._id}
              tested={lot.item.ecoli}
              results={lot.micro_results}
              toggle={showMicroSampling}
              onSample={setShowMicroSampling}
              hideButton={true} />
            <TestLine
              text="Staph"
              type='micro'
              id={lot._id}
              tested={lot.item.staph}
              results={lot.micro_results}
              toggle={showMicroSampling}
              onSample={setShowMicroSampling}
              hideButton={true} />
            {lot.item.paeru_tested &&
              <TestLine
                text="P. Aeru."
                type='micro'
                id={lot._id}
                tested={lot.item.paeru}
                results={lot.micro_results}
                toggle={showMicroSampling}
                onSample={setShowMicroSampling}
                hideButton={true} />
            }
          </div>
        }
        {showMicroSampling &&
          <Sampling
            id={lot._id}
            type='micro'
            onToggle={setShowMicroSampling} />
        }
      </div>
    </div>
  )
}

export default MicroTests
