// Import basics
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import server actions
import { setAssayTestingIndex, setShowSamplingAssay, setShowTestingAssay, setShowDeletingAssay }
  from '../../../../../actions/lotActions.js';
// Import icons
import { BiPlus } from 'react-icons/bi';
// Import Components
import Button from '../../../../button.js';
import AddAssaySample  from './addAssaySample.js';
import AddAssayResults from './addAssayResults.js';
import DeleteAssay     from './deleteAssay.js';
import AssayTestLine   from './assayTestLine.js';

// so i need to present each assay
// but where to put currentIndex and how to tie it in
// might need separate actions for them
// the difficulty is the variable number of assays
// and whether the sample number should be tied to each or general for all of them
// preference is tied to each


const AssayTests = ({ lot }) => {
  // Make the dispatch to issue server actions
  const dispatch = useDispatch();

  // Bring in vars from redux
  const { sampleIndices, currentAssay, showSampling, showTesting, showDeleting } =
    useSelector(state => state.lot.testing.assays);

  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      {/* Dialog title & exit buttons */}
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-lg text-left px-4 py-1 text-blue-200">Assays</h3>
        {showSampling &&
          <Button color="bg-red-300" text="x" extraClasses="w-7 h-7"
            onClick={() => dispatch(setShowSamplingAssay(false, null))} /> }
        {showTesting &&
          <Button color="bg-red-300" text="x" extraClasses="w-7 h-7"
            onClick={() => dispatch(setShowTestingAssay(false, null))} /> }
      </div>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>

      <div className="p-2">
        {/* Hide testing info if doing something to an assay */}
        {!showSampling && !showTesting && !showDeleting &&
          <div className="flex flex-col">

            {/* Testing Information Lines*/}
            {lot.item.assays.map((assay, index) => {
              // Get the sample info found in the database already
              const currentAssaySample = lot.testing.assay.find(a =>
                a.assay === assay.assay._id) || {samples:[]};
              // Get the current assay sample to display
              const current = sampleIndices && sampleIndices.find(a =>
                a.currentAssay === assay.assay._id);
              const currentIndex = current ? current.index : null;

              return <div key={index} className="grid grid-cols-12 mb-2">

                <div className="col-span-12 flex flex-row justify-start">

                  {/* Sampling and testing buttons */}
                  <Button color="bg-yellow-300" text="S" extraClasses="w-7 h-7"
                    onClick={() => dispatch(setShowSamplingAssay(true, assay.assay._id))}
                    title="New Sample" />
                  {currentAssaySample.samples.length > 0 &&
                    <Button color="bg-green-300" text="T" extraClasses="w-7 h-7"
                      onClick={() => dispatch(setShowTestingAssay(true, assay.assay._id))}
                      title="Add Testing to Sample" />
                  }
                  {/* Sample Number Selector */}
                  {currentAssaySample.samples.length > 0 &&
                    <div className="grid grid-cols-2 mr-1">
                      <label htmlFor="currentIndex" className="justify-self-end mr-1">
                        S#:
                      </label>
                      <select name="currentIndex" value={currentIndex || ""}
                        onChange={(e) => dispatch(setAssayTestingIndex(e.target.value, assay.assay._id))}
                        className="text-black rounded w-9 h-7">
                        {currentAssaySample.samples.map((assaySample, index) => {
                          return <option key={index} value={index}>{assaySample.sample_number}</option>
                        })}
                      </select>
                    </div>
                  }
                  {/* Remove current sample button */}
                  {currentAssaySample.samples.length > 0 &&
                    <Button color="bg-red-300" text="x" extraClasses="w-7 h-7 pb-1"
                      onClick={() => dispatch(setShowDeletingAssay(true, assay.assay._id))}
                      title="Remove Sample" />
                  }
                </div>

                {/* Testing information lines */}
                <div className="col-span-11">
                  <AssayTestLine testName={assay.assay.name}
                    min={assay.min} max={assay.max} result={""}
                    sample={
                      (currentIndex !== null && currentAssaySample.samples.length > 0) ?
                      currentAssaySample.samples[currentIndex] : null
                    } />
                </div>


              </div>
            })}
          </div>
        }

        {/* Sampling, Testing, & Deleting Dialogs */}
        {showSampling &&
          <AddAssaySample
            lotId={lot._id}
            assay={lot.item.assays.find(a=> a.assay._id === currentAssay)}
            close={() => dispatch(setShowSamplingAssay(false, null))} />
        }
        {showTesting &&
          <AddAssayResults
            lotId={lot._id}
            spec={lot.item.assays}
            close={() => dispatch(setShowTestingAssay(false, null))} />
        }
        {showDeleting &&
          <DeleteAssay
            lotId={lot._id}
            testId={currentAssay}
            sampleNumber={sampleIndices.find(s=>s.assayId === currentAssay).index}
            close={() => dispatch(setShowDeletingAssay(false, null))} />
        }
      </div>
    </div>
  )
}

export default AssayTests
