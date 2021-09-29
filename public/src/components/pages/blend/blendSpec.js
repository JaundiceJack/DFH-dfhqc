import { useSelector } from 'react-redux';
//import { getAssay } from '../../../actions/assayActions';

import SpecBasics    from '../blendSpec/specBasics';
import SpecIngredients from '../blendSpec/specIngredients';

const BlendSpec = (onSelect) => {
  // Get the current selection from the redux state
  const selectedBlend = useSelector( state => state.blend.selectedBlend );

  const servingSize = selectedBlend.ingredients !== undefined ?
    selectedBlend.ingredients.reduce((total, current) => {
      const basicClaim = current.potency ? (current.claim / (current.potency * 0.01)) : current.claim;
      const overClaim  = current.overage ? (current.overage * 0.01) + 1 : 1;
      return (basicClaim * overClaim) + total;
    }, 0).toFixed(3) : "N/A";

  const fillWeight = selectedBlend.ingredients !== undefined ?
    selectedBlend.ingredients.reduce((total, current) => {
      const basicClaim = current.potency ? (current.claim / (current.potency * 0.01)) : current.claim;
      const overClaim  = current.overage ? (current.overage * 0.01) + 1 : 1;
      const perUnit = (basicClaim * overClaim) / selectedBlend.units_per_serving;
      return perUnit + total;
    }, 0).toFixed(3) : "N/A";

  return (
    <div className="p-4 sm:mr-4 h-full col-span-5 2xl:col-span-4 rounded bg-gradient-to-br from-gray-600 via-transparent to-gray-600">
      <div className="flex flex-row">
        <h2 className="text-center font-bold text-blue-200 text-xl">Specifications</h2>
      </div>
      <div className="bg-blue-200 h-1 w-full rounded-full mt-1 mb-3" />
      <div className="flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-700 mb-4 rounded-lg">
          <SpecBasics name={selectedBlend.name}
                      number={selectedBlend.number}
                      serving={servingSize}
                      batchSize={selectedBlend.batch_size}
                      servingUnits={selectedBlend.units_per_serving}
                      fillWeight={fillWeight} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-700 mb-4 rounded-lg">
          <SpecIngredients ingredients={selectedBlend.ingredients}
                           serving={servingSize}
                           batchSize={selectedBlend.batch_size}
                           fillWeight={fillWeight}
                           servingUnits={selectedBlend.units_per_serving} />
        </div>
      </div>
    </div>
  )
}

export default BlendSpec;
