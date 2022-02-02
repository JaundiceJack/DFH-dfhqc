const Checkbox = ({
  label="",
  name,
  value,
  defaultChecked,
  onClick,
  disabled=false,
  extraClasses=""
}) => {
  return (
    <label className={"container " + extraClasses + (disabled ? " opacity-70" : "")}>
      <p className={"ml-2 text-blue-100 font-semibold w-min whitespace-nowrap"}>{label}</p>
      <input type="checkbox" value={value} name={name} disabled={disabled}
        defaultChecked={defaultChecked} onClick={onClick} />
      <span className="checkmark" />
    </label>
  )
}

export default Checkbox;
