import { useSelector } from 'react-redux';
import Detail    from '../../../misc/detail.js';
import Divider   from '../../../misc/divider.js';
import Container from '../../../misc/container.js';

const SpecBasics = ({ name, number }) => {
  const { loading } = useSelector(state => state.bulk);

  return (
    <Container title="Bulk Basics" loading={loading} contents={[
      <Detail label="Name:" data={name || ""} key={1} />,
      <Detail label="Item #:" data={number || ""} key={2} />
    ]} />
  )
}

export default SpecBasics;
