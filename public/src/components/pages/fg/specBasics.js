const SpecBasics = ({ name, number }) => {
  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200">Basics</h2>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className="grid grid-cols-3 my-2">
        <p className="text-right mr-2 col-span-1">Name:</p>
        <p className="capitalize col-span-2">{name || ""}</p>
        <p className="text-right mr-2 col-span-1">Item #:</p>
        <p className="capitalize col-span-2">{number || ""}</p>
      </div>
    </div>
  )
}

export default SpecBasics;
