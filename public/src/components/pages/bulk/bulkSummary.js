import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBulks, toggleAdding, toggleDeleting, toggleEditing } from '../../../actions/bulkActions';
import { getRaws, getOptions } from '../../../actions/rawActions.js';
import { getBlends } from '../../../actions/blendActions.js';
import { Redirect } from 'react-router-dom';
// Import Components
import BulkList   from './bulkList';
import BulkSpec   from './bulkSpec';
import BulkAdd    from './bulkAdd';
import BulkEdit   from './bulkEdit';
import BulkDelete from './bulkDelete';

const BulkSummary = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const selectedId = useSelector(state => state.bulk.selectedBulk._id);
  const adding   = useSelector(state => state.bulk.adding);
  const deleting = useSelector(state => state.bulk.deleting);
  const editing  = useSelector(state => state.bulk.editing);

  // Load the items when the component loads
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlends());
    dispatch(getBulks());
    dispatch(getRaws());
    dispatch(getOptions());
    return () => { cleanup() };
  }, []);
  const cleanup = () => { setTimeout(() => { return }, 5000); }

  const onAddClick = () => { dispatch(toggleAdding()); }
  const onRemoveClick = () => { dispatch(toggleDeleting()); }
  const onEditClick = () => { dispatch(toggleEditing()); }
  const buttonCs = " rounded py-1/2 px-2 mx-1 my-1 2xl:my-0 font-semibold transform duration-75" +
                   " ease-in-out hover:scale-105 disabled:opacity-25 hover:opacity-100 opacity-75  ";

  return !isAuthenticated ?
    (<Redirect to="/login" />) :
    (<div className="h-full p-4 w-full rounded border-l border-gray-800 bg-gradient-to-br from-gray-800 via-transparent to-gray-800">
      <div className="flex flex-col h-full mb-4 2xl:mb-0">
        <h1 className="mb-4 ml-2 text-xl font-bold text-blue-200"> Bulks </h1>
        <div className="grid grid-cols-5 h-full">
          <div className={"mb-4 2xl:mb-0 sm:mr-4 flex flex-col " +
                          "col-span-5 2xl:col-span-1 rounded bg-gradient-to-b from-gray-600 to-transparent"}>
            <div className="flex flex-col 2xl:flex-row px-4 py-2 rounded-t bg-gray-700">
              <h2 className="text-center font-semibold text-blue-100 text-xl">Items</h2>
              <div className="flex-grow" />
              {!deleting && !editing &&
                <button className={!adding ? buttonCs+"bg-green-300" : buttonCs+"bg-red-400"}
                        onClick={onAddClick}>
                  {adding ? "X" : "Add"}
                </button>}
              {!adding && !deleting &&
                <button className={!editing ? buttonCs + "bg-blue-300" : buttonCs+"bg-red-400"}
                        onClick={onEditClick}
                        disabled={selectedId === undefined ? true : false}>
                  {editing ? "X" : "Edit"}
                </button>}
              {!adding && !editing &&
                <button className={buttonCs + "bg-red-400"}
                        onClick={onRemoveClick}
                        disabled={selectedId === undefined ? true : false}>
                  {deleting ? "X" : "Remove"}
                </button>}
            </div>

            <div className="bg-gray-500 h-px w-full mb-3" />

            {!adding && !deleting && !editing &&
              <div className="h-96 2xl:h-full mx-4 my-2">
                <BulkList />
              </div>
            }

            {adding && <BulkAdd toggleAdd={onAddClick} /> }
            {editing && <BulkEdit toggleEdit={onEditClick} />}
            {deleting && <BulkDelete toggleDelete={onRemoveClick} /> }

          </div>
          <BulkSpec />
        </div>
      </div>
    </div>
  )
}

export default BulkSummary;
