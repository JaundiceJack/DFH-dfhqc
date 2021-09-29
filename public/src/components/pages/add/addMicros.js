const AddMicros = ({vals, onEntry, onClick}) => {
  const labelCs = "mr-2 text-right text-blue-100 font-semibold whitespace-nowrap self-center";

  return (
    <div className="flex flex-col" >
      <h3 className="font-semibold text-blue-100 text-lg">Micros</h3>
      <div className="mb-2 h-px w-full bg-gradient-to-r from-blue-300 to-transparent" />
      <div className="grid grid-cols-3">
        <p className={labelCs}>TPC Max:</p>
        <input className="rounded my-1 py-1 pl-2 bg-gray-200"
               name="tpcMax"
               type="text"
               value={vals.tpcMax || ""}
               onChange={onEntry} />
        <select className="rounded my-1 py-1 pl-2 bg-gray-200 w-20 ml-2"
                name="tpcUnits"
                value={vals.tpcUnits}
                onChange={onEntry} >
          <option value="CFU/g">CFU/g</option>
          <option value="CFU/mL">CFU/mL</option>
        </select>
      </div>
      <div className="grid grid-cols-3">
        <p className={labelCs}>Y&M Max:</p>
        <input className="rounded my-1 py-1 pl-2 bg-gray-200"
               name="ymMax"
               type="text"
               value={vals.ymMax || ""}
               onChange={onEntry} />
        <select className="rounded my-1 py-1 pl-2 bg-gray-200 w-20 ml-2"
                name="ymUnits"
                value={vals.ymUnits}
                onChange={onEntry} >
          <option value="CFU/g">CFU/g</option>
          <option value="CFU/mL">CFU/mL</option>
        </select>
      </div>
      <div className="grid grid-cols-3">
        <p className={labelCs}>Entero. Max:</p>
        <input className="rounded my-1 py-1 pl-2 bg-gray-200"
               name="enteroMax"
               type="text"
               value={vals.enteroMax || ""}
               onChange={onEntry} />
        <select className="rounded my-1 py-1 pl-2 bg-gray-200 w-20 ml-2"
                name="enteroUnits"
                value={vals.enteroUnits}
                onChange={onEntry} >
          <option value="MPN/g">MPN/g</option>
          <option value="MPN/mL">MPN/mL</option>
        </select>
      </div>
      <div className="grid grid-cols-3">
        <p className={labelCs}>Salmonella:</p>
        <select className="rounded my-1 py-1 pl-2 bg-gray-200"
                name="salmonella"
                value={vals.salmonella}
                onChange={onEntry} >
          <option value="Negative">Negative</option>
          <option value="Positive">Positive</option>
        </select>
      </div>
      <div className="grid grid-cols-3">
        <p className={labelCs}>Staph:</p>
        <select className="rounded my-1 py-1 pl-2 bg-gray-200"
                name="staph"
                value={vals.staph}
                onChange={onEntry} >
          <option value="Negative">Negative</option>
          <option value="Positive">Positive</option>
        </select>
      </div>
      <div className="grid grid-cols-3 mb-2">
        <p className={labelCs}>E. Coli:</p>
        <select className="rounded my-1 py-1 pl-2 bg-gray-200"
                name="ecoli"
                value={vals.ecoli}
                onChange={onEntry} >
          <option value="Negative">Negative</option>
          <option value="Positive">Positive</option>
        </select>
      </div>
      <div className="grid grid-cols-3 mb-4">
        {!vals.paeruTested && <p className={labelCs}>P. Aeru. Tested?</p>}
        {vals.paeruTested && <p className={labelCs}>P. Aeru. Max:</p>}
        {vals.paeruTested &&
          <select className="rounded my-1 py-1 pl-2 bg-gray-200"
                  name="paeru"
                  value={vals.paeru}
                  onChange={onEntry} >
            <option value="Negative">Negative</option>
            <option value="Positive">Positive</option>
          </select>
        }
        <input className="ml-4 mt-1 justify-self-start"
               name="paeruTested"
               type="checkbox"
               value={vals.paeruTested}
               defaultChecked={vals.paeruTested}
               onClick={onClick} />
      </div>
    </div>
  )
}

export default AddMicros;
