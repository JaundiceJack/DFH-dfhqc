import { useSelector, useDispatch } from 'react-redux';
import { deleteBulk } from '../../../../actions/bulkActions';

const BulkDelete = ({toggleDelete}) => {
  const selected = useSelector(state => state.bulk.selectedBulk);
  const dispatch = useDispatch();
  const onDelete = () => { dispatch(deleteBulk(selected._id)) };

  return (
    <div className="mx-4 my-2">
      <h3 className="text-blue-100 font-semibold text-center">Are you sure you want to delete <p className="inline capitalize">{selected.name}</p>?</h3>
      <div className="w-full flex flex-row justify-center">
        <button className="rounded bg-gray-200 px-5 py-1 m-2 transform hover:scale-105" onClick={onDelete}>Yes</button>
        <button className="rounded bg-gray-400 px-5 py-1 m-2 transform hover:scale-105" onClick={toggleDelete}>No</button>
      </div>
    </div>
  )
}

export default BulkDelete;
