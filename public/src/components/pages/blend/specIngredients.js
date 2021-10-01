import { useState } from 'react';

const SpecIngredients = ({ ingredients, serving, batchSize, servingUnits, fillWeight }) => {


  //
  const mapIngredients = () => {
    if (ingredients) {
      // Sort them beforehand
      return ingredients
      .sort((a, b) => a.ingredient_type[0] > b.ingredient_type[0] )
      .map((ingredient, index) => {

        const basicClaim = ingredient.potency ? (ingredient.claim / (ingredient.potency * 0.01)) : ingredient.claim;
        const overClaim  = ingredient.overage ? (ingredient.overage * 0.01) + 1 : 1;
        const servingInput = basicClaim * overClaim;
        const unitInput = servingInput / servingUnits;

        const percentOfFormula = ((servingInput / serving) * 100).toFixed(2);
        const perBatchOfFormula = (percentOfFormula * 0.01 * batchSize).toFixed(3);

        // Make even/odd row classes
        const rc = "p-2 grid grid-cols-1 md:grid-cols-12 rounded hover:text-yellow-200";
        const rowClass = index & 1 ? rc+" bg-gray-600" : rc+" bg-gray-500";

        return (
          <div key={index} className={rowClass} >
            <div className="grid grid-cols-2 gap-2 md:gap-0 col-span-1">
              <p className="md:hidden mr-2 sm:mr-0 text-right">Item#:</p>
              <p className="capitalize">
                {`${ingredient.raw_number}`}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 md:gap-0 md:col-span-2">
              <p className="md:hidden mr-2 sm:mr-0 text-right">Name:</p>
              <a href="#" className="capitalize cursor-default truncate whitespace-nowrap md:col-span-2" title={ingredient.raw_name}>
                {`${ingredient.raw_name}`}</a>
            </div>
            <div className="grid grid-cols-2 gap-2 md:gap-0 col-span-1 truncate">
              <p className="md:hidden mr-2 sm:mr-0 text-right">Label Claim:</p>
              <p className="whitespace-nowrap">
                {`${ingredient.claim} mg`}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 md:gap-0 col-span-1 truncate">
              <p className="md:hidden mr-2 sm:mr-0 text-right">Unit Input:</p>
              <p className="whitespace-nowrap">
                {`${unitInput.toFixed(2)} mg`}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 md:gap-0 col-span-1 truncate">
              <p className="md:hidden mr-2 sm:mr-0 text-right">Serving Input:</p>
              <p className="whitespace-nowrap">
                {`${servingInput.toFixed(2)} mg`}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 md:gap-0 col-span-1">
              <p className="md:hidden mr-2 sm:mr-0 text-right">Overage:</p>
              <p className="whitespace-nowrap">
                { ingredient.overage !== 0 && `${ingredient.overage} %`}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 md:gap-0 col-span-1">
              <p className="md:hidden mr-2 sm:mr-0 text-right">% of Formula:</p>
              <p className="">
                {`${percentOfFormula}%`}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 md:gap-0 md:col-span-4">
              <p className="md:hidden mr-2 sm:mr-0 text-right">Per Batch:</p>
              <p className="whitespace-nowrap">
                {`${perBatchOfFormula} kg`}</p>
            </div>
          </div>
        )
      })
    }
  }

  return (
    <div className="bg-gray-600 rounded p-2 text-blue-100 font-semibold sm:col-span-3">
      <h2 className="text-lg text-left ml-2 underline">Ingredients</h2>
      <div className="hidden md:grid grid-cols-12 py-2 rounded bg-gray-700 mb-1 p-2">
        <p className="col-span-1">Item#</p>
        <p className="col-span-2">Name</p>
        <p className="col-span-1">Label Claim</p>
        <p className="col-span-1">Unit Input</p>
        <p className="col-span-1">Serving Input</p>
        <p className="col-span-1">Overage</p>
        <p className="col-span-1">% of Formula</p>
        <p className="col-span-4">Per Batch</p>
      </div>
      {mapIngredients()}
      <div className="hidden md:grid grid-cols-12 py-2 rounded bg-gray-700 mt-1 p-2">
        <p className="col-span-1">Totals</p>
        <p className="col-span-2"></p>
        <p className="col-span-1"></p>
        <p className="col-span-1">{fillWeight}</p>
        <p className="col-span-1"></p>
        <p className="col-span-1"></p>
        <p className="col-span-1">100%</p>
        <p className="col-span-4">{batchSize}kg</p>
      </div>
    </div>
  )
}

export default SpecIngredients;
