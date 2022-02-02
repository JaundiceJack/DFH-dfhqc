import Button    from '../../../inputs/button.js';
import Checkbox  from '../../../inputs/checkbox.js';
import Entry     from '../../../inputs/entry.js';
import Selection from '../../../inputs/selection.js';
import Divider   from '../../../misc/divider.js';

const IdGen = ({
  ids, onAdd, onEdit, onRemove, onIdChange,
  nameOptions, methodOptions
}) => {

  /*
    TODO: When a user makes a new product, and selects an existing botanical ID,
    I think the is_botanical checkbox remains disabled, meaning the new product
    will have is_botanical false despite being selected as botanical originally

    need to find out how to force it through the disabling

    upon testing it seems to change the state correctly though, just the disabled prevents visibility
  */

  return (
    <div className="flex flex-col">
      <h3 className="font-semibold text-blue-100 text-lg">Identity</h3>
      <Divider />
      <div className="grid grid-cols-4 gap-x-4 mb-4">
        {ids.map((id, index) => {
          return (
            <div key={index}
                 className="col-span-4 flex flex-col rounded-lg border border-gray-400 p-2 mb-2">

              {/* ID Name Selection/Entry */}
              <Selection label="Name:" name="identityId" value={id.identityId}
                onChange={e => onIdChange(e, index)}
                options={[
                  ...(
                    nameOptions.length > 0 ?
                      nameOptions.map(name => { return { name: name.name, value: name._id } } ) :
                      [{name: "", value: ""}]
                  ),
                  { name: "New Id", value: "New Id" }
                ]} />
              {id.identityId === "New Id" &&
                <Entry label="New Name:" name="newName" value={id.newName}
                  onChange={e => onEdit(e, index)} />
              }

              {/* ID to be Positive or Negative */}
              <Selection label="Pos/Neg:" name="posneg" value={id.posneg}
                onChange={e => onEdit(e, index)}
                options={[
                  {name: "Positive", value: "Positive"},
                  {name: "Negative", value: "Negative"}
                ]}/>

              {/* Botanical ID Entries*/}
              <Checkbox label="Botanical ID?" name="is_botanical" value={id.is_botanical}
                defaultChecked={id.is_botanical} onClick={e => onEdit(e, index)}
                disabled={id.identityId !== "New Id"} extraClasses="left-1/3 my-3" />
              {id.is_botanical &&
                <div className="flex flex-col">
                  <Entry label="Genus:" name="genus" value={id.genus}
                    onChange={e => onEdit(e, index)}
                    disabled={id.identityId !== "New Id"} />

                  <Entry label="Species:" name="species" value={id.species}
                    onChange={e => onEdit(e, index)}
                    disabled={id.identityId !== "New Id"} />

                  <Entry label="Plant Part:" name="part" value={id.part}
                    onChange={e => onEdit(e, index)}
                    disabled={id.identityId !== "New Id"} />

                  <Entry label="Solvent:" name="solvent" value={id.solvent}
                    onChange={e => onEdit(e, index)}
                    disabled={id.identityId !== "New Id"} />

                  <Entry label="Ratio:" name="ratio" value={id.ratio}
                    onChange={e => onEdit(e, index)}
                    disabled={id.identityId !== "New Id"} />
                </div>
              }

              {/* Method Selection/Entry */}
              <Selection label="Method:" name="methodId" value={id.methodId}
                onChange={e => onEdit(e, index)}
                options={[
                  ...(
                    methodOptions.length > 0 ?
                      methodOptions.map(method => { return { name: method.name, value: method._id } } ) :
                      [{name: "", value: ""}]
                  ),
                  { name: "New Method", value: "New Method" }
                ]} />
              {id.methodId === "New Method" &&
                <Entry label="New Method:" name="newMethod" value={id.newMethod}
                  onChange={e => onEdit(e, index)} /> }

            </div>
          )
        })}
        <Button color="bg-blue-300" text="+ Identity" onClick={onAdd} extraClasses="w-full h-8 col-span-2"/>
        <Button color="bg-red-400"  text="- Identity" onClick={onRemove} extraClasses="w-full h-8 col-span-2"/>
      </div>
    </div>
  )
}

export default IdGen;
