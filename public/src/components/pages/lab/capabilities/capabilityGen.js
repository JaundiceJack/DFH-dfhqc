// Import basics
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import server actions
import { editLab } from '../../../../actions/labActions.js';
import { clearMessages } from '../../../../actions/msgActions.js';
// Import components
import Button     from '../../../inputs/button.js';
import Message    from '../../../misc/message.js';
import Entry      from '../../../inputs/entry.js';
import Selection  from '../../../inputs/selection.js';
import Divider    from '../../../misc/divider.js';

const CapabilityGen = ({ lab, toggle }) => {
  const assays = useSelector(state => state.assay.assays.sort((a, b) => {
    var assay1 = a.name.toUpperCase(); // ignore upper and lowercase
    var assay2 = b.name.toUpperCase(); // ignore upper and lowercase
    if (assay1 < assay2) { return -1; }
    if (assay1 > assay2) { return 1; }
    return 0;
  }));
  const identities = useSelector(state => state.identity.identities);
  const methods = useSelector(state => state.method.methods);
  const errorMsg = useSelector(state => state.msg.error);

  // Set internal state variables for the form
  const [capabilities, setCapabilities] = useState((lab && lab.capabilities) ?
    lab.capabilities.map(cap => {
      return {
        type:     cap.assay ? 'assay' : 'identity',
        assay:    cap.assay ? cap.assay._id : null,
        identity: cap.identity ? cap.identity._id : null,
        price:    cap.price,
        method:   cap.method ? cap.method._id : null,
        tat:      cap.tat
      }
    }
  ) : []);

  // Insert a new capability to the lab's list
  const onAddCap = () => {
    const newCap = {
      type:     "assay",
      assay:    (assays && assays.length > 0) ? assays[0] : null,
      identity: null,
      price:    "",
      method:   (methods && methods.length > 0) ? methods[0] : null,
      tat:      10
    }
    setCapabilities([...capabilities, newCap]);
  }
  // Remove the capability at the selected index
  const onRemoveCap = (index) => {
    setCapabilities([...capabilities.slice(0, index), ...capabilities.slice(index+1, capabilities.length)]);
  }
  // Edit the property for the capability at the selected index
  const onEditCap = (e, index) => {
    let cap = capabilities[index];
    cap[e.target.name] = e.target.value;
    setCapabilities([...capabilities.slice(0, index), cap, ...capabilities.slice(index+1, capabilities.length)])
  }
  // Swap the test type to assay or identity
  const onTypeSwap = (e, index) => {
    let cap = capabilities[index];
    if (e.target.value === 'assay') {
      cap.identity = null;
      cap.assay = (assays && assays.length > 0) ? assays[0] : null;
    }
    else if (e.target.value === 'identity') {
      cap.assay = null;
      cap.identity = (identities && identities.length > 0) ? identities[0] : null
    }
    cap.type = e.target.value;
    setCapabilities([...capabilities.slice(0, index), cap, ...capabilities.slice(index+1, capabilities.length)])
  }

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

  // Handle the capabilities form submission
  const onSubmit = e => {
    e.preventDefault();
    // Validate Entries
    let errs = []
    if (capabilities.assay === "" && capabilities.identity === null)
      errs.push("Please select a test.");
    setBadEntries(errs);
    // Submit the lab's capabilities to save
    if (errs.length === 0 && !clearTimer.current) {
      dispatch(editLab({
        ...lab,
        capabilities: capabilities
      })
    )}
    // Hide the form on submission
    errs.length !== 0 && !clearTimer.current ? setClear() : toggle();
  }

  return (
    <div className="px-4 py-2 overflow-y-scroll h-full">
      <form className="flex flex-col h-full" onSubmit={onSubmit}>

          <h3 className="text-center font-semibold text-lg text-blue-100 mb-2">Add/Edit Capabilities</h3>

          {capabilities && capabilities.map((cap, index) => {
            return <div key={index}>
              <div className="grid grid-cols-6">
                <Selection label="Test Type:"
                  name="type"
                  value={cap.type}
                  onChange={e => onTypeSwap(e, index)}
                  options={[{name: "Assay", value: "assay"}, {name: "Identity", value: "identity"}]}
                  extraClasses="col-span-5" />

                {cap.type === 'assay' &&
                  <Selection label="Assay:"
                    name="assay"
                    value={cap.assay}
                    onChange={e => onEditCap(e, index)}
                    options={assays.map(assay => {return {name: assay.name, value: assay._id}})}
                    extraClasses="col-span-5"/>}
                {cap.type === 'identity' &&
                  <Selection label="Identity:"
                    name="identity"
                    value={cap.identity}
                    onChange={e => onEditCap(e, index)}
                    options={identities.map(id => {return {name: id.name, value: id._id}})}
                    extraClasses="col-span-5"/>}

                <Selection label="Method:"
                  name="method"
                  value={cap.method}
                  onChange={e => onEditCap(e, index)}
                  options={methods.map(method => {return {name: method.name, value: method._id}})}
                  extraClasses="col-span-5"/>
                <Entry label="Price:"
                  placeholder="price"
                  append="Dollars"
                  name="price"
                  value={cap.price}
                  onChange={e => onEditCap(e, index)}
                  extraClasses="col-span-5"/>

                  <Entry label="Standard TAT:"
                    placeholder="tat"
                    append="Days"
                    name="tat"
                    value={cap.tat}
                    onChange={e => onEditCap(e, index)}
                    extraClasses="col-span-5 mb-2" />
                  <Button text="Remove"
                    color="bg-red-300"
                    onClick={() => onRemoveCap(index)}
                    extraClasses="h-8 w-16 self-center"/>

              </div>
              {index !== capabilities.length-1 && <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent my-2"/>}
            </div>
          })}


        <div className="h-6" />
        { badEntries.map(err => <Message error={err} /> )  }
        { errorMsg && <Message error={errorMsg} /> }
        <div className="grid grid-cols-2 gap-4 pb-4 mt-4">
          <Button text="Add Capability" color="bg-blue-300" onClick={onAddCap} extraClasses="h-10"/>
          <Button type="submit" color="bg-green-300" text="Submit Changes" extraClasses="h-10" />
        </div>

      </form>
    </div>
  )
}

export default CapabilityGen;
