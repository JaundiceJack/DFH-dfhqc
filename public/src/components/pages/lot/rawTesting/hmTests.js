import { BiPlus } from 'react-icons/bi';

const HmTests = ({lot}) => {
  const buttonCs = " rounded py-1/2 px-2 mx-1 my-1 2xl:my-0 font-semibold transform duration-75" +
                   " ease-in-out hover:scale-105 disabled:opacity-25 hover:opacity-100 opacity-75  ";

  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <div className="flex flex-row px-2 py-1">
        <h3 className="text-lg text-left px-2 text-blue-200">Heavy Metals</h3>
        <div className="flex-grow"></div>
        <button className={buttonCs+"bg-blue-300 text-black flex flex-row items-center"}><BiPlus /> Test</button>
        <button className={buttonCs+"bg-green-300 text-black flex flex-row items-center"}><BiPlus /> Result</button>
      </div>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className="grid grid-cols-3 p-2">
        <p className="text-right mr-2">Arsenic:</p>
        <p className="col-span-2"></p>
        <p className="text-right mr-2">Cadmium:</p>
        <p className="col-span-2"></p>
        <p className="text-right mr-2">Lead:</p>
        <p className="col-span-2"></p>
        <p className="text-right mr-2">Mercury:</p>
        <p className="col-span-2"></p>
        {lot.item && lot.item.nickel_tested &&
          <p className="text-right mr-2">Nickel:</p>
        }
        {lot.item && lot.item.nickel_tested &&
          <p className="col-span-2"></p>
        }

      </div>
    </div>
  )
}

export default HmTests
