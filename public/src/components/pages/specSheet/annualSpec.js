import Detail  from '../../misc/detail.js';
import SpecSection from './specSection.js';

const AnnualSpec = ({ pesticides, rancidity, solvents }) => {
  return (
    <SpecSection title="Annual Testing" contents={[
      <Detail label="Pesticides:"
        data={`Conforms to ${pesticides && pesticides.standard}`}
        color="text-black"
        capData={false}
        extraClasses={pesticides && !pesticides.tested && "hidden"}
        key={1} />,
      <div className={rancidity && !rancidity.tested && "hidden"} key={2}>
        <Detail label="Peroxide:"
          data={`≤ ${rancidity && rancidity.peroxide} meq/Kg`}
          color="text-black"
          capData={false} />
        <Detail label="p-Anisidine:"
          data={`≤ ${rancidity && rancidity.anisidine} p-A.V.`}
          color="text-black"
          capData={false} />
        <Detail label="TOTOX Value:"
          data={`≤ ${rancidity && rancidity.totox}`}
          color="text-black"
          capData={false} />
      </div>,
      <Detail label="Solvents:"
        data={`Absent of ${solvents && solvents.standard} solvents.`}
        color="text-black"
        capData={false}
        extraClasses={solvents && !solvents.tested && "hidden"}
        key={3} />
    ]} />
  )
}

export default AnnualSpec;
