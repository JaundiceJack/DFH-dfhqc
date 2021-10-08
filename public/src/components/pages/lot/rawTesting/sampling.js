import Button from '../../../button.js';
import { IoClose } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { takeRawSample } from '../../../../actions/lotActions';
import { useState } from 'react';

const Sampling = ({id, type, onToggle}) => {
  const [sampleDate, setSampleDate] = useState(new Date().toISOString().split('T')[0]);
  // Dispatch a change to the sampled state of the raw category
  const dispatch = useDispatch();
  const takeSample = (e) => {
    e.preventDefault();
    dispatch(takeRawSample(id, type, sampleDate));
    onToggle(false);
  }

  return (
    <form className="grid grid-cols-3 gap-4" onSubmit={takeSample}>
      <p className="text-right">Date:</p>
      <input type="date"
        name="sampleDate"
        value={sampleDate}
        onChange={e => setSampleDate(e.target.value)}
        className="rounded text-black" />
      <Button color="bg-yellow-300"
        icon={<IoClose />}
        onClick={() => onToggle(false)}
        title="Cancel Sample"
        extraClasses="justify-self-end" />
      <Button color="bg-green-300"
        type="submit"
        text="Submit Sample"
        title="Submit Sample"
        extraClasses="col-span-3 justify-self-center" />
    </form>
  )
}

export default Sampling;
