import TestLine from '../common/testLine.js';

const SampleInfo = ({ sample, spec }) => {
  return (

    <div className="flex flex-col">
      {/* Testing Information Lines*/}
      <TestLine type="rancidity" label="Peroxide:"
        sample={sample}
        result={sample && sample.results && sample.results.peroxide}
        spec={spec.peroxide}
        unit='meq/kg' />
      <TestLine type="rancidity" label="p-Anisidine:"
        sample={sample}
        result={sample && sample.results && sample.results.anisidine}
        spec={spec.anisidine}
        unit='meq/kg' />
      <TestLine type="rancidity" label="TOTOX:"
        sample={sample}
        result={sample && sample.results && sample.results.totox}
        spec={spec.totox} />
    </div>
  )
}

export default SampleInfo;
