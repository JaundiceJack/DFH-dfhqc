import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRaws, getOptions, toggleAdding, toggleDeleting, toggleEditing } from '../../../actions/rawActions';
// Import Components
import RawList from './rawList';
import RawSpec from './rawSpec';
import RawAdd from './rawAdd';
import RawEdit from './rawEdit';
import RawDelete from './rawDelete';

const RawSummary = () => {
  const selectedId = useSelector(state => state.raw.selectedRaw._id);
  const adding = useSelector(state => state.raw.adding);
  const deleting = useSelector(state => state.raw.deleting);
  const editing = useSelector(state => state.raw.editing);

  // Load the items when the component loads
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRaws());
    dispatch(getOptions());
    return () => { cleanup() };
  }, []);
  const cleanup = () => { setTimeout(() => { return }, 5000); }

  // Set up button functions
  const onAddClick = () => {
    if (!adding) dispatch(getOptions());
    dispatch(toggleAdding());
  }
  const onRemoveClick = () => { dispatch(toggleDeleting()); }
  const onEditClick = () => {
    if (!editing) dispatch(getOptions());
    dispatch(toggleEditing());
  }

  // Compose reusable class collections
  const buttonCs = " rounded py-1/2 px-2 mx-1 my-1 2xl:my-0 font-semibold transform duration-75" +
                   " ease-in-out hover:scale-105 disabled:opacity-25 hover:opacity-100 opacity-75  ";

  return (
    <div className="2xl:m-4 p-4 w-full rounded border-l border-gray-800 bg-gradient-to-br from-gray-800 via-transparent to-gray-800">
      <div className="flex flex-col h-full mb-4 2xl:mb-0">
        <h1 className="mb-4 ml-2 text-xl font-bold text-blue-200"> Raw Materials </h1>
        <div className="grid grid-cols-5 h-full">
          <div className={"mb-4 2xl:mb-0 sm:mr-4 flex flex-col " +
                          "col-span-5 2xl:col-span-1 rounded bg-gradient-to-b " +
                          "from-gray-600 to-transparent "}>
            <div className="flex flex-col 2xl:flex-row px-4 py-2 bg-gray-700 rounded-t">
              <h2 className="text-center font-semibold text-blue-100 text-xl">Items</h2>
              <div className="flex-grow" />
              {!deleting && !editing &&
                <button className={!adding ? buttonCs+"bg-green-300" : buttonCs+"bg-red-400"}
                        onClick={onAddClick}
                        >{adding ? "X" : "Add"}</button>}
              {!adding && !deleting &&
                <button className={!editing ? buttonCs + "bg-blue-300" : buttonCs+"bg-red-400"}
                        onClick={onEditClick}
                        disabled={selectedId === undefined ? true : false}
                        >{editing ? "X" : "Edit"}</button>}
              {!adding && !editing &&
                <button className={buttonCs + "bg-red-400"}
                        onClick={onRemoveClick}
                        disabled={selectedId === undefined ? true : false}
                        >{deleting ? "X" : "Remove"}</button>}
            </div>

            <div className="bg-gray-500 h-px w-full mb-3" />

            {!adding && !deleting && !editing &&
              <div className="h-96 2xl:h-full mx-4 my-2">
                <RawList />
              </div>
            }
            {adding && <RawAdd toggleAdd={onAddClick} /> }
            {editing && <RawEdit toggleEdit={onEditClick} />}
            {deleting && <RawDelete toggleDelete={onRemoveClick} /> }
          </div>
          <RawSpec />
        </div>
      </div>
    </div>
  )
}

export default RawSummary;
