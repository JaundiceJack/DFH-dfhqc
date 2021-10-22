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
import DeletePest      from './deletePest.js';
import DeleteSolvent   from './deleteSolvent.js';
import DeleteRancidity from './deleteRancidity.js';
import PestTestLine      from './pestTestLine.js';
import SolventTestLine   from './solventTestLine.js';
import RancidityTestLine from './rancidityTestLine.js';
import AddPestSample      from './addPestSample.js';
import AddSolventSample   from './addSolventSample.js';
import AddRanciditySample from './addRanciditySample.js';
import AddPestResults      from './addPestResults.js';
import AddSolventResults   from './addSolventResults.js';
import AddRancidityResults from './addRancidityResults.js';

const AnnualTests = ({ lot }) => {
  // Make the dispatch to issue server actions
  const dispatch = useDispatch();

  // Bring in vars from redux
  const { sampleIndexPesticide, sampleIndexSolvent, sampleIndexRancidity,
          showSampling, showTesting, showDeleting } =
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
              <div className="grid grid-cols-3 mb-2">
                <label htmlFor="sampleIndex" className="justify-self-end mr-2">
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
            <PestTestLine
              testName="Pesticides"
              sample={sampleIndexPesticide !== null ? lot.testing.pesticide[sampleIndexPesticide] : null}
              result={sampleIndexPesticide !== null ? lot.testing.pesticide[sampleIndexPesticide].result : null}
              spec={lot.item.pesticide.tested} />
            <SolventTestLine
              testName="Solvents"
              sample={sampleIndexSolvent !== null ? lot.testing.solvent[sampleIndexSolvent] : null}
              result={sampleIndexSolvent !== null ? lot.testing.solvent[sampleIndexSolvent].result : null}
              spec={lot.item.solvent.tested} />
            <RancidityTestLine
              testName="Peroxide"
              sample={sampleIndexRancidity !== null ? lot.testing.rancidity[sampleIndexRancidity] : null}
              result={sampleIndexRancidity !== null ? lot.testing.rancidity[sampleIndexRancidity].peroxide : null}
              spec={lot.item.rancidity.peroxide} />
            <RancidityTestLine
              testName="Anisidine"
              sample={sampleIndexRancidity !== null ? lot.testing.rancidity[sampleIndexRancidity] : null}
              result={sampleIndexRancidity !== null ? lot.testing.rancidity[sampleIndexRancidity].anisidine : null}
              spec={lot.item.rancidity.anisidine} />
            <RancidityTestLine
              testName="TOTOX"
              sample={sampleIndexRancidity !== null ? lot.testing.rancidity[sampleIndexRancidity] : null}
              result={sampleIndexRancidity !== null ? lot.testing.rancidity[sampleIndexRancidity].peroxide + 2 * (lot.testing.rancidity[sampleIndexRancidity].anisidine) : null}
              spec={lot.item.rancidity.peroxide} />
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
            test={sampleIndex !== null && lot.testing.hm[sampleIndex]}
            spec={lot.item.hm}
            close={() => dispatch(setShowTesting('hm'))} />
        }
        {showDeleting &&
          <DeleteHm
            lotId={lot._id}
            test={sampleIndex !== null && lot.testing.hm[sampleIndex]}
            close={() => dispatch(setShowDeleting('hm'))} />
        }
      </div>
    </div>
  )
}

export default AnnualTests
