const Divider = ({ direction="r", color="blue"}) => {
  return (
    <div className={
      `mb-2 h-px w-full bg-gradient-to-${direction} from-${color}-300 to-transparent`
    } />
  )
}

export default Divider;
