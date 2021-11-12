import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLots,
  toggleAdding, toggleDeleting, toggleEditing,
  toggleRaws, toggleBlends, toggleBulks, toggleFgs, toggleOthers,
  toggleMT, toggleNV, toggleCT, incrementYear, decrementYear
} from '../../../actions/lotActions';
import { getRaws } from '../../../actions/rawActions';
import { getFgs } from '../../../actions/fgActions';
import { getBulks } from '../../../actions/bulkActions';
import { getBlends } from '../../../actions/blendActions';
import { getVendors } from '../../../actions/vendorActions.js';
import { getManufacturers } from '../../../actions/manufacturerActions.js';
import { getLabs } from '../../../actions/labActions.js';
import { loadUser } from '../../../actions/authActions.js';
import { Redirect } from 'react-router-dom';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
// Import Components
import LotList from './lotList';
import LotInfo from './lotInfo';
import LotAdd from './lotAdd';
import LotEdit from './lotEdit';
import LotDelete from './lotDelete';
import Button from '../../button.js'
import Message from '../../message.js';
import Checkbox from '../../inputs/checkbox.js';

const LotSummary = () => {
  const user       = useSelector(state => state.auth);
  const selected   = useSelector(state => state.lot.selectedLot);
  const year       = useSelector(state => state.lot.currentYear);
  const rawLots    = useSelector(state => state.lot.rawLots);
  const blendLots  = useSelector(state => state.lot.blendLots);
  const bulkLots   = useSelector(state => state.lot.bulkLots);
  const fgLots     = useSelector(state => state.lot.fgLots);
  const otherLots  = useSelector(state => state.lot.otherLots);
  const adding     = useSelector(state => state.lot.adding);
  const deleting   = useSelector(state => state.lot.deleting);
  const editing    = useSelector(state => state.lot.editing);
  const showRaws   = useSelector(state => state.lot.showRaws);
  const showBlends = useSelector(state => state.lot.showBlends);
  const showBulks  = useSelector(state => state.lot.showBulks);
  const showFgs    = useSelector(state => state.lot.showFgs);
  const showOthers = useSelector(state => state.lot.showOthers);
  const showMT     = useSelector(state => state.lot.showMT);
  const showNV     = useSelector(state => state.lot.showNV);
  const showCT     = useSelector(state => state.lot.showCT);

  // Compose the total list of lots to display
  const locFilteredLots = (lots) => {
    const timeFiltered = lots.filter(lot => {
      const lotYear = new Date(lot.date_created).getFullYear();
      return lotYear === year;
    })
    return timeFiltered.filter(lot => {
      let locs = [];
      showMT && locs.push('MT');
      showNV && locs.push('NV');
      showCT && locs.push('CT');
      return (locs.indexOf(lot.receiving.facility) !== -1);
    })
  }
  const lotArray = () => {
    let filteredLots = [];
    showRaws && filteredLots.push(...locFilteredLots(rawLots));
    showBlends && filteredLots.push(...locFilteredLots(blendLots));
    showBulks && filteredLots.push(...locFilteredLots(bulkLots));
    showFgs && filteredLots.push(...locFilteredLots(fgLots));
    showOthers && filteredLots.push(...locFilteredLots(otherLots));
    return filteredLots.sort((a, b) => { return Date(b.date_created) - Date(a.date_created) })
  }

  // Load the items when the component loads
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getFgs());
    dispatch(getLabs());
    dispatch(getLots());
    dispatch(getRaws());
    dispatch(getBulks());
    dispatch(getBlends());
    dispatch(getVendors());
    dispatch(getManufacturers());
    return () => { cleanup() };
  }, []);
  const cleanup = () => { setTimeout(() => { return }, 5000); }

  // TODO: Add a toggle for departments

  // Handle button/input clicks
  const onAddClick = () => { dispatch(toggleAdding()); };
  const onRemoveClick = () => { dispatch(toggleDeleting()); };
  const onEditClick = () => { dispatch(toggleEditing()); };
  const onIncClick = () => { dispatch(incrementYear()); };
  const onDecClick = () => { dispatch(decrementYear()); };
  const onToggle = toggleTarget => {
    switch(toggleTarget) {
      case 'raws': return dispatch(toggleRaws())
      case 'blends': return dispatch(toggleBlends())
      case 'bulks': return dispatch(toggleBulks());
      case 'fgs': return dispatch(toggleFgs());
      case 'others': return dispatch(toggleOthers());
      case 'MT': return dispatch(toggleMT());
      case 'NV': return dispatch(toggleNV());
      case 'CT': return dispatch(toggleCT());
    }
  }

  if (!user.token) return (<Redirect to='/login' />)
  else if (!user.isAuthenticated) return (<Message info="Authenticating..." extraClasses="w-1/2 self-center mx-auto" />)
  else return (
    <div className={"h-full p-4 w-full rounded border-l border-gray-800 " +
                    "bg-gradient-to-br from-gray-800 via-transparent to-gray-800"}>
      <div className="flex flex-col h-full mb-4 2xl:mb-0">
        <h1 className="mb-4 ml-2 text-xl font-bold text-blue-200"> Sample Log </h1>
        <div className="grid grid-cols-5 h-full">
          <div className={"2xl:mb-0 sm:mr-4 flex flex-col " +
                          "col-span-5 2xl:col-span-1 rounded bg-gradient-to-b " +
                          "from-gray-600 to-transparent "}>
            <div className="pr-4 pl-2 py-2 flex flex-col 2xl:flex-row bg-gray-700 rounded-t">
              {!adding && !deleting && !editing &&
                <div id="yearSelector" className="flex flex-row text-blue-100">
                  <button className="text-2xl" onClick={onDecClick} ><BiChevronLeft/></button>
                  <p className="font-semibold">{year}</p>
                  <button className="text-2xl" onClick={onIncClick} ><BiChevronRight/></button>
                </div>
              }
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

            <div className="bg-gray-500 h-px w-full rounded-full" />

            {!adding && !deleting && !editing &&
              <div className="px-4 py-2 flex flex-col 2xl:flex-row justify-center bg-gray-800 border-b border-gray-500 mb-3">
                <div className="w-full">
                  {/* A set of checkboxes to show/hide the different types of lots */}
                  <div className="bg-gray-600 rounded grid grid-cols-3 gap-2 p-2 mb-2">
                    <Checkbox label="Raws" name="showRaws" value={showRaws}
                      onClick={() => onToggle('raws')} defaultChecked={showRaws} />
                    <Checkbox label="Blends" name="showBlends" value={showBlends}
                      onClick={() => onToggle('blends')} defaultChecked={showBlends} />
                    <Checkbox label="Bulks" name="showBulks" value={showBulks}
                      onClick={() => onToggle('bulks')} defaultChecked={showBulks} />
                    <Checkbox label="FGs" name="showFgs" value={showFgs}
                      onClick={() => onToggle('fgs')} defaultChecked={showFgs} />
                    <Checkbox label="Other" name="showOthers" value={showOthers}
                      onClick={() => onToggle('others')} defaultChecked={showOthers} />
                  </div>
                  {/* A set of checkboxes to show/hide the lots by facility */}
                  <div className="bg-gray-600 rounded grid grid-cols-3 gap-2 p-2">
                    <Checkbox label="MT" name="showMT" value={showMT}
                      onClick={() => onToggle('MT')} defaultChecked={showMT} />
                    <Checkbox label="NV" name="showNV" value={showNV}
                      onClick={() => onToggle('NV')} defaultChecked={showNV} />
                    <Checkbox label="CT" name="showCT" value={showCT}
                      onClick={() => onToggle('CT')} defaultChecked={showCT} />
                  </div>
                </div>
              </div>
            }

            {!adding && !deleting && !editing &&
              <div className="h-96 2xl:h-full mx-4 my-2">
                <LotList lots={lotArray()} />
              </div>
            }

            {adding && <LotAdd toggleAdd={onAddClick} /> }
            {editing && <LotEdit toggleEdit={onEditClick} />}
            {deleting && <LotDelete toggleDelete={onRemoveClick} /> }
          </div>
          <LotInfo />
        </div>
      </div>
    </div>
  )
}

export default LotSummary;
