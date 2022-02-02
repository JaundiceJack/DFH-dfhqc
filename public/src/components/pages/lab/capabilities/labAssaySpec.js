// Import basics
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import server actions
import { addLabAssay } from '../../../../actions/labActions.js';
// Import Icons
import { FaPlus, FaMinus } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5'
// Import Components
import Button from '../../../inputs/button.js';
import Spinner from '../../../misc/spinner.js';
import Container from '../../../misc/container.js';
import CapabilityGen from './capabilityGen.js';

const LabAssaySpec = () => {
  const { selectedLab: lab, loading } = useSelector(state => state.lab);

  // Set up the toggle and the form's state
  const [showAddAssay, setShowAddAssay] = useState(false);

  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold flex flex-col h-80 border-l-2 border-gray-500">
      <div className="flex flex-row items-center rounded-t bg-gradient-to-t from-gray-700 to gray-800">
        <h2 className="text-lg text-left px-2 py-1 text-blue-200">Available Assays/IDs</h2>
        <div className="flex-grow" />
        {lab && lab._id && <Button
          color={showAddAssay ? "bg-red-400" : "bg-yellow-300"}
          icon={!showAddAssay ? <FiEdit /> : <IoClose />}
          title="Add Assay"
          onClick={() => setShowAddAssay(!showAddAssay)}
          extraClasses="h-6 mr-5" />}
      </div>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>

      {!showAddAssay ?
        (<div className="flex flex-col h-full overflow-y-scroll">
          <div className="grid grid-cols-5 px-2 py-1">
            <p className="col-span-2">Test Name</p>
            <p>Price</p>
            <p>Exp. TAT</p>
            <p>Method</p>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent "/>
          {loading ? <Spinner /> :
            ((lab && lab.capabilities && lab.capabilities.length > 0) ? lab.capabilities.map((cap, index) => {
              return (
                <div key={index} className="hover:bg-gray-500">
                  <div className="grid grid-cols-5 px-4 py-1">
                    <p className="capitalize col-span-2">{cap.assay ? cap.assay.name : cap.identity && cap.identity.name+" ID"}</p>
                    <p>${cap.price && cap.price.toFixed(2)}</p>
                    <p>{cap.tat !== undefined && cap.tat !== null && `${cap.tat} Days`}</p>
                    <p className="capitalize">{cap.method && cap.method.name}</p>
                  </div>
                  {index !== lab.capabilities.length-1 && <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"/>}
                </div>

              )
            }) :
            <div className="h-full flex items-center justify-center">No Assays/IDs added yet.</div>
          )
        }
        </div>) :
        <CapabilityGen lab={lab} toggle={() => setShowAddAssay(false)} />
      }
    </div>
  )
}

export default LabAssaySpec;
