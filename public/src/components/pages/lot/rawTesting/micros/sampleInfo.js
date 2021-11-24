import MicroTestLine from './microTestLine.js';

const SampleInfo = ({ sample, spec }) => {
  return (

    <div className="flex flex-col">
      {/* Testing Information Lines*/}
      <MicroTestLine label="TPC:"
        sample={sample} result={sample && sample.results && sample.results.tpc}
        spec={spec.tpc} unit={spec.tpc_units} />
      <MicroTestLine label="Y&M:"
        sample={sample} result={sample && sample.results && sample.results.ym}
        spec={spec.ym}  unit={spec.ym_units} />
      <MicroTestLine label="Enterobacteria:"
        sample={sample} result={sample && sample.results && sample.results.entero}
        spec={spec.entero} unit={spec.entero_units} />
      <MicroTestLine label="Salmonella:"
        sample={sample} result={sample && sample.results && sample.results.salmonella}
        spec={spec.salmonella} />
      <MicroTestLine label="E. Coli:"
        sample={sample} result={sample && sample.results && sample.results.ecoli}
        spec={spec.ecoli} />
      <MicroTestLine label="Staph:"
        sample={sample} result={sample && sample.results && sample.results.staph}
        spec={spec.staph} />

      {spec.paeru_tested &&
        <MicroTestLine label="P. Aeru:"
          sample={sample} result={sample && sample.results && sample.results.paeru}
          spec={spec.paeru} />
      }
    </div>
  )
}

export default SampleInfo;
