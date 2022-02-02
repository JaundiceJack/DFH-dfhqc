import Detail from '../../misc/detail.js';
import Divider from '../../misc/divider.js';
import Container from '../../misc/container.js';

const VendorBasicSpec = ({vendor}) => {
  return (
    <Container title="Basic Vendor Info" loading={false} contents={[
      <Detail label="Name:" data={vendor && vendor.name} />
    ]} />
  )
}

export default VendorBasicSpec;
