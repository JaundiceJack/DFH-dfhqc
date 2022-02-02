import Checkbox  from '../../../inputs/checkbox.js';
import Entry     from '../../../inputs/entry.js';
import Selection from '../../../inputs/selection.js';
import Divider   from '../../../misc/divider.js';

const AllergenGen = ({ vals, onClick }) => {
  return (
    <div className="flex flex-col" >
      <h3 className="font-semibold text-blue-100 text-lg">Allergens</h3>
      <Divider />
      <div className="grid grid-cols-2 mx-2 gap-y-2">
        <Checkbox label="Soy" name="soy" value={vals.soy} onClick={onClick} defaultChecked={vals.soy} />

        <Checkbox label="Egg" name="egg" value={vals.egg} onClick={onClick} defaultChecked={vals.egg} />

        <Checkbox label="Milk" name="milk" value={vals.milk} onClick={onClick} defaultChecked={vals.milk} />

        <Checkbox label="Fish" name="fish" value={vals.fish} onClick={onClick} defaultChecked={vals.fish} />

        <Checkbox label="Wheat" name="wheat" value={vals.wheat} onClick={onClick} defaultChecked={vals.wheat} />

        <Checkbox label="Peanut" name="peanut" value={vals.peanut} onClick={onClick} defaultChecked={vals.peanut} />

        <Checkbox label="Tree Nut" name="tree_nut" value={vals.tree_nut} onClick={onClick} defaultChecked={vals.tree_nut} />

        <Checkbox label="Shellfish" name="shellfish" value={vals.shellfish} onClick={onClick} defaultChecked={vals.shellfish} />
      </div>
    </div>
  )
}

export default AllergenGen;
