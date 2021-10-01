import { useSelector, useDispatch } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { selectBlend } from '../../../actions/blendActions';

const BlendList = () => {
  // Get the items from the server upon loading
  const items = useSelector(state => state.blend.blends);
  const selectedId = useSelector(state => state.blend.selectedBlend._id);

  // Compose row classes
  const rowC = "opacity-75 font-semibold text-blue-100 py-1 px-2 hover:opacity-100 cursor-pointer select-none capitalize"
  const oddRow  = rowC + " bg-gray-600";
  const evenRow = rowC + " bg-gray-800";
  const selRow  = rowC + " bg-green-600";

  // Handle row actions
  const dispatch = useDispatch();
  const rowClick = (blend) => { dispatch(selectBlend(blend)) }
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
    const datum = `${item.number}: ${item.name}`
    return (
      <div key={index} onClick={() => rowClick(item)} className={ rowClasses(index, item._id) } style={style}>
        {datum}
      </div>
    )
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
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

export default BlendList;
