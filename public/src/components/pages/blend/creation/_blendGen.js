// Import basics
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector }    from 'react-redux';
// Import server actions
import { addBlend, editBlend } from '../../../../actions/blendActions.js';
// Import form components
import BasicGen      from './basicGen.js';
import IngredientGen from './ingredientGen.js';
import ServingGen    from './servingGen.js';
import HmGen         from './hmGen.js';
// Import other components
import Button        from '../../../inputs/button.js';
import Message       from '../../../misc/message.js';

const BlendGen = ({ toggle, editing=false }) => {
  // Get the list of possible raw ingredients
  const selected = useSelector(state => state.blend.selectedBlend);
  const rawMats  = useSelector(state => state.raw.raws);
  const units    = useSelector(state => state.unit.units);

  // Set internal state variables for the form
  const [blendVals, setBlendVals] = useState({
    _id: editing ?
      (selected && selected._id) :
      null,
    number: editing ?
      (selected && selected.number) :
      "",
    name: editing ?
      (selected && selected.name) :
      "",
    batch_size: editing ?
      (selected && selected.batch_size) :
      "",
    units_per_serving: editing ?
      (selected && selected.units_per_serving) :
      "1",
    customer: editing ?
      (selected && selected.customer) :
      "dfh",
    ingredients: editing ?
      (selected && selected.ingredients.map(ing => {
        return {
          raw:     ing.raw._id,
          claim:   ing.claim,
          units:   ing.units,
          potency: ing.potency,
          overage: ing.overage,
          type:    ing.type
        }
      })) :
      [],
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
        "10",
      nickel_tested: editing ?
        (selected && selected.hm && selected.hm.nickel_tested) :
        false,
      units: editing ?
        (selected && selected.hm && selected.hm.units) :
        "ppm",
    }
  });

  // Clear the badEntries after the timer runs out and get options on load
  const [badEntries, setBadEntries] = useState([]);
  const clearTimer = useRef(null);
  const setClear = () => { clearTimer.current = setTimeout(() => {
      setBadEntries([]);
      clearTimer.current = null;
    }, 5000);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    return () => { clearTimer.current && clearTimeout(clearTimer.current) };
  }, [dispatch]);

  // Handle the new blend form submission
  const onSubmit = e => {
    e.preventDefault();
    // Validate Entries
    let errs = []
    if (blendVals.number === "" || blendVals.number === null)
      errs.push("Please enter an item number.");
    if (blendVals.name === "" || blendVals.name === null )
      errs.push("Please enter an item name.")
    setBadEntries(errs);
    // Create a new blend
    if (errs.length === 0 && !clearTimer.current) { editing ? dispatch(editBlend(blendVals)) : dispatch(addBlend(blendVals)); }
    // Hide the form on submission
    errs.length !== 0 && !clearTimer.current ? setClear() : toggle();
  }

  // Handle events
  const onEntry = e => { setBlendVals({...blendVals, [e.target.name]: e.target.value })}
  const onClick = e => { setBlendVals({...blendVals, [e.target.name]: !blendVals[e.target.name] })}
  const setHm   = e => { setBlendVals({...blendVals,
    hm: {...blendVals.hm, [e.target.name]: e.target.value }})}
  const clickHm   = e => { setBlendVals({...blendVals,
    hm: {...blendVals.hm, [e.target.name]: !blendVals.hm[e.target.name] }})}

  // Set up ingredient input
  const onAddIngredient = () => {
    setBlendVals({ ...blendVals, ingredients: [...blendVals.ingredients,
      {
        raw:     "613a37debc44f562dcb68491",
        claim:   "",
        units:   "mg/serving",
        potency: "100",
        type:    "vitamin"
      }
    ]})
  }
  const onRemoveIngredient = () => {
    if (blendVals.ingredients.length > 0) {
      setBlendVals({
        ...blendVals,
        ingredients: blendVals.ingredients.slice(0, blendVals.ingredients.length-1)
      })
    }
  }
  const onEditIngredient = (e, index) => {
    let edited = [...blendVals.ingredients];
    edited[index][e.target.name] = e.target.value;
    setBlendVals({...blendVals, ingredients: edited});
  }

  return (
    <div className="mx-4 my-2">
      <form className="flex flex-col" onSubmit={onSubmit}>

        <BasicGen vals={blendVals} onEntry={onEntry} ifEditing={editing} />

        <IngredientGen vals={blendVals} ifEditing={editing}
          onAdd={onAddIngredient} onEdit={onEditIngredient} onRemove={onRemoveIngredient}
          rawOptions={rawMats} unitOptions={units} />

        <ServingGen vals={blendVals} onEntry={onEntry} ifEditing={editing} />

        <HmGen vals={blendVals.hm} onEntry={setHm} onClick={clickHm} ifEditing={editing} />

        <div className="h-6" />
        { badEntries.map(err => <Message error={err} /> )  }
        <Button type="submit" color="bg-green-300" text="Apply Changes" extraClasses="h-10" />
      </form>
    </div>
  )
}

export default BlendGen;
