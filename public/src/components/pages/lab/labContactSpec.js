const LabContactSpec = ({lab}) => {
  return (
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
  )
}

export default LabContactSpec;
