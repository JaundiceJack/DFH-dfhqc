import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLot, getPriorLot } from '../../../actions/lotActions.js';
import { getTests, getPriorTests } from '../../../actions/testingActions.js';
import { getRaw } from '../../../actions/rawActions.js';

import Detail from '../../misc/detail.js'
import Spinner from '../../misc/spinner.js';
import Approvals from './approvalCoa.js';
import Micros from './microCoa.js';
import HeavyMetals from './hmCoa.js';
import AssayId from './assayIdCoa.js';
import Annuals from './annualCoa.js';
import Ftir from './ftirCoa.js';

const Certificate = ({ match }) => {
  const { selectedLot, prior_lot,   loading: loadingLot }   = useSelector(state => state.lot);
  const { tests,       prior_tests, loading: loadingTests } = useSelector(state => state.testing);
  const { selectedRaw,              loading: loadingRaw }   = useSelector(state => state.raw);

  const ftirTests = tests && tests.filter(test => test.type === 'ftir');

  // const { selectedBlend, loading: loadingBlend }  = useSelector(state => state.blend);
  // const { selectedBulk, loading: loadingBulk }  = useSelector(state => state.bulk);
  // const { selectedFg, loading: loadingFg }  = useSelector(state => state.fg);


  const dispatch = useDispatch();
  useEffect(() => {
    if (!selectedLot.type)
      dispatch(getLot(match.params.lotId));
    if (!tests)
      dispatch(getTests(match.params.lotId));
    if (selectedLot && selectedLot.type === 'raw' && !selectedRaw.number)
      dispatch(getRaw(selectedLot.raw._id));
    if (selectedLot && selectedLot.prior_lot) {
      dispatch(getPriorLot(selectedLot.prior_lot._id))
      dispatch(getPriorTests(selectedLot.prior_lot._id));
    }
  }, [dispatch, match, selectedLot, selectedRaw, tests])


  return (
    <div className="flex flex-col w-full mx-auto bg-gray-100 rounded-xl" style={{width: 50+"em"}}>
      <div className="flex items-center justify-center w-full h-12 bg-gray-200 rounded-t-xl">
        <p className="text-center font-bold text-lg">Certificate of Analysis</p>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-black to-transparent" />
      {loadingLot ? <Spinner /> :
        <div className="flex flex-col w-full bg-gray-100 rounded-b-xl">
          <div id="basic" className="px-10 py-4 grid grid-cols-2 mb-6">
            <Detail label="Name:" data={selectedLot && (
              selectedLot.raw   ? selectedLot.raw.name :
              selectedLot.blend ? selectedLot.blend.name :
              selectedLot.bulk  ? selectedLot.bulk.name :
              selectedLot.fg   && selectedLot.fg.name)} color="text-black" />
            <Detail label="Lot #:" data={selectedLot && selectedLot.lot} color="text-black" />
            <Detail label="Item #:" data={selectedLot && (
              selectedLot.raw   ? selectedLot.raw.number :
              selectedLot.blend ? selectedLot.blend.number :
              selectedLot.bulk  ? selectedLot.bulk.number :
              selectedLot.fg   && selectedLot.fg.number)} color="text-black" />
          </div>

          {prior_lot && <Ftir selected={selectedLot} tests={tests} />}

          <AssayId selected={selectedLot} tests={tests}
                   prior_lot={prior_lot}  prior_tests={prior_tests} />

          <HeavyMetals selected={selectedLot} tests={tests}
                       prior_lot={prior_lot}  prior_tests={prior_tests} />

          <Annuals selected={selectedLot} tests={tests}
                   item={selectedLot && (selectedLot.type === 'raw' ? selectedRaw : null )}/>

          <Micros selected={selectedLot} tests={tests} />

          <Approvals />
        </div>
      }
    </div>
  )
}

export default Certificate;
