const SpecHms = ({ hm }) => {
  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200">Heavy Metals</h2>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className="grid grid-cols-3 p-2">

        <p className="text-right mr-2">Arsenic:</p>
        <p className="col-span-2">
          {hm && hm.units !== 'n/a' ? `${hm.arsenic} ${hm.units}` : "N/A"}</p>

        <p className="text-right mr-2">Cadmium:</p>
        <p className="col-span-2">
          {hm && hm.units !== 'n/a' ? `${hm.cadmium} ${hm.units}` : "N/A"}</p>

        <p className="text-right mr-2">Lead:</p>
        <p className="col-span-2">
          {hm && hm.units !== 'n/a' ? `${hm.lead} ${hm.units}` : "N/A"}</p>

        <p className="text-right mr-2">Mercury:</p>
        <p className="col-span-2">
          {hm && hm.units !== 'n/a' ? `${hm.mercury} ${hm.units}` : "N/A"}</p>

        <p className="text-right mr-2">Nickel Tested?</p>
        <p className="col-span-2">{hm && hm.nickel_tested ? "Yes" : "No"}</p>
        {hm && hm.units !== 'n/a' && hm.nickel_tested && <p className="text-right mr-2">Nickel:</p>}
        {hm && hm.units !== 'n/a' && hm.nickel_tested && <p>{`${hm.nickel} ${hm.units}`}</p>}

      </div>
    </div>
  )
}

export default SpecHms;
