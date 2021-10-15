import Button from '../../../button.js';
import { IoClose } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { removeRawSample } from '../../../../actions/lotActions';

const TestLine = ({ lotId, testName, type, isTested, results, toggle, showSampling, setTestId, testId=null, hideButton=false }) => {

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
    const hasResults = results.length > 0;
    let isSampled;
    if (type === 'assay') isSampled = results.find(result => result.assay === testId) !== undefined;
    else if (type === 'identity') isSampled = results.find(result => result.identity === testId) !== undefined;
    else isSampled = results.length > 0;

    if (isTested && isSampled) return "text-blue-100"
    else if (isTested && !isSampled) return "text-red-300"
    else return "text-white"
  };

  // Check if the item was sampled
  const isSampled = () => {
    let isSampled = false;
    const assayResult = results.find(result => result.assay === testId);
    const identityResult = results.find(result => result.identity === testId);
    if (type === 'assay') isSampled = assayResult !== undefined;
    else if (type === 'identity') isSampled = identityResult !== undefined;
    else isSampled = results.length > 0;
    return isSampled;
  };

  // Get the text to display for the given test
  // Text is "Not tested" if isTested is false
  // Text is "Needs Test" if tested but not sampled
  // Text is "Sampled on Date" if sampled but not yet tested
  // Text is "Sent to Lab on Date" if on test
  // Text is "Passes testing" if off test and results pass
  // Text is "Failed testing" if off test and results fail
  const testText = () => {
    if (!isTested) return "Not tested";
    const assayResult = results.find(result => result.assay === testId);
    const identityResult = results.find(result => result.identity === testId);

    if (isTested && !isSampled) return "Needs test";
    else if (isTested && isSampled) {
      if (type === 'assay') return `Sampled on ${formatDate(assayResult.sample_date)}`
      else if (type === 'identity') return `Sampled on ${formatDate(identityResult.sample_date)}`
      else if (results.length > 0) return `Sampled on ${formatDate(results[0].sample_date)}`
      else return "Needs Test"
    }
  };




  const sampleDate = (results) => {
    if (!results) return null
    else if (type === 'assay') {
      const inResults = results.find(r=> r.assay === testId);
      if (inResults) return inResults.sample_date
      else return null
    }
    else if (type === 'identity') {
      const inResults = results.find(r=> r.identity === testId);
      if (inResults) return inResults.sample_date
      else return null
    }
    else if (results.length > 0 && results[0].sample_date) return results[0].sample_date
    else return null;
  }
  const sentDate = (results) => {
    if (!results) return null
    else if (type === 'assay') {
      const inResults = results.find(r=> r.assay === testId);
      if (inResults) return inResults.sent_date
      else return null
    }
    else if (type === 'identity') {
      const inResults = results.find(r=> r.identity === testId);
      if (inResults) return inResults.sent_date
      else return null
    }
    else if (results.length > 0 && results[0].sent_date) return results[0].sent_date
    else return null;
  }

  return (
    <div className="grid grid-cols-3">
      <p className="text-right mr-2 capitalize">{testName}:</p>
      <p className={textColor()+" whitespace-nowrap"}> { testText() } </p>
      {!toggle && isTested && !isSampled &&
        <Button
          color="bg-yellow-300"
          text="Take Sample"
          onClick={showSampling}
          extraClasses={hideButton ? "hidden" : "justify-self-start"} />}
      {!toggle && isTested && isSampled &&
        <Button
          color="bg-yellow-300"
          icon=<IoClose />
          
          extraClasses={hideButton ? "hidden" : "justify-self-end"} />}
    </div>
  );
};

export default TestLine;
