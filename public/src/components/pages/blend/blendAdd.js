import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBlend } from '../../../actions/blendActions';
import AddBasic from '../add/addBasic';
import AddIngredient from '../add/addIngredient';
import AddBlendInfo from '../add/addBlendInfo';

const BlendAdd = ({toggleAdd}) => {
  // Get the list of possible raw ingredients
  const rawMats = useSelector(state => state.raw.raws);
  const units = useSelector(state => state.raw.units);
  // Set internal state variables for the form
  const [blendVals, setBlendVals] = useState(
    {
      number: "",
      name:   "",
      batchSize: "",
      unitsPerServing: "1",
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
        rawId: rawMats.length > 0 ? rawMats[0]._id : "613a37debc44f562dcb68491",
        claim: "",
        claimUnits: "mg/serving",
        newUnits: "",
        potency: "100",
        overage: "0",
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
    <div className="mx-4 my-2">
      <form className="flex flex-col" onSubmit={onSubmit}>

        <AddBasic      vals={blendVals} onEntry={onEntry} ifEditing={false} />
        <AddIngredient vals={blendVals} onAdd={onAddIngredient}
                       onRemove={onRemoveIngredient} onEdit={onEditIngredient}
                       ifEditing={false} rawOptions={rawMats} unitOptions={units} />
        <AddBlendInfo  vals={blendVals} onEntry={onEntry} rawOptions={rawMats} ifEditing={false} />

        { badEntries.map(err => <div className={errorMsgCs}>{err}</div> )  }
        <button type="submit" className={buttonCs}>
          Add New Blend
        </button>
      </form>
    </div>
  )
}

export default BlendAdd;
