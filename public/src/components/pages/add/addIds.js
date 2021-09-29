const AddIds = ({vals, onAdd, onRemove, onEdit, nameOptions, methodOptions}) => {
  const labelCs = "mr-2 text-right text-blue-100 font-semibold whitespace-nowrap self-center";
  const inputCs = "rounded my-1 py-1 pl-2 bg-gray-200 w-1/2";
  const buttonCs = " rounded py-1 px-2 mx-1 font-semibold transform duration-75" +
                   " ease-in-out hover:scale-105 hover:opacity-75 opacity-50 ";

  return (
    <div className="flex flex-col">
      <h3 className="font-semibold text-blue-100 text-lg">Identity</h3>
      <div className="mb-2 h-px w-full bg-gradient-to-r from-blue-300 to-transparent" />
      <div className="grid grid-cols-4 mb-4">
        {vals.ids.map((identity, index) => {
          return (
            <div key={index}
                 className="col-span-4 grid grid-cols-6 rounded-lg border border-gray-400 p-2 mb-2">
              <p className="col-span-2 text-blue-100 font-semibold ml-2">Name:</p>
              <select name="name"
                      value={identity.name}
                      className="capitalize col-span-4 rounded my-1 py-1 pl-2 bg-gray-200"
                      onChange={e => onEdit(e, index)} >
                {nameOptions.length > 0 ? nameOptions.map(name =>
                  ( <option key={`${name}`} value={name}>{name}</option> ) )
                  : <option value=""></option> }
                  <option value="New Id">New Id</option>
              </select>
              {identity.name === "New Id" &&
                <div className="grid grid-cols-6 col-span-6">
                  <p className="col-span-2 text-blue-100 font-semibold ml-2">New Name:</p>
                  <input name="newName"
                         type="text"
                         onChange={e => onEdit(e, index)}
                         className={inputCs+'w-full col-span-4'} />
                </div>
              }

              <p className="col-span-2 text-blue-100 font-semibold ml-2">Pos/Neg:</p>
              <select name="posneg"
                      value={identity.posneg}
                      className="col-span-4 rounded my-1 py-1 pl-2 bg-gray-200"
                      onChange={e => onEdit(e, index)} >
                <option value="Positive">Positive</option>
                <option value="Negative">Negative</option>
              </select>

              <p className={labelCs+" col-span-2"}>Botanical ID?</p>
              <input name="isBotanical"
                     value={identity.isBotanical}
                     defaultChecked={identity.isBotanical}
                     className="col-span-4 justify-self-start ml-2 mt-1"
                     onChange={e => onEdit(e, index)}
                     type="checkbox" />

              {identity.isBotanical &&
                <p className={labelCs+" col-span-2"}>Genus:</p>}
              {identity.isBotanical &&
                <input className="rounded my-1 bg-gray-200 w-full col-span-4"
                       name="genus"
                       type="text"
                       value={identity.genus}
                       onChange={e => onEdit(e, index)}/>}
              {identity.isBotanical &&
                <p className={labelCs+" col-span-2"}>Species:</p>}
              {identity.isBotanical &&
                <input className="rounded my-1 bg-gray-200 w-full col-span-4"
                       name="species"
                       type="text"
                       value={identity.species}
                       onChange={e => onEdit(e, index)}/>}
              {identity.isBotanical &&
                <p className={labelCs+" col-span-2"}>Plant Part:</p>}
              {identity.isBotanical &&
                <input className="rounded my-1 bg-gray-200 w-full col-span-4"
                       name="part"
                       type="text"
                       value={identity.part}
                       onChange={e => onEdit(e, index)}/>}
              {identity.isBotanical &&
                <p className={labelCs+" col-span-2"}>Solvent:</p>}
              {identity.isBotanical &&
                <input className="rounded my-1 bg-gray-200 w-full col-span-4"
                       name="solvent"
                       type="text"
                       value={identity.solvent}
                       onChange={e => onEdit(e, index)}/>}
              {identity.isBotanical &&
                <p className={labelCs+" col-span-2"}>Ratio:</p>}
              {identity.isBotanical &&
                <input className="rounded my-1 bg-gray-200 w-full col-span-4"
                       name="ratio"
                       type="text"
                       value={identity.ratio}
                       onChange={e => onEdit(e, index)}/>}
              <p className={labelCs+" col-span-2"}>Method:</p>
              <select name="method"
                      value={identity.method}
                      className="col-span-4 rounded my-1 py-1 pl-2 bg-gray-200"
                      onChange={e => onEdit(e, index)} >
                {methodOptions.length > 0 ? methodOptions.map(method =>
                  ( <option key={`${method}`} value={method}>{method}</option> ) )
                  : <option value=""></option>}
                  <option value="New Method">New Method</option>
              </select>

              {identity.method === "New Method" &&
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
        <button type="button" className={buttonCs+"bg-blue-300 col-start-1 col-end-3 whitespace-nowrap"} onClick={onAdd}>+ Identity</button>
        <button type="button" className={buttonCs+"bg-red-400 col-start-3 col-end-5 whitespace-nowrap"} onClick={onRemove}>- Identity</button>
      </div>
    </div>
  )
}

export default AddIds;
