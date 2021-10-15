// Import basics
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import server actions
import { addRaw }   from '../../../actions/rawActions';
import { clearMessages } from '../../../actions/msgActions.js';
// Import components
import AddBasic     from '../add/addBasic';
import AddOrgano    from '../add/addOrgano';
import AddAssays    from '../add/addAssays';
import AddIds       from '../add/addIds';
import AddPhysical  from '../add/addPhysical';
import AddHms       from '../add/addHms';
import AddMicros    from '../add/addMicros';
import AddAllergens from '../add/addAllergens';
import AddAnnuals   from '../add/addAnnuals';
import Button       from '../../button.js';
import Message      from '../../message.js';

const RawAdd = ({toggleAdd}) => {
  // Get id and assay names from the redux state/server
  const ids      = useSelector(state => state.identity.identities);
  const assays   = useSelector(state => state.assay.assays.sort((a, b) => b.name < a.name));
  const units    = useSelector(state => state.unit.units);
  const methods  = useSelector(state => state.method.methods.sort((a, b) => b.name < a.name));
  const textures = useSelector(state => state.texture.textures.sort((a, b) => b.name < a.name));
  const errorMsg = useSelector(state => state.msg.error);

  // Set internal state variables for the form
  const [rawVals, setRawVals] = useState({
    number: "",
    name: "",
    color: "",
    odor: "",
    taste: "",
    textureId: (!textures.loading && textures.length > 0) ? textures[0]._id : "",
    newTexture: "",
    arsenic: "5",
    cadmium: "0.3",
    lead: "10",
    mercury: "0.2",
    nickel_tested: false,
    nickel: "10",
    hm_units: "ppm",
    moisture_max: "",
    moisture_min: "",
    density_max: "",
    density_min: "",
    tpc: 1000,
    tpc_units: "CFU/g",
    ym: 100,
    ym_units: "CFU/g",
    entero: 100,
    entero_units: "MPN/g",
    salmonella: "Negative",
    staph: "Negative",
    ecoli: "Negative",
    paeruTested: false,
    paeru: "Negative",
    pesticideTested: false,
    pesticide_standard: "USP <561>",
    solventTested: false,
    solvent_standard: "Class I",
    rancidity_tested: false,
    peroxide: "",
    anisidine: "",
    totox: "",
    assays: [],
    ids: [],
    soy: false,
    egg: false,
    milk: false,
    fish: false,
    wheat: false,
    peanut: false,
    treeNut: false,
    shellfish: false
  })

  // Clear the badEntries warning after the timer runs out
  const dispatch = useDispatch();
  const [badEntries, setBadEntries] = useState([]);
  const clearTimer = useRef(null);
  const setClear = () => { clearTimer.current = setTimeout(() => {
      setBadEntries([]);
      dispatch(clearMessages());
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
        genus:        (!ids.loading && ids.length > 0) ? ids[0].genus : "",
        species:      (!ids.loading && ids.length > 0) ? ids[0].species : "",
        part:         (!ids.loading && ids.length > 0) ? ids[0].part : "",
        ratio:        (!ids.loading && ids.length > 0) ? ids[0].ratio : "",
        solvent:      (!ids.loading && ids.length > 0) ? ids[0].solvent : "",
        identityId:   (!ids.loading && ids.length > 0) ? ids[0]._id : "",
        newName: "",
        methodId:     (!methods.loading && methods.length > 0) ? methods[0]._id : "",
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
      edited[index].methodId = (idProps.is_botanical === true && hptlcId._id) || ((!methods.loading && methods.length > 0) ? methods[0]._id : "");
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
          ifEditing={false} />
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
        { errorMsg && <Message error={errorMsg} /> }
        <Button type="submit" color="bg-green-300" text="Add New Raw" extraClasses="h-10" />
      </form>
    </div>
  )
}

export default RawAdd;
