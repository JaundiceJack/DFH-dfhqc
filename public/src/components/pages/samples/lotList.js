import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { selectLot } from '../../../actions/lotActions';

const LotList = (onSelect) => {
  // Get the items from the server upon loading
  const items = useSelector(state => state.lot.lots);
  const selectedIndex = useSelector(state => state.lot.selectedIndex);

  // Compose row classes
  const dispatch = useDispatch();
  const rowC = "opacity-75 font-semibold text-blue-100 py-1 px-2 hover:opacity-100"
  const oddRow  = rowC + " bg-gray-600 capitalize";
  const evenRow = rowC + " bg-gray-800 capitalize";
  const selRow  = rowC + " bg-green-600 capitalize";

  // Handle row actions
  const rowClick = (index) => { dispatch(selectLot(index)) }
  const rowClasses = (index) => {
    if (selectedIndex === index) return selRow;
    else {
      if (index % 2) return evenRow
      else return oddRow;
    }
  }

  // Create a format for displaying rows
  const Row = ({ index, style }) => {
    const item = items[index];
    return (
      <div onClick={() => rowClick(index)} className={ rowClasses(index) } style={style}>
        {item.number}: {item.name}
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
          itemCount={items.length}
          itemSize={35}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  )
}

export default LotList;
