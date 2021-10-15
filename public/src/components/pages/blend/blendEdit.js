// Import basics
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import server actions
import { editBlend } from '../../../actions/blendActions';
// Import components
import AddBasic      from '../add/addBasic';
import AddIngredient from '../add/addIngredient';
import AddBlendInfo  from '../add/addBlendInfo';
import Button        from '../../button.js';
import Message       from '../../message.js';

const BlendEdit = ({toggleEdit}) => {
  // Get the list of possible raw ingredients
  const selected = useSelector(state => state.blend.selectedBlend);
  const rawMats = useSelector(state => state.raw.raws);
  const units    = useSelector(state => state.unit.units);
  // Set internal state variables for the form
  const [blendVals, setBlendVals] = useState(
    {
      _id:               selected._id,
      number:            selected.number,
      name:              selected.name,
      batch_size:        selected.batch_size,
      units_per_serving: selected.units_per_serving,
      customer: "dfh",
      ingredients:       selected.ingredients.map(ing => {
        return {
          raw:     ing.raw._id,
          claim:   ing.claim,
          units:   ing.units,
          potency: ing.potency,
          overage: ing.overage,
          type:    ing.type
        }
      }),
    }
  );

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
    if (errs.length === 0 && !clearTimer.current) { dispatch(editBlend(blendVals)); }
    // Hide the form on submission
    errs.length !== 0 && !clearTimer.current ? setClear() : toggleEdit();
  }

  // Handle events
  const onEntry = (e) => { setBlendVals({...blendVals, [e.target.name]: e.target.value })}
  //const onClick = (e) => { setBlendVals({...blendVals, [e.target.name]: !blendVals[e.target.name] })}
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

        <AddBasic
          vals={blendVals}
          onEntry={onEntry}
          ifEditing={true} />
        <AddIngredient
          vals={blendVals}
          onAdd={onAddIngredient}
          onRemove={onRemoveIngredient}
          onEdit={onEditIngredient}
          ifEditing={true}
          rawOptions={rawMats}
          unitOptions={units} />
        <AddBlendInfo
          vals={blendVals}
          onEntry={onEntry}
          ifEditing={true} />

        <div className="h-6" />
        { badEntries.map(err => <Message error={err} /> )  }
        <Button type="submit" color="bg-green-300" text="Apply Changes" extraClasses="h-10" />
      </form>
    </div>
  )
}

export default BlendEdit;
