import { useSelector } from 'react-redux';
//import { getAssay } from '../../../actions/assayActions';

import SpecBasics    from './specBasics';
import SpecPhysical  from './specPhysical';
import SpecAnnuals   from './specAnnuals';
import SpecHms       from './specHms';
import SpecMicros    from './specMicros';
import SpecAllergens from './specAllergens';
import SpecAssays    from './specAssays';
import SpecIds       from './specIds';

const RawSpec = () => {
  // Get the current selection from the redux state
  const selectedRaw = useSelector( state => state.raw.selectedRaw );

  return (
    <div className={"sm:mr-4 h-full col-span-5 2xl:col-span-4 rounded " +
                    "bg-gradient-to-br from-gray-600 via-transparent to-gray-600"}>
      <div className={"flex flex-row mb-3 py-2 px-4 rounded-t rounded-br border-b " +
                      "bg-gradient-to-r from-gray-700 to-gray-900 border-gray-500"}>
        <h2 className="text-center font-semibold text-blue-100 text-xl">
          Specifications</h2>
      </div>

      <div className="flex flex-col py-2 px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-700 mb-4 rounded-lg">
          <SpecBasics raw={selectedRaw} />
          <SpecPhysical
            density={selectedRaw.density}
            moisture={selectedRaw.moisture} />
          <SpecAllergens allergens={selectedRaw.allergens} />

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-700 mb-4 rounded-lg">
          <SpecMicros micro={selectedRaw.micro} />
          <SpecHms hm={selectedRaw.hm} />
          <SpecAnnuals
            pesticide={selectedRaw.pesticide}
            solvent={selectedRaw.solvent}
            rancidity={selectedRaw.rancidity} />
        </div>
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-700 mb-4 rounded-lg">
          <SpecAssays assays={selectedRaw.assays} />
          <SpecIds ids={selectedRaw.ids} />
        </div>
      </div>
    </div>
  )
}

export default RawSpec;
