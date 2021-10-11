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
import Button from '../../button.js';
import Message from '../../message.js';

const RawAdd = ({toggleAdd}) => {
  // Get id and assay names from the redux state/server
  const ids = useSelector(state => state.identity.identities);
  const assays = useSelector(state => state.assay.assays.sort((a, b) => b.name < a.name));
  const units = useSelector(state => state.unit.units);
  const methods = useSelector(state => state.method.methods.sort((a, b) => b.name < a.name));
  const textures = useSelector(state => state.texture.textures.sort((a, b) => b.name < a.name));

  // Set internal state variables for the form
  const [rawVals, setRawVals] = useState({
    number: "",
    name: "",
    color: "",
    odor: "",
    taste: "",
    textureId: (!textures.loading && textures.length > 0) ? textures[0]._id : "",
    newTexture: "",
    arsenicMax: "5",
    cadmiumMax: "0.3",
    leadMax: "10",
    mercuryMax: "0.2",
    nickelMax: "10",
    hmUnits: "ppm",
    moistureMax: "",
    moistureMin: "",
    densityMax: "",
    densityMin: "",
    tpcMax: 1000,
    tpcUnits: "CFU/g",
    ymMax: 100,
    ymUnits: "CFU/g",
    enteroMax: 100,
    enteroUnits: "MPN/g",
    salmonella: "Negative",
    staph: "Negative",
    ecoli: "Negative",
    paeru: "Negative",
    pesticideStandard: "USP <561>",
    solventStandard: "Class I",
    peroxideMax: "",
    pAnisidineMax: "",
    totoxMax: "",
    assays: [],
    ids: [],
    rancidityTested: false,
    nickelTested: false,
    paeruTested: false,
    pesticideTested: false,
    solventTested: false,
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
  const setClear   = () => { clearTimer.current = setTimeout(() => {
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
        <Button type="submit" color="bg-green-300" text="Add New Raw" />
      </form>
    </div>
  )
}

export default RawAdd;
