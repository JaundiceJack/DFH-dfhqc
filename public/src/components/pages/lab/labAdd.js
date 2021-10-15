// Import basics
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import server actions
import { addLab } from '../../../actions/labActions.js';
import { clearMessages } from '../../../actions/msgActions.js';
// Import components
import Button     from '../../button.js';
import Message    from '../../message.js';
import TextInput  from '../../textInput.js';

const LabAdd = ({toggleAdd}) => {
  const errorMsg = useSelector(state => state.msg.error);

  // Set internal state variables for the form
  const [labVals, setLabVals] = useState({
    name:               "",
    tat_emergency:      "",
    upcharge_emergency: "",
    tat_rush:           "",
    upcharge_rush:      "",
    tat_standard:       "",
    address_testing:    "",
    address_billiing:   "",
    contact_emails:     "",
    contact_phones:     "",
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

  return (
    <div className="mx-4 my-2">
      <form className="flex flex-col" onSubmit={onSubmit}>
        <div className="">
          <label htmlFor="name" className="flex flex-row items-center font-semibold text-blue-100 whitespace-nowrap">Lab Name:
            <TextInput name="name" value={labVals.name} onEntry={e => onEntry(e)} extraClasses="w-full text-black ml-2 h-8" />
          </label>
        </div>

        <div className="h-6" />
        { badEntries.map(err => <Message error={err} /> )  }
        { errorMsg && <Message error={errorMsg} /> }
        <Button type="submit" color="bg-green-300" text="Add New Lab" extraClasses="h-10" />
      </form>
    </div>
  )
}

export default LabAdd;
