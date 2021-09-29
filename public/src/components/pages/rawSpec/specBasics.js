const SpecBasics = ({name, number, color, odor, texture, taste}) => {
  return (
    <div className="bg-gray-600 rounded p-2 text-blue-100 font-semibold">
      <h2 className="text-lg text-left ml-2 underline">Basics</h2>
      <div className="grid grid-cols-2 ">
        <p className="text-right mr-2">Name:</p>
        <p className="capitalize">{name || ""}</p>
        <p className="text-right mr-2">Item #:</p>
        <p className="capitalize">{number || ""}</p>
        <p className="text-right mr-2">Color:</p>
        <p className="capitalize">{color || ""}</p>
        <p className="text-right mr-2">Odor:</p>
        <p className="capitalize">{odor || ""}</p>
        <p className="text-right mr-2">Texture:</p>
        <p className="capitalize">{texture || ""}</p>
        <p className="text-right mr-2">Taste:</p>
        <p className="capitalize">{taste || "N/A"}</p>
      </div>
    </div>
  )
}

export default SpecBasics;
