import Entry from '../../../inputs/entry.js';
import Selection from '../../../inputs/selection.js';
import Divider from '../../../misc/divider.js';

const ServingGen = ({vals, onEntry, ifEditing}) => {
  return (
    <div className="flex flex-col mb-3">
      <h3 className="font-semibold text-blue-100 text-lg">Additional Info</h3>
      <Divider />

      <Entry label="Batch Size:" name="batch_size" value={vals.batch_size}
        onChange={onEntry} append="kg" />

      <Entry label="Units per Serving:" name="units_per_serving" value={vals.units_per_serving}
        onChange={onEntry} append=" " />

      <Selection label="Customer:" name="customer" value={vals.customer}
        onChange={onEntry} options={[
          {name: "DFH", value: "dfh"},
          {name: "DFH-CANADA", value: "dfh-canada"},
          {name: "New Customer", value: "new customer"}
        ]} />

    </div>
  )
}

export default ServingGen;
