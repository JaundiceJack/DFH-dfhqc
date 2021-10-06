import { BiPlus } from 'react-icons/bi';

const MicroTests = ({lot}) => {
  const buttonCs = " rounded py-1/2 px-2 mx-1 my-1 2xl:my-0 font-semibold transform duration-75" +
                   " ease-in-out hover:scale-105 disabled:opacity-25 hover:opacity-100 opacity-75  ";
  const textColor = (tested) => {
    return tested ? "text-red-300" : "text-blue-100" };
  const testText = (results, resultProp, tested) => {
    return results.length > 0 ? results[0][resultProp] :
      tested ? "Needs test" : "Not tested" };

  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <div className="flex flex-row px-2 py-1">
        <h3 className="text-lg text-left px-2 text-blue-200">Microbials</h3>
        <div className="flex-grow"></div>
        <button className={buttonCs+"bg-blue-300 text-black flex flex-row items-center"}><BiPlus /> Test</button>
        <button className={buttonCs+"bg-green-300 text-black flex flex-row items-center"}><BiPlus /> Result</button>
      </div>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className="grid grid-cols-3 p-2">
        <p className="text-right mr-2">TPC:</p>
        <p className={textColor(lot.item.tpc_max) + " col-span-2"}>{testText(lot.micro_results, 'tpc', lot.item.tpc_max)}</p>
        <p className="text-right mr-2">Y&M:</p>
        <p className={lot.item.ym_max ? "text-red-300 col-span-2" : "col-span-2"}>{lot.micro_results.length > 0 ? lot.micro_results[0].ym : lot.item.ym_max ? "Needs test" : "Not tested"}</p>
        <p className="text-right mr-2">Enterobacteria:</p>
        <p className={lot.item.entero_max ? "text-red-300 col-span-2" : "col-span-2"}>{lot.micro_results.length > 0 ? lot.micro_results[0].entero : lot.item.entero_max ? "Needs test" : "Not tested"}</p>
        <p className="text-right mr-2">Salmonella:</p>
        <p className={lot.item.salmonella ? "text-red-300 col-span-2" : "col-span-2"}>{lot.micro_results.length > 0 ? lot.micro_results[0].salmonella : lot.item.salmonella ? "Needs test" : "Not tested"}</p>
        <p className="text-right mr-2">E. Coli:</p>
        <p className={lot.item.ecoli ? "text-red-300 col-span-2" : "col-span-2"}>{lot.micro_results.length > 0 ? lot.micro_results[0].ecoli : lot.item.ecoli ? "Needs test" : "Not tested"}</p>
        <p className="text-right mr-2">Staph:</p>
        <p className={lot.item.staph ? "text-red-300 col-span-2" : "col-span-2"}>{lot.micro_results.length > 0 ? lot.micro_results[0].staph : lot.item.staph ? "Needs test" : "Not tested"}</p>
        {lot.item && lot.item.nickel_tested &&
          <p className="text-right mr-2">P. Aeruginosa:</p>}
        {lot.item && lot.item.nickel_tested &&
          <p className={lot.item.paeru ? "text-red-300 col-span-2" : "col-span-2"}>{lot.micro_results.length > 0 ? lot.micro_results[0].paeru : lot.item.paeru ? "Needs test" : "Not tested"}</p>}
      </div>
    </div>
  )
}

export default MicroTests
