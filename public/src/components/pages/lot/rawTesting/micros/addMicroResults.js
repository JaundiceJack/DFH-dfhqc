// Import basics
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import server actions
import { editRawSample } from '../../../../../actions/testingActions';
// Import components
import Button from '../../../../button.js';
import Selection from '../../../../inputs/selection.js';
import Entry from '../../../../inputs/entry.js';

const AddMicroResults = ({ lotId, sample, spec, takeResults }) => {
  // Get labs from global state
  const labs = useSelector(state => state.lab.labs);

  // Declare internal state variables
  const [current, setCurrent] = useState({
    lab:     sample && sample.lab ? sample.lab._id : (labs.length > 0 ? labs[0]._id : null),
    number:  sample && sample.number,
    amount:  sample && sample.amount,
    units:   sample && sample.units,
    results: {
      tpc:        (sample && sample.results) ? sample.results.tpc       : "",
      ym:         sample && sample.results && sample.results.ym         || "",
      entero:     sample && sample.results && sample.results.entero     || "",
      salmonella: sample && sample.results && sample.results.salmonella || "",
      ecoli:      sample && sample.results && sample.results.ecoli      || "",
      staph:      sample && sample.results && sample.results.staph      || "",
      paeru:      sample && sample.results && sample.results.paeru      || "",
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
      <Entry type="number" label="TPC:" name="tpc" value={current.results.tpc}
        onChange={e => setCurrent({...current, results: { ...current.results, tpc: e.target.value }})}
        append={spec.tpc_units} />
      <Entry type="number" label="Y&M:" name="ym" value={current.results.ym}
        onChange={e => setCurrent({...current, results: { ...current.results, ym: e.target.value }})}
        append={spec.ym_units} />
      <Entry type="number" label="Enterobacteria:" name="entero" value={current.results.entero}
        onChange={e => setCurrent({...current, results: { ...current.results, entero: e.target.value }})}
        append={spec.entero_units} />
      <Selection label="Salmonella:" name="salmonella" value={current.results.salmonella}
        onChange={e => setCurrent({...current, results: { ...current.results, salmonella: e.target.value }})}
        options={[
          { name: "", value: null },
          { name: "Negative", value: "Negative" },
          { name: "Positive", value: "Positive" },
          { name: "Not Tested", value: "Not Tested" },
        ]} append=" " />
      <Selection label="E. Coli:" name="ecoli" value={current.results.ecoli}
        onChange={e => setCurrent({...current, results: { ...current.results, ecoli: e.target.value }})}
        options={[
          { name: "", value: null },
          { name: "Negative", value: "Negative" },
          { name: "Positive", value: "Positive" },
          { name: "Not Tested", value: "Not Tested" },
        ]} append=" " />
      <Selection label="Staph:" name="staph" value={current.results.staph}
        onChange={e => setCurrent({...current, results: { ...current.results, staph: e.target.value }})}
        options={[
          { name: "", value: null },
          { name: "Negative", value: "Negative" },
          { name: "Positive", value: "Positive" },
          { name: "Not Tested", value: "Not Tested" },
        ]} append=" " extraClasses="mb-2" />
      {spec.paeru_tested &&
        <Selection label="P. Aeru:" name="paeru" value={current.results.paeru}
          onChange={e => setCurrent({...current, results: { ...current.results, paeru: e.target.value }})}
          options={[
            { name: "", value: null },
            { name: "Negative", value: "Negative" },
            { name: "Positive", value: "Positive" },
            { name: "Not Tested", value: "Not Tested" },
          ]} append=" " extraClasses="mb-2" />
      }
      <Button color="bg-green-300"
        type="submit"
        text="Submit Testing"
        title="Submit Testing"
        extraClasses="w-1/3 h-8 mx-auto" />

    </form>
  )
}

export default AddMicroResults;
