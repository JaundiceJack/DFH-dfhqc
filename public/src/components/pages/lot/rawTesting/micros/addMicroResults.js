// Import basics
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import server actions
import { editRawSample } from '../../../../../actions/lotActions';
// Import components
import Button from '../../../../button.js';

const AddMicroResults = ({ lotId, test, spec, close}) => {
  // Get labs from global state
  const labs = useSelector(state => state.lab.labs);

  // Declare internal state variables (include sample number to locate sample)
  const [sample, setSample] = useState({
    sample_number: test.sample_number,
    sent_to: test.sent_to !== null ? test.sent_to._id : (labs.length > 0 ? labs[0]._id : null),
    sent_date: test.sent_date ?
      new Date(test.sent_date).toISOString().split('T')[0] :
      new Date().toISOString().split('T')[0],
    tpc:    test.tpc    !== null ? test.tpc    : "",
    ym:     test.ym     !== null ? test.ym     : "",
    entero: test.entero !== null ? test.entero : "",
    salmonella: test.salmonella || "",
    ecoli:      test.ecoli      || "",
    staph:      test.staph      || "",
    paeru:      test.paeru      || "",
  });

  // Dispatch the edits to the sample
  const dispatch = useDispatch();
  const enterResults = (e) => {
    e.preventDefault();
    dispatch(editRawSample(lotId, 'micro', sample));
    close();
  }

  return (
    <form className="flex flex-col" onSubmit={enterResults}>
      <p className="text-center mb-2">Testing...</p>
      <div className="grid grid-cols-3 gap-x-2 my-2">
        <p className="text-right">Testing Lab:</p>
        <select name="sent_to"
          value={sample.sent_to}
          onChange={e => setSample({...sample, sent_to: e.target.value})}
          className="rounded text-black px-1 capitalize" >
          {labs.map((lab, index) =>
            <option key={index} value={lab._id}>{lab.name}</option>) }
        </select>
        <input type="date"
          name="sent_date"
          value={sample.sent_date}
          onChange={e => setSample({...sample, sent_date: e.target.value})}
          className="rounded text-black px-1" />
      </div>
      <div className="grid grid-cols-6 gap-x-2 my-2">
        <p className="text-right col-span-2">TPC:</p>
        <input type="number"
          name="tpc"
          value={sample.tpc}
          onChange={e => setSample({...sample, tpc: e.target.value})}
          className="rounded text-black px-1 col-span-2 w-full" />
        <p className="text-blue-100 font-semibold">{spec.tpc_units}</p>
      </div>
      <div className="grid grid-cols-6 gap-x-2 my-2">
        <p className="text-right col-span-2">Y&M:</p>
        <input type="number"
          name="ym"
          value={sample.ym}
          onChange={e => setSample({...sample, ym: e.target.value})}
          className="rounded text-black px-1 col-span-2 w-full" />
        <p className="text-blue-100 font-semibold">{spec.ym_units}</p>
      </div>
      <div className="grid grid-cols-6 gap-x-2 my-2">
        <p className="text-right col-span-2">Enterobacteria:</p>
        <input type="number"
          name="entero"
          value={sample.entero}
          onChange={e => setSample({...sample, entero: e.target.value})}
          className="rounded text-black px-1 col-span-2 w-full" />
        <p className="text-blue-100 font-semibold">{spec.entero_units}</p>
      </div>
      <div className="grid grid-cols-6 gap-x-2 my-2">
        <p className="text-right col-span-2">Salmonella:</p>
        <select
          name="salmonella"
          value={sample.salmonella}
          onChange={e => setSample({...sample, salmonella: e.target.value})}
          className="rounded text-black px-1 col-span-2" >
          <option value={null}></option>
          <option value="Negative">Negative</option>
          <option value="Positive">Positive</option>
          <option value="Not Tested">Not Tested</option>
        </select>
      </div>
      <div className="grid grid-cols-6 gap-x-2 my-2">
        <p className="text-right col-span-2">E. Coli:</p>
        <select
          name="ecoli"
          value={sample.ecoli}
          onChange={e => setSample({...sample, ecoli: e.target.value})}
          className="rounded text-black px-1 col-span-2" >
          <option value={null}></option>
          <option value="Negative">Negative</option>
          <option value="Positive">Positive</option>
          <option value="Not Tested">Not Tested</option>
        </select>
      </div>
      <div className="grid grid-cols-6 gap-x-2 my-2">
        <p className="text-right col-span-2">Staph:</p>
        <select
          name="staph"
          value={sample.staph}
          onChange={e => setSample({...sample, staph: e.target.value})}
          className="rounded text-black px-1 col-span-2" >
          <option value={null}></option>
          <option value="Negative">Negative</option>
          <option value="Positive">Positive</option>
          <option value="Not Tested">Not Tested</option>
        </select>
      </div>
      {spec.paeru_tested &&
        <div className="grid grid-cols-6 gap-x-2 my-2">
          <p className="text-right col-span-2">P. Aeru:</p>
          <select
            name="paeru"
            value={sample.paeru}
            onChange={e => setSample({...sample, paeru: e.target.value})}
            className="rounded text-black px-1 col-span-2" >
            <option value={null}></option>
            <option value="Negative">Negative</option>
            <option value="Positive">Positive</option>
            <option value="Not Tested">Not Tested</option>
          </select>
        </div>
      }
      <div className="grid grid-cols-6 my-2">
        <Button color="bg-green-300"
          type="submit"
          text="Submit Testing"
          title="Submit Testing"
          extraClasses="col-start-2 col-span-4" />
      </div>
    </form>
  )
}

export default AddMicroResults;
