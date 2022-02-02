import { formatDate } from '../../../../../functions/time.js';
import { capitalize } from '../../../../../functions/strings.js';

const TestLine = ({
  type,
  label,
  sample,
  result,
  spec,
  unit=""
}) => {

  // Assign a color to the testing string
  const textColor = () => {
    // Text is white if not tested
    if (!spec) return "text-white"
    // Red if is tested and not yet sampled
    else if (spec && !sample) return "text-red-300"
    // Yellow if sampled but not yet on test
    else if (spec && sample && !sample.lab) return "text-yellow-100"
    // Indigo if sent out but no results
    else if (spec && sample && sample.lab && !result) return "text-indigo-200"

    // Green if results passing, red if results failing
    else if (spec && sample && sample.lab && result) {
      // If micros, check that they are under spec and negative to pathogens
      if (type === 'micro') {
        if (label !== "Salmonella:" && label !== "E. Coli:" && label !== "Staph:")
          return result <= spec ? "text-green-200" : "text-red-400";
        else
          return result === "Negative"   ? "text-green-200" :
                 result === "Not Tested" ? "text-yellow-100" : "text-red-400";
      }
      // If heavy metals, check that they are under spec
      else if (type === 'hm') {
        return result <= spec ? "text-green-200" : "text-red-400";
      }
      // If pesticides, check for absence
      else if (type === 'pesticide' || type === 'solvent') {
        return result === spec ? "text-green-200" : "text-red-400";
      }
      // If rancidity, check that result is less than spec
      else if (type === 'rancidity') {
        return result <= spec ? "text-green-200" : "text-red-400";
      }
      // If an assay, check that it falls between the spec range
      else if (type === 'assay') {
        if ((spec.min !== null && spec.min !== undefined) && (spec.max !== null && spec.max !== undefined))
          return (result >= spec.min && result <= spec.max) ? "text-green-200" : "text-red-400";
        else if ((spec.min !== null && spec.min !== undefined) && (spec.max === null || spec.max === undefined))
          return (result >= spec.min) ? "text-green-200" : "text-red-400";
        else if ((spec.min === null || spec.min === undefined) && (spec.max !== null && spec.max !== undefined))
          return (result <= spec.max) ? "text-green-200" : "text-red-400";
        else return 'text-yellow-100';
      }
      // TODO: If an identity, check that it matches the posneg property of the spec
      else if (type === 'identity') {
        return result === "Positive"   ? "text-green-200" :
               result === "Not Tested" ? "text-yellow-100" : "text-red-400";
      }
    }
    else
      return "text-white"
  };

  // Get the text to display for the given test
  const testText = () => {
    // Text is "Not tested" if there's no spec
    if (!spec)
      return "Not tested";
    // Text is "Needs Test" if tested but not sampled
    else if (spec && !sample)
      return "Needs test";
    // Text is "Sampled on Date" if sampled but not yet tested
    else if (spec && sample && sample.date_sampled && !sample.lab)
      return `Sampled on ${formatDate(sample.date_sampled)}`
    // Text is "Sent to Lab on Date" if on test
    else if (spec && sample && sample.date_sampled && sample.lab && !result)
      return `Sent to ${capitalize(sample.lab.name)} on ${formatDate(sample.date_sent)}`
    // Text is the result if off test
    else if (spec && sample && sample.date_sampled && sample.lab && result)
      return `${typeof result === 'string' ? capitalize(result) : result} ${unit}`
  };

  return (
    <div className="grid grid-cols-3">
      <p className="text-right mr-2 capitalize">{label}</p>
      <p className={textColor()+" col-span-2 self-end "}> { testText() } </p>
    </div>
  )
}

export default TestLine;
