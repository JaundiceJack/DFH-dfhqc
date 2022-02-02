import CategoryHeader from './categoryHeader.js';

const Ftir = ({ selected, tests }) => {
  // Filter out the ftir test
  const ftirTests = tests && tests.filter(test => test.type === 'ftir');
  const ftirTest = ftirTests && ftirTests.length > 0 ? ftirTests[0] : null;
  const numFtirResults = ftirTest ? ftirTest.samples.reduce((total, sample) => { return sample.results ? total + 1 : total }, 0) : 0;

  // Check for the presence of each type of ftirs result
  const checkFtirResults = resultType => {
    let allResultsIn = true;
    ftirTest ? ftirTest.samples.reduce((total, sample) => {
      if (sample.results[resultType] === "" || sample.results[resultType] === null)
        allResultsIn = false; }) : allResultsIn = false;
    return allResultsIn;
  }
  const allFtirResultsIn = checkFtirResults('match');


  // Calculate the ftirs' average result from 1 or more samples
  const getFtirResult = resultType => {
    return ftirTest ? ftirTest.samples.reduce((total, sample) => {
      return sample.results ? total + (sample.results[resultType] === "positive" ? 0 : 1) : total;
    }, 0) / numFtirResults : null;
  }
  const ftirResult = getFtirResult('match');


  return (
    <div id="ftirs" className="mb-6">
      <CategoryHeader title="FT-IR Identity" testing="Test" />
      {selected && selected.raw &&
        <div className="w-full px-2">
          <div className="grid grid-cols-5">
            <p className="text-black font-semibold">Identity:</p>
            <p className="text-black">Positive</p>
            <p className="text-black">{numFtirResults && allFtirResultsIn ? `${ftirResult === 0 ? "Positive" : "Fails Identity"}` : "Results Pending"}</p>
            <p>FT-IR</p>
            <p></p>
          </div>
        </div>
      }
    </div>
  )
}

export default Ftir;
