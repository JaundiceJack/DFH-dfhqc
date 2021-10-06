import { BiPlus } from 'react-icons/bi';
import { IoClose } from "react-icons/io5";
import Button from '../../../button.js';
import { useDispatch } from 'react-redux';
import { takeRawSample, removeRawSample } from '../../../../actions/lotActions';

const HmTests = ({lot}) => {
  const buttonCs = " rounded py-1/2 px-2 mx-1 my-1 2xl:my-0 font-semibold transform duration-75" +
                   " ease-in-out hover:scale-105 disabled:opacity-25 hover:opacity-100 opacity-75  ";

  const dispatch = useDispatch();
  const takeSample = (lotId) => {
   dispatch(takeRawSample(lotId, 'heavy metal'));
  }
  const removeSample = (lotId, resultType) => {
    dispatch(removeRawSample(lotId, resultType));
  }

  const textColor = (tested, sampleDate) => {
    return sampleDate ? "text-blue-100 col-span-1" : tested ? "text-red-300 col-span-1" : "text-blue-100 col-span-2" };
  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
  }
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

  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <div className="flex flex-row px-2 py-1">
        <h3 className="text-lg text-left px-2 text-blue-200">Heavy Metals</h3>
        <div className="flex-grow"></div>
        <Button color="bg-blue-300"
          icon={<BiPlus />}
          text=" Test"
          onClick={() => console.log("ok")} />
        <Button color="bg-green-300"
          icon={<BiPlus />}
          text="Result"
          onClick={() => console.log("ok")} />
      </div>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className="grid grid-cols-3 p-2">
        <p className="text-right mr-2">Arsenic:</p>
        <p className={textColor(lot.item.arsenic_max, sampleDate(lot.hm_results))+" whitespace-nowrap"}>
          { testText(lot.item.arsenic_max, sampleDate(lot.hm_results)) }</p>
        {!sampleDate(lot.hm_results) && lot.item.arsenic_max &&
          <Button color="bg-yellow-300" text="Take Sample" onClick={() => takeSample(lot._id)} extraClasses="row-span-4 " />}
        {!sentDate(lot.hm_results) && sampleDate(lot.hm_results) && lot.item.arsenic_max &&
          <Button color="bg-yellow-300" icon={<IoClose />} onClick={() => removeSample(lot._id, 'heavy metal')} extraClasses="justify-self-end row-span-4" title="Cancel Sample"/>}

        <p className="text-right mr-2">Cadmium:</p>
        <p className={textColor(lot.item.cadmium_max, sampleDate(lot.hm_results))+" whitespace-nowrap"}>
          { testText(lot.item.cadmium_max, sampleDate(lot.hm_results)) }</p>
        <p className="text-right mr-2">Lead:</p>
        <p className={textColor(lot.item.lead_max, sampleDate(lot.hm_results))+" whitespace-nowrap"}>
          { testText(lot.item.lead_max, sampleDate(lot.hm_results)) }</p>
        <p className="text-right mr-2">Mercury:</p>
        <p className={textColor(lot.item.mercury_max, sampleDate(lot.hm_results))+" whitespace-nowrap"}>
          { testText(lot.item.mercury_max, sampleDate(lot.hm_results)) }</p>
        {lot.item && lot.item.nickel_tested &&
          <p className="text-right mr-2">Nickel:</p>
        }
        {lot.item && lot.item.nickel_tested &&
          <p className={textColor(lot.item.nickel_max, sampleDate(lot.hm_results))+" whitespace-nowrap"}>
            { testText(lot.item.nickel_max, sampleDate(lot.hm_results)) }</p>
        }

      </div>
    </div>
  )
}

export default HmTests
