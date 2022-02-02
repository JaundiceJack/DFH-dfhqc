// Import basics
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import server actions
import { editRawSample } from '../../../../../actions/testingActions';
// Import components
import Button from '../../../../inputs/button.js';
import Selection from '../../../../inputs/selection.js';
import Entry from '../../../../inputs/entry.js';

const AddIdentityResults = ({ lotId, sample, spec, takeResults, close }) => {
  // Get labs from global state
  const labs = useSelector(state => state.lab.labs);

  // Declare internal state variables
  const [current, setCurrent] = useState({
    lab:     sample && sample.lab ? sample.lab._id : (labs.length > 0 ? labs[0]._id : null),
    number:  sample && sample.number,
    amount:  sample && sample.amount,
    units:   sample && sample.units,
    results: {
      [spec.identity.name]: (sample && sample.results && sample.results[spec.identity.name]) ? sample.results[spec.identity.name] : "",
    },
    date_sampled: sample && sample.date_sampled ?
      new Date(sample.date_sampled).toISOString().split('T')[0] :
      new Date().toISOString().split('T')[0],
    date_sent: sample && sample.date_sent ?
      new Date(sample.date_sent).toISOString().split('T')[0] :
      new Date().toISOString().split('T')[0],
    date_of_result: sample && sample.date_of_result ?
      new Date(sample.date_of_result).toISOString().split('T')[0] :
      null,
  });

  return (
    <form className="flex flex-col px-2 pb-4" onSubmit={e => takeResults(e, current)}>
      <p className="text-center mb-2">Testing...</p>
      <Selection label="Testing Lab:" name="lab" value={current.lab}
        onChange={e => setCurrent({...current, lab: e.target.value})}
        options={labs.map(lab => { return { name: lab.name, value: lab._id }})}
        append={
          <Entry type="date" name="date_sent" value={current.date_sent}
            onChange={e => setCurrent({...current, date_sent: e.target.value})}
            extraClasses="ml-2 " /> } />
      <Selection label="Pass/Fail:" name={spec.identity.name} value={current.results[spec.identity.name]}
        onChange={e => setCurrent({...current, results: { ...current.results, [spec.identity.name]: e.target.value }})}
        options={[
          { name: "", value: null },
          { name: "Conforms", value: "Positive" },
          { name: "Non-conforming", value: "Negative" }
        ]}
        append=" " />
      <div className="flex flex-row justify-center mt-2">
        <Button type="submit" color="bg-green-300"
          text="Submit Testing" title="Submit Testing"
          extraClasses="w-48 h-7" />
        <Button onClick={close} color="bg-red-200"
          text="Cancel" title="Cancel Testing"
          extraClasses="w-16 h-7" />
      </div>

    </form>
  )
}

export default AddIdentityResults;
