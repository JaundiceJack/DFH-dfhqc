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
import AddHmSample  from './addHmSample.js';
import AddHmResults from './addHmResults.js';
import DeleteHm     from './deleteHm.js';
import HmTestLine   from './hmTestLine.js';

const HmTests = ({ lot }) => {
  // Make the dispatch to issue server actions
  const dispatch = useDispatch();

  // Bring in vars from redux
  const { sampleIndex, showSampling, showTesting, showDeleting } =
    useSelector(state => state.lot.testing.hm);

  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <div className="flex flex-col px-2 py-1">
        <div className="grid grid-cols-5">
          <h3 className="text-lg text-left px-2 text-blue-200 col-span-2">
            Heavy Metals
          </h3>
          <div className="flex flex-row justify-self-end col-start-4 col-span-2">
            {!showSampling && !showDeleting && lot.testing.hm.length > 0 &&
              <Button color={showTesting ? "bg-red-300" : "bg-green-300"}
                text={showTesting ? "x" : "Test"}
                onClick={() => dispatch(setShowTesting('hm'))}
                extraClasses="w-16 h-7"/>}
            {!showTesting && !showDeleting &&
              <Button color={showSampling ? "bg-red-300" : "bg-yellow-300"}
                text={showSampling ? "x" : "Sample"}
                onClick={() => dispatch(setShowSampling('hm'))}
                extraClasses="w-16 h-7"/>}
          </div>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className=" p-2">
        {!showSampling && !showTesting && !showDeleting &&
          <div className="flex flex-col">

            {/* Sample Number Selector */}
            {lot.testing.hm.length > 0 &&
              <div className="grid grid-cols-6 mb-2">
                <label htmlFor="sampleIndex" className="justify-self-end col-span-2 mr-2">
                  Sample #:
                </label>
                <select name="sampleIndex"
                  value={sampleIndex}
                  onChange={(e) => dispatch(setTestingIndex(e.target.value, 'hm'))}
                  className="text-black rounded w-full h-7">
                  {lot.testing.hm.map((hmSample, index) => {
                    return <option key={index} value={index}>
                             {hmSample.sample_number}
                           </option> })}
                </select>
                <Button color={showDeleting ? "bg-red-300" : "bg-red-300"}
                  text={showDeleting ? "x" : "x"}
                  onClick={() => dispatch(setShowDeleting('hm'))}
                  extraClasses="w-7 h-7 pb-1 ml-1"/>
              </div>
            }

            {/* Testing Information Lines*/}
            <HmTestLine
              testName="Arsenic"
              sample={(sampleIndex !== null && lot.testing.length > 0) ? lot.testing.hm[sampleIndex] : null}
              result={(sampleIndex !== null && lot.testing.length > 0) ? lot.testing.hm[sampleIndex].arsenic : null}
              spec={lot.item.hm.arsenic}
              unit={lot.item.hm.units} />
            <HmTestLine
              testName="Cadmium"
              sample={(sampleIndex !== null && lot.testing.length > 0) ? lot.testing.hm[sampleIndex] : null}
              result={(sampleIndex !== null && lot.testing.length > 0) ? lot.testing.hm[sampleIndex].cadmium : null}
              spec={lot.item.hm.cadmium}
              unit={lot.item.hm.units} />
            <HmTestLine
              testName="Lead"
              sample={(sampleIndex !== null && lot.testing.length > 0) ? lot.testing.hm[sampleIndex] : null}
              result={(sampleIndex !== null && lot.testing.length > 0) ? lot.testing.hm[sampleIndex].lead : null}
              spec={lot.item.hm.lead}
              unit={lot.item.hm.units} />
            <HmTestLine
              testName="Mercury"
              sample={(sampleIndex !== null && lot.testing.length > 0) ? lot.testing.hm[sampleIndex] : null}
              result={(sampleIndex !== null && lot.testing.length > 0) ? lot.testing.hm[sampleIndex].mercury : null}
              spec={lot.item.hm.mercury}
              unit={lot.item.hm.units} />

            {lot.item.hm.nickel_tested &&
              <HmTestLine
                testName="Nickel"
                sample={(sampleIndex !== null && lot.testing.length > 0) ? lot.testing.hm[sampleIndex] : null}
                result={(sampleIndex !== null && lot.testing.length > 0) ? lot.testing.hm[sampleIndex].nickel : null}
                spec={lot.item.hm.nickel}
                unit={lot.item.hm.units} />
            }
          </div>
        }

        {/* Sampling, Testing, & Deleting Dialogs*/}
        {showSampling &&
          <AddHmSample
            lotId={lot._id}
            close={() => dispatch(setShowSampling('hm'))} />
        }
        {showTesting &&
          <AddHmResults
            lotId={lot._id}
            test={(sampleIndex !== null && lot.testing.length > 0) && lot.testing.hm[sampleIndex]}
            spec={lot.item.hm}
            close={() => dispatch(setShowTesting('hm'))} />
        }
        {showDeleting &&
          <DeleteHm
            lotId={lot._id}
            test={(sampleIndex !== null && lot.testing.length > 0) && lot.testing.hm[sampleIndex]}
            close={() => dispatch(setShowDeleting('hm'))} />
        }
      </div>
    </div>
  )
}

export default HmTests
