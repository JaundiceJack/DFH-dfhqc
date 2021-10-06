import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getLabs, toggleAdding, toggleDeleting, toggleEditing } from '../../../actions/labActions';
// Import Components
import LabList   from './labList.js';
import LabSpec   from './labSpec.js';
import LabAdd    from './labAdd.js';
import LabEdit   from './labEdit.js';
import LabDelete from './labDelete.js';

const LabSummary = () => {
  const selectedId = useSelector(state => state.lab.selectedLab._id);
  const adding = useSelector(state => state.lab.adding);
  const deleting = useSelector(state => state.lab.deleting);
  const editing = useSelector(state => state.lab.editing);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  // Load the items when the component loads
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLabs());
    return () => { cleanup() };
  }, []);
  const cleanup = () => { setTimeout(() => { return }, 5000); }

  // Set up button functions
  const onAddClick = () => { dispatch(toggleAdding()); };
  const onRemoveClick = () => { dispatch(toggleDeleting()); };
  const onEditClick = () => { dispatch(toggleEditing()); };

  // Compose reusable class collections
  const buttonCs = " rounded py-1/2 px-2 mx-1 my-1 2xl:my-0 font-semibold transform duration-75" +
                   " ease-in-out hover:scale-105 disabled:opacity-25 hover:opacity-100 opacity-75  ";

  return !isAuthenticated ?
    (<Redirect to="/login" />) :
    (<div className="h-full p-4 w-full rounded border-l border-gray-800 bg-gradient-to-br from-gray-800 via-transparent to-gray-800">
      <div className="flex flex-col h-full mb-4 2xl:mb-0">
        <h1 className="mb-4 ml-2 text-xl font-bold text-blue-200"> Testing </h1>
        <div className="grid grid-cols-5 h-full">
          <div className={"mb-4 2xl:mb-0 sm:mr-4 flex flex-col " +
                          "col-span-5 2xl:col-span-1 rounded bg-gradient-to-b " +
                          "from-gray-600 to-transparent "}>
            <div className="flex flex-col 2xl:flex-row px-4 py-2 bg-gray-700 rounded-t">
              <h2 className="text-center font-semibold text-blue-100 text-xl">Labs</h2>
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
                <LabList />
              </div>
            }
            {adding && <LabAdd toggleAdd={onAddClick} /> }
            {editing && <LabEdit toggleEdit={onEditClick} />}
            {deleting && <LabDelete toggleDelete={onRemoveClick} /> }
          </div>
          <LabSpec />
        </div>
      </div>
    </div>)
}

export default LabSummary;
