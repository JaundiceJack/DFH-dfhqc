// Import basics
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
// Import state/server actions
import { getRaws, toggleAdding, toggleDeleting, toggleEditing } from '../../../actions/rawActions';
import { getUnits }      from '../../../actions/unitActions.js';
import { getAssays }     from '../../../actions/assayActions.js';
import { getIdentities } from '../../../actions/identityActions.js';
import { getMethods }    from '../../../actions/methodActions.js';
import { getTextures }   from '../../../actions/textureActions.js';
import { loadUser }      from '../../../actions/authActions.js';
// Import Components
import Button from '../../button.js'
import Message   from '../../message.js';
import RawList from './rawList';
import RawSpec from './rawSpec';
import RawAdd from './rawAdd';
import RawEdit from './rawEdit';
import RawDelete from './rawDelete';

const RawSummary = () => {
  // Get variables from the state
  const selected = useSelector(state => state.raw.selectedRaw);
  const adding = useSelector(state => state.raw.adding);
  const deleting = useSelector(state => state.raw.deleting);
  const editing = useSelector(state => state.raw.editing);
  const user = useSelector(state => state.auth);
  const errorMsg = useSelector(state => state.msg.error);

  // Load the items when the component loads
  const dispatch = useDispatch();
  const getOptions = () => {
    dispatch(loadUser());
    dispatch(getAssays());
    dispatch(getMethods());
    dispatch(getUnits());
    dispatch(getIdentities());
    dispatch(getTextures());
  }
  useEffect(() => {
    dispatch(getRaws());
    getOptions();
    // Pause 5 seconds to prevent continuous loading
    setTimeout(() => { return }, 5000);
  }, [dispatch]);

  // Set up button functions
  const onAddClick    = () => { if (!adding)  getOptions(); dispatch(toggleAdding())  };
  const onEditClick   = () => { if (!editing) getOptions(); dispatch(toggleEditing()) };
  const onRemoveClick = () => { dispatch(toggleDeleting()); };

  if (!user.token)
    return (<Redirect to='/login' />)
  else if (!user.isAuthenticated && !user.isLoading)
    return (<Message info="Loading user..." extraClasses="w-1/2 self-center mx-auto" />)
  else if (!user.isAuthenticated && user.isLoading)
    return (<Message info="Authenticating..." extraClasses="w-1/2 self-center mx-auto" />)
  else return (
    <div className={"h-full p-4 w-full rounded " +
      "bg-gradient-to-br from-gray-800 via-transparent to-gray-800"}>
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
                <RawList />
              </div>
            }

            {adding   && <RawAdd    toggleAdd={onAddClick} /> }
            {editing  && <RawEdit   toggleEdit={onEditClick} />}
            {deleting && <RawDelete toggleDelete={onRemoveClick} /> }
          </div>
          <RawSpec />
        </div>
      </div>
    </div>
  )
}

export default RawSummary;
