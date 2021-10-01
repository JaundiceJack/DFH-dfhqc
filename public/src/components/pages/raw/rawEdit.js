import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editRaw } from '../../../actions/rawActions';
import AddBasic from '../add/addBasic';
import AddOrgano from '../add/addOrgano';
import AddAssays from '../add/addAssays';
import AddIds from '../add/addIds';
import AddPhysical from '../add/addPhysical';
import AddHms from '../add/addHms';
import AddMicros from '../add/addMicros';
import AddAllergens from '../add/addAllergens';
import AddAnnuals from '../add/addAnnuals';

const RawEdit = ({toggleEdit}) => {
  // Get id and assay names from the redux state/server
  const selected     = useSelector(state => state.raw.selectedRaw);
  const idNames      = useSelector(state => state.raw.idNames);
  const assayNames   = useSelector(state => state.raw.assayNames);
  const assayUnits   = useSelector(state => state.raw.units);
  const assayMethods = useSelector(state => state.raw.assayMethods);
  const idMethods    = useSelector(state => state.raw.idMethods);
  const textureOptions = ["Powder", "Empty Capsule", "Capsule", "Softgel", "Thick Liquid",
                          "Thin Liquid", "Oily Liquid", "Gel", "Solid",
                          "Fine Powder", "Granular Powder", "Crystalline Powder",
                          "Dry Powder", "Free Flowing Powder", "Sticky Powder",
                          "Fluffy Powder", "Coarse Powder", "Beadlets", "Flakes"];

  // Set internal state variables for the form
  const [rawVals, setRawVals] = useState({
    _id: selected._id,
    number: selected.number,
    name: selected.name,
    color: selected.color,
    odor: selected.odor,
    taste: selected.taste,
    arsenicMax: selected.arsenic_max,
    cadmiumMax: selected.cadmium_max,
    leadMax: selected.lead_max,
    mercuryMax: selected.mercury_max,
    nickelMax: selected.nickel_max,
    hmUnits: selected.hm_units,
    moistureMax: selected.moisture_max,
    moistureMin: selected.moisture_min,
    densityMax: selected.density_max,
    densityMin: selected.density_min,
    tpcMax: selected.tpc_max,
    tpcUnits: selected.tpc_units,
    ymMax: selected.ym_max,
    ymUnits: selected.ym_units,
    enteroMax: selected.entero_max,
    enteroUnits: selected.entero_units,
    salmonella: selected.salmonella,
    staph: selected.staph,
    ecoli: selected.ecoli,
    paeru: selected.paeru,
    pesticideStandard: selected.pesticide_standard,
    solventStandard: selected.solvent_standard,
    peroxideMax: selected.peroxide_max,
    pAnisidineMax: selected.p_anisidine_max,
    totoxMax: selected.totox_max,
    texture: selected.texture,
    assays: selected.assays.map(assay => {
      return {
        name: assay.assay_name,
        min: assay.assay_min,
        max: assay.assay_max,
        units: assay.assay_units,
        method: assay.assay_method
      }

    }),
    ids: selected.ids.map(id => {
      return {
        name: id.identity_name,
        posneg: id.identity_posneg,
        isBotanical: id.identity_is_botanical,
        genus: id.identity_genus,
        species: id.identity_species,
        part: id.identity_part,
        ratio: id.identity_ratio,
        solvent: id.identity_solvent,
        method: id.identity_method
      }
    }),
    rancidityTested: selected.rancidity_tested,
    nickelTested: selected.nickel_tested,
    paeruTested: selected.paeru_tested,
    pesticideTested: selected.pesticide_tested,
    solventTested: selected.solvent_tested,
    soy: selected.allergens.soy,
    egg: selected.allergens.egg,
    milk: selected.allergens.milk,
    fish: selected.allergens.fish,
    wheat: selected.allergens.wheat,
    peanut: selected.allergens.peanut,
    treeNut: selected.allergens.treeNut,
    shellfish: selected.allergens.shellfish
  })

  // Clear the badEntries after the timer runs out (5 seconds)
  const dispatch = useDispatch();
  const [badEntries, setBadEntries] = useState([]);
  const clearTimer = useRef(null);
  const setClear   = () => {
    clearTimer.current = setTimeout(() => {
      setBadEntries([]);
      clearTimer.current = null;
    }, 5000);
  }
  // Load selection options and clear the timer on unmount
  useEffect(() => {
    return () => { clearTimer.current && clearTimeout(clearTimer.current) };
  }, [dispatch]);

  // Handle the raw edit form submission
  const onSubmit = e => {
    e.preventDefault();
    // Validate Entries
    let errs = []
    if (rawVals.number === "" || rawVals.number === null)
      errs.push("Please enter an item number.");
    if (rawVals.name === "" || rawVals.name === null )
      errs.push("Please enter an item name.")
    setBadEntries(errs);
    // Create a new raw
    if (errs.length === 0 && !clearTimer.current) { dispatch(editRaw(rawVals)); }
    // Hide the form on submission
    errs.length !== 0 && !clearTimer.current ? setClear() : toggleEdit();
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
    <div className="mx-4 my-2">
      <form className="flex flex-col" onSubmit={onSubmit}>

        <AddBasic     vals={rawVals} onEntry={onEntry} ifEditing={true} />
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
          Apply Changes
        </button>
      </form>
    </div>
  )
}

export default RawEdit;
