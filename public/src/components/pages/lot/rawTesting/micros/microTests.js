// Import basics
import { useState } from 'react';
// Import server actions
// Import icons
import { BiPlus } from 'react-icons/bi';
// Import Components
import Button from '../../../../button.js';
import AddMicroSample  from './addMicroSample.js';
import AddMicroResults from './addMicroResults.js';
import DeleteMicro from './deleteMicro.js';
import MicroTestLine   from './microTestLine.js';


// So, its now clear i'll need a lot of this stuff within the redux state
// otherwise it shows the wrong stuff...
// looking ok though,
// 

const MicroTests = ({ lot }) => {
  // Convert the date to mm/dd/yyyy format
  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
  }

  const [showSampling,  setShowSampling]  = useState(false);
  const [showTesting,   setShowTesting]   = useState(false);
  const [showDeleting,  setShowDeleting]  = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(
    lot.testing.micro.length > 0 ? lot.testing.micro.length-1 : null);

  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <div className="flex flex-col px-2 py-1">
        <div className="flex flex-row mb-2">
          <h3 className="text-lg text-left px-2 text-blue-200">Microbials</h3>
          <div className="flex-grow" />
          {!showSampling && !showDeleting && <Button
            color={showTesting ? "bg-red-300" : "bg-green-300"}
            text={showTesting ? "x" : "Test"}
            onClick={() => setShowTesting(!showTesting)} extraClasses="w-16 h-7"/>}
          {!showTesting && !showDeleting && <Button
              color={showSampling ? "bg-red-300" : "bg-yellow-300"}
              text={showSampling ? "x" : "Sample"}
              onClick={() => setShowSampling(!showSampling)} extraClasses="w-16 h-7"/>}
        </div>

        {!showSampling && !showTesting && !showDeleting && lot.testing.micro.length > 0 &&
          <div className="flex flex-row">
            <label className="px-2">Current Sample:
              <select name="selectedIndex" value={selectedIndex} onChange={(e) => setSelectedIndex(e.target.value)} className="text-black rounded w-28 h-7 ml-2">
                {lot.testing.micro.map((microSample, index) => {
                  return <option key={index} value={index}>{formatDate(microSample.sample_date)}</option>
                })}
              </select>
            </label>
            <div className="flex-grow" />
            {!showTesting && <Button
                color={showDeleting ? "bg-red-300" : "bg-red-300"}
                text={showDeleting ? "x" : "Remove"}
                onClick={() => setShowDeleting(!showDeleting)} extraClasses="w-16 h-7"/>}
          </div>
        }


      </div>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className=" p-2">
        {!showSampling && !showTesting && !showDeleting &&
          <div>
            <MicroTestLine
              sample={selectedIndex !== null && lot.testing.micro[selectedIndex]}
              testName="TPC" isTested={lot.item.micro.tpc}
              isSampled={lot.testing.micro.length > 0} />
            <MicroTestLine
              sample={selectedIndex !== null && lot.testing.micro[selectedIndex]}
              testName="Y&M" isTested={lot.item.micro.ym}
              isSampled={lot.testing.micro.length > 0} />
            <MicroTestLine
              sample={selectedIndex !== null && lot.testing.micro[selectedIndex]}
              testName="Enterobacteria" isTested={lot.item.micro.entero}
              isSampled={lot.testing.micro.length > 0} />
            <MicroTestLine
              sample={selectedIndex !== null && lot.testing.micro[selectedIndex]}
              testName="Salmonella" isTested={lot.item.micro.salmonella}
              isSampled={lot.testing.micro.length > 0} />
            <MicroTestLine
              sample={selectedIndex !== null && lot.testing.micro[selectedIndex]}
              testName="E. Coli" isTested={lot.item.micro.ecoli}
              isSampled={lot.testing.micro.length > 0} />
            <MicroTestLine
              sample={selectedIndex !== null && lot.testing.micro[selectedIndex]}
              testName="Staph" isTested={lot.item.micro.staph}
              isSampled={lot.testing.micro.length > 0} />
            {lot.item.paeru_tested &&
              <MicroTestLine
                sample={selectedIndex !== null && lot.testing.micro[selectedIndex]}
                testName="P. Aeru" isTested={lot.item.micro.paeru}
                isSampled={lot.testing.micro.length > 0} />
            }
          </div>
        }
        {showSampling &&
          <AddMicroSample lotId={lot._id}
            close={() => setShowSampling(false)} />
        }

        {showTesting &&
          <AddMicroResults lotId={lot._id}
            test={selectedIndex && lot.testing.micro[selectedIndex]}
            item={lot.item.micro}
            close={() => setShowTesting(false)} />
        }

        {showDeleting &&
          <DeleteMicro lotId={lot._id}
            test={selectedIndex && lot.testing.micro[selectedIndex]}
            close={() => setShowDeleting(false)} />
        }
      </div>
    </div>
  )
}

export default MicroTests
