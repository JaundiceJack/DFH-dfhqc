import { useSelector } from 'react-redux';
import Detail from '../../../misc/detail.js';
import Divider from '../../../misc/divider.js';
import Container from '../../../misc/container.js';

const SpecBasics = ({ blend, fillWeight, servingSize }) => {
  const { loading } = useSelector(state => state.blend);

  return (
    <Container title="Blend Basics" loading={loading} contents={[
      <Detail label="Name:"
              data={blend && blend.name}
              key={1} />,
      <Detail label="Item #:"
              data={blend && blend.number}
              key={2} />,
      <Detail label="Serving Size:"
              data={servingSize && `${servingSize} mg`}
              capData={false}
              key={3} />,
      <Detail label="Batch Size:"
              data={blend && blend.batch_size && `${blend.batch_size} kg`}
              capData={false}
              key={4} />,
      <Detail label="Units per Serving:"
              data={blend && blend.units_per_serving}
              key={5} />,
      <Detail label="Fill Weight:"
              data={fillWeight && `${fillWeight} mg`}
              capData={false}
              key={6} />
    ]} />
  )
}

export default SpecBasics;
