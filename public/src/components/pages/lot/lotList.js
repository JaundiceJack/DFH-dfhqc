import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { selectLot } from '../../../actions/lotActions';
import { getTests } from '../../../actions/testingActions';
import { getRaw } from '../../../actions/rawActions';

const LotList = ({ lots }) => {
  // Get the items from the server upon loading
  const selectedId = useSelector(state => state.lot.selectedLot._id);

  // Compose row classes
  const dispatch = useDispatch();
  const rowC = "opacity-75 font-semibold text-blue-100 py-1 px-2 " +
               "hover:opacity-100 truncate grid grid-cols-12 gap-x-6 " +
               "cursor-pointer select-none capitalize ";
  const oddRow  = rowC + " bg-gray-600 ";
  const evenRow = rowC + " bg-gray-800 ";
  const selRow  = rowC + " bg-green-600 ";

  // Convert the date to mm/dd format
  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    return `${date.getMonth()+1}/${date.getDate()}`;
  }
  // Capitalize the first word of each string
  const capitalize = (strang) => {
    if (strang.length > 0 && typeof strang === 'string') {
      const words = strang.split(' ');
      let final = [];
      words.forEach(word => { final.push(word[0].toUpperCase()+word.substring(1)) });
      return final.join(' ');
    } else return strang;
  }

  // Handle row actions
  const rowClick = (lot) => {
    dispatch(selectLot(lot));
    dispatch(getTests(lot._id));
    if (lot.type === 'raw') dispatch(getRaw(lot.raw._id));
    //else if (lot.type === 'blend') dispatch(getBlend(lot.blend._id));
    //else if (lot.type === 'bulk') dispatch(getBlend(lot.bulk._id));
    //else if (lot.type === 'fg') dispatch(getBlend(lot.fg._id));
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
      <div onClick={() => rowClick(lot)}
        title={lot && (
          lot.raw   ? `${lot.raw.number} - ${capitalize(lot.raw.name)}: ${lot.lot}` :
          lot.blend ? `${lot.blend.number} - ${capitalize(lot.blend.name)}: ${lot.lot}` :
          lot.bulk  ? `${lot.bulk.number} - ${capitalize(lot.bulk.name)}: ${lot.lot}` :
          lot.fg    && `${lot.fg.number} - ${capitalize(lot.fg.name)}: ${lot.lot}`
        )}
        className={ rowClasses(index, lot._id) }
        style={style}>
        <p className="col-span-2">{lot && formatDate(lot.date_created)}</p>
        <p className="col-span-3">{lot && lot.lot}</p>
        <p className="col-span-7">{lot && (
          lot.raw ? lot.raw.name :
          lot.blend ? lot.blend.name :
          lot.bulk ? lot.bulk.name :
          lot.fg && lot.fg.name
        )}</p>
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
