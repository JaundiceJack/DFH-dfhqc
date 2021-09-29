import { useSelector } from 'react-redux';

const AddLotInfo = ({vals, onEntry}) => {
  const labelCs = "mr-2 text-right text-blue-100 font-semibold whitespace-nowrap self-center";
  const inputCs = "rounded my-1 py-1 pl-2 bg-gray-200 w-full";

  const raws   = useSelector(state => state.raw.raws);
  const blends = useSelector(state => state.blend.blends);
  const bulks  = useSelector(state => state.bulk.bulks);
  const fgs    = useSelector(state => state.fg.fgs);
  const options = ['kg', 'liters', 'ths'];
  const facilities = ['Arlee', 'Henderson', 'Suffield'];
  const whLocations = ['A1', 'A2', 'I1', 'I2', 'H1', 'H2'];
  const vendors = ['Charles Bowman', 'Charkit'];
  const manufacturers = ['Wuhan Grand', 'Beijing Ginkgo Group'];
/*
lot
purchaseOrder
itemId
itemType
amount
amountUnits
*/
  return (
    <div className="flex flex-col mb-3">
      <h3 className="font-semibold text-blue-100 text-lg">Basic Info</h3>
      <div className={"mb-2 h-px w-full bg-gradient-to-r " +
                      "from-blue-300 to-transparent"} />
      <div className="grid grid-cols-3 gap-2">
        <label className={labelCs}>Lot #:</label>
        <input className={inputCs+" col-span-2"}
               name="lot"
               type="text"
               value={vals.lot}
               onChange={onEntry}
               disabled={false} />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <label className={labelCs}>Item Type:</label>
        <select name="itemType"
                className={inputCs+" col-span-2"}
                value={vals.itemType}
                onChange={onEntry}>
          <option value="raw">Raw</option>
          <option value="blend">Blend</option>
          <option value="bulk">Bulk</option>
          <option value="fg">Finished Good</option>
          <option value="other">Other</option>
        </select>
      </div>

      {vals.itemType === 'raw' &&
        <div className="grid grid-cols-3 gap-2">
          <label className={labelCs}>Raw Item:</label>
          <select name="rawItemId"
                  className={inputCs+" col-span-2"}
                  value={vals.rawItemId}
                  onChange={onEntry}>
            {raws.map((raw, index) => {
              return (
                <option key={index} value={raw._id}>
                  {raw.number} - {raw.name}
                </option>)
            })}
          </select>
        </div>
      }
      {vals.itemType === 'blend' &&
        <div className="grid grid-cols-3 gap-2">
          <label className={labelCs}>Blend Item:</label>
          <select name="blendItemId"
                  className={inputCs+" col-span-2"}
                  value={vals.blendItemId}
                  onChange={onEntry}>
            {blends.map((blend, index) => {
              return (
                <option key={index} value={blend._id}>
                  {blend.number} - {blend.name}
                </option>)
            })}
          </select>
        </div>
      }
      {vals.itemType === 'bulk' &&
        <div className="grid grid-cols-3 gap-2">
          <label className={labelCs}>Blend Item:</label>
          <select name="bulkItemId"
                  className={inputCs+" col-span-2"}
                  value={vals.bulkItemId}
                  onChange={onEntry}>
            {bulks.map((bulk, index) => {
              return (
                <option key={index} value={bulk._id}>
                  {bulk.number} - {bulk.name}
                </option>)
            })}
          </select>
        </div>
      }
      {vals.itemType === 'fg' &&
        <div className="grid grid-cols-3 gap-2">
          <label className={labelCs}>Blend Item:</label>
          <select name="fgItemId"
                  className={inputCs+" col-span-2"}
                  value={vals.fgItemId}
                  onChange={onEntry}>
            {fgs.map((fg, index) => {
              return (
                <option key={index} value={fg._id}>
                  {fg.number} - {fg.name}
                </option>)
            })}
          </select>
        </div>
      }

      <h3 className="font-semibold text-blue-100 text-lg mt-4">Additional Info</h3>
      <div className={"mb-2 h-px w-full bg-gradient-to-r " +
                      "from-blue-300 to-transparent"} />
      <div className="grid grid-cols-3 gap-2">
        <label className={labelCs}>P.O. #:</label>
        <input className={inputCs+" col-span-1"}
               name="purchaseOrder"
               type="text"
               value={vals.purchaseOrder}
               onChange={onEntry} />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <label className={labelCs}>Amt. Rcv'd:</label>
        <input className={inputCs+" col-span-1"}
               name="amount"
               type="text"
               value={vals.amount}
               onChange={onEntry} />
        <select name="amountUnits"
                className={inputCs+" col-span-1"}
                value={vals.amountUnits}
                onChange={onEntry}>
          {options.map((option, index) => {
            return (<option key={index} value={option}>{option}</option>)
          })}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <label className={labelCs}>Facility:</label>
        <select name="facilityLocation"
                className={inputCs+" col-span-2"}
                value={vals.facilityLocation}
                onChange={onEntry}>
          {facilities.map((fac, index) => {
            return (
              <option key={index} value={fac}>
                {fac}
              </option>)
          })}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <label className={labelCs}>WH Location:</label>
        <select name="warehouseLocation"
                className={inputCs+" col-span-2"}
                value={vals.warehouseLocation}
                onChange={onEntry}>
          {whLocations.map((wh, index) => {
            return (
              <option key={index} value={wh}>
                {wh}
              </option>)
          })}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <label className={labelCs}>Vendor:</label>
        <select name="vendor"
                className={inputCs+" col-span-2"}
                value={vals.vendor}
                onChange={onEntry}>
          {vendors.map((vend, index) => {
            return (
              <option key={index} value={vend}>
                {vend}
              </option>)
          })}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <label className={labelCs}>Manufacturer:</label>
        <select name="manufacturer"
                className={inputCs+" col-span-2"}
                value={vals.manufacturer}
                onChange={onEntry}>
          {manufacturers.map((man, index) => {
            return (
              <option key={index} value={man}>
                {man}
              </option>)
          })}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <label className={labelCs}>Maker's Lot:</label>
        <input name="makerLot"
               type="text"
               className={inputCs+" col-span-2"}
               value={vals.makerLot}
               onChange={onEntry} />
      </div>


    </div>
  )
}

export default AddLotInfo;
