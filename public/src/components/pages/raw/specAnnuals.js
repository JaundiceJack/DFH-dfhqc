const SpecAnnuals = ({pestTested, pestStandard, pestLastTested,
                      solvTested, solvStandard, solvLastTested,
                      rancTested, peroxMax, panisMax, totoxMax, rancLastTested}) => {
  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200">Annual Tests</h2>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className="grid grid-cols-3 p-2">
        <p className="text-right mr-2">Pesticides?</p>
        <p className="col-span-2">{pestTested ? "Yes" : "No" || ""}</p>
        {pestTested && <p className="text-right mr-2">Standard:</p>}
        {pestTested && <p className="col-span-2">{pestStandard}</p>}
        {pestTested && <p className="text-right mr-2">Last Tested:</p>}
        {pestTested && <p className="col-span-2">{pestLastTested}</p>}

        <div className="h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent col-span-3 my-1" />

        <p className="text-right mr-2">Solvents?</p>
        <p className="col-span-2">{solvTested ? "Yes" : "No" || ""}</p>
        {solvTested && <p className="text-right mr-2">Standard:</p>}
        {solvTested && <p className="col-span-2">{solvStandard}</p>}
        {solvTested && <p className="text-right mr-2">Last Tested:</p>}
        {solvTested && <p className="col-span-2">{solvLastTested}</p>}

        <div className="h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent col-span-3 my-1" />

        <p className="text-right mr-2">Rancidity?</p>
        <p className="col-span-2">{rancTested ? "Yes" : "No" || ""}</p>
        {rancTested && <p className="text-right mr-2">Peroxide Max:</p>}
        {rancTested && <p className="col-span-2">{peroxMax}</p>}
        {rancTested && <p className="text-right mr-2">P-Anisidine Max:</p>}
        {rancTested && <p className="col-span-2">{panisMax}</p>}
        {rancTested && <p className="text-right mr-2">TOTOX Max:</p>}
        {rancTested && <p className="col-span-2">{totoxMax}</p>}
        {rancTested && <p className="text-right mr-2">Last Tested:</p>}
        {rancTested && <p className="col-span-2">{rancLastTested}</p>}
      </div>
    </div>
  )
}

export default SpecAnnuals;
