import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLot } from '../../../actions/lotActions';
import AddLotInfo from '../add/addLotInfo';

const LotAdd = ({toggleAdd}) => {
  // Get the materials from the redux state for initial IDs
  const raws = useSelector(state => state.raw.raws);
  const blends = useSelector(state => state.blend.blends);
  const bulks = useSelector(state => state.bulk.bulks);
  const fgs = useSelector(state => state.fg.fgs);

  // Set internal state variables for the form
  const [lotVals, setLotVals] = useState({
    lot: "",
    purchaseOrder: "",
    rawItemId: raws.length > 0 ? raws[0]._id : "",
    blendItemId: blends.length > 0 ? blends[0]._id : "",
    bulkItemId: bulks.length > 0 ? bulks[0]._id : "",
    fgItemId: fgs.length > 0 ? fgs[0]._id : "",
    itemType: "raw",
    amount: 0,
    amountUnits: "kg",
    facilityLocation: "MT",
    warehouseLocation: "A1",
    vendor: "Charles Bowman",
    manufacturer: "Wuhan Grand",
    makerLot: "",
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
    if (lotVals.number === "" || lotVals.number === null)
      errs.push("Please enter an item number.");

    setBadEntries(errs);
    // Create a new lot
    if (errs.length === 0 && !clearTimer.current) { dispatch(addLot(lotVals)); }
    // Hide the form on submission
    errs.length !== 0 && !clearTimer.current ? setClear() : toggleAdd();
  }

  // Handle events
  const onEntry = (e) => { setLotVals({...lotVals, [e.target.name]: e.target.value })}
  //const onClick = (e) => { setLotVals({...lotVals, [e.target.name]: !lotVals[e.target.name] })}


  // Compose classes
  const buttonCs = " rounded py-1 px-2 mx-1 font-semibold transform duration-75" +
                   " ease-in-out hover:scale-105 hover:opacity-75 opacity-50 " +
                   " bg-green-300 col-span-2 mt-4 mx-auto ";
  const errorMsgCs = " px-3 py-2 mb-2 font-semibold text-white rounded-xl" +
                          " border-l border-gray-500 bg-gradient-to-tl" +
                          " from-red-900 to-gray-900 fadeError ";

  return (
    <div className="mx-4 my-2">
      <form className="flex flex-col" onSubmit={onSubmit}>
        <AddLotInfo vals={lotVals} onEntry={onEntry} />

        { badEntries.map(err => <div className={errorMsgCs}>{err}</div> )  }
        <button type="submit" className={buttonCs}>
          Add New Lot
        </button>
      </form>
    </div>
  )
}

export default LotAdd;
