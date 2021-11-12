import Checkbox from '../../inputs/checkbox.js';
import Entry from '../../inputs/entry.js';
import Selection from '../../inputs/selection.js';
import Divider from '../../divider.js';

const AddPhysical = ({vals, onEntry}) => {
  return (
    <div className="flex flex-col" >
      <h3 className="font-semibold text-blue-100 text-lg">Physical</h3>
      <Divider />
      <div className="flex flex-col mb-4">

        <div className="grid grid-cols-3 items-center mr-2">
          <p className="text-blue-100 font-semibold text-right mr-2">Density:</p>
          <div className="flex flex-row items-center col-span-2">
            <Entry label="" name="density_min" value={vals.density_min || ""} placeholder="0"
              onChange={onEntry} extraClasses="w-14" />
            <p className="text-blue-100 mx-auto self-center">to</p>
            <Entry label="" name="density_max" value={vals.density_max || ""} placeholder="100"
              onChange={onEntry} extraClasses="w-20" append="g/mL" />
          </div>
        </div>

        <div className="grid grid-cols-3 items-center mr-2">
          <p className="text-blue-100 font-semibold text-right mr-2">Moisture:</p>
          <div className="flex flex-row items-center col-span-2">
            <Entry label="" name="moisture_min" value={vals.moisture_min || ""} placeholder="0"
              onChange={onEntry} extraClasses="w-14" />
            <p className="text-blue-100 mx-auto self-center">to</p>
            <Entry label="" name="moisture_max" value={vals.moisture_max || ""} placeholder="100"
              onChange={onEntry} extraClasses="w-20" append="%" />
          </div>
        </div>

      </div>
    </div>
  )
}

export default AddPhysical;
