import { useSelector, useDispatch } from 'react-redux'
import { deleteLot } from '../../../../actions/lotActions'
import Spinner from '../../../misc/spinner.js';

const LotDelete = ({ toggleDelete }) => {
  const { selectedLot: selected, loading } = useSelector(state => state.lot);
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch(deleteLot(selected));
  }

  return (
    <div className="mx-4 my-2">
      { loading ? <Spinner /> :
        <div>
          <h3 className="text-blue-100 font-semibold text-center">Are you sure you want to delete {selected.lot}?</h3>
          <div className="w-full flex flex-row justify-center">
            <button className="rounded bg-gray-200 px-5 py-1 m-2 transform hover:scale-105" onClick={onDelete}>Delete It</button>
            <button className="rounded bg-gray-400 px-5 py-1 m-2 transform hover:scale-105" onClick={toggleDelete}>Cancel</button>
          </div>
        </div>
      }
    </div>
  )
}

export default LotDelete;
