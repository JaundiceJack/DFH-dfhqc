// Import basics
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// Import server actions
import { takeRawSample } from '../../../../../actions/lotActions';
// Import components
import Button from '../../../../button.js';

const AddHmSample = ({ lotId, close }) => {
  // Declare internal state variables
  const [sample, setSample] = useState({
    sample_date: new Date().toISOString().split('T')[0],
    amount: 30,
    units: "g"
  })

  // Dispatch a change to the sampled state of the raw category
  const dispatch = useDispatch();
  const takeSample = (e) => {
    e.preventDefault();
    dispatch(takeRawSample(lotId, 'hm', sample));
    close();
  }

  return (
    <form className="flex flex-col" onSubmit={takeSample}>
      <p className="text-center mb-2">Sampling...</p>
      <div className="grid grid-cols-3 gap-x-2 my-2">
        <p className="text-right">Date:</p>
        <input type="date"
          name="sample_date"
          value={sample.sample_date}
          onChange={e => setSample({...sample, sample_date: e.target.value})}
          className="rounded text-black px-1" />
      </div>
      <div className="grid grid-cols-6 gap-x-2 my-2">
        <p className="text-right col-span-2">Amount:</p>
        <input type="number"
          name="amount"
          value={sample.amount}
          onChange={e => setSample({...sample, amount: e.target.value})}
          className="rounded text-black px-1 col-span-1 w-full" />
        <select
          name="units"
          value={sample.units}
          onChange={(e) => setSample({...sample, units: e.target.value})}
          className="rounded text-black px-1">
          <option value="g">g</option>
          <option value="ths">ths</option>
          <option value="mL">mL</option>
        </select>
      </div>
      <div className="grid grid-cols-6 my-2">
        <Button color="bg-green-300"
          type="submit"
          text="Submit Sample"
          title="Submit Sample"
          extraClasses="col-start-2 col-span-4" />
      </div>
    </form>
  )
}

export default AddHmSample;
