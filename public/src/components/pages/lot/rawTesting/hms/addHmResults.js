// Import basics
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import server actions
import { editRawSample } from '../../../../../actions/testingActions';
// Import components
import Button from '../../../../button.js';
import Selection from '../../../../inputs/selection.js';
import Entry from '../../../../inputs/entry.js';

const AddHmResults = ({ lotId, sample, spec, takeResults }) => {
  // Get labs from global state
  const labs = useSelector(state => state.lab.labs);

  // Declare internal state variables
  const [current, setCurrent] = useState({
    lab:     sample && sample.lab ? sample.lab._id : (labs.length > 0 ? labs[0]._id : null),
    number:  sample && sample.number,
    amount:  sample && sample.amount,
    units:   sample && sample.units,
    results: {
      arsenic: (sample && sample.results) ? sample.results.arsenic : "",
      cadmium: (sample && sample.results) ? sample.results.cadmium : "",
      lead:    (sample && sample.results) ? sample.results.lead    : "",
      mercury: (sample && sample.results) ? sample.results.mercury : "",
      nickel:  (sample && sample.results) ? sample.results.nickel  : "",
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
      <Entry type="number" label="Arsenic:" name="arsenic" value={current.results.arsenic}
        onChange={e => setCurrent({...current, results: { ...current.results, arsenic: e.target.value }})}
        append={spec.hm_units} />
      <Entry type="number" label="Cadmium:" name="cadmium" value={current.results.cadmium}
        onChange={e => setCurrent({...current, results: { ...current.results, cadmium: e.target.value }})}
        append={spec.hm_units} />
      <Entry type="number" label="Lead:" name="lead" value={current.results.lead}
        onChange={e => setCurrent({...current, results: { ...current.results, lead: e.target.value }})}
        append={spec.hm_units} />
      <Entry type="number" label="Mercury:" name="mercury" value={current.results.mercury}
        onChange={e => setCurrent({...current, results: { ...current.results, mercury: e.target.value }})}
        append={spec.hm_units} />
      {spec.nickel_tested &&
        <Entry type="number" label="Nickel:" name="nickel" value={current.results.nickel}
          onChange={e => setCurrent({...current, results: { ...current.results, nickel: e.target.value }})}
          append={spec.hm_units} />
      }
      <Button color="bg-green-300"
        type="submit"
        text="Submit Testing"
        title="Submit Testing"
        extraClasses="w-1/3 h-8 mx-auto" />

    </form>
  )
}

export default AddHmResults;
