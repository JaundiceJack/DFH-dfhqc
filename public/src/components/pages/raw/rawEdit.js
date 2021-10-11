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
import Button from '../../button.js';
import Message from '../../message.js';

const RawEdit = ({toggleEdit}) => {
  // Get id and assay names from the redux state/server
  const selected = useSelector(state => state.raw.selectedRaw);
  const ids = useSelector(state => state.identity.identities);
  const assays = useSelector(state => state.assay.assays.sort((a, b) => b.name < a.name));
  const units = useSelector(state => state.unit.units);
  const methods = useSelector(state => state.method.methods.sort((a, b) => b.name < a.name));
  const textures = useSelector(state => state.texture.textures.sort((a, b) => b.name < a.name));

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
    textureId: selected.texture._id,
    assays: selected.assays,
    ids: selected.ids.map(id => {
      return {
        identity: id.identity,
        posneg: id.posneg,
        isBotanical: id.is_botanical,
        genus: id.genus,
        species: id.species,
        part: id.part,
        ratio: id.ratio,
        solvent: id.solvent,
        method: id.method
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
  const setClear   = () => { clearTimer.current = setTimeout(() => {
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
        min: "",
        max: "",
        name:     (!assays.loading && assays.length > 0) ? assays[0].name : "",
        assayId:  (!assays.loading && assays.length > 0) ? assays[0]._id : "",
        newName: "",
        units:    (!units.loading && units.length > 0) ? units[0].name : "",
        unitId:   (!units.loading && units.length > 0) ? units[0]._id : "",
        newUnit: "",
        method:   (!methods.loading && methods.length > 0) ? methods[0].name : "",
        methodId: (!methods.loading && methods.length > 0) ? methods[0]._id : "",
        newMethod: ""
      }
    ]})
  }
  const onAddId = () => {
    setRawVals({...rawVals, ids: [...rawVals.ids,
      {
        posneg: "Positive",
        isBotanical: (!ids.loading && ids.length > 0) ? ids[0].is_botanical : "",
        genus:       (!ids.loading && ids.length > 0) ? ids[0].genus : "",
        species:     (!ids.loading && ids.length > 0) ? ids[0].species : "",
        part:        (!ids.loading && ids.length > 0) ? ids[0].part : "",
        ratio:       (!ids.loading && ids.length > 0) ? ids[0].ratio : "",
        solvent:     (!ids.loading && ids.length > 0) ? ids[0].solvent : "",
        name:        (!ids.loading && ids.length > 0) ? ids[0].name : "",
        identityId:  (!ids.loading && ids.length > 0) ? ids[0]._id : "",
        newName: "",
        method:      (!methods.loading && methods.length > 0) ? methods[0].name : "",
        methodId:    (!methods.loading && methods.length > 0) ? methods[0]._id : "",
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
  return (
    <div className="mx-4 my-2">
      <form className="flex flex-col" onSubmit={onSubmit}>

        <AddBasic
          vals={rawVals}
          onEntry={onEntry}
          ifEditing={true} />
        <AddOrgano
          vals={rawVals}
          onEntry={onEntry}
          textures={textures} />
        <AddAssays
          vals={rawVals}
          onEdit={onEditAssay}
          onAdd={onAddAssay}
          onRemove={onRemoveAssay}
          assayOptions={assays}
          methodOptions={methods}
          unitOptions={units} />
        <AddIds
          vals={rawVals}
          onEdit={onEditId}
          onAdd={onAddId}
          onRemove={onRemoveId}
          nameOptions={ids}
          methodOptions={methods} />
        <AddPhysical
          vals={rawVals}
          onEntry={onEntry} />
        <AddHms
          vals={rawVals}
          onEntry={onEntry}
          onClick={onClick} />
        <AddMicros
          vals={rawVals}
          onEntry={onEntry}
          onClick={onClick} />
        <AddAnnuals
          vals={rawVals}
          onEntry={onEntry}
          onClick={onClick} />
        <AddAllergens
          vals={rawVals}
          onClick={onClick} />

        { badEntries.map(err => <Message error={err} /> )  }
        <Button type="submit" color="bg-green-300" text="Apply Changes" />
      </form>
    </div>
  )
}

export default RawEdit;
