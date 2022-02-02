import { useSelector } from 'react-redux';
import Detail from '../../../misc/detail.js';
import Divider from '../../../misc/divider.js';
import Spinner from '../../../misc/spinner.js';
import Container from '../../../misc/container.js';

const LabBasicSpec = () => {
  const { selectedLab: lab, loading } = useSelector(state => state.lab);

  return (
    <Container title="Basic Lab Info" loading={loading} contents={[
      <Detail label="Lab Name:" data={lab && lab.name} />,
      <Detail label="Standard TAT:" data={`${lab && lab.tat && lab.tat.standard ? lab.tat.standard+" days" : ""}`} />,
      <Detail label="Rush TAT:" data={`${lab && lab.tat && lab.tat.rush ? lab.tat.rush+" days" : ""}`} />,
      <Detail label="Emergency TAT:" data={`${lab && lab.tat && lab.tat.emergency ? lab.tat.emergency+" days" : ""}`} />
    ]} />
  )
}

export default LabBasicSpec;
