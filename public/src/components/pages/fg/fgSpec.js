import { useSelector } from 'react-redux';
//import { getAssay } from '../../../actions/assayActions';

import SpecBasics from './specBasics';

const FgSpec = () => {
  // Get the current selection from the redux state
  const selectedFg = useSelector( state => state.fg.selectedFg );

  return (
    <div className="sm:mr-4 h-full col-span-5 2xl:col-span-4 rounded bg-gradient-to-br from-gray-600 via-transparent to-gray-600">
      <div className="flex flex-row py-2 px-4 bg-gradient-to-r from-gray-700 to-gray-900 rounded-t rounded-br border-b border-gray-500 mb-3">
        <h2 className="text-center font-semibold text-blue-100 text-xl">Specifications</h2>
      </div>

      <div className="flex flex-col px-4 py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-700 mb-4 rounded-lg">
          <SpecBasics name={selectedFg.name}
                      number={selectedFg.number} />
        </div>
      </div>
    </div>
  )
}

export default FgSpec;
