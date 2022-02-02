import { rangeString, capitalize } from '../../../functions/strings.js';

const HmLine = ({ hmLabel, hmSpec, hmUnit, resultsExist, resultsIn, result, prior_lot, prior_testing=false, last_result=false }) => {
  return (
    <div className="grid grid-cols-5">
      <p className="text-black font-semibold">{hmLabel}</p>
      <p className="text-black">{`≤ ${hmSpec} ${hmUnit}`}</p>
      <p>{resultsExist && resultsIn ? `${result} ${hmUnit}` : "Results Pending"}</p>
      <p>ICP-MS</p>
      <p>{prior_lot && prior_testing && last_result && `Heavy metal results from lot ${prior_lot.lot}`}</p>
    </div>
  )
}

export default HmLine;
