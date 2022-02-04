import { useSelector } from 'react-redux';
import Detail from '../../../misc/detail.js';
import Divider from '../../../misc/divider.js';
import Container from '../../../misc/container.js';

const VendorBasicSpec = ({ vendor }) => {
  const { loading } = useSelector(state => state.vendor);

  return (
    <Container title="Basic Vendor Info" loading={loading} contents={[
      <Detail label="Name:" data={vendor && vendor.name} key={1} />
    ]} />
  )
}

export default VendorBasicSpec;
