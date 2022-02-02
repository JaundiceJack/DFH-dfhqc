import TestLine from '../common/testLine.js';

const SampleInfo = ({ sample, spec }) => {
  return (

    <div className="flex flex-col">
      {/* Testing Information Lines*/}
      <TestLine type="assay" label={`${spec.assay.name}:`} sample={sample} spec={spec}
        result={sample && sample.results && sample.results[spec.assay.name]}
        unit={spec.units.name} />
    </div>
  )
}

export default SampleInfo;
