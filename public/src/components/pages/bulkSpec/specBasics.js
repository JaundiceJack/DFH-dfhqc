const SpecBasics = ({ name, number }) => {
  return (
    <div className="bg-gray-600 rounded p-2 text-blue-100 font-semibold">
      <h2 className="text-lg text-left ml-2 underline">Basics</h2>
      <div className="grid grid-cols-3 ">
        <p className="text-right mr-2 col-span-1">Name:</p>
        <p className="capitalize col-span-2">{name || ""}</p>
        <p className="text-right mr-2 col-span-1">Item #:</p>
        <p className="capitalize col-span-2">{number || ""}</p>
      </div>
    </div>
  )
}

export default SpecBasics;
