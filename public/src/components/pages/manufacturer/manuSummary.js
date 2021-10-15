// Import basics
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
// Import server actions
import { getManufacturers, toggleAdding, toggleDeleting, toggleEditing } from '../../../actions/manufacturerActions';
import { loadUser } from '../../../actions/authActions.js';
// Import Components
import ManufacturerList   from './manuList.js';
import ManufacturerSpec   from './manuSpec.js';
import ManufacturerAdd    from './manuAdd.js';
import ManufacturerEdit   from './manuEdit.js';
import ManufacturerDelete from './manuDelete.js';
import Message   from '../../message.js';
import Button    from '../../button.js';

const ManufacturerSummary = () => {
  const selected = useSelector(state => state.manufacturer.selectedManufacturer);
  const adding = useSelector(state => state.manufacturer.adding);
  const deleting = useSelector(state => state.manufacturer.deleting);
  const editing = useSelector(state => state.manufacturer.editing);
  const user = useSelector(state => state.auth);

  // Load the items when the component loads
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getManufacturers());
    return () => { cleanup() };
  }, []);
  const cleanup = () => { setTimeout(() => { return }, 5000); }

  // Set up button functions
  const onAddClick = () => { dispatch(toggleAdding()); };
  const onRemoveClick = () => { dispatch(toggleDeleting()); };
  const onEditClick = () => { dispatch(toggleEditing()); };

  if (!user.token) return (<Redirect to='/login' />)
  else if (!user.isAuthenticated) return (<Message info="Authenticating..." extraClasses="w-1/2 self-center mx-auto" />)
  else return (
    <div className="h-full p-4 w-full rounded border-l border-gray-800 bg-gradient-to-br from-gray-800 via-transparent to-gray-800">
      <div className="flex flex-col h-full mb-4 2xl:mb-0">
        <h1 className="mb-4 ml-2 text-xl font-bold text-blue-200"> Suppliers </h1>
        <div className="grid grid-cols-5 h-full">
          <div className={"mb-4 2xl:mb-0 sm:mr-4 flex flex-col " +
                          "col-span-5 2xl:col-span-1 rounded bg-gradient-to-b " +
                          "from-gray-600 to-transparent "}>
            <div className="flex flex-col 2xl:flex-row px-4 py-2 bg-gray-700 rounded-t">
              <h2 className="text-center font-semibold text-blue-100 text-xl">Manufacturers</h2>
              <div className="flex-grow" />
              {!deleting && !editing &&
                <Button
                  color={!adding ? "bg-green-300" : "bg-red-400"}
                  text={adding ? "X" : "Add"}
                  onClick={onAddClick} /> }
              {!adding && !deleting &&
                <Button
                  color={!editing ? "bg-blue-300" : "bg-red-400"}
                  text={editing ? "X" : "Edit"}
                  onClick={onEditClick}
                  disabled={Object.entries(selected).length === 0 ? true : false} /> }
              {!adding && !editing &&
                <Button
                  color="bg-red-400"
                  text={deleting ? "X" : "Remove"}
                  onClick={onRemoveClick}
                  disabled={Object.entries(selected).length === 0 ? true : false} /> }
            </div>
              <div className="bg-gray-500 h-px w-full mb-3" />
              {!adding && !deleting && !editing &&
              <div className="h-96 2xl:h-full mx-4 my-2">
                <ManufacturerList />
              </div>
            }
            {adding && <ManufacturerAdd toggleAdd={onAddClick} /> }
            {editing && <ManufacturerEdit toggleEdit={onEditClick} />}
            {deleting && <ManufacturerDelete toggleDelete={onRemoveClick} /> }
          </div>
          <ManufacturerSpec />
        </div>
      </div>
    </div>
  )
}

export default ManufacturerSummary;
