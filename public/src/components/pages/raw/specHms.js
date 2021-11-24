import Detail from '../../detail.js';
import Divider from '../../divider.js';

const SpecHms = ({ hm }) => {
  return (
    <div className="bg-gray-600 rounded">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200 font-semibold">Heavy Metals</h2>
      <Divider />
      <div className="flex flex-col p-2">
        <Detail label="Arsenic:" data={hm && hm.units !== 'n/a' ? `${hm.arsenic} ${hm.units}` : "N/A"} capData={false} />
        <Detail label="Cadmium:" data={hm && hm.units !== 'n/a' ? `${hm.cadmium} ${hm.units}` : "N/A"} capData={false} />
        <Detail label="Lead:"    data={hm && hm.units !== 'n/a' ? `${hm.lead} ${hm.units}` : "N/A"}    capData={false} />
        <Detail label="Mercury:" data={hm && hm.units !== 'n/a' ? `${hm.mercury} ${hm.units}` : "N/A"} capData={false} />
        <Detail label="Nickel Tested?" data={hm && hm.nickel_tested ? "Yes" : "No"} />
        {hm && hm.units !== 'n/a' && hm.nickel_tested &&
          <Detail label="Nickel:" data={hm && hm.units !== 'n/a' ? `${hm.nickel} ${hm.units}` : "N/A"} capData={false} />}
      </div>
    </div>
  )
}

export default SpecHms;
