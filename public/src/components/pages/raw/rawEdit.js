// Import basics
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import server actions
import { editRaw } from '../../../actions/rawActions';
// Import components
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
    _id:       selected._id,
    number:    selected.number,
    name:      selected.name,
    color:     selected.color,
    odor:      selected.odor,
    taste:     selected.taste,
    textureId: selected.texture._id,
    newTexture: "",
    arsenic:   selected.hm.arsenic,
    cadmium:   selected.hm.cadmium,
    lead:      selected.hm.lead,
    mercury:   selected.hm.mercury,
    nickel_tested: selected.hm.nickel_tested,
    nickel:    selected.hm.nickel,
    hm_units:  selected.hm.units,
    moisture_max: selected.moisture.max,
    moisture_min: selected.moisture.min,
    density_max:  selected.density.max,
    density_min:  selected.density.min,
    tpc:       selected.micro.tpc,
    tpc_units: selected.micro.tpc_units,
    ym:        selected.micro.ym,
    ym_units:  selected.micro.ym_units,
    entero:    selected.micro.entero,
    entero_units: selected.micro.entero_units,
    salmonella: selected.micro.salmonella,
    staph:      selected.micro.staph,
    ecoli:      selected.micro.ecoli,
    paeru_tested: selected.micro.paeru_tested,
    paeru:        selected.micro.paeru,
    pesticide_tested:   selected.pesticide.tested,
    pesticide_standard: selected.pesticide.standard,
    solvent_tested:   selected.solvent.tested,
    solvent_standard: selected.solvent.standard,
    rancidity_tested: selected.rancidity.tested,
    peroxide:         selected.rancidity.peroxide,
    anisidine:        selected.rancidity.anisidine,
    totox:            selected.rancidity.totox,
    assays: selected.assays.map(as => {
      return {
        min: as.min,
        max: as.max,
        assayId: as.assay._id,
        unitId: as.units._id,
        methodId: as.method._id,
      }
    }),
    ids: selected.ids.map(id => {
      return {
        posneg: id.posneg,
        is_botanical: id.identity.is_botanical,
        genus: id.identity.genus,
        species: id.identity.species,
        part: id.identity.part,
        ratio: id.identity.ratio,
        solvent: id.identity.solvent,
        identityId: id.identity._id,
        methodId: id.method._id
      }
    }),
    soy: selected.allergens.soy,
    egg: selected.allergens.egg,
    milk: selected.allergens.milk,
    fish: selected.allergens.fish,
    wheat: selected.allergens.wheat,
    peanut: selected.allergens.peanut,
    tree_nut: selected.allergens.tree_nut,
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
        min: "",
        max: "",
        assayId:  (!assays.loading && assays.length > 0) ? assays[0]._id : "",
        newName: "",
        unitId:   (!units.loading && units.length > 0) ? units[0]._id : "",
        newUnit: "",
        methodId: (!methods.loading && methods.length > 0) ? methods[0]._id : "",
        newMethod: ""
      }
    ]})
  }
  const onAddId = () => {
    setRawVals({...rawVals, ids: [...rawVals.ids,
      {
        posneg: "Positive",
        is_botanical: (!ids.loading && ids.length > 0) ? ids[0].is_botanical : "",
        genus:       (!ids.loading && ids.length > 0) ? ids[0].genus : "",
        species:     (!ids.loading && ids.length > 0) ? ids[0].species : "",
        part:        (!ids.loading && ids.length > 0) ? ids[0].part : "",
        ratio:       (!ids.loading && ids.length > 0) ? ids[0].ratio : "",
        solvent:     (!ids.loading && ids.length > 0) ? ids[0].solvent : "",
        identityId:  (!ids.loading && ids.length > 0) ? ids[0]._id : "",
        newName: "",
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
  const onIdChange = (e, index) => {
    const idProps = ids.find(id => id._id === e.target.value);
    let edited = [...rawVals.ids];
    const hptlcId = methods.find(method => method.name === "HPTLC");
    edited[index].identityId = e.target.value;
    if (idProps) {
      edited[index].is_botanical = idProps.is_botanical === true;
      edited[index].genus = idProps.genus;
      edited[index].species = idProps.species;
      edited[index].part = idProps.part;
      edited[index].ratio = idProps.ratio;
      edited[index].solvent = idProps.solvent;
      edited[index].methodId = hptlcId._id || ((!methods.loading && methods.length > 0) ? methods[0]._id : "");
    } else {
      edited[index].is_botanical = false;
      edited[index].genus = "";
      edited[index].species = "";
      edited[index].part = "";
      edited[index].ratio = "";
      edited[index].solvent = "";
      edited[index].methodId = (!methods.loading && methods.length > 0) ? methods[0]._id : "";
    }
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
          onIdChange={onIdChange}
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

        <div className="h-6" />
        { badEntries.map(err => <Message error={err} /> )  }
        <Button type="submit" color="bg-green-300" text="Apply Changes" extraClasses="h-10" />
      </form>
    </div>
  )
}

export default RawEdit;
