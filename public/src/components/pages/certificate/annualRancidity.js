const AnnualRancidity = ({ lot, tests, item }) => {
  // BUG: when an annual test is submitted, clicking into the next lot of the same item does not issue a get request for the other lots
  // Therefore, when the show/hide is checking, it's using the old raw list



  // Check for a passing rancidity result (with the same manufacturer) from this year
  let annualRancidityTest = null;
  let annualRancidityLot = null;
  item && item.rancidity && item.rancidity.lots_passing.forEach((annual, index) => {
    const annualYear = new Date(annual.date).getFullYear();
    const annualManufacturer = annual.lot.receiving.manufacturer;
    const lotYear = new Date(lot.date_created).getFullYear();
    const lotManufacturer = lot.receiving.manufacturer._id;
    if (annualYear === lotYear && annualManufacturer === lotManufacturer && annual.lot._id !== lot._id) {
      const tests = annual.lot.tests.filter(test => test.type === 'rancidity');
      if (tests.length > 0) {
        annualRancidityTest = tests[0];
        annualRancidityLot = annual.lot.lot;
      }
    }
  });
  const rancidityTest = tests && (
    tests.filter(test => test.type === 'rancidity').length > 0 ?
      tests.filter(test => test.type === 'rancidity')[0] : null);
  // Tally the number of samples taken for the rancidity
  const rancidityResults =
    rancidityTest ?
      rancidityTest.samples.reduce((total, sample) => { return sample.results ? total + 1 : total }, 0) :
    annualRancidityTest ?
      annualRancidityTest.samples.reduce((total, sample) => { return sample.results ? total + 1 : total }, 0) : 0;
  // Determine the total rancidity result from all samples
  let allPeroxideResultsIn = true;
  const peroxideResult =
    rancidityTest ?
      rancidityTest.samples.reduce((total, sample) => {
        if (sample.results.peroxide === "" || sample.results.peroxide === null) allPeroxideResultsIn = false;
        return sample.results ? total + Number(sample.results.peroxide) : total;
      }, 0) :
    annualRancidityTest ?
      annualRancidityTest.samples.reduce((total, sample) => {
        if (sample.results.peroxide === "" || sample.results.peroxide === null) allPeroxideResultsIn = false;
        return sample.results ? total + Number(sample.results.peroxide) : total;
      }, 0) / rancidityResults : null;

  let allAnisidineResultsIn = true;
  const anisidineResult =
    rancidityTest ?
      rancidityTest.samples.reduce((total, sample) => {
        if (sample.results.anisidine === "" || sample.results.anisidine === null) allAnisidineResultsIn = false;
        return sample.results ? total + Number(sample.results.anisidine) : total;
      }, 0) :
    annualRancidityTest ?
      annualRancidityTest.samples.reduce((total, sample) => {
        if (sample.results.anisidine === "" || sample.results.anisidine === null) allAnisidineResultsIn = false;
        return sample.results ? total + Number(sample.results.anisidine) : total;
      }, 0) / rancidityResults  : null;

  return (
    <div id="rancidityTests" >
      {item && item.rancidity && item.rancidity.tested &&
        <div>
          <div className="grid grid-cols-5">
            <p className="text-black font-semibold">Peroxide:</p>
            <p className="text-black">{`≤ ${item.rancidity.peroxide} meq/Kg`}</p>
            <p>{rancidityResults && allPeroxideResultsIn ? `${peroxideResult} meq/Kg` : "Results Pending"}</p>
            <p>PV</p>
            <p></p>
          </div>
          <div className="grid grid-cols-5">
            <p className="text-black font-semibold">p-Anisidine:</p>
            <p className="text-black">{`≤ ${item.rancidity.anisidine} meq/Kg`}</p>
            <p>{rancidityResults && allAnisidineResultsIn ? ` ${anisidineResult} meq/Kg` : "Results Pending"}</p>
            <p>p-AV</p>
            <p></p>
          </div>
          <div className="grid grid-cols-5">
            <p className="text-black font-semibold">TOTOX Value:</p>
            <p className="text-black">{`≤ ${item.rancidity.totox}`}</p>
            <p>{rancidityResults && allPeroxideResultsIn && allAnisidineResultsIn ? `${2*peroxideResult+anisidineResult}` : "Results Pending"}</p>
            <p>Calculation</p>
            <p>{annualRancidityTest && `Annual testing performed on lot ${annualRancidityLot}`}</p>
          </div>
        </div>
      }
    </div>
  )
}

export default AnnualRancidity;
