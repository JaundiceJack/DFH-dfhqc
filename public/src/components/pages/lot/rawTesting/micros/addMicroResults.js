// Import basics
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import server actions
import { editRawSample } from '../../../../../actions/lotActions';
// Import components
import Button from '../../../../button.js';

const AddMicroResults = ({ lotId, test, item, close}) => {
  // Declare internal state variables
  const [sample, setSample] = useState({
    sample_date: test.sample_date,
    amount: test.amount,
    units: test.units,
    tpc: test.tpc,
    ym: test.ym,
    entero: test.entero,
    salmonella: test.salmonella,
    ecoli: test.ecoli,
    staph: test.staph,
    paeru: test.paeru,
    sent_to:   test.sent_to,
    sent_date: test.sent_date,
    result_date: new Date().toISOString().split('T')[0],
  });
  // Get labs from global state
  const labs = useSelector(state => state.lab.labs);

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
          className="rounded text-black px-1" >
          {labs.map(lab => <option value={lab._id}>{lab.name}</option>)}
        </select>
        <input type="date"
          name="sent_date"
          value={sample.sent_date}
          onChange={e => setSample({...sample, sent_date: e.target.value})}
          className="rounded text-black px-1" />
      </div>
      <div className="grid grid-cols-6 gap-x-2 my-2">
        <p className="text-right col-span-2">TPC:</p>
        <input type="text"
          name="tpc"
          value={sample.tpc}
          onChange={e => setSample({...sample, tpc: e.target.value})}
          className="rounded text-black px-1" />
        <p className="text-blue-100 font-semibold">{item.tpc_units}</p>
      </div>
      <div className="grid grid-cols-6 gap-x-2 my-2">
        <p className="text-right col-span-2">Y&M:</p>
        <input type="text"
          name="ym"
          value={sample.ym}
          onChange={e => setSample({...sample, ym: e.target.value})}
          className="rounded text-black px-1" />
        <p className="text-blue-100 font-semibold">{item.ym_units}</p>
      </div>
      <div className="grid grid-cols-6 gap-x-2 my-2">
        <p className="text-right col-span-2">Enterobacteria:</p>
        <input type="text"
          name="entero"
          value={sample.entero}
          onChange={e => setSample({...sample, entero: e.target.value})}
          className="rounded text-black px-1" />
        <p className="text-blue-100 font-semibold">{item.entero_units}</p>
      </div>
      <div className="grid grid-cols-6 gap-x-2 my-2">
        <p className="text-right col-span-2">Salmonella:</p>
        <select
          name="salmonella"
          value={sample.salmonella}
          onChange={e => setSample({...sample, salmonella: e.target.value})}
          className="rounded text-black px-1 col-span-2" >
          <option value="Negative">Negative</option>
          <option value="Positive">Positive</option>
        </select>
      </div>
      <div className="grid grid-cols-6 gap-x-2 my-2">
        <p className="text-right col-span-2">E. Coli:</p>
        <select
          name="ecoli"
          value={sample.ecoli}
          onChange={e => setSample({...sample, ecoli: e.target.value})}
          className="rounded text-black px-1 col-span-2" >
          <option value="Negative">Negative</option>
          <option value="Positive">Positive</option>
        </select>
      </div>
      <div className="grid grid-cols-6 gap-x-2 my-2">
        <p className="text-right col-span-2">Staph:</p>
        <select
          name="staph"
          value={sample.staph}
          onChange={e => setSample({...sample, staph: e.target.value})}
          className="rounded text-black px-1 col-span-2" >
          <option value="Negative">Negative</option>
          <option value="Positive">Positive</option>
        </select>
      </div>
      {item.paeru_tested &&
        <div className="grid grid-cols-6 gap-x-2 my-2">
          <p className="text-right col-span-2">P. Aeru:</p>
          <select
            name="paeru"
            value={sample.paeru}
            onChange={e => setSample({...sample, paeru: e.target.value})}
            className="rounded text-black px-1 col-span-2" >
            <option value="Negative">Negative</option>
            <option value="Positive">Positive</option>
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
