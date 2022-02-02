import { useSelector } from 'react-redux';
import Container from '../../../misc/container.js';
import Detail from '../../../misc/detail.js';

const InfoBlendTesting = ({ lot }) => {
  const { loading } = useSelector( state => state.lot );

  return (
    <Container title="Receiving" loading={loading} contents={[
      <Detail label="Lot #:"
              data={lot && lot.lot} key={1} />,
      <Detail label="Item #:"
              data={lot && lot.blend && lot.blend.number} key={2} />,
      <Detail label="Name:"
              data={lot && lot.blend && lot.blend.name} key={3} />,
      <Detail label="Location:"
              data={lot && lot.location} key={4} />
    ]} />
  )
}

export default InfoBlendTesting;
