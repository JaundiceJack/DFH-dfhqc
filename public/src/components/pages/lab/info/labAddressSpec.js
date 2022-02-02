import { useSelector } from 'react-redux';
import Detail from '../../../misc/detail.js';
import Container from '../../../misc/container.js';
import Divider from '../../../misc/divider.js';
import Spinner from '../../../misc/spinner.js';
import { capitalize } from '../../../../functions/strings.js';

const LabAddressSpec = () => {
  const { selectedLab: lab, loading } = useSelector(state => state.lab);

  return (
    <Container title="Locations" loading={loading} contents={[
      <Detail label="Shipping Address:" data={lab && lab.shipping &&
        [<p key={1}>{lab && lab.shipping && lab.shipping.address}</p>,
         <p key={2}>{lab && lab.shipping &&
           `${lab.shipping.city && lab.shipping.city},
            ${lab.shipping.state && lab.shipping.state.length === 2 ?
              lab.shipping.state.toUpperCase() :
                capitalize(lab.shipping.state)}`}</p>,
         <p key={3}>{lab && lab.shipping && lab.shipping.zip}</p>]} />,
      <Detail label="Billing Address:" data={lab && lab.shipping &&
        [<p key={1}>{lab && lab.billing && lab.billing.address}</p>,
         <p key={2}>{lab && lab.billing &&
           `${lab.billing.city && lab.billing.city},
            ${lab.billing.state && lab.billing.state.length === 2 ?
              lab.billing.state.toUpperCase() :
              capitalize(lab.billing.state)}`}</p>,
         <p key={3}>{lab && lab.billing && lab.billing.zip}</p>]} />
    ]} />
  )
}

export default LabAddressSpec;
