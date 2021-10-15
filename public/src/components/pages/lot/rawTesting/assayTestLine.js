import Button from '../../../button.js';
import { IoClose } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { removeRawSample } from '../../../../actions/lotActions';

// Convert the date to mm/dd/yyyy format
const formatDate = (rawDate) => {
  const date = new Date(rawDate);
  return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
}

const AssayTestLine = ({ testName, currentTests, isTested, sampling, testing, showSampling, removeSample }) => {
  // Text is white if not tested
  // Red if is tested and not yet sampled
  // Blue if sampled but not yet on test
  // Green if results passing, red if results failing
  const textColor = () => {
    if (isTested && currentTests.length > 0) return "text-blue-100"
    else if (isTested && currentTests.length === 0) return "text-red-300"
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
    else if (isTested && currentTests.length === 0)
      return "Needs test";
    else if (isTested && currentTests.length > 0)
      return `Sampled on ${formatDate(currentTests[0].sample_date)}`
    else
      return "Not tested?"
  }

  return (
    <div className="grid grid-cols-3">
      <p className="text-right mr-2 capitalize">{testName}:</p>
      <p className={textColor()+" whitespace-nowrap"}> { testText() } </p>
      {!sampling && !testing && isTested && currentTests.length === 0 &&
        <Button color="bg-yellow-300" text="Take Sample" onClick={showSampling}
          extraClasses={"justify-self-start"} />}
      {!sampling && !testing && isTested && currentTests.length > 0 &&
        <Button color="bg-yellow-300" icon=<IoClose /> onClick={removeSample}
          extraClasses={"justify-self-end"} />}
    </div>
  );
};

export default AssayTestLine;
