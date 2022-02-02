import TestLine from '../common/testLine.js';

const SampleInfo = ({ sample, spec }) => {
  return (

    <div className="flex flex-col">
      {/* Testing Information Lines*/}
      <TestLine type="ftir" label="FT-IR Identity:"
        sample={sample}
        result={sample && sample.results && sample.results.match}
        spec={spec} />
    </div>
  )
}

export default SampleInfo;
