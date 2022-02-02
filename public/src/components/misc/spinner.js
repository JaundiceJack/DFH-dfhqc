import { CgSpinnerTwo } from 'react-icons/cg'

const Spinner = () => {
  return (
    <div className="w-full h-full flex items-center justify-center" >
      <CgSpinnerTwo className="animate-spin text-gray-400" />
    </div>
  )
}

export default Spinner;
