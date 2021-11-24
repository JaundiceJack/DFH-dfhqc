// Import Basics
import { useDispatch } from 'react-redux';
// Import Actions
import { setShowTesting, setShowSampling } from '../../../../../actions/testingActions.js';
// Import Components
import Button from '../../../../button.js';

const SampleHeader = ({
  type,
  title,
  test,
  showTesting,
  showSampling,
  showDeleting,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-5 p-1">
      <h3 className="text-lg text-left px-2 text-blue-200 col-span-2">
        {title}
      </h3>
      <div className="flex flex-row justify-self-end col-start-4 col-span-2">
      {!showSampling &&
       !showDeleting &&
        test && test.samples.length > 0 &&
        <Button color={showTesting ? "bg-red-300" : "bg-green-300"}
          text={showTesting ? "x" : "Test"}
          onClick={() => { showTesting ? dispatch(setShowTesting('')) : dispatch(setShowTesting(type)) }}
          extraClasses="w-16 h-7"/>}
      {!showTesting &&
       !showDeleting &&
        <Button color={showSampling ? "bg-red-300" : "bg-yellow-300"}
          text={showSampling ? "x" : "Sample"}
          onClick={() => { showSampling ? dispatch(setShowSampling('')) : dispatch(setShowSampling(type)) }}
          extraClasses="w-16 h-7"/>}
      </div>
    </div>
  )
}

export default SampleHeader;
