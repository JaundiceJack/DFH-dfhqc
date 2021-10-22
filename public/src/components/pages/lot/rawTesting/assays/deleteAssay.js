// Import basics
import { useSelector, useDispatch } from 'react-redux'
// Import server actions
import { removeRawSample } from '../../../../../actions/lotActions'

const DeleteAssay = ({ lotId, testId, sampleNumber, close }) => {
  // Convert the date to mm/dd/yyyy format
  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
  }

  // Dispatch the delete sample action
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch(removeRawSample(lotId, 'assay', testId, sampleNumber));
    close();
  }

  return (
    <div className="mx-4 my-2">
      <h3 className="text-blue-100 font-semibold text-center">
        Remove sample {sampleNumber}?
      </h3>
      <div className="w-full flex flex-row justify-center">
        <button
          onClick={onDelete}
          className={"rounded bg-red-300 px-5 py-1 m-2 transform " +
            "hover:scale-105 text-black font-semibold"} >
          Delete It</button>
        <button
          onClick={close}
          className={"rounded bg-yellow-300 px-5 py-1 m-2 transform " +
            "hover:scale-105 text-black"} >
          Cancel</button>
      </div>
    </div>
  )
}

export default DeleteAssay;
