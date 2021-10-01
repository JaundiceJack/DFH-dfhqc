const InfoRawTesting = ({lot}) => {
  return (
    <div className="bg-gray-600 rounded p-2 text-blue-100 font-semibold">
      <h2 className="text-lg text-left ml-2 underline">Testing</h2>
      <div className="grid grid-cols-3 ">
        <p className="text-right mr-2">Micros:</p>
        <p className="capitalize col-span-2"></p>

        <p className="text-right mr-2">Heavy Metals:</p>
        <p className="capitalize col-span-2"></p>
        <p className="text-right mr-2">Assays:</p>
        <p className="capitalize col-span-2"></p>
        <p className="text-right mr-2">Identity:</p>
        <p className="capitalize col-span-2"></p>
      </div>
    </div>
  )
}

export default InfoRawTesting;
