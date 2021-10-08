const LabBasicSpec = ({lab}) => {
  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200">Basics</h2>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className="grid grid-cols-3 gap-x-2 p-2">
        <p className="text-right">Lab Name:</p>
        <p className="capitalize col-span-2">{lab && lab.name}</p>
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
  )
}

export default LabBasicSpec;
