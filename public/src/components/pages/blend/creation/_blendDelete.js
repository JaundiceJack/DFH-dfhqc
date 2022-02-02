import { useSelector, useDispatch } from 'react-redux';
import { deleteBlend } from '../../../../actions/blendActions';

const BlendDelete = ({toggleDelete}) => {
  const selected = useSelector(state => state.blend.selectedBlend);
  const dispatch = useDispatch();
  const onDelete = () => { dispatch(deleteBlend(selected._id)) };

  return (
    <div className="mx-4 my-2">
      <h3 className="text-blue-100 font-semibold text-center">
        Are you sure you want to delete {" "}
        <p className="inline capitalize">{selected.name}</p>?
      </h3>
      <div className="w-full flex flex-row justify-center">
        <button onClick={onDelete}
          className="rounded bg-gray-200 px-5 py-1 m-2 transform hover:scale-105">
          Yes</button>
        <button onClick={toggleDelete}
          className="rounded bg-gray-400 px-5 py-1 m-2 transform hover:scale-105">
          No</button>
      </div>
    </div>
  )
}

export default BlendDelete;
