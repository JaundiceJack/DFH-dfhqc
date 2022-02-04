import Detail  from '../../misc/detail.js';
import SpecSection from './specSection.js';
import { rangeString } from '../../../functions/strings.js';

const AssaySpec = ({ assays }) => {
  return (
    <SpecSection title="Assays" contents={
      assays && assays.map((assay, index) => {
        return <div className="">
          <Detail label={`${assay.assay.name}:`}
            data={`${rangeString(assay.min, assay.max, assay.units.name)} by ${assay && assay.method && assay.method.name}`}
            color="text-black"
            capData={false}
            key={index} />
        </div>
      })
    } />
  )
}

export default AssaySpec;
