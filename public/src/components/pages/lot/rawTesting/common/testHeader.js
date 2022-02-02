// Import Components
import Divider from '../../../../misc/divider.js';

const TestHeader = ({ title }) => {
  return (
    <div className="flex flex-col">
      <h3 className="flex items-center text-lg text-left px-2 text-blue-200 h-10">
        {title}
      </h3>
      <Divider />
    </div>

  )
}

export default TestHeader;
