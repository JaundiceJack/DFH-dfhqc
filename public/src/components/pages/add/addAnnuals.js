const AddAnnuals = ({vals, onEntry, onClick}) => {
  const labelCs = "mr-2 text-right text-blue-100 font-semibold whitespace-nowrap self-center";

  return (
    <div className="flex flex-col" >
      <h3 className="font-semibold text-blue-100 text-lg">Annual Tests</h3>
      <div className="mb-2 h-px w-full bg-gradient-to-r from-blue-300 to-transparent" />
      <div className="grid grid-cols-4 mb-4">

        <p className={labelCs+" col-span-3"}>Pesticides Tested?</p>
        <input className="col-span-1 justify-self-start mt-1"
               name="pesticideTested"
               type="checkbox"
               value={vals.pesticideTested}
               defaultChecked={vals.pesticideTested}
               onClick={onClick} />
        {vals.pesticideTested && <p className={labelCs+" col-span-2"}>Pesticide Standard:</p>}
        {vals.pesticideTested &&
          <select className="col-span-2 rounded my-1 py-1 pl-2 bg-gray-200"
                  name="pesticideStandard"
                  value={vals.pesticideStandard}
                  onChange={onEntry} >
            <option value="USP <561>">{"USP <561>"}</option>
            <option value="FDA PAM">FDA PAM</option>
          </select>
        }
        {(vals.pesticideTested || vals.solventTested) && <div className="mx-auto mt-1 mb-4 h-px col-span-4 w-full bg-gradient-to-l from-transparent via-blue-300 to-transparent" />}
        <p className={labelCs+" col-span-3"}>Residual Solvents Tested?</p>
        <input className="col-span-1 justify-self-start mt-1"
               name="solventTested"
               type="checkbox"
               value={vals.solventTested}
               defaultChecked={vals.solventTested}
               onClick={onClick} />
        {vals.solventTested && <p className={labelCs+" col-span-2"}>Solvent Classes:</p>}
        {vals.solventTested &&
          <select className="col-span-2 rounded my-1 py-1 pl-2 bg-gray-200"
                  name="solventStandard"
                  value={vals.solventStandard}
                  onChange={onEntry} >
            <option value="Class I">Class I</option>
            <option value="Class II">Class II</option>
            <option value="Class III">Class III</option>
            <option value="Class I & II">Class I & II</option>
            <option value="Class I & III">Class I & III</option>
            <option value="Class II & III">Class II & III</option>
            <option value="Class I, II, & III">Class I, II, & III</option>
          </select>
        }
        {vals.solventTested && <div className="mx-auto mt-1 mb-4 h-px col-span-4 w-full bg-gradient-to-l from-transparent via-blue-300 to-transparent" />}
        <p className={labelCs+" col-span-3"}>Rancidity Tested?</p>
        <input className="col-span-1 justify-self-start mt-1"
               name="rancidityTested"
               type="checkbox"
               value={vals.rancidityTested}
               defaultChecked={vals.rancidityTested}
               onClick={onClick} />
        {vals.rancidityTested && <p className={labelCs+" col-span-2"}>Peroxide Value:</p>}
        {vals.rancidityTested &&
          <input className="rounded my-1 py-1 pl-2 bg-gray-200"
                 name="peroxideMax"
                 type="text"
                 value={vals.peroxideMax || ""}
                 onChange={onEntry} />
        }
        {vals.rancidityTested && <p className={labelCs+" col-span-2"}>P-Anisidine Value:</p>}
        {vals.rancidityTested &&
          <input className="rounded my-1 py-1 pl-2 bg-gray-200"
                 name="pAnisidineMax"
                 type="text"
                 value={vals.pAnisidineMax || ""}
                 onChange={onEntry} />
        }
        {vals.rancidityTested && <p className={labelCs+" col-span-2"}>TOTOX Value:</p>}
        {vals.rancidityTested &&
          <input className="rounded my-1 py-1 pl-2 bg-gray-200"
                 name="totoxMax"
                 type="text"
                 value={vals.totoxMax}
                 onChange={onEntry} />
        }
      </div>
    </div>
  )
}

export default AddAnnuals;
