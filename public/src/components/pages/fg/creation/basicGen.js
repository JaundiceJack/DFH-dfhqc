import Entry from '../../../inputs/entry.js';
import Divider from '../../../misc/divider.js';

const BasicGen = ({ vals, onEntry, ifEditing }) => {
  return (
    <div className="flex flex-col mb-3">
      <h3 className="font-semibold text-blue-100 text-lg">Basics</h3>
      <Divider />
      <div className="flex flex-col">
        <Entry label="Item #:" name="number" value={vals.number}
          onChange={onEntry} disabled={ifEditing} />
        <Entry label="Name:" name="name" value={vals.name}
          onChange={onEntry} />
      </div>
    </div>
  )
}

export default BasicGen;
