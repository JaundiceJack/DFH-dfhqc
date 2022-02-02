import { useSelector } from 'react-redux';
import { rangeString } from '../../../../functions/strings.js';
import Detail    from '../../../misc/detail.js';
import Divider   from '../../../misc/divider.js';
import Container from '../../../misc/container.js';

const SpecAssays = ({ assays }) => {
  const { loading } = useSelector(state => state.raw);

  // Display the assays in the format Name: Range by Method
  const mapAssays = () => {
    if (assays) {
      return assays.map((assay, index) => {
        return (
          <Detail key={index} extraClasses="mb-2"
            label={`${assay.assay.name}:`}
            data={`${rangeString(assay.min, assay.max, assay.units.name)} by ${assay.method.name}`} />
        )
      })
    }
  }

  return (
    <Container title="Assays" loading={loading} contents={mapAssays()} />
  )
}

export default SpecAssays;
