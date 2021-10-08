import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../button.js';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5'
import { addLabAssay } from '../../../actions/labActions.js';

const LabAssaySpec = ({lab}) => {
  // Get the assays and methods from the state
  const assays = useSelector( state => state.assay.assays);
  const methods = useSelector( state => state.method.methods);

  // Set up the toggle and the form's state
  const [showAddAssay, setShowAddAssay] = useState(false);
  const [addedAssays, setAddedAssays] = useState(
    [{ assay: assays[0] || "", method: methods[0] || "",  price: 0 }]);

  // Handle adding, editing, and removing assays in the component
  const addAssay = () => {
    setAddedAssays([
      ...addedAssays,
      { assay: assays[0] || "", method: methods[0] || "", price: 0 }
    ]);
  };
  const editAssay = (e, index) => {
    let edited = [...addedAssays];
    edited[index][e.target.name] = e.target.value;
    setAddedAssays(edited);
  };
  const removeAssay = () =>
    setAddedAssays(addedAssays.slice(0, addedAssays.length-1));

  // On form submission, add the selected assays to the lab's capabilities
  const dispatch = useDispatch();
  const addAssays = (e) => {
    e.preventDefault();
    dispatch(addLabAssay(lab._id, addedAssays));
  };

  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold flex flex-col">
      <div className="flex flex-row items-center">
        <h2 className="text-lg text-left px-2 py-1 text-blue-200">Available Assays</h2>
        <div className="flex-grow" />
        <Button
          color={showAddAssay ? "bg-red-300" : "bg-green-300"}
          icon={!showAddAssay ? <FaPlus /> : <IoClose />}
          title="Add Assay"
          onClick={() => setShowAddAssay(!showAddAssay)}
          extraClasses="h-6" />
      </div>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>

      {!showAddAssay ?
        (<div className="flex flex-col">
          {lab.assays && lab.assays.map((assay, index) => {
            return (
              <div className="grid grid-cols-3">
                <p className="capitalize">{assay.assay.name}</p>
                <p>{assay.price}</p>
                <p className="capitalize">{assay.method.name}</p>
              </div>
            )
          })}
        </div>) :
        (<form onSubmit={addAssays} className="flex flex-col p-2 h-full">
          {addedAssays.map((test, index) => {
            return (<div key={index}>
              <label htmlFor="name" className="grid grid-cols-4 mb-2 pr-4 text-right">Name:
                <select name="assayId"
                  value={addedAssays[index].assayId}
                  onChange={(e) => editAssay(e, index)}
                  className="ml-2 pl-1 text-black rounded col-span-3">
                  {assays.map((assay, i) => {
                    return (<option key={i} value={assay._id}>{assay}</option>)
                  })}
                </select>
              </label>
              <label htmlFor="method" className="grid grid-cols-4 mb-2 pr-4 text-right">Method:
                <select name="methodId"
                  value={addedAssays[index].methodId}
                  onChange={(e) => editAssay(e, index)}
                  className="ml-2 pl-1 text-black rounded col-span-3">
                  {methods.map((method, i) => {
                    return (<option key={i} value={method}>{method}</option>)
                  })}
                </select>
              </label>
              <label htmlFor="price" className="grid grid-cols-4 mb-4 pr-4 text-right">Price:
                <input type="text"
                  name="price"
                  value={addedAssays[index].price}
                  onChange={(e) => editAssay(e, index)}
                  className="ml-2 pl-1 text-black rounded w-full" />
              </label>
            </div>)
          })}
          <div className="flex-grow" />
          <div className="grid grid-cols-2 ">
            <Button
              color="bg-green-300"
              type="submit"
              text="Submit"
              title="Submit Assays"
              extraClasses="row-span-2" />
            <div className="flex flex-col row-span-2">
              <Button
                color="bg-blue-300"
                icon={<FaPlus />}
                title="Add Assay"
                onClick={addAssay}
                extraClasses="h-6" />
              <div className="mb-2"></div>
              <Button
                color="bg-red-300"
                icon={<FaMinus />}
                title="Remove Assay"
                onClick={removeAssay}
                extraClasses="h-6" />
            </div>
          </div>

        </form>)
      }
    </div>
  )
}

export default LabAssaySpec;
