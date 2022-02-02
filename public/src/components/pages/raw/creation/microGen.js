import Checkbox  from '../../../inputs/checkbox.js';
import Entry     from '../../../inputs/entry.js';
import Selection from '../../../inputs/selection.js';
import Divider   from '../../../misc/divider.js';

const MicroGen = ({vals, onEntry, onClick}) => {
  return (
    <div className="flex flex-col" >
      <h3 className="font-semibold text-blue-100 text-lg">Micros</h3>
      <Divider />

      <Entry label="TPC Max:" name="tpc" value={vals.tpc || ""}
        onChange={onEntry} append={
          <Selection name="tpc_units" value={vals.tpc_units}
            onChange={onEntry} extraClasses="mx-2"
            options={[
              {name: "CFU/g", value: "CFU/g"},
              {name: "CFU/mL", value: "CFU/mL"}]
            } />
        } />
      <Entry label="Y&M Max:" name="ym" value={vals.ym || ""}
        onChange={onEntry} append={
          <Selection name="ym_units" value={vals.ym_units}
            onChange={onEntry} extraClasses="mx-2"
            options={[
              {name: "CFU/g", value: "CFU/g"},
              {name: "CFU/mL", value: "CFU/mL"}]
            } />
        } />
      <Entry label="Entero. Max:" name="entero" value={vals.entero || ""}
        onChange={onEntry} append={
          <Selection name="entero_units" value={vals.entero_units}
            onChange={onEntry} extraClasses="mx-2"
            options={[
              {name: "MPN/g", value: "MPN/g"},
              {name: "MPN/mL", value: "MPN/mL"}]
            } />
        } />

      <Selection label="Salmonella:" name="salmonella" value={vals.salmonella}
        onChange={onEntry} append=" " options={[
          {name: "Negative", value: "Negative"},
          {name: "Positive", value: "Positive"},
        ]} />
      <Selection label="Staph:" name="staph" value={vals.staph}
        onChange={onEntry} append=" " options={[
          {name: "Negative", value: "Negative"},
          {name: "Positive", value: "Positive"},
        ]} />
      <Selection label="E. Coli:" name="ecoli" value={vals.ecoli}
        onChange={onEntry} append=" " options={[
          {name: "Negative", value: "Negative"},
          {name: "Positive", value: "Positive"},
        ]} />

      <Checkbox label="P. Aeru. Tested?" name="paeru_tested" value={vals.paeru_tested}
        onClick={onClick} defaultChecked={vals.paeru_tested} extraClasses="my-1 left-1/3"/>
      {vals.paeru_tested &&
        <Selection label="P. Aeru.:" name="paeru" value={vals.paeru}
          onChange={onEntry} append=" " options={[
            {name: "Negative", value: "Negative"},
            {name: "Positive", value: "Positive"},
          ]} />
      }
    </div>
  )
}

export default MicroGen;
