import Entry     from '../../../inputs/entry.js';
import Selection from '../../../inputs/selection.js';
import Divider   from '../../../misc/divider.js';

const OrganoGen = ({ vals, onEntry, textures }) => {

  return (
    <div className="flex flex-col" >
      <h3 className="font-semibold text-blue-100 text-lg">Organoleptics</h3>
      <Divider />

      <Entry label="Color:" name="color" value={vals.color} onChange={onEntry} />
      <Entry label="Odor:" name="odor" value={vals.odor} onChange={onEntry} />
      <Selection label="Texture:" name="textureId" value={vals.textureId} onChange={onEntry}
        options={[
          ...textures.map(texture => { return { name: texture.name, value: texture._id } } ),
          { name: "New Texture", value: "New Texture" }
        ]} />
      {vals.textureId === "New Texture" &&
        <Entry label="New Texture:" name="newTexture" value={vals.newTexture} onChange={onEntry} />
      }
      <Entry label="Taste:" name="taste" value={vals.taste} onChange={onEntry} />

    </div>
  )
}

export default OrganoGen;
