// Import basics
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import server actions
import { addLot } from '../../../actions/lotActions';
import { clearMessages } from '../../../actions/msgActions.js';
// Import components
import AddLotInfo from '../add/addLotInfo';
import Button       from '../../button.js';
import Message      from '../../message.js';

const LotAdd = ({toggleAdd}) => {
  // Get the materials from the redux state for initial IDs
  const raws = useSelector(state => state.raw.raws).sort((a,b)=>b.number<a.number);
  const blends = useSelector(state => state.blend.blends);
  const bulks = useSelector(state => state.bulk.bulks);
  const fgs = useSelector(state => state.fg.fgs);
  const vendors = useSelector(state => state.vendor.vendors);
  const manufacturers = useSelector(state => state.manufacturer.manufacturers);
  const errorMsg = useSelector(state => state.msg.error);

  // Set internal state variables for the form
  const [lotVals, setLotVals] = useState({
    lot:            "",
    purchase_order: "",
    department:     "Quality Control",
    rawId:   (!raws.loading   && raws.length   > 0) ? raws[0]._id   : "",
    blendId: (!blends.loading && blends.length > 0) ? blends[0]._id : "",
    bulkId:  (!bulks.loading  && bulks.length  > 0) ? bulks[0]._id  : "",
    fgId:    (!fgs.loading    && fgs.length    > 0) ? fgs[0]._id    : "",
    item_type: "raw",
    status:    "Q",
    amount:    0,
    units:     "kg",
    facility:  "MT",
    location: "A1",
    vendorId: (!vendors.loading && vendors.length > 0) ? vendors[0]._id : "",
    manufacturerId: (!manufacturers.loading && manufacturers.length > 0) ? manufacturers[0]._id : "",
    manufacturer_lot: "",
    otherNumber: "",
    otherName: ""
  })

  // Clear the badEntries after the timer runs out
  const dispatch = useDispatch();
  const [badEntries, setBadEntries] = useState([]);
  const clearTimer = useRef(null);
  const setClear = () => {
    clearTimer.current = setTimeout(() => {
      setBadEntries([]);
      dispatch(clearMessages());
      clearTimer.current = null;
    }, 5000);
  }
  // Clear the timer on unmount to prevent memory leaks
  useEffect(() => {
    return () => { clearTimer.current && clearTimeout(clearTimer.current) };
  }, [dispatch]);

  // Handle the new lot form submission
  const onSubmit = e => {
    e.preventDefault();
    // Validate Entries
    let errs = []
    if (lotVals.lot === "" || lotVals.lot === null ) errs.push("Please enter a lot number.");
    setBadEntries(errs);
    // Create a new lot
    if (errs.length === 0 && errorMsg === "") { dispatch(addLot(lotVals)); }
    // Hide the form on submission
    (errs.length !== 0 || errorMsg !== "") ? setClear() : toggleAdd();
  }

  // Handle events
  const onEntry = (e) => { setLotVals({...lotVals, [e.target.name]: e.target.value })}
  //const onClick = (e) => { setLotVals({...lotVals, [e.target.name]: !lotVals[e.target.name] })}


  return (
    <div className="mx-4 my-2">
      <form className="flex flex-col" onSubmit={onSubmit}>
        <AddLotInfo vals={lotVals} onEntry={onEntry} />

        <div className="h-6" />
        { badEntries.map(err => <Message error={err} /> )  }
        { errorMsg && <Message error={errorMsg} /> }
        <Button type="submit" color="bg-green-300" text="Add New Lot" extraClasses="h-10" />
      </form>
    </div>
  )
}

export default LotAdd;
