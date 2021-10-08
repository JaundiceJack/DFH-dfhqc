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
    <div className="sm:mr-4 h-full col-span-5 2xl:col-span-4 rounded bg-gradient-to-br from-gray-600 via-transparent to-gray-600">
      <div className="flex flex-row mb-3 py-2 px-4 bg-gradient-to-r from-gray-700 to-gray-900 rounded-t rounded-br border-b border-gray-500">
        <h2 className="text-center font-semibold text-blue-100 text-xl">Specifications</h2>
      </div>

      <div className="flex flex-col py-2 px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-700 mb-4 rounded-lg">
          <SpecBasics name={selectedRaw.name}
                      number={selectedRaw.number}
                      color={selectedRaw.color}
                      odor={selectedRaw.odor}
                      texture={selectedRaw.texture ? selectedRaw.texture.name : ""}
                      taste={selectedRaw.taste} />
          <SpecPhysical densityMin={selectedRaw.density_min}
                        densityMax={selectedRaw.density_max}
                        moistureMin={selectedRaw.moisture_min}
                        moistureMax={selectedRaw.moisture_max} />
          <SpecAllergens allergens={selectedRaw.allergens} />

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-700 mb-4 rounded-lg">
          <SpecMicros tpcMax={selectedRaw.tpc_max} tpcUnits={selectedRaw.tpc_units}
                      ymMax={selectedRaw.ym_max} ymUnits={selectedRaw.ym_units}
                      enteroMax={selectedRaw.entero_max} enteroUnits={selectedRaw.entero_units}
                      salmonella={selectedRaw.salmonella}
                      staph={selectedRaw.staph}
                      ecoli={selectedRaw.ecoli}
                      paeruTested={selectedRaw.paeru_tested} paeru={selectedRaw.paeru} />
          <SpecHms hmUnits={selectedRaw.hm_units}
                   arsenicMax={selectedRaw.arsenic_max}
                   cadmiumMax={selectedRaw.cadmium_max}
                   leadMax={selectedRaw.lead_max}
                   mercuryMax={selectedRaw.mercury_max}
                   nickelTested={selectedRaw.nickel_tested}
                   nickelMax={selectedRaw.nickel_max} />
          <SpecAnnuals pestTested={selectedRaw.pesticide_tested}
                       pestStandard={selectedRaw.pesticide_standard}
                       pestLastTested={selectedRaw.pesticide_last_tested}
                       solvTested={selectedRaw.solvent_tested}
                       solvStandard={selectedRaw.solvent_standard}
                       solvLastTested={selectedRaw.solvent_last_tested}
                       rancTested={selectedRaw.rancidity_tested}
                       peroxMax={selectedRaw.peroxide_max}
                       panisMax={selectedRaw.p_anisidine_max}
                       totoxMax={selectedRaw.totox_max}
                       rancLastTested={selectedRaw.rancidity_last_tested} />
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
