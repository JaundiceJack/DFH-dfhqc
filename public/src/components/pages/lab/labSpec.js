import { useSelector } from 'react-redux';
import LabAssaySpec   from './capabilities/labAssaySpec.js';
import LabBasicSpec   from './info/labBasicSpec.js';
import LabContactSpec from './info/labContactSpec.js';
import LabAddressSpec from './info/labAddressSpec.js';


const LabSpec = () => {
  // Get the current selection from the redux state
  const selectedLab = useSelector( state => state.lab.selectedLab );

  return (
    <div className={
      "sm:mr-4 col-span-5 2xl:col-span-4 rounded bg-gradient-to-br " +
      "from-gray-600 via-transparent to-gray-600"}>
      <div className={
        "flex flex-row mb-3 py-2 px-4 bg-gradient-to-r from-gray-700 " +
        "to-gray-900 rounded-t rounded-br border-b border-gray-500"}>
        <h2 className="text-center font-semibold text-blue-100 text-xl">
          Lab Info
        </h2>
      </div>
      <div className="flex flex-col py-2 px-4">
        <div className={
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 " +
          "bg-gray-700 rounded-lg "}>
          <LabBasicSpec />
          <LabAddressSpec />
          <LabContactSpec />
          <LabAssaySpec />
        </div>
      </div>
    </div>
  )
}

export default LabSpec;
