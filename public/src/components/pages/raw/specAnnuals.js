const SpecAnnuals = ({pestTested, pestStandard, pestLastTested,
                      solvTested, solvStandard, solvLastTested,
                      rancTested, peroxMax, panisMax, totoxMax, rancLastTested}) => {
  return (
    <div className="bg-gray-600 rounded p-2 text-blue-100 font-semibold">
      <h2 className="text-lg text-left ml-2 underline">Annual Tests</h2>
      <div className="grid grid-cols-2">
        <p className="text-right mr-2">Pesticides?</p>
        <p>{pestTested ? "Yes" : "No" || ""}</p>
        {pestTested && <p className="text-right mr-2">Standard:</p>}
        {pestTested && <p className="">{pestStandard}</p>}
        {pestTested && <p className="text-right mr-2">Last Tested:</p>}
        {pestTested && <p className="text-right mr-2">{pestLastTested}</p>}

        <div className="h-px mx-4 bg-gray-100 col-span-2 my-1" />

        <p className="text-right mr-2">Residual Solvents?</p>
        <p>{solvTested ? "Yes" : "No" || ""}</p>
        {solvTested && <p className="text-right mr-2">Standard:</p>}
        {solvTested && <p className="text-right mr-2">{solvStandard}</p>}
        {solvTested && <p className="text-right mr-2">Last Tested:</p>}
        {solvTested && <p className="text-right mr-2">{solvLastTested}</p>}

        <div className="h-px mx-4 bg-gray-100 col-span-2 my-1" />

        <p className="text-right mr-2">Rancidity?</p>
        <p>{rancTested ? "Yes" : "No" || ""}</p>
        {rancTested && <p className="text-right mr-2">Peroxide Max:</p>}
        {rancTested && <p className="">{peroxMax}</p>}
        {rancTested && <p className="text-right mr-2">P-Anisidine Max:</p>}
        {rancTested && <p className="">{panisMax}</p>}
        {rancTested && <p className="text-right mr-2">TOTOX Max:</p>}
        {rancTested && <p className="">{totoxMax}</p>}
        {rancTested && <p className="text-right mr-2">Last Tested:</p>}
        {rancTested && <p className="">{rancLastTested}</p>}
      </div>
    </div>
  )
}

export default SpecAnnuals;
