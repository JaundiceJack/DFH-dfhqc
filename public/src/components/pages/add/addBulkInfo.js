import Checkbox from '../../inputs/checkbox.js';
import Entry from '../../inputs/entry.js';
import Selection from '../../inputs/selection.js';
import Divider from '../../divider.js';

const AddBulkInfo = ({
  vals,
  onEntry,
  ifEditing,
  capOptions
}) => {
  const labelCs = "mr-2 text-right text-blue-100 font-semibold whitespace-nowrap self-center";
  const inputCs = "rounded my-1 py-1 pl-2 bg-gray-200 w-1/2";

  return (
    <div className="flex flex-col mb-3">
      <h3 className="font-semibold text-blue-100 text-lg">Additional Info</h3>
      <Divider />

      <Entry label="Batch Size:" name="batchSize" value={vals.batchSize}
        onChange={onEntry} append="kg" />

      <Selection label="Dosage Type:" name="dosageType" value={vals.dosageType}
        onChange={onEntry}
        options={[
          {name: "capsule", value: "Capsule"},
          {name: "softgel", value: "Softgel"},
          {name: "lozenge", value: "Lozenge"},
        ]} />

      {vals.dosageType === 'capsule' &&
        <Selection label="Capsule:" name="capId" value={vals.capId}
          onChange={onEntry}
          options={[
            ...(capOptions.map(cap => {return {name: `${cap.number} - ${cap.name}`, value: cap._id}}))
          ]} />
      }

      <Entry label="# per Bottle:" name="capsPerBottle" value={vals.capsPerBottle}
        onChange={onEntry} append=" " />

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
