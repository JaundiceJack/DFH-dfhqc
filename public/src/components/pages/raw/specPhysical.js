const SpecPhysical = ({densityMin, densityMax, moistureMin, moistureMax}) => {
  // Get a string representing the range with the given units
  const rangeString = (min, max, units) => {
    if (min && max) { return `${min} - ${max} ${units}`; }
    else if (min && !max) { return `≥ ${min} ${units}`; }
    else if (!min && max) { return `≤ ${max} ${units}`; }
    else return "N/A";
  }

  return (
    <div className="bg-gray-600 rounded p-2 text-blue-100 font-semibold">
      <h2 className="text-lg text-left ml-2 underline">Physical</h2>
      <div className="grid grid-cols-2">
        <p className="text-right mr-2">Density:</p>
        <p>{rangeString(densityMin, densityMax, "g/mL")}</p>
        <p className="text-right mr-2">Moisture:</p>
        <p>{rangeString(moistureMin, moistureMax, "%")}</p>
      </div>
    </div>
  )
}

export default SpecPhysical;
