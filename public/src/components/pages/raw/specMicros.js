import Detail from '../../detail.js';
import Divider from '../../divider.js';

const SpecMicros = ({ micro }) => {
  return (
    <div className="bg-gray-600 rounded">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200 font-semibold">Micros</h2>
      <Divider />
      <div className="flex flex-col p-2">
        <Detail label="Total Plate Count:" data={micro && micro.tpc && (`≤ ${micro.tpc} ${micro.tpc_units}`) } />
        <Detail label="Yeast & Mold:" data={micro && micro.ym && (`≤ ${micro.ym} ${micro.ym_units}`)} />
        <Detail label="Entero.:" data={micro && micro.entero && (`≤ ${micro.entero} ${micro.entero_units}`)} />
        <Detail label="Salmonella:" data={(micro && micro.salmonella && micro.salmonella) || "N/A"} />
        <Detail label="Staph:" data={(micro && micro.staph && micro.staph) || "N/A"} />
        <Detail label="E. Coli.:" data={(micro && micro.ecoli && micro.ecoli) || "N/A"} />
        {micro && micro.paeru_tested &&
          <Detail label="P. Aeruginosa:" data={(micro && micro.paeru && micro.paeru) || "N/A"} /> }
      </div>
    </div>
  )
}

export default SpecMicros;
