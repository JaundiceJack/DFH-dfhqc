const VendorBasicSpec = ({vendor}) => {
  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200">Basics</h2>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className="grid grid-cols-3 gap-x-2 p-2">
        <p className="text-right">Vendor Name:</p>
        <p className="capitalize col-span-2">{vendor && vendor.name}</p>
      </div>
    </div>
  )
}

export default VendorBasicSpec;
