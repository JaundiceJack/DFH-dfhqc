import TestLine from '../common/testLine.js';

const SampleInfo = ({ sample, spec }) => {
  return (

    <div className="flex flex-col">
      {/* Testing Information Lines*/}
      <TestLine type="solvent" label="Solvents:"
        sample={sample}
        result={sample && sample.results && sample.results.presence}
        spec={spec.tested ? "absent" : "not tested"} />
    </div>
  )
}

export default SampleInfo;
