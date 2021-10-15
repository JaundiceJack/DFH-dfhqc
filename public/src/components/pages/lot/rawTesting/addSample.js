import Button from '../../../button.js';
import { IoClose } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { takeRawSample } from '../../../../actions/lotActions';
import { useState } from 'react';

const AddSample = ({lotId, type, onToggle, testId=null}) => {
  const [sampleDate, setSampleDate] = useState(new Date().toISOString().split('T')[0]);
  // Dispatch a change to the sampled state of the raw category
  const dispatch = useDispatch();
  const takeSample = (e) => {
    e.preventDefault();
    dispatch(takeRawSample(lotId, type, sampleDate, test));
    onToggle(false);
  }

  const [sample, setSample] = useState({
    sample_date: new Date().toISOString().split('T')[0],
    amount: 30,
    units: "g"
  })

  return (
    <form className="grid grid-cols-3 gap-4" onSubmit={takeSample}>
      <p className="text-right">Date:</p>
      <input type="date"
        name="sampleDate"
        value={sampleDate}
        onChange={e => setSampleDate(e.target.value)}
        className="rounded text-black" />

      <Button color="bg-green-300"
        type="submit"
        text="Submit Sample"
        title="Submit Sample"
        extraClasses="col-span-3 justify-self-center" />
    </form>
  )
}

export default AddSample;
