import Button    from '../../../inputs/button.js';
import Checkbox  from '../../../inputs/checkbox.js';
import Entry     from '../../../inputs/entry.js';
import Selection from '../../../inputs/selection.js';
import Divider   from '../../../misc/divider.js';

const AssayGen = ({
  assays, onAdd, onEdit, onRemove,
  assayOptions, unitOptions, methodOptions
}) => {
  return (
    <div className="flex flex-col">
      <h3 className="font-semibold text-blue-100 text-lg">Assays</h3>
      <Divider />
      <div className="grid grid-cols-4 gap-x-4 mb-4">
        {assays.map((assay, index) => {
          return (
            <div key={index}
                 className="col-span-4 flex flex-col rounded-lg border border-gray-400 p-2 mb-2">
              {/* Assay Name Selection/Entry */}
              <Selection label="Name:" name="assayId" value={assay.assayId}
                onChange={e => onEdit(e, index)}
                options={[
                  ...(
                    assayOptions.length > 0 ?
                      assayOptions.map(assay => { return { name: assay.name, value: assay._id } } ) :
                      [{name: "", value: ""}]
                  ),
                  { name: "New Assay", value: "New Assay" }
                ]} />
              {assay.assayId === "New Assay" &&
                <Entry label="New Assay:" name="newName" value={assay.newName}
                  onChange={e => onEdit(e, index)} />
              }

              {/* Potency Min, Max, & Units */}
              <div className="grid grid-cols-3 items-center">
                <p className="text-blue-100 font-semibold text-right mr-2">Potency:</p>
                <div className="flex flex-row col-span-2">
                  <Entry label="" name="min" value={assay.min || ""}
                    onChange={e => onEdit(e, index)} extraClasses="w-32 mr-2" />
                  <p className="text-blue-100 mx-auto self-center">to</p>
                  <Entry label="" name="max" value={assay.max || ""}
                    onChange={e => onEdit(e, index)} extraClasses="w-32 mx-2" />
                  <Selection label="" name="unitId" value={assay.unitId}
                    onChange={e => onEdit(e, index)} extraClasses="w-32"
                    options={[
                      ...(
                        unitOptions.length > 0 ?
                          unitOptions.map(unit => { return { name: unit.name, value: unit._id } } ) :
                          [{name: "", value: ""}]
                      ),
                      { name: "New Units", value: "New Units" }
                    ]} />
                </div>
              </div>
              {assay.unitId === "New Units" &&
                <Entry label="New Unit:" name="newUnit" value={assay.newUnit}
                   onChange={e => onEdit(e, index)} />
              }

              {/* Assay Method */}
              <Selection label="Method:" name="methodId" value={assay.methodId}
                onChange={e => onEdit(e, index)}
                options={[
                  ...(
                    methodOptions.length > 0 ?
                      methodOptions.map(method => { return { name: method.name, value: method._id } } ) :
                      [{name: "", value: ""}]
                  ),
                  { name: "New Method", value: "New Method" }
                ]} />
              {assay.methodId === "New Method" &&
                <Entry label="New Method:" name="newMethod" value={assay.newMethod}
                  onChange={e => onEdit(e, index)} />
              }

            </div>
          )
        })}
        <Button color="bg-blue-300" text="+ Assay" onClick={onAdd} extraClasses="w-full h-8 col-span-2"/>
        <Button color="bg-red-400"  text="- Assay" onClick={onRemove} extraClasses="w-full h-8 col-span-2"/>
      </div>
    </div>
  )
}

export default AssayGen;
