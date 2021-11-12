import Checkbox from '../../inputs/checkbox.js';
import Entry from '../../inputs/entry.js';
import Selection from '../../inputs/selection.js';
import Divider from '../../divider.js';

const AddAnnuals = ({ vals, onEntry, onClick }) => {
  return (
    <div className="flex flex-col" >
      <h3 className="font-semibold text-blue-100 text-lg">Annual Tests</h3>
      <Divider />
      <div className="flex flex-col">

        {/* Pesticides */}
        <Checkbox label="Pesticides Tested?" name="pesticide_tested" value={vals.pesticide_tested}
          onClick={onClick} extraClasses="left-1/3 mb-2" defaultChecked={vals.pesticide_tested} />
        {vals.pesticide_tested &&
          <Selection label="Standard:" name="pesticide_standard" value={vals.pesticide_standard}
            onChange={onEntry} extraClasses="mb-2" options={[
              {name: "USP <561>", value: "USP <561>"},
              {name: "FDA PAM", value: "FDA PAM"},
            ]} />
        }

        {(vals.pesticide_tested || vals.solvent_tested) &&
          <Divider direction="b" color="purple" />}

        {/* Residual Solvents */}
        <Checkbox label="Res. Solvents Tested?" name="solvent_tested" value={vals.solvent_tested}
          onClick={onClick} extraClasses="left-1/3 mb-2" defaultChecked={vals.solvent_tested}/>
        {vals.solvent_tested &&
          <Selection label="Standard:" name="solvent_standard" value={vals.solvent_standard}
            onChange={onEntry} extraClasses="mb-2" options={[
              {name: "Class I", value: "Class I"},
              {name: "Class II", value: "Class II"},
              {name: "Class III", value: "Class III"},
              {name: "Class I & II", value: "Class I & II"},
              {name: "Class I & III", value: "Class I & III"},
              {name: "Class II & III", value: "Class II & III"},
              {name: "Class I, II, & III", value: "Class I, II, & III"},
            ]} />
        }

        {(vals.solvent_tested || vals.rancidity_tested) &&
          <Divider direction="b" color="purple" />}

        {/* Rancidity */}
        <Checkbox label="Rancidity Tested?" name="rancidity_tested" value={vals.rancidity_tested}
          onClick={onClick} extraClasses="left-1/3 mb-2" defaultChecked={vals.rancidity_tested}/>
        {vals.rancidity_tested &&
          <div className="flex flex-col">
            <Entry label="Peroxide Value:" name="peroxide" value={vals.peroxide || ""}
              onChange={onEntry} append=" " />
            <Entry label="P-Anisidine Value:" name="anisidine" value={vals.anisidine || ""}
              onChange={onEntry} append=" " />
            <Entry label="TOTOX Value:" name="totox" value={vals.totox || ""}
              onChange={onEntry} append=" " />
          </div>
        }
      </div>
    </div>
  )
}

export default AddAnnuals;
