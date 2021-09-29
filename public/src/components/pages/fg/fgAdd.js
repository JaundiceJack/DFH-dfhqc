import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFg } from '../../../actions/fgActions';
import AddBasic from '../add/addBasic';

const FgAdd = ({ toggleAdd }) => {
  // Get the list of possible raw ingredients
  const raws = useSelector(state => state.raw.raws);
  const blends = useSelector(state => state.blend.blends);
  const units = useSelector(state => state.raw.units);
  // Set internal state variables for the form
  const [fgVals, setFgVals] = useState(
    {
      number: "",
      name:   "",
      fgId: ""
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
    return () => { clearTimer.current && clearTimeout(clearTimer.current) };
  }, [dispatch]);

  // Handle the new fg form submission
  const onSubmit = e => {
    e.preventDefault();
    // Validate Entries
    let errs = []
    if (fgVals.number === "" || fgVals.number === null)
      errs.push("Please enter an item number.");
    if (typeof fgVals.number === 'number' )
      errs.push("Item number must be a number.");
    if (fgVals.name === "" || fgVals.name === null )
      errs.push("Please enter an item name.")
    setBadEntries(errs);
    // Create a new fg
    if (errs.length === 0 && !clearTimer.current) { dispatch(addFg(fgVals)); }
    // Hide the form on submission
    errs.length !== 0 && !clearTimer.current ? setClear() : toggleAdd();
  }

  // Handle events
  const onEntry = (e) => { setFgVals({...fgVals, [e.target.name]: e.target.value })}
  //const onClick = (e) => { setFgVals({...fgVals, [e.target.name]: !fgVals[e.target.name] })}

  // Compose classes
  const buttonCs = " rounded py-1 px-2 mx-1 font-semibold transform duration-75" +
                   " ease-in-out hover:scale-105 hover:opacity-75 opacity-50 " +
                   " bg-green-300 col-span-2 mt-4 mx-auto ";
  const errorMsgCs = " px-3 py-2 mb-2 font-semibold text-white rounded-xl" +
                     " border-l border-gray-500 bg-gradient-to-tl" +
                     " from-red-900 to-gray-900 fadeError ";

  return (
    <div>
      <form className="flex flex-col" onSubmit={onSubmit}>

        <AddBasic      vals={fgVals}
                       onEntry={onEntry}
                       ifEditing={false} />

        { badEntries.map(err => <div className={errorMsgCs}>{err}</div> )  }
        <button type="submit" className={buttonCs}>
          Add New Finished Good
        </button>
      </form>
    </div>
  )
}

export default FgAdd;
