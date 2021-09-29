const AddIngredient = ({ vals, onAdd, onRemove, onEdit, rawOptions, unitOptions }) => {
  const labelCs = "mr-2 text-right text-blue-100 font-semibold whitespace-nowrap self-center";
  const inputCs = "rounded my-1 py-1 pl-2 bg-gray-200 w-1/2";
  const buttonCs = " rounded py-1 px-2 mx-1 font-semibold transform duration-75" +
                   " ease-in-out hover:scale-105 hover:opacity-75 opacity-50 ";

  return (
    <div className="flex flex-col">
      <h3 className="font-semibold text-blue-100 text-lg">Raw Ingredients</h3>
      <div className="mb-2 h-px w-full bg-gradient-to-r from-blue-300 to-transparent" />
      <div className="grid grid-cols-4 mb-4">
        {vals.ingredients.map((raw, index) => {
          return (
            <div key={index} className={"col-span-4 grid grid-cols-6 rounded-lg " +
                                        "border border-gray-400 p-2 mb-2"}>
{/* Ingredient Name/Number */}
              <p className="col-span-2 text-blue-100 font-semibold ml-2">Raw:</p>
              <select name="rawId"
                      value={raw.rawId}
                      className="col-span-4 rounded my-1 py-1 pl-2 bg-gray-200"
                      onChange={e => onEdit(e, index)} >
                {rawOptions.length > 0 ?
                  rawOptions.map((option, index) => (
                    <option key={index} value={option._id}>
                      {option.number} - {option.name}</option> )) :
                <option value=""></option> }
              </select>
{/* Claim, Potency, Percent & Type */}
              <p className="col-span-2 text-blue-100 font-semibold ml-2">Claim:</p>
              <input name="claim"
                     value={raw.claim || ""}
                     className={inputCs+" w-full col-span-2"}
                     onChange={e => onEdit(e, index)}
                     type="text" />
              <p className={labelCs+" col-span-2 justify-self-start ml-2"}>mg/serving</p>

              <p className="col-span-2 text-blue-100 font-semibold ml-2">Potency:</p>
              <input name="potency"
                     value={raw.potency || ""}
                     className={inputCs+" col-span-2 w-full"}
                     onChange={e => onEdit(e, index)}
                     type="text" />
              <p className={labelCs+" col-span-2 justify-self-start ml-2"}>%</p>

              <p className="col-span-2 text-blue-100 font-semibold ml-2">Overage:</p>
              <input name="overage"
                     value={raw.overage || ""}
                     className={inputCs+" col-span-2 w-full"}
                     onChange={e => onEdit(e, index)}
                     type="text" />
              <p className={labelCs+" col-span-2 justify-self-start ml-2"}>%</p>

              <p className="col-span-2 text-blue-100 font-semibold ml-2">Ingredient Type:</p>
              <select name="ingredientType"
                      value={raw.ingredientType}
                      className={inputCs+" col-span-4 w-full"}
                      onChange={e => onEdit(e, index)}>
                <option value="vitamin">Vitamin</option>
                <option value="mineral">Mineral</option>
                <option value="other/active">Other/Active</option>
                <option value="excipient">Excipient</option>
              </select>

            </div>
          )
        })}
        <button type="button"
                className={buttonCs+"bg-blue-300 col-start-1 col-end-3 whitespace-nowrap"}
                onClick={onAdd}>+ Ingredient</button>
        <button type="button"
                className={buttonCs+"bg-red-400 col-start-3 col-end-5 whitespace-nowrap"}
                onClick={onRemove}>- Ingredient</button>
      </div>
    </div>
  )
}

export default AddIngredient;
