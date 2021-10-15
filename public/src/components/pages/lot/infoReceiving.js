const InfoBasic = ({ lot }) => {
  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200">Receiving</h2>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className="grid grid-cols-4 p-2">
        <p className="text-right mr-2">Facility:</p>
        <p className="capitalize col-span-3">
          {lot && lot.receiving && lot.receiving.facility}</p>
        <p className="text-right mr-2">Location:</p>
        <p className="capitalize col-span-3">
          {lot && lot.receiving && lot.receiving.location}</p>
        <p className="text-right mr-2">PO#:</p>
        <p className="capitalize col-span-3">
          {lot && lot.receiving && lot.receiving.purchase_order}</p>
        <p className="text-right mr-2">Vendor:</p>
        <p className="capitalize col-span-3">
          {lot && lot.receiving && lot.receiving.vendor && lot.receiving.vendor.name}</p>
        <p className="text-right mr-2">Mfr'd By:</p>
        <p className="capitalize col-span-3">
          {lot && lot.receiving && lot.receiving.manufacturer && lot.receiving.manufacturer.name}</p>
        <p className="text-right mr-2">Mfr. Lot:</p>
        <p className="capitalize col-span-3">
          {lot && lot.receiving && lot.receiving.manufacturer_lot}</p>
      </div>
    </div>
  )
}

export default InfoBasic;
