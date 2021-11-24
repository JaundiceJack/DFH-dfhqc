import Detail from '../../detail.js';
import Divider from '../../divider.js';

const SpecBasics = ({ blend, fillWeight, servingSize }) => {
  return (
    <div className="bg-gray-600 rounded">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200 font-semibold">Blend Basics</h2>
      <Divider />
      <div className="flex flex-col p-2">
        <Detail label="Name:" data={blend && blend.name} />
        <Detail label="Item #:" data={blend && blend.number} />
        <Detail label="Serving Size:" data={servingSize && `${servingSize} mg`} capData={false} />
        <Detail label="Batch Size:" data={blend && `${blend.batch_size} kg`} capData={false}/>
        <Detail label="Units per Serving:" data={blend && blend.units_per_serving} />
        <Detail label="Fill Weight:" data={fillWeight && `${fillWeight} mg`} capData={false} />
      </div>
    </div>
  )
}

export default SpecBasics;
