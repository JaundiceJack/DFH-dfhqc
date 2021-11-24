import AssayTestLine from './assayTestLine.js';

const SampleInfo = ({ sample, spec }) => {
  return (

    <div className="flex flex-col">
      {/* Testing Information Lines*/}
      <AssayTestLine label={`${spec.assay.name}:`} sample={sample} spec={spec}
        result={sample && sample.results}
        unit={spec.units.name} />
    </div>
  )
}

export default SampleInfo;
