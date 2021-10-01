const SpecHms = ({hmUnits, arsenicMax, cadmiumMax, leadMax, mercuryMax, nickelTested, nickelMax}) => {
  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200">Heavy Metals</h2>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className="grid grid-cols-3 p-2">
        <p className="text-right mr-2">Arsenic:</p>
        <p className="col-span-2">{hmUnits !== 'n/a' && hmUnits !== undefined ? `${arsenicMax} ${hmUnits}` : "N/A"}</p>
        <p className="text-right mr-2">Cadmium:</p>
        <p className="col-span-2">{hmUnits !== 'n/a' && hmUnits !== undefined ? `${cadmiumMax} ${hmUnits}` : "N/A"}</p>
        <p className="text-right mr-2">Lead:</p>
        <p className="col-span-2">{hmUnits !== 'n/a' && hmUnits !== undefined ? `${leadMax} ${hmUnits}` : "N/A"}</p>
        <p className="text-right mr-2">Mercury:</p>
        <p className="col-span-2">{hmUnits !== 'n/a' && hmUnits !== undefined ? `${mercuryMax} ${hmUnits}` : "N/A"}</p>
        <p className="text-right mr-2">Nickel Tested?</p>
        <p className="col-span-2">{nickelTested ? "Yes" : "No"}</p>
        {nickelTested && <p className="text-right mr-2">Nickel:</p>}
        {nickelTested && <p>{hmUnits !== 'n/a' ? `${nickelMax} ${hmUnits}` : "N/A"}</p>}
      </div>
    </div>
  )
}

export default SpecHms;
