import { useSelector } from 'react-redux';
import Checkbox  from '../../../inputs/checkbox.js';
import Entry     from '../../../inputs/entry.js';
import Selection from '../../../inputs/selection.js';
import Divider   from '../../../misc/divider.js';

const InfoGen = ({vals, onTypeSelect, onEntry, onPrevToggle, otherLots}) => {
  const labelCs = "mr-2 text-right text-blue-100 font-semibold whitespace-nowrap self-center";
  const inputCs = "rounded my-1 py-1 pl-2 bg-gray-200 w-full";

  const raws   = useSelector(state => state.raw.raws).sort((a,b)=>b.number<a.number);
  const blends = useSelector(state => state.blend.blends).sort((a,b)=>b.number<a.number);
  const bulks  = useSelector(state => state.bulk.bulks).sort((a,b)=>b.number<a.number);
  const fgs    = useSelector(state => state.fg.fgs).sort((a,b)=>b.number<a.number);
  const vendors = useSelector(state => state.vendor.vendors);
  const manufacturers = useSelector(state => state.manufacturer.manufacturers);

  // TODO: Create a location schema
  const unitOptions = ['kg', 'liters', 'ths'];
  const facilities = ['MT', 'NV', 'CT'];
  const locations = ['A1', 'A2', 'I1', 'I2', 'H1', 'H2'];

  return (
    <div className="flex flex-col mb-3">
      <h3 className="font-semibold text-blue-100 text-lg">Basic Info</h3>
      <Divider />

      <Entry label="Lot#:" name="lot" value={vals.lot} onChange={onEntry} />

      <Selection label="Item Type:" name="type" value={vals.type}
        onChange={onTypeSelect}
        options={[
          {name: "Raw",           value: "raw"},
          {name: "Blend",         value: "blend"},
          {name: "Bulk",          value: "bulk"},
          {name: "Finished Good", value: "fg"},
        ]} />

      {vals.type === 'raw' &&
        <Selection label="Raw Item:" name="rawId" value={vals.rawId}
          onChange={onEntry}
          options={raws.map(raw => {return {name: `${raw.number} - ${raw.name}`, value: raw._id}})} />
      }

      {vals.type === 'blend' &&
        <Selection label="Blend Item:" name="blendId" value={vals.blendId}
          onChange={onEntry}
          options={blends.map(blend => {return {name: `${blend.number} - ${blend.name}`, value: blend._id}})} />
      }

      {vals.type === 'bulk' &&
        <Selection label="Bulk Item:" name="bulkId" value={vals.bulkId}
          onChange={onEntry}
          options={bulks.map(bulk => {return {name: `${bulk.number} - ${bulk.name}`, value: bulk._id}})} />
      }

      {vals.type === 'fg' &&
        <Selection label="FG Item:" name="fgId" value={vals.fgId}
          onChange={onEntry}
          options={fgs.map(fg => {return {name: `${fg.number} - ${fg.name}`, value: fg._id}})} />
      }

      <Selection label="Department:" name="department" value={vals.department}
        onChange={onEntry}
        options={[
          {name: "Quality Control", value: "Quality Control"},
          {name: "Tech Services", value: "Tech Services"},
          {name: "Stability", value: "Stability"},
          {name: "Production", value: "Production"},
          {name: "Other", value: "Other"},
        ]} />

      <h3 className="font-semibold text-blue-100 text-lg mt-4">Additional Info</h3>
      <Divider />

      <Selection label="Facility:" name="facility" value={vals.facility}
        onChange={onEntry}
        options={facilities.map(fac => {return {name: fac, value: fac}})} />

      <Entry label="P.O.#" name="purchase_order" value={vals.purchase_order}
        onChange={onEntry} append=" " />

      <Entry label="Amt. Rcv'd:" name="amount" value={vals.amount}
        onChange={onEntry} append={
          <Selection name="units" value={vals.units} onChange={onEntry}
            extraClasses="ml-2"
            options={unitOptions.map(unit => {return {name: unit, value: unit}})} />
        } />

      <Selection label="Location:" name="location" value={vals.location}
        onChange={onEntry}
        options={locations.map(loc => {return {name: loc, value: loc}})} />

      <Selection label="Vendor:" name="vendorId" value={vals.vendorId}
        onChange={onEntry}
        options={vendors.map(vend => {return {name: vend.name, value: vend._id}})} />

      <Selection label="Mfr'd By:" name="manufacturerId" value={vals.manufacturerId}
        onChange={onEntry}
        options={manufacturers.map(man => {return {name: man.name, value: man._id}})} />

      <Entry label="Mfr. Lot:" name="manufacturer_lot" value={vals.manufacturer_lot} onChange={onEntry} />

      <Selection label="Status:" name="status" value={vals.status}
        onChange={onEntry} append=" "
        options={[
          {name: "Q", value: "Q"},
          {name: "R", value: "R"},
          {name: "A", value: "A"},
          {name: "AC", value: "AC"},
        ]} extraClasses="mb-4" />

      <Checkbox label="Manufacturer batch/lot tested this year?"
        name="previously_received"
        value={vals.previously_received}
        defaultChecked={vals.previously_received}
        onClick={onPrevToggle} />
      {vals.previously_received &&
        <Selection label="Prior Lot:" name="prior_lot" value={vals.prior_lot}
          onChange={onEntry} options={otherLots.filter(lot => {
            return lot.raw._id === vals.rawId;
          }).map(lot => {
            return { name: `${lot.raw.name} ${lot.lot}`, value: lot._id }
          })} />
      }

    </div>
  )
}

export default InfoGen;
