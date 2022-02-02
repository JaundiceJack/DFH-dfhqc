import TestLine from '../common/testLine.js';

const SampleInfo = ({ sample, spec }) => {
  return (

    <div className="flex flex-col">
      {/* Testing Information Lines*/}
      <TestLine type="micro" label="TPC:"
        sample={sample}
        result={sample && sample.results && sample.results.tpc}
        spec={spec.tpc}
        unit={spec.tpc_units} />
      <TestLine type="micro" label="Y&M:"
        sample={sample}
        result={sample && sample.results && sample.results.ym}
        spec={spec.ym}
        unit={spec.ym_units} />
      <TestLine type="micro" label="Entero.:"
        sample={sample}
        result={sample && sample.results && sample.results.entero}
        spec={spec.entero}
        unit={spec.entero_units} />
      <TestLine type="micro" label="Salmonella:"
        sample={sample}
        result={sample && sample.results && sample.results.salmonella}
        spec={spec.salmonella} />
      <TestLine type="micro" label="E. Coli:"
        sample={sample}
        result={sample && sample.results && sample.results.ecoli}
        spec={spec.ecoli} />
      <TestLine type="micro" label="Staph:"
        sample={sample}
        result={sample && sample.results && sample.results.staph}
        spec={spec.staph} />

      {spec.paeru_tested &&
        <TestLine type="micro" label="P. Aeru:"
          sample={sample}
          result={sample && sample.results && sample.results.paeru}
          spec={spec.paeru} />
      }
    </div>
  )
}

export default SampleInfo;
