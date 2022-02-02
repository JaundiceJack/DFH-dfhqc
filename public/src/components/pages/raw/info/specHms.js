import { useSelector } from 'react-redux';
import Detail    from '../../../misc/detail.js';
import Divider   from '../../../misc/divider.js';
import Container from '../../../misc/container.js';

const SpecHms = ({ hm }) => {
  const { loading } = useSelector(state => state.raw);

  return (
    <Container title="Heavy Metals" loading={loading} contents={[
      <Detail label="Arsenic:"
              data={hm && hm.units !== 'n/a' ? `${hm.arsenic} ${hm.units}` : "N/A"}
              capData={false} />,
      <Detail label="Cadmium:"
              data={hm && hm.units !== 'n/a' ? `${hm.cadmium} ${hm.units}` : "N/A"}
              capData={false} />,
      <Detail label="Lead:"
              data={hm && hm.units !== 'n/a' ? `${hm.lead} ${hm.units}` : "N/A"}
              capData={false} />,
      <Detail label="Mercury:"
              data={hm && hm.units !== 'n/a' ? `${hm.mercury} ${hm.units}` : "N/A"}
              capData={false} />,
      <Detail label="Nickel Tested?"
              data={hm && hm.nickel_tested ? "Yes" : "No"} />,
      <Detail label="Nickel:"
              data={hm && hm.units !== 'n/a' ? `${hm.nickel} ${hm.units}` : "N/A"}
              capData={false}
              extraClasses={hm && !hm.nickel_tested && "hidden"} />
    ]} />
  )
}

export default SpecHms;
