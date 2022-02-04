import { useSelector } from 'react-redux';
import Detail from '../../../misc/detail.js';
import Divider from '../../../misc/divider.js';
import Container from '../../../misc/container.js';

const ManufacturerBasicSpec = ({ manufacturer }) => {
  const { loading } = useSelector(state => state.manufacturer);

  return (
    <Container title="Basic Manufacturer Info" loading={loading} contents={[
      <Detail label="Name:" data={manufacturer && manufacturer.name} key={1} />
    ]} />
  )
}

export default ManufacturerBasicSpec;
