const AddHms = ({vals, onEntry, onClick}) => {
  const labelCs = "mr-2 text-right text-blue-100 font-semibold whitespace-nowrap self-center";
  const inputCs = "rounded my-1 py-1 pl-2 bg-gray-200 w-1/2";

/*
  capsules don't have hm testing
  i need a way to toggle the testing
  if hmUnits === n/a, i can hide others and keep values
  then whether its tested or not hinges on the unit,
  not ideal but easy,

*/

  return (
    <div className="flex flex-col" >
      <h3 className="font-semibold text-blue-100 text-lg">Heavy Metals</h3>
      <div className="mb-2 h-px w-full bg-gradient-to-r from-blue-300 to-transparent" />
      <div className="grid grid-cols-3">
        <p className={labelCs}>HM Units:</p>
        <select className={inputCs+" w-full"}
                name="hmUnits"
                value={vals.hmUnits}
                onChange={onEntry} >
          <option value="ppm">ppm</option>
          <option value="μg/sg">μg/sg</option>
          <option value="μg/cap">μg/cap</option>
          <option value="μg/tab">μg/tab</option>
          <option value="μg/mL">μg/mL</option>
          <option value="n/a">N/A</option>
        </select>
      </div>
      {vals.hmUnits !== 'n/a' &&
        <div>
          <div className="grid grid-cols-3">
            <p className={labelCs}>Arsenic Max:</p>
            <input className={inputCs+" w-full"}
                   name="arsenicMax"
                   type="text"
                   value={vals.arsenicMax}
                   onChange={onEntry} />
            <p className="text-blue-100 font-semibold ml-2">{vals.hmUnits}</p>
          </div>
          <div className="grid grid-cols-3">
            <p className={labelCs}>Cadmium Max:</p>
            <input className={inputCs+" w-full"}
                   name="cadmiumMax"
                   type="text"
                   value={vals.cadmiumMax}
                   onChange={onEntry} />
            <p className="text-blue-100 font-semibold ml-2">{vals.hmUnits}</p>
          </div>
          <div className="grid grid-cols-3">
            <p className={labelCs} >Lead Max:</p>
            <input className={inputCs+" w-full"}
                   name="leadMax"
                   type="text"
                   value={vals.leadMax}
                   onChange={onEntry} />
            <p className="text-blue-100 font-semibold ml-2">{vals.hmUnits}</p>
          </div>
          <div className="grid grid-cols-3 mb-2">
            <p className={labelCs}>Mercury Max:</p>
            <input className={inputCs+" w-full"}
                   name="mercuryMax"
                   type="text"
                   value={vals.mercuryMax}
                   onChange={onEntry} />
            <p className="text-blue-100 font-semibold ml-2">{vals.hmUnits}</p>
          </div>
          <div className="grid grid-cols-3 mb-4">
            {!vals.nickelTested && <p className={labelCs}>Nickel Tested?</p>}
            {vals.nickelTested && <p className={labelCs}>Nickel Max:</p>}
            {vals.nickelTested && <input className={inputCs+" w-full"}
                                    name="nickelMax"
                                    type="text"
                                    value={vals.nickelMax}
                                    onChange={onEntry} />}
            <input className="ml-2 mt-1"
                   name="nickelTested"
                   type="checkbox"
                   defaultChecked={vals.nickelTested}
                   value={vals.nickelTested}
                   onClick={onClick} />
          </div>
        </div>
      }
    </div>
  )
}

export default AddHms;
