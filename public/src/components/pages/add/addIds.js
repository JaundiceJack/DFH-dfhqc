import Button from '../../button.js';

const AddIds = ({vals, onAdd, onRemove, onEdit, onIdChange, nameOptions, methodOptions}) => {
  const labelCs = "mr-2 text-right text-blue-100 font-semibold whitespace-nowrap self-center";
  const inputCs = "rounded my-1 py-1 pl-2 w-full opacity-100 disabled:opacity-70 ";
  const buttonCs = " rounded py-1 px-2 mx-1 font-semibold transform duration-75" +
                   " ease-in-out hover:scale-105 hover:opacity-75 opacity-50 ";


  return (
    <div className="flex flex-col">
      <h3 className="font-semibold text-blue-100 text-lg">Identity</h3>
      <div className="mb-2 h-px w-full bg-gradient-to-r from-blue-300 to-transparent" />
      <div className="grid grid-cols-4 gap-x-4 mb-4">
        {vals.ids.map((id, index) => {
          return (
            <div key={index}
                 className="col-span-4 grid grid-cols-6 rounded-lg border border-gray-400 p-2 mb-2">

              <p className={labelCs+" col-span-2"}>Name:</p>
              <select name="identityId"
                      value={id.identityId}
                      onChange={e => onIdChange(e, index)}
                      className="capitalize col-span-4 rounded my-1 py-1 pl-2 bg-gray-200">
                {nameOptions.length > 0 ? nameOptions.map((name, index) =>
                  ( <option key={index} value={name._id}>{name.name}</option> ) )
                  : <option value=""></option> }
                  <option value="New Id">New Id</option>
              </select>

              {id.identityId === "New Id" &&
                <div className="grid grid-cols-6 col-span-6">
                  <p className={labelCs+" col-span-2"}>New Name:</p>
                  <input type="text"
                         name="newName"
                         value={id.newName}
                         onChange={e => onEdit(e, index)}
                         className={inputCs+' col-span-4'} />
                </div>}

              <p className={labelCs+" col-span-2"}>Pos/Neg:</p>
              <select name="posneg"
                      value={id.posneg}
                      onChange={e => onEdit(e, index)}
                      className="col-span-4 rounded my-1 py-1 pl-2 bg-gray-200" >
                <option value="Positive">Positive</option>
                <option value="Negative">Negative</option>
              </select>


{/* The bug here is, when the id is changed, it keeps the other values,
  so if an id were submitted, without genus etc, the hidden values would be assigned to it
  So, when this box is unchecked, i need to clear out the genus etc values
  also, when editing, if the selected id is not found in the idOptions, the genus etc inputs should be enabled,
  otherwise they will be for an existing id and shouldn't be changed */}
              <p className={labelCs+" col-span-2 h-8 mt-1"}>Botanical ID?</p>
              <input type="checkbox"
                     name="is_botanical"
                     value={id.is_botanical}
                     checked={id.is_botanical}
                     onClick={e => onEdit(e, index)}
                     disabled={id.identityId !== "New Id"}
                     className={"col-span-4 justify-self-start ml-2 mt-1"} />

              {id.is_botanical &&
                <p className={labelCs+" col-span-2"}>Genus:</p>}
              {id.is_botanical &&
                <input type="text"
                       name="genus"
                       value={id.genus}
                       onChange={e => onEdit(e, index)}
                       disabled={id.identityId !== "New Id"}
                       className={inputCs+"col-span-4"} /> }
              {id.is_botanical &&
                <p className={labelCs+" col-span-2"}>Species:</p>}
              {id.is_botanical &&
                <input type="text"
                       name="species"
                       value={id.species}
                       onChange={e => onEdit(e, index)}
                       disabled={id.identityId !== "New Id"}
                       className={inputCs+"col-span-4"}/>}
              {id.is_botanical &&
                <p className={labelCs+" col-span-2"}>Plant Part:</p>}
              {id.is_botanical &&
                <input type="text"
                       name="part"
                       value={id.part}
                       onChange={e => onEdit(e, index)}
                       disabled={id.identityId !== "New Id"}
                       className={inputCs+"col-span-4"}/>}
              {id.is_botanical &&
                <p className={labelCs+" col-span-2"}>Solvent:</p>}
              {id.is_botanical &&
                <input type="text"
                       name="solvent"
                       value={id.solvent}
                       onChange={e => onEdit(e, index)}
                       disabled={id.identityId !== "New Id"}
                       className={inputCs+"col-span-4"}/>}
              {id.is_botanical &&
                <p className={labelCs+" col-span-2"}>Ratio:</p>}
              {id.is_botanical &&
                <input type="text"
                       name="ratio"
                       value={id.ratio}
                       onChange={e => onEdit(e, index)}
                       disabled={id.identityId !== "New Id"}
                       className={inputCs+"col-span-4"}/>}
              <p className={labelCs+" col-span-2"}>Method:</p>
              <select name="methodId"
                      value={id.methodId}
                      onChange={e => onEdit(e, index)}
                      className={"col-span-4 rounded my-1 py-1 pl-2 bg-gray-200"} >
                {methodOptions.length > 0 ? methodOptions.map((method, index) =>
                  ( <option key={index} value={method._id}>{method.name}</option> ) )
                  : <option value=""></option>}
                  <option value="New Method">New Method</option>
              </select>

              {id.methodId === "New Method" &&
                <div className="grid grid-cols-6 col-span-6">
                  <p className="col-span-2 text-blue-100 font-semibold ml-2">New Method:</p>
                  <input type="text"
                         name="newMethod"
                         value={id.newMethod}
                         onChange={e => onEdit(e, index)}
                         className={inputCs+' col-span-4'} />
                </div>
              }
            </div>
          )
        })}
        <Button color="bg-blue-300" text="+ Identity" onClick={onAdd} extraClasses="w-full h-8 col-span-2"/>
        <Button color="bg-red-400"  text="- Identity" onClick={onRemove} extraClasses="w-full h-8 col-span-2"/>
      </div>
    </div>
  )
}

export default AddIds;
