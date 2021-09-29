import { useSelector } from 'react-redux';
//import { getAssay } from '../../../actions/assayActions';

import SpecBasics from '../fgSpec/specBasics';

const FgSpec = (onSelect) => {
  // Get the current selection from the redux state
  const selectedFg = useSelector( state => state.fg.selectedFg );

  return (
    <div className="p-4 sm:mr-4 h-full col-span-5 2xl:col-span-4 rounded bg-gradient-to-br from-gray-600 via-transparent to-gray-600">
      <div className="flex flex-row">
        <h2 className="text-center font-bold text-blue-200 text-xl">Specifications</h2>
      </div>
      <div className="bg-blue-200 h-1 w-full rounded-full mt-1 mb-3" />
      <div className="flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-700 mb-4 rounded-lg">
          <SpecBasics name={selectedFg.name}
                      number={selectedFg.number} />
        </div>
      </div>
    </div>
  )
}

export default FgSpec;
