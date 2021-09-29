import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBlends, toggleAdding, toggleDeleting, toggleEditing } from '../../../actions/blendActions';
import { getRaws, getOptions } from '../../../actions/rawActions.js';
// Import Components
import BlendList   from './blendList';
import BlendSpec   from './blendSpec';
import BlendAdd    from './blendAdd';
import BlendEdit   from './blendEdit';
import BlendDelete from './blendDelete';

const BlendSummary = () => {
  const selected = useSelector(state => state.blend.selectedIndex);
  const adding   = useSelector(state => state.blend.adding);
  const deleting = useSelector(state => state.blend.deleting);
  const editing  = useSelector(state => state.blend.editing);
  const blends = useSelector(state => state.blend.blends);
  const raws = useSelector(state => state.raw.raws);
  const options = useSelector(state => state.raw.units);

  // Load the items when the component loads
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlends());
    dispatch(getRaws());
    dispatch(getOptions());
    return () => { cleanup() };
  }, []);
  const cleanup = () => { setTimeout(() => { return }, 5000); }

  const onAddClick = () => { dispatch(toggleAdding()); }
  const onRemoveClick = () => { dispatch(toggleDeleting()); }
  const onEditClick = () => { dispatch(toggleEditing()); }
  const buttonCs = " rounded py-1 px-2 mx-1 my-1 2xl:my-0 font-semibold transform duration-75" +
                   " ease-in-out hover:scale-105 disabled:opacity-25 hover:opacity-100 opacity-75  ";

  return (
    <div className="2xl:m-4 p-4 w-full rounded border-l border-gray-800 bg-gradient-to-br from-gray-800 via-transparent to-gray-800">
      <div className="flex flex-col h-full mb-4 2xl:mb-0">
        <h1 className="mb-4 ml-2 text-xl font-bold text-blue-200"> Blends </h1>
        <div className="grid grid-cols-5 h-full">
          <div className={"mb-4 2xl:mb-0 p-4 sm:mr-4 flex flex-col " +
                          "col-span-5 2xl:col-span-1 rounded bg-gradient-to-b " +
                          "from-gray-600 to-transparent"}>
            <div className="flex flex-col 2xl:flex-row">
              <h2 className="text-center font-bold text-blue-200 text-xl">Items</h2>
              <div className="flex-grow" />
              {!deleting && !editing &&
                <button className={!adding ? buttonCs+"bg-green-300" : buttonCs+"bg-red-400"}
                        onClick={onAddClick}>
                  {adding ? "X" : "Add"}
                </button>}
              {!adding && !deleting &&
                <button className={!editing ? buttonCs + "bg-blue-300" : buttonCs+"bg-red-400"}
                        onClick={onEditClick}
                        disabled={selected === null ? true : false}>
                  {editing ? "X" : "Edit"}
                </button>}
              {!adding && !editing &&
                <button className={buttonCs + "bg-red-400"}
                        onClick={onRemoveClick}
                        disabled={selected === null ? true : false}>
                  {deleting ? "X" : "Remove"}
                </button>}
            </div>
            <div className="bg-blue-200 h-1 w-full rounded-full mt-1 mb-3" />

            {!adding && !deleting && !editing &&
              <div className="h-96 2xl:h-full">
                <BlendList />
              </div>
            }

            {adding && <BlendAdd toggleAdd={onAddClick} /> }
            {editing && <BlendEdit toggleEdit={onEditClick} />}
            {deleting && <BlendDelete toggleDelete={onRemoveClick} /> }

          </div>
          <BlendSpec />
        </div>
      </div>
    </div>
  )
}

export default BlendSummary;
