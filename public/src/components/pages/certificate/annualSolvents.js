const AnnualSolvents = ({ lot, tests, item }) => {
  // Check for a passing solvent result (with the same manufacturer) from this year
  let annualSolventTest = null;
  let annualSolventLot = null;
  item && item.solvent && item.solvent.lots_passing.forEach((annual, index) => {
    const annualYear = new Date(annual.date).getFullYear();
    const annualManufacturer = annual.lot.receiving.manufacturer;
    const lotYear = new Date(lot.date_created).getFullYear();
    const lotManufacturer = lot.receiving.manufacturer._id;
    if (annualYear === lotYear && annualManufacturer === lotManufacturer && annual.lot._id !== lot._id) {
      const tests = annual.lot.tests.filter(test => test.type === 'solvents');
      if (tests.length > 0) {
        annualSolventTest = tests[0];
        annualSolventLot = annual.lot.lot;
      }
    }
  });
  const solventTest = tests && (
    tests.filter(test => test.type === 'solvents').length > 0 ?
      tests.filter(test => test.type === 'solvents')[0] : null);
  // Tally the number of samples taken for the solvents
  const solventResults =
    solventTest ?
      solventTest.samples.reduce((total, sample) => { return sample.results ? total + 1 : total }, 0) :
    annualSolventTest ?
      annualSolventTest.samples.reduce((total, sample) => { return sample.results ? total + 1 : total }, 0) : 0;
  // Determine the total solvent result from all samples
  let allSolventResultsIn = true;
  const solventResult =
    solventTest ?
      solventTest.samples.reduce((total, sample) => {
        if (sample.results.presence === "" || sample.results.presence === null) allSolventResultsIn = false;
        return sample.results ? total + (sample.results.presence === 'absent' ? 0 : 1) : total;
      }, 0) :
    annualSolventTest ?
      annualSolventTest.samples.reduce((total, sample) => {
        if (sample.results.presence === "" || sample.results.presence === null) allSolventResultsIn = false;
        return sample.results ? total + (sample.results.presence === 'absent' ? 0 : 1) : total;
      }, 0) : null;

  return (
    <div id="solventTests" >
      {item && item.solvent && item.solvent.tested &&
        <div className="grid grid-cols-5">
          <p className="text-black font-semibold">Solvents:</p>
          <p className="text-black">{`${item.solvent.standard}`}</p>
          <p>{solventResults && allSolventResultsIn ? `${solventResult === 0 ? "None Detected" : "Solvents Detected"}` : "Results Pending"}</p>
          <p>{`USP <467>`}</p>
          <p>{annualSolventTest && `Annual testing performed on lot ${annualSolventLot}`}</p>
        </div>
      }
    </div>
  )
}

export default AnnualSolvents;
