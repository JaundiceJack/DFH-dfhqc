import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { selectLot } from '../../../actions/lotActions';

const LotList = ({lots}) => {
  // Get the items from the server upon loading
  const selectedId = useSelector(state => state.lot.selectedLot._id);

  // Compose row classes
  const dispatch = useDispatch();
  const rowC = "opacity-75 font-semibold text-blue-100 py-1 px-2 hover:opacity-100 truncate grid grid-cols-12 gap-x-6 cursor-pointer select-none "
  const oddRow  = rowC + " bg-gray-600 capitalize";
  const evenRow = rowC + " bg-gray-800 capitalize";
  const selRow  = rowC + " bg-green-600 capitalize";

  // Handle row actions
  const rowClick = (lot) => {
    dispatch(selectLot(lot));
  }
  const rowClasses = (index, id) => {
    if (selectedId === id) return selRow;
    else {
      if (index % 2) return evenRow
      else return oddRow;
    }
  }

  // Create a format for displaying rows
  const Row = ({ index, style }) => {
    const lot = lots[index];
    return (
      <div onClick={() => rowClick(lot)} className={ rowClasses(index, lot._id) } style={style}>
        <p className="col-span-3">{lot.lot && lot.lot}</p>
        <p className="col-span-2">{lot.item ? lot.item.number : ""}</p>
        <p className="col-span-7">{lot.item ? lot.item.name : ""}</p>
      </div>
    )
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          className=""
          height={height}
          width={width}
          itemCount={lots.length}
          itemSize={35}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  )
}

export default LotList;
