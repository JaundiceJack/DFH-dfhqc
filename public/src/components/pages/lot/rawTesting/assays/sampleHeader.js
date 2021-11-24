// Import Basics
import { useDispatch } from 'react-redux';
// Import Actions
import { setShowTesting, setShowSampling } from '../../../../../actions/testingActions.js';
// Import Components
import Button from '../../../../button.js';

const SampleHeader = ({ title }) => {
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-5 p-1">
      <h3 className="text-lg text-left px-2 text-blue-200 col-span-2">
        {title}
      </h3>
    </div>
  )
}

export default SampleHeader;
