const AddAssays = ({vals,
    onAdd, onRemove, onEdit,
    nameOptions, unitOptions, methodOptions,
    selectedName, selectedMethod
  }) => {
  const inputCs = "rounded my-1 py-1 pl-2 bg-gray-200 w-1/2";
  const buttonCs = " rounded py-1 px-2 mx-1 font-semibold transform duration-75" +
                   " ease-in-out hover:scale-105 hover:opacity-75 opacity-50 ";

  return (
    <div className="flex flex-col">
      <h3 className="font-semibold text-blue-100 text-lg">Assays</h3>
      <div className="mb-2 h-px w-full bg-gradient-to-r from-blue-300 to-transparent" />
      <div className="grid grid-cols-4 mb-4">
        {vals.assays.map((assay, index) => {
          return (
            <div key={index}
                 className="col-span-4 grid grid-cols-6 rounded-lg border border-gray-400 p-2 mb-2">
{/* Assay Name */}
              <p className="col-span-2 text-blue-100 font-semibold ml-2">Name:</p>
              <select name="name" id="name"
                      value={assay.name}
                      className="capitalize col-span-4 rounded my-1 py-1 pl-2 bg-gray-200"
                      onChange={e => onEdit(e, index)} >
                {nameOptions.length > 0 ? nameOptions.map(name =>
                  ( <option key={`${name}`} value={name}>{name}</option> ) )
                  : <option value=""></option> }
                  <option value="New Assay">New Assay</option>
              </select>
              {assay.name === "New Assay" &&
                <div className="grid grid-cols-6 col-span-6">
                  <p className="col-span-2 text-blue-100 font-semibold ml-2">New Name:</p>
                  <input name="newName"
                         type="text"
                         onChange={e => onEdit(e, index)}
                         className={inputCs+'w-full col-span-4'} />
                </div>
              }
{/* Potency Min and Max */}
              <p className="col-span-2 text-blue-100 font-semibold ml-2">Potency:</p>
              <div className="col-span-4 grid grid-cols-5">
                <input name="min"
                       value={assay.min || ""}
                       className={inputCs+"w-full"}
                       onChange={e => onEdit(e, index)}
                       type="text" />
                <p className="font-bold text-blue-100 mx-auto self-center">-</p>
                <input name="max"
                       value={assay.max || ""}
                       className={inputCs+"w-full"}
                       onChange={e => onEdit(e, index)}
                       type="text" />
                {/* Assay Units */}
                <select name="units"
                        value={assay.units}
                        className="rounded my-1 py-1 pl-2 bg-gray-200 ml-2 col-span-2"
                        onChange={e => onEdit(e, index)} >
                  {unitOptions.length > 0 ? unitOptions.map(unit =>
                    ( <option key={`${unit}`} value={unit}>{unit}</option> ) )
                    : <option value=""></option>}
                    <option value="New Units">New Units</option>
                </select>
              </div>
              {assay.units === "New Units" &&
                <div className="grid grid-cols-6 col-span-6">
                  <p className="col-span-2 text-blue-100 font-semibold ml-2">New Unit:</p>
                  <input name="newUnits"
                         type="text"
                         onChange={e => onEdit(e, index)}
                         className={inputCs+'w-full col-span-4'} />
                </div>
              }

{/* Assay Method */}
              <p className="col-span-2 text-blue-100 font-semibold ml-2">Method:</p>
              <select name="method"
                      value={assay.method}
                      className="col-span-4 rounded my-1 py-1 pl-2 bg-gray-200"
                      onChange={e => onEdit(e, index)} >
                {methodOptions.length > 0 ? methodOptions.map(method =>
                  ( <option key={`${method}`} value={method}>{method}</option> ) )
                  : <option value=""></option>}
                  <option value="New Method">New Method</option>
              </select>
              {assay.method === "New Method" &&
                <div className="grid grid-cols-6 col-span-6">
                  <p className="col-span-2 text-blue-100 font-semibold ml-2">New Method:</p>
                  <input name="newMethod"
                         type="text"
                         onChange={e => onEdit(e, index)}
                         className={inputCs+'w-full col-span-4'} />
                </div>
              }
            </div>
          )
        })}
        <button type="button" className={buttonCs+"bg-blue-300 col-start-1 col-end-3 whitespace-nowrap"} onClick={onAdd}>+ Assay</button>
        <button type="button" className={buttonCs+"bg-red-400 col-start-3 col-end-5 whitespace-nowrap"} onClick={onRemove}>- Assay</button>
      </div>
    </div>
  )
}

export default AddAssays;
