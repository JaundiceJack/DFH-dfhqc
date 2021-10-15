const AddBasic = ({ vals, onEntry, ifEditing }) => {
  const labelCs = "mr-2 text-right text-blue-100 font-semibold whitespace-nowrap self-center";
  const inputCs = "rounded my-1 py-1 pl-2 bg-gray-200 w-1/2";

  return (
    <div className="flex flex-col mb-3">
      <h3 className="font-semibold text-blue-100 text-lg">Basics</h3>
      <div className="mb-2 h-px w-full bg-gradient-to-r from-blue-300 to-transparent" />
      <div className="grid grid-cols-3">
        <label className={labelCs}>Item #:</label>
        <input type="text"
               name="number"
               value={vals.number}
               onChange={onEntry}
               disabled={ifEditing}
               className={inputCs+" w-full col-span-2 disabled:opacity-50"} />
      </div>
      <div className="grid grid-cols-3">
        <label className={labelCs}>Name:</label>
        <input type="text"
               name="name"
               value={vals.name}
               onChange={onEntry}
               className={inputCs+" w-full col-span-2"} />
      </div>

    </div>
  )
}

export default AddBasic;
