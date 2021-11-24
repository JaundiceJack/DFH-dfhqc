import Detail from '../../detail.js';
import Divider from '../../divider.js';

const SpecPhysical = ({ density, moisture }) => {
  // Get a string representing the range with the given units
  const rangeString = (min, max, units) => {
    if (min && max) { return `${min} - ${max} ${units}`; }
    else if (min && !max) { return `≥ ${min} ${units}`; }
    else if (!min && max) { return `≤ ${max} ${units}`; }
    else return "N/A";
  }

  return (
    <div className="bg-gray-600 rounded">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200 font-semibold">Physical Tests</h2>
      <Divider />
      <div className="flex flex-col p-2">
        <Detail label="Density:" data={density && rangeString(density.min, density.max, "g/mL")} capData={false} />
        <Detail label="Moisture:" data={moisture && rangeString(moisture.min, moisture.max, "%")} capData={false} />
      </div>
    </div>
  )
}

export default SpecPhysical;
