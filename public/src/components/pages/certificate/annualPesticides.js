const AnnualPesticides = ({ lot, tests, item }) => {
  // Check for a passing pesticide result (with the same manufacturer) from this year
  let annualPesticideTest = null;
  let annualPesticideLot = null;
  item && item.pesticide && item.pesticide.lots_passing.forEach((annual, index) => {
    const annualYear = new Date(annual.date).getFullYear();
    const annualManufacturer = annual.lot.receiving.manufacturer;
    const lotYear = new Date(lot.date_created).getFullYear();
    const lotManufacturer = lot.receiving.manufacturer._id;
    if (annualYear === lotYear && annualManufacturer === lotManufacturer && annual.lot._id !== lot._id) {
      const tests = annual.lot.tests.filter(test => test.type === 'pesticides');
      if (tests.length > 0) {
        annualPesticideTest = tests[0];
        annualPesticideLot = annual.lot.lot;
      }
    }
  });
  const pesticideTest = tests && (
    tests.filter(test => test.type === 'pesticides').length > 0 ?
      tests.filter(test => test.type === 'pesticides')[0] : null);
  // Tally the number of samples taken for the pesticides
  const pesticideResults =
    pesticideTest ?
      pesticideTest.samples.reduce((total, sample) => { return sample.results ? total + 1 : total }, 0) :
    annualPesticideTest ?
      annualPesticideTest.samples.reduce((total, sample) => { return sample.results ? total + 1 : total }, 0) : 0;
  // Determine the total pesticide result from all samples
  let allPestResultsIn = true;
  const pesticideResult =
    pesticideTest ?
      pesticideTest.samples.reduce((total, sample) => {
        if (sample.results.presence === "" || sample.results.presence === null) allPestResultsIn = false;
        return sample.results ? total + (sample.results.presence === 'absent' ? 0 : 1) : total;
      }, 0) :
    annualPesticideTest ?
      annualPesticideTest.samples.reduce((total, sample) => {
        if (sample.results.presence === "" || sample.results.presence === null) allPestResultsIn = false;
        return sample.results ? total + (sample.results.presence === 'absent' ? 0 : 1) : total;
      }, 0) : null;

  return (
    <div id="pesticideTests" >
      {item && item.pesticide && item.pesticide.tested &&
        <div className="grid grid-cols-5">
          <p className="text-black font-semibold">Pesticides:</p>
          <p className="text-black">{`${item.pesticide.standard}`}</p>
          <p>{pesticideResults && allPestResultsIn ? `${pesticideResult === 0 ? "None Detected" : "Pesticides Detected"}` : "Results Pending"}</p>
          <p>{`${item.pesticide.standard}`}</p>
          <p>{annualPesticideTest && `Annual testing performed on lot ${annualPesticideLot}`}</p>
        </div>
      }
    </div>
  )
}

export default AnnualPesticides;
