import Detail from '../../detail.js';
import Divider from '../../divider.js';

const SpecIds = ({ ids }) => {
  // Display the assays in the format Name: Range by Method
  const mapIds = () => {
    if (ids) {
      return ids.map((id, index) => {
        return (
          <div key={index} className="flex flex-col p-2">
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
    }
  }

  return (
    <div className="bg-gray-600 rounded">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200 font-semibold">Identity</h2>
      <Divider />
      {mapIds(ids)}
    </div>
  )
}

export default SpecIds;
