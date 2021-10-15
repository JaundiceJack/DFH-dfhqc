import { useSelector, useDispatch } from 'react-redux'
import { removeRawSample } from '../../../../../actions/lotActions'

const DeleteMicro = ({ lotId, test, close }) => {
  // Convert the date to mm/dd/yyyy format
  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
  }

  // Dispatch the delete sample action
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch(removeRawSample(lotId, 'micro', test));
    close();
  }

  return (
    <div className="mx-4 my-2">
      <h3 className="text-blue-100 font-semibold text-center">Remove the sample taken on {formatDate(test.sample_date)}?</h3>
      <div className="w-full flex flex-row justify-center">
        <button onClick={onDelete}
          className="rounded bg-red-300 px-5 py-1 m-2 transform hover:scale-105 text-black font-semibold" >
          Delete It</button>
        <button onClick={close}
          className="rounded bg-yellow-300 px-5 py-1 m-2 transform hover:scale-105 text-black" >
          Cancel</button>
      </div>
    </div>
  )
}

export default DeleteMicro;
