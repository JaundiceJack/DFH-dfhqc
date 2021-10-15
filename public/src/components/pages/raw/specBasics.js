const SpecBasics = ({ raw }) => {
  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200">Basics</h2>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className="grid grid-cols-4 p-2">

        <p className="text-right mr-2">Name:</p>
        <p className="capitalize col-span-3">
          {raw && raw.name}</p>

        <p className="text-right mr-2">Item #:</p>
        <p className="capitalize col-span-3">
          {raw && raw.number}</p>

        <p className="text-right mr-2">Color:</p>
        <p className="capitalize col-span-3">
          {raw && raw.color}</p>

        <p className="text-right mr-2">Odor:</p>
        <p className="capitalize col-span-3">
          {raw && raw.odor}</p>

        <p className="text-right mr-2">Texture:</p>
        <p className="capitalize col-span-3">
          {raw && raw.texture && raw.texture.name}</p>

        <p className="text-right mr-2">Taste:</p>
        <p className="capitalize col-span-3">
          {raw && raw.taste}</p>
      </div>
    </div>
  )
}

export default SpecBasics;
