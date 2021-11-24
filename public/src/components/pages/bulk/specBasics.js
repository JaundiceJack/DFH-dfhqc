import Detail from '../../detail.js';
import Divider from '../../divider.js';

const SpecBasics = ({ name, number }) => {
  return (
    <div className="bg-gray-600 rounded">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200 font-semibold">
        Bulk Basics
      </h2>
      <Divider />
      <Detail label="Name:" data={name || ""} />
      <Detail label="Item #:" data={number || ""} />
    </div>
  )
}

export default SpecBasics;
