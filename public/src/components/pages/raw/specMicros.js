const SpecMicros = ({ micro }) => {
  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200">Micros</h2>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className="grid grid-cols-2 sm:grid-cols-3 p-2">

        <p className="text-right mr-2">Total Plate Count:</p>
        <p className="sm:col-span-2">
          {micro && micro.tpc && (`≤ ${micro.tpc} ${micro.tpc_units}`) }</p>

        <p className="text-right mr-2">Yeast & Mold:</p>
        <p className="sm:col-span-2">
          {micro && micro.ym && (`≤ ${micro.ym} ${micro.ym_units}`)}</p>

        <p className="text-right mr-2">Enterobacteria:</p>
        <p className="sm:col-span-2">
          {micro && micro.entero && (`≤ ${micro.entero} ${micro.entero_units}`)}</p>

        <p className="text-right mr-2">Salmonella:</p>
        <p className="sm:col-span-2">
          {(micro && micro.salmonella && micro.salmonella) || "N/A"}</p>

        <p className="text-right mr-2">Staph:</p>
        <p className="sm:col-span-2">
          {(micro && micro.staph && micro.staph) || "N/A"}</p>

        <p className="text-right mr-2">E. Coli:</p>
        <p className="sm:col-span-2">
          {(micro && micro.ecoli && micro.ecoli) || "N/A"}</p>

        {micro && micro.paeru_tested &&
          <p className="text-right mr-2">P. Aeruginosa:</p>}
        {micro && micro.paeru_tested &&
          <p className="sm:col-span-2">
            {(micro && micro.paeru && micro.paeru) || "N/A"}</p>}
      </div>
    </div>
  )
}

export default SpecMicros;
