import TestLine from '../common/testLine.js';

const SampleInfo = ({ sample, spec }) => {
  return (

    <div className="flex flex-col">
      {/* Testing Information Lines*/}
      <TestLine type="hm" label="Arsenic:" sample={sample} spec={spec && spec.arsenic}
        result={sample && sample.results && sample.results.arsenic}
        unit={spec && spec.units} />
      <TestLine type="hm" label="Cadmium:" sample={sample} spec={spec && spec.cadmium}
        result={sample && sample.results && sample.results.cadmium}
        unit={spec && spec.units} />
      <TestLine type="hm" label="Lead:" sample={sample} spec={spec && spec.lead}
        result={sample && sample.results && sample.results.lead}
        unit={spec && spec.units} />
      <TestLine type="hm" label="Mercury:" sample={sample} spec={spec && spec.mercury}
        result={sample && sample.results && sample.results.mercury}
        unit={spec && spec.units} />

      {spec.nickel_tested &&
        <TestLine type="hm" label="Nickel:" sample={sample} spec={spec && spec.nickel}
           result={sample && sample.results && sample.results.nickel}
           unit={spec && spec.units}/>
      }
    </div>
  )
}

export default SampleInfo;
