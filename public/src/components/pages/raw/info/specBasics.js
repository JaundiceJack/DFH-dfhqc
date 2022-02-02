import { useSelector } from 'react-redux';
import Detail    from '../../../misc/detail.js';
import Divider   from '../../../misc/divider.js';
import Container from '../../../misc/container.js';

const SpecBasics = ({ raw }) => {
  const { loading } = useSelector(state => state.raw);

  return (
    <Container title="Raw Basics" loading={loading} contents={[
      <Detail label="Name:"    data={raw && raw.name} key={1} />,
      <Detail label="Item #:"  data={raw && raw.number} key={2} />,
      <Detail label="Color:"   data={raw && raw.color} key={3} />,
      <Detail label="Odor:"    data={raw && raw.odor} key={4} />,
      <Detail label="Texture:" data={raw && raw.texture && raw.texture.name} key={5} />,
      <Detail label="Taste:"   data={raw && raw.taste} key={6} />
    ]} />
  )
}

export default SpecBasics;
