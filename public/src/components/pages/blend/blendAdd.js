// Import basics
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import server actions
import { addBlend }  from '../../../actions/blendActions';
// Import components
import AddBasic      from '../add/addBasic';
import AddIngredient from '../add/addIngredient';
import AddBlendInfo  from '../add/addBlendInfo';
import Button        from '../../button.js';
import Message       from '../../message.js';

const BlendAdd = ({toggleAdd}) => {
  // Get the list of possible raw ingredients
  const rawMats = useSelector(state => state.raw.raws).sort((a,b)=>b.number<a.number);
  const units    = useSelector(state => state.unit.units);
  // Set internal state variables for the form
  const [blendVals, setBlendVals] = useState(
    {
      number: "",
      name:   "",
      batch_size: "",
      units_per_serving: "1",
      ingredients: [],
      customer: "dfh",
    }
  );

  // Clear the badEntries after the timer runs out and get options on load
  const [badEntries, setBadEntries] = useState([]);
  const clearTimer = useRef(null);
  const cleanup = () => { clearTimer.current = setTimeout(() => {
      setBadEntries([]);
      clearTimer.current = null;
    }, 5000);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    return () => { clearTimer.current && clearTimeout(clearTimer.current) }
  }, [dispatch]);

  // Handle the new blend form submission
  const onSubmit = e => {
    e.preventDefault();
    // Validate Entries
    let errs = []
    if (blendVals.number === "" || blendVals.number === null)
      errs.push("Please enter an item number.");
    if (typeof blendVals.number === 'number' )
      errs.push("Item number must be a number.");
    if (blendVals.name === "" || blendVals.name === null )
      errs.push("Please enter an item name.")
    setBadEntries(errs);
    // Create a new blend
    if (errs.length === 0 && !clearTimer.current) { dispatch(addBlend(blendVals)); }
    // Hide the form on submission
    errs.length !== 0 && !clearTimer.current ? cleanup() : toggleAdd();
  }

  // Handle events
  const onEntry = (e) => { setBlendVals({...blendVals, [e.target.name]: e.target.value })}
  //const onClick = (e) => { setBlendVals({...blendVals, [e.target.name]: !blendVals[e.target.name] })}
  // Set up ingredient input
  const onAddIngredient = () => {
    setBlendVals({ ...blendVals, ingredients: [...blendVals.ingredients,
      {
        raw:     (!rawMats.loading && rawMats.length > 0) ? rawMats[0]._id : "613a37debc44f562dcb68491",
        claim:   "",
        units:   "mg/serving",
        potency: "100",
        overage: "0",
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

        <AddBasic      vals={blendVals} onEntry={onEntry} ifEditing={false} />
        <AddIngredient vals={blendVals} onAdd={onAddIngredient}
                       onRemove={onRemoveIngredient} onEdit={onEditIngredient}
                       ifEditing={false} rawOptions={rawMats} unitOptions={units} />
        <AddBlendInfo  vals={blendVals} onEntry={onEntry} ifEditing={false} />

        <div className="h-6" />
        { badEntries.map(err => <Message error={err} /> )  }
        <Button type="submit" color="bg-green-300" text="Add New Blend" extraClasses="h-10" />
      </form>
    </div>
  )
}

export default BlendAdd;
