const InfoInventory = ({ lot }) => {
  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200">Inventory</h2>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className="grid grid-cols-4 p-2">
        <p className="text-right mr-2">Amount:</p>
        <p className="col-span-3 self-end">
          {lot && lot.inventory && lot.inventory.amount} {lot && lot.inventory && lot.inventory.units}</p>
        <p className="text-right mr-2">Status:</p>
        <p className="col-span-3">
          {lot && lot.inventory && lot.inventory.status}</p>
      </div>
    </div>
  )
}

export default InfoInventory;
