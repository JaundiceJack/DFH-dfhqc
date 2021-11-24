import HmTestLine from './hmTestLine.js';

const SampleInfo = ({ sample, spec }) => {
  return (

    <div className="flex flex-col">
      {/* Testing Information Lines*/}
      <HmTestLine label="Arsenic:" sample={sample} spec={spec.arsenic}
        result={sample && sample.results && sample.results.arsenic}
        unit={spec.arsenic} />
      <HmTestLine label="Cadmium:" sample={sample} spec={spec.cadmium}
        result={sample && sample.results && sample.results.cadmium}
        unit={spec.cadmium} />
      <HmTestLine label="Lead:" sample={sample} spec={spec.lead}
        result={sample && sample.results && sample.results.lead}
        unit={spec.lead} />
      <HmTestLine label="Mercury:" sample={sample} spec={spec.mercury}
        result={sample && sample.results && sample.results.mercury}
        unit={spec.mercury} />

      {spec.nickel_tested &&
        <HmTestLine label="Nickel:" sample={sample} spec={spec.nickel}
           result={sample && sample.results && sample.results.nickel}
           unit={spec.nickel}/>
      }
    </div>
  )
}

export default SampleInfo;
