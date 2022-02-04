import Detail  from '../../misc/detail.js';
import SpecSection from './specSection.js';

const MicroSpec = ({ micro }) => {
  return (
    <SpecSection title="Microbials" contents={[
      <Detail label="Aerobic Plate Count:"
        data={`≤ ${micro && micro.tpc} ${micro && micro.tpc_units}`}
        capData={false}
        color="text-black"
        key={1} />,
      <Detail label="Yeast & Mold Count:"
        data={`≤ ${micro && micro.ym} ${micro && micro.ym_units}`}
        capData={false}
        color="text-black"
        key={2} />,
      <Detail label="Enterobacterial Count:"
        data={`≤ ${micro && micro.entero} ${micro && micro.entero_units}`}
        capData={false}
        color="text-black"
        key={3} />,
      <Detail label="Salmonella:"
        data={`${micro && micro.salmonella}`}
        capData={false}
        color="text-black"
        key={4} />,
      <Detail label="Staph:"
        data={`${micro && micro.staph}`}
        capData={false}
        color="text-black"
        key={5} />,
      <Detail label="E. Coli:"
        data={`${micro && micro.ecoli}`}
        capData={false}
        color="text-black"
        key={6} />,
      <Detail label="P. Aeruginosa:"
        data={`${micro && micro.paeru}`}
        capData={false}
        color="text-black"
        extraClasses={micro && !micro.paeru_tested && "hidden"}
        key={7} />
    ]} />
  )
}

export default MicroSpec;
