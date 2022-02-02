// Import basics
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import server actions
import { addVendor } from '../../../actions/vendorActions.js';
import { clearMessages } from '../../../actions/msgActions.js';
// Import components
import Button     from '../../inputs/button.js';
import Message    from '../../misc/message.js';
import TextInput  from '../../inputs/textInput.js';

const VendorEdit = ({toggleEdit}) => {
  const selected = useSelector(state => state.vendor.selectedVendor);
  const errorMsg = useSelector(state => state.msg.error);

  // Set internal state variables for the form
  const [vendorVals, setVendorVals] = useState({
    name: selected.name,
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

  // Handle the new vendor form submission
  const onSubmit = e => {
    e.preventDefault();
    // Validate Entries
    let errs = []
    if (vendorVals.name === "" || vendorVals.name === null)
      errs.push("Please enter a vendor name.");
    setBadEntries(errs);
    // Create a new vendor
    if (errs.length === 0 && !clearTimer.current) { dispatch(addVendor(vendorVals)); }
    // Hide the form on submission
    errs.length !== 0 && !clearTimer.current ? setClear() : toggleEdit();
  }

  // Handle events
  const onEntry = (e) => { setVendorVals({...vendorVals, [e.target.name]: e.target.value })}
  const onClick = (e) => { setVendorVals({...vendorVals, [e.target.name]: !vendorVals[e.target.name] })}

  return (
    <div className="mx-4 my-2">
      <form className="flex flex-col" onSubmit={onSubmit}>
        <div className="">
          <label htmlFor="name" className="flex flex-row justify-between items-end text-blue-100">Vendor Name:
            <TextInput
              name="name"
              value={vendorVals.name}
              onEntry={e => onEntry(e)}
              extraClasses="text-black h-8" />
          </label>
        </div>

        <div className="h-6" />
        { badEntries.map(err => <Message error={err} /> )  }
        { errorMsg && <Message error={errorMsg} /> }
        <Button type="submit" color="bg-green-300" text="Apply Changes" extraClasses="h-10" />
      </form>
    </div>
  )
}

export default VendorEdit;
