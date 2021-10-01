import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editBulk } from '../../../actions/bulkActions';
import AddBasic from '../add/addBasic';
import AddBlendItem from '../add/addBlendItem';
import AddBulkInfo from '../add/addBulkInfo';

const BulkEdit = ({ toggleEdit }) => {
  // Get the list of possible raw ingredients
  const selected = useSelector(state => state.bulk.selectedBulk);
  const raws = useSelector(state => state.raw.raws);
  const blends = useSelector(state => state.blend.blends);
  const units = useSelector(state => state.raw.units);
  // Set internal state variables for the form
  const [bulkVals, setBulkVals] = useState(
    {
      _id: selected._id,
      number: selected.number,
      name:   selected.name,
      blendId: selected.blend.blend_id,
      capId: selected.cap_size.cap_id,
      dosageType: selected.dosage_type,
      servingUnits: selected.serving_units,
      batchSize: selected.batch_size,
      fillWeight: selected.fill_weight,
      capsuleWeight: selected.capsule_weight,
      netWeight: selected.net_weight,
      capsPerBatch: selected.caps_per_batch,
      capsPerServing: selected.caps_per_serving,
      capsPerBottle: selected.caps_per_bottle,
    }
  );

  // Clear the badEntries after the timer runs out and get options on load
  const [badEntries, setBadEntries] = useState([]);
  const clearTimer = useRef(null);
  const setClear   = () => { clearTimer.current = setTimeout(() => {
      setBadEntries([]);
      clearTimer.current = null;
    }, 5000);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    return () => { clearTimer.current && clearTimeout(clearTimer.current) };
  }, [dispatch]);

  // Handle the new bulk form submission
  const onSubmit = e => {
    e.preventDefault();
    // Validate Entries
    let errs = []
    if (bulkVals.number === "" || bulkVals.number === null)
      errs.push("Please enter an item number.");
    if (bulkVals.name === "" || bulkVals.name === null )
      errs.push("Please enter an item name.")
    setBadEntries(errs);
    // Create a new bulk
    if (errs.length === 0 && !clearTimer.current) { dispatch(editBulk(bulkVals)); }
    // Hide the form on submission
    errs.length !== 0 && !clearTimer.current ? setClear() : toggleEdit();
  }

  // Handle events
  const onEntry = (e) => { setBulkVals({...bulkVals, [e.target.name]: e.target.value })}
  //const onClick = (e) => { setBulkVals({...bulkVals, [e.target.name]: !bulkVals[e.target.name] })}

  // Compose classes
  const buttonCs = " rounded py-1 px-2 mx-1 font-semibold transform duration-75" +
                   " ease-in-out hover:scale-105 hover:opacity-75 opacity-50 " +
                   " bg-green-300 col-span-2 mt-4 mx-auto ";
  const errorMsgCs = " px-3 py-2 mb-2 font-semibold text-white rounded-xl" +
                     " border-l border-gray-500 bg-gradient-to-tl" +
                     " from-red-900 to-gray-900 fadeError ";

  return (
    <div className="mx-4 my-2">
      <form className="flex flex-col" onSubmit={onSubmit}>

        <AddBasic      vals={bulkVals}
                       onEntry={onEntry}
                       ifEditing={true} />
        <AddBlendItem  vals={bulkVals}
                       onEntry={onEntry}
                       ifEditing={true}
                       blendOptions={blends} />
        <AddBulkInfo  vals={bulkVals}
                       onEntry={onEntry}
                       capOptions={raws.filter(raw => raw.texture === 'Empty Capsule')}
                       ifEditing={true} />

        { badEntries.map(err => <div className={errorMsgCs}>{err}</div> )  }
        <button type="submit" className={buttonCs}>
          Edit Bulk
        </button>
      </form>
    </div>
  )
}

export default BulkEdit;
