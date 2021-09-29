import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRaw } from '../../../actions/rawActions';
import AddBasic from '../add/addBasic';
import AddOrgano from '../add/addOrgano';
import AddAssays from '../add/addAssays';
import AddIds from '../add/addIds';
import AddPhysical from '../add/addPhysical';
import AddHms from '../add/addHms';
import AddMicros from '../add/addMicros';
import AddAllergens from '../add/addAllergens';
import AddAnnuals from '../add/addAnnuals';

const RawAdd = ({toggleAdd}) => {
  // Get id and assay names from the redux state/server
  const idNames = useSelector(state => state.raw.idNames);
  const assayNames = useSelector(state => state.raw.assayNames);
  const assayUnits = useSelector(state => state.raw.units);
  const assayMethods = useSelector(state => state.raw.assayMethods);
  const idMethods = useSelector(state => state.raw.idMethods);
  const textureOptions = ["Powder", "Empty Capsule", "Capsule", "Softgel", "Thick Liquid",
                          "Thin Liquid", "Oily Liquid", "Gel", "Solid",
                          "Fine Powder", "Granular Powder", "Crystalline Powder",
                          "Dry Powder", "Free Flowing Powder", "Sticky Powder",
                          "Fluffy Powder", "Coarse Powder", "Beadlets", "Flakes"];

  // Set internal state variables for the form
  const [rawVals, setRawVals] = useState({
    number: "",                 name: "",                       color: "",
    odor: "",                   taste: "",                      arsenicMax: "5",
    cadmiumMax: "0.3",          leadMax: "10",                  mercuryMax: "0.2",
    nickelMax: "10",            hmUnits: "ppm",                 moistureMax: "",
    moistureMin: "",            densityMax: "",                 densityMin: "",
    tpcMax: 1000,               tpcUnits: "CFU/g",              ymMax: 100,
    ymUnits: "CFU/g",           enteroMax: 100,                  enteroUnits: "MPN/g",
    salmonella: "Negative",     staph: "Negative",              ecoli: "Negative",
    paeru: "Negative",          pesticideStandard: "USP <561>", solventStandard: "Class I",
    peroxideMax: "",            pAnisidineMax: "",              totoxMax: "",
    texture: textureOptions[0], assays: [],                     ids: [],
    rancidityTested: false,     nickelTested: false,            paeruTested: false,
    pesticideTested: false,     solventTested: false,           soy: false,
    egg: false,                 milk: false,                    fish: false,
    wheat: false,               peanut: false,                  treeNut: false,
    shellfish: false
  })

  // Clear the badEntries warning after the timer runs out
  const dispatch = useDispatch();
  const [badEntries, setBadEntries] = useState([]);
  const clearTimer = useRef(null);
  const setClear   = () => {
    clearTimer.current = setTimeout(() => {
      setBadEntries([]);
      clearTimer.current = null;
    }, 5000);
  }
  // Clear the timer on unmount
  useEffect(() => {
    return () => { clearTimer.current && clearTimeout(clearTimer.current) };
  }, [dispatch]);

  // Handle the new raw form submission
  const onSubmit = e => {
    e.preventDefault();
    // Validate Entries
    let errs = []
    if (rawVals.number === "" || rawVals.number === null)
      errs.push("Please enter an item number.");
    if (typeof rawVals.number === 'number' )
      errs.push("Item number must be a number.");
    if (rawVals.name === "" || rawVals.name === null )
      errs.push("Please enter an item name.")
    setBadEntries(errs);
    // Create a new raw
    if (errs.length === 0 && !clearTimer.current) { dispatch(addRaw(rawVals)); }
    // Hide the form on submission
    errs.length !== 0 && !clearTimer.current ? setClear() : toggleAdd();
  }

  // Handle events
  const onEntry = (e) => { setRawVals({...rawVals, [e.target.name]: e.target.value })}
  const onClick = (e) => { setRawVals({...rawVals, [e.target.name]: !rawVals[e.target.name] })}
  // Set up assay & identity input
  const onAddAssay = () => {
    setRawVals({ ...rawVals, assays: [...rawVals.assays,
      {
        name: assayNames[0],
        newName: "",
        min: "",
        max: "",
        units: assayUnits[0],
        newUnits: "",
        method: assayMethods[0],
        newMethod: ""
      }
    ]})
  }
  const onAddId = () => {
    setRawVals({...rawVals, ids: [...rawVals.ids,
      {
        name: idNames[0],
        newName: "",
        posneg: "Positive",
        isBotanical: false,
        genus: "",
        species: "",
        part: "",
        ratio: "",
        solvent: "",
        method: idMethods[0],
        newMethod: ""
      }
    ]})
  }
  const onRemoveAssay = () => {
    if (rawVals.assays.length > 0) {
      setRawVals({ ...rawVals, assays: rawVals.assays.slice(0, rawVals.assays.length-1) })
    }
  }
  const onRemoveId = () => {
    if (rawVals.ids.length > 0) {
      setRawVals({ ...rawVals, ids: rawVals.ids.slice(0, rawVals.ids.length-1) });
    }
  }
  const onEditAssay = (e, index) => {
    let edited = [...rawVals.assays];
    edited[index][e.target.name] = e.target.value;
    setRawVals({...rawVals, assays: edited});
  }
  const onEditId = (e, index) => {
    let edited = [...rawVals.ids];
    if (e.target.type === "checkbox")
      edited[index][e.target.name] = !edited[index][e.target.name];
    else
      edited[index][e.target.name] = e.target.value;
    setRawVals({...rawVals, ids: edited});
  }

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

        <AddBasic     vals={rawVals} onEntry={onEntry} ifEditing={false} />
        <AddOrgano    vals={rawVals} onEntry={onEntry}
          textures={textureOptions} />
        <AddAssays    vals={rawVals} onEdit={onEditAssay}
          onAdd={onAddAssay} onRemove={onRemoveAssay} nameOptions={assayNames}
          methodOptions={assayMethods} unitOptions={assayUnits} />
        <AddIds       vals={rawVals} onEdit={onEditId}
          onAdd={onAddId} onRemove={onRemoveId} nameOptions={idNames}
          methodOptions={idMethods} />
        <AddPhysical  vals={rawVals} onEntry={onEntry} />
        <AddHms       vals={rawVals} onEntry={onEntry} onClick={onClick} />
        <AddMicros    vals={rawVals} onEntry={onEntry} onClick={onClick} />
        <AddAnnuals   vals={rawVals} onEntry={onEntry} onClick={onClick} />
        <AddAllergens vals={rawVals} onClick={onClick} />

        { badEntries.map(err => <div className={errorMsgCs}>{err}</div> )  }
        <button type="submit" className={buttonCs}>
          Add New Raw
        </button>
      </form>
    </div>
  )
}

export default RawAdd;
