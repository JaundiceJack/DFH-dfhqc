const SpecAnnuals = ({ pesticide, solvent, rancidity }) => {
  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200">Annual Tests</h2>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className="grid grid-cols-2 sm:grid-cols-3 p-2">

        <p className="text-right mr-2">Pesticides?</p>
        <p className="col-span-2">{pesticide && pesticide.tested ? "Yes" : "No" || ""}</p>
        {pesticide && pesticide.tested && <p className="text-right mr-2">Standard:</p>}
        {pesticide && pesticide.tested && <p className="col-span-2">{pesticide && pesticide.standard}</p>}
        {pesticide && pesticide.tested && <p className="text-right mr-2">Last Tested:</p>}
        {pesticide && pesticide.tested && <p className="col-span-2">{pesticide && pesticide.last_tested}</p>}

        <div className="h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent col-span-3 my-1" />

        <p className="text-right mr-2">Solvents?</p>
        <p className="col-span-2">{solvent && solvent.tested ? "Yes" : "No" || ""}</p>
        {solvent && solvent.tested && <p className="text-right mr-2">Standard:</p>}
        {solvent && solvent.tested && <p className="col-span-2">{solvent && solvent.standard}</p>}
        {solvent && solvent.tested && <p className="text-right mr-2">Last Tested:</p>}
        {solvent && solvent.tested && <p className="col-span-2">{solvent && solvent.last_tested}</p>}

        <div className="h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent col-span-3 my-1" />

        <p className="text-right mr-2">Rancidity?</p>
        <p className="col-span-2">{rancidity && rancidity.tested ? "Yes" : "No" || ""}</p>
        {rancidity && rancidity.tested && <p className="text-right mr-2">Peroxide Max:</p>}
        {rancidity && rancidity.tested && <p className="col-span-2">{rancidity && rancidity.peroxide}</p>}
        {rancidity && rancidity.tested && <p className="text-right mr-2">P-Anisidine Max:</p>}
        {rancidity && rancidity.tested && <p className="col-span-2">{rancidity && rancidity.anisidine}</p>}
        {rancidity && rancidity.tested && <p className="text-right mr-2">TOTOX Max:</p>}
        {rancidity && rancidity.tested && <p className="col-span-2">{rancidity && rancidity.totox}</p>}
        {rancidity && rancidity.tested && <p className="text-right mr-2">Last Tested:</p>}
        {rancidity && rancidity.tested && <p className="col-span-2">{rancidity && rancidity.last_tested}</p>}
      </div>
    </div>
  )
}

export default SpecAnnuals;
