import { useSelector } from 'react-redux';
import Detail from '../../../misc/detail.js';
import Divider from '../../../misc/divider.js';
import Spinner from '../../../misc/spinner.js';
import Container from '../../../misc/container.js';

const LabContactSpec = () => {
  const { selectedLab: lab, loading } = useSelector(state => state.lab);

  return (
    <Container title="Contact Info" loading={loading} contents={[
      <Detail label="Emails:" data={lab && lab.contact && lab.contact.emails.map(email => <p>{email}</p>)} />,
      <Detail label="Phone Numbers:" data={lab && lab.contact && lab.contact.phones.map(phone => <p>{phone}</p>)} />
    ]} />
  )
}

export default LabContactSpec;
