import Detail from '../../misc/detail.js';
import SpecSection from './specSection.js';

const OrganolepticSpec = ({ material }) => {
  return (
    <SpecSection title="Organoleptics" contents={[
      <Detail label="Color:" data={material && material.color} color="text-black" key={1} />,
      <Detail label="Odor:" data={material && material.odor} color="text-black" key={2} />,
      <Detail label="Appearance:" data={material && material.texture && material.texture.name} color="text-black" key={3} />,
      <Detail label="Taste:" data={material && material.taste} color="text-black" extraClasses={material && !material.taste && "hidden"} key={4} />
    ]} />
  )
}

export default OrganolepticSpec;
