// Import basics
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import server actions
import { addLab, editLab } from '../../../../actions/labActions.js';
import { clearMessages } from '../../../../actions/msgActions.js';
// Import components
import Button     from '../../../inputs/button.js';
import Message    from '../../../misc/message.js';
import Entry      from '../../../inputs/entry.js';
import Divider    from '../../../misc/divider.js';

const LabGen = ({ toggle, editing=false }) => {
  const selected = useSelector(state => state.lab.selectedLab);
  const errorMsg = useSelector(state => state.msg.error);

  // Set internal state variables for the form
  const [labVals, setLabVals] = useState({
    _id: editing ? (selected && selected._id) : null,
    name: editing ? (selected && selected.name) : "",
    shipping: {
      address: editing ? (selected && selected.shipping && selected.shipping.address) : "",
      city:    editing ? (selected && selected.shipping && selected.shipping.city) : "",
      zip:     editing ? (selected && selected.shipping && selected.shipping.zip) : "",
      state:   editing ? (selected && selected.shipping && selected.shipping.state) : "",
    },
    billing: {
      address: editing ? (selected && selected.billing && selected.billing.address) : "",
      city:    editing ? (selected && selected.billing && selected.billing.city) : "",
      zip:     editing ? (selected && selected.billing && selected.billing.zip) : "",
      state:   editing ? (selected && selected.billing && selected.billing.state) : "",
    },
    tat: {
      standard:  editing ? (selected && selected.tat && selected.tat.standard) : 10,
      rush:      editing ? (selected && selected.tat && selected.tat.rush) : 5,
      emergency: editing ? (selected && selected.tat && selected.tat.emergency) : 3,
      rush_upcharge: editing ? (selected && selected.tat && selected.tat.rush_upcharge) : 0.5,
      emergency_upcharge: editing ? (selected && selected.tat && selected.tat.emergency_upcharge) : 1
    },
    contact: {
      emails: editing ? (selected && selected.contact && selected.contact.emails) : [],
      phones: editing ? (selected && selected.contact && selected.contact.phones) : []
    }
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
    if (errs.length === 0 && !clearTimer.current) { editing ? dispatch(editLab(labVals)) : dispatch(addLab(labVals)); }
    // Hide the form on submission
    errs.length !== 0 && !clearTimer.current ? setClear() : toggle();
  }

  // Handle events
  const onEntry = (e) => { setLabVals({...labVals, [e.target.name]: e.target.value })}
  const editShipping = e => setLabVals({ ...labVals, shipping: { ...labVals.shipping, [e.target.name]: e.target.value}});
  const editBilling = e => setLabVals({ ...labVals, billing: { ...labVals.billing, [e.target.name]: e.target.value}});
  const setEmail = (e, index) => {
    let edited = [...labVals.contact.emails];
    edited[index] = e.target.value;
    setLabVals({...labVals, contact: {...labVals.contact, emails: edited } });
  }
  const onAddEmail = () => setLabVals({ ...labVals, contact: {...labVals.contact, emails: [...labVals.contact.emails, ""]} });
  const onRemoveEmail = () => setLabVals({ ...labVals, contact: {...labVals.contact, emails: labVals.contact.emails.slice(0, labVals.contact.emails.length - 1)}});
  const setPhone = (e, index) => {
    let edited = [...labVals.contact.phones];
    edited[index] = e.target.value;
    setLabVals({...labVals, contact: {...labVals.contact, phones: edited } });
  }
  const onAddPhone = () => setLabVals({ ...labVals, contact: {...labVals.contact, phones: [...labVals.contact.phones, ""]} });
  const onRemovePhone = () => setLabVals({ ...labVals, contact: {...labVals.contact, phones: labVals.contact.phones.slice(0, labVals.contact.phones.length - 1)}});
  const onClick = (e) => { setLabVals({...labVals, [e.target.name]: !labVals[e.target.name] })}

  return (
    <div className="mx-4 my-2">
      <form className="flex flex-col" onSubmit={onSubmit}>
        <div className="">
          <Entry label="Lab Name:" placeholder="name" name="name" value={labVals.name} onChange={onEntry} extraClasses="mb-2" />
          <Divider />

          <h3 className="font-semibold text-lg text-blue-100 mb-2">Shipping</h3>
          <Entry label="Address:" placeholder="address" name="address" value={labVals.shipping.address} onChange={editShipping} />
          <Entry label="City:"    placeholder="city"    name="city"    value={labVals.shipping.city}    onChange={editShipping} />
          <Entry label="State:"   placeholder="state"   name="state"   value={labVals.shipping.state}   onChange={editShipping} />
          <Entry label="ZIP:"     placeholder="zip"     name="zip"     value={labVals.shipping.zip}     onChange={editShipping} extraClasses="mb-2" />
          <Divider />

          <h3 className="font-semibold text-lg text-blue-100 mb-2">Billing</h3>
          <Entry label="Address:" placeholder="address" name="address" value={labVals.billing.address} onChange={editBilling} />
          <Entry label="City:"    placeholder="city"    name="city"    value={labVals.billing.city}    onChange={editBilling} />
          <Entry label="State:"   placeholder="state"   name="state"   value={labVals.billing.state}   onChange={editBilling} />
          <Entry label="ZIP:"     placeholder="zip"     name="zip"     value={labVals.billing.zip}     onChange={editBilling} extraClasses="mb-2" />
          <Divider />

          <h3 className="font-semibold text-lg text-blue-100 mb-2">Contact Info</h3>
          <div className="grid grid-cols-2 gap-x-4 mb-2">
            {labVals.contact.emails.map((email, index) => {
              return <Entry label={`Email ${index+1}:`} placeholder={`email ${index+1}`}
                name="" value={labVals.contact.emails[index]}
                onChange={e => setEmail(e,index)} extraClasses="col-span-2 mb-1"/>
            })}
            <Button color="bg-blue-300" text="+ Email" onClick={onAddEmail} extraClasses="w-full h-8"/>
            <Button color="bg-red-400"  text="- Email" onClick={onRemoveEmail} extraClasses="w-full h-8"/>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            {labVals.contact.phones.map((phone, index) => {
              return <Entry label={`Phone ${index+1}:`} placeholder={`phone ${index+1}`}
                name="" value={labVals.contact.phones[index]}
                onChange={e => setPhone(e,index)} extraClasses="col-span-2 mb-1"/>
            })}
            <Button color="bg-blue-300" text="+ Phone #" onClick={onAddPhone} extraClasses="w-full h-8"/>
            <Button color="bg-red-400"  text="- Phone #" onClick={onRemovePhone} extraClasses="w-full h-8"/>
          </div>

        </div>

        <div className="h-6" />
        { badEntries.map(err => <Message error={err} /> )  }
        { errorMsg && <Message error={errorMsg} /> }
        <Button type="submit" color="bg-green-300" text={editing ? "Update Lab" : "Add New Lab"} extraClasses="h-10" />
      </form>
    </div>
  )
}

export default LabGen;
