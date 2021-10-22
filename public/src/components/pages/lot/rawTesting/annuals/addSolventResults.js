// Import basics
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import server actions
import { editRawSample } from '../../../../../actions/lotActions';
// Import components
import Button from '../../../../button.js';

const AddHmResults = ({ lotId, test, spec, close}) => {
  // Get labs from global state
  const labs = useSelector(state => state.lab.labs);

  // Declare internal state variables (include sample number to locate sample)
  const [sample, setSample] = useState({
    sample_number: test.sample_number,
    sent_to: test.sent_to !== null ? test.sent_to._id : (labs.length > 0 ? labs[0]._id : null),
    sent_date: test.sent_date ?
      new Date(test.sent_date).toISOString().split('T')[0] :
      new Date().toISOString().split('T')[0],
    arsenic:    test.arsenic    !== null ? test.arsenic    : "",
    cadmium:     test.cadmium     !== null ? test.cadmium     : "",
    lead:       test.lead !== null ? test.lead : "",
    mercury:    test.mercury !== null ? test.mercury : "",
    nickel:     test.nickel !== null ? test.nickel : "",
  });

  // Dispatch the edits to the sample
  const dispatch = useDispatch();
  const enterResults = (e) => {
    e.preventDefault();
    dispatch(editRawSample(lotId, 'hm', sample));
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
        <p className="text-right col-span-2">Arsenic:</p>
        <input type="text"
          name="arsenic"
          value={sample.arsenic}
          onChange={e => setSample({...sample, arsenic: e.target.value})}
          className="rounded text-black px-1" />
        <p className="text-blue-100 font-semibold">{spec.units}</p>
      </div>
      <div className="grid grid-cols-6 gap-x-2 my-2">
        <p className="text-right col-span-2">Cadmium:</p>
        <input type="text"
          name="cadmium"
          value={sample.cadmium}
          onChange={e => setSample({...sample, cadmium: e.target.value})}
          className="rounded text-black px-1" />
        <p className="text-blue-100 font-semibold">{spec.units}</p>
      </div>
      <div className="grid grid-cols-6 gap-x-2 my-2">
        <p className="text-right col-span-2">Lead:</p>
        <input type="text"
          name="lead"
          value={sample.lead}
          onChange={e => setSample({...sample, lead: e.target.value})}
          className="rounded text-black px-1" />
        <p className="text-blue-100 font-semibold">{spec.units}</p>
      </div>
      <div className="grid grid-cols-6 gap-x-2 my-2">
        <p className="text-right col-span-2">Mercury:</p>
        <input type="text"
          name="mercury"
          value={sample.mercury}
          onChange={e => setSample({...sample, mercury: e.target.value})}
          className="rounded text-black px-1" />
        <p className="text-blue-100 font-semibold">{spec.units}</p>
      </div>
      {spec.nickel_tested &&
        <div className="grid grid-cols-6 gap-x-2 my-2">
          <p className="text-right col-span-2">Nickel:</p>
          <input type="text"
            name="nickel"
            value={sample.nickel}
            onChange={e => setSample({...sample, nickel: e.target.value})}
            className="rounded text-black px-1" />
          <p className="text-blue-100 font-semibold">{spec.units}</p>
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

export default AddHmResults;
