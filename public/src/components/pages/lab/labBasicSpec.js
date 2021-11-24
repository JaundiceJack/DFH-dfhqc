import Detail from '../../detail.js';
import Divider from '../../divider.js';

const LabBasicSpec = ({lab}) => {
  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200">Basic Lab Info</h2>
      <Divider />
      <div className="flex flex-col p-2">
        <Detail label="Lab Name:" data={lab && lab.name} />
        <Detail label="Shipping Address:" data={lab && lab.shipping && lab.shipping.address} />
        <Detail label="Billing Address:" data={lab && lab.shipping && lab.billing.address} />
        <Detail label="Standard TAT:" data={`${lab && lab.tat && lab.tat.standard} days`} />
        <Detail label="Rush TAT:" data={`${lab && lab.tat && lab.tat.rush} days`} />
        <Detail label="Emergency TAT:" data={`${lab && lab.tat && lab.tat.emergency} days`} />
      </div>
    </div>
  )
}

export default LabBasicSpec;
