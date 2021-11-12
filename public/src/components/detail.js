const Detail = ({ label, data }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4">
      <p className="text-right mr-2 text-blue-100 font-semibold">
        {label}
      </p>
      <p className="capitalize sm:col-span-3 text-blue-100 font-semibold">
        {data || ""}
      </p>
    </div>
  )
}

export default Detail;
