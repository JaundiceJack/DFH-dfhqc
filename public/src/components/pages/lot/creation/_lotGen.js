// Import basics
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import server actions
import { editLot, addLot } from '../../../../actions/lotActions';
import { clearMessages } from '../../../../actions/msgActions.js';
// Import components
import InfoGen from './infoGen.js';
import Button  from '../../../inputs/button.js';
import Message from '../../../misc/message.js';

const LotGen = ({ toggle, editing=false }) => {
  // Get the materials from the redux state for initial IDs
  const selected      = useSelector(state => state.lot.selectedLot);
  const raws          = useSelector(state => state.raw.raws).sort((a,b) => b.number < a.number);
  const blends        = useSelector(state => state.blend.blends).sort((a,b) => b.number < a.number);
  const bulks         = useSelector(state => state.bulk.bulks).sort((a,b) => b.number < a.number);
  const fgs           = useSelector(state => state.fg.fgs).sort((a,b) => b.number < a.number);
  const vendors       = useSelector(state => state.vendor.vendors);
  const manufacturers = useSelector(state => state.manufacturer.manufacturers);
  const lots          = useSelector(state => state.lot.lots);
  const errorMsg      = useSelector(state => state.msg.error );

  // Assign form variables to the selected lot's values, or the defaults for a new lot
  const [lotVals, setLotVals] = useState({
    _id: editing ?
      (selected && selected._id) :
      null,
    lot: editing ?
      (selected && selected.lot) :
      "",
    department: editing ?
      (selected && selected.department) :
      "Quality Control",
    type: editing ?
      (selected && selected.type) :
      'raw',
    prior_lot: editing ?
      (selected && selected.prior_lot && selected.prior_lot._id) :
      null,
    status: editing ?
      (selected && selected.inventory && selected.inventory.status) :
      'Q',
    amount: editing ?
      (selected && selected.inventory && selected.inventory.amount) :
      0,
    units: editing ?
      (selected && selected.inventory && selected.inventory.units) :
      'kg',
    facility: editing ?
      (selected && selected.receiving && selected.receiving.facility) :
      'MT',
    location: editing ?
      (selected && selected.receiving && selected.receiving.location) :
      'A1',
    purchase_order: editing ?
      (selected && selected.receiving && selected.receiving.purchase_order) :
      '',
    manufacturer_lot: editing ?
      (selected && selected.receiving && selected.receiving.manufacturer_lot) :
      '',
    previously_received: editing ?
     (selected && (selected.prior_lot ? true : false)) :
      false,
    rawId: (editing && selected && selected.type === 'raw') ?
      selected.raw._id :
      (!raws.loading && raws.length > 0) ? raws[0]._id : null,
    blendId: (editing && selected && selected.type === 'blend') ?
      selected.blend._id :
      (!blends.loading && blends.length > 0) ? blends[0]._id : null,
    bulkId: (editing && selected && selected.type === 'bulk') ?
      selected.bulk._id :
      (!bulks.loading && bulks.length > 0) ? bulks[0]._id : null,
    fgId: (editing && selected && selected.type === 'fg') ?
      selected.fg._id :
      (!fgs.loading && fgs.length > 0) ? fgs[0]._id : null,
    vendorId: (editing && selected && selected.receiving && selected.receiving.vendor) ?
      selected.receiving.vendor._id :
      (!vendors.loading && vendors.length > 0) ? vendors[0]._id : null,
    manufacturerId: (editing && selected && selected.receiving && selected.receiving.manufacturer) ?
      selected.receiving.manufacturer._id :
      (!manufacturers.loading && manufacturers.length > 0) ? manufacturers[0]._id : null,
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
    if (errs.length === 0 && errorMsg === "") { editing ? dispatch(editLot(lotVals)) : dispatch(addLot(lotVals)); }
    // Hide the form on submission
    (errs.length !== 0 || errorMsg !== "") ? setClear() : toggle();
  }

  // Handle events
  const onEntry = (e) => { setLotVals({...lotVals, [e.target.name]: e.target.value })}
  const onPrevToggle = e => {
    lotVals.previously_received ?
      setLotVals({ ...lotVals, previously_received: false, prior_lot: null }) :
      setLotVals({ ...lotVals, previously_received: true,
        prior_lot:
          lots.filter(lot => { return lot.raw ? lot.raw._id === lotVals.rawId : false }).length > 0 ?
            lots.filter(lot => { return lot.raw ? lot.raw._id === lotVals.rawId : false })[0]._id : null });
  }
  //const onClick = (e) => { setLotVals({...lotVals, [e.target.name]: !lotVals[e.target.name] })}
  const onTypeSelect = e => {
    setLotVals({ ...lotVals,
      type: e.target.value,
      rawId: (editing && selected && e.target.value === 'raw') ?
        selected.raw._id :
        (!raws.loading && raws.length > 0) ? raws[0]._id : null,
      blendId: (editing && selected && e.target.value === 'blend') ?
        selected.blend._id :
        (!blends.loading && blends.length > 0) ? blends[0]._id : null,
      bulkId: (editing && selected && e.target.value === 'bulk') ?
        selected.bulk._id :
        (!bulks.loading && bulks.length > 0) ? bulks[0]._id : null,
      fgId: (editing && selected && e.target.value === 'fg') ?
        selected.fg._id :
        (!fgs.loading && fgs.length > 0) ? fgs[0]._id : null,
    })
  }



  return (
    <div className="mx-4 my-2">
      <form className="flex flex-col" onSubmit={onSubmit}>
        <InfoGen vals={lotVals} onTypeSelect={onTypeSelect} onEntry={onEntry} onPrevToggle={onPrevToggle} otherLots={lots}  />

        <div className="h-6" />
        { badEntries.map(err => <Message error={err} /> )  }
        { errorMsg && <Message error={errorMsg} /> }
        <Button type="submit" color="bg-green-300" text={editing ? "Apply Changes" : "Create Lot"} extraClasses="h-10" />
      </form>
    </div>
  )
}

export default LotGen;
