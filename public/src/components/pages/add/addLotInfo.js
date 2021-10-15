import { useSelector } from 'react-redux';

const AddLotInfo = ({vals, onEntry}) => {
  const labelCs = "mr-2 text-right text-blue-100 font-semibold whitespace-nowrap self-center";
  const inputCs = "rounded my-1 py-1 pl-2 bg-gray-200 w-full";

  const raws   = useSelector(state => state.raw.raws).sort((a,b)=>b.number<a.number);
  const blends = useSelector(state => state.blend.blends);
  const bulks  = useSelector(state => state.bulk.bulks);
  const fgs    = useSelector(state => state.fg.fgs);
  const vendors = useSelector(state => state.vendor.vendors);
  const manufacturers = useSelector(state => state.manufacturer.manufacturers);

  const unitOptions = ['kg', 'liters', 'ths'];
  const facilities = ['MT', 'NV', 'CT'];
  const locations = ['A1', 'A2', 'I1', 'I2', 'H1', 'H2'];

/*
lot
purchaseOrder
itemId
item_type
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
        <input type="text"
               name="lot"
               value={vals.lot}
               onChange={onEntry}
               disabled={false}
               className={inputCs+" col-span-2"} />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <label className={labelCs}>Item Type:</label>
        <select name="item_type"
                value={vals.item_type}
                onChange={onEntry}
                className={inputCs+" col-span-2"}>
          <option value="raw">Raw</option>
          <option value="blend">Blend</option>
          <option value="bulk">Bulk</option>
          <option value="fg">Finished Good</option>
          <option value="other">Other</option>
        </select>
      </div>

      {vals.item_type === 'other' &&
        <div className="grid grid-cols-3 gap-x-2">
          <label className={labelCs}>Item Number:</label>
          <input type="text" name="otherNumber" value={vals.otherNumber} onChange={onEntry} className={inputCs+" col-span-2"}/>
          <label className={labelCs}>Item Name:</label>
          <input type="text" name="otherName" value={vals.otherName} onChange={onEntry} className={inputCs+" col-span-2"}/>
        </div>
      }

      {vals.item_type === 'raw' &&
        <div className="grid grid-cols-3 gap-2">
          <label className={labelCs}>Raw Item:</label>
          <select name="rawId"
                  value={vals.rawId}
                  onChange={onEntry}
                  className={inputCs+" col-span-2"}>
            {raws.map((raw, index) => {
              return (
                <option key={index} value={raw._id}>
                  {raw.number} - {raw.name}
                </option>)
            })}
          </select>
        </div>
      }
      {vals.item_type === 'blend' &&
        <div className="grid grid-cols-3 gap-2">
          <label className={labelCs}>Blend Item:</label>
          <select name="blendId"
                  value={vals.blendId}
                  onChange={onEntry}
                  className={inputCs+" col-span-2"}>
            {blends.map((blend, index) => {
              return (
                <option key={index} value={blend._id}>
                  {blend.number} - {blend.name}
                </option>)
            })}
          </select>
        </div>
      }
      {vals.item_type === 'bulk' &&
        <div className="grid grid-cols-3 gap-2">
          <label className={labelCs}>Blend Item:</label>
          <select name="bulkId"
                  value={vals.bulkId}
                  onChange={onEntry}
                  className={inputCs+" col-span-2"}>
            {bulks.map((bulk, index) => {
              return (
                <option key={index} value={bulk._id}>
                  {bulk.number} - {bulk.name}
                </option>)
            })}
          </select>
        </div>
      }
      {vals.item_type === 'fg' &&
        <div className="grid grid-cols-3 gap-2">
          <label className={labelCs}>Blend Item:</label>
          <select name="fgId"
                  value={vals.fgId}
                  onChange={onEntry}
                  className={inputCs+" col-span-2"}>
            {fgs.map((fg, index) => {
              return (
                <option key={index} value={fg._id}>
                  {fg.number} - {fg.name}
                </option>)
            })}
          </select>
        </div>
      }

      <div className="grid grid-cols-3 gap-2">
        <label className={labelCs}>Department:</label>
        <select name="department"
                value={vals.department}
                onChange={onEntry}
                className={inputCs+" col-span-2"}>
          <option value="Quality Control">Quality Control</option>
          <option value="Tech Services">Tech Services</option>
          <option value="Stability">Stability</option>
          <option value="Production">Production</option>
          <option value="Other">Other</option>
        </select>
      </div>


      <h3 className="font-semibold text-blue-100 text-lg mt-4">Additional Info</h3>
      <div className={"mb-2 h-px w-full bg-gradient-to-r " +
                      "from-blue-300 to-transparent"} />

      <div className="grid grid-cols-3 gap-2">
        <label className={labelCs}>Facility:</label>
        <select name="facility"
                value={vals.facility}
                onChange={onEntry}
                className={inputCs+" col-span-2"}>
          {facilities.map((fac, index) => {
            return (
              <option key={index} value={fac}>
                {fac}
              </option>)
          })}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <label className={labelCs}>P.O. #:</label>
        <input type="text"
               name="purchase_order"
               value={vals.purchase_order}
               onChange={onEntry}
               className={inputCs+" col-span-1"} />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <label className={labelCs}>Amt. Rcv'd:</label>
        <input type="text"
               name="amount"
               value={vals.amount}
               onChange={onEntry}
               className={inputCs+" col-span-1"} />
        <select name="units"
                value={vals.units}
                onChange={onEntry}
                className={inputCs+" col-span-1"}>
          {unitOptions.map((unit, index) => {
            return (<option key={index} value={unit}>{unit}</option>)
          })}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <label className={labelCs}>Location:</label>
        <select name="location"
                value={vals.location}
                onChange={onEntry}
                className={inputCs+" col-span-2"}>
          {locations.map((wh, index) => {
            return (
              <option key={index} value={wh}>
                {wh}
              </option>)
          })}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <label className={labelCs}>Vendor:</label>
        <select name="vendorId"
                value={vals.vendorId}
                onChange={onEntry}
                className={inputCs+" col-span-2"}>
          {vendors.map((vend, index) => {
            return (
              <option key={index} value={vend._id}>
                {vend.name}
              </option>)
          })}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <label className={labelCs}>Mfr'd By:</label>
        <select name="manufacturerId"
                value={vals.manufacturerId}
                onChange={onEntry}
                className={inputCs+" col-span-2"}>
          {manufacturers.map((man, index) => {
            return (
              <option key={index} value={man._id}>
                {man.name}
              </option>)
          })}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <label className={labelCs}>Mfr. Lot:</label>
        <input type="text"
               name="manufacturer_lot"
               value={vals.manufacturer_lot}
               onChange={onEntry}
               className={inputCs+" col-span-2"} />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <label className={labelCs}>Status:</label>
        <select name="status"
                value={vals.status}
                onChange={onEntry}
                className={inputCs+" col-span-1"}>
          <option value="Q">Q</option>
          <option value="R">R</option>
          <option value="A">A</option>
          <option value="AC">AC</option>
        </select>
      </div>

    </div>
  )
}

export default AddLotInfo;
