import { useSelector } from 'react-redux';

const LabSpec = () => {
  // Get the current selection from the redux state
  const selectedLab = useSelector( state => state.lab.selectedLab );

  return (
    <div className="sm:mr-4 col-span-5 2xl:col-span-4 rounded bg-gradient-to-br from-gray-600 via-transparent to-gray-600">
      <div className="flex flex-row mb-3 py-2 px-4 bg-gradient-to-r from-gray-700 to-gray-900 rounded-t rounded-br border-b border-gray-500">
        <h2 className="text-center font-semibold text-blue-100 text-xl">Lab Info</h2>
      </div>

      <div className="flex flex-col py-2 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-700 rounded-lg ">
          <div className="bg-gray-600 rounded text-blue-100 font-semibold">
            <h2 className="text-lg text-left px-2 py-1 text-blue-200">Basics</h2>
            <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
            <div className="grid grid-cols-3 gap-x-2 p-2">
              <p className="text-right">Lab Name:</p>
              <p className="capitalize col-span-2">{selectedLab && selectedLab.name}</p>
              <p className="text-right">Shipping Address:</p>
              <p className="capitalize col-span-2">...</p>
              <p className="text-right">Billing Address:</p>
              <p className="capitalize col-span-2">...</p>
              <p className="text-right">Standard TAT:</p>
              <p className="capitalize col-span-2">10 Days</p>
              <p className="text-right">Rush TAT:</p>
              <p className="capitalize col-span-2">5 Days (+ 50% of price)</p>
              <p className="text-right">Emergency TAT:</p>
              <p className="capitalize col-span-2">3 Days (+ 100% of price)</p>
            </div>
          </div>

          <div className="bg-gray-600 rounded text-blue-100 font-semibold">
            <h2 className="text-lg text-left px-2 py-1 text-blue-200">Available Assays</h2>
            <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
            <div className="grid grid-cols-4 gap-x-2 p-2">
              <p className="text-right">Curcumin:</p>
              <p className="capitalize col-span-1 text-center">$20.00</p>
              <p className="col-span-2">by HPLC</p>
              <p className="text-right">L-Leucine:</p>
              <p className="capitalize col-span-1 text-center">$50.00</p>
              <p className="col-span-2">by HPLC</p>
              <p className="text-right">MSM:</p>
              <p className="capitalize col-span-1 text-center">$45.00</p>
              <p className="col-span-2">by UV-Vis</p>
            </div>
          </div>

          <div className="bg-gray-600 rounded text-blue-100 font-semibold">
            <h2 className="text-lg text-left px-2 py-1 text-blue-200">Contact Info</h2>
            <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
            <div className="grid grid-cols-3 gap-x-2 p-2">
              <p className="text-right">Emails:</p>
              <p className="capitalize col-span-2">...</p>
              <p className="text-right">Phone Numbers:</p>
              <p className="capitalize col-span-2">...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LabSpec;
