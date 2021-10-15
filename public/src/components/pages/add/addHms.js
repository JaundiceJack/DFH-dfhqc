const AddHms = ({vals, onEntry, onClick}) => {
  const labelCs = "mr-2 text-right text-blue-100 font-semibold whitespace-nowrap self-center";
  const inputCs = "rounded my-1 py-1 pl-2 bg-gray-200 w-1/2";

/*
  capsules don't have hm testing
  i need a way to toggle the testing
  if hm_units === n/a, i can hide others and keep values
  then whether its tested or not hinges on the unit,
  not ideal but easy,

*/

  return (
    <div className="flex flex-col" >
      <h3 className="font-semibold text-blue-100 text-lg">Heavy Metals</h3>
      <div className="mb-2 h-px w-full bg-gradient-to-r from-blue-300 to-transparent" />
      <div className="grid grid-cols-3">
        <p className={labelCs}>HM Units:</p>
        <select name="hm_units"
                value={vals.hm_units}
                onChange={onEntry}
                className={inputCs+" w-full"}>
          <option value="ppm">ppm</option>
          <option value="μg/sg">μg/sg</option>
          <option value="μg/cap">μg/cap</option>
          <option value="μg/tab">μg/tab</option>
          <option value="μg/mL">μg/mL</option>
          <option value="n/a">N/A</option>
        </select>
      </div>
      {vals.hm_units !== 'n/a' &&
        <div>
          <div className="grid grid-cols-3">
            <p className={labelCs}>As Max:</p>
            <input type="text"
                   name="arsenic"
                   value={vals.arsenic}
                   onChange={onEntry}
                   className={inputCs+" w-full"} />
            <p className="text-blue-100 font-semibold ml-2">{vals.hm_units}</p>
          </div>
          <div className="grid grid-cols-3">
            <p className={labelCs}>Cd Max:</p>
            <input type="text"
                   name="cadmium"
                   value={vals.cadmium}
                   onChange={onEntry}
                   className={inputCs+" w-full"}/>
            <p className="text-blue-100 font-semibold ml-2">{vals.hm_units}</p>
          </div>
          <div className="grid grid-cols-3">
            <p className={labelCs} >Pb Max:</p>
            <input type="text"
                   name="lead"
                   value={vals.lead}
                   onChange={onEntry}
                   className={inputCs+" w-full"} />
            <p className="text-blue-100 font-semibold ml-2">{vals.hm_units}</p>
          </div>
          <div className="grid grid-cols-3 mb-2">
            <p className={labelCs}>Hg Max:</p>
            <input type="text"
                   name="mercury"
                   value={vals.mercury}
                   onChange={onEntry}
                   className={inputCs+" w-full"}/>
            <p className="text-blue-100 font-semibold ml-2">{vals.hm_units}</p>
          </div>
          <div className="grid grid-cols-3 mb-4">
            {!vals.nickel_tested && <p className={labelCs}>Nickel Tested?</p>}
            {vals.nickel_tested && <p className={labelCs}>Nickel Max:</p>}
            {vals.nickel_tested &&
              <input type="text"
                     name="nickel"
                     value={vals.nickel}
                     onChange={onEntry}
                     className={inputCs+" w-full"} /> }
            <input type="checkbox"
                   name="nickel_tested"
                   value={vals.nickel_tested}
                   defaultChecked={vals.nickel_tested}
                   onClick={onClick}
                   className="ml-2 mt-1"/>
          </div>
        </div>
      }
    </div>
  )
}

export default AddHms;
