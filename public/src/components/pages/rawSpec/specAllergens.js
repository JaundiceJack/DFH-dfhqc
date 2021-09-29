const SpecAllergens = ({allergens}) => {
  return (
    <div className="bg-gray-600 rounded p-2 text-blue-100 font-semibold">
      <h2 className="text-lg text-left ml-2 underline">Allergens</h2>
      <div className="grid grid-cols-2">
        {!allergens && <p className="col-span-2 mx-auto">No allergens in this product.</p>}
        { allergens &&
         !allergens.soy &&
         !allergens.egg &&
         !allergens.milk &&
         !allergens.fish &&
         !allergens.wheat &&
         !allergens.peanut &&
         !allergens.tree_nut &&
         !allergens.shellfish && <p className="col-span-2 mx-auto">No allergens in this product.</p>}
        { allergens && allergens.soy && <p className="mx-auto">Soy</p>}
        { allergens && allergens.egg && <p className="mx-auto">Egg</p>}
        { allergens && allergens.milk && <p className="mx-auto">Milk</p>}
        { allergens && allergens.fish && <p className="mx-auto">Fish</p>}
        { allergens && allergens.wheat && <p className="mx-auto">Wheat</p>}
        { allergens && allergens.peanut && <p className="mx-auto">Peanut</p>}
        { allergens && allergens.tree_nut && <p className="mx-auto">Tree Nut</p>}
        { allergens && allergens.shellfish && <p className="mx-auto">Shellfish</p>}
      </div>
    </div>
  )
}

export default SpecAllergens;
