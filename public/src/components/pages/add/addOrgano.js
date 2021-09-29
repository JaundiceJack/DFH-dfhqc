const AddOrgano = ({vals, onEntry, textures}) => {
  const labelCs = "mr-2 text-right text-blue-100 font-semibold whitespace-nowrap self-center";
  const inputCs = "rounded my-1 py-1 pl-2 bg-gray-200 w-1/2";


  return (
    <div className="flex flex-col" >
      <h3 className="font-semibold text-blue-100 text-lg">Organoleptics</h3>
      <div className="mb-2 h-px w-full bg-gradient-to-r from-blue-300 to-transparent" />
      <div className="grid grid-cols-3">
        <label className={labelCs}>Color:</label>
        <input className={inputCs+" w-full col-span-2"}
               name="color"
               type="text"
               value={vals.color}
               onChange={onEntry} />
      </div>
      <div className="grid grid-cols-3">
        <label className={labelCs}>Odor:</label>
        <input className={inputCs+" w-full col-span-2"}
               name="odor"
               type="text"
               value={vals.odor}
               onChange={onEntry} />
      </div>
      <div className="grid grid-cols-3">
        <label className={labelCs+" col-span-1"}>Texture:</label>
        <select className="rounded my-1 py-1 pl-2 bg-gray-200 col-span-2"
                name="texture"
                value={vals.texture}
                onChange={onEntry} >
          {textures.map(tex => {
            return (<option key={tex} value={tex}>{tex}</option>)
          })}
        </select>
      </div>
      <div className="grid grid-cols-3 mb-4">
        <label className={labelCs}>Taste:</label>
        <input className={inputCs+" w-full col-span-2"}
               name="taste"
               type="text"
               value={vals.taste}
               onChange={onEntry} />
      </div>
    </div>
  )
}

export default AddOrgano;
