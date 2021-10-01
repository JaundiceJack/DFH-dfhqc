const SpecMicros = ({tpcMax, tpcUnits, ymMax, ymUnits, enteroMax, enteroUnits,
                     salmonella, staph, ecoli, paeruTested, paeru}) => {
  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200">Micros</h2>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className="grid grid-cols-3 p-2">
        <p className="text-right mr-2">Total Plate Count:</p>
        <p className="col-span-2">{tpcMax && `≤ ${tpcMax} ${tpcUnits}`}</p>
        <p className="text-right mr-2">Yeast & Mold:</p>
        <p className="col-span-2">{ymMax && `≤ ${ymMax} ${ymUnits}`}</p>
        <p className="text-right mr-2">Enterobacteria:</p>
        <p className="col-span-2">{enteroMax && `≤ ${enteroMax} ${enteroUnits}`}</p>
        <p className="text-right mr-2">Salmonella:</p>
        <p className="col-span-2">{salmonella || "N/A"}</p>
        <p className="text-right mr-2">Staph:</p>
        <p className="col-span-2">{staph || "N/A"}</p>
        <p className="text-right mr-2">E. Coli:</p>
        <p className="col-span-2">{ecoli || "N/A"}</p>
        {paeruTested && <p className="text-right mr-2">P. Aeruginosa:</p>}
        {paeruTested && <p className="col-span-2">{paeru || "N/A"}</p>}
      </div>
    </div>
  )
}

export default SpecMicros;
