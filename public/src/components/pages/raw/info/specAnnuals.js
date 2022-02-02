// Import Basics
import { useSelector } from 'react-redux';
import { formatDate }  from '../../../../functions/time.js';
// Import Components
import Detail    from '../../../misc/detail.js';
import Divider   from '../../../misc/divider.js';
import Container from '../../../misc/container.js';

const SpecAnnuals = ({ pesticide, solvent, rancidity }) => {
  const { loading } = useSelector(state => state.raw);

  return (
    <Container title="Annual Tests" loading={loading} contents={[
      <Detail label="Pesticides?"
              data={pesticide && pesticide.tested ? "Yes" : "No" || ""} />,
      <Detail label="Standard:"
              data={pesticide && pesticide.standard}
              extraClasses={pesticide && !pesticide.tested && "hidden"} />,
      <Detail label="Last Tested:"
              data={pesticide && pesticide.lots_passing && pesticide.lots_passing.length > 0 &&
                formatDate(pesticide.lots_passing[pesticide.lots_passing.length-1].date)}
              extraClasses={pesticide && !pesticide.tested && "hidden"} />,
      <div className="h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent col-span-3 my-1" />,
      <Detail label="Solvents?"
              data={solvent && solvent.tested ? "Yes" : "No" || ""} />,
      <Detail label="Standard:"
              data={solvent && solvent.standard}
              extraClasses={solvent && !solvent.tested && "hidden"} />,
      <Detail label="Last Tested:"
              data={solvent && solvent.lots_passing && solvent.lots_passing.length > 0 &&
                formatDate(solvent.lots_passing[solvent.lots_passing.length-1].date)}
              extraClasses={solvent && !solvent.tested && "hidden"} />,
      <div className="h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent col-span-3 my-1" />,
      <Detail label="Rancidity?"
              data={rancidity && rancidity.tested ? "Yes" : "No" || ""} />,
      <Detail label="Peroxide Max:"
              data={rancidity && rancidity.peroxide}
              extraClasses={rancidity && !rancidity.tested && "hidden"} />,
      <Detail label="P-Anisidine Max:"
              data={rancidity && rancidity.anisidine}
              extraClasses={rancidity && !rancidity.tested && "hidden"} />,
      <Detail label="TOTOX Max:"
              data={rancidity && rancidity.totox}
              extraClasses={rancidity && !rancidity.tested && "hidden"} />,
      <Detail label="Last Tested:"
              data={rancidity && rancidity.lots_passing && rancidity.lots_passing.length > 0 &&
                formatDate(rancidity.lots_passing[rancidity.lots_passing.length-1].date)}
              extraClasses={rancidity && !rancidity.tested && "hidden"} />,
    ]} />
  )
}

export default SpecAnnuals;
