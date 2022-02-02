const Detail = ({ label, data, capLabel=true, capData=true, extraClasses="", color="text-blue-100", disableSelect=false }) => {
  return (
    <div className={"grid grid-cols-2 sm:grid-cols-3 " + extraClasses}>
      <p className={"text-right mr-2 font-semibold " + color + " " + (capLabel ? "capitalize" : "") + " " + (disableSelect ? "select-none" : "")}>
        {label}
      </p>
      <p className={"sm:col-span-2 self-end " + color + " " + (capData ? "capitalize" : "") + " " + (disableSelect ? "select-none" : "")}>
        {data || ""}
      </p>
    </div>
  )
}

export default Detail;
