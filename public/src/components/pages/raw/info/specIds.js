import { useSelector } from 'react-redux';
import Detail    from '../../../misc/detail.js';
import Divider   from '../../../misc/divider.js';
import Container from '../../../misc/container.js';

const SpecIds = ({ ids }) => {
  const { loading } = useSelector(state => state.raw);

  // Display the assays in the format Name: Range by Method
  const mapIds = () => {
    if (ids) {
      return ids.map((id, index) => {
        return (
          <div key={index} className="flex flex-col">
            <Detail label={`${id.identity.name}:`} data={`${id.posneg} by ${id.method.name}`} />
            {id.identity.is_botanical &&
              <div className="flex flex-col">
                <Detail label="Conforms to:" data={`${id.identity.genus} ${id.identity.species} ${id.identity.part}`} />
                <Detail label="Solvent:" data={id.identity.solvent ? `${id.identity.solvent}` : "N/A"} />
                <Detail label="Ratio:" data={id.identity.ratio ? `${id.identity.ratio}` : "N/A"} />
              </div>
             }
          </div>
        )
      })
    } else return [];
  }

  return (
    <Container title="Identity" loading={loading} contents={mapIds(ids)} />
  )
}

export default SpecIds;
