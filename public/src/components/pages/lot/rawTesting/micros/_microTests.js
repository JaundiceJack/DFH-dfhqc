// Import basics
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import server actions
import { setTestingIndex, setShowTesting, setShowSampling, setShowDeleting }
  from '../../../../../actions/lotActions.js';
// Import icons
import { BiPlus } from 'react-icons/bi';
// Import Components
import Button from '../../../../button.js';
import AddMicroSample  from './addMicroSample.js';
import AddMicroResults from './addMicroResults.js';
import DeleteMicro     from './deleteMicro.js';
import MicroTestLine   from './microTestLine.js';

const MicroTests = ({ lot }) => {
  // Make the dispatch to issue server actions
  const dispatch = useDispatch();

  // Bring in vars from redux
  const { sampleIndex, showSampling, showTesting, showDeleting } =
    useSelector(state => state.lot.testing.micro);

  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <div className="flex flex-col px-2 py-1">
        <div className="grid grid-cols-5">
          <h3 className="text-lg text-left px-2 text-blue-200 col-span-2">
            Microbials
          </h3>
          <div className="flex flex-row justify-self-end col-start-4 col-span-2">
            {!showSampling && !showDeleting && lot.testing.micro.length > 0 &&
              <Button color={showTesting ? "bg-red-300" : "bg-green-300"}
                text={showTesting ? "x" : "Test"}
                onClick={() => dispatch(setShowTesting('micro'))}
                extraClasses="w-16 h-7"/>}
            {!showTesting && !showDeleting &&
              <Button color={showSampling ? "bg-red-300" : "bg-yellow-300"}
                text={showSampling ? "x" : "Sample"}
                onClick={() => dispatch(setShowSampling('micro'))}
                extraClasses="w-16 h-7"/>}
          </div>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className=" p-2">
        {!showSampling && !showTesting && !showDeleting &&
          <div className="flex flex-col">

            {/* Sample Number Selector */}
            {lot.testing.micro.length > 0 &&
              <div className="grid grid-cols-6 mb-2">
                <label htmlFor="sampleIndex" className="justify-self-end mr-2 col-span-2">
                  Sample #:
                </label>
                <select name="sampleIndex"
                  value={sampleIndex}
                  onChange={(e) => dispatch(setTestingIndex(e.target.value, 'micro'))}
                  className="text-black rounded w-full h-7">
                  {lot.testing.micro.map((microSample, index) => {
                    return <option key={index} value={index}>
                             {microSample.sample_number}
                           </option> })}
                </select>
                <Button color={showDeleting ? "bg-red-300" : "bg-red-300"}
                  text={showDeleting ? "x" : "x"}
                  onClick={() => dispatch(setShowDeleting('micro'))}
                  extraClasses="w-7 h-7 pb-1 ml-1"/>
              </div>
            }

            {/* Testing Information Lines*/}
            <MicroTestLine
              testName="TPC"
              sample={(sampleIndex !== null && lot.testing.micro.length > 0) ? lot.testing.micro[sampleIndex] : null}
              result={(sampleIndex !== null && lot.testing.micro.length > 0) ? lot.testing.micro[sampleIndex].tpc : null}
              spec={lot.item.micro.tpc}
              unit={lot.item.micro.tpc_units} />
            <MicroTestLine
              testName="Y&M"
              sample={(sampleIndex !== null && lot.testing.micro.length > 0) ? lot.testing.micro[sampleIndex] : null}
              result={(sampleIndex !== null && lot.testing.micro.length > 0) ? lot.testing.micro[sampleIndex].ym : null}
              spec={lot.item.micro.ym}
              unit={lot.item.micro.ym_units} />
            <MicroTestLine
              testName="Enterobacteria"
              sample={(sampleIndex !== null && lot.testing.micro.length > 0) ? lot.testing.micro[sampleIndex] : null}
              result={(sampleIndex !== null && lot.testing.micro.length > 0) ? lot.testing.micro[sampleIndex].entero : null}
              spec={lot.item.micro.entero}
              unit={lot.item.micro.entero_units} />
            <MicroTestLine
              testName="Salmonella"
              sample={(sampleIndex !== null && lot.testing.micro.length > 0) ? lot.testing.micro[sampleIndex] : null}
              result={(sampleIndex !== null && lot.testing.micro.length > 0) ? lot.testing.micro[sampleIndex].salmonella : null}
              spec={lot.item.micro.salmonella} />
            <MicroTestLine
              testName="E. Coli"
              sample={(sampleIndex !== null && lot.testing.micro.length > 0) ? lot.testing.micro[sampleIndex] : null}
              result={(sampleIndex !== null && lot.testing.micro.length > 0) ? lot.testing.micro[sampleIndex].ecoli : null}
              spec={lot.item.micro.ecoli} />
            <MicroTestLine
              testName="Staph"
              sample={(sampleIndex !== null && lot.testing.micro.length > 0) ? lot.testing.micro[sampleIndex] : null}
              result={(sampleIndex !== null && lot.testing.micro.length > 0) ? lot.testing.micro[sampleIndex].staph : null}
              spec={lot.item.micro.staph} />
            {lot.item.micro.paeru_tested &&
              <MicroTestLine
                testName="P. Aeru"
                sample={(sampleIndex !== null && lot.testing.micro.length > 0) ? lot.testing.micro[sampleIndex] : null}
                result={(sampleIndex !== null && lot.testing.micro.length > 0) ? lot.testing.micro[sampleIndex].paeru : null}
                spec={lot.item.micro.paeru} />
            }
          </div>
        }

        {/* Sampling, Testing, & Deleting Dialogs*/}
        {showSampling &&
          <AddMicroSample
            lotId={lot._id}
            close={() => dispatch(setShowSampling('micro'))} />
        }
        {showTesting &&
          <AddMicroResults
            lotId={lot._id}
            test={(sampleIndex !== null && lot.testing.micro.length > 0) && lot.testing.micro[sampleIndex]}
            spec={lot.item.micro}
            close={() => dispatch(setShowTesting('micro'))} />
        }
        {showDeleting &&
          <DeleteMicro
            lotId={lot._id}
            test={(sampleIndex !== null && lot.testing.micro.length > 0) && lot.testing.micro[sampleIndex]}
            close={() => dispatch(setShowDeleting('micro'))} />
        }
      </div>
    </div>
  )
}

export default MicroTests
