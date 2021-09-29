const AddBlendItem = ({ vals, onEntry, blendOptions }) => {
  const labelCs = "mr-2 text-right text-blue-100 font-semibold whitespace-nowrap self-center";
  const inputCs = "rounded my-1 py-1 pl-2 bg-gray-200 w-1/2";
  const buttonCs = " rounded py-1 px-2 mx-1 font-semibold transform duration-75" +
                   " ease-in-out hover:scale-105 hover:opacity-75 opacity-50 ";

  return (
    <div className="flex flex-col">
      <h3 className="font-semibold text-blue-100 text-lg">Blend</h3>
      <div className="mb-2 h-px w-full bg-gradient-to-r from-blue-300 to-transparent" />
      <div className="grid grid-cols-4 mb-4">
        <div className={"col-span-4 grid grid-cols-6 rounded-lg " +
                                      "border border-gray-400 p-2 mb-2"}>
          <p className="col-span-2 text-blue-100 font-semibold ml-2 self-center">Ingredient:</p>
          <select name="blendId"
                  value={vals.blendId}
                  className="col-span-4 rounded my-1 py-1 pl-2 bg-gray-200"
                  onChange={onEntry} >
            {blendOptions.length > 0 ?
              blendOptions.map((option, index) => (
                <option key={index} value={option._id}>
                  {option.number} - {option.name}</option> )) :
            <option value=""></option> }
          </select>
        </div>
      </div>
    </div>
  )
}

export default AddBlendItem;
