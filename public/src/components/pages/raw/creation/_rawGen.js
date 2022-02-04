// Import basics
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import server actions
import { addRaw, editRaw } from '../../../../actions/rawActions.js';
// Import form components
import BasicGen     from './basicGen.js';
import OrganoGen    from './organoGen.js';
import AssayGen     from './assayGen.js';
import IdGen        from './idGen.js';
import PhysicalGen  from './physicalGen.js';
import HmGen        from './hmGen.js';
import MicroGen     from './microGen.js';
import AllergenGen  from './allergenGen.js';
import AnnualGen    from './annualGen.js';
// Import other components
import Button from '../../../inputs/button.js';
import Message from '../../../misc/message.js';

const RawGen = ({ toggle, editing=false }) => {
  // Get id and assay names from the redux state/server
  const selected = useSelector(state => state.raw.selectedRaw);
  const ids      = useSelector(state => state.identity.identities);
  const assays   = useSelector(state => state.assay.assays.sort((a, b) => b.name < a.name));
  const units    = useSelector(state => state.unit.units);
  const methods  = useSelector(state => state.method.methods.sort((a, b) => b.name < a.name));
  const textures = useSelector(state => state.texture.textures.sort((a, b) => b.name < a.name));

  // Set internal state variables for the form
  const [rawVals, setRawVals] = useState({
    _id: editing ?
      (selected && selected._id) :
      null,
    number: editing ?
      (selected && selected.number) :
      "",
    name: editing ?
      (selected && selected.name) :
      "",
    color: editing ?
      (selected && selected.color) :
      "",
    odor: editing ?
      (selected && selected.odor) :
      "",
    taste: editing ?
      (selected && selected.tase) :
      "",
    textureId: editing ?
      (selected && selected.texture && selected.texture._id) :
      (!textures.loading && textures.length > 0) ?
        textures[0]._id :
        "",
    newTexture: "",
    hm: {
      arsenic: editing ?
        (selected && selected.hm && selected.hm.arsenic) :
        "5",
      cadmium: editing ?
        (selected && selected.hm && selected.hm.cadmium) :
        "0.3",
      lead: editing ?
        (selected && selected.hm && selected.hm.lead) :
        "10",
      mercury: editing ?
        (selected && selected.hm && selected.hm.mercury) :
        "0.2",
      nickel: editing ?
        (selected && selected.hm && selected.hm.nickel) :
        "5",
      nickel_tested: editing ?
        (selected && selected.hm && selected.hm.nickel_tested) :
        false,
      units: editing ?
        (selected && selected.hm && selected.hm.hm_units) :
        "ppm",
    },
    moisture: {
      min: editing ?
        (selected && selected.moisture && selected.moisture.min) :
        "",
      max: editing ?
        (selected && selected.moisture && selected.moisture.max) :
        ""
    },
    density: {
      min: editing ?
        (selected && selected.density && selected.density.min) :
        "",
      max: editing ?
        (selected && selected.density && selected.density.max) :
        ""
    },
    micro: {
      tpc: editing ?
        (selected && selected.micro && selected.micro.tpc) :
        "1000",
      tpc_units: editing ?
        (selected && selected.micro && selected.micro.tpc_units) :
        "CFU/g",
      ym: editing ?
        (selected && selected.micro && selected.micro.ym) :
        "100",
      ym_units: editing ?
        (selected && selected.micro && selected.micro.ym_units) :
        "CFU/g",
      entero: editing ?
        (selected && selected.micro && selected.micro.entero) :
        "100",
      entero_units: editing ?
        (selected && selected.micro && selected.micro.entero_units) :
        "MPN/g",
      salmonella: editing ?
        (selected && selected.micro && selected.micro.salmonella) :
        "Negative",
      staph: editing ?
        (selected && selected.micro && selected.micro.staph) :
        "Negative",
      ecoli: editing ?
        (selected && selected.micro && selected.micro.ecoli) :
        "Negative",
      paeru: editing ?
        (selected && selected.micro && selected.micro.paeru) :
        "Negative",
      paeru_tested: editing ?
        (selected && selected.micro && selected.micro.paeru_tested) :
        false
    },
    pesticide: {
      tested: editing ?
        (selected && selected.pesticide && selected.pesticide.tested) :
        false,
      standard: editing ?
        (selected && selected.pesticide && selected.pesticide.standard) :
        "USP <561>"
    },
    solvent: {
      tested: editing ?
        (selected && selected.solvent && selected.solvent.tested) :
        false,
      standard: editing ?
        (selected && selected.solvent && selected.solvent.standard) :
        "Class I"
    },
    rancidity: {
      tested: editing ?
        (selected && selected.rancidity && selected.rancidity.tested) :
        false,
      peroxide: editing ?
        (selected && selected.rancidity && selected.rancidity.peroxide) :
        "",
      anisidine: editing ?
        (selected && selected.rancidity && selected.rancidity.anisidine) :
        "",
      totox: editing ?
        (selected && selected.rancidity && selected.rancidity.totox) :
        ""
    },
    allergens: {
      soy: editing ?
        (selected && selected.allergens && selected.allergens.soy) :
        false,
      egg: editing ?
        (selected && selected.allergens && selected.allergens.egg) :
        false,
      milk: editing ?
        (selected && selected.allergens && selected.allergens.milk) :
        false,
      fish: editing ?
        (selected && selected.allergens && selected.allergens.fish) :
        false,
      wheat: editing ?
        (selected && selected.allergens && selected.allergens.wheat) :
        false,
      peanut: editing ?
        (selected && selected.allergens && selected.allergens.peanut) :
        false,
      tree_nut: editing ?
        (selected && selected.allergens && selected.allergens.tree_nut) :
        false,
      shellfish: editing ?
        (selected && selected.allergens && selected.allergens.shellfish) :
        false
    },
    assays: editing ?
      (selected && selected.assays && selected.assays.map(as => {
        return {
          min:      as.min,
          max:      as.max,
          assayId:  as.assay._id,
          unitId:   as.units._id,
          methodId: as.method._id,
        }
      })) :
      [],
    ids: editing ?
      (selected && selected.ids && selected.ids.map(id => {
        return {
          posneg:       id.posneg,
          is_botanical: id.identity.is_botanical,
          genus:        id.identity.genus,
          species:      id.identity.species,
          part:         id.identity.part,
          ratio:        id.identity.ratio,
          solvent:      id.identity.solvent,
          identityId:   id.identity._id,
          methodId:     id.method._id
        }
      })) :
      []
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

  // Handle the raw form submission
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
    if (errs.length === 0 && !clearTimer.current) { editing ? dispatch(editRaw(rawVals)) : dispatch(addRaw(rawVals)); }
    // Hide the form on submission
    errs.length !== 0 && !clearTimer.current ? setClear() : toggle();
  }

  // Handle events
  const setBasic     = e => { setRawVals({...rawVals,
    [e.target.name]: e.target.value })}
  const setHm        = e => { setRawVals({...rawVals,
    hm: {...rawVals.hm, [e.target.name]: e.target.value }})}
  const clickHm      = e => { setRawVals({...rawVals,
    hm: {...rawVals.hm, [e.target.name]: !rawVals.hm[e.target.name] }})}
  const setMicro     = e => { setRawVals({...rawVals,
    micro: {...rawVals.micro, [e.target.name]: e.target.value }})}
  const clickMicro   = e => { setRawVals({...rawVals,
    micro: {...rawVals.micro, [e.target.name]: !rawVals.micro[e.target.name] }})}
  const setMoisture  = e => { setRawVals({...rawVals,
    moisture: {...rawVals.moisture, [e.target.name]: e.target.value }})}
  const setDensity   = e => { setRawVals({...rawVals,
    density: {...rawVals.density, [e.target.name]: e.target.value }})}
  const setPesticide = e => { setRawVals({...rawVals,
    pesticide: {...rawVals.pesticide, [e.target.name]: e.target.value }})}
  const clickPesticide = e => { setRawVals({...rawVals,
    pesticide: {...rawVals.pesticide, [e.target.name]: !rawVals.pesticide[e.target.name] }})}
  const setRancidity = e => { setRawVals({...rawVals,
    rancidity: {...rawVals.rancidity, [e.target.name]: e.target.value }})}
  const clickRancidity = e => { setRawVals({...rawVals,
    rancidity: {...rawVals.rancidity, [e.target.name]: !rawVals.rancidity[e.target.name] }})}
  const setSolvent = e => { setRawVals({...rawVals,
    solvent: {...rawVals.solvent, [e.target.name]: e.target.value }})}
  const clickSolvent = e => { setRawVals({...rawVals,
    solvent: {...rawVals.solvent, [e.target.name]: !rawVals.solvent[e.target.name] }})}
  const setAllergens = e => { setRawVals({...rawVals,
    allergens: {...rawVals.allergens, [e.target.name]: !rawVals.allergens[e.target.name] }})}

  // Add a new blank assay to the item's list of assays
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
  // Add a new blank ID to the item's list of identities
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
  // Remove the last assay from the list
  const onRemoveAssay = () => {
    if (rawVals.assays.length > 0) {
      setRawVals({ ...rawVals, assays: rawVals.assays.slice(0, rawVals.assays.length-1) })
    }
  }
  // Remove the last ID on the list
  const onRemoveId = () => {
    if (rawVals.ids.length > 0) {
      setRawVals({ ...rawVals, ids: rawVals.ids.slice(0, rawVals.ids.length-1) });
    }
  }
  // Copy the assays, modify the selected one, and resave the assays
  const onEditAssay = (e, index) => {
    let edited = [...rawVals.assays];
    edited[index][e.target.name] = e.target.value;
    setRawVals({...rawVals, assays: edited});
  }
  // Copy the IDs, modify the selected one, and resave the IDs
  const onEditId = (e, index) => {
    let edited = [...rawVals.ids];
    if (e.target.type === "checkbox")
      edited[index][e.target.name] = !edited[index][e.target.name];
    else
      edited[index][e.target.name] = e.target.value;
    setRawVals({...rawVals, ids: edited});
  }
  // Clear out the ID properties if it is changed from botanical to non-botanical
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

        <BasicGen vals={rawVals} onEntry={setBasic} ifEditing={editing} />

        <OrganoGen vals={rawVals} onEntry={setBasic} textures={textures} />

        <AssayGen assays={rawVals.assays}
          onAdd={onAddAssay} onEdit={onEditAssay} onRemove={onRemoveAssay}
          assayOptions={assays} methodOptions={methods} unitOptions={units} />

        <IdGen ids={rawVals.ids}
          onAdd={onAddId} onEdit={onEditId} onRemove={onRemoveId} onIdChange={onIdChange}
          nameOptions={ids} methodOptions={methods} />

        <PhysicalGen moisture={rawVals.moisture} density={rawVals.density}
          setMoisture={setMoisture} setDensity={setDensity} />

        <HmGen vals={rawVals.hm} onEntry={setHm} onClick={clickHm} />

        <MicroGen vals={rawVals.micro} onEntry={setMicro} onClick={clickMicro} />

        <AnnualGen pesticides={rawVals.pesticide} solvents={rawVals.solvent} rancidity={rawVals.rancidity}
          setPesticide={setPesticide} clickPesticide={clickPesticide}
          setRancidity={setRancidity} clickRancidity={clickRancidity}
          setSolvent={setSolvent}     clickSolvent={clickSolvent} />

        <AllergenGen vals={rawVals.allergens} onClick={setAllergens} />

        <div className="h-6" />
        { badEntries.map(err => <Message error={err} /> )  }
        <Button type="submit" color="bg-green-300" text="Submit" extraClasses="h-10" />
      </form>
    </div>
  )
}

export default RawGen;
