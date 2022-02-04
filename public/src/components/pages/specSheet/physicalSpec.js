import Detail  from '../../misc/detail.js';
import SpecSection from './specSection.js';
import { rangeString } from '../../../functions/strings.js';

const PhysicalSpec = ({ density, moisture }) => {
  return (
    <SpecSection title="Physical Testing" contents={[
      <Detail label="Density:"
        data={moisture && `${rangeString(density.min, density.max, "g/mL")}`}
        color="text-black"
        capData={false}
        key={1} />,
      <Detail label="Moisture:"
        data={moisture && `${rangeString(moisture.min, moisture.max, "%")}`}
        color="text-black"
        capData={false}
        key={2} />
    ]} />
  )
}

export default PhysicalSpec;
