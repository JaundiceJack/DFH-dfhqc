import { useSelector } from 'react-redux';
import Container from '../../../misc/container.js';

const SpecAllergens = ({ allergens }) => {
  const { loading } = useSelector(state => state.raw);

  return (
    <Container title="Allergens" loading={loading} contents={[
      <p className={`col-span-4 mx-auto ${
        (allergens ? (!allergens.soy &&
                      !allergens.egg &&
                      !allergens.milk &&
                      !allergens.fish &&
                      !allergens.wheat &&
                      !allergens.peanut &&
                      !allergens.tree_nut &&
                      !allergens.shellfish ? "" : "hidden") : "hidden")}`}>
            No allergens in this product.</p>,
      <p className={`mx-auto text-red-400 text-lg ${allergens ? (allergens.soy ? "" : "hidden") : "hidden"}`}>Soy</p>,
      <p className={`mx-auto text-red-400 text-lg ${allergens ? (allergens.egg ? "" : "hidden") : "hidden"}`}>Egg</p>,
      <p className={`mx-auto text-red-400 text-lg ${allergens ? (allergens.milk ? "" : "hidden") : "hidden"}`}>Milk</p>,
      <p className={`mx-auto text-red-400 text-lg ${allergens ? (allergens.fish ? "" : "hidden") : "hidden"}`}>Fish</p>,
      <p className={`mx-auto text-red-400 text-lg ${allergens ? (allergens.wheat ? "" : "hidden") : "hidden"}`}>Wheat</p>,
      <p className={`mx-auto text-red-400 text-lg ${allergens ? (allergens.peanut ? "" : "hidden") : "hidden"}`}>Peanut</p>,
      <p className={`mx-auto text-red-400 text-lg ${allergens ? (allergens.tree_nut ? "" : "hidden") : "hidden"}`}>Tree Nut</p>,
      <p className={`mx-auto text-red-400 text-lg ${allergens ? (allergens.shellfish ? "" : "hidden") : "hidden"}`}>Shellfish</p>
    ]} />
  )
}

export default SpecAllergens;
