import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editBlend } from '../../../actions/blendActions';
import AddBasic from '../add/addBasic';
import AddIngredient from '../add/addIngredient';
import AddBlendInfo from '../add/addBlendInfo';

const BlendEdit = ({toggleEdit}) => {
  // Get the list of possible raw ingredients
  const selected = useSelector(state => state.blend.selectedBlend);
  const rawMats = useSelector(state => state.raw.raws);
  const units = useSelector(state => state.raw.units);
  // Set internal state variables for the form
  const [blendVals, setBlendVals] = useState(
    {
      _id:         selected._id,
      number:      selected.number,
      name:        selected.name,
      batchSize:   selected.batch_size,
      unitsPerServing: selected.units_per_serving,
      ingredients: selected.ingredients.map(ing => {
        return {
          rawId:          ing.raw_id,
          claim:          ing.claim,
          claimUnits:     ing.claim_units,
          newUnits:       "",
          potency:        ing.potency,
          overage:        ing.overage,
          ingredientType: ing.ingredient_type
        }
      }),
      customer: "dfh",
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
        rawId: "613a37debc44f562dcb68491",
        claim: "",
        claimUnits: "mg/serving",
        newUnits: "",
        potency: "100",
        ingredientType: "Vitamin"
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

        <AddBasic      vals={blendVals} onEntry={onEntry} ifEditing={true} />
        <AddIngredient vals={blendVals} onAdd={onAddIngredient}
                       onRemove={onRemoveIngredient} onEdit={onEditIngredient}
                       ifEditing={true} rawOptions={rawMats} unitOptions={units} />
        <AddBlendInfo  vals={blendVals} onEntry={onEntry} rawOptions={rawMats} ifEditing={true} />

        { badEntries.map(err => <div className={errorMsgCs}>{err}</div> )  }
        <button type="submit" className={buttonCs}>
          Edit Blend
        </button>
      </form>
    </div>
  )
}

export default BlendEdit;
