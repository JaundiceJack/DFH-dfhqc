import { rangeString, capitalize } from '../../../functions/strings.js';

const AssayLine = ({ assay, tests, prior_lot }) => {
  const test = tests && tests.length > 0 ? tests[0] : null;
  const assayResults = test ? test.samples.reduce((total, sample) => { return sample.results ? total + 1 : total }, 0) : 0;
  const result = test && test.samples ? test.samples.reduce((total, sample) => {
    return sample.results ? total + Number(sample.results[assay.assay.name]) : total;
  }, 0) / assayResults : null;

  return (
    <div className="w-full px-2 grid grid-cols-5">
      <p className="text-black font-semibold">{capitalize(assay.assay.name)}</p>
      <p className="text-black">{rangeString(assay.min, assay.max, assay.units.name)}</p>
      <p className="text-black">{assayResults ? `${result} ${assay.units.name}` : "Results Pending"}</p>
      <p className="text-black">{assay && assay.method && assay.method.name}</p>
      <p>{prior_lot && `Result from lot ${prior_lot.lot}`}</p>
    </div>
  )
}

export default AssayLine;
