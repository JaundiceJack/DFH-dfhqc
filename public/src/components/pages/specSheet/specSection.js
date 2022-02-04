const SpecSection = ({ title, contents }) => {
  return (
    <div className="flex flex-col border-r border-b border-gray-300" style={{minHeight: 125+"px"}}>
      <div className="bg-gradient-to-b from-gray-300 to-gray-200 h-10 flex items-center justify-center " >
        <h2 className="text-gray-800 text-shadow-lg font-bold">{title}</h2>
      </div>
      <div className="p-3">
        {contents}
      </div>

    </div>
  )
}

export default SpecSection;
