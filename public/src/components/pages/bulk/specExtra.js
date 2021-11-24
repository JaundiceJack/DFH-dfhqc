import Detail from '../../detail.js';
import Divider from '../../divider.js';

const SpecExtra = ({ fill, capsPerBottle, blend }) => {
  return (
    <div className="bg-gray-600 rounded">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200 font-semibold">Other Info</h2>
      <Divider />
      <Detail label="Blend Used:" data={`${blend && blend.number || ""} - ${blend && blend.name || ""}`} />
      <Detail label="Fill Weight:" data={`${fill || ""} ${fill && "mg"}`} />
      <Detail label="Caps per Bottle:" data={capsPerBottle || ""} extraClasses="mb-2" />
    </div>
  )
}

export default SpecExtra;
