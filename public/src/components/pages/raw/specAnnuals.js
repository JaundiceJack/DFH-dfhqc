import Detail from '../../detail.js';
import Divider from '../../divider.js';

const SpecAnnuals = ({ pesticide, solvent, rancidity }) => {
  return (
    <div className="bg-gray-600 rounded">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200 font-semibold">Annual Tests</h2>
      <Divider />
      <div className="flex flex-col p-2">
        <Detail label="Pesticides?"    data={pesticide && pesticide.tested ? "Yes" : "No" || ""} />
        {pesticide && pesticide.tested &&
          <Detail label="Standard:"    data={pesticide && pesticide.standard} />}
        {pesticide && pesticide.tested &&
          <Detail label="Last Tested:" data={pesticide && pesticide.last_tested} />}

        <div className="h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent col-span-3 my-1" />

        <Detail label="Solvents?"      data={solvent && solvent.tested ? "Yes" : "No" || ""} />
        {solvent && solvent.tested &&
          <Detail label="Standard:"    data={solvent && solvent.standard} /> }
        {solvent && solvent.tested &&
          <Detail label="Last Tested:" data={solvent && solvent.last_tested} /> }

        <div className="h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent col-span-3 my-1" />

        <Detail label="Rancidity?"         data={rancidity && rancidity.tested ? "Yes" : "No" || ""} />
        {rancidity && rancidity.tested &&
          <Detail label="Peroxide Max:"    data={rancidity && rancidity.peroxide} /> }
        {rancidity && rancidity.tested &&
          <Detail label="P-Anisidine Max:" data={rancidity && rancidity.anisidine} /> }
        {rancidity && rancidity.tested &&
          <Detail label="TOTOX Max:"       data={rancidity && rancidity.totox} /> }
        {rancidity && rancidity.tested &&
          <Detail label="Last Tested:"     data={rancidity && rancidity.last_tested} /> }

      </div>
    </div>
  )
}

export default SpecAnnuals;
