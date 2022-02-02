import Detail from '../../misc/detail.js';
import Divider from '../../misc/divider.js';
import Container from '../../misc/container.js';

const ManufacturerBasicSpec = ({manufacturer}) => {
  return (
    <Container title="Basic Manufacturer Info" loading={false} contents={[
      <Detail label="Name:" data={manufacturer && manufacturer.name} />
    ]} />
  )
}

export default ManufacturerBasicSpec;
