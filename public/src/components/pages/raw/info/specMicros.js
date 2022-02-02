import { useSelector } from 'react-redux';
import Detail    from '../../../misc/detail.js';
import Divider   from '../../../misc/divider.js';
import Container from '../../../misc/container.js';

const SpecMicros = ({ micro }) => {
  const { loading } = useSelector(state => state.raw);

  return (
    <Container title="Micros" loading={loading} contents={[
      <Detail label="Total Plate Count:"
              data={micro && micro.tpc && (`≤ ${micro.tpc} ${micro.tpc_units}`) } />,
      <Detail label="Yeast & Mold:"
              data={micro && micro.ym && (`≤ ${micro.ym} ${micro.ym_units}`)} />,
      <Detail label="Entero.:"
              data={micro && micro.entero && (`≤ ${micro.entero} ${micro.entero_units}`)} />,
      <Detail label="Salmonella:"
              data={(micro && micro.salmonella && micro.salmonella) || "N/A"} />,
      <Detail label="Staph:"
              data={(micro && micro.staph && micro.staph) || "N/A"} />,
      <Detail label="E. Coli.:" data={(micro && micro.ecoli && micro.ecoli) || "N/A"} />,
      <Detail label="P. Aeruginosa:"
              data={(micro && micro.paeru && micro.paeru) || "N/A"}
              extraClasses={micro && !micro.paeru_tested && "hidden"} />
    ]} />
  )
}

export default SpecMicros;
