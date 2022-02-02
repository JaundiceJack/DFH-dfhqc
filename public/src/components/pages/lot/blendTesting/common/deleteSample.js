// Import basics
import { useSelector, useDispatch } from 'react-redux'
// Import server actions
import { removeRawSample } from '../../../../../actions/testingActions'
// Import helper functions
import { formatDate } from '../../../../../functions/time.js';

const DeleteSample = ({ lotId, sample, removeSample, close }) => {

  return (
    <div className="mx-4 my-2">
      <h3 className="text-blue-100 font-semibold text-center">
        Remove the sample taken on {sample && formatDate(sample.date_sampled)}?
      </h3>
      <div className="w-full flex flex-row justify-center">
        <button
          onClick={removeSample}
          className={
            "rounded bg-red-300 px-5 py-1 m-2 transform " +
            "hover:scale-105 text-black font-semibold"} >
          Delete It</button>
        <button
          onClick={close}
          className={
            "rounded bg-yellow-300 px-5 py-1 m-2 transform " +
            "hover:scale-105 text-black"} >
          Cancel</button>
      </div>
    </div>
  )
}

export default DeleteSample;
