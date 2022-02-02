const CategoryHeader = ({ title, testing, keys=true }) => {
  return (
    <div>
      <div className="h-px w-full bg-black" />
      <div className="w-full bg-gradient-to-b from-gray-300 to-gray-200 flex flex-col px-2 pb-2 pt-1">
        <p className="col-span-5 text-black font-bold">{title}</p>
        {keys && <div className="grid grid-cols-5">
          <p className="text-black font-semibold">{testing}</p>
          <p className="text-black font-semibold">Specification</p>
          <p className="text-black font-semibold">Result</p>
          <p className="text-black font-semibold">Method</p>
          <p className="text-black font-semibold">Notes</p>
        </div>}
      </div>
    </div>
  )
}

export default CategoryHeader;
