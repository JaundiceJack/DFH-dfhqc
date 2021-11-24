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
  return (
    <div className="flex flex-col mb-3">
      <h3 className="font-semibold text-blue-100 text-lg">Additional Info</h3>
      <Divider />

      <Entry label="Batch Size:" name="batch_size" value={vals.batch_size}
        onChange={onEntry} append="kg" />

      <Selection label="Dosage Type:" name="dosage_type" value={vals.dosage_type}
        onChange={onEntry}
        options={[
          {name: "capsule", value: "Capsule"},
          {name: "softgel", value: "Softgel"},
          {name: "lozenge", value: "Lozenge"},
        ]} />

      {vals.dosage_type === 'capsule' &&
        <Selection label="Capsule:" name="capId" value={vals.capId}
          onChange={onEntry}
          options={[
            ...(capOptions.map(cap => {return {name: `${cap.number} - ${cap.name}`, value: cap._id}}))
          ]} />
      }

      <Entry label="# per Bottle:" name="caps_per_bottle" value={vals.caps_per_bottle}
        onChange={onEntry} append=" " />

    </div>
  )
}

export default AddBulkInfo;
