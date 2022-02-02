import { rangeString, capitalize } from '../../../functions/strings.js';

const IdentityLine = ({ identity, tests, prior_lot }) => {
  const test = (tests && tests.length > 0) ? tests[0] : null;
  const idResults = test ? test.samples.reduce((total, sample) => { return sample.results ? total + 1 : total }, 0) : 0;
  const result = test && test.samples ? test.samples.reduce((total, sample) => {
    return sample.results ? total + (sample.results[identity.identity.name] === identity.posneg ? 0 : 1) : total;
  }, 0) : null;

  return (
    <div className="w-full px-2 grid grid-cols-5">
      <p className="text-black font-semibold">{`${capitalize(identity.identity.name)} Identity`}</p>
      <p className="text-black">{identity.posneg}</p>
      <p className="text-black">{idResults ? `${result === 0 ? "Conforms" : "Unidentified"}` : "Results Pending"}</p>
      <p className="text-black">{identity && identity.method && identity.method.name}</p>
      <p>{prior_lot && `Result from lot ${prior_lot.lot}`}</p>
    </div>
  )
}

export default IdentityLine;
