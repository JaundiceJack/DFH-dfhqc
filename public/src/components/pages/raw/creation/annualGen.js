import Checkbox  from '../../../inputs/checkbox.js';
import Entry     from '../../../inputs/entry.js';
import Selection from '../../../inputs/selection.js';
import Divider   from '../../../misc/divider.js';

const AnnualGen = ({
  pesticides, solvents, rancidity,
  setPesticide, clickPesticide,
  setRancidity, clickRancidity,
  setSolvent,   clickSolvent
}) => {
  return (
    <div className="flex flex-col" >
      <h3 className="font-semibold text-blue-100 text-lg">Annual Tests</h3>
      <Divider />
      <div className="flex flex-col">

        {/* Pesticides */}
        <Checkbox label="Pesticides Tested?" name="tested" value={pesticides.tested}
          onClick={clickPesticide} extraClasses="left-1/3 mb-2" defaultChecked={pesticides.tested} />
        {pesticides.tested &&
          <Selection label="Standard:" name="standard" value={pesticides.standard}
            onChange={setPesticide} extraClasses="mb-2" options={[
              {name: "USP <561>", value: "USP <561>"},
              {name: "FDA PAM", value: "FDA PAM"},
            ]} />
        }

        {(pesticides.tested || solvents.tested) &&
          <Divider direction="b" color="purple" />}

        {/* Residual Solvents */}
        <Checkbox label="Res. Solvents Tested?" name="tested" value={solvents.tested}
          onClick={clickSolvent} extraClasses="left-1/3 mb-2" defaultChecked={solvents.tested}/>
        {solvents.tested &&
          <Selection label="Standard:" name="standard" value={solvents.standard}
            onChange={setSolvent} extraClasses="mb-2" options={[
              {name: "Class I", value: "Class I"},
              {name: "Class II", value: "Class II"},
              {name: "Class III", value: "Class III"},
              {name: "Class I & II", value: "Class I & II"},
              {name: "Class I & III", value: "Class I & III"},
              {name: "Class II & III", value: "Class II & III"},
              {name: "Class I, II, & III", value: "Class I, II, & III"},
            ]} />
        }

        {(solvents.tested || rancidity.tested) &&
          <Divider direction="b" color="purple" />}

        {/* Rancidity */}
        <Checkbox label="Rancidity Tested?" name="tested" value={rancidity.tested}
          onClick={clickRancidity} extraClasses="left-1/3 mb-2" defaultChecked={rancidity.tested}/>
        {rancidity.tested &&
          <div className="flex flex-col">
            <Entry label="Peroxide Value:" name="peroxide" value={rancidity.peroxide || ""}
              onChange={setRancidity} append=" " />
            <Entry label="P-Anisidine Value:" name="anisidine" value={rancidity.anisidine || ""}
              onChange={setRancidity} append=" " />
            <Entry label="TOTOX Value:" name="totox" value={rancidity.totox || ""}
              onChange={setRancidity} append=" " />
          </div>
        }
      </div>
    </div>
  )
}

export default AnnualGen;
