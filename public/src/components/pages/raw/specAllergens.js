const SpecAllergens = ({allergens}) => {
  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200">Allergens</h2>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className="grid grid-cols-4 p-2">
        {!allergens && <p className="col-span-4 mx-auto">No allergens in this product.</p>}
        { allergens &&
         !allergens.soy &&
         !allergens.egg &&
         !allergens.milk &&
         !allergens.fish &&
         !allergens.wheat &&
         !allergens.peanut &&
         !allergens.tree_nut &&
         !allergens.shellfish && <p className="col-span-4 mx-auto">No allergens in this product.</p>}
        { allergens && allergens.soy && <p className="mx-auto text-red-400 text-lg">Soy</p>}
        { allergens && allergens.egg && <p className="mx-auto text-red-400 text-lg">Egg</p>}
        { allergens && allergens.milk && <p className="mx-auto text-red-400 text-lg">Milk</p>}
        { allergens && allergens.fish && <p className="mx-auto text-red-400 text-lg">Fish</p>}
        { allergens && allergens.wheat && <p className="mx-auto text-red-400 text-lg">Wheat</p>}
        { allergens && allergens.peanut && <p className="mx-auto text-red-400 text-lg">Peanut</p>}
        { allergens && allergens.tree_nut && <p className="mx-auto text-red-400 text-lg">Tree Nut</p>}
        { allergens && allergens.shellfish && <p className="mx-auto text-red-400 text-lg">Shellfish</p>}
      </div>
    </div>
  )
}

export default SpecAllergens;
