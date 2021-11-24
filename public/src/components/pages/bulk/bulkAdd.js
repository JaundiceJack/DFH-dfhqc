import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBulk } from '../../../actions/bulkActions';
import AddBasic from '../add/addBasic';
import AddBlendItem from '../add/addBlendItem';
import AddBulkInfo from '../add/addBulkInfo';

const BulkAdd = ({ toggleAdd }) => {
  // Get the list of possible raw ingredients
  const raws = useSelector(state => state.raw.raws);
  const blends = useSelector(state => state.blend.blends);
  const units = useSelector(state => state.raw.units);
  const caps = raws.filter(raw => raw.texture.name === 'empty capsule');
  // Set internal state variables for the form
  const [bulkVals, setBulkVals] = useState(
    {
      number:         "",
      name:           "",
      blendId:        blends.length > 0 ? blends[0]._id : "",
      capId:          caps.length > 0   ? caps[0]._id   : "",
      dosage_type:     'capsule',
      serving_units:   'mg',
      fill_weight:     "",
      batch_size:      "",
      capsule_weight:  "",
      net_weight:      "",
      caps_per_batch:   "",
      caps_per_serving: "",
      caps_per_bottle:  "",
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
    if (typeof bulkVals.number === 'number' )
      errs.push("Item number must be a number.");
    if (bulkVals.name === "" || bulkVals.name === null )
      errs.push("Please enter an item name.");
    setBadEntries(errs);
    // Create a new bulk
    if (errs.length === 0 && !clearTimer.current) { dispatch(addBulk(bulkVals)); }
    // Hide the form on submission
    errs.length !== 0 && !clearTimer.current ? setClear() : toggleAdd();
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
                       ifEditing={false} />
        <AddBlendItem  vals={bulkVals}
                       onEntry={onEntry}
                       ifEditing={false}
                       blendOptions={blends} />
        <AddBulkInfo  vals={bulkVals}
                       onEntry={onEntry}
                       capOptions={caps}
                       ifEditing={false} />

        { badEntries.map(err => <div className={errorMsgCs}>{err}</div> )  }
        <button type="submit" className={buttonCs}>
          Add New Bulk
        </button>
      </form>
    </div>
  )
}

export default BulkAdd;
