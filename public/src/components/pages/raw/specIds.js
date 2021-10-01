const SpecIds = ({ids}) => {
  // Display the assays in the format Name: Range by Method
  const mapIds = () => {
    if (ids) {
      return ids.map((id, index) => {
        return (
          <div key={index} className="">
            <div className="grid grid-cols-2 gap-x-2">
              <p className="text-right capitalize">{id.identity_name}:</p>
              <p className="capitalize">{`${id.identity_posneg} by ${id.identity_method}`}</p>
            </div>


            {id.identity_is_botanical &&
              <div className="grid grid-cols-2 gap-x-2">
                <p className="text-right">Conforms to:</p>
                <p className="capitalize">{`${id.identity_genus} ${id.identity_species} ${id.identity_part}`}</p>
                <p className="text-right">Solvent:</p>
                <p className="capitalize">{id.identity_solvent ? `${id.identity_solvent}` : "N/A"}</p>
                <p className="text-right">Ratio:</p>
                <p className="capitalize">{id.identity_solvent ? `${id.identity_ratio}` : "N/A"}</p>
              </div>
             }
          </div>
        )
      })
    }
  }

  return (
    <div className="bg-gray-600 rounded p-2 text-blue-100 font-semibold">
      <h2 className="text-lg text-left ml-2 underline">Identity</h2>
        {mapIds(ids)}
    </div>
  )
}

export default SpecIds;
