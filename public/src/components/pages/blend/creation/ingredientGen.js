import Button from '../../../inputs/button.js';
import Divider from '../../../misc/divider.js';
import Entry from '../../../inputs/entry.js';
import Selection from '../../../inputs/selection.js';

const IngredientGen = ({
  vals,
  onAdd,
  onRemove,
  onEdit,
  rawOptions,
  unitOptions
}) => {
  return (
    <div className="flex flex-col">
      <h3 className="font-semibold text-blue-100 text-lg">Raw Ingredients</h3>
      <Divider />
      <div className="grid grid-cols-4 gap-x-4 mb-4">
        {vals.ingredients.map((raw, index) => {
          return (
            <div key={index} className={
              "col-span-4 flex flex-col rounded-lg " +
              "border border-gray-400 p-2 mb-2"
            }>
              {/* Ingredient Name/Number */}
              <Selection label="Raw:" name="raw" value={raw.raw}
                onChange={e => onEdit(e, index)} extraClasses="col-span-6"
                options={[
                  ...(rawOptions.length > 0 ?
                    rawOptions.map(option => {
                      return {
                        name: `${option.number} - ${option.name}`,
                        value: option._id
                      }
                    }) :
                    [{ name: "", value: "" }]
                  )
                ]} />

              {/* Claim, Potency, Percent & Type */}
              <Entry label="Claim:" name="claim" value={raw.claim || ""}
                onChange={e => onEdit(e, index)} append="mg/serving" />
              <Entry label="Potency:" name="potency" value={raw.potency || ""}
                onChange={e => onEdit(e, index)} append="%" />
              <Entry label="Overage:" name="overage" value={raw.overage || ""}
                onChange={e => onEdit(e, index)} append="%" />
              <Selection label="Ingredient Type:" name="type" value={raw.type}
                onChange={e => onEdit(e, index)}
                options={[
                  { value: "vitamin", name: "Vitamin" },
                  { value: "mineral", name: "Mineral" },
                  { value: "other/active", name: "Other/Active" },
                  { value: "excipient", name: "Excipient" },
                ]} />

            </div>
          )
        })}
        <Button color="bg-blue-300" text="+ Ingredient" onClick={onAdd} extraClasses="w-full h-8 col-span-2"/>
        <Button color="bg-red-400"  text="- Ingredient" onClick={onRemove} extraClasses="w-full h-8 col-span-2"/>
      </div>
    </div>
  )
}

export default IngredientGen;
