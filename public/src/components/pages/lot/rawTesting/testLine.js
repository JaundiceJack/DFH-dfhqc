import Button from '../../../button.js';
import { IoClose } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { removeRawSample } from '../../../../actions/lotActions';

const TestLine = ({text, type, id, tested, results, toggle, onSample, hideButton=false}) => {
  const dispatch = useDispatch();
  const removeSample = () => {
    dispatch(removeRawSample(id, type));
  }

  // Get the color the text should be based on whether it gets tested or not
  const textColor = (tested, sampleDate) => {
    let textClasses = ""
    if (sampleDate) textClasses = "text-blue-100 col-span-1"
    else if (tested) textClasses = "text-red-300 col-span-1"
    else textClasses = "text-blue-100 col-span-2";
    return textClasses
  };
  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
  }
  // Get the text to display for the given test
  const testText = (tested, sampleDate) => {
    let txt = "";
    if (sampleDate) txt = `Sampled on ${formatDate(sampleDate)}`
    else if (tested) txt = "Needs test"
    else txt = "Not tested"
    return txt;
  };
  const sampleDate = (results) => {
    if (!results) return null
    else if (results.length === 0) return null
    else if (results.length > 0 && results[0].sample_date) return results[0].sample_date
    else return null;
  }
  const sentDate = (results) => {
    if (!results) return null
    else if (results.length === 0) return null
    else if (results.length > 0 && results[0].sent_date) return results[0].sent_date
    else return null;
  }
  const sampled = sampleDate(results) ? true : false;

  return (
    <div className="grid grid-cols-3">
      <p className="text-right mr-2">{text}:</p>
      <p className={textColor(tested, sampleDate(results))+" whitespace-nowrap"}>
        { testText(tested, sampleDate(results))}</p>
      {!toggle && tested && !sampled &&
        <Button
          color="bg-yellow-300"
          text="Take Sample"
          onClick={() => onSample(true)}
          extraClasses={hideButton ? "hidden" : "justify-self-start"} />}
      {!toggle && tested && sampled &&
        <Button
          color="bg-yellow-300"
          icon=<IoClose />
          onClick={removeSample}
          extraClasses={hideButton ? "hidden" : "justify-self-end"} />}
    </div>
  );
};

export default TestLine;
