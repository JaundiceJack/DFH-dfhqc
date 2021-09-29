const AddPhysical = ({vals, onEntry}) => {
  const labelCs = "mr-2 text-right text-blue-100 font-semibold whitespace-nowrap self-center";

  return (
    <div className="flex flex-col" >
      <h3 className="font-semibold text-blue-100 text-lg">Physical</h3>
      <div className="mb-2 h-px w-full bg-gradient-to-r from-blue-300 to-transparent" />
      <div className="grid grid-cols-6 mb-4">
        <p className={labelCs+" col-span-2"}>Density:</p>
        <input className="rounded my-1 bg-gray-200 w-full px-2"
               name="densityMin"
               type="text"
               value={vals.densityMin || ""}
               onChange={onEntry} />
        <p className="font-bold text-blue-100 mx-auto">-</p>
        <input className="rounded my-1 bg-gray-200 w-full px-2"
               name="densityMax"
               type="text"
               value={vals.densityMax || ""}
               onChange={onEntry} />
        <p className="font-bold text-blue-100 ml-2">g/mL</p>
      </div>
      <div className="grid grid-cols-6 mb-3">
        <p className={labelCs+" col-span-2"}>Moisture:</p>
        <input className="rounded my-1 bg-gray-200 w-full px-2"
               name="moistureMin"
               type="text"
               value={vals.moistureMin || ""}
               onChange={onEntry} />
        <p className="font-bold text-blue-100 mx-auto">-</p>
        <input className="rounded my-1 bg-gray-200 w-full px-2"
               name="moistureMax"
               type="text"
               value={vals.moistureMax || ""}
               onChange={onEntry} />
        <p className="font-bold text-blue-100 ml-2 mr-6">%</p>
      </div>
    </div>
  )
}

export default AddPhysical;
