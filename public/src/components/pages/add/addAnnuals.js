const AddAnnuals = ({ vals, onEntry, onClick }) => {
  const labelCs = "mr-2 text-right text-blue-100 font-semibold whitespace-nowrap self-center";

  return (
    <div className="flex flex-col" >
      <h3 className="font-semibold text-blue-100 text-lg">Annual Tests</h3>
      <div className="mb-2 h-px w-full bg-gradient-to-r from-blue-300 to-transparent" />
      <div className="grid grid-cols-4 mb-4">

        <p className={labelCs+" col-span-3"}>Pesticides Tested?</p>
        <input type="checkbox"
               name="pesticide_tested"
               value={vals.pesticide_tested}
               defaultChecked={vals.pesticide_tested}
               onClick={onClick}
               className="col-span-1 justify-self-start mt-1" />
        {vals.pesticide_tested && <p className={labelCs+" col-span-2"}>Pesticide Standard:</p>}
        {vals.pesticide_tested &&
          <select name="pesticide_standard"
                  value={vals.pesticide_standard}
                  onChange={onEntry}
                  className="col-span-2 rounded my-1 py-1 pl-2 bg-gray-200" >
            <option value="USP <561>">{"USP <561>"}</option>
            <option value="FDA PAM">FDA PAM</option>
          </select>
        }
        {(vals.pesticide_tested || vals.solvent_tested) &&
          <div className={"mx-auto mt-1 mb-4 h-px col-span-4 w-full " +
            "bg-gradient-to-l from-transparent via-blue-300 to-transparent"} />}

        <p className={labelCs+" col-span-3"}>Residual Solvents Tested?</p>
        <input type="checkbox"
               name="solvent_tested"
               value={vals.solvent_tested}
               defaultChecked={vals.solvent_tested}
               onClick={onClick}
               className="col-span-1 justify-self-start mt-1" />
        {vals.solvent_tested && <p className={labelCs+" col-span-2"}>Solvent Classes:</p>}
        {vals.solvent_tested &&
          <select className="col-span-2 rounded my-1 py-1 pl-2 bg-gray-200"
                  name="solvent_standard"
                  value={vals.solvent_standard}
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
        {vals.solvent_tested &&
          <div className={"mx-auto mt-1 mb-4 h-px col-span-4 w-full " +
            "bg-gradient-to-l from-transparent via-blue-300 to-transparent"} />}


        <p className={labelCs+" col-span-3"}>Rancidity Tested?</p>
        <input type="checkbox"
               name="rancidity_tested"
               value={vals.rancidity_tested}
               defaultChecked={vals.rancidity_tested}
               onClick={onClick}
               className="col-span-1 justify-self-start mt-1" />
        {vals.rancidity_tested && <p className={labelCs+" col-span-2"}>Peroxide Value:</p>}
        {vals.rancidity_tested &&
          <input type="text"
                 name="peroxide"
                 value={vals.peroxide || ""}
                 onChange={onEntry}
                 className="rounded my-1 py-1 pl-2 bg-gray-200" />
        }
        {vals.rancidity_tested && <p className={labelCs+" col-span-2"}>P-Anisidine Value:</p>}
        {vals.rancidity_tested &&
          <input type="text"
                 name="anisidine"
                 value={vals.anisidine || ""}
                 onChange={onEntry}
                 className="rounded my-1 py-1 pl-2 bg-gray-200" />
        }
        {vals.rancidity_tested && <p className={labelCs+" col-span-2"}>TOTOX Value:</p>}
        {vals.rancidity_tested &&
          <input type="text"
                 name="totox"
                 value={vals.totox}
                 onChange={onEntry}
                 className="rounded my-1 py-1 pl-2 bg-gray-200"/>
        }
      </div>
    </div>
  )
}

export default AddAnnuals;
