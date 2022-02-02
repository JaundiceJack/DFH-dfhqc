import { useState } from 'react';
import Detail from '../../misc/detail.js'
import { GrCheckbox } from 'react-icons/gr';
import TestCheck from './testCheck.js';


const Label = ({ lot, item }) => {
  const [show, setShow] = useState(true);

  return (
    <div className={`h-48 grid grid-cols-2 items-center rounded-lg p-2 bg-white ${show && "border border-gray-200"}`} onClick={() => setShow(!show)} >
      <div className="flex flex-col text-md">
        <Detail label="Name:"   data={item && item.name}   color={show ? "text-black" : "text-white"} disableSelect={true} />
        <Detail label="Item:" data={item && item.number} color={show ? "text-black" : "text-white"} disableSelect={true} />
        <Detail label="Lot:"  data={lot}                 color={show ? "text-black" : "text-white"} disableSelect={true} />
      </div>

      <div className={"grid grid-cols-1 gap-y-1 " + (show ? "" : "hidden")}>
        <div className="grid grid-cols-2">
          <TestCheck label="Micros" />
          <TestCheck label="HM" />
        </div>
        <div className="grid grid-cols-2">
          <TestCheck label="Identity" />
          <TestCheck label="Assay" />
        </div>
        <div className="grid grid-cols-2">
          <TestCheck label="Pesticides" />
          <TestCheck label="FT-IR" />
        </div>
        <div className="flex flex-row items-center text-sm">
          <TestCheck label="Other:_______________" />
        </div>
      </div>


      {/* TODO: check the item specs and generate a row of checkboxes for each of it's tests */}
    </div>
  )
}

export default Label;
