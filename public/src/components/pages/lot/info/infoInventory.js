import { useSelector } from 'react-redux';
import Container from '../../../misc/container.js';
import Detail from '../../../misc/detail.js';

const InfoInventory = ({ lot }) => {
  const { loading } = useSelector( state => state.lot );

  return (
    <Container title="Inventory" loading={loading} contents={[
      <Detail label="Amount:"
              data={lot && lot.inventory && `${lot.inventory.amount} ${lot.inventory.units}`}
              capData={false} key={1} />,
      <Detail label="Status:"
              data={lot && lot.inventory && lot.inventory.status} key={2} />
    ]} />
  )
}

export default InfoInventory;
