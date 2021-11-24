import Detail from '../../detail.js';
import Divider from '../../divider.js';

const SpecAssays = ({ assays }) => {
  // Display the assays in the format Name: Range by Method
  const mapAssays = () => {
    if (assays) {
      return assays.map((assay, index) => {
        return (
          <Detail key={index} extraClasses="mb-2"
            label={`${assay.assay.name}:`}
            data={`${rangeString(assay.min, assay.max, assay.units.name)} by ${assay.method.name}`} />
        )
      })
    }
  }

  // Get a string representing the range with the given units
  const rangeString = (min, max, units) => {
    if (min && max) { return `${min} - ${max} ${units}`; }
    else if (min && !max) { return `≥ ${min} ${units}`; }
    else if (!min && max) { return `≤ ${max} ${units}`; }
    else return `Report in ${units}`;
  }

  return (
    <div className="bg-gray-600 rounded">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200 font-semibold">Assays</h2>
      <Divider />
      {mapAssays()}
    </div>
  )
}

export default SpecAssays;
