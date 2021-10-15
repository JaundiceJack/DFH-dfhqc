const AddOrgano = ({ vals, onEntry, textures }) => {
  const labelCs = "mr-2 text-right text-blue-100 font-semibold whitespace-nowrap self-center";
  const inputCs = "rounded my-1 py-1 pl-2 bg-gray-200 w-1/2";


  return (
    <div className="flex flex-col" >
      <h3 className="font-semibold text-blue-100 text-lg">Organoleptics</h3>
      <div className="mb-2 h-px w-full bg-gradient-to-r from-blue-300 to-transparent" />
      <div className="grid grid-cols-3">
        <label className={labelCs}>Color:</label>
        <input type="text"
               name="color"
               value={vals.color}
               onChange={onEntry}
               className={inputCs+" w-full col-span-2"} />
      </div>
      <div className="grid grid-cols-3">
        <label className={labelCs}>Odor:</label>
        <input type="text"
               name="odor"
               value={vals.odor}
               onChange={onEntry}
               className={inputCs+" w-full col-span-2"} />
      </div>
      <div className="grid grid-cols-3">
        <label className={labelCs+" col-span-1"}>Texture:</label>
        <select name="textureId"
                value={vals.textureId}
                onChange={onEntry}
                className="rounded my-1 py-1 pl-2 bg-gray-200 col-span-2" >
          {textures.map((tex, index) => {
            return (<option key={index} value={tex._id}>{tex.name}</option>)
          })}
          <option value="New Texture">New Texture</option>
        </select>
      </div>

      {vals.textureId === "New Texture" &&
        <div className="grid grid-cols-3">
          <p className={labelCs+" col-span-1"}>New Texture:</p>
          <input type="text"
                 name="newTexture"
                 value={vals.newTexture}
                 onChange={onEntry}
                 className={inputCs+' w-full col-span-2'} />
        </div>}


      <div className="grid grid-cols-3 mb-4">
        <label className={labelCs}>Taste:</label>
        <input type="text"
               name="taste"
               value={vals.taste}
               onChange={onEntry}
               className={inputCs+" w-full col-span-2"} />
      </div>
    </div>
  )
}

export default AddOrgano;
