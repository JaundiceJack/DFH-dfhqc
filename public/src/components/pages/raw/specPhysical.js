const SpecPhysical = ({ density, moisture }) => {
  // Get a string representing the range with the given units
  const rangeString = (min, max, units) => {
    if (min && max) { return `${min} - ${max} ${units}`; }
    else if (min && !max) { return `≥ ${min} ${units}`; }
    else if (!min && max) { return `≤ ${max} ${units}`; }
    else return "N/A";
  }

  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200">Physical Tests</h2>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className="grid grid-cols-4 p-2">
        <p className="text-right mr-2">Density:</p>
        <p className="col-span-3">
          {density && rangeString(density.min, density.max, "g/mL")}</p>
        <p className="text-right mr-2">Moisture:</p>
        <p className="col-span-3">
          {moisture && rangeString(moisture.min, moisture.max, "%")}</p>
      </div>
    </div>
  )
}

export default SpecPhysical;
