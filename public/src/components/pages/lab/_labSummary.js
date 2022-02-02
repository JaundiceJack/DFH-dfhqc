// Import basics
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
// Import server actions
import { getLabs, toggleAdding, toggleDeleting, toggleEditing } from '../../../actions/labActions';
import { getAssays } from '../../../actions/assayActions.js';
import { getIdentities } from '../../../actions/identityActions.js';
import { getMethods } from '../../../actions/methodActions.js';
import { loadUser } from '../../../actions/authActions.js';
// Import Components
import LabList   from './labList.js';
import LabSpec   from './labSpec.js';
import LabGen    from './creation/labGen.js';
import LabDelete from './creation/labDelete.js';
import Button    from '../../inputs/button.js';
import Message    from '../../misc/message.js';
import Spinner    from '../../misc/spinner.js';

const LabSummary = () => {
  const { selectedLab: selected,
    adding, deleting, editing,
    loading, error } = useSelector(state => state.lab);
  const user = useSelector(state => state.auth);

  // Load the items when the component loads
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getLabs());
    dispatch(getAssays());
    dispatch(getIdentities());
    dispatch(getMethods());
    return () => { cleanup() };
  }, []);
  const cleanup = () => { setTimeout(() => { return }, 5000); }

  // Set up button functions
  const onAddClick    = () => { dispatch(toggleAdding()); };
  const onRemoveClick = () => { dispatch(toggleDeleting()); };
  const onEditClick   = () => { dispatch(toggleEditing()); };

/*

i made the assay/id adding function
i guess from here i need to write logic to add the lab to the assay document's array
and to remove it if removed, which is the harder part
maybe like, every time an edit is made,
scan through each assay's document from the labs capabilities
and make sure the lab's id is there
then... scan the remaining assays and remove?
sounds intensive


*/

  if (!user.token) return (<Redirect to='/login' />)
  else if (!user.isAuthenticated) return (<Message info="Authenticating..." extraClasses="w-1/2 self-center mx-auto" />)
  else return (
    <div className="h-full p-4 w-full rounded bg-gradient-to-br from-gray-800 via-transparent to-gray-800">
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
                {loading ? <Spinner /> : <LabList />}
              </div>
            }
            {adding   && <LabGen toggle={onAddClick} /> }
            {editing  && <LabGen toggle={onEditClick} editing={true} />}
            {deleting && <LabDelete toggleDelete={onRemoveClick} /> }
          </div>
          <LabSpec />
        </div>
      </div>
    </div>
  )
}

export default LabSummary;
