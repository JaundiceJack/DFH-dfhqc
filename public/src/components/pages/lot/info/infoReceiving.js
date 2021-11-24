import Divider from '../../../divider.js';
import Detail from '../../../detail.js';

const InfoBasic = ({ lot }) => {
  return (
    <div className="bg-gray-600 rounded">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200 font-semibold">Receiving</h2>
      <Divider />
      <div className="flex flex-col mb-2">
        <Detail label="Facility:" data={lot && lot.receiving && lot.receiving.facility} />
        <Detail label="Location:" data={lot && lot.receiving && lot.receiving.location} />
        <Detail label="P.O.#:"    data={lot && lot.receiving && lot.receiving.purchase_order} />
        <Detail label="Vendor:"   data={lot && lot.receiving && lot.receiving.vendor && lot.receiving.vendor.name} />
        <Detail label="Mfr'd By:" data={lot && lot.receiving && lot.receiving.manufacturer && lot.receiving.manufacturer.name} />
        <Detail label="Mfr. Lot:" data={lot && lot.receiving && lot.receiving.manufacturer_lot} />
      </div>
    </div>
  )
}

export default InfoBasic;
