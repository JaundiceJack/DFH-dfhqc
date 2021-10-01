const SpecIds = ({ids}) => {
  // Display the assays in the format Name: Range by Method
  const mapIds = () => {
    if (ids) {
      return ids.map((id, index) => {
        return (
          <div key={index} className="grid grid-cols-3 p-2">
            <div className="grid grid-cols-3 gap-x-2 col-span-3">
              <p className="text-right capitalize">{id.identity_name}:</p>
              <p className="capitalize col-span-2">{`${id.identity_posneg} by ${id.identity_method}`}</p>
            </div>


            {id.identity_is_botanical &&
              <div className="grid grid-cols-3 gap-x-2 col-span-3">
                <p className="text-right">Conforms to:</p>
                <p className="capitalize col-span-2">{`${id.identity_genus} ${id.identity_species} ${id.identity_part}`}</p>
                <p className="text-right">Solvent:</p>
                <p className="capitalize col-span-2">{id.identity_solvent ? `${id.identity_solvent}` : "N/A"}</p>
                <p className="text-right">Ratio:</p>
                <p className="capitalize col-span-2">{id.identity_solvent ? `${id.identity_ratio}` : "N/A"}</p>
              </div>
             }
          </div>
        )
      })
    }
  }

  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold">
      <h2 className="text-lg text-left px-2 py-1 text-blue-200">Identity</h2>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
        {mapIds(ids)}
    </div>
  )
}

export default SpecIds;
