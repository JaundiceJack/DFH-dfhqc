import { useSelector, useDispatch } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { selectRaw } from '../../../actions/rawActions';

const RawList = () => {
  // Get the items from the server upon loading
  const items = useSelector(state => state.raw.raws.sort((a, b) => b.number < a.number));
  const selectedId = useSelector(state => state.raw.selectedRaw._id);

  // Compose row classes
  const rowC = "opacity-75 font-semibold text-blue-100 py-1 px-2 hover:opacity-100 cursor-pointer select-none "
  const oddRow  = rowC + " bg-gray-600 capitalize";
  const evenRow = rowC + " bg-gray-800 capitalize";
  const selRow  = rowC + " bg-green-600 capitalize";

  // Handle row actions
  const dispatch = useDispatch();
  const rowClick = (raw) => { dispatch(selectRaw(raw)) }
  const rowClasses = (index, id) => {
    if (selectedId === id) return selRow;
    else {
      if (index % 2) return evenRow
      else return oddRow;
    }
  }

  // Create a format for displaying rows
  const Row = ({ index, style }) => {
    const item = items[index];
    return (
      <div onClick={() => rowClick(item)} className={ rowClasses(index, item._id) } style={style}>
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

export default RawList;
