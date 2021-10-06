import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLab } from '../../../actions/labActions.js';
import { clearMessages } from '../../../actions/msgActions.js';
import Message    from '../../message.js';
import TextInput  from '../../textInput.js';

const LabAdd = ({toggleAdd}) => {
  // Set internal state variables for the form
  const [labVals, setLabVals] = useState({
    name: "",
    tat_emergency: "",
    upcharge_emergency: "",
    tat_rush: "",
    upcharge_rush: "",
    tat_standard: "",
    address_testing: "",
    address_billiing: "",
    contact_emails: "",
    contact_phones: "",
  });
  const errorMsg = useSelector(state => state.msg.error);

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

  // Handle the new lab form submission
  const onSubmit = e => {
    e.preventDefault();
    // Validate Entries
    let errs = []
    if (labVals.name === "" || labVals.name === null)
      errs.push("Please enter a lab name.");
    setBadEntries(errs);
    // Create a new lab
    if (errs.length === 0 && !clearTimer.current) { dispatch(addLab(labVals)); }
    // Hide the form on submission
    errs.length !== 0 && !clearTimer.current ? setClear() : toggleAdd();
  }

  // Handle events
  const onEntry = (e) => { setLabVals({...labVals, [e.target.name]: e.target.value })}
  const onClick = (e) => { setLabVals({...labVals, [e.target.name]: !labVals[e.target.name] })}


  // Compose classes
  const buttonCs = " rounded py-1 px-2 mx-1 font-semibold transform duration-75" +
                   " ease-in-out hover:scale-105 hover:opacity-75 opacity-50 " +
                   " bg-green-300 col-span-2 mt-4 mx-auto ";


  return (
    <div className="mx-4 my-2">
      <form className="flex flex-col" onSubmit={onSubmit}>
        <div className="">
          <label htmlFor="name" className="flex flex-row justify-between items-end text-blue-100">Lab Name:
            <TextInput name="name" value={labVals.name} onEntry={e => onEntry(e)} extraClasses="text-black h-8" />
          </label>
        </div>


        { badEntries.map(err => <Message error={err} /> )  }
        { errorMsg && <Message error={errorMsg} /> }
        <button type="submit" className={buttonCs}>
          Add New Lab
        </button>
      </form>
    </div>
  )
}

export default LabAdd;
