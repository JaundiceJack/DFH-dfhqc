import Detail from '../../detail.js';
import Divider from '../../divider.js';

const LabContactSpec = ({lab}) => {
  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200">Contact Info</h2>
      <Divider />
      <div className="flex flex-col p-2">
        <Detail label="Emails:" data={lab && lab.contact && lab.contact.emails} />
        <Detail label="Phone Numbers:" data={lab && lab.contact && lab.contact.phones} />
      </div>
    </div>
  )
}

export default LabContactSpec;
