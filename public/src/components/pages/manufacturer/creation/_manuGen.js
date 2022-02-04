// Import basics
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import server actions
import { addManufacturer, editManufacturer } from '../../../../actions/manufacturerActions.js';
import { clearMessages } from '../../../../actions/msgActions.js';
// Import components
import Button     from '../../../inputs/button.js';
import Message    from '../../../misc/message.js';
import Entry      from '../../../inputs/entry.js';

const ManuGen = ({ toggle, editing=false }) => {
  const selected = useSelector(state => state.manufacturer.selectedManufacturer);
  const errorMsg = useSelector(state => state.msg.error);

  // Set internal state variables for the form
  const [manufacturerVals, setManufacturerVals] = useState({
    name: editing ?
      (selected && selected.name) :
      "",
  });

  // Clear the badEntries warning after the timer runs out
  const dispatch = useDispatch();
  const [badEntries, setBadEntries] = useState([]);
  const clearTimer = useRef(null);
  const setClear   = () => {
    clearTimer.current = setTimeout(() => {
      setBadEntries([]);
      dispatch(clearMessages());
      clearTimer.current = null;
    }, 5000);
  }
  // Clear the timer on unmount
  useEffect(() => {
    return () => { clearTimer.current && clearTimeout(clearTimer.current) };
  }, [dispatch]);

  // Handle the new manufacturer form submission
  const onSubmit = e => {
    e.preventDefault();
    // Validate Entries
    let errs = []
    if (manufacturerVals.name === "" || manufacturerVals.name === null)
      errs.push("Please enter a manufacturer name.");
    setBadEntries(errs);
    // Create a new manufacturer
    if (errs.length === 0 && !clearTimer.current) {
      editing ?
        dispatch(editManufacturer(manufacturerVals)) :
        dispatch(addManufacturer(manufacturerVals)); }
    // Hide the form on submission
    errs.length !== 0 && !clearTimer.current ? setClear() : toggle();
  }

  // Handle events
  const onEntry = (e) => { setManufacturerVals({...manufacturerVals, [e.target.name]: e.target.value })}
  const onClick = (e) => { setManufacturerVals({...manufacturerVals, [e.target.name]: !manufacturerVals[e.target.name] })}

  return (
    <div className="mx-4 my-2">
      <form className="flex flex-col" onSubmit={onSubmit}>
        <div className="">
          <Entry
            label="Name:"
            placeholder="name"
            name="name"
            value={manufacturerVals.name}
            onChange={e => onEntry(e)} />
        </div>

        <div className="h-6" />
        { badEntries.map(err => <Message error={err} /> )  }
        { errorMsg && <Message error={errorMsg} /> }
        <Button type="submit" color="bg-green-300" text="Submit" extraClasses="h-10" />
      </form>
    </div>
  )
}

export default ManuGen;
