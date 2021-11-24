import Selection from '../../inputs/selection.js';
import Divider from '../../divider.js';

const AddBlendItem = ({ vals, onEntry, blendOptions }) => {
  return (
    <div className="flex flex-col">
      <h3 className="font-semibold text-blue-100 text-lg">Blend Used</h3>
      <Divider />
      <div className="grid grid-cols-4 mb-4">
        <div className={"col-span-4 rounded-lg border border-gray-400 p-2 mb-2"}>
          <Selection label="Ingredient:" name="blendId" value={vals.blendId}
            onChange={onEntry}
            options={[
              ...(blendOptions.length > 0 ?
                blendOptions.map(blend => {return {name: `${blend.number} - ${blend.name}`, value: blend._id}}) :
                [{name: "", value: ""}]
              )
            ]} />
        </div>
      </div>
    </div>
  )
}

export default AddBlendItem;
