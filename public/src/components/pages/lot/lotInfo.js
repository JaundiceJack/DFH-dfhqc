// Import Basics
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// Import server actions
import { getRaw } from '../../../actions/rawActions.js';
// Import Lot Info Dialogs
import InfoBasic        from './info/infoBasic.js';
import InfoInventory    from './info/infoInventory.js';
import InfoReceiving    from './info/infoReceiving.js';
import InfoBlendTesting from './info/infoBlendTesting.js';
// Import Raw Testing Dialogs
import MicroTests    from './rawTesting/micros/_micro.js';
import HmTests       from './rawTesting/hms/_hm.js';
import AssayTests    from './rawTesting/assays/_assays.js';
import IdentityTests from './rawTesting/ids/_identities.js';
import PesticideTests from './rawTesting/pesticides/_pesticides.js';
import RancidityTests from './rawTesting/rancidity/_rancidity.js';
import SolventTests from './rawTesting/solvents/_solvents.js';
import FtirTests    from './rawTesting/ftir/_ftir.js';
// Import Blend Testing Dialogs
import BlendHmTests from './blendTesting/hms/_hm.js';
import Button from '../../inputs/button.js';

const LotInfo = () => {
  // Get the current selection from the redux state
  const { selectedLot, currentYear: viewingYear, loading } =
    useSelector( state => state.lot );
  const { selectedRaw: currentRaw } = useSelector( state => state.raw );

  // Get the selected lot's raw/blend/bulk/fg (to check it's previous testing)
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedLot.type === 'raw' && !currentRaw.number)
      dispatch(getRaw(selectedLot.raw._id));
  }, [dispatch, selectedLot, currentRaw])

  // Check for a passing pesticide result (with the same manufacturer) from this year
  let annualPesticideTest = null;
  let annualPesticideLot = null;
  currentRaw && currentRaw.pesticide && currentRaw.pesticide.lots_passing.forEach((annual, index) => {
    const annualYear = new Date(annual.date).getFullYear();
    const annualManufacturer = annual.lot.receiving.manufacturer;
    const lotYear = new Date(selectedLot.date_created).getFullYear();
    const lotManufacturer = selectedLot.receiving.manufacturer._id;
    if (annualYear === lotYear && annualManufacturer === lotManufacturer && annual.lot._id !== selectedLot._id) {
      const tests = annual.lot.tests.filter(test => test.type === 'pesticides');
      if (tests.length > 0) {
        annualPesticideTest = tests[0];
        annualPesticideLot = annual.lot.lot;
      }
    }
  });

  // Check for a passing rancidity result (with the same manufacturer) from this year
  let annualRancidityTest = null;
  let annualRancidityLot = null;
  currentRaw && currentRaw.rancidity && currentRaw.rancidity.lots_passing.forEach((annual, index) => {
    const annualYear = new Date(annual.date).getFullYear();
    const annualManufacturer = annual.lot.receiving.manufacturer;
    const lotYear = new Date(selectedLot.date_created).getFullYear();
    const lotManufacturer = selectedLot.receiving.manufacturer._id;
    if (annualYear === lotYear && annualManufacturer === lotManufacturer && annual.lot._id !== selectedLot._id) {
      const tests = annual.lot.tests.filter(test => test.type === 'rancidity');
      if (tests.length > 0) {
        annualRancidityTest = tests[0];
        annualRancidityLot = annual.lot.lot;
      }
    }
  });

  // Check for a passing solvent result (with the same manufacturer) from this year
  let annualSolventTest = null;
  let annualSolventLot = null;
  currentRaw && currentRaw.solvent && currentRaw.solvent.lots_passing.forEach((annual, index) => {
    const annualYear = new Date(annual.date).getFullYear();
    const annualManufacturer = annual.lot.receiving.manufacturer;
    const lotYear = new Date(selectedLot.date_created).getFullYear();
    const lotManufacturer = selectedLot.receiving.manufacturer._id;
    if (annualYear === lotYear && annualManufacturer === lotManufacturer && annual.lot._id !== selectedLot._id) {
      const tests = annual.lot.tests.filter(test => test.type === 'solvents');
      if (tests.length > 0) {
        annualSolventTest = tests[0];
        annualSolventLot = annual.lot.lot;
      }
    }
  });


  return (
    <div className="sm:mr-4 h-full col-span-5 2xl:col-span-4 rounded bg-gradient-to-br from-gray-600 via-transparent to-gray-600">
      <div className="flex flex-row mb-3 py-2 px-4 bg-gradient-to-r from-gray-700 to-gray-900 rounded-t rounded-br border-b border-gray-500">
        <h2 className="text-center font-semibold text-blue-100 text-xl">Lot Information</h2>
        <div className="flex-grow"></div>
        <Link to={`/labels/${selectedLot._id}`} target="_blank">
          <Button color="bg-yellow-300" text="Labels" />
        </Link>
        <Link to={`/certificate/${selectedLot._id}`} target="_blank">
          <Button color="bg-blue-300" text="CoA" />
        </Link>
        {selectedLot.type === 'raw' && currentRaw._id &&
          <Link to={`/rawspec/${currentRaw._id}`} target="_blank">
            <Button color="bg-green-300" text="Spec." />
          </Link>
        }

      </div>

      <div className="flex flex-col py-2 px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-700 mb-4 rounded-lg">
          <InfoBasic lot={selectedLot} />
          <InfoReceiving lot={selectedLot} />
          <InfoInventory lot={selectedLot} />
        </div>
        <div>
          {selectedLot.prior_lot && selectedLot.type === 'raw' ?
            (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-700 mb-4 rounded-lg">
              <MicroTests lot={selectedLot} />
              <FtirTests lot={selectedLot} />
              {/* Annual Testing */}
              { selectedLot.raw.pesticide.tested &&
                !annualPesticideTest &&
                <PesticideTests lot={selectedLot} /> }
              { selectedLot.raw.rancidity.tested &&
                !annualRancidityTest &&
                <RancidityTests lot={selectedLot} /> }
              { selectedLot.raw.solvent.tested &&
                !annualSolventTest &&
                <SolventTests lot={selectedLot} /> }
            </div>) :
          selectedLot.type === 'raw' &&
            (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-700 mb-4 rounded-lg">
              <MicroTests lot={selectedLot} />
              <HmTests lot={selectedLot} />
              {selectedLot.raw.assays.length > 0 &&
                <AssayTests lot={selectedLot} /> }
              {selectedLot.raw.ids.length > 0 &&
                <IdentityTests lot={selectedLot} /> }
              {/* Annual Testing */}
              { selectedLot.raw.pesticide.tested &&
                !annualPesticideTest &&
                  <PesticideTests lot={selectedLot} /> }
              { selectedLot.raw.rancidity.tested &&
                !annualRancidityTest &&
                  <RancidityTests lot={selectedLot} /> }
              { selectedLot.raw.solvent.tested &&
                !annualSolventTest &&
                  <SolventTests lot={selectedLot} /> }
            </div>)
          }

          {selectedLot.type === 'blend' &&
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-700 mb-4 rounded-lg">
              <BlendHmTests lot={selectedLot} />
            </div>
          }
          {/*selectedLot.type === 'blend' && <BlendAssayTests lot={selectedLot} />*/}
        </div>
      </div>
    </div>
  )
}

export default LotInfo;
