import TestLine from '../common/testLine.js';

const SampleInfo = ({ sample, spec }) => {
  return (

    <div className="flex flex-col">
      {/* Testing Information Lines*/}
      <TestLine type="pesticide" label="Pesticides:"
        sample={sample}
        result={sample && sample.results && sample.results.presence}
        spec={spec.tested ? "absent" : "not tested"} />
    </div>
  )
}

export default SampleInfo;
