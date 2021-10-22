// Import basics
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import server actions
import { editLot } from '../../../actions/lotActions';
import { clearMessages } from '../../../actions/msgActions.js';
// Import components
import AddLotInfo from '../add/addLotInfo';
import Button       from '../../button.js';
import Message      from '../../message.js';

const LotEdit = ({toggleEdit}) => {
  // Get the materials from the redux state for initial IDs
  const selected      = useSelector(state => state.lot.selectedLot);
  const raws          = useSelector(state => state.raw.raws).sort((a,b)=>b.number<a.number);
  const blends        = useSelector(state => state.blend.blends);
  const bulks         = useSelector(state => state.bulk.bulks);
  const fgs           = useSelector(state => state.fg.fgs);
  const vendors       = useSelector(state => state.vendor.vendors);
  const manufacturers = useSelector(state => state.manufacturer.manufacturers);
  const errorMsg      = useSelector(state => state.msg.error );

  // Set internal state variables for the form
  const [lotVals, setLotVals] = useState({
    _id:       selected._id,
    lot:       selected.lot,
    department: selected.department,
    rawId: selected.item_type === 'raw' ?
           selected.item._id :
           (!raws.loading && raws.length > 0) ?
           raws[0]._id :
           "",
    blendId: selected.item_type === 'blend' ?
             selected.item._id :
             (!blends.loading && blends.length > 0) ?
             blends[0]._id :
             "",
    bulkId: selected.item_type === 'bulk' ?
            selected.item._id :
            (!bulks.loading && bulks.length > 0) ?
            bulks[0]._id :
            "",
    fgId: selected.item_type === 'fg' ?
          selected.item._id :
          (!fgs.loading && fgs.length > 0) ?
          fgs[0]._id :
          "",
    item_type: selected.item_type,
    status:    selected.inventory.status,
    amount:    selected.inventory.amount,
    units:     selected.inventory.units,
    facility:         selected.receiving.facility,
    location:         selected.receiving.location,
    vendorId:         selected.receiving.vendor._id,
    purchase_order:   selected.receiving.purchase_order,
    manufacturerId:   selected.receiving.manufacturer._id,
    manufacturer_lot: selected.receiving.manufacturer_lot,
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
    if (lotVals.lot === "" || lotVals.lot === null)
      errs.push("Please enter a lot number.");

    setBadEntries(errs);
    // Create a new lot
    if (errs.length === 0 && errorMsg === "") { dispatch(editLot(lotVals)); }
    // Hide the form on submission
    (errs.length !== 0 || errorMsg !== "") ? setClear() : toggleEdit();
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
        <Button type="submit" color="bg-green-300" text="Apply Changes" extraClasses="h-10" />
      </form>
    </div>
  )
}

export default LotEdit;
