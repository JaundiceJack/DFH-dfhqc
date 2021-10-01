const SpecMicros = ({tpcMax, tpcUnits, ymMax, ymUnits, enteroMax, enteroUnits,
                     salmonella, staph, ecoli, paeruTested, paeru}) => {
  return (
    <div className="bg-gray-600 rounded p-2 text-blue-100 font-semibold">
      <h2 className="text-lg text-left ml-2 underline">Micros</h2>
      <div className="grid grid-cols-2">
        <p className="text-right mr-2">Total Plate Count:</p>
        <p>{tpcMax && `≤ ${tpcMax} ${tpcUnits}`}</p>
        <p className="text-right mr-2">Yeast & Mold Count:</p>
        <p>{ymMax && `≤ ${ymMax} ${ymUnits}`}</p>
        <p className="text-right mr-2">Enterobacteria:</p>
        <p>{enteroMax && `≤ ${enteroMax} ${enteroUnits}`}</p>
        <p className="text-right mr-2">Salmonella:</p>
        <p>{salmonella || "N/A"}</p>
        <p className="text-right mr-2">Staph:</p>
        <p>{staph || "N/A"}</p>
        <p className="text-right mr-2">E. Coli:</p>
        <p>{ecoli || "N/A"}</p>
        {paeruTested && <p className="text-right mr-2">P. Aeruginosa:</p>}
        {paeruTested && <p>{paeru || "N/A"}</p>}
      </div>
    </div>
  )
}

export default SpecMicros;
