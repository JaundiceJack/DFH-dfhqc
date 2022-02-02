import TestLine from '../common/testLine.js';

const SampleInfo = ({ sample, spec }) => {
  return (

    <div className="flex flex-col">
      {/* Testing Information Lines*/}
      <TestLine type="identity" label={`${spec.identity.name}:`} sample={sample} spec={spec}
        result={sample && sample.results && sample.results[spec.identity.name]} />
    </div>
  )
}

export default SampleInfo;
