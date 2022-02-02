import AssayLine from './assayLine.js';
import IdentityLine from './identityLine.js';
import CategoryHeader from './categoryHeader.js';
import { rangeString, capitalize } from '../../../functions/strings.js';

const AssayId = ({ selected, tests, prior_lot, prior_tests }) => {
  // Create a testing line for each assay
  const mapAssays = () => {
    return selected && selected.raw && selected.raw.assays.map((assay, index) => {
      const filteredAssay = tests && tests.filter(test => test.type === 'assay' && test.assay === assay.assay._id);
      const filteredPrior = prior_tests && prior_tests.filter(test => test.type === 'assay' && test.assay === assay.assay._id);
      return <AssayLine key={index}
        assay={assay}
        prior_lot={(prior_lot) ? (filteredAssay.length > 0 ? null : prior_lot) : null}
        tests={(tests && filteredAssay.length > 0) ? filteredAssay :
               (prior_tests && filteredPrior.length > 0) ? filteredPrior : null} />
    })
  };

  // Create a testing line for each Identity
  const mapIds = () => {
    return selected && selected.raw && selected.raw.ids.map((id, index) => {
      const filteredId = tests && tests.filter(test => test.type === 'identity' && test.identity === id.identity._id);
      const filteredPrior = prior_tests && prior_tests.filter(test => test.type === 'identity' && test.identity === id.identity._id);
      return <IdentityLine key={index}
          identity={id}
          prior_lot={(prior_lot) ? (filteredId.length > 0 ? null : prior_lot) : null}
          tests={(tests && filteredId.length > 0) ? filteredId :
                 (prior_tests && filteredPrior.length > 0) ? filteredPrior : null} />
    })
  };

  return (
    <div id="assays&ids" className="mb-6">
      <CategoryHeader title="Assays & Identities" testing="Test Name" />

      {mapAssays()}
      <div className="mb-2"></div>

      {mapIds()}
    </div>
  )
}

export default AssayId;
