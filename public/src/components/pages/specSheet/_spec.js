// Import Basics
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import Server Actions
import { getRaw } from '../../../actions/rawActions.js';
// Import Components
import Detail  from '../../misc/detail.js'
import Spinner from '../../misc/spinner.js';
import AllergenSpec from './allergenSpec.js';
import AnnualSpec   from './annualSpec.js';
import AssaySpec    from './assaySpec.js';
import HmSpec       from './hmSpec.js';
import IdSpec       from './idSpec.js';
import MicroSpec    from './microSpec.js';
import OrganolepticSpec from './organolepticSpec.js';
import PhysicalSpec from './physicalSpec.js';

const Spec = ({ match }) => {
  const { selectedRaw, loading } = useSelector(state => state.raw);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!selectedRaw._id)
      dispatch(getRaw(match.params.rawId));
  }, [dispatch, match, selectedRaw]);

  return (
    <div className="flex flex-col w-full mx-auto bg-gray-100 rounded-xl" style={{width: 50+"em"}}>
      <div className="flex items-center justify-center w-full h-12 bg-gray-200 rounded-t-xl">
        <p className="text-center font-bold text-lg">Specification Sheet</p>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-black to-transparent" />
      {loading ? <Spinner /> :
        <div className="flex flex-col w-full bg-gray-100 rounded-b-xl">
          <div id="basic" className="px-10 py-6 grid grid-cols-2">
            <Detail label="Name:" data={selectedRaw && selectedRaw.name} color="text-black" />

            <Detail label="Item #:" data={selectedRaw && selectedRaw.number} color="text-black" />
          </div>

          <div className="grid grid-cols-2">
            <OrganolepticSpec material={selectedRaw && selectedRaw} />

            <PhysicalSpec
              density={selectedRaw && selectedRaw.density}
              moisture={selectedRaw && selectedRaw.moisture} />

            <AssaySpec
              assays={selectedRaw && selectedRaw.assays} />

            <IdSpec
              ids={selectedRaw && selectedRaw.ids} />

            <HmSpec
              hm={selectedRaw && selectedRaw.hm} />

            <MicroSpec
              micro={selectedRaw && selectedRaw.micro} />

            <AllergenSpec
              allergens={selectedRaw && selectedRaw.allergens} />

            <AnnualSpec
              pesticides={selectedRaw && selectedRaw.pesticide}
              rancidity={selectedRaw && selectedRaw.rancidity}
              solvents={selectedRaw && selectedRaw.solvent} />


          </div>


        </div>
      }
    </div>
  )
}

export default Spec;
