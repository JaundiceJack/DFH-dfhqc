// Import basics
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import server actions
import { addFg, editFg } from '../../../../actions/fgActions.js';
// Import form components
import BasicGen from './basicGen.js';
// Import other components
import Button  from '../../../inputs/button.js';
import Message from '../../../misc/message.js';

const FgGen = ({ toggle, editing=false }) => {
  // Get the list of possible raw ingredients
  const selected = useSelector(state => state.fg.selectedFg);
  const raws     = useSelector(state => state.raw.raws);
  const blends   = useSelector(state => state.blend.blends);
  const units    = useSelector(state => state.raw.units);

  // Set internal state variables for the form
  const [fgVals, setFgVals] = useState(
    {
      _id: editing ?
        (selected && selected._id) :
        null,
      number: editing ?
        (selected && selected.number) :
        "",
      name: editing ?
        (selected && selected.name) :
        ""
    }
  );

  // Clear the badEntries after the timer runs out and get options on load
  const [badEntries, setBadEntries] = useState([]);
  const clearTimer = useRef(null);
  const setClear   = () => {
    clearTimer.current = setTimeout(() => {
      setBadEntries([]);
      clearTimer.current = null;
    }, 5000);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    return () => { clearTimer.current && clearTimeout(clearTimer.current) }
  }, [dispatch]);

  // Handle the new fg form submission
  const onSubmit = e => {
    e.preventDefault();
    // Validate Entries
    let errs = []
    if (fgVals.number === "" || fgVals.number === null)
      errs.push("Please enter an item number.");
    if (fgVals.name === "" || fgVals.name === null )
      errs.push("Please enter an item name.")
    setBadEntries(errs);
    // Create a new fg
    if (errs.length === 0 && !clearTimer.current) { editing ? dispatch(editFg(fgVals)) : dispatch(addFg(fgVals)); }
    // Hide the form on submission
    errs.length !== 0 && !clearTimer.current ? setClear() : toggle();
  }

  // Handle events
  const onEntry = (e) => { setFgVals({...fgVals, [e.target.name]: e.target.value })}
  const onClick = (e) => { setFgVals({...fgVals, [e.target.name]: !fgVals[e.target.name] })}

  return (
    <div className="mx-4 my-2">
      <form className="flex flex-col" onSubmit={onSubmit}>

        <BasicGen vals={fgVals} onEntry={onEntry} ifEditing={editing} />

        { badEntries.map(err => <Message error={err} /> )  }
        <Button type="submit" color="bg-green-300" text="Submit" extraClasses="h-10" />
      </form>
    </div>
  )
}

export default FgGen;
