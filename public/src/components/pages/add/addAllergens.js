const AddAllergens = ({vals, onClick}) => {
  return (
    <div className="flex flex-col" >
      <h3 className="font-semibold text-blue-100 text-lg">Allergens</h3>
      <div className="mb-2 h-px w-full bg-gradient-to-r from-blue-300 to-transparent" />
      <div className="grid grid-cols-4">
        <p className="col-span-1 text-blue-100 font-semibold text-right mr-2">Soy</p>
        <input className="col-span-1 justify-self-start mt-1"
               name="soy"
               type="checkbox"
               value={vals.soy}
               defaultChecked={vals.soy}
               onClick={onClick} />
        <p className="col-span-1 text-blue-100 font-semibold text-right mr-2">Egg</p>
        <input className="col-span-1 justify-self-start mt-1"
               name="egg"
               type="checkbox"
               value={vals.egg}
               defaultChecked={vals.egg}
               onClick={onClick} />
        <p className="col-span-1 text-blue-100 font-semibold text-right mr-2">Milk</p>
        <input className="col-span-1 justify-self-start mt-1"
               name="milk"
               type="checkbox"
               value={vals.milk}
               defaultChecked={vals.milk}
               onClick={onClick} />
        <p className="col-span-1 text-blue-100 font-semibold text-right mr-2">Fish</p>
        <input className="col-span-1 justify-self-start mt-1"
               name="fish"
               type="checkbox"
               value={vals.fish}
               defaultChecked={vals.fish}
               onClick={onClick} />
        <p className="col-span-1 text-blue-100 font-semibold text-right mr-2">Wheat</p>
        <input className="col-span-1 justify-self-start mt-1"
               name="wheat"
               type="checkbox"
               value={vals.wheat}
               defaultChecked={vals.wheat}
               onClick={onClick} />
        <p className="col-span-1 text-blue-100 font-semibold text-right mr-2">Peanut</p>
        <input className="col-span-1 justify-self-start mt-1"
               name="peanut"
               type="checkbox"
               value={vals.peanut}
               defaultChecked={vals.peanut}
               onClick={onClick} />
        <p className="col-span-1 text-blue-100 font-semibold text-right mr-2">Tree Nut</p>
        <input className="col-span-1 justify-self-start mt-1"
               name="treeNut"
               type="checkbox"
               value={vals.treeNut}
               defaultChecked={vals.treeNut}
               onClick={onClick} />
        <p className="col-span-1 text-blue-100 font-semibold text-right mr-2">Shellfish</p>
        <input className="col-span-1 justify-self-start mt-1"
               name="shellfish"
               type="checkbox"
               value={vals.shellfish}
               defaultChecked={vals.shellfish}
               onClick={onClick} />
      </div>
    </div>
  )
}

export default AddAllergens;
