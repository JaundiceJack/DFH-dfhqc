import { useSelector } from 'react-redux';
import Detail from '../../../misc/detail.js';
import Container from '../../../misc/container.js';

const InfoBasic = ({ lot }) => {
  const { loading } = useSelector( state => state.lot );

  return (
    <Container title="Basic Lot Info" loading={loading} contents={[
      <Detail label="Name:"
              data={lot && (lot.raw   ? lot.raw.name :
                            lot.blend ? lot.blend.name :
                            lot.bulk  ? lot.bulk.name :
                            lot.fg   && lot.fg.name)}
              key={1} />,
      <Detail label="Lot#:"
              data={lot && lot.lot}
              key={2} />,
      <Detail label="Item#:"
              data={lot && (lot.raw ? lot.raw.number :
                            lot.blend ? lot.blend.number :
                            lot.bulk ? lot.bulk.number :
                            lot.fg && lot.fg.number)}
              key={3} />,
      <Detail label="Department:"
              data={lot && lot.department}
              key={4} />,
      <Detail label="Prior Lot:"
              data={lot && lot.prior_lot && lot.prior_lot.lot}
              extraClasses={(lot && lot.prior_lot) ? "" : "hidden"}
              key={5} />
    ]} />
  )
}

export default InfoBasic;
