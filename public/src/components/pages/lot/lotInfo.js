import { useSelector } from 'react-redux';
import InfoBasic from './info/infoBasic.js';
import InfoInventory from './info/infoInventory.js';
import InfoReceiving from './info/infoReceiving.js';
import InfoBlendTesting from './info/infoBlendTesting.js';

import MicroTests from './rawTesting/micros/_microTests.js';
import HmTests from './rawTesting/hms/_hmTests.js';
import AnnualTests from './rawTesting/annuals/_annualTests.js';
import AssayTests from './rawTesting/assays/_assayTests.js';
import IdentityTests from './rawTesting/ids/_idTests.js';

const LotInfo = () => {
  // Get the current selection from the redux state
  const selected = useSelector( state => state.lot.selectedLot );

  return (
    <div className="sm:mr-4 h-full col-span-5 2xl:col-span-4 rounded bg-gradient-to-br from-gray-600 via-transparent to-gray-600">
      <div className="flex flex-row mb-3 py-2 px-4 bg-gradient-to-r from-gray-700 to-gray-900 rounded-t rounded-br border-b border-gray-500">
        <h2 className="text-center font-semibold text-blue-100 text-xl">Lot Information</h2>
      </div>

      <div className="flex flex-col py-2 px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-700 mb-4 rounded-lg">
          <InfoBasic lot={selected} />
          <InfoReceiving lot={selected} />
          <InfoInventory lot={selected} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-700 mb-4 rounded-lg">
          {selected.item_type === 'raw' && <MicroTests lot={selected} />}
          {selected.item_type === 'raw' && <HmTests lot={selected} />}
          {selected.item_type === 'raw' && <AnnualTests lot={selected} />}
          {selected.item_type === 'raw' && <AssayTests lot={selected} />}
          {selected.item_type === 'raw' && <IdentityTests lot={selected} />}
          {selected.item_type === 'blend' && <InfoBlendTesting lot={selected} />}
        </div>
      </div>
    </div>
  )
}

export default LotInfo;
