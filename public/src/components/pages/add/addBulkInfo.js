const AddBulkInfo = ({vals, onEntry, ifEditing, capOptions}) => {
  const labelCs = "mr-2 text-right text-blue-100 font-semibold whitespace-nowrap self-center";
  const inputCs = "rounded my-1 py-1 pl-2 bg-gray-200 w-1/2";

  return (
    <div className="flex flex-col mb-3">
      <h3 className="font-semibold text-blue-100 text-lg">Additional Info</h3>
      <div className="mb-2 h-px w-full bg-gradient-to-r from-blue-300 to-transparent" />

      <div className="grid grid-cols-3 gap-2">
        <label className={labelCs}>Batch Size:</label>
        <input className={inputCs+" w-full col-span-1"}
               name="batchSize"
               type="text"
               value={vals.batchSize}
               onChange={onEntry} />
        <p className="col-span-1 text-blue-100 font-semibold self-center">kg</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <label className={labelCs}>Dosage Type:</label>
        <select className={inputCs+" w-full col-span-1"}
                name="dosageType"
                value={vals.dosageType}
                onChange={onEntry}>
          <option value="capsule">Capsule</option>
          <option value="softgel">Softgel</option>
          <option value="lozenge">Lozenge</option>
        </select>
      </div>
      {vals.dosageType === 'capsule' &&
        <div className="grid grid-cols-3 gap-2">
          <label className={labelCs}>Capsule:</label>
          <select className={inputCs+" w-full col-span-2"}
                  name="capId"
                  onChange={onEntry}
                  value={vals.capId}>
            {capOptions.map((cap, index) => {
              return (<option key={index} value={cap._id}>{cap.number} - {cap.name}</option>)
            })}
          </select>
        </div>
      }
      {vals.dosageType === 'capsule' &&
        <div className="grid grid-cols-3 gap-2">
          <label className={labelCs}>Caps/Serving:</label>
          <input value={vals.capsPerServing}
                 name="capsPerServing"
                 type="text"
                 onChange={onEntry}
                 className={inputCs+" w-full"}/>
        </div>
      }
      <div className="grid grid-cols-3 gap-2">
        <label className={labelCs}>Fill Weight:</label>
        <input value={vals.fillWeight}
               name="fillWeight"
               type="text"
               onChange={onEntry}
               className={inputCs+" w-full"}/>
        <p className="text-blue-100 font-semibold self-center">mg</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <label className={labelCs}># per Bottle:</label>
        <input value={vals.capsPerBottle}
               name="capsPerBottle"
               type="text"
               onChange={onEntry}
               className={inputCs+" w-full"}/>
      </div>


    </div>
  )
}

export default AddBulkInfo;
