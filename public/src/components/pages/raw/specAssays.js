const SpecAssays = ({ assays }) => {
  // Display the assays in the format Name: Range by Method
  const mapAssays = () => {
    if (assays) {
      return assays.map((assay, index) => {
        return (
          <div className="grid grid-cols-3 gap-x-2 p-2" key={index} >
            <p className="justify-self-end capitalize">{assay.assay.name}:</p>
            <p className="col-span-2 capitalize">
              {`${rangeString(assay.min, assay.max, assay.units.name)} by ${assay.method.name}`}
            </p>
          </div>
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
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200">Assays</h2>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      {mapAssays()}
    </div>
  )
}

export default SpecAssays;
