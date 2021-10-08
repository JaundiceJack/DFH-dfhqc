const InfoBasic = ({lot}) => {
  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200">Basics</h2>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className="grid grid-cols-4 p-2">
        <p className="text-right mr-2">Name:</p>
        <p className="capitalize col-span-3">{lot.item ? lot.item.name : ""}</p>
        <p className="text-right mr-2">Lot #:</p>
        <p className="capitalize col-span-3">{lot.lot || ""}</p>
        <p className="text-right mr-2">Item #:</p>
        <p className="capitalize col-span-3">{lot.item ? lot.item.number : ""}</p>        
        <p className="text-right mr-2">Location:</p>
        <p className="capitalize col-span-3">{lot.facility_location || ""}</p>
      </div>
    </div>
  )
}

export default InfoBasic;
