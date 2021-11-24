import Detail from '../../detail.js';
import Divider from '../../divider.js';

const ManufacturerBasicSpec = ({manufacturer}) => {
  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200">Basic Manufacturer Info</h2>
      <Divider />
      <div className="p-2">
        <Detail label="Manufacturer Name:" data={manufacturer && manufacturer.name} />
      </div>
    </div>
  )
}

export default ManufacturerBasicSpec;
