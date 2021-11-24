const Detail = ({ label, data, capLabel=true, capData=true, extraClasses="" }) => {
  return (
    <div className={"grid grid-cols-2 sm:grid-cols-3 " + extraClasses}>
      <p className={"text-right mr-2 text-blue-100 font-semibold " + (capLabel ? "capitalize" : "")}>
        {label}
      </p>
      <p className={"sm:col-span-2 text-blue-100 self-end " + (capData ? "capitalize" : "")}>
        {data || ""}
      </p>
    </div>
  )
}

export default Detail;
