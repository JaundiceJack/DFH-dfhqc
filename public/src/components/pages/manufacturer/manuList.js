import { useSelector, useDispatch } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { selectManufacturer } from '../../../actions/manufacturerActions';

const ManufacturerList = () => {
  // Get the items from the server upon loading
  const items = useSelector(state => state.manufacturer.manufacturers);
  const selectedId = useSelector(state => state.manufacturer.selectedManufacturer._id);

  // Compose row classes
  const rowC = "opacity-75 font-semibold text-blue-100 py-1 px-2 hover:opacity-100 cursor-pointer select-none "
  const oddRow  = rowC + " bg-gray-600 capitalize";
  const evenRow = rowC + " bg-gray-800 capitalize";
  const selRow  = rowC + " bg-green-600 capitalize";

  // Handle row actions
  const dispatch = useDispatch();
  const rowClick = (manufacturer) => { dispatch(selectManufacturer(manufacturer)) }
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
        {item.name}
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

export default ManufacturerList;
