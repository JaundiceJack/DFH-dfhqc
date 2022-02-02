import { useSelector } from 'react-redux';
import Detail    from '../../../misc/detail.js';
import Divider   from '../../../misc/divider.js';
import Container from '../../../misc/container.js';

const SpecExtra = ({ fill, capsPerBottle, blend }) => {
  const { loading } = useSelector(state => state.bulk);

  return (
    <Container title="Other Info" loading={loading} contents={[
      <Detail label="Blend Used:" data={`${blend && blend.number || ""} - ${blend && blend.name || ""}`} key={1} />,
      <Detail label="Fill Weight:" data={fill && `${fill || ""} ${fill && "mg"}`} key={2} />,
      <Detail label="Caps per Bottle:" data={capsPerBottle || ""} extraClasses="mb-2" key={3} />
    ]} />
  )
}

export default SpecExtra;
