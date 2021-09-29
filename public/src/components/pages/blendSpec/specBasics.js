const SpecBasics = ({name, number, serving, batchSize, servingUnits, fillWeight }) => {
  return (
    <div className="bg-gray-600 rounded p-2 text-blue-100 font-semibold">
      <h2 className="text-lg text-left ml-2 underline">Basics</h2>
      <div className="grid grid-cols-2 ">
        <p className="text-right mr-2">Name:</p>
        <p className="capitalize">{name || ""}</p>
        <p className="text-right mr-2">Item #:</p>
        <p className="capitalize">{number || ""}</p>
        <p className="text-right mr-2">Serving Size:</p>
        <p className="">{serving || ""} {serving && "mg"}</p>
        <p className="text-right mr-2">Batch Size:</p>
        <p className="">{batchSize || ""} {"kg"}</p>
        <p className="text-right mr-2">Units per serving:</p>
        <p className="">{servingUnits || ""}</p>
        <p className="text-right mr-2">Fill Weight:</p>
        <p className="">{fillWeight || ""} {fillWeight && "mg"}</p>
      </div>
    </div>
  )
}

export default SpecBasics;
