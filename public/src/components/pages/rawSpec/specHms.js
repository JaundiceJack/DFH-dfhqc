const SpecHms = ({hmUnits, arsenicMax, cadmiumMax, leadMax, mercuryMax, nickelTested, nickelMax}) => {
  return (
    <div className="bg-gray-600 rounded p-2 text-blue-100 font-semibold">
      <h2 className="text-lg text-left ml-2 underline">Heavy Metals</h2>
      <div className="grid grid-cols-2">
        <p className="text-right mr-2">Arsenic:</p>
        <p>{hmUnits !== 'n/a' && hmUnits !== undefined ? `${arsenicMax} ${hmUnits}` : "N/A"}</p>
        <p className="text-right mr-2">Cadmium:</p>
        <p>{hmUnits !== 'n/a' && hmUnits !== undefined ? `${cadmiumMax} ${hmUnits}` : "N/A"}</p>
        <p className="text-right mr-2">Lead:</p>
        <p>{hmUnits !== 'n/a' && hmUnits !== undefined ? `${leadMax} ${hmUnits}` : "N/A"}</p>
        <p className="text-right mr-2">Mercury:</p>
        <p>{hmUnits !== 'n/a' && hmUnits !== undefined ? `${mercuryMax} ${hmUnits}` : "N/A"}</p>
        <p className="text-right mr-2">Nickel Tested?</p>
        <p>{nickelTested ? "Yes" : "No"}</p>
        {nickelTested && <p className="text-right mr-2">Nickel:</p>}
        {nickelTested && <p>{hmUnits !== 'n/a' ? `${nickelMax} ${hmUnits}` : "N/A"}</p>}
      </div>
    </div>
  )
}

export default SpecHms;
