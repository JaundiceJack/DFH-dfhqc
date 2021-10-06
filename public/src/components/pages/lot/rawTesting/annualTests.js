import { BiPlus } from 'react-icons/bi';
import { IoClose } from "react-icons/io5";
import Button from '../../../button.js';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { takeRawSample, removeRawSample } from '../../../../actions/lotActions';

const AnnualTests = ({lot}) => {
  const buttonCs = " rounded py-1/2 px-2 mx-1 my-1 2xl:my-0 font-semibold transform duration-75 text-black " +
                   " ease-in-out hover:scale-105 disabled:opacity-25 hover:opacity-100 opacity-75  flex flex-row items-center ";

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

  // Dispatch a change to the sampled state of the raw category
  const dispatch = useDispatch();
  const takeSample = (lotId, resultType) => {
    dispatch(takeRawSample(lotId, resultType));
  }
  const removeSample = (lotId, resultType) => {
    dispatch(removeRawSample(lotId, resultType));
  }

  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <div className="flex flex-row px-2 py-1">
        <h3 className="text-lg text-left px-2 text-blue-200">Annual Testing</h3>
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

{/* Pesticide Sampling */}
        <p className="text-right mr-2">Pesticides:</p>
        <p className={textColor(lot.item.pesticide_tested, sampleDate(lot.pesticide_results))+" whitespace-nowrap"}>
          { testText(lot.item.pesticide_tested, sampleDate(lot.pesticide_results))}</p>
        {!sampleDate(lot.pesticide_results) && lot.item.pesticide_tested &&
          <Button color="bg-yellow-300"
            text="Take Sample"
            onClick={() => takeSample(lot._id, 'pesticide')}
            extraClasses="justify-self-start" />}
        {!sentDate(lot.pesticide_results) && sampleDate(lot.pesticide_results) && lot.item.pesticide_tested &&
          <Button color="bg-yellow-300" icon={<IoClose />} onClick={() => removeSample(lot._id, 'pesticide')} extraClasses="justify-self-end" title="Cancel Sample"/>}

{/* Solvent Sampling */}
        <p className="text-right mr-2">Solvents:</p>
        <p className={textColor(lot.item.solvent_tested, sampleDate(lot.solvent_results))}>
          {testText(lot.item.solvent_tested, sampleDate(lot.solvent_results))}</p>
        {lot.item.solvent_tested &&
          <Button color="bg-yellow-300"
            text="Take Sample"
            onClick={() => takeSample(lot._id, 'solvent')}
            extraClasses="justify-self-start" />}

{/* Rancidity Sampling */}
        <p className="text-right mr-2">Peroxide:</p>
        <p className={textColor(lot.item.rancidity_tested, sampleDate(lot.rancidity_results))}>
          {testText(lot.item.rancidity_tested, sampleDate(lot.rancidity_results))}</p>
        {lot.item.rancidity_tested && <Button color="bg-yellow-300"
            text="Take Sample"
            onClick={() => takeSample(lot._id, 'rancidity')}
            extraClasses="row-span-3 " /> }
        <p className="text-right mr-2">p-Anisidine:</p>
        <p className={textColor(lot.item.rancidity_tested, sampleDate(lot.rancidity_results))}>
          {testText(lot.item.rancidity_tested, sampleDate(lot.rancidity_results))}</p>
        <p className="text-right mr-2">TOTOX:</p>
        <p className={textColor(lot.item.rancidity_tested, sampleDate(lot.rancidity_results))}>
          {testText(lot.item.rancidity_tested, sampleDate(lot.rancidity_results))}</p>
      </div>
    </div>
  )
}

export default AnnualTests;
