const SpecBasics = ({ blend, fillWeight, servingSize }) => {
  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200">Basics</h2>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className="grid grid-cols-2 ">
        <p className="text-right mr-2">Name:</p>
        <p className="capitalize">{blend && blend.name}</p>
        <p className="text-right mr-2">Item #:</p>
        <p className="capitalize">{blend && blend.number}</p>
        <p className="text-right mr-2">Serving Size:</p>
        <p className="">{servingSize && servingSize} {servingSize && "mg"}</p>
        <p className="text-right mr-2">Batch Size:</p>
        <p className="">{blend && blend.batch_size} {blend && blend.batch_size && "kg"}</p>
        <p className="text-right mr-2">Units per serving:</p>
        <p className="">{blend && blend.units_per_serving}</p>
        <p className="text-right mr-2">Fill Weight:</p>
        <p className="">{fillWeight && fillWeight} {fillWeight && "mg"}</p>
      </div>
    </div>
  )
}

export default SpecBasics;
