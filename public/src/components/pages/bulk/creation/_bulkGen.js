// Import basics
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import server actions
import { addBulk, editBulk } from '../../../../actions/bulkActions';
// Import form components
import BasicGen     from './basicGen.js';
import BlendUsedGen from './blendUsedGen.js';
import BulkInfoGen  from './bulkInfoGen.js';
// Import other components
import Button        from '../../../inputs/button.js';
import Message       from '../../../misc/message.js';

const BulkGen = ({ toggle, editing=false }) => {
  // Get the list of possible raw ingredients
  const selected = useSelector(state => state.bulk.selectedBulk);
  const raws     = useSelector(state => state.raw.raws);
  const blends   = useSelector(state => state.blend.blends);
  const units    = useSelector(state => state.raw.units);

  // Set internal state variables for the form
  const [bulkVals, setBulkVals] = useState({
    _id: editing ?
      (selected && selected._id) :
      null,
    number: editing ?
      (selected && selected.number) :
      "",
    name: editing ?
      (selected && selected.name) :
      "",
    blend: editing ?
      (selected && selected.blend && selected.blend._id) :
      null,
    dosage_type: editing ?
      (selected && selected.dosage_type) :
      "capsule",
    capsule: editing ?
      (selected && selected.capsule && selected.capsule._id) :
      null,
    serving_units: editing ?
      (selected && selected.serving_units) :
      "mg",
    batch_size: editing ?
      (selected && selected.batch_size) :
      "",
    fill_weight: editing ?
      (selected && selected.fill_weight) :
      "",
    capsule_weight: editing ?
      (selected && selected.capsule_weight) :
      "",
    net_weight: editing ?
      (selected && selected.net_weight) :
      "",
    caps_per_batch: editing ?
      (selected && selected.caps_per_batch) :
      "",
    caps_per_serving: editing ?
      (selected && selected.caps_per_serving) :
      "",
    caps_per_bottle: editing ?
      (selected && selected.caps_per_bottle) :
      ""
  });

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
    if (errs.length === 0 && !clearTimer.current) { editing ? dispatch(editBulk(bulkVals)) : dispatch(addBulk(bulkVals)); }
    // Hide the form on submission
    errs.length !== 0 && !clearTimer.current ? setClear() : toggle();
  }

  // Handle events
  const onEntry = (e) => { setBulkVals({...bulkVals, [e.target.name]: e.target.value })}
  const onClick = (e) => { setBulkVals({...bulkVals, [e.target.name]: !bulkVals[e.target.name] })}

  return (
    <div className="mx-4 my-2">
      <form className="flex flex-col" onSubmit={onSubmit}>

        <BasicGen vals={bulkVals} onEntry={onEntry} ifEditing={editing} />

        <BlendUsedGen vals={bulkVals} onEntry={onEntry} ifEditing={editing}
          blendOptions={blends} />

        <BulkInfoGen vals={bulkVals} onEntry={onEntry} ifEditing={editing}
          capOptions={raws.filter(raw => raw.texture.name.toLowerCase() === 'empty capsule')} />

        { badEntries.map(err => <Message error={err} /> )  }
        <Button type="submit" color="bg-green-300" text="Submit" extraClasses="h-10" />
      </form>
    </div>
  )
}

export default BulkGen;
