// Import basics
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// Import server actions
import { takeRawSample } from '../../../../../actions/testingActions';
// Import components
import Button from '../../../../inputs/button.js';
import Entry from '../../../../inputs/entry.js';
import Selection from '../../../../inputs/selection.js';

const AddSample = ({ lotId, takeSample, close, testName="" }) => {
  // Declare internal state variables
  const [sample, setSample] = useState({
    lab: null,
    number: null,
    amount: 30,
    units:  'g',
    results: {},
    date_sampled: new Date().toISOString().split('T')[0],
    date_sent:      null,
    date_of_result: null
  });

  return (
    <form className="flex flex-col" onSubmit={e => takeSample(e, sample)}>
      <p className="text-center mb-2">{`Sampling${testName ? (" " + testName) : ""}...`}</p>
      <div className="flex flex-col w-1/2 mb-4 mx-auto">
        <Entry type="date" label="Date:" name="date_sampled" value={sample.date_sampled}
          onChange={e => setSample({...sample, date_sampled: e.target.value})} />
        <Entry type="number" label="Amount:" name="amount" value={sample.amount}
          onChange={e => setSample({...sample, amount: e.target.value})}
          extraClasses="mb-2"
          append={
            <Selection name="units" value={sample.units} extraClasses="ml-2"
              onChange={(e) => setSample({...sample, units: e.target.value})}
              cap={false} options={[
                {name: "g", value: "g"},
                {name: "ths", value: "ths"},
                {name: "mL", value: "mL"}
              ]} />
          } />
        <div className="flex flex-row justify-between">
          <Button type="submit" color="bg-green-300"
            text="Submit Sample" title="Submit Sample"
            extraClasses="w-48 h-7" />
          <Button onClick={close} color="bg-red-200"
            text="Cancel" title="Cancel Sampling"
            extraClasses="w-16 h-7" />
        </div>
      </div>
    </form>
  )
}

export default AddSample;
