import CategoryHeader from './categoryHeader.js';

const Micros = ({ selected, tests }) => {
  // Filter out the micro test
  const microTests = tests && tests.filter(test => test.type === 'micro');
  const microTest = microTests && microTests.length > 0 ? microTests[0] : null;
  const microResults = microTest ? microTest.samples.reduce((total, sample) => { return sample.results ? total + 1 : total }, 0) : 0;

  // Check for the presence of each type of micros result
  const checkMicroResults = resultType => {
    let allResultsIn = true;
    microTest ? microTest.samples.reduce((total, sample) => {
      if (sample.results[resultType] === "" || sample.results[resultType] === null)
        allResultsIn = false; }) : allResultsIn = false;
    return allResultsIn;
  }
  const allTpcResultsIn        = checkMicroResults('tpc');
  const allYmResultsIn         = checkMicroResults('ym');
  const allEnteroResultsIn     = checkMicroResults('entero');
  const allSalmonellaResultsIn = checkMicroResults('salmonella');
  const allStaphResultsIn      = checkMicroResults('staph');
  const allEcoliResultsIn      = checkMicroResults('ecoli');
  const allPaeruResultsIn      = checkMicroResults('paeru');

  // Calculate the micros' average result from 1 or more samples
  const getMicroCountResult = resultType => {
    return microTest ? microTest.samples.reduce((total, sample) => {
      return sample.results ? total + Number(sample.results[resultType]) : total;
    }, 0) / microResults : null;
  }
  const getMicroPathoResult = resultType => {
    return microTest ? microTest.samples.reduce((total, sample) => {
      return sample.results ? total + (sample.results[resultType] === "Negative" ? 0 : 1) : total;
    }, 0) / microResults : null;
  }
  const tpcResult        = getMicroCountResult('tpc');
  const ymResult         = getMicroCountResult('ym');
  const enteroResult     = getMicroCountResult('entero');
  const salmonellaResult = getMicroPathoResult('salmonella');
  const staphResult      = getMicroPathoResult('staph');
  const ecoliResult      = getMicroPathoResult('ecoli');
  const paeruResult      = getMicroPathoResult('paeru');

  return (
    <div id="micros" className="mb-6">
      <CategoryHeader title="Microbes & Pathogens" testing="Microbe Test" />
      {selected && selected.raw &&
        <div className="w-full px-2">
          <div className="grid grid-cols-5">
            <p className="text-black font-semibold">Total Plate Count:</p>
            <p className="text-black">{`≤ ${selected.raw.micro.tpc} ${selected.raw.micro.tpc_units}`}</p>
            <p className="text-black">{microResults && allTpcResultsIn ? `${tpcResult} ${selected.raw.micro.tpc_units}` : "Results Pending"}</p>
            <p>USP/NF</p>
            <p></p>
          </div>
          <div className="grid grid-cols-5">
            <p className="text-black font-semibold">Yeast & Mold Count:</p>
            <p className="text-black">{`≤ ${selected.raw.micro.ym} ${selected.raw.micro.ym_units}`}</p>
            <p className="text-black">{microResults && allYmResultsIn ? `${ymResult} ${selected.raw.micro.ym_units}` : "Results Pending"}</p>
            <p>USP/NF</p>
            <p></p>
          </div>
          <div className="grid grid-cols-5">
            <p className="text-black font-semibold">Enterobacteria Count:</p>
            <p className="text-black">{`≤ ${selected.raw.micro.entero} ${selected.raw.micro.entero_units}`}</p>
            <p className="text-black">{microResults && allEnteroResultsIn ? `${enteroResult} ${selected.raw.micro.entero_units}` : "Results Pending"}</p>
            <p>USP/NF</p>
            <p></p>
          </div>
          <div className="grid grid-cols-5">
            <p className="text-black font-semibold">Salmonella:</p>
            <p className="text-black">{`${selected.raw.micro.salmonella}`}</p>
            <p>{microResults && allSalmonellaResultsIn ? (salmonellaResult === 0 ? "Negative" : "Pathogen Detected") : "Results Pending"}</p>
            <p>USP/NF</p>
            <p></p>
          </div>
          <div className="grid grid-cols-5">
            <p className="text-black font-semibold">Staph:</p>
            <p className="text-black">{`${selected.raw.micro.staph}`}</p>
            <p>{microResults && allStaphResultsIn ? (staphResult === 0 ? "Negative" : "Pathogen Detected") : "Results Pending"}</p>
            <p>USP/NF</p>
            <p></p>
          </div>
          <div className="grid grid-cols-5">
            <p className="text-black font-semibold">E. Coli:</p>
            <p className="text-black">{`${selected.raw.micro.ecoli}`}</p>
            <p>{microResults && allEcoliResultsIn ? (ecoliResult === 0 ? "Negative" : "Pathogen Detected") : "Results Pending"}</p>
            <p>USP/NF</p>
            <p></p>
          </div>
          {selected.raw.micro.paeru_tested &&
            <div className="grid grid-cols-5">
              <p className="text-black font-semibold">P. Aeruginosa:</p>
              <p className="text-black">{`${selected.raw.micro.paeru}`}</p>
              <p>{microResults && allPaeruResultsIn ? (paeruResult === 0 ? "Negative" : "Pathogen Detected") : "Results Pending"}</p>
              <p>USP/NF</p>
              <p></p>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default Micros;
