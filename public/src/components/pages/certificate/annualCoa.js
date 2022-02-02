import AnnualPesticides from './annualPesticides.js';
import AnnualRancidity from './annualRancidity.js';
import AnnualSolvents from './annualSolvents.js';
import CategoryHeader from './categoryHeader.js';
//import AnnualHms from './annualHms.js';
//import AnnualMicros from './annualMicros.js';


const Annuals = ({ selected, tests, item }) => {
  return (
    <div id="annualTests"  className="mb-6" >
      {selected && selected.raw && (selected.raw.pesticide.tested || selected.raw.rancidity.tested || selected.raw.solvent.tested ) &&
        <div>
          <CategoryHeader title="Annual Testing" testing="Test" />
          {selected && selected.raw &&
            <div className="w-full px-2">
              <AnnualPesticides lot={selected} tests={tests} item={item} />
              <AnnualRancidity lot={selected} tests={tests} item={item} />
              <AnnualSolvents  lot={selected} tests={tests} item={item} />
            </div>
          }
        </div>
      }
    </div>
  )
}

export default Annuals;
