const GeneralTestLine = ({sample, testName, isTested, isSampled}) => {
  // Convert the date to mm/dd/yyyy format
  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
  }

  // Text is white if not tested
  // Red if is tested and not yet sampled
  // Blue if sampled but not yet on test
  // Green if results passing, red if results failing
  const textColor = () => {
    if (isTested && isSampled) return "text-blue-100"
    else if (isTested && !isSampled) return "text-red-300"
    else return "text-white"
  };

  // Get the text to display for the given test
  // Text is "Not tested" if isTested is false
  // Text is "Needs Test" if tested but not sampled
  // Text is "Sampled on Date" if sampled but not yet tested
  // Text is "Sent to Lab on Date" if on test
  // Text is "Passes testing" if off test and results pass
  // Text is "Failed testing" if off test and results fail
  const testText = () => {
    if (!isTested)
      return "Not tested";
    else if (isTested && !isSampled)
      return "Needs test";
    else if (isTested && isSampled) {
      if (sample) return `Sampled on ${formatDate(sample.sample_date)}`
      else return "Needs test";
    }
  };

  return (
    <div className="grid grid-cols-3">
      <p className="text-right mr-2 capitalize">{testName}:</p>
      <p className={textColor()+" whitespace-nowrap"}> { testText() } </p>
    </div>
  )
}

export default GeneralTestLine;
