import { useSelector } from 'react-redux';
//import { getAssay } from '../../../actions/assayActions';

import SpecBasics    from './specBasics';
import SpecIngredients from './specIngredients';

const BlendSpec = () => {
  // Get the current selection from the redux state
  const selected = useSelector( state => state.blend.selectedBlend );

  const servingSize = selected.ingredients !== undefined ?
    selected.ingredients.reduce((total, current) => {
      const basicClaim = current.potency ? (current.claim / (current.potency * 0.01)) : current.claim;
      const overClaim  = current.overage ? (current.overage * 0.01) + 1 : 1;
      return (basicClaim * overClaim) + total;
    }, 0).toFixed(3) : "N/A";

  const fillWeight = selected.ingredients !== undefined ?
    selected.ingredients.reduce((total, current) => {
      const basicClaim = current.potency ? (current.claim / (current.potency * 0.01)) : current.claim;
      const overClaim  = current.overage ? (current.overage * 0.01) + 1 : 1;
      const perUnit = (basicClaim * overClaim) / selected.units_per_serving;
      return perUnit + total;
    }, 0).toFixed(3) : "N/A";

  return (
    <div className="sm:mr-4 h-full col-span-5 2xl:col-span-4 rounded bg-gradient-to-br from-gray-600 via-transparent to-gray-600">
      <div className="flex flex-row px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-900 rounded-t rounded-br border-b border-gray-500 mb-3">
        <h2 className="text-center font-semibold text-blue-100 text-xl">Specifications</h2>
      </div>

      <div className="flex flex-col py-2 px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-700 mb-4 rounded-lg">
          <SpecBasics name={selected.name}
                      number={selected.number}
                      serving={servingSize}
                      batchSize={selected.batch_size}
                      servingUnits={selected.units_per_serving}
                      fillWeight={fillWeight} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-700 mb-4 rounded-lg">
          <SpecIngredients ingredients={selected.ingredients}
                           serving={servingSize}
                           batchSize={selected.batch_size}
                           fillWeight={fillWeight}
                           servingUnits={selected.units_per_serving} />
        </div>
      </div>
    </div>
  )
}

export default BlendSpec;
