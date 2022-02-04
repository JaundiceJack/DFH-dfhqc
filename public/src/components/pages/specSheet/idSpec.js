import Detail  from '../../misc/detail.js';
import SpecSection from './specSection.js';

const IdSpec = ({ ids }) => {
  return (
    <SpecSection title="Identity" contents={
      ids && ids.map((id, index) => {
        return <div className="">
          <Detail label={`${id.identity.name} Identity:`}
            data={`${id.posneg} by ${id.method.name}`}
            color="text-black"
            capData={false}
            key={index} />
        </div>
      })
    } />
  )
}

export default IdSpec;
