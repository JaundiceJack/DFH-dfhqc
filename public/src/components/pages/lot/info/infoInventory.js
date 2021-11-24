import Divider from '../../../divider.js';
import Detail from '../../../detail.js';

const InfoInventory = ({ lot }) => {
  return (
    <div className="bg-gray-600 rounded">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200 font-semibold">Inventory</h2>
      <Divider />
      <div className="flex flex-col">
        <Detail label="Amount:" capData={false} data={
          lot && lot.inventory && `${lot.inventory.amount} ${lot.inventory.units}`
          } />
        <Detail label="Status:" data={lot && lot.inventory && lot.inventory.status} />
      </div>
    </div>
  )
}

export default InfoInventory;
