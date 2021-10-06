import { useSelector, useDispatch } from 'react-redux'
import { deleteLab } from '../../../actions/labActions'

const LabDelete = ({toggleDelete}) => {
  const selected = useSelector(state => state.lab.selectedLab)
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch(deleteLab(selected._id));
  }

  return (
    <div className="mx-4 my-2">
      <h3 className="text-blue-100 font-semibold text-center">Are you sure you want to delete {selected.name}?</h3>
      <div className="w-full flex flex-row justify-center">
        <button className="rounded bg-gray-200 px-5 py-1 m-2 transform hover:scale-105" onClick={onDelete}>Yes</button>
        <button className="rounded bg-gray-400 px-5 py-1 m-2 transform hover:scale-105" onClick={toggleDelete}>No</button>
      </div>

    </div>
  )
}

export default LabDelete;
