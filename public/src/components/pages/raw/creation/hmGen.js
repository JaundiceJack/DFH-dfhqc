import Checkbox  from '../../../inputs/checkbox.js';
import Entry     from '../../../inputs/entry.js';
import Selection from '../../../inputs/selection.js';
import Divider   from '../../../misc/divider.js';

const HmGen = ({vals, onEntry, onClick}) => {
  return (
    <div className="flex flex-col" >
      <h3 className="font-semibold text-blue-100 text-lg">Heavy Metals</h3>
      <Divider />
      <Selection label="HM Units:" name="units" value={vals.units}
        onChange={onEntry} extraClasses="col-span-2" append=" " cap={false}
        options={[
          {name: "ppm", value: "ppm"},
          {name: "μg/sg", value: "μg/sg"},
          {name: "μg/cap", value: "μg/cap"},
          {name: "μg/tab", value: "μg/tab"},
          {name: "μg/mL", value: "μg/mL"},
          {name: "N/A", value: "n/a"},
        ]}
      />
      {vals.units !== 'n/a' &&
        <div className="flex flex-col">
          <Entry label="As Max:" append={vals.units} name="arsenic" value={vals.arsenic}
            onChange={onEntry}/>
          <Entry label="Cd Max:" append={vals.units} name="cadmium" value={vals.cadmium}
            onChange={onEntry} />
          <Entry label="Pb Max:" append={vals.units} name="lead" value={vals.lead}
            onChange={onEntry} />
          <Entry label="Hg Max:" append={vals.units} name="mercury" value={vals.mercury}
            onChange={onEntry} />

          <Checkbox label="Nickel Tested?" name="nickel_tested" value={vals.nickel_tested}
            onClick={onClick} defaultChecked={vals.nickel_tested} extraClasses="my-1 left-1/3" />
          {vals.nickel_tested &&
            <Entry label="Nickel Max:" name="nickel" value={vals.nickel}
              onChange={onEntry} append=" " />
          }
        </div>
      }
    </div>
  )
}

export default HmGen;
