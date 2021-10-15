// Import basics
import { useState } from 'react';
// Import server actions
// Import Components
import { BiPlus } from 'react-icons/bi';
import Button from '../../../button.js';
import AddSample from './addSample.js';
import TestLine from './testLine.js';
import GeneralTestLine from './generalTestLine.js';

const MicroTests = ({lot}) => {
  const [showSampling,  setShowSampling]  = useState(false);
  const [showTesting,   setShowTesting]   = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(
    lot.testing.micro.length > 0 ? lot.testing.micro.length-1 : null);

  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <div className="flex flex-col px-2 py-1">
        <h3 className="text-lg text-left px-2 text-blue-200">Microbials</h3>
        <div className="flex flex-row">
          {lot.testing.micro.length > 0 &&
            <label className="px-2">Current Sample:
              <select name="selectedIndex" value={selectedIndex} onChange={(e) => setSelectedIndex(e.target.value)} className="rounded w-10 ml-1">
                {lot.testing.micro.map((microSample, index) => {
                  return <option key={index} value={index}>{microSample.sample_date}</option>
                })}
              </select>
            </label>
          }
          <div className="flex-grow" />
          <Button
            color={showSampling ? "bg-red-300" : "bg-yellow-300"}
            text={showSampling ? "x" : "New Sample"}
            onClick={() => setShowSampling(!showSampling)} />
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className=" p-2">
        {!showSampling &&
          <div>
            <GeneralTestLine
              sample={selectedIndex && lot.testing.micro.length > 0 && lot.testing.micro[selectedIndex]}
              testName="TPC" isTested={lot.item.micro.tpc}
              isSampled={lot.testing.micro.length > 0} />
            <GeneralTestLine
              sample={selectedIndex && lot.testing.micro.length > 0 && lot.testing.micro[selectedIndex]}
              testName="Y&M" isTested={lot.item.micro.ym}
              isSampled={lot.testing.micro.length > 0} />
            <GeneralTestLine
              sample={selectedIndex && lot.testing.micro.length > 0 && lot.testing.micro[selectedIndex]}
              testName="Enterobacteria" isTested={lot.item.micro.entero}
              isSampled={lot.testing.micro.length > 0} />
            <GeneralTestLine
              sample={selectedIndex && lot.testing.micro.length > 0 && lot.testing.micro[selectedIndex]}
              testName="Salmonella" isTested={lot.item.micro.salmonella}
              isSampled={lot.testing.micro.length > 0} />
            <GeneralTestLine
              sample={selectedIndex && lot.testing.micro.length > 0 && lot.testing.micro[selectedIndex]}
              testName="E. Coli" isTested={lot.item.micro.ecoli}
              isSampled={lot.testing.micro.length > 0} />
            <GeneralTestLine
              sample={selectedIndex && lot.testing.micro.length > 0 && lot.testing.micro[selectedIndex]}
              testName="Staph" isTested={lot.item.micro.staph}
              isSampled={lot.testing.micro.length > 0} />
            {lot.item.paeru_tested &&
              <GeneralTestLine
                sample={selectedIndex && lot.testing.micro.length > 0 && lot.testing.micro[selectedIndex]}
                testName="P. Aeru" isTested={lot.item.micro.paeru}
                isSampled={lot.testing.micro.length > 0} />
            }
          </div>
        }
        {showSampling &&
          <AddSample
            lotId={lot._id}
            type='micro'
            onToggle={() => setShowSampling(false)} />
        }
      </div>
    </div>
  )
}

export default MicroTests
