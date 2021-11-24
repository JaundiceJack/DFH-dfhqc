import Divider from '../../../divider.js';
import Detail from '../../../detail.js';

const InfoBasic = ({ lot }) => {
  return (
    <div className="bg-gray-600 rounded">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200 font-semibold">Basic Lot Info</h2>
      <Divider />
      <div className="flex flex-col">
        <Detail label="Name:"       data={lot && lot.item && lot.item.name} />
        <Detail label="Lot#:"       data={lot && lot.lot} />
        <Detail label="Item#:"      data={lot && lot.item && lot.item.number} />
        <Detail label="Department:" data={lot && lot.department} />
      </div>
    </div>
  )
}

export default InfoBasic;
