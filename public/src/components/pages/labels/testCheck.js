import { GrCheckbox } from 'react-icons/gr';

const TestCheck = ({ label }) => {
  return (
    <div className="flex flex-row items-center mr-2 text-sm">
      <GrCheckbox className="text-sm"/>
      <p className="ml-1 text-xs">{label}</p>
    </div>
  )
}

export default TestCheck;
