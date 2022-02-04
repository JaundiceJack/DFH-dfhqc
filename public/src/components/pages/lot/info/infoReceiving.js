import { useSelector } from 'react-redux';
import Container from '../../../misc/container.js';
import Detail from '../../../misc/detail.js';

const InfoBasic = ({ lot }) => {
  const { loading } = useSelector( state => state.lot );

  return (
    <Container title="Receiving" loading={loading} contents={[
      <Detail label="Facility:"
              data={lot && lot.receiving && lot.receiving.facility}
              key={1} />,
      <Detail label="Location:"
              data={lot && lot.receiving && lot.receiving.location}
              key={2} />,
      <Detail label="P.O.#:"
              data={lot && lot.receiving && lot.receiving.purchase_order}
              key={3} />,
      <Detail label="Vendor:"
              data={lot && lot.receiving && lot.receiving.vendor && lot.receiving.vendor.name}
              key={4} />,
      <Detail label="Mfr'd By:"
              data={lot && lot.receiving && lot.receiving.manufacturer && lot.receiving.manufacturer.name}
              key={5} />,
      <Detail label="Mfr. Lot:"
              data={lot && lot.receiving && lot.receiving.manufacturer_lot}
              key={6} />
    ]} />
  )
}

export default InfoBasic;
