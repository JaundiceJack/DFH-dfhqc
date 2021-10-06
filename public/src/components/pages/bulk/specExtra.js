const SpecExtra = ({ fill, capsPerBottle, blend }) => {
  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200">Other Info</h2>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className="grid grid-cols-3 my-2">
        <p className="text-right mr-2 col-span-1">Blend Used:</p>
        <p className="capitalize col-span-2">{blend && blend.blend_number || ""} - {blend && blend.blend_name || ""}</p>
        <p className="text-right mr-2 col-span-1">Fill Weight:</p>
        <p className="col-span-2">{fill || ""} {fill && "mg"}</p>
        <p className="text-right mr-2 col-span-1">Caps per Bottle:</p>
        <p className="capitalize col-span-2">{capsPerBottle || ""}</p>
      </div>
    </div>
  )
}

export default SpecExtra;
