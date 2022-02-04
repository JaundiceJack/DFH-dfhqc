// Import libraries
const trycatch = require('express-async-handler');

// Import models
const Raw = require('../../models/Raw.js');
const Blend = require('../../models/Blend.js');
const Bulk = require('../../models/Bulk.js');
const FinishedGood = require('../../models/FinishedGood.js');
const Lot = require('../../models/Lot.js');
const Test = require('../../models/Test.js');

// General paths to populate for a testing query
const testPopPaths = [
  'samples.lab'
]

/**/
// GET: api/samples/lotId | Get a list of the given lot's tests | Private
const getTests = trycatch( async (req, res) => {
  const tests = await Test.find({ lot: req.params.lotId }).populate(testPopPaths).exec();
  if (tests) res.status(200).json(tests)
  else { res.status(404); throw new Error("Could not find item tests."); };
});

// GET: api/samples/lotId/type | Get a Single test for the given lot | Private
const getTest = trycatch( async (req, res) => {
  const test = await Test.findOne({ lot: req.params.lotId, type: req.params.type }).populate(testPopPaths).exec();
  if (test) res.status(200).json(test)
  else { res.status(404); throw new Error("Could not find the requested test."); }
})

/**/
// Prevent duplicates when creating a new test/sample
const findExisting = async (lotId, sample, sampleType, assayId=null, identityId=null) => {
  // Find any existing test for the lot
  let existingTest = null;
  // OK, so, here when an item has 2 assays, entering the result for the second one removes the result for the first
  // This is because, when the type is assay, it looks for the new test and doesnt find it, so a duplicate is created
  switch (sampleType) {
    case 'assay':
      existingTest = await Test.findOne({
        lot: lotId, type: sampleType, assay: assayId
      }); break;
    case 'identity':
      existingTest = await Test.findOne({
        lot: lotId, type: sampleType, identity: identityId
      }); break;
    default:
      existingTest = await Test.findOne({
        lot: lotId, type: sampleType
      }); break;
  }
  // If there's no existing test, format a new one and add the sample to it
  if (!existingTest) {
    let entries = formatNewTest(sampleType, lotId, assayId, identityId);
    entries.samples.push(formatNewSample(1, sample));
    const newTest = new Test(entries);
    return await newTest.save();
  }
  // Otherwise add the new sample with an incremented sample number
  else {
    const nextSampleNumber = existingTest.samples.length > 0 ?
      existingTest.samples[existingTest.samples.length-1].number + 1 : 1;
    existingTest.samples.push(formatNewSample(nextSampleNumber, sample));
    return await existingTest.save();
  }
}

/**/
// Save the lot's pesticide testing to the item's passing/failing history
const saveAnnualPesticides = async (item, lot, body) => {
  // Save to lots_passing if pesticides are absent (unless lot already present)
  if (body.sample.results.presence === 'absent') {
    let existingPassing = false;
    const passingCheck = item.pesticide.lots_passing.forEach(lot => {
      if (lot.lot === lot._id) existingPassing = true; })
    if (!existingPassing) item.pesticide.lots_passing.push(
      { lot: lot._id, date: new Date(body.sample.date_of_result + 'T00:00:00') })
  }
  // Save to lots_failing if pesticides are not absent (unless lot already present)
  else {
    let existingFailing = false;
    const failingCheck = item.pesticide.lots_failing.forEach(lot => {
      if (lot.lot === lot._id) existingFailing = true; })
    if (!existingFailing) item.pesticide.lots_failing.push(
      { lot: lot._id, date: new Date(body.sample.date_of_result + 'T00:00:00') })
  }
  await item.save();
}

/**/
// Save the lot's rancidity testing to the item's passing/failing history
const saveAnnualRancidity = async (item, lot, body) => {
  // Check the rancidity results against the specs
  const peroxPass = body.sample.results.peroxide <= item.rancidity.peroxide;
  const anisiPass = body.sample.results.anisidine <= item.rancidity.anisidine;
  const totoxPass = (body.sample.results.peroxide * 2) + body.sample.results.anisidine <= item.rancidity.totox;
  // Save to lots_passing if all are within spec (unless lot already present)
  if (peroxPass && anisiPass && totoxPass) {
    let existingPassing = false;
    const passingCheck = item.rancidity.lots_passing.forEach(lot => {
      if (lot.lot === lot._id) existingPassing = true; })
    if (!existingPassing) item.rancidity.lots_passing.push(
      {lot: lot._id, date: new Date(body.sample.date_of_result + 'T00:00:00')})
  }
  // Save to lots_failing if any are out of spec (unless lot already present)
  else {
    let existingFailing = false;
    const failingCheck = item.rancidity.lots_failing.forEach(lot => {
      if (lot.lot === lot._id) existingFailing = true; })
    if (!existingFailing) item.rancidity.lots_failing.push(
      {lot: lot._id, date: new Date(body.sample.date_of_result + 'T00:00:00')})
  }
  await item.save();
}

/**/
// Save the lot's solvent testing to the item's passing/failing history
const saveAnnualSolvent = async (item, lot, body) => {
  // Save to lots_passing if solvents are absent (unless lot already present)
  if (body.sample.results.presence === 'absent') {
    let existingPassing = false;
    const passingCheck = item.solvent.lots_passing.forEach(lot => {
      if (lot.lot === lot._id) existingPassing = true; })
    if (!existingPassing) item.solvent.lots_passing.push(
      { lot: lot._id, date: new Date(body.sample.date_of_result + 'T00:00:00') })
  }
  // Save to lots_failing if solvents are not absent (unless lot already present)
  else {
    let existingFailing = false;
    const failingCheck = item.solvent.lots_failing.forEach(lot => {
      if (lot.lot === lot._id) existingFailing = true; })
    if (!existingFailing) item.solvent.lots_failing.push(
      { lot: lot._id, date: new Date(body.sample.date_of_result + 'T00:00:00') })
  }
  await item.save();
}

/**/
// Save the lot's heavy metal testing to the item's passing/failing history
const saveAnnualHM = async (item, lot, body) => {
  // Check the heavy metals results against the specs
  const arsePass = body.sample.results.arsenic <= item.hm.arsenic;
  const cadmPass = body.sample.results.cadmium <= item.hm.cadmium;
  const leadPass = body.sample.results.lead <= item.hm.lead;
  const mercPass = body.sample.results.mercury <= item.hm.mercury;
  // Save to lots_passing if all are within spec (unless lot already present)
  if (arsePass && cadmPass && leadPass && mercPass) {
    let existingPassing = false;
    const passingCheck = item.hm.lots_passing.forEach(lot => {
      if (lot.lot === lot._id) existingPassing = true; })
    if (!existingPassing) item.hm.lots_passing.push(
      {lot: lot._id, date: new Date(body.sample.date_of_result + 'T00:00:00')})
  }
  // Save to lots_failing if any are out of spec (unless lot already present)
  else {
    let existingFailing = false;
    const failingCheck = item.solvent.lots_failing.forEach(lot => {
      if (lot.lot === lot._id) existingFailing = true; })
    if (!existingFailing) item.hm.lots_failing.push(
      {lot: lot._id, date: new Date(body.sample.date_of_result + 'T00:00:00')})
  }
  await item.save();
}

/**/
// Save the latest annual test for an item
const saveAnnuals = async (lot, body) => {
  // Find the item by ID
  let item = null
  switch (lot.type) {
    case 'raw':   item = await Raw.findById(lot.raw); break;
    case 'blend': item = await Blend.findById(lot.blend); break;
    case 'bulk':  item = await Bulk.findById(lot.bulk); break;
    case 'fg':    item = await FinishedGood.findById(lot.fg); break;
    default: break;
  }
  // Save the annual results under the relevant item type
  if (item && body.sample.date_of_result) {
    switch (body.sampleType) {
      case 'pesticides': saveAnnualPesticides(item, lot, body); break;
      case 'rancidity':  saveAnnualRancidity(item, lot, body); break;
      case 'solvents':   saveAnnualSolvent(item, lot, body); break;
      case 'hm':         saveAnnualHM(item, lot, body); break;
      default: break;
    }
  }
  else {
    if (!item) console.log("No item found for annual testing.");
  }
}

/**/
// POST: api/samples/lotId | Create a new testing sample for the given lot | Private
const createTest = trycatch( async (req, res) => {
  // Prepare the empty test
  let savedTest = null;
  // Ensure the test has a lot to create a sample for
  const lot = await Lot.findById(req.params.lotId);
  if (lot) {
    // Find existing tests/samples before adding a new one
    savedTest = await findExisting(
        req.params.lotId, req.body.sample, req.body.sampleType,
        req.body.assayId, req.body.identityId);
    // Respond with the updated samples
    if (savedTest) {
      // Add the test id to the lot's tests array
      lot.tests.push(savedTest._id);
      const savedLot = await lot.save();
      if (savedLot) {
        const tests = await Test.find({ lot: req.params.lotId }).populate(testPopPaths).exec();
        if (tests) { res.status(200).json(tests)
        } else { res.status(404); throw new Error("Could not add the test to the lot."); }
      } else { res.status(404); throw new Error("Could not find item's tests."); };
    } else { res.status(401); throw new Error("Unable to create a new sample."); }
  } else { res.status(404); throw new Error("Could not find the lot to add a sample to."); };
});

/**/
// PUT: api/samples/lotId | Update the given lot with new information | Private
const editTest = trycatch( async (req, res) => {
  // Locate the lot to edit a sample for
  const lot = await Lot.findById(req.params.lotId);
  if (lot) {
    // Find any existing test for the lot
    const existingTest = await Test.findOne({
      lot: req.params.lotId, type: req.body.sampleType,
      assay: req.body.assayId, identity: req.body.identityId });
    if (existingTest && existingTest.samples.length > 0) {
      // Find the sample to edit by number
      const currentSample = existingTest.samples.findIndex(sample =>
        sample.number === Number(req.body.sample.number));
      if (currentSample !== -1) {
        // Apply edits to the sample/test
        Object.assign(existingTest.samples[currentSample], formatExistingSample(req.body.sample));
        const savedSample = await existingTest.save();
        if (savedSample) {
          // Save any annual testing for the item with the current lot
          await saveAnnuals(lot, req.body);
          // Respond with the updated tests
          const tests = await Test.find({ lot: req.params.lotId }).populate(testPopPaths).exec();
          if (tests) { res.status(201).json(tests);
          } else { res.status(404); throw new Error("Could not find the test to edit a sample for."); }
        } else { res.status(400); throw new Error("Could not save the new sample."); };
      } else { res.status(404); throw new Error("Could not find the sample to edit."); };
    } else { res.status(404); throw new Error("Could not find the test to edit a sample for."); };
  } else { res.status(404); throw new Error("Could not find the lot to edit a sample for."); };
});

/**/
// DELETE: api/samples/lotId/testId/sampleNumber |  Remove a sample from the given test | Private
const removeSample = trycatch( async (req, res) => {
  // Find the test by the given ID
  const test = await Test.findById(req.params.testId);
  if (test) {
    // Remove the sample with the given sample number and save the updates
    test.samples = test.samples.filter(sample =>
      sample.number !== Number(req.params.sampleNumber));
    let savedTest = null;
    // Remove the test itself if all samples were removed
    if (test.samples.length === 0) savedTest = await test.remove();
    else savedTest = await test.save();
    if (savedTest) {
      // Respond with the updated tests
      const tests = await Test.find({ lot: req.params.lotId }).populate(testPopPaths).exec();
      if (tests) { res.status(201).json(tests);
      } else { res.status(404); throw new Error("Could not find the test to edit a sample for."); }
    } else { res.status(400); throw new Error("Could not delete the sample."); }
  } else { res.status(404); throw new Error("Could not find the test to delete a sample for."); };
})

// Set the results or lab for an existing sample
const formatExistingSample = (sample) => {
  return { ...sample,
    lab:            sample.lab,
    results:        sample.results,
    date_sent:      sample.date_sent ? new Date(sample.date_sent + 'T00:00:00') : null,
    date_of_result: sample.date_of_result ? new Date(sample.date_of_result + 'T00:00:00') : null
  }
}

// Create a new empty sample object
const formatNewSample = (nextSampleNumber, sample) => {
  return {
    lab: null,
    number: Number(nextSampleNumber),
    amount: Number(sample.amount),
    units:  sample.units,
    results: {},
    date_sampled: new Date(sample.date_sampled + 'T00:00:00'),
    date_sent:    null,
    date_of_result: null,
  }
}

// Create a new empty test object
const formatNewTest = (type, lotId, assayId, identityId) => {
  return {
    type:     type,
    lot:      lotId,
    assay:    assayId,
    identity: identityId,
    samples: [],
  }
};

module.exports = { getTests, getTest, createTest, editTest, removeSample };
