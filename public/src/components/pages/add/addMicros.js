const AddMicros = ({vals, onEntry, onClick}) => {
  const labelCs = "mr-2 text-right text-blue-100 font-semibold whitespace-nowrap self-center";

  return (
    <div className="flex flex-col" >
      <h3 className="font-semibold text-blue-100 text-lg">Micros</h3>
      <div className="mb-2 h-px w-full bg-gradient-to-r from-blue-300 to-transparent" />
      <div className="grid grid-cols-3">
        <p className={labelCs}>TPC Max:</p>
        <input type="text"
               name="tpc"
               value={vals.tpc || ""}
               onChange={onEntry}
               className="rounded my-1 py-1 pl-2 bg-gray-200" />
        <select name="tpc_units"
                value={vals.tpc_units}
                onChange={onEntry}
                className="rounded my-1 py-1 pl-2 bg-gray-200 w-20 ml-2" >
          <option value="CFU/g">CFU/g</option>
          <option value="CFU/mL">CFU/mL</option>
        </select>
      </div>
      <div className="grid grid-cols-3">
        <p className={labelCs}>Y&M Max:</p>
        <input type="text"
               name="ym"
               value={vals.ym || ""}
               onChange={onEntry}
               className="rounded my-1 py-1 pl-2 bg-gray-200" />
        <select name="ym_units"
                value={vals.ym_units}
                onChange={onEntry}
                className="rounded my-1 py-1 pl-2 bg-gray-200 w-20 ml-2" >
          <option value="CFU/g">CFU/g</option>
          <option value="CFU/mL">CFU/mL</option>
        </select>
      </div>
      <div className="grid grid-cols-3">
        <p className={labelCs}>Entero. Max:</p>
        <input type="text"
               name="entero"
               value={vals.entero || ""}
               onChange={onEntry}
               className="rounded my-1 py-1 pl-2 bg-gray-200" />
        <select name="entero_units"
                value={vals.entero_units}
                onChange={onEntry}
                className="rounded my-1 py-1 pl-2 bg-gray-200 w-20 ml-2" >
          <option value="MPN/g">MPN/g</option>
          <option value="MPN/mL">MPN/mL</option>
        </select>
      </div>
      <div className="grid grid-cols-3">
        <p className={labelCs}>Salmonella:</p>
        <select name="salmonella"
                value={vals.salmonella}
                onChange={onEntry}
                className="rounded my-1 py-1 pl-2 bg-gray-200" >
          <option value="Negative">Negative</option>
          <option value="Positive">Positive</option>
        </select>
      </div>
      <div className="grid grid-cols-3">
        <p className={labelCs}>Staph:</p>
        <select name="staph"
                value={vals.staph}
                onChange={onEntry}
                className="rounded my-1 py-1 pl-2 bg-gray-200" >
          <option value="Negative">Negative</option>
          <option value="Positive">Positive</option>
        </select>
      </div>
      <div className="grid grid-cols-3 mb-2">
        <p className={labelCs}>E. Coli:</p>
        <select name="ecoli"
                value={vals.ecoli}
                onChange={onEntry}
                className="rounded my-1 py-1 pl-2 bg-gray-200" >
          <option value="Negative">Negative</option>
          <option value="Positive">Positive</option>
        </select>
      </div>
      <div className="grid grid-cols-3 mb-4">
        {!vals.paeru_tested && <p className={labelCs}>P. Aeru. Tested?</p>}
        {vals.paeru_tested && <p className={labelCs}>P. Aeru. Max:</p>}
        {vals.paeru_tested &&
          <select name="paeru"
                  value={vals.paeru}
                  onChange={onEntry}
                  className="rounded my-1 py-1 pl-2 bg-gray-200" >
            <option value="Negative">Negative</option>
            <option value="Positive">Positive</option>
          </select>
        }
        <input type="checkbox"
               name="paeru_tested"               
               value={vals.paeru_tested}
               defaultChecked={vals.paeru_tested}
               onClick={onClick}
               className="ml-4 mt-1 justify-self-start" />
      </div>
    </div>
  )
}

export default AddMicros;
