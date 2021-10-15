const AddAllergens = ({ vals, onClick }) => {
  return (
    <div className="flex flex-col" >
      <h3 className="font-semibold text-blue-100 text-lg">Allergens</h3>
      <div className="mb-2 h-px w-full bg-gradient-to-r from-blue-300 to-transparent" />
      <div className="grid grid-cols-4">
        <p className="col-span-1 text-blue-100 font-semibold text-right mr-2">Soy</p>
        <input type="checkbox"
               name="soy"
               value={vals.soy}
               defaultChecked={vals.soy}
               onClick={onClick}
               className="col-span-1 justify-self-start mt-1" />
        <p className="col-span-1 text-blue-100 font-semibold text-right mr-2">Egg</p>
        <input type="checkbox"
               name="egg"
               value={vals.egg}
               defaultChecked={vals.egg}
               onClick={onClick}
               className="col-span-1 justify-self-start mt-1" />
        <p className="col-span-1 text-blue-100 font-semibold text-right mr-2">Milk</p>
        <input type="checkbox"
               name="milk"
               value={vals.milk}
               defaultChecked={vals.milk}
               onClick={onClick}
               className="col-span-1 justify-self-start mt-1"/>
        <p className="col-span-1 text-blue-100 font-semibold text-right mr-2">Fish</p>
        <input type="checkbox"
               name="fish"
               value={vals.fish}
               defaultChecked={vals.fish}
               onClick={onClick}
               className="col-span-1 justify-self-start mt-1" />
        <p className="col-span-1 text-blue-100 font-semibold text-right mr-2">Wheat</p>
        <input type="checkbox"
               name="wheat"
               value={vals.wheat}
               defaultChecked={vals.wheat}
               onClick={onClick}
               className="col-span-1 justify-self-start mt-1" />
        <p className="col-span-1 text-blue-100 font-semibold text-right mr-2">Peanut</p>
        <input type="checkbox"
               name="peanut"
               value={vals.peanut}
               defaultChecked={vals.peanut}
               onClick={onClick}
               className="col-span-1 justify-self-start mt-1" />
        <p className="col-span-1 text-blue-100 font-semibold text-right mr-2">Tree Nut</p>
        <input type="checkbox"
               name="treeNut"
               value={vals.treeNut}
               defaultChecked={vals.treeNut}
               onClick={onClick}
               className="col-span-1 justify-self-start mt-1" />
        <p className="col-span-1 text-blue-100 font-semibold text-right mr-2">Shellfish</p>
        <input type="checkbox"
               name="shellfish"
               value={vals.shellfish}
               defaultChecked={vals.shellfish}
               onClick={onClick}
               className="col-span-1 justify-self-start mt-1" />
      </div>
    </div>
  )
}

export default AddAllergens;
