import HmLine from './hmLine.js';
import CategoryHeader from './categoryHeader.js';

const HeavyMetals = ({ selected, tests, prior_lot, prior_tests }) => {
  // Filter out the hm test for the current or previous testing
  const testsFiltered = tests && tests.filter(test => test.type === 'hm');
  const priorTestsFiltered = prior_tests && prior_tests.filter(test => test.type === 'hm');
  // Assign the current or prior testing for result calculations (w/current testing given priority)
  const hmTests = (testsFiltered      && testsFiltered.length > 0)       ? testsFiltered :
                  (priorTestsFiltered && priorTestsFiltered.length) > 0 && priorTestsFiltered;
  const hmTest = hmTests && hmTests.length > 0 ? hmTests[0] : null;
  // Tally the number of samples to get result averages
  const hmResults = hmTest ? hmTest.samples.reduce((total, sample) => {
    return sample.results ? total + 1 : total }, 0) : 0;

  // Check for the presence of each type of hm result
  const checkHmResults = resultType => {
    let allResultsIn = true;
    hmTest ? hmTest.samples.reduce((total, sample) => {
      if (sample.results[resultType] === "" || sample.results[resultType] === null)
        allResultsIn = false; }) : allResultsIn = false;
    return allResultsIn;
  }
  const allArsenicResultsIn = checkHmResults('arsenic');
  const allCadmiumResultsIn = checkHmResults('cadmium');
  const allLeadResultsIn    = checkHmResults('lead');
  const allMercuryResultsIn = checkHmResults('mercury');
  const allNickelResultsIn  = checkHmResults('nickel');

  // Calculate the heavy metals' average result from 1 or more samples
  const getHmResult = resultType => {
    return hmTest ? hmTest.samples.reduce((total, sample) => {
      return sample.results ? total + Number(sample.results[resultType]) : total;
    }, 0) / hmResults : null;
  }
  const arsenicResult = getHmResult('arsenic');
  const cadmiumResult = getHmResult('cadmium');
  const leadResult    = getHmResult('lead');
  const mercuryResult = getHmResult('mercury');
  const nickelResult  = getHmResult('nickel');

  return (
    <div id="heavyMetals"  className="mb-6">
      <CategoryHeader title="Heavy Metals" testing="Metal Name" />
      {selected && selected.raw &&
        <div className="w-full px-2">
          <HmLine hmLabel="Arsenic:"
            hmSpec={selected.raw.hm.arsenic} hmUnit={selected.raw.hm.units}
            resultsExist={hmResults}         resultsIn={allArsenicResultsIn}  result={arsenicResult}
            prior_lot={prior_lot}            prior_testing={testsFiltered.length === 0} />
          <HmLine hmLabel="Cadmium:"
            hmSpec={selected.raw.hm.cadmium} hmUnit={selected.raw.hm.units}
            resultsExist={hmResults}         resultsIn={allCadmiumResultsIn} result={cadmiumResult}
            prior_lot={prior_lot}            prior_testing={testsFiltered.length === 0} />
          <HmLine hmLabel="Lead:"
            hmSpec={selected.raw.hm.lead} hmUnit={selected.raw.hm.units}
            resultsExist={hmResults}      resultsIn={allLeadResultsIn} result={leadResult}
            prior_lot={prior_lot}         prior_testing={testsFiltered.length === 0} />
          <HmLine hmLabel="Mercury:"
            hmSpec={selected.raw.hm.mercury} hmUnit={selected.raw.hm.units}
            resultsExist={hmResults}         resultsIn={allMercuryResultsIn} result={mercuryResult}
            prior_lot={prior_lot}            prior_testing={testsFiltered.length === 0}
            last_result={selected.raw.hm.nickel_tested ? false : true} />
          {selected.raw.hm.nickel_tested &&
            <HmLine hmLabel="Nickel:"
              hmSpec={selected.raw.hm.nickel} hmUnit={selected.raw.hm.units}
              resultsExist={hmResults}        resultsIn={allNickelResultsIn} result={nickelResult}
              prior_lot={prior_lot}           prior_testing={testsFiltered.length === 0}
              last_result={true}/>
          }
        </div>
      }
    </div>
  )
}

export default HeavyMetals;
