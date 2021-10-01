const SpecBasics = ({name, number, color, odor, texture, taste}) => {
  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200">Basics</h2>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className="grid grid-cols-4 p-2">
        <p className="text-right mr-2">Name:</p>
        <p className="capitalize col-span-3">{name || ""}</p>
        <p className="text-right mr-2">Item #:</p>
        <p className="capitalize col-span-3">{number || ""}</p>
        <p className="text-right mr-2">Color:</p>
        <p className="capitalize col-span-3">{color || ""}</p>
        <p className="text-right mr-2">Odor:</p>
        <p className="capitalize col-span-3">{odor || ""}</p>
        <p className="text-right mr-2">Texture:</p>
        <p className="capitalize col-span-3">{texture || ""}</p>
        <p className="text-right mr-2">Taste:</p>
        <p className="capitalize col-span-3">{taste || ""}</p>
      </div>
    </div>
  )
}

export default SpecBasics;
