import Detail from '../../detail.js';
import Divider from '../../divider.js';

const SpecBasics = ({ raw }) => {
  return (
    <div className="bg-gray-600 rounded">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200 font-semibold">Raw Basics</h2>
      <Divider />
      <div className="flex flex-col p-2">
        <Detail label="Name:"    data={raw && raw.name} />
        <Detail label="Item #:"  data={raw && raw.number} />
        <Detail label="Color:"   data={raw && raw.color} />
        <Detail label="Odor:"    data={raw && raw.odor} />
        <Detail label="Texture:" data={raw && raw.texture && raw.texture.name} />
        <Detail label="Taste:"   data={raw && raw.taste} />
      </div>
    </div>
  )
}

export default SpecBasics;
