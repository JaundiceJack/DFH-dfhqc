import Button from '../../button.js';

const AddAssays = ({
  vals, onAdd, onRemove, onEdit, assayOptions, unitOptions, methodOptions
  }) => {

  const inputCs = "rounded my-1 py-1 pl-2 bg-gray-200 w-1/2";

  return (
    <div className="flex flex-col">
      <h3 className="font-semibold text-blue-100 text-lg">Assays</h3>
      <div className="mb-2 h-px w-full bg-gradient-to-r from-blue-300 to-transparent" />
      <div className="grid grid-cols-4 gap-x-4 mb-4">
        {vals.assays.map((assay, index) => {
          return (
            <div key={index}
                 className="col-span-4 grid grid-cols-6 rounded-lg border border-gray-400 p-2 mb-2">
{/* Assay Name */}
              <p className="col-span-2 text-blue-100 font-semibold ml-2">Name:</p>
              <select name="assayId"
                      value={assay.assayId}
                      className="capitalize col-span-4 rounded my-1 py-1 pl-2 bg-gray-200"
                      onChange={e => onEdit(e, index)} >
                {assayOptions.length > 0 ? assayOptions.map((a, index) =>
                  ( <option key={index} value={a._id}>{a.name}</option> ) )
                  : <option value=""></option> }
                  <option value="New Assay">New Assay</option>
              </select>
              {assay.assayId === "New Assay" &&
                <div className="grid grid-cols-6 col-span-6">
                  <p className="col-span-2 text-blue-100 font-semibold ml-2">New Name:</p>
                  <input name="newName"
                         type="text"
                         value={assay.newName}
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
                <select name="unitId"
                        value={assay.unitId}
                        className="rounded my-1 py-1 pl-2 bg-gray-200 ml-2 col-span-2"
                        onChange={e => onEdit(e, index)} >
                  {unitOptions.length > 0 ? unitOptions.map((unit, index) =>
                    ( <option key={index} value={unit._id}>{unit.name}</option> ) )
                    : <option value=""></option>}
                    <option value="New Units">New Units</option>
                </select>
              </div>
              {assay.unitId === "New Units" &&
                <div className="grid grid-cols-6 col-span-6">
                  <p className="col-span-2 text-blue-100 font-semibold ml-2">New Unit:</p>
                  <input name="newUnit"
                         type="text"
                         onChange={e => onEdit(e, index)}
                         className={inputCs+'w-full col-span-4'} />
                </div>
              }

{/* Assay Method */}
              <p className="col-span-2 text-blue-100 font-semibold ml-2">Method:</p>
              <select name="methodId"
                      value={assay.methodId}
                      className="col-span-4 rounded my-1 py-1 pl-2 bg-gray-200"
                      onChange={e => onEdit(e, index)} >
                {methodOptions.length > 0 ? methodOptions.map((method, index) =>
                  ( <option key={index} value={method._id}>{method.name}</option> ) )
                  : <option value=""></option>}
                  <option value="New Method">New Method</option>
              </select>
              {assay.methodId === "New Method" &&
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
        <Button color="bg-blue-300" text="+ Assay" onClick={onAdd} extraClasses="w-full col-span-2"/>
        <Button color="bg-red-400"  text="- Assay" onClick={onRemove} extraClasses="w-full col-span-2"/>
      </div>
    </div>
  )
}

export default AddAssays;
