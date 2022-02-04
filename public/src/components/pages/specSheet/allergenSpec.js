import Detail  from '../../misc/detail.js';
import SpecSection from './specSection.js';

const AllergenSpec = ({ allergens }) => {
  return (
    <SpecSection title="Allergens" contents={[
      <Detail label="Soy:"
        data={allergens && allergens.soy && `Contains Soy Allergen`}
        color="text-black"
        capData={false}
        extraClasses={allergens && !allergens.soy && "hidden"}
        key={1} />,
      <Detail label="Egg:"
        data={allergens && allergens.egg && `Contains Egg Allergen`}
        color="text-black"
        capData={false}
        extraClasses={allergens && !allergens.egg && "hidden"}
        key={2} />,
      <Detail label="Milk:"
        data={allergens && allergens.milk && `Contains Milk Allergen`}
        color="text-black"
        capData={false}
        extraClasses={allergens && !allergens.milk && "hidden"}
        key={3} />,
      <Detail label="Fish:"
        data={allergens && allergens.fish && `Contains Fish Allergen`}
        color="text-black"
        capData={false}
        extraClasses={allergens && !allergens.fish && "hidden"}
        key={4} />,
      <Detail label="Wheat:"
        data={allergens && allergens.wheat && `Contains Wheat Allergen`}
        color="text-black"
        capData={false}
        extraClasses={allergens && !allergens.wheat && "hidden"}
        key={5} />,
      <Detail label="Peanut:"
        data={allergens && allergens.peanut && `Contains Peanut Allergen`}
        color="text-black"
        capData={false}
        extraClasses={allergens && !allergens.peanut && "hidden"}
        key={6} />,
      <Detail label="Tree Nut:"
        data={allergens && allergens.tree_nut && `Contains Tree Nut Allergen`}
        color="text-black"
        capData={false}
        extraClasses={allergens && !allergens.tree_nut && "hidden"}
        key={7} />,
      <Detail label="Shellfish:"
        data={allergens && allergens.shellfish && `Contains Shellfish Allergen`}
        color="text-black"
        capData={false}
        extraClasses={allergens && !allergens.shellfish && "hidden"}
        key={8} />,
    ]} />
  )
}

export default AllergenSpec;
