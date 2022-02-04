import { useSelector } from 'react-redux';
import Detail    from '../../../misc/detail.js';
import Divider   from '../../../misc/divider.js';
import Container from '../../../misc/container.js';

const SpecPhysical = ({ density, moisture }) => {
  const { loading } = useSelector(state => state.raw);

  // Get a string representing the range with the given units
  const rangeString = (min, max, units) => {
    if (min && max) { return `${min} - ${max} ${units}`; }
    else if (min && !max) { return `≥ ${min} ${units}`; }
    else if (!min && max) { return `≤ ${max} ${units}`; }
    else return "N/A";
  }

  return (
    <Container title="Physical Tests" loading={loading} contents={[
      <Detail label="Density:"
              data={density && rangeString(density.min, density.max, "g/mL")}
              capData={false}
              key={1} />,
      <Detail label="Moisture:"
              data={moisture && rangeString(moisture.min, moisture.max, "%")}
              capData={false}
              key={2} />
    ]} />
  )
}

export default SpecPhysical;
