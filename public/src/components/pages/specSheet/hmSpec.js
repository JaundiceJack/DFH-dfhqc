import Detail  from '../../misc/detail.js';
import SpecSection from './specSection.js';

const HmSpec = ({ hm }) => {
  return (
    <SpecSection title="Heavy Metals" contents={[
      <Detail label="Arsenic:"
        data={`≤ ${hm && hm.arsenic} ${hm && hm.units}`}
        capData={false}
        color="text-black"
        key={1} />,
      <Detail label="Cadmium:"
        data={`≤ ${hm && hm.cadmium} ${hm && hm.units}`}
        capData={false}
        color="text-black"
        key={2} />,
      <Detail label="Lead:"
        data={`≤ ${hm && hm.lead} ${hm && hm.units}`}
        capData={false}
        color="text-black"
        key={3} />,
      <Detail label="Mercury:"
        data={`≤ ${hm && hm.mercury} ${hm && hm.units}`}
        capData={false}
        color="text-black"
        key={4} />,
      <Detail label="Nickel:"
        data={`≤ ${hm && hm.nickel} ${hm && hm.units}`}
        capData={false}
        color="text-black"
        extraClasses={hm && !hm.nickel_tested && "hidden"}
        key={5} />
    ]} />
  )
}

export default HmSpec;
