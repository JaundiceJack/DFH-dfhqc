import { useSelector, useDispatch } from 'react-redux'
import { deleteRaw } from '../../../actions/rawActions'

const RawDelete = ({toggleDelete}) => {
  const selected = useSelector(state => state.raw.selectedRaw)
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch(deleteRaw(selected._id));
  }

  // Capitalize the first word of each string
  const capitalize = (strang) => {
    if (strang.length > 0) {
      const words = strang.split(' ');
      let final = [];
      words.forEach(word => final.push(word[0].toUpperCase() + word.substring(1)) );
      return final.join(' ');
    } else return "";
  }

  return (
    <div className="mx-4 my-2">
      <h3 className="text-blue-100 font-semibold text-center">
        Are you sure you want to delete {capitalize(selected.name)}?
      </h3>
      <div className="w-full flex flex-row justify-center">
        <button onClick={onDelete}
          className="rounded bg-gray-200 px-5 py-1 m-2 transform hover:scale-105">
            Yes
        </button>
        <button onClick={toggleDelete}
          className="rounded bg-gray-400 px-5 py-1 m-2 transform hover:scale-105">
            No
        </button>
      </div>

    </div>
  )
}

export default RawDelete;
